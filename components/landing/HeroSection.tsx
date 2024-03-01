import React from "react";
import Link from "next/link";

const HeroSection = () => (
  <main className="relative h-[85vh]">
    {/* Hero Image */}
    <div
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{
        backgroundImage:
          "url(https://storage.googleapis.com/courses-trailers/woman-working-from-home-laptop-min.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>

    {/* High-tech subtle overlay */}
    <div className="absolute top-0 left-0 w-full h-full z-1 bg-black opacity-40"></div>

    <div className="container mx-auto px-4 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <h1 className="text-7xl font-bold mb-2 animate-pulse">WonderX</h1>
      <h2 className="text-3xl mb-4">
        Your Gateway to a Universe of Knowledge.
      </h2>
      <p className="text-2xl mb-4 font-semibold tracking-wide">
        Enjoy online courses, hit tutorials, and more from €4,99.
      </p>
      <p className="text-lg mb-8 font-medium">Join today. Cancel anytime.</p>
      <div className="flex justify-center items-center">
        <div className="relative flex items-stretch">
          {/* Icon inside the input */}
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
            📧
          </span>

          <input
            type="email"
            placeholder="Unlock Wonders..."
            className="flex-grow pl-10 bg-white text-black py-2 rounded-l shadow-md transition-shadow hover:shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            style={{ minWidth: "250px" }}
          />
        </div>

        <Link href="/auth">
          <span className="bg-red-600 py-2 px-6 rounded-r cursor-pointer hover:bg-red-500 focus:outline-none transition-transform hover:scale-105 flex items-center">
            Get Started
          </span>
        </Link>
      </div>
    </div>
  </main>
);

export default HeroSection;
