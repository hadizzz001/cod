'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CalendarDays, Star } from 'lucide-react';
import { AddSVG } from '@/app/icons/AddSVG';
import { CircleSVG } from '@/app/icons/CircleSVG';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const MotionImage = motion(Image);

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const HeroSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch('/api/banner');
        const json = await res.json();
        setData(json[0]); // assuming array response
      } catch (err) {
        console.error('Failed to fetch banner:', err);
      }
    };

    fetchBanner();
  }, []);

  if (!data) return null;

  // Dynamic title with styled words
  const renderStyledTitle = (title) => {
    const words = title.split(' ');
    return (
      <>
        {words.map((word, index) => {
          let className = '';
          if (index === 1) className = 'text-coducators-blue';
          else if (index === 3) className = 'text-coducators-green';
          else if (index === words.length - 1) className = 'text-coducators-red';

          return (
            <span key={index} className={cn(className && className)}>
              {word}{' '}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <>

      {/* Pc Layout Only */}
      <motion.section
        id="hero112211"
        className={cn(
          'max-md:hidden flex',

          'max-md:scroll-mt-24 flex container relative lg:items-center w-full',
          'max-md:h-[calc(100vh-80px)] md:h-[calc(80vh-80px)] lg:h-[calc(50vh-80px)] xl:h-[calc(100vh-80px)]',
          'dark:bg-gray-900 dark:text-white'
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <motion.div
          className="flex flex-col items-start max-w-full max-md:w-full max-lg:w-3/4 lg:w-3/5 z-[2]"
          variants={itemVariants}
        >
          <motion.span
            className="max-md:px-3 max-md:py-2 max-md:text-base px-4 py-3 text-xl text-center text-blue-500 rounded-full bg-blue-500 bg-opacity-10 "
            variants={itemVariants}
          >
            {data.sub}
          </motion.span>

          <motion.h1
            className="mt-3 text-7xl max-md:text-3xl max-md:leading-tight 2xl:leading-normal max-lg:leading-tight font-bold text-slate-950 dark:bg-gray-900 dark:text-white"
            variants={itemVariants}
            id='mynewtextaabb'
          >
            {renderStyledTitle(data.title)}
          </motion.h1>

          <motion.p
            className="pt-2 max-lg:mt-3 max-lg:pr-16 max-md:pr-0 mt-3 max-w-full max-md:text-base max-lg:text-lg text-2xl leading-8 text-gray-700 dark:bg-gray-900 dark:text-white"
            variants={itemVariants}
          >
            {data.desc}
          </motion.p>

          <motion.div
            className="flex flex-col self-stretch mt-[8em] sm:mt-5 w-full text-center"
            variants={itemVariants}
          >

            <div className="flex flex-wrap gap-2 py-3 w-full text-xl max-md:text-lg leading-snug max-md:justify-center max-sm:justify-start">
              <a
                href={'/book'}
                className="flex flex-col items-center font-bold text-white max-md:min-w-60 max-sm:min-w-52"
              >
                <button
                  className={cn(
                    'flex gap-2 justify-center items-center px-4 py-4 lg:px-8 lg:py-5 rounded-xl max-md:px-3 max-md:py-3 max-md:w-full',
                    'bg-amber-400 border-2 border-amber-400 border-solid'
                  )}
                >
                  <CalendarDays className="w-5" />
                  <span className="self-stretch my-auto">{data.btn1?.text || 'Free Trial'}</span>
                </button>
              </a>
              <a
                href={'/courses'}
                className="flex flex-col items-center font-semibold text-blue-500 max-md:min-w-60 max-sm:min-w-52"
              >
                <button
                  className={cn(
                    'flex gap-2 justify-center items-center px-4 py-4 lg:px-8 lg:py-5 max-md:w-full rounded-xl max-md:px-3 max-md:py-3',
                    'border-2 border-blue-500 border-solid bg-white'
                  )}
                >
                  <BookOpen className="w-5" />
                  <span className="self-stretch my-auto">{data.btn2?.text || 'Our Courses'}</span>
                </button>
              </a>
            </div>

            <div className="max-lg:mt-4 text-gray-700 flex max-lg:flex-col-reverse max-lg:space-y-3 max-md:text-start lg:items-center self-start 2xl:pt-8 lg:pt-3 max-md:text-base text-lg leading-loose border-t border-black border-opacity-10">

              <p className="dark:bg-gray-900 dark:text-white">Join 5000+ students registered</p>
            </div>
          </motion.div>
        </motion.div>

        {data.img?.[0] && (
          <>
            {/* Shadow under image */}
            <div
              className="transform -translate-x-1/2 
    w-[120px] sm:w-[300px] 
    h-[20px] sm:h-[40px] 
    blur-md 
    rounded-full 
    z-0
    absolute -right-10 sm:-right-32 md:-right-68 lg:-right-32 2xl:-right-48 bottom-[7em]
    bg-gradient-to-r from-transparent via-[#222222] to-transparent
  "
            ></div>


            {/* The image */}
            <MotionImage
              src={data.img[0]}
              alt="Banner"
              width={600}
              height={600}
              className={cn(
                'w-[300px] h-[300px] sm:w-[600px] sm:h-[600px]',
                'rounded-full object-cover border-[5px] sm:border-[20px] border-[#2196F3]',
                'z-[1] absolute -right-10 sm:-right-32 md:-right-68 lg:-right-32 2xl:-right-48 bottom-[8em]',
                'image-custom-responsive' // <-- add your custom class here
              )}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              priority
              id='mynewimgaabb'
            />



          </>



        )}

        <CircleSVG className="absolute bottom-1/3 right-1/4 z-0 max-md:hidden" size={160} />
        <AddSVG className="absolute bottom-[20%] right-1/4 z-0 max-md:hidden" size={65} />
        <AddSVG className="absolute top-10 right-1/4 z-0 max-md:hidden" size={80} />
      </motion.section>











      {/* Mobile Layout Only */}
      <motion.section
        className={cn(
          'md:hidden block container relative w-full py-6 px-4',
          'dark:bg-gray-900 dark:text-white'
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          className="px-4 py-3 text-base text-center text-blue-500 rounded-full bg-blue-500 bg-opacity-10"
          variants={itemVariants}
        >
          {data.sub}
        </motion.span>

        <motion.h1
          className="mt-8 text-2xl leading-tight font-bold text-slate-950 dark:bg-gray-900 dark:text-white"
          variants={itemVariants}
        >
          {renderStyledTitle(data.title)}
        </motion.h1>

        <motion.p
          className="mt-8 mb-5 p-0 text-[12px] text-base leading-7 text-gray-700 dark:bg-gray-900 dark:text-white"
          variants={itemVariants}
          style={{ lineHeight: '1.4' }}
        >
          {data.desc}
        </motion.p>

        <motion.div
          className="flex flex-col self-stretch mt-2 w-full text-center"
          variants={itemVariants}
        >
          <div className="flex flex-col gap-3 py-3 w-full text-lg leading-snug items-center">
            <a
              href={'/book'}
              className="flex flex-col items-center font-bold text-white w-full"
            >
              <button
                className={cn(
                  'flex gap-2 justify-center items-center w-full px-1 py-1 rounded-xl',
                  'bg-amber-400 border-2 border-amber-400 border-solid'
                )}
              >
                <CalendarDays className="w-5" />
                <span>{data.btn1?.text || 'Free Trial'}</span>
              </button>
            </a>
            <a
              href={'/courses'}
              className="flex flex-col items-center font-semibold text-blue-500 w-full"
            >
              <button
                className={cn(
                  'flex gap-2 justify-center items-center w-full px-1 py-1 rounded-xl',
                  'border-2 border-blue-500 border-solid bg-white'
                )}
              >
                <BookOpen className="w-5" />
                <span>{data.btn2?.text || 'Our Courses'}</span>
              </button>
            </a>
          </div>

          <div className="mt-4 text-gray-700 text-start text-base leading-relaxed border-t border-black border-opacity-10 pt-2">
            <p className="dark:bg-gray-900 dark:text-white">Join 5000+ students registered</p>
          </div>
        </motion.div>

        {data.img?.[0] && (
<div className="flex items-center justify-center  ">
  <div className="w-[300px] h-[300px] rounded-full overflow-hidden relative mt-10">
    <MotionImage
      src={data.img[0]}
      alt="Banner"
      width={400}
      height={400}
      className="object-cover w-full h-full rounded-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      priority
    />
    <div className="absolute inset-0 border-[5px] border-[#2196F3] rounded-full pointer-events-none" />
  </div>
</div>



        )}
      </motion.section>

    </>
  );
};
