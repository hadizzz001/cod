'use client';

import React, { Suspense, useEffect, useState, useMemo } from 'react';
import CourseCard2 from '../components/ui/CourseCard2';
import { cn } from '@/lib/utils';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import { useSearchParams } from 'next/navigation';





const AboutUsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const [allTemp1, setAllTemps1] = useState<any>(null);
  const [isFixed, setIsFixed] = useState(true);

  



  let imgs, title, desc, cat, id,   level, soon, category, imageUrl, duration, ageGroup, color, sessions, pair, group, pre;
  let parsedDuration: { number?: string; unit?: string } = {};
  let parsedAge: { from?: string; to?: string } = {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/course/${search}`);
        const data = await response.json();
        setAllTemps1(data[0]);
      } catch (error) {
        console.error('Error fetching the description:', error);
      }
    };

    if (search) {
      fetchData();
    }
  }, [search]);

  if (allTemp1) {
    id = allTemp1._id;
    imgs = allTemp1.img;
    cat = allTemp1.category; 
    title = allTemp1.title;
    desc = allTemp1.description;
    level = allTemp1.level;
    soon = allTemp1.soon;
    category = allTemp1.category;
    imageUrl = allTemp1.imageUrl;
    level = allTemp1.level;
    duration = allTemp1.duration;
    ageGroup = allTemp1.ageGroup;
    color = allTemp1.color;
    sessions = allTemp1.sessions;
    pair = allTemp1.pair;
    group = allTemp1.group;
    pre = allTemp1.pre;

    try {
      parsedDuration = JSON.parse(allTemp1.duration || '{}');
      parsedAge = JSON.parse(allTemp1.age || '{}');
    } catch (err) {
      console.error('Error parsing duration or age:', err);
    }
  }

 

  



  const randomColor = useMemo(() => {
    const colors = ['blue', 'green', 'red'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []); // empty dependency array = only runs once on mount





  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Distance from bottom
      const distanceFromBottom = docHeight - (scrollY + windowHeight);

      if (distanceFromBottom <= 200) {
        setIsFixed(false); // Stop fixing
      } else {
        setIsFixed(true); // Keep fixed
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <main className="block overflow-hidden pb-8 dark:bg-gray-900 dark:text-white">
        {/* Full-width Banner */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <img
            src={imgs?.[0]}
            alt="Course banner"
            className="w-full h-full object-cover"
          />
          {/* Title Box inside banner */}

          <div
            className={cn(
              "absolute top-4 left-4 text-white dark:text-white px-4 py-2 rounded-md shadow-md font-bold text-xl md:text-2xl",
              randomColor === "blue"
                ? "bg-[#3186c8]"
                : randomColor === "green"
                  ? "bg-[#7dbd42]"
                  : "bg-[#d8212b]"
            )}
          >
            {title}
          </div>
        </div>

        {/* Description + Sticky Card Section */}
        <div className="container mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Title + Description + Stats */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 ">{title}</h2>
            <p
              className="text-gray-700 dark:text-white mb-6"
              dangerouslySetInnerHTML={{ __html: desc || '' }}
            />

         

          </div>

          {/* Right Side - Sticky CourseCard */}
          <div
            id="myMob"
            style={{
              position: "fixed",
              right: "5em",
              height: "fit-content",
              zIndex: 9,
              top: isFixed ? "12em" : "1em"
            }}
          >
            <CourseCard2
              _id={id}
              soon={soon}
              title={title}
              category={category}
              imageUrl={imgs?.[0]}
              level={level}
              duration={duration}
              ageGroup={`${parsedAge.from} - ${parsedAge.to}`}
              color={randomColor}
              sessions={sessions}
              pair={pair}
              group={group}
              pre={pre}
            />
          </div>

        </div>

        {/* CTA Button */}
<div className="text-center mt-12">
  <div className="inline-flex space-x-4">
    <a
      target='_blank'
      href={`/book?course=${title}`}
      className={cn(
        "text-lg bg-amber-400 py-5 px-10 text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1",
 
      )}
    >
      Free Trial!
    </a>
 
  </div>
</div>

      </main>
    </>
  );

};

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />
      <Suspense fallback={<div className="text-center py-20 text-xl">Loading...</div>}>
        <AboutUsContent />
      </Suspense>
      <Footer />
    </div>
  );
};

export default AboutUs;
