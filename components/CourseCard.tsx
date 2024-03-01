import React from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

import { CourseInterface } from "@/types";
import FavoriteButton from "@/components/FavoriteButton";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserProfiles from "@/hooks/useUserProfiles";
import useUserFavorites from "@/hooks/useUserFavorites";
import useProfileFavorites from "@/hooks/useProfileFavorites";
import { useProfile } from "../contexts/ProfileContext";
import { useUser } from "../contexts/UserContext";
import { CourseInProgress } from "@/hooks/useKeepWatching";

interface CourseCardProps {
  data: CourseInterface;
  progressData?: CourseInProgress;
  loading?: boolean;
  listTitle?: string;
  showProgressBar?: boolean; // This is the prop you need to add
}

const CourseCard: React.FC<CourseCardProps> = ({
  data,
  loading = false,
  listTitle,
  showProgressBar,
}) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const { data: currentUser } = useCurrentUser();
  const { profiles } = useUserProfiles(currentUser?.id);

  const userProfileFavorites = useProfileFavorites(profiles?.[0]?.id);
  const userFavorites = useUserFavorites(currentUser?.id);

  const { profile: activeProfile } = useProfile();
  const { user: activeUser } = useUser();

  if (!activeUser) {
    console.error("Active user is not set.");
  }

  const isMainUserActive = Boolean(activeUser && !activeProfile);

  const favoritesData = profiles?.length ? userProfileFavorites : userFavorites;
  const isCourseInFavorites =
    favoritesData?.data?.some(
      (course: CourseInterface) => course.id === data.id
    ) || false;

    const redirectToWatch = () => {
      console.log(`Redirecting to watch with course ID: ${data.id}`); // Log the course ID
    
      if (activeProfile) {
        console.log(`Redirecting to profile watch page for profile ID: ${activeProfile.id}`);
        router.push(`/watch/${data.id}?profileId=${activeProfile.id}`);
      } else if (activeUser) {
        console.log(`Redirecting to user watch page for user ID: ${activeUser.id}`);
        router.push(`/watch/${data.id}?userId=${activeUser.id}`);
      } else {
        console.log(`Redirecting to general watch page`);
        router.push(`/watch/${data.id}`);
      }
    };
    
  if (!activeUser && !activeProfile) {
    console.error("Active user is not set.");
    // Optionally, you can return early or render a placeholder/loading state if necessary
    // return <LoadingComponent />; or return null;
  }

  const progressPercentage = (data.progress || 0) * 100;

  if (loading) {
    return (
      <div className="animate-pulse group bg-zinc-900 col-span relative h-[12vw]">
        <div className="bg-gray-400 h-[12vw] rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="course-card-container">
      <div className="group bg-zinc-900 col-span relative h-[12vw]">
        <Image
          onClick={redirectToWatch}
          src={data.thumbnailUrl}
          alt="Course"
          width={160}
          height={90}
          draggable={false}
          className="cursor-pointer object-cover transition shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
        />
        <div className="opacity-0 absolute top-0 transition z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
          <img
            onClick={redirectToWatch}
            src={data.thumbnailUrl}
            alt="Course"
            draggable={false}
            className="cursor-pointer object-cover transition shadow-xl rounded-t-md w-full h-[12vw]"
          />
          <div className="absolute bottom-4 left-0 right-0 bg-opacity-60 bg-black p-2 text-center">
            <h3 className="text-white font-semibold mb-1">{data.title}</h3>
            <p className="text-white text-xs">{data.duration}</p>
          </div>
          <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
            <div className="flex flex-row items-center gap-3">
              <div
                onClick={redirectToWatch}
                aria-label="Play course"
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              >
                <PlayIcon className="text-black w-4 lg:w-6 hover:w-8 lg:hover:w-10 transition-transform" />
              </div>
              <FavoriteButton
                courseId={data.id}
                userId={isMainUserActive ? activeUser?.id : undefined}
                profileId={activeProfile?.id}
                isFavorite={isCourseInFavorites}
                fromMyList={listTitle === "My List"}
              />
              <div
                onClick={() => openModal(data?.id)}
                className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
              >
                <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
              </div>
            </div>
            <p className="text-green-400 font-semibold mt-4">
              New <span className="text-white">2023</span>
            </p>
            <div className="flex flex-row mt-4 gap-2 items-center">
              <p className="text-white text-[10px] lg:text-sm">
                {data.duration}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
              <p>{data.genre}</p>
            </div>
          </div>
        </div>
      </div>
      {showProgressBar && (
        <div className="course-progress-bar bg-zinc-700 rounded-lg h-1.5 mt-2 relative overflow-hidden">
          <div
            className="course-progress bg-green-400 absolute left-0 top-0 h-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      )}
      <div className="course-title-container mt-2">
        <p className="course-title text-white text-center">{data.title}</p>
      </div>
    </div>
  );
};

export default React.memo(CourseCard);

