import axios from "axios";
import useSWR from "swr";
import { CourseInterface } from "@/types/index";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useUserFavorites(userId: string) {
  const { data, error } = useSWR<CourseInterface[]>(
    userId ? `/api/favorites?userId=${userId}` : null,
    fetcher
  );

  return { data, error };
}

export default useUserFavorites;
