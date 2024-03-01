import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

interface PlayButtonProps {
  courseId: string;
  className?: string; // Add this line
}

const PlayButton: React.FC<PlayButtonProps> = ({ courseId, className }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/watch/${courseId}`)}
      className={`
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        ${className}  // Use the className prop here
      `}
    >
      <PlayIcon className="w-4 md:w-7 text-black mr-1" />
      Play
    </button>
  );
};

export default PlayButton;
