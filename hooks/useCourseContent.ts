import useCourse from "./useCourse";

export interface ClipType {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  duration: string;
  courseId: string;
}

export interface ModuleType {
  id: string;
  title: string;
  clips: ClipType[];
}

function useCourseContent(courseId: string) {
  const { course, isLoading } = useCourse(courseId);

  return {
    modules: course?.modules || [],
    loading: isLoading,
  };
}

export default useCourseContent;
