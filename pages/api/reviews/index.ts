import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const courseId = req.query.courseId as string;
  
    switch (req.method) {
      case 'GET':
        // Handle fetching reviews for a specific course
        const reviews = await prisma.review.findMany({
          where: { courseId: courseId },
          orderBy: { createdAt: 'desc' }, // Newest reviews first
        });
        res.json(reviews);
        break;
      case 'POST':
        // Handle creating a new review
        const { rating, review, userId } = req.body;
        
        if (rating < 1 || rating > 5) {
          return res.status(400).json({ error: 'Rating should be between 1 and 5' });
        }
        
        try {
          const newReview = await prisma.review.create({
            data: { rating, review, userId, courseId },
          });
          res.json(newReview);
        } catch (error) {
          res.status(400).json({ error: 'Could not create review' });
        }
        break;
        
      default:
        res.status(405).end(); // Method Not Allowed
        break;
    }
  }
  