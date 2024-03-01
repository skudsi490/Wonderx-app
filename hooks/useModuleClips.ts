import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export interface ClipType {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  duration: string;
  moduleId: string;
}

function useModuleClips(moduleId: string) {
  const {
    data: clips,
    error,
    isLoading,
  } = useSWR(moduleId ? `/api/modules/${moduleId}/clips` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    clips,
    error,
    isLoading,
  };
}

export default useModuleClips;
