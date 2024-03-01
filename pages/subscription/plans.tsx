import React, { useState, useEffect } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

interface Plan {
  id: string;
  name: string;
  description: string;
  amount: number;
  interval: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/get-plans");
        const data = await res.json();

        const plans = data.data.map((plan: any) => ({
          id: plan.id,
          name: plan.product, // adjust this if product is not the name
          description: plan.nickname, // adjust this
          amount: plan.unit_amount,
          interval: plan.recurring.interval,
        }));

        setPlans(plans);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  const subscribeToPlan = async (planId: string) => {
    const stripe = await stripePromise; // Await the stripePromise to get the actual Stripe instance

    try {
      const sessionRes = await fetch(`/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId: planId }),
      });
      const session = await sessionRes.json();

      if (stripe) {
        // Check if stripe is not null
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      } else {
        console.error("Stripe has not been properly initialized.");
      }
    } catch (error) {
      console.error("Error subscribing to plan:", error);
    }
  };

  if (loading)
    return <p className="text-center text-white mt-4">Loading plans...</p>;
  if (error) return <p className="text-center text-white mt-4">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl md:text-6xl text-white text-center mb-8">
        Choose Your Plan
      </h1>
      <div className="grid gap-8 md:gap-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col items-center p-4 bg-gray-800 rounded-md"
          >
            <h2 className="text-2xl text-white mb-4">{plan.name}</h2>
            <p className="text-white mb-4">{plan.description}</p>
            <p className="text-white mb-6">
              ${plan.amount / 100} per {plan.interval}
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
              onClick={() => subscribeToPlan(plan.name.toLowerCase())}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
