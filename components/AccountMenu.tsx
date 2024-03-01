import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserProfiles from "@/hooks/useUserProfiles";
import Link from "next/link";

interface AccountMenuProps {
  visible?: boolean;
  onProfileSelect: (profile: Profile) => void;
  activeProfile?: Profile | null;
}

export interface Profile {
  id: string;
  name: string;
  image: string;
}

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

const AccountMenu: React.FC<AccountMenuProps> = ({
  visible,
  onProfileSelect,
  activeProfile,
}) => {
  const { data: currentUser } = useCurrentUser();
  const { profiles = [] } = useUserProfiles(currentUser?.id);
  const router = useRouter();

  const generateUserAvatar = () => {
    const index = currentUser?.id
      ? currentUser.id.charCodeAt(0) % images.length
      : Math.floor(Math.random() * images.length);
    return images[index];
  };

  if (!visible) {
    return null;
  }

  // Logic to determine which profiles to show
  let profilesToShow: Profile[] =
    activeProfile?.id === currentUser?.id
      ? profiles
      : [
          {
            id: currentUser?.id!,
            name: currentUser?.name!,
            image: currentUser?.image || generateUserAvatar(),
          },
          ...profiles.filter((profile) => profile.id !== activeProfile?.id),
        ];

  const renderProfiles = () => (
    <div className="flex flex-col gap-3">
      {profilesToShow.map((profile) => (
        <div
          key={profile.id}
          onClick={() => onProfileSelect(profile)}
          className="px-3 group/item flex flex-row gap-3 items-center w-full cursor-pointer"
        >
          <img
            className="w-8 rounded-md"
            src={profile.image}
            alt={profile.name}
          />
          <p
            className={`text-white text-sm ${
              profile.id === activeProfile?.id ? "font-bold" : ""
            }`}
          >
            {profile.name}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex z-50">
      {renderProfiles()}
      <hr className="bg-gray-600 border-0 h-px my-4" />
      {activeProfile?.id === currentUser?.id && (
        <div className="px-3 py-2">
          <button
            onClick={() => router.push("/subscription/manage")}
            className="text-white text-sm hover:underline transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Manage Subscription
          </button>
        </div>
      )}
      <button
        onClick={() => signOut()}
        className="px-3 text-center text-white text-sm hover:underline transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign out of WonderX
      </button>
    </div>
  );
};

export default AccountMenu;
