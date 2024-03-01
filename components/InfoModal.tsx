import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom"; // <-- Added import for ReactDOM
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import StarRatings from "react-star-ratings";

import PlayButton from "@/components/PlayButton";
import FavoriteButton from "@/components/FavoriteButton";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useCourse from "@/hooks/useCourse";
import useReviews from "@/hooks/useReviews";
import useUserProfiles from "@/hooks/useUserProfiles";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserFavorites from "@/hooks/useUserFavorites";
import useProfileFavorites from "@/hooks/useProfileFavorites";
import { CourseInterface, ReviewInterface } from "@/types";

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const [showReviews, setShowReviews] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  const { courseId } = useInfoModalStore();
  const { course = {}, error: courseError } = useCourse(courseId);
  const { reviews, isError: reviewsError } = useReviews(courseId);
  const { data: currentUser } = useCurrentUser();
  const { profiles } = useUserProfiles(currentUser?.id);

  const userProfileFavoritesData = useProfileFavorites(profiles?.[0]?.id || "");
  const userFavoritesData = useUserFavorites(currentUser?.id || "");

  const combinedFavorites = [
    ...(userProfileFavoritesData.data || []),
    ...(userFavoritesData.data || []),
  ];
  const isCourseInFavorites = combinedFavorites.some(
    (course) => course.id === courseId
  );

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("outsideModal")) {
      handleClose();
    }
  };

  useEffect(() => {
    // This will ensure that the code inside this useEffect only runs on the client side,
    // preventing issues during server-side rendering.
    setModalRoot(document.getElementById("modal-root"));
  }, []);

  const toggleReviews = () => {
    setShowReviews((prev) => !prev);
  };

  if (courseError || reviewsError) {
    console.error("Error fetching data:", courseError, reviewsError);
    return <p>Error loading course details.</p>;
  }

  if (!modalRoot) return null; // Return early if modalRoot is not set

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          onClick={handleOutsideClick}
          className="outsideModal z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden bg-zinc-900 drop-shadow-md"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-96">
              <video
                poster={course?.thumbnailUrl}
                autoPlay
                muted
                loop
                src={course?.videoUrl}
                className="w-full brightness-[60%] object-cover h-full"
              />
              <div
                onClick={handleClose}
                className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
              >
                <XMarkIcon className="text-white w-6" />
              </div>

              <div className="absolute bottom-[10%] left-10 space-y-4">
                <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                  {course?.title}
                </h2>
                <div className="flex flex-row gap-4 items-center">
                  <PlayButton courseId={course?.id} />
                  <FavoriteButton
                    courseId={course?.id}
                    userId={currentUser?.id}
                    profileId={profiles?.[0]?.id}
                    isFavorite={isCourseInFavorites}
                  />
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-row items-center gap-4 mb-4">
                <span className="text-green-400 font-semibold text-lg">
                  New
                </span>
                <span className="text-white text-lg">{course?.duration}</span>
                <span className="text-white text-lg">{course?.genre}</span>
                <StarRatings
                  rating={4.5}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="2px"
                />
              </div>

              <p className="text-white text-lg mb-4">{course?.description}</p>

              <div className="mt-4 space-y-4">
                <h3
                  className="text-white text-xl flex items-center justify-between cursor-pointer"
                  onClick={toggleReviews}
                >
                  Reviews
                  <span
                    className={`transform transition-transform ${
                      showReviews ? "rotate-180" : ""
                    }`}
                  >
                    {/* SVG code for a down arrow (chevron) */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 14L6 8L7.41 6.59L12 11.17L16.59 6.59L18 8L12 14Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </h3>
                {showReviews && Array.isArray(reviews) ? (
                  reviews.length > 0 ? (
                    reviews.map((review: ReviewInterface, index: number) => (
                      <div key={index} className="text-white mb-2">
                        <StarRatings
                          rating={review.rating}
                          starRatedColor="yellow"
                          numberOfStars={5}
                          name="rating"
                          starDimension="20px"
                          starSpacing="2px"
                        />
                        {review.review}
                      </div>
                    ))
                  ) : (
                    <div className="text-white mb-2">No reviews available.</div>
                  )
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

export default InfoModal;
