// E:\wonderx\components\KeepWatchingCard.tsx
import React from 'react';
import { CourseInProgress } from "@/hooks/useKeepWatching";

interface KeepWatchingCardProps {
  progressData: CourseInProgress;
}

const KeepWatchingCard: React.FC<KeepWatchingCardProps> = ({ progressData }) => {
  const { title, thumbnailUrl, progress, duration } = progressData;

  const progressBarStyle = {
    width: `${progress}%`
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex flex-col">
      <img src={thumbnailUrl || '/default-thumbnail.jpg'} alt={title} className="rounded-md mb-4"/>
      <div className="flex-grow">
        <h5 className="text-lg font-semibold">{title}</h5>
        <p className="text-sm">{duration}</p>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={progressBarStyle}></div>
      </div>
    </div>
  );
};

export default KeepWatchingCard;
