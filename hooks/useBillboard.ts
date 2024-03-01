import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBillboard = (profileId?: string) => {
  const endpoint = profileId
    ? `/api/random?profileId=${profileId}`
    : `/api/random`;

  const { data, error } = useSWR(endpoint, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useBillboard;
