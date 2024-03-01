import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

type CourseProgressData = {
  id: string;
  userId?: string;
  profileId?: string;
  courseId: string;
  progress: number;
  finished: boolean;
  lastWatchedClipId?: string;
  lastWatchedAt?: Date;
};

const useCourseProgress = (courseId: string) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [courseProgress, setCourseProgress] = useState<CourseProgressData | null>(null);

  const fetchCourseProgress = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/progress/course?courseId=${courseId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      setCourseProgress(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [courseId, session]);

  const updateCourseProgress = async (progressData: Partial<CourseProgressData>) => {
    try {
      const response = await axios.post(`/api/progress/course?courseId=${courseId}`, progressData, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      setCourseProgress(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (session) {
      fetchCourseProgress();
    }
  }, [session, courseId, fetchCourseProgress]);

  return {
    loading,
    error,
    courseProgress,
    updateCourseProgress,
  };
};

export default useCourseProgress;
