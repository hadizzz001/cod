import React from "react";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  {
    value: "4+",
    label: "Years of Experience",
  },
  {
    value: "2K+",
    label: "Students Taught",
  },
  {
    value: "15+",
    label: "Courses Developed",
  },
  {
    value: "23+",
    label: "Collaborations",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const AboutUs: React.FC = () => {
  return (
    <section id="about" className=" py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white mt-custom-15em">
      <div className="container mx-auto px-4  ">
        <SectionHeading
          title="About Us"
          subtitle="Discover who we are, what we stand for, and how we're shaping the next generation of tech creators."
          color="blue"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
          <div className="order-2 lg:order-1 ">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 dark:bg-gray-900 dark:text-white">
              Inspiring Young Minds with the Power of Code
            </h2>

<p className="text-md md:text-2xl text-gray-700 mb-6 dark:bg-gray-900 dark:text-white">
  We believe every kid has the potential to become the next big digital creator!

  Coducators began with a simple mission: to make tech education accessible and exciting for kids—today, it’s empowering hundreds of young minds to code, build, and innovate with confidence.
</p>

<p className="text-md md:text-2xl text-gray-700 mb-6 dark:bg-gray-900 dark:text-white">
  Our hands-on, project-based approach builds advanced tech skills and empowers students to innovate confidently.
</p>

<div className="flex flex-wrap justify-center gap-4 lg:gap-2 2xl:gap-6 items-start text-center mt-12 max-md:mt-10">
  {stats.map((stat, index) => (
    <motion.div
      key={index}
      className="flex flex-col items-center pr-2 2xl:px-6 max-md:px-5 w-[140px] lg:w-[130px] 2xl:w-[140px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
    >
      <div
        className={cn(
          `w-16 h-16 text-2xl font-bold leading-none rounded-full grid place-items-center bg-opacity-10 min-h-16`,
          index === 0 && "bg-coducators-blue/15 text-coducators-blue",
          index === 1 && "bg-coducators-green/15 text-coducators-green",
          index === 2 && "bg-coducators-red/15 text-coducators-red",
          index === 3 && "bg-coducators-yellow/15 text-coducators-yellow"
        )}
      >
        {stat.value}
      </div>
      <p className="z-10 mt-2.5 text-[1.125rem] font-medium leading-6 text-gray-700 dark:bg-gray-900 dark:text-white">
        {stat.label}
      </p>
    </motion.div>
  ))}
</div>


          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl relative z-[1]">
              <img
                src="/images/aboutUS.jpeg"
                alt="Students learning to code"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-coducators-green/55 rounded-full z-0"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-coducators-blue/55 rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
