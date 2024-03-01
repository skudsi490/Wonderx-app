import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const CoursesCount = await prismadb.course.count();
    const randomIndex = Math.floor(Math.random() * CoursesCount);

    const randomCourses = await prismadb.course.findMany({
      take: 1,
      skip: randomIndex,
    });

    return res.status(200).json(randomCourses[0]);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
