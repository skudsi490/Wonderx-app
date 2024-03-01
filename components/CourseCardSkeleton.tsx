import React from "react";

const CourseCardSkeleton: React.FC = () => {
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw] p-4 rounded-md shadow-md animate-pulse">
      {/* Thumbnail placeholder */}
      <div className="bg-gray-600 rounded-md w-full h-[12vw] mb-4"></div>

      {/* Title placeholder */}
      <div className="bg-gray-500 h-4 w-3/4 rounded mb-4"></div>

      {/* Action buttons placeholder */}
      <div className="flex justify-between mb-4">
        <div className="bg-gray-500 rounded-full w-6 h-6"></div>
        <div className="bg-gray-500 rounded-full w-6 h-6"></div>
      </div>

      {/* Text placeholders */}
      <div className="bg-gray-500 h-4 w-1/2 rounded mb-2"></div>
      <div className="bg-gray-500 h-3 w-3/4 rounded mb-2"></div>
      <div className="bg-gray-500 h-3 w-1/3 rounded"></div>
    </div>
  );
};

export default CourseCardSkeleton;
