'use client';

import React, { useEffect, useState, Suspense } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import { useSearchParams } from 'next/navigation';

const AboutUsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const [allTemp1, setAllTemps1] = useState<any>(null);

  let imgs, name, desc, cat, position;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/team/${search}`);
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
    imgs = allTemp1.img[0];
    cat = allTemp1.category;
    name = allTemp1.name;
    desc = allTemp1.description;
    position = allTemp1.position;
  }

return (
  <>
    <SectionHeading
      title={`More about ${name}`}
      color="red"
      className="mt-10"
    />

    <main className="flex-grow flex items-center justify-center mb-20 dark:bg-gray-900 dark:text-white px-4">
      <article className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left max-w-6xl w-full gap-12">
        {/* Text on the Left */}
        <div className="flex-1">
          <h3 className="text-4xl font-bold text-coducators-red uppercase">{name}</h3>
          <p className="mt-2 text-xl text-gray-600 dark:text-white">{position}</p>
          {desc && (
            <div
              className="mt-6 text-lg text-gray-700 dark:text-white"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          )}
        </div>

        {/* Image on the Right */}
{/* Image on the Right */}
<div className="relative w-84 h-84 md:w-[500px] md:h-[500px] rounded-full p-3 bg-coducators-red">
  <div className="w-full h-full rounded-full overflow-hidden">
    <img
      src={imgs}
      alt={name}
      className="w-full h-full object-cover"
    />
  </div>
</div>

      </article>
    </main>
  </>
);

};

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <AboutUsContent />
      </Suspense>
      <Footer />
    </div>
  );
};

export default AboutUs;
