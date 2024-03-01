import React from 'react';

const VideoBanner = () => {
  return (
    <div className="relative overflow-hidden h-[400px] md:h-[600px]">
      {/* Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://storage.googleapis.com/courses-trailers/Production%20Id%204626378%20(2160P).mp4"
      />

      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/70"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 transform transition-transform hover:scale-105">Discover WonderX</h2>
        <p className="text-lg md:text-xl mb-4 max-w-2xl text-center">The ultimate platform for online courses. Dive in, and start learning today.</p>
        <button className="px-6 py-3 bg-red-600 rounded-full text-lg font-semibold transform transition-transform hover:bg-red-500 hover:scale-105">
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default VideoBanner;
