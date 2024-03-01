// pages/api/courses/index.ts

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

    const genre: string | string[] | undefined = req.query.genre;

    let courses;
    if (genre && typeof genre === "string") {
      // If genre query parameter is provided, filter courses by genre
      courses = await prismadb.course.findMany({
        where: {
          genre: genre,
        },
      });
    } else {
      // If no genre query parameter is provided, return all courses
      courses = await prismadb.course.findMany();
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
