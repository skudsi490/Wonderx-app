import React, { useEffect, useState } from "react";
import Image from "next/image";
import MarQuee from "react-fast-marquee";
import line from "@/public/images/line.png";


const features = [
  { text: "Unrestricted Access: Unlock an all-encompassing library of knowledge." },
  { text: "Learn from the Best: Experience an unparalleled learning experience." },
  { text: "Flexibility at Its Core: Learn at your own pace." }
];

const rowOneImages = [
  {
    url: "https://storage.googleapis.com/courses-trailers/Pics/187248_731a_12.jpg",
  },
  {
    url: "https://storage.googleapis.com/courses-trailers/Pics/2222324_1478_2.jpg",
  },
  {
    url: "https://storage.googleapis.com/courses-trailers/Pics/4929000_af5f.jpg",
  },
  {
    url: "https://storage.googleapis.com/courses-trailers/Pics/5181942_dc28_14.jpg",
  },
  {
    url: "https://storage.googleapis.com/courses-trailers/Pics/5313750_daca_2.jpg",
  },
];

const rowTwoImages = [
  {
    url: "https://storage.googleapis.com/courses-trailers/Pics/5448338_bbd5_6.jpg",
  },
  {
    url: "https://storage.googleapis.com/courses-trailers/Pics/5461372_5d2c.jpg",
  },
  {
    url: "https://storage.googleapis.com/courses-trailers/Pics/5497396_3f4a.jpg",
  },
  {
    url: "https://storage.googleapis.com/courses-trailers/Pics/5585722_bf29.jpg",
  },
  {
    url: "https://storage.googleapis.com/courses-trailers/Pics/5604666_6445_2.jpg",
  },
];

const LandingBelowHero = () => {
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      if (!mounted) {
        setMounted(true);
      }
    }, [mounted]);
  
    return (
      <div className="w-full md:min-h-screen flex items-center justify-center">
      <div>
        <div className="md:mt-5">
          <Image
            src={line}
            alt=""
            className="absolute hidden md:block"
            width={2000}
            height={2}
          />
        </div>
        <div className="w-[100vw] mb-5 md:mb-20 relative">
          <div className="rotate-[-4deg] mt-10 md:mt-[6.5rem]">
            <MarQuee>
              {rowOneImages.map((i, index) => (
                <Image
                  src={i.url}
                  key={index}
                  alt=""
                  className="md:m-4 w-[200px] m-2 md:w-[500px] rounded-[20px]"
                  width={500}
                  height={300}
                />
              ))}
            </MarQuee>
            <MarQuee>
              {rowTwoImages.map((i, index) => (
                <Image
                  src={i.url}
                  key={index}
                  alt=""
                  className="md:m-4 w-[200px] m-2 md:w-[500px] rounded-[20px]"
                  width={500}
                  height={300}
                />
              ))}
            </MarQuee>
          </div>
        </div>
      </div>
    </div>
  );
};
  
  export default LandingBelowHero;