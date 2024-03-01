import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import CourseList from "@/components/CourseList";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserProfiles from "@/hooks/useUserProfiles";
import useUserFavorites from "@/hooks/useUserFavorites";
import useProfileFavorites from "@/hooks/useProfileFavorites";
import { useRouter } from "next/router";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import InfoModal from "@/components/InfoModal";

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

const MyList = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { isOpen, closeModal } = useInfoModalStore();

  // Execute both hooks unconditionally
  const userProfileFavorites = useProfileFavorites(
    (router.query.profileId as string) || ""
  );
  const userFavorites = useUserFavorites(currentUser?.id || "");

  // Determine which data to use based on the profileId query parameter
  const favoritesData = router.query.profileId
    ? userProfileFavorites
    : userFavorites;

  const { data: favorites = [], error } = favoritesData;

  if (error) {
    return <div className="alert alert-danger">Error loading favorites</div>;
  }

  return (
    <>
      <Navbar />
      <InfoModal visible={isOpen} onClose={closeModal} />
      <div className="pt-20">
        <div className="container px-4 md:px-8 lg:px-12 mx-auto">
          <CourseList title="Favorites" data={favorites} />
        </div>
      </div>
    </>
  );
};

export default MyList;
