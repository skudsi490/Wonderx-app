import { useState } from "react";

interface ProfileUpdateData {
  name?: string;
  image?: string;
}

function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const updateProfile = async (profileId: string, data: ProfileUpdateData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/profiles/${profileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile.");
      }

      const updatedProfile = await response.json();
      return updatedProfile;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
    error,
  };
}

export default useUpdateProfile;
