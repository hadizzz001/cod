"use client";
import { useEffect } from "react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import AboutUs from "@/app/components/sections/AboutUs";
import WhatWeDo from "@/app/components/sections/WhatWeDo";
import MissionValues from "@/app/components/sections/MissionValues";
import CourseSlider from "@/app/components/sections/CourseSlider";
import ProjectsSlider from "@/app/components/sections/ProjectsSlider";
import Blog from "@/app/components/sections/Blog";
import Team from "@/app/components/sections/Team";
import Testimonials from "@/app/components/sections/Testimonials";
import FAQ from "@/app/components/sections/FAQ";
import Contact from "@/app/components/sections/Contact";
import Platforms from "@/app/components/sections/Platforms";
import { HowItWorksSection } from "./components/sections/HowItWorks";
import { HeroSection } from "./components/sections/Hero";

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll");

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.85) {
          element.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white">
      <Navbar />

 


      <main className="block overflow-hidden pb-8 dark:bg-gray-900 dark:text-white">
        <HeroSection /> 
        <AboutUs />
        <HowItWorksSection />  
        <WhatWeDo />
        {/* <MissionValues /> */}
        <CourseSlider />
        <ProjectsSlider />
        <Blog />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
        <Platforms />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
