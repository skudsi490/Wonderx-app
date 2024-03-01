import useSWR from "swr";

interface Profile {
  id: string;
  name: string;
  image: string;
  kidMode: boolean;
  // Add more fields as necessary
}

const fetcher = async (url: string): Promise<Profile> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load profile");
  }
  return response.json();
};

const useProfile = (profileId?: string) => {
  const { data, error } = useSWR<Profile>(
    profileId ? `/api/profiles/${profileId}` : null,
    fetcher
  );

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useProfile;
