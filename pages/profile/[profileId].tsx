import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

// Hooks
import useProfile from "@/hooks/useProfile";
import useCourseList from "@/hooks/useCourseList";
import useProfileFavorites from "@/hooks/useProfileFavorites";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useCurrentUser from "@/hooks/useCurrentUser";
import useKeepWatching from "@/hooks/useKeepWatching";

// Components
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import CourseList from "@/components/CourseList";
import InfoModal from "@/components/InfoModal";
import CategoryCourses from "@/components/CategoryCourses";

// Context
import { useProfile as useContextProfile } from "../ProfileContext";
import { CourseInterface } from "@/types/index";

const genres = [
  "Programming",
  "Web Development",
  // ... other genres ...
];

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const ProfilePage = () => {
  const router = useRouter();
  const { profileId } = router.query;

  const { setProfile: setContextProfile } = useContextProfile();
  const { data: profile } = useProfile(profileId as string);
  const { data: courses = [] } = useCourseList();
  const { data: profileFavorites = [] } = useProfileFavorites(
    profileId as string
  );

  const { isOpen, closeModal } = useInfoModalStore();
  const { data: currentUser } = useCurrentUser();
  // Call the hook at the top level
  const { data: coursesInProgress = [], error: keepWatchingError } =
    useKeepWatching(currentUser?.id, profileId as string);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      setContextProfile({
        id: profile.id,
        name: profile.name,
        image: profile.image || "/images/default-blue.png",
      });
      setLoading(false); // Set loading to false when the profile data is fetched
    }
  }, [profile, setContextProfile]);

  const [error, setError] = useState<string | null>(null);
  useEffect(() => {}, []);

  if (!profile) return <div>Loading profile...</div>;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar mainUserId={currentUser?.id} />
      <Billboard />
      <div className="pb-40">
        {error && <div className="alert alert-danger">{error}</div>}
        <CourseList title="Trending Now" data={courses} />
        <CourseList
          title="My List"
          data={profileFavorites as CourseInterface[]}
        />
        <CourseList
          title="Keep Watching"
          data={(coursesInProgress as any) || []}
        />
        {genres.map((genre) => (
          <CategoryCourses key={genre} genre={genre} />
        ))}
      </div>
    </>
  );
};

export default ProfilePage;
