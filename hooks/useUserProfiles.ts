// E:\NEW\wonderx\hooks\useUserProfiles.ts:

import useSWR from "swr";

interface Profile {
  id: string;
  name: string;
  image: string;
}

async function fetcher(url: string): Promise<Profile[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to load user profiles");
  }
  return res.json();
}

export default function useUserProfiles(userId?: string, excludeId?: string) {
  const shouldFetch = userId ? `/api/profiles?userId=${userId}` : null;

  // Always call useSWR, but pass null as the key when we don't want to fetch
  const { data, error } = useSWR<Profile[]>(shouldFetch, fetcher);

  if (!data) {
    return {
      profiles: [],
      isLoading: true,
      isError: false,
    };
  }

  const filteredProfiles = data.filter((profile) => profile.id !== excludeId);

  return {
    profiles: filteredProfiles,
    isLoading: !error && !data,
    isError: error,
  };
}
