import React, { useState, useEffect } from "react";
import Link from "next/link";

const TOP_OFFSET = 66;

const LandingNavbar: React.FC = () => {
  const [showBackground, setShowBackground] = useState(false);

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

  return (
    <nav className={`w-full fixed z-50 transition duration-500 ${showBackground ? "bg-opacity-90 bg-zinc-900" : "bg-opacity-0"}`}>
      <div className="px-4 md:px-16 py-6 flex flex-row items-center">
        {/* Logo */}
        <Link href="/">
          <img src="/images/logo.png" className="h-9 lg:h-13 cursor-pointer" alt="Logo" />
        </Link>

        {/* Navigation Items */}
        <div className="ml-auto flex flex-row gap-4 items-center">
          {/* Sign In */}
          <Link href="/auth">
            <span className="text-white hover:text-gray-400 transition cursor-pointer">
              SIGN IN
            </span>
          </Link>

          {/* Join Now */}
          <Link href="/auth">
            <span className="bg-red-600 py-2 px-4 rounded hover:bg-red-500 transition cursor-pointer">
              JOIN NOW
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
