'use client';
import { useEffect, useState } from 'react';
import SectionHeading from '@/app/components/ui/SectionHeading';
import CourseCard from '@/app/components/ui/CourseCard';
import Slider from '@/app/components/common/Slider';

const CourseSlider = () => {
  const [courses, setCourses] = useState([]);
  const colors = ['blue', 'green', 'red'];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/course');
        const data = await res.json();

        const formattedCourses = data.map((course, index) => ({
          _id: course._id,
          title: course.title,
          category: course.category,
          imageUrl: course.img[0],
          level: course.level,
          soon: course.soon,
          sessions: course.sessions,
          pair: course.pair,
          group: course.group,
          pre: course.pre,
          subtitle: course.subtitle,
          duration: `${JSON.parse(course.duration).number} ${JSON.parse(course.duration).unit}`,
          ageGroup: `Ages ${JSON.parse(course.age).from}-${JSON.parse(course.age).to}`,
          color: colors[index % colors.length],
        }));

        setCourses(formattedCourses.slice(0, 6)); // adjust number of visible slides
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section id="courses" className="py-20 bg-white dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Our Courses"
          subtitle="Discover our diverse range of tech courses designed for every interest and skill level."
          color="blue"
        />

        <Slider
          items={courses}
          renderItem={(course: any, index: React.Key) => (
            <CourseCard key={index} {...course} />
          )}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        />

        <div className="text-center mt-6">
          <a
            href="/courses"
            className="inline-block py-3 px-8 bg-coducators-blue text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
          >
            View All Courses
          </a>
        </div>
      </div>
    </section>
  );
};

export default CourseSlider;
