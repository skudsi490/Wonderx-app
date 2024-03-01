import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { currentUser } = await serverAuth(req, res);

    if (!currentUser || !currentUser.id) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    const userId = currentUser.id;

    if (req.method !== "DELETE") {
      return res.status(405).end();
    }

    const { courseId, profileId, isMainUser } = req.body;

    const existingCourse = await prismadb.course.findUnique({
      where: { id: courseId },
    });

    if (!existingCourse) {
      return res.status(400).json({ message: "Invalid courseId." });
    }

    if (isMainUser) {
      const user = await prismadb.user.findUnique({
        where: { id: userId },
        select: { favoriteIds: true },
      });

      if (user && user.favoriteIds.includes(courseId)) {
        const updatedFavoritesForUser = without(user.favoriteIds, courseId); // Use lodash's without to remove
        await prismadb.user.update({
          where: { id: userId },
          data: { favoriteIds: updatedFavoritesForUser },
        });
        return res.status(200).json({ message: "Removed from favorites" });
      }

      return res
        .status(400)
        .json({ message: "Course not in user's favorites." });
    } else if (profileId) {
      const profile = await prismadb.profile.findUnique({
        where: { id: profileId },
        select: { favoriteIds: true, userId: true },
      });

      if (!profile) {
        return res.status(400).json({ message: "Invalid profile ID." });
      }

      if (profile.userId !== userId) {
        return res
          .status(403)
          .json({ message: "You're not allowed to modify this profile." });
      }

      if (profile.favoriteIds.includes(courseId)) {
        const updatedFavoritesProfile = without(profile.favoriteIds, courseId); // Use lodash's without to remove
        await prismadb.profile.update({
          where: { id: profileId },
          data: { favoriteIds: updatedFavoritesProfile },
        });
        return res
          .status(200)
          .json({ message: "Removed from favorites for the profile" });
      }

      return res
        .status(400)
        .json({ message: "Course not in profile's favorites." });
    } else {
      return res
        .status(400)
        .json({
          message:
            "Invalid input: either isMainUser should be true or provide a valid profileId.",
        });
    }
  } catch (error: any) {
    console.error("Error in unfavorite.ts:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}
