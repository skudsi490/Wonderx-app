import axios from "axios";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";

export type ClipProgress = {
  progress: number;
  finished: boolean;
};

const constructEndpoint = (clipId: string, profileId?: string) => {
  let endpoint = `/api/progress/clip?clipId=${clipId}`;

  if (profileId) {
    endpoint += `&profileId=${profileId}`;
  }

  return endpoint;
};

const useClipProgress = (
  clipId: string,
  sessionToken: string,
  profileId?: string
) => {
  const [clipProgress, setClipProgress] = useState<ClipProgress | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = constructEndpoint(clipId, profileId);
      try {
        console.log("Fetching clip progress with endpoint:", endpoint);
        console.log("Using sessionToken:", sessionToken);

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });

        setClipProgress(response.data);
      } catch (err) {
        console.error("Error fetching clip progress:", err);
        setError(err);
      }
    };

    fetchData();
  }, [clipId, profileId, sessionToken]);

  const updateProgress = async (newProgress: number, isFinished: boolean) => {
    const endpoint = constructEndpoint(clipId, profileId);
    try {
      const session = await getSession();
      if (!session) {
        console.error("Not authenticated");
        return;
      }

      const data = {
        profileId,
        clipId,
        progress: newProgress,
        finished: isFinished,
      };

      console.log("Sending update request with data:", data);
      console.log("Using sessionToken:", sessionToken);

      await axios.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`Updating progress for clip ${clipId} with data:`, data);
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  return { clipProgress, updateProgress, error };
};

export default useClipProgress;
