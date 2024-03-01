import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, profileId } = req.query;

    if (userId) {
      const user = await prismadb.user.findUnique({
        where: { id: userId as string },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const favoriteCourses = await prismadb.course.findMany({
        where: { id: { in: user.favoriteIds } },
      });

      return res.status(200).json(favoriteCourses);
    } else if (profileId) {
      const profile = await prismadb.profile.findUnique({
        where: { id: profileId as string },
      });

      if (!profile) {
        return res.status(404).json({ message: "Profile not found." });
      }

      const favoriteCourses = await prismadb.course.findMany({
        where: { id: { in: profile.favoriteIds } },
      });

      return res.status(200).json(favoriteCourses);
    } else {
      return res
        .status(400)
        .json({ message: "Either userId or profileId must be provided." });
    }
  } catch (error: any) {
    console.error("Error message in favorites.ts:", error.message);
    console.error("Full error in favorites.ts:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
