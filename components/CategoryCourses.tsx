import React from "react";
import useCategoryCourses from "@/hooks/useCategoryCourses";
import CourseList from "@/components/CourseList";
import CourseCardSkeleton from "@/components/CourseCardSkeleton"; // Ensure this is imported

type Props = {
  genre: string;
};

const Error: React.FC<{ genre: string }> = ({ genre }) => (
  <div className="p-4 text-center text-red-500">
    <p>Oops! An error occurred while loading {genre} courses.</p>
  </div>
);

const CategoryCourses: React.FC<Props> = ({ genre }) => {
  const { courses, isLoading, isError } = useCategoryCourses(genre);

  if (isLoading) return <CourseCardSkeleton />;
  if (isError) return <Error genre={genre} />;

  return <CourseList title={genre} data={courses} />;
};

export default CategoryCourses;
