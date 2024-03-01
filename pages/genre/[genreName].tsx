import React, { useState } from "react";
import useCourseList from "@/hooks/useCourseList";
import CourseCard from "@/components/CourseCard";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import useUserProfiles from "@/hooks/useUserProfiles";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

type Profile = {
  id: string;
  name: string;
  image: string;
};

const defaultProfile: Profile = {
  id: "default",
  name: "Guest",
  image: "/path/to/default/image.png", // Update with your default image path
};

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const GenrePage: React.FC = () => {
  const router = useRouter();
  const { genreName } = router.query;

  const { data: session } = useSession();
  const { profiles } = useUserProfiles(session?.userId);
  const [activeProfile, setActiveProfile] = useState<Profile>(
    profiles?.[0] || defaultProfile
  );

  const {
    data: courses,
    isLoading,
    error,
  } = useCourseList({ genre: genreName as string });

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="transition-all ease-in-out duration-500"
    >
      <Navbar />

      <div className="container mx-auto py-6 pt-20">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4 text-white"
        >
          Topic: {genreName}
        </motion.h1>

        {isLoading && (
          <div className="animate-pulse h-60 bg-gray-400 rounded-lg"></div>
        )}
        {error && (
          <p className="text-red-500">
            There was an error loading the courses.
          </p>
        )}

        {!isLoading && courses && courses.length === 0 && (
          <p className="text-gray-600">No courses available for this topic.</p>
        )}

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
        >
          {courses &&
            courses.map((course) => (
              <CourseCard key={course.id} data={course} />
            ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GenrePage;
