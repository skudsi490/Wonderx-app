import React, { useEffect, useState } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

// Hooks & Components
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import CourseList from "@/components/CourseList";
import InfoModal from "@/components/InfoModal";
import useCourseList from "@/hooks/useCourseList";
import useUserFavorites from "@/hooks/useUserFavorites";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import CategoryCourses from "@/components/CategoryCourses";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserProfiles from "@/hooks/useUserProfiles";
import { useUser } from "@/contexts/UserContext";
import useKeepWatching from "@/hooks/useKeepWatching";

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
        destination: "/landing",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home = () => {
  const { data: currentUser } = useCurrentUser();
  const { setActiveUser, user: activeUserFromContext } = useUser();

  const { profiles } = useUserProfiles();
  const { data: courses = [] } = useCourseList();
  const { data: userFavorites = [], error: userError } = useUserFavorites(
    currentUser?.id
  );

  const { isOpen, closeModal } = useInfoModalStore();
  const [loading, setLoading] = useState(true);

  // Set the active user in the context once the currentUser data is fetched
  useEffect(() => {
    if (currentUser) {
      setActiveUser(currentUser);
      setLoading(false); // Set loading to false when the user data is fetched
    }
  }, [currentUser, setActiveUser]);

  const activeProfile = activeUserFromContext
    ? {
        id: activeUserFromContext.id,
        name: activeUserFromContext.name,
        image: activeUserFromContext.image || "/images/default-blue.png",
      }
    : profiles?.[0] || null;

  const { data: coursesInProgress = [], error: keepWatchingError } =
    useKeepWatching(currentUser?.id, activeProfile?.id);

  const [error, setError] = useState<string | null>(null);

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
      <Navbar />
      <Billboard />
      <div className="pb-40">
        {error && <div className="alert alert-danger">{error}</div>}
        <CourseList title="Trending Now" data={courses} />
        <CourseList title="My List" data={userFavorites || []} />
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

export default Home;
