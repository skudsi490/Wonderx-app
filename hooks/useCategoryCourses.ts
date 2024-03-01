import useSWR from "swr";

export default function useCategoryCourses(genre: string) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/courses?genre=${genre}`, fetcher);

  return {
    courses: data, // assuming the backend returns an array of courses
    isLoading: !error && !data,
    isError: error,
  };
}
