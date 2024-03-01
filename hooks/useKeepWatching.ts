import { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

export interface CourseInProgress {
  id: string; // This represents the ID of the course progress
  courseId: string; // Add this to represent the ID of the course
  progress: number;
  title?: string;
  thumbnailUrl?: string;
  duration?: string;
  genre?: string;
}

const useKeepWatching = (userId?: string, profileId?: string) => {
  const [coursesInProgress, setCoursesInProgress] = useState<
    CourseInProgress[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeepWatchingData = async () => {
      try {
        let endpoint = "/api/keep-watching";
        if (userId) {
          endpoint += `?userId=${userId}`;
        } else if (profileId) {
          endpoint += `?profileId=${profileId}`;
        }

        const session = await getSession();

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        const fetchedCourses = response.data;

        const enrichedCourses = await Promise.all(
          fetchedCourses.map(async (course: CourseInProgress) => {
            try {
              const courseDetailsResponse = await axios.get(
                `/api/courses/${course.courseId}`
              );

              const courseDetails = courseDetailsResponse.data;

              return {
                id: course.id,
                progress: course.progress,
                title: courseDetails.title,
                thumbnailUrl: courseDetails.thumbnailUrl,
                duration: courseDetails.duration,
                genre: courseDetails.genre,
              };
            } catch (err: any) {
              console.error(
                "Error enriching course with ID:",
                course.id,
                err.message
              ); // Notice the change here
              return null; // Return null for this specific course if there's an error
            }
          })
        );

        // Filter out any null values if there were errors during enrichment
        const validEnrichedCourses = enrichedCourses.filter(
          (course) => course !== null
        );

        setCoursesInProgress(validEnrichedCourses);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching Keep Watching data:", err.message);
        setError(err.message);
      }
    };

    fetchKeepWatchingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data: coursesInProgress,
    error,
  };
};

export default useKeepWatching;
