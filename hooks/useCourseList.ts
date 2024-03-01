import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { CourseInterface } from "@/types";

export interface QueryParams {
  [key: string]: string | undefined;
}

const useCourseList = (queryParams?: QueryParams) => {
  let queryString = "";

  if (queryParams) {
    const paramsArray = Object.entries(queryParams)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => [key, value as string]);

    queryString = "?" + new URLSearchParams(paramsArray as any).toString();
  }

  const url = `/api/courses${queryString}`;
  const { data, error } = useSWR<CourseInterface[]>(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};

export default useCourseList;
