import axios from "axios";
import useSWR from "swr";
import { CourseInterface } from "@/types/index";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useProfileFavorites(profileId: string) {
  const { data, error } = useSWR<CourseInterface[]>(
    profileId ? `/api/favorites?profileId=${profileId}` : null,
    fetcher
  );

  return { data, error };
}

export default useProfileFavorites;
