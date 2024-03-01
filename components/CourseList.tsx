import React from "react";
import CourseCard from "./CourseCard";
import { CourseInterface } from "@/types";
import useKeepWatching from "@/hooks/useKeepWatching";
import { CourseInProgress } from "@/hooks/useKeepWatching";

interface CourseListProps {
  title: string;
  data: CourseInterface[];
}

const CourseList: React.FC<CourseListProps> = ({ data, title }) => {
  const courseProgressData = useKeepWatching(); // Call the hook to get the progress data

  if (!data || data.length === 0) {
    return <div>No courses available in {title}.</div>;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {data.map((course) => {
            const progress = courseProgressData.data.find(
              (cp) => cp.courseId === course.id
            );
            return (
              <CourseCard
                key={course.id}
                data={course}
                progressData={progress}
                showProgressBar={title === "Keep Watching"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CourseList);
