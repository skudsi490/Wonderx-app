import React from "react";
import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import AlternateSection from "@/components/landing/AlternateSection";
import HeroSection from "@/components/landing/HeroSection";
import GradientBanner from "@/components/landing/GradientBanner";
import NewContentSection from "@/components/landing/NewContentSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import MarketingMaterialSection from "@/components/landing/MarketingMaterialSection";
import FAQ from "@/components/landing/FAQ";
import VideoBanner from "@/components/landing/VideoBanner";
import LandingBelowHero  from "@/components/landing/LandingBelowHero"
import Footer  from "@/components/landing/Footer"

const Landing = () => (
  <div className="flex flex-col min-h-screen bg-black text-white">
    {/* Navbar */}
    <LandingNavbar />
    <HeroSection />
    <GradientBanner />
    <NewContentSection />
    <LandingBelowHero  />
    <MarketingMaterialSection />
    {/* Alternate Sections */}
    <AlternateSection
      title="Watch Anywhere, Anytime"
      description="Whether you're at home or on the move, access our platform on any device. All you need is an internet connection."
      imgSrc="https://storage.googleapis.com/courses-trailers/tv.png"
      imgOnRight={false}
    />

    <AlternateSection
      title="Diverse Course Library"
      description="From tech to arts, we have a wide range of courses designed by experts in their respective fields."
      imgSrc="https://storage.googleapis.com/courses-trailers/device-pile.png"
      imgOnRight={true}
    />

    {/* Testimonials Section */}
    <TestimonialsSection />
    <VideoBanner />
    <FAQ />
    <Footer />
  </div>
);

export default Landing;
