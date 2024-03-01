import React from "react";
import useClipProgress from "@/hooks/useClipProgress";

type ClipCardProps = {
  clipId: string; // Make clipId a required prop
  profileId?: string;
  title?: string;
  duration?: string;
  progress?: number;
  finished?: boolean;
  loading?: boolean;
  onClick?: () => void;
  sessionToken: string; // Add sessionToken to the props
};

const ClipCard: React.FC<ClipCardProps> = ({
  clipId,
  profileId = "",
  title,
  duration,
  progress,
  finished = false,
  loading = false,
  onClick,
  sessionToken,
}) => {
  // Always call the hook and provide default values if necessary
  const { clipProgress } = useClipProgress(
    clipId,
    profileId || "",
    sessionToken
  );
  const displayedProgress =
    progress !== undefined ? progress : clipProgress?.progress;

  if (loading) {
    return (
      <div
        className="animate-pulse cursor-pointer border border-gray-300 p-4 m-2 relative"
        onClick={onClick}
      >
        <div className="bg-gray-400 w-full h-0 pb-[56.25%]"></div>
        <h3 className="bg-gray-400 mt-4 w-1/2 h-5"></h3>
      </div>
    );
  }

  const progressBarColor = finished ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className="cursor-pointer border border-gray-300 p-4 m-2 relative"
      onClick={onClick}
    >
      {displayedProgress !== undefined && (
        <div
          className={`absolute bottom-0 left-0 ${progressBarColor} h-1`}
          style={{ width: `${displayedProgress * 100}%` }}
        ></div>
      )}
      <h3 className="font-bold mt-2">{title}</h3>
      {duration && <p>{duration}</p>}
    </div>
  );
};

export default ClipCard;
