import React from "react";
import useClipProgress from "../hooks/useClipProgress";
import ClipCard from "./ClipCard";
import { useUser } from "../pages/UserContext";

type ClipWithDataProps = {
  clip: {
    id: string;
    title: string;
    duration: string;
  };
  profileId?: string;
  sessionToken: string;
};

const ClipWithData: React.FC<ClipWithDataProps> = ({
  clip,
  profileId,
  sessionToken,
}) => {
  const { user } = useUser();

  // We'll ensure that the hooks are always called in the same order.
  const { clipProgress } = useClipProgress(clip.id, sessionToken, profileId);

  // If there's no user, we'll handle it appropriately.
  if (!user) {
    console.error("No active user found.");
    return null;
  }

  console.log(
    `Rendering ClipWithData for clipId ${clip.id} with profileId ${profileId}`
  );
  console.log(`Progress data for clip ${clip.id}:`, clipProgress);

  return (
    <ClipCard
      clipId={clip.id}
      title={clip.title}
      duration={clip.duration}
      progress={clipProgress?.progress}
      finished={clipProgress?.finished}
      sessionToken={sessionToken}
      onClick={() => {
        /* Whatever action you want on clip click */
      }}
    />
  );
};

export default ClipWithData;
