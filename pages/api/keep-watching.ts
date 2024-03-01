import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prismadb from "@/lib/prismadb";

const secret = process.env.NEXTAUTH_JWT_SECRET;

const keepWatchingHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  let userId = req.query.userId as string;
  const profileId = req.query.profileId as string;

  if (!userId) {
    const token = await getToken({ req, secret });
    userId = token?.userId as string;
  }

  if (!userId && !profileId) {
    return res
      .status(400)
      .json({ error: "Either userId or profileId is required." });
  }

  try {
    let coursesInProgress;

    if (userId) {
      coursesInProgress = await prismadb.courseProgress.findMany({
        where: {
          userId,
          progress: {
            lt: 100,
          },
        },
      });
    } else if (profileId) {
      coursesInProgress = await prismadb.courseProgress.findMany({
        where: {
          profileId,
          progress: {
            lt: 100,
          },
        },
      });
    }

    return res.json(coursesInProgress);
  } catch (error: any) {
    console.error("Error fetching courses in progress:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default keepWatchingHandler;
