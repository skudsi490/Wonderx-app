import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

// A mapping of plan names to Stripe price IDs. This should be kept secret on the server.
const PLAN_TO_PRICE_ID = {
  basic: "price_xxxx", // Replace with your actual Stripe price ID for basic plan
  standard: "price_yyyy", // Replace with your actual Stripe price ID for standard plan
  premium: "price_zzzz", // Replace with your actual Stripe price ID for premium plan
};

type PlanName = "basic" | "standard" | "premium";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Get the plan name from the request body
      const planName: PlanName = req.body.planName;

      // Look up the price ID using the mapping
      const priceId = PLAN_TO_PRICE_ID[planName];
      if (!priceId) {
        return res.status(400).json({ error: "Invalid plan name" });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        // ... in create-checkout-session.ts ...

        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/canceled`,
      });

      res.status(200).json({ id: session.id });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: `Failed to create checkout session: ${error.message}` });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
