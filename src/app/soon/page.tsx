'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SectionHeading from '@/app/components/ui/SectionHeading';
import CourseCard1 from '@/app/components/ui/CourseCard1';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

const CourseGrid = () => {
  type Course = {
    _id: string;
    title: string;
    category: string;
    imageUrl: string;
    level: string;
    soon: string;
    duration: string;
    ageGroup: string;
    color: string;
    sessions: string;
    pair: string;
    group: string;
    pre: string;
    ageFrom: number;
    ageTo: number;
  };

  const [courses, setCourses] = useState<Course[]>([]);
  const colors = ['blue', 'green', 'red']; 

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/course');
      const data = await res.json();

      // First filter courses that are "soon"
      const soonCourses = data.filter(course => course.soon === "yes");

      // Then format and assign color dynamically
      const formattedCourses = soonCourses.map((course, index) => {
        const age = JSON.parse(course.age);
        const duration = JSON.parse(course.duration);
        return {
          _id: course._id,
          title: course.title,
          category: course.category,
          imageUrl: course.img[0],
          level: course.level,
          soon: course.soon,
          group: course.group,
          sessions: course.sessions,
          pair: course.pair,
          pre: course.pre,
          color: colors[index % colors.length], // dynamic color after filtering
          duration: `${duration.number} ${duration.unit}`,
          ageGroup: `Ages ${age.from}-${age.to}`,
          ageFrom: parseInt(age.from, 10),
          ageTo: parseInt(age.to, 10),
        };
      });

      setCourses(formattedCourses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  fetchCourses();
}, []);



  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />
      <section
        id="courses"
        className="py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Courses Starting Soon — Secure Your Spot!"
            subtitle="From beginners to young prodigies, we’ve got a course for every curious mind."
            color="blue"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {courses.map((course) => (
              <CourseCard1
                key={course._id}
                _id={course._id}
                title={course.title}
                category={course.category}
                imageUrl={course.imageUrl}
                level={course.level}
                duration={course.duration}
                ageGroup={course.ageGroup}
                soon={course.soon}
                color={course.color}
                group={course.group}
                sessions={course.group}
                pre={course.pre}
                pair={course.pair}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CourseGrid;
