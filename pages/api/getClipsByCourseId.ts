import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { courseId } = req.query;

  try {
    // Fetch modules associated with the course ID and include their clips
    const modulesWithClips = await prismadb.module.findMany({
      where: {
        courseId: courseId as string,
      },
      include: {
        clips: true,
      },
    });

    // Flatten the nested arrays of Clips
    const allClips = modulesWithClips.flatMap((module) => module.clips);

    return res.status(200).json(allClips);
  } catch (error: any) {
    console.error("Error fetching clips:", error);
    return res
      .status(500)
      .json({ error: `Failed to fetch clips. Error: ${error.message}` });
  }
}
