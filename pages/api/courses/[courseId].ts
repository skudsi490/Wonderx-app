import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

type Clip = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  duration: string;
};

type Module = {
  id: string;
  title: string;
  clips: Clip[];
};

type Course = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
  modules: Module[];
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

    const { courseId } = req.query;

    if (typeof courseId !== "string") {
      throw new Error("Invalid Id");
    }

    if (!courseId) {
      throw new Error("Missing Id");
    }

    // Fetch the course with its associated modules and clips
    const course = await prismadb.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        modules: {
          include: {
            clips: true,
          },
        },
      },
    });

    return res.status(200).json(course);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
