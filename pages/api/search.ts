import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb"; // Adjust the import based on your setup

const searchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  try {
    // Search for courses
    const courses = await prisma.course.findMany({
      where: {
        title: {
          contains: query as string,
          mode: "insensitive", // case-insensitive search
        },
      },
    });

    // Search for genres (assuming your Course model has a 'genre' field as a string)
    const genres = await prisma.course.findMany({
      where: {
        genre: {
          contains: query as string,
          mode: "insensitive",
        },
      },
      select: {
        genre: true,
      },
      distinct: ["genre"],
    });

    // Return aggregated results
    res.status(200).json({
      courses: courses,
      genres: genres.map((g) => g.genre), // Extracting genre strings from the results
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while searching." });
  }
};

export default searchHandler;
