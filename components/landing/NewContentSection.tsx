import React from 'react';
import Link from 'next/link';

const features = [
  { text: "Unrestricted Access: Unlock an all-encompassing library of knowledge." },
  { text: "Learn from the Best: Experience an unparalleled learning experience." },
  { text: "Flexibility at Its Core: Learn at your own pace." }
];

const NewContentSection = () => (
  <section className="z-30 bg-gradient-to-t from-black to-gray-900 text-white">
    <div className="container mx-auto text-center px-4">
    <h1 className="font-Monserrat text-4xl py-5 xl:text-7xl 2xl:text-8xl font-[700] text-center xl:leading-[80px] 2xl:leading-[100px] sm:mt-20">
        Experience <span className="text-[#D81F26]"> WonderX</span>
        </h1>
              <p className="text-2xl mb-10 font-medium tracking-wide leading-relaxed">
      Dive into the vast expanse of learning opportunities that WonderX unfolds. We present to you a cutting-edge streaming platform dedicated to fueling your intellectual curiosity. With a simple subscription, unlock a treasure trove of meticulously curated educational courses and set yourself on a path of continuous growth.
      </p>
      <h3 className="text-4xl font-bold mb-6 tracking-wide">Here’s what sets WonderX apart:</h3>
      <ul className="text-xl mb-10 text-left mx-auto w-3/4 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="transform transition-transform hover:scale-105">
            <span className="text-red-500 mr-2">•</span>{feature.text}
          </li>
        ))}
      </ul>
      <p className="text-2xl mb-10 font-medium tracking-wide leading-relaxed">
      WonderX isn’t just a platform; it’s a movement towards a more accessible, engaging, and empowering form of education. Our mission is to break down barriers to education and make high-quality learning accessible to all.
      </p>
      <div className="space-x-4">
        <Link href="/courses" passHref>
          <button className="bg-red-600 py-3 px-8 rounded-full font-semibold text-lg hover:bg-red-500 focus:outline-none transition-transform hover:scale-105 inline-block shadow-md hover:shadow-lg">
            Explore Our Courses
          </button>
        </Link>
        <Link href="/subscribe" passHref>
          <button className="bg-red-600 py-3 px-8 rounded-full font-semibold text-lg hover:bg-red-500 focus:outline-none transition-transform hover:scale-105 inline-block shadow-md hover:shadow-lg">
            Subscribe Now
          </button>
        </Link>
      </div>
    </div>
  </section>
);

export default NewContentSection;
