import { useEffect, useState } from "react";

function useSubscription(userId: string) {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the user's subscription from your backend
    async function fetchSubscription() {
      try {
        const response = await fetch(`/api/subscriptions?userId=${userId}`);
        const data = await response.json();
        setSubscription(data.subscription); // Adjust this based on your API's response structure
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [userId]);

  return { subscription, loading };
}

export default useSubscription;
