import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { profileId } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const profile = await prisma.profile.findUnique({
          where: { id: profileId as string },
        });

        if (!profile) {
          return res.status(404).json({ error: "Profile not found." });
        }

        return res.status(200).json(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ error: "Failed to fetch profile." });
      }

    case "PUT":
      try {
        const data = req.body;
        const updatedProfile = await prisma.profile.update({
          where: { id: profileId as string },
          data,
        });
        return res.status(200).json(updatedProfile);
      } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ error: "Failed to update profile." });
      }

    case "DELETE":
      try {
        await prisma.profile.delete({
          where: { id: profileId as string },
        });
        return res.status(204).end();
      } catch (error) {
        console.error("Error deleting profile:", error);
        return res.status(500).json({ error: "Failed to delete profile." });
      }

    default:
      return res.status(405).end();
  }
}
