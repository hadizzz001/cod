'use client';
import { useEffect, useState } from 'react';
import SectionHeading from '@/app/components/ui/SectionHeading';
import ProjectCard from '@/app/components/ui/ProjectCard';
import Slider from '@/app/components/common/Slider';

const ProjectsSlider: React.FC = () => {
  const [projects, setProjects] = useState([]);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/project'); // Adjust path if needed
      const data = await res.json();

      const formatted = data.map((item: any) => ({
        _id: item._id,
        video: item.video?.[0],
        category: item.subtitle,
        title: item.title,
        author: `by ${item.student}, age ${item.age}`,
        description: item.description.replace(/<\/?[^>]+(>|$)/g, ''), // strip HTML tags
      }));

      setProjects(formatted.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  fetchProjects();
}, []);


  return (
    <section id="projects" className="py-20 bg-coducators-lightgray hide-arrows dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Student Projects"
          subtitle="See how our students turn ideas into real-world tech creations."
          color="green"
        />

        <Slider
          items={projects}
          renderItem={(project: any, index: React.Key) => (
            <ProjectCard key={index} {...project} />
          )}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        />

        <div className="text-center mt-10">
          <a
            href="/projects"
            className="inline-block py-3 px-8 bg-coducators-green text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-green-600 hover:shadow-lg transform hover:-translate-y-1"
          >
            Explore All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSlider;
