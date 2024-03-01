import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

const getColorFromImage = (image: string): string => {
  const matches = image.match(/default-(\w+)\.png$/);
  return matches ? matches[1] : "unknown";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    if (req.method === "GET") {
      // Fetch only the additional profiles
      const additionalProfiles = await prisma.profile.findMany({
        where: {
          userId: userId as string,
        },
      });

      return res.status(200).json(additionalProfiles);
    } else if (req.method === "POST") {
      // Handling for POST request to create a new profile
      const profileData = req.body;
      const color = getColorFromImage(profileData.image);

      const newProfile = await prisma.profile.create({
        data: {
          ...profileData,
          userId: userId as string,
          color: color,
          kidMode: false,
        },
      });

      return res.status(201).json(newProfile);
    } else {
      // For any other HTTP method
      return res.status(405).end();
    }
  } catch (error: any) {
    console.error("Error in /api/profiles:", error.message);
    return res
      .status(500)
      .json({
        error: "An error occurred while processing your request.",
        details: error.message,
      });
  } finally {
    await prisma.$disconnect();
  }
}
