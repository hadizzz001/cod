'use client';

import React, { Suspense, useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import SectionHeading from '../components/ui/SectionHeading';
import { useSearchParams } from 'next/navigation';
import CourseCard3 from '../components/ui/CourseCard3';

const AboutUsContent: React.FC = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('id');
    const [allTemp1, setAllTemps1] = useState<any>(null);
  const [isFixed, setIsFixed] = useState(true);
    let imgs, title, desc, subtitle, id, student, age, video, course, level, game, skills;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/project/${search}`);
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
        subtitle = allTemp1.subtitle;
        student = allTemp1.student;
        title = allTemp1.title;
        desc = allTemp1.description;
        age = allTemp1.age;
        video = allTemp1.video;
        course = allTemp1.course;
        level = allTemp1.level;
        game = allTemp1.game;
        skills = allTemp1.skills;
    }


    const randomColor = useMemo(() => {
        const colors = ['blue', 'green', 'red'];
        return colors[Math.floor(Math.random() * colors.length)];
    }, []);



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
        <main className="block overflow-hidden pb-8 dark:bg-gray-900 dark:text-white">
            {/* Full-width Banner */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                <img
                    src={imgs?.[0]}
                    alt="Banner visual"
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
                    Created by {student}
                </div>
            </div>

            {/* Section Below Banner */}
            <section className="py-20 bg-white dark:bg-gray-900 dark:text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="order-2 lg:order-1">
                            <h1
                                className={cn(
                                    "inline-block text-white dark:text-white px-4 py-2 rounded-md shadow-md font-bold text-xl md:text-2xl",
                                    randomColor === "blue"
                                        ? "bg-[#3186c8]"
                                        : randomColor === "green"
                                            ? "bg-[#7dbd42]"
                                            : "bg-[#d8212b]"
                                )}
                            >
                                {title}
                            </h1>

                            <p
                                className="text-gray-700 mb-6 dark:text-white"
                                dangerouslySetInnerHTML={{ __html: desc || '' }}
                            />

                        </div>

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
                            <CourseCard3
                                _id={id}
                                imgs={allTemp1?.img[0]}
                                subtitle={subtitle}
                                student={student}
                                title={title}
                                desc={desc}
                                age={age}
                                video={video}
                                level={level}
                                course={course}
                                game={game}
                                color={randomColor}
                                skills={skills}
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA Button */}
            <div className="text-center mt-12">
                <a
                    target="_blank"
                    href={`https://wa.me/96170128107?text=Hi, I'm interested in the project: ${title}`}
                    className={cn(
                        "inline-block py-3 px-8 text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1",
                        randomColor === "blue"
                            ? "bg-[#3186c8]"
                            : randomColor === "green"
                                ? "bg-[#7dbd42]"
                                : "bg-[#d8212b]"
                    )}
                >
                    Interested in this project!
                </a>
            </div>
        </main>
    );
};

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
            <Navbar />
            <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
                <AboutUsContent />
            </Suspense>
            <Footer />
        </div>
    );
};

export default AboutUs;
