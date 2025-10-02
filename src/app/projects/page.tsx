'use client';
import React, { useState, useEffect } from 'react';
import SectionHeading from '@/app/components/ui/SectionHeading';
import ProjectCard1 from '@/app/components/ui/ProjectCard1';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

const CourseGrid = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/project');
        const data = await res.json();

        // Match actual API response
        const formattedCourses = data.map((course) => ({
          _id: course._id,
          title: course.title,
          subtitle: course.subtitle,
          student: course.student,
          age: course.age,
          description: course.description,
          imageUrl: course.img[0],
          videoUrl: course.video[0],
        }));

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
      <section id="courses" className="py-20 bg-coducators-lightgray cards-aspect-video dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto px-4 dark:bg-gray-900 dark:text-white">
          <SectionHeading
            title="Our Projects"
            subtitle="See what our students have created and the skills they've developed through our programs."
            color="green"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 dark:bg-gray-900 dark:text-white">
            {courses.map((course) => (
              <ProjectCard1
                _id={course._id}
                title={course.title}
                subtitle={course.subtitle}
                student={course.student}
                age={course.age} 
                img={course.imageUrl} 
                description={course.description} 
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
