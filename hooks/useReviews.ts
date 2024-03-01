import useSWR from "swr";
import fetcher from "../lib/fetcher";

export function useReviews(courseId?: string) {
  const endpoint = courseId ? `/api/reviews?courseId=${courseId}` : null;
  const { data, error } = useSWR(endpoint, fetcher);

  return {
    reviews: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function postReview(reviewData: any) {
  return fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  }).then((res) => res.json());
}

export default useReviews;
