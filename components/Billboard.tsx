import React, { useCallback } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import PlayButton from "@/components/PlayButton";
import useBillboard from "@/hooks/useBillboard";
import useInfoModalStore from "@/hooks/useInfoModalStore";

const Billboard: React.FC = () => {
  const { openModal } = useInfoModalStore();
  const { data } = useBillboard();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  // Limit the description to a fixed number of characters for the featured course display
  const shortDescription = data?.description
    ? data.description.slice(0, 120) + "..."
    : "";

  return (
    <div className="billboard-container relative h-[56.25vw] bg-gradient-to-t from-black to-transparent">
      <video
        poster={data?.thumbnailUrl}
        className="w-full h-[56.25vw] object-cover brightness-75 transition duration-500"
        autoPlay
        muted
        loop
        src={data?.trailerVideoUrl}
        aria-label="Billboard video"
      ></video>
      <div className="absolute top-[25%] md:top-[35%] ml-4 md:ml-16">
        <p className="text-white text-2xl md:text-6xl h-full w-[50%] lg:text-7xl font-bold drop-shadow-xl mb-4">
          {data?.title}
        </p>
        <p className="text-white text-sm md:text-lg mt-2 w-[90%] md:w-[80%] lg:w-[60%] drop-shadow-xl mb-5">
          {shortDescription}
        </p>
        <div className="flex flex-row items-center mt-2 md:mt-4 gap-4">
          <PlayButton
            courseId={data?.id}
            className="bg-red-500 hover:bg-red-600 py-2 px-5 rounded-md transition-all duration-300 transform hover:scale-105"
          />
          <button
            onClick={handleOpenModal}
            className="
              bg-gray-700 bg-opacity-70 
              hover:bg-opacity-85
              text-white 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              transition
              transform hover:scale-105
            "
            aria-label="More information"
          >
            <InformationCircleIcon className="w-4 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
