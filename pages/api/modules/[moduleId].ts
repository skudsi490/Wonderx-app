import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { getSession } from "next-auth/react";

type ClipWithProgress = {
  id: string;
  title: string;
  videoUrl: string;
  duration: number; // Change this line from string to number
  moduleId: string;
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
        clips: true,
      },
    });

    if (!courseModule) {
      return res.status(404).json({ error: "Module not found" });
    }

    for (let i = 0; i < courseModule.clips.length; i++) {
      const clipProgress = await prismadb.clipProgress.findUnique({
        where: {
          userId_clipId: { userId, clipId: courseModule.clips[i].id },
        },
      });

      if (clipProgress) {
        courseModule.clips[i].progress = clipProgress.progress;
        courseModule.clips[i].finished = clipProgress.finished;
      }
    }

    console.log("Fetched module:", courseModule);

    return res.status(200).json(courseModule);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
