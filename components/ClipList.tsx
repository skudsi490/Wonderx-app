import React from "react";
import ClipWithData from "./ClipWithData";

type Clip = {
  id: string;
  title: string;
  duration: string;
};

type ClipListProps = {
  clips: Clip[];
  profileId?: string;
  sessionToken: string; // Ensure sessionToken is in the props
};

const ClipList: React.FC<ClipListProps> = ({
  clips,
  profileId,
  sessionToken,
}) => {
  return (
    <div>
      {clips.map((clip) => (
        <ClipWithData
          key={clip.id}
          clip={clip}
          profileId={profileId}
          sessionToken={sessionToken} // Pass the sessionToken to ClipWithData
        />
      ))}
    </div>
  );
};

export default ClipList;
