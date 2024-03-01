// pages/api/progress/course.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prismadb from "@/lib/prismadb";

const secret = process.env.NEXTAUTH_JWT_SECRET;

const courseProgressHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = await getToken({ req, secret });
  const userId = token?.userId as string;

  // If no user is authenticated, return an error
  if (!userId) {
    return res.status(401).json({ error: "User not authenticated." });
  }

  // Extract courseId from the request
  const { courseId } = req.query;
  const profileId = req.body.profileId || req.query.profileId;

  // Check if courseId is provided and valid
  if (typeof courseId !== "string" || !courseId) {
    return res.status(400).json({ error: "courseId is required." });
  }

  // Handle GET request: Fetch course progress
  if (req.method === "GET") {
    try {
      // Fetch modules for this course
      const modules = await prismadb.module.findMany({ where: { courseId } });
      const moduleIds = modules.map((mod) => mod.id);

      // Fetch individual clips for these modules
      const clips = await prismadb.clip.findMany({
        where: { moduleId: { in: moduleIds } },
      });

      // Calculate total duration and watched duration
      const totalDuration = clips.reduce((sum, clip) => sum + clip.duration, 0);
      let watchedDuration = 0;

      // Iterate over clips to calculate watched duration
      for (const clip of clips) {
        const progress = await prismadb.clipProgress.findUnique({
          where: profileId
            ? { profileId_clipId: { profileId, clipId: clip.id } }
            : { userId_clipId: { userId, clipId: clip.id } },
        });

        if (progress) {
          watchedDuration += clip.duration * progress.progress;
        }
      }

      // Calculate overall progress
      const overallProgress =
        totalDuration > 0 ? watchedDuration / totalDuration : 0;

      // Respond with overall progress
      return res.json({ progress: overallProgress });
    } catch (error: any) {
      console.error("Error fetching course progress:", error.message);
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    // Handle POST request: Update course progress
    const { progress, lastWatchedClipId } = req.body;

    try {
      // Adjust the updateData to match the clipProgressCreateInput type
      const createData = {
        progress,
        finished: false, // You will need to determine the correct value for this field
        // Add other required fields according to your Prisma schema
        ...(profileId
          ? { profileId, clipId: lastWatchedClipId }
          : { userId, clipId: lastWatchedClipId }),
      };

      // Use createData in the upsert function
      const updatedProgress = await prismadb.clipProgress.upsert({
        where: {
          ...(profileId
            ? { profileId_clipId: { profileId, clipId: lastWatchedClipId } }
            : { userId_clipId: { userId, clipId: lastWatchedClipId } }),
        },
        create: createData,
        update: { progress },
      });

      // Respond with the updated progress
      return res.json(updatedProgress);
    } catch (error: any) {
      console.error("Error updating course progress:", error.message);
      return res.status(500).json({ error: error.message });
    }
  } else {
    // If the method is not GET or POST, return a 405 Method Not Allowed error
    return res.status(405).json({ error: "Method not allowed." });
  }
};

export default courseProgressHandler;
