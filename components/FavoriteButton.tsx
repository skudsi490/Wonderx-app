import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUserFavorites from "@/hooks/useUserFavorites";
import useProfileFavorites from "@/hooks/useProfileFavorites";
import { CourseInterface } from "../types/index";
import { mutate } from "swr";

interface FavoriteButtonProps {
  courseId: string;
  userId?: string;
  profileId?: string;
  isFavorite?: boolean;
  fromMyList?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  courseId,
  userId,
  profileId,
  fromMyList = false,
}) => {
  const { data: currentUser } = useCurrentUser();
  const userFavoritesData = useUserFavorites(userId || currentUser?.id || "");
  const profileFavoritesData = useProfileFavorites(profileId || "");

  const favoritesData = profileId ? profileFavoritesData : userFavoritesData;
  const favoritesCoursesList = favoritesData?.data || [];
  const isFavorite = favoritesCoursesList.some(
    (course: CourseInterface) => course.id === courseId
  );

  const [isCourseFavorite, setIsCourseFavorite] = useState(isFavorite || false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsCourseFavorite(isFavorite);
  }, [isFavorite]);

  const toggleFavorites = useCallback(async () => {
    const apiUrl = isCourseFavorite ? "/api/unfavorite" : "/api/favorite";

    const requestData = {
      courseId,
      userId: userId || currentUser?.id,
      profileId,
      isMainUser: !profileId, // If no profileId, it means it's the main user
    };

    try {
      await axios(apiUrl, {
        method: isCourseFavorite ? "DELETE" : "POST",
        data: requestData,
      });

      setIsCourseFavorite((prev) => !prev);

      // Update the cache using mutate
      mutate(
        `/api/favorites?userId=${userId || currentUser?.id}`,
        (data: any) => {
          if (!data || !Array.isArray(data.data)) return;
          return {
            ...data,
            data: isCourseFavorite
              ? data.data.filter(
                  (course: CourseInterface) => course.id !== courseId
                )
              : [...data.data, { id: courseId }],
          };
        }
      );

      if (profileId) {
        mutate(`/api/favorites?profileId=${profileId}`);
      }
    } catch (err: any) {
      const errorData = err?.response?.data;
      setErrorMessage(errorData?.message || "Error while toggling favorite.");
    }
  }, [courseId, isCourseFavorite, userId, profileId, currentUser?.id]);

  const Icon = isCourseFavorite ? CheckIcon : PlusIcon;

  return (
    <div>
      <div
        onClick={toggleFavorites}
        className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
      >
        <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default FavoriteButton;
