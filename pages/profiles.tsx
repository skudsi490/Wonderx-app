import React, { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUserProfiles from "@/hooks/useUserProfiles";
import AddProfileModal from "@/components/AddProfileModal";
import { useProfile } from "../contexts/ProfileContext";

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

interface Profile {
  id: string;
  name: string;
  image: string;
}

interface ProfileCardProps {
  profile: Profile;
  onSelect: (profileId: string) => void;
}

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

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(profile.id)}
      className="group flex-row w-44 mx-auto cursor-pointer"
    >
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:border-white overflow-hidden">
        <img
          draggable={false}
          className="w-max h-max object-contain"
          src={profile.image}
          alt={profile.name}
        />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {profile.name}
      </div>
    </div>
  );
};

const ProfilesPage = () => {
  const router = useRouter();
  const { profile: contextProfile, setActiveProfile: setContextActiveProfile } =
    useProfile();
  const { data: currentUser } = useCurrentUser();
  const { profiles, isLoading, isError } = useUserProfiles(currentUser?.id);

  const [isAddProfileModalOpen, setAddProfileModalOpen] = useState(false);

  const handleProfileSelect = (profileId: string) => {
    const selectedProfile = profiles.find((p) => p.id === profileId);
    if (selectedProfile) {
      setContextActiveProfile(selectedProfile);
    }

    // If the selected profile is the main user's profile, redirect to the main page
    if (profileId === currentUser?.id) {
      router.push("/");
    } else {
      // Otherwise, navigate to the profile's specific page
      router.push(`/profile/${profileId}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !profiles) return <div>Error loading profiles</div>;

  const defaultAvatar = images[Math.floor(Math.random() * 4)];

  // Create a unique list of profiles with the main user first
  const allProfiles = [
    {
      id: currentUser?.id || "current",
      name: currentUser?.name || "",
      image: currentUser?.image || defaultAvatar,
    },
    ...profiles.filter((profile) => profile.id !== currentUser?.id),
  ];

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&apos;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          {allProfiles.map((profile: Profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onSelect={handleProfileSelect}
            />
          ))}
          <div
            onClick={() => setAddProfileModalOpen(true)}
            className="group flex-row w-44 mx-auto cursor-pointer"
          >
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:border-white overflow-hidden">
              <span className="text-white text-xl">+ Add New</span>
            </div>
          </div>
        </div>
      </div>
      <AddProfileModal
        isOpen={isAddProfileModalOpen}
        onClose={() => setAddProfileModalOpen(false)}
      />
    </div>
  );
};

export default ProfilesPage;
