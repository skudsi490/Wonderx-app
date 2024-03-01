import React, { useState, useEffect } from "react";
import { ReviewInterface } from "../types/index";

interface ReviewsProps {
  courseId: string;
}

const Reviews: React.FC<ReviewsProps> = ({ courseId }) => {
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [rating, setRating] = useState(3); // Default rating
  const [reviewContent, setReviewContent] = useState("");

  useEffect(() => {
    // Fetch reviews when component mounts
    async function fetchReviews() {
      try {
        const response = await fetch(`/api/reviews?courseId=${courseId}`);
        const data: ReviewInterface[] = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, [courseId]);

  const handleSubmitReview = async () => {
    // Handle review submission to API
    try {
      const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          review: reviewContent,
          courseId,
          // userId: ... (Fetch from session or context)
        }),
      });
      const newReview: ReviewInterface = await response.json();
      setReviews([...reviews, newReview]); // Optimistically update reviews
      setReviewContent(""); // Clear review content
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.rating} Stars</p>
          <p>{review.review}</p>
          <hr />
        </div>
      ))}
      <div>
        <h3>Submit Your Review:</h3>
        <textarea
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
        <button onClick={handleSubmitReview}>Submit</button>
      </div>
    </div>
  );
};

export default Reviews;
