import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion"; // <-- framer-motion import

import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu";
import NavbarItem from "@/components/NavbarItem";
import { Profile } from "./AccountMenu";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { CSSObject } from "@emotion/serialize";

import { useProfile } from "../pages/ProfileContext"; // <-- Import the useProfile hook

const TOP_OFFSET = 66;

interface NavbarProps {
  mainUserId?: string;
}

interface Course {
  id: string;
  title: string;
}

type Option = {
  value: string;
  label: string;
  type: "course" | "genre";
};

const Navbar: React.FC<NavbarProps> = ({ mainUserId }) => {
  const router = useRouter();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Course[]>([]);
  const searchBarVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0 },
  };

  const { profile: contextProfile, setProfile: setContextActiveProfile } =
    useProfile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleSearchBar = () => {
    setShowSearchBar((current) => !current);
  };

  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    try {
      const response = await fetch(`/api/search?query=${inputValue}`);
      const { courses, genres } = await response.json();

      const courseOptions = courses.map((course: Course) => ({
        value: course.id,
        label: `Course: ${course.title}`, // Indicate it's a course
        type: "course",
      }));

      const genreOptions = genres.map((genre: string) => ({
        value: genre,
        label: `Topic: ${genre}`, // Indicate it's a genre/topic
        type: "genre",
      }));

      return [...courseOptions, ...genreOptions];
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  };

  const handleSelection = (selectedOption: Option | null) => {
    if (selectedOption) {
      if (selectedOption.type === "course") {
        router.push(`/watch/${selectedOption.value}`);
      } else if (selectedOption.type === "genre") {
        // Navigate or perform any action when a genre is selected
        router.push(`/genre/${selectedOption.value}`);
      }
    }
  };

  const customStyles = {
    option: (
      provided: CSSObject,
      state: { data: Option; isSelected: boolean; isFocused: boolean }
    ) => ({
      ...provided,
      backgroundColor: state.isFocused ? "gray-200" : "white",
      "&:hover": {
        backgroundColor: "gray-100",
      },
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      color: state.data.type === "course" ? "blue-600" : "gray-700",
      fontWeight: state.data.type === "course" ? "500" : "400",
    }),
    menu: (provided: CSSObject) => ({
      ...provided,
      border: "1px solid gray-300",
      borderRadius: "0.25rem",
    }),
    // ... Add more styles as needed
  };

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, "");
    setQuery(inputValue);
    return inputValue;
  };

  const navigateToProfiles = useCallback(() => {
    router.push("/profiles");
  }, [router]);

  const handleProfileSelect = (selectedProfile: Profile) => {
    setContextActiveProfile(selectedProfile); // Use context setter

    if (selectedProfile.id === mainUserId) {
      router.push("/");
    } else {
      router.push(`/profile/${selectedProfile.id}`);
    }
  };

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <img src="/images/logo.png" className="h-9 lg:h-13" alt="Logo" />

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" active={true} href="/" />
          <NavbarItem
            label="Tutorials"
            onClick={() => {
              /* handle click for Tutorials */
            }}
          />
          <NavbarItem label="Courses" href="/courses" />
          <NavbarItem
            label="New & Popular"
            onClick={() => {
              /* handle click for New & Popular */
            }}
          />
          <NavbarItem
            label="My List"
            onClick={() => {
              if (router.query.profileId) {
                // If there's a profileId in the query, redirect to profile's list page
                router.push(`/my-list?profileId=${router.query.profileId}`);
              } else {
                // If no profileId in the query, redirect to main user's list page
                router.push(`/my-list`);
              }
            }}
          />
          <NavbarItem
            label="Browse by subject"
            onClick={() => {
              /* handle click for Browse by subject */
            }}
          />
        </div>

        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="relative flex items-center">
            {showSearchBar && (
              <AsyncSelect
                className={`transition-all duration-300 ease-in-out ${
                  showSearchBar ? "w-64 opacity-100" : "w-0 opacity-0"
                }`}
                isClearable
                isSearchable
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
                onChange={handleSelection}
                styles={customStyles}
                placeholder="Search courses..."
              />
            )}
            <MagnifyingGlassIcon
              onClick={toggleSearchBar}
              className="w-6 text-gray-200 hover:text-gray-300 cursor-pointer transition ml-2"
            />
          </div>

          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BellIcon className="w-6" />
          </div>

          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div
              className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden"
              onClick={navigateToProfiles}
            >
              <img
                src={contextProfile?.image || "/images/default-blue.png"}
                alt={contextProfile?.name || ""}
              />
            </div>
            <span className="text-white hidden lg:inline">
              {contextProfile?.name}
            </span>
            <ChevronDownIcon
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu
              visible={showAccountMenu}
              onProfileSelect={handleProfileSelect}
              activeProfile={contextProfile}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
