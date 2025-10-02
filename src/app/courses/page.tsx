'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SectionHeading from '@/app/components/ui/SectionHeading';
import CourseCard1 from '@/app/components/ui/CourseCard1';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

const CourseGridContent = () => {
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
  const searchParams = useSearchParams();
  const ageParam = searchParams.get('age'); // e.g. "5-6"

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/course');
        const data = await res.json();

        const formattedCourses = data.map((course: any, index: number) => {
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
            color: colors[index % colors.length],
            duration: `${duration.number} ${duration.unit}`,
            ageGroup: `Ages ${age.from}-${age.to}`,
            ageFrom: parseInt(age.from, 10),
            ageTo: parseInt(age.to, 10),
          };
        });

        formattedCourses.sort((a, b) => a.ageFrom - b.ageFrom);

        let filteredCourses = formattedCourses;

        if (ageParam) {
          const match = ageParam.match(/(\d+)-(\d+)/);
          if (match) {
            const paramFrom = parseInt(match[1], 10);
            const paramTo = parseInt(match[2], 10);

            filteredCourses = formattedCourses.filter(
              (course) =>
                course.ageFrom >= paramFrom && course.ageTo <= paramTo
            );
          }
        }

        setCourses(filteredCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, [ageParam]);

  const title = ageParam ? `Courses for ${ageParam}` : 'Our Courses';

  return (
    <div className="container mx-auto px-4">
      <SectionHeading
        title={title}
        subtitle="Explore our range of coding courses designed for different age groups and skill levels."
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
            sessions={course.sessions}
            pre={course.pre}
            pair={course.pair}
          />
        ))}
      </div>
    </div>
  );
};

const CourseGrid = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />
      <section
        id="courses"
        className="py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white"
      >
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <CourseGridContent />
        </Suspense>
      </section>
      <Footer />
    </div>
  );
};

export default CourseGrid;
