import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { currentUser } = await serverAuth(req, res);

    if (!currentUser) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    if (req.method !== "POST") {
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
      // Main user logic
      const user = await prismadb.user.findUnique({
        where: { id: currentUser.id },
        select: { favoriteIds: true },
      });

      if (user) {
        if (!user.favoriteIds.includes(courseId)) {
          const updatedFavoritesForUser = [
            ...(user.favoriteIds || []),
            courseId,
          ];
          await prismadb.user.update({
            where: { id: currentUser.id },
            data: { favoriteIds: updatedFavoritesForUser },
          });
          return res.status(200).json({ message: "Added to favorites" });
        } else {
          // If the course is already in the user's favorites, remove it
          const updatedFavoritesForUser = without(user.favoriteIds, courseId);
          await prismadb.user.update({
            where: { id: currentUser.id },
            data: { favoriteIds: updatedFavoritesForUser },
          });
          return res.status(200).json({ message: "Removed from favorites" });
        }
      } else {
        return res.status(404).json({ message: "User not found." });
      }
    } else if (profileId) {
      // Profile logic
      const profile = await prismadb.profile.findUnique({
        where: { id: profileId },
        select: { favoriteIds: true, userId: true },
      });

      if (!profile) {
        return res.status(400).json({ message: "Invalid profile ID." });
      }

      if (profile.userId !== currentUser.id) {
        return res
          .status(403)
          .json({ message: "You're not allowed to modify this profile." });
      }

      if (!profile.favoriteIds.includes(courseId)) {
        const updatedFavoritesProfile = [...profile.favoriteIds, courseId];
        await prismadb.profile.update({
          where: { id: profileId },
          data: { favoriteIds: updatedFavoritesProfile },
        });
        return res
          .status(200)
          .json({ message: "Added to favorites for the profile" });
      } else {
        // If the course is already in the profile's favorites, remove it
        const updatedFavoritesProfile = without(profile.favoriteIds, courseId);
        await prismadb.profile.update({
          where: { id: profileId },
          data: { favoriteIds: updatedFavoritesProfile },
        });
        return res
          .status(200)
          .json({ message: "Removed from profile's favorites" });
      }
    } else {
      return res
        .status(400)
        .json({
          message:
            "Invalid input: either isMainUser should be true or provide a valid profileId.",
        });
    }
  } catch (error: any) {
    console.error("Error in favorite.ts:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
}
