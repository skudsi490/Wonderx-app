import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prismadb from "@/lib/prismadb";

const secret = process.env.NEXTAUTH_JWT_SECRET;

type ClipProgressWhereUniqueInput = {
  userId_clipId?: {
    userId: string;
    clipId: string;
  };
  profileId_clipId?: {
    profileId: string;
    clipId: string;
  };
};

const clipProgressHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.userId as string;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    const { clipId } = req.query;
    const profileId = req.body.profileId || req.query.profileId;

    const { progress, finished } = req.body;

    if (typeof clipId !== "string" || !clipId) {
      return res.status(400).json({ error: "clipId is required." });
    }

    const uniqueKey: ClipProgressWhereUniqueInput = profileId
      ? { profileId_clipId: { profileId: profileId as string, clipId } }
      : { userId_clipId: { userId, clipId } };

    if (req.method === "GET") {
      const clipProgress = await prismadb.clipProgress.findUnique({
        where: uniqueKey as any,
      });

      return clipProgress
        ? res.json(clipProgress)
        : res.status(404).json({ error: "No progress data found for this clip and profile/user." });
    }

    if (req.method === "POST") {
      let clipProgressData;
      const existingRecord = await prismadb.clipProgress.findUnique({
        where: uniqueKey as any,
      });

      if (existingRecord) {
        clipProgressData = await prismadb.clipProgress.update({
          where: uniqueKey as any,
          data: { progress, finished },
        });
      } else {
        clipProgressData = await prismadb.clipProgress.create({
          data: {
            userId: profileId ? undefined : userId,
            profileId: profileId || undefined,
            clipId,
            progress,
            finished,
          },
        });
      }

      // Calculating the average progress for the entire course
      const clip = await prismadb.clip.findUnique({
        where: { id: clipId },
        include: { module: true },
      });

      if (clip?.module) {
        const courseId = clip.module.courseId;

        if (courseId) {
          const allCourseClips = await prismadb.clip.findMany({
            where: { module: { courseId } },
          });

          let totalProgress = 0;

          for (const courseClip of allCourseClips) {
            const progressData = await prismadb.clipProgress.findUnique({
              where: profileId
                ? { profileId_clipId: { profileId: profileId as string, clipId: courseClip.id } }
                : { userId_clipId: { userId, clipId: courseClip.id } },
            });

            totalProgress += progressData?.progress || 0;
          }

          const averageCourseProgress = totalProgress / allCourseClips.length;

          // Update or create courseProgress record
          const uniqueCourseKey = profileId
            ? { profileId_courseId: { profileId: profileId as string, courseId } }
            : { userId_courseId: { userId, courseId } };

          const existingCourseProgress = await prismadb.courseProgress.findUnique({
            where: uniqueCourseKey as any,
          });

          if (existingCourseProgress) {
            await prismadb.courseProgress.update({
              where: uniqueCourseKey as any,
              data: { progress: averageCourseProgress, finished: averageCourseProgress === 1 },
            });
          } else {
            await prismadb.courseProgress.create({
              data: {
                userId: profileId ? undefined : userId,
                profileId: profileId || undefined,
                courseId,
                progress: averageCourseProgress,
                finished: averageCourseProgress === 1, // Mark as finished if 100% complete
              },
            });
          }
        }
      }

      return res.json(clipProgressData);
    }

    return res.status(405).json({ error: "Method not allowed." });
  } catch (error: any) {
    console.error("Error processing request:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default clipProgressHandler;
