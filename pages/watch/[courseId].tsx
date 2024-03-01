import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  PlayIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useCourse from "@/hooks/useCourse";
import useCourseContent, {
  ModuleType,
  ClipType,
} from "@/hooks/useCourseContent";
import useClipProgress from "@/hooks/useClipProgress";
import ReactPlayer from "react-player";
import useSWRProfile from "@/hooks/useProfile";
import axios from "axios";

const Watch: React.FC = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const profileId = router.query.profileId as string | undefined;

  const { data: session } = useSession();
  const sessionToken = (session as any)?.token || "";
  const userId = session?.user?.email || null;

  const { course, isLoading } = useCourse(courseId as string);
  const { modules } = useCourseContent(courseId as string);
  const allClips = modules?.flatMap((module: ModuleType) => module.clips) || [];

  const [playingClipId, setPlayingClipId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { clipProgress: currentClipProgress, updateProgress } = useClipProgress(
    playingClipId || "",
    sessionToken,
    profileId
  );

  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch the profile details using SWR when profileId is available
  const { data: fetchedProfile } = useSWRProfile(profileId);

  const handleClipClick = (clipId: string) => {
    setIsPlaying(false);
    setPlayingClipId(clipId);
  };

  const handleSeekComplete: () => void = () => {
    setIsPlaying(false);
  };

  const updateBackendWithProgress = async (played: number) => {
    if (!userId || !playingClipId) return;

    const finished = played >= 0.95;
    const body: any = {
      userId,
      clipId: playingClipId,
      progress: played,
      finished,
    };

    if (profileId) body.profileId = profileId;

    try {
      console.log("Sending axios POST with body:", body);
      const response = await axios.post("/api/progress/clip", body);
      console.log("Response:", response.data);
    } catch (error: any) {
      console.error(
        "Failed to update progress:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleProgress = ({ played }: { played: number }) => {
    if (played > (currentClipProgress?.progress || 0) + 0.1) {
      const isFinished = played >= 0.95;
      updateProgress(played, isFinished);
      updateBackendWithProgress(played);
    }
  };

  const videoURL = playingClipId
    ? allClips.find((clip: ClipType) => clip.id === playingClipId)?.videoUrl
    : course?.trailerVideoUrl;

  const SidebarClip: React.FC<{
    clip: ClipType;
    isActive: boolean;
    onClick: () => void;
    profileId?: string;
  }> = ({ clip, isActive, onClick, profileId }) => {
    const { clipProgress } = useClipProgress(
      clip.id,
      sessionToken,
      profileId || ""
    );
    const progressBarWidth = (clipProgress?.progress || 0) * 100;

    return (
      <div
        key={clip.id}
        className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition ${
          isActive ? "bg-gray-800" : ""
        }`}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          {isActive ? (
            <PlayIcon
              className="w-6 text-white"
              aria-label="Currently playing"
            />
          ) : clipProgress?.progress === 1 ? (
            <CheckIcon className="w-6 text-green-500" aria-label="Completed" />
          ) : null}
          <span className="text-white text-sm md:text-base">{clip.title}</span>
        </div>
        <div className="relative w-1/2 h-1.5 bg-gray-800 rounded-lg">
          <div
            style={{ width: `${progressBarWidth}%` }}
            className="absolute h-full bg-green-500 rounded-lg transition-width"
            aria-label={`${progressBarWidth}% completed`}
          ></div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (playerRef.current && currentClipProgress?.progress) {
      const seekTimeInSeconds =
        currentClipProgress.progress * playerRef.current.getDuration();
      if (isFinite(seekTimeInSeconds)) {
        playerRef.current.seekTo(seekTimeInSeconds, "seconds");
        setIsPlaying(true);
      }
    }
  }, [playingClipId, currentClipProgress?.progress]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col md:flex-row">
      <nav className="fixed top-0 left-0 w-full p-4 z-50 flex items-center justify-between bg-black bg-opacity-90 backdrop-blur-md">
        <ArrowLeftIcon
          onClick={() => router.push("/")}
          className="w-6 md:w-8 text-white cursor-pointer hover:opacity-80 transition-transform transform hover:scale-110"
          aria-label="Back"
        />
        <p className="text-white text-lg md:text-2xl font-semibold tracking-wide flex-grow">
          <span className="font-light">Watching:</span>{" "}
          {course?.title || "Loading..."}
        </p>
        <div className="absolute top-4 right-4 md:fixed">
          {sidebarOpen ? (
            <XMarkIcon
              className="w-6 md:w-8 text-white cursor-pointer"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            />
          ) : (
            <div
              className="w-6 md:w-8 text-white cursor-pointer"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              ☰
            </div>
          )}
        </div>
      </nav>
      <div
        className={`relative z-10 ${
          sidebarOpen ? "md:w-3/4 w-full" : "w-full"
        }`}
      >
        {playingClipId || course?.trailerVideoUrl ? (
          <ReactPlayer
            url={videoURL}
            controls={true}
            ref={playerRef}
            playing={isPlaying}
            onSeek={handleSeekComplete}
            width="100%"
            height="100%"
            loop={true}
            onProgress={handleProgress}
            onError={(e) => console.error("ReactPlayer Error:", e)}
            config={{
              file: {
                forceVideo: true,
                attributes: { controlsList: "nodownload" },
              },
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            {isLoading ? (
              <span className="text-white">Loading...</span>
            ) : (
              <span className="text-red-500">Video URL not found.</span>
            )}
          </div>
        )}
      </div>
      <div
        className={`custom-scrollbar transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } fixed z-50 top-16 bottom-0 right-0 w-full md:w-1/4 bg-black overflow-y-auto p-4 space-y-4`}
      >
        <h2 className="text-white text-2xl mb-6 font-bold border-b border-gray-700 pb-2">
          Content
        </h2>
        {/* Displaying the fetched profile name (you can design this part as per your needs) */}
        {fetchedProfile && (
          <div className="mb-4">
            <span className="text-white">
              Profile Name: {fetchedProfile.name}
            </span>
          </div>
        )}
        {isLoading ? (
          <span className="text-white">Loading course content...</span>
        ) : (
          modules.map((module: ModuleType) => (
            <div key={module.id} className="my-4">
              <h3 className="text-white text-xl font-semibold border-b border-gray-800 pb-2 mb-4">
                {module.title}
              </h3>
              {module.clips.map((clip: ClipType) =>
                userId ? (
                  <SidebarClip
                    key={clip.id}
                    clip={clip}
                    isActive={playingClipId === clip.id}
                    onClick={() => handleClipClick(clip.id)}
                    profileId={profileId as string}
                  />
                ) : null
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(Watch);
