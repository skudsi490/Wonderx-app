import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { getSession } from "next-auth/react";

type ClipWithProgress = {
  id: string;
  title: string;
  videoUrl: string;
  duration: number;
  moduleId: string | null; // Allow moduleId to be null
  progress?: number;
  finished?: boolean;
};

type CourseModule = {
  id: string;
  title: string;
  clips: ClipWithProgress[];
} | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { moduleId } = req.query;

    if (typeof moduleId !== "string") {
      throw new Error("Invalid Id");
    }

    if (!moduleId) {
      throw new Error("Missing Id");
    }

    const session = await getSession({ req });
    if (!session || !session.user) {
      throw new Error("Not Authenticated");
    }

    const userEmail = session.user.email;

    if (!userEmail) {
      throw new Error("User email not available");
    }

    const userRecord = await prismadb.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!userRecord) {
      throw new Error("User not found in database");
    }

    const userId = userRecord.id;

    const courseModule: CourseModule = await prismadb.module.findUnique({
      where: {
        id: moduleId,
      },
      select: {
        id: true,
        title: true,
        clips: {
          select: {
            id: true,
            title: true,
            videoUrl: true,
            duration: true,
            moduleId: true,
          },
        },
      },
    });

    if (!courseModule) {
      return res.status(404).json({ error: "Module not found" });
    }

    const transformedModule: CourseModule = {
      id: courseModule.id,
      title: courseModule.title,
      clips: courseModule.clips.map(clip => ({
        ...clip,
        moduleId: clip.moduleId ?? '', // Ensure moduleId is a string
      })),
    };

    for (let i = 0; i < transformedModule.clips.length; i++) {
      const clipProgress = await prismadb.clipProgress.findUnique({
        where: {
          userId_clipId: { userId, clipId: transformedModule.clips[i].id },
        },
      });

      if (clipProgress) {
        transformedModule.clips[i].progress = clipProgress.progress;
        transformedModule.clips[i].finished = clipProgress.finished;
      }
    }

    console.log("Fetched module:", transformedModule);

    return res.status(200).json(transformedModule);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
