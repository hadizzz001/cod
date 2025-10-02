'use client';

import React, { useEffect, useState, Suspense } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: 'easeOut' },
  }),
};

// Inner component with useSearchParams
const AboutUsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const [allTemp1, setAllTemps1] = useState<any>(null);

  let imgs, title, desc, author, date;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/blog/${search}`);
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
    imgs = allTemp1.img;
    title = allTemp1.title;
    desc = allTemp1.description;
    author = allTemp1.author;
    date = allTemp1.date;
  }

  return (
    <section id="what-we-do" className="py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 dark:bg-gray-900 dark:text-white">
        <SectionHeading title={title} color="red" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
          {/* Swiper Slider */}
          <div className="relative dark:bg-gray-900 dark:text-white">
            <div className="rounded-3xl overflow-hidden shadow-xl relative z-[1] dark:bg-gray-900 dark:text-white">
              {imgs && imgs.length > 0 && (
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="w-full h-full"
                >
                  {imgs.map((img: string, index: number) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className="absolute -bottom-9 -left-10 w-64 h-64 bg-coducators-red/55 rounded-full z-0 dark:bg-gray-900 dark:text-white"></div>
          </div>

          {/* Blog Content */}
          <div>
            <div className="text-gray-700 mb-6 dark:bg-gray-900 dark:text-white">
              <motion.div
                className="flex items-start"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                <div className="mr-4 mt-1 bg-coducators-green rounded-full p-1  "></div>
                <div
                  className="text-gray-700 space-y-4 dark:bg-gray-900 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: desc || '' }}
                />
              </motion.div>
            </div>

            {(author || date) && (
              <p className="text-sm text-gray-500 mt-4 dark:bg-gray-900 dark:text-white">
                {author && <span className="font-semibold dark:bg-gray-900 dark:text-white">{author}</span>}
                {author && date && ' | '}
                {date && new Date(date).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <AboutUsContent />
      </Suspense>
      <Footer />
    </div>
  );
};

export default AboutUs;
