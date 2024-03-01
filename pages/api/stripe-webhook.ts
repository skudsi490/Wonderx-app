import { Stripe } from "stripe";
import prismadb from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe("your-secret-key", { apiVersion: "2023-08-16" });

export async function handleStripeWebhook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig = req.headers["stripe-signature"];
  if (!sig) {
    return res.status(400).send("Stripe Signature is missing.");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      "your-webhook-secret"
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;
    const customerId = session.customer;

    // Find the user with the corresponding Stripe Customer ID
    const user = await prismadb.user.findFirst({
      where: { stripeCustomerId: customerId as string },
    });

    if (user) {
      // Update the user's subscription status (or create a Subscription record)
      // based on the data in the event.
      // You'll need to customize this logic based on your application's needs.
    }
  }

  res.json({ received: true });
}
