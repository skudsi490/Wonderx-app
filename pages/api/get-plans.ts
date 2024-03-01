import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-08-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // List all plans. Note: You might want to filter or sort these based on your needs
    const plans = await stripe.prices.list({ active: true, limit: 10 });

    // Return plans as JSON
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch plans" });
  }
}
