import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { courseId, userId, rating } = req.body;

  if (!courseId || !userId || rating === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating should be between 1 and 5" });
  }

  try {
    // Check if the user has already reviewed this course
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId,
        },
      },
    });

    let review;
    if (existingReview) {
      // Update the review if it exists
      review = await prisma.review.update({
        where: { id: existingReview.id },
        data: { rating: rating },
      });
    } else {
      // Create a new review if it doesn't exist
      review = await prisma.review.create({
        data: {
          rating: rating,
          userId: userId,
          courseId: courseId,
          review: "", // Assuming an empty string for the textual review, update as needed
        },
      });
    }

    return res.status(200).json(review);
  } catch (error) {
    console.error("Error updating/creating review:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
