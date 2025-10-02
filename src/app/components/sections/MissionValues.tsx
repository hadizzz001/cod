import React from "react";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};
const MissionValues: React.FC = () => {
  const values = [
    {
      title: "Innovative Learning",
      description:
        "We constantly explore new teaching methods and technologies to provide the most engaging coding experience.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-coducators-blue"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: "Inclusive Environment",
      description:
        "We create a welcoming space where all children feel valued, respected, and empowered to learn.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-coducators-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: "Growth Mindset",
      description:
        "We foster a mindset that embraces challenges, persists through obstacles, and values the process of learning.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-coducators-red"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="mission" className="py-20 bg-white dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Our Mission & Values"
          subtitle="Guiding principles that drive our commitment to excellence in coding education for children."
          color="red"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 dark:bg-gray-900 dark:text-white">
              Our Mission
            </h3>

            <p className="text-gray-700 mb-6 dark:bg-gray-900 dark:text-white">
              To inspire and empower the next generation of innovators by making
              coding education accessible, engaging, and fun for all children,
              regardless of background or prior experience.
            </p>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-6">
              Our Values
            </h3>

            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="flex space-x-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={fadeUp}
                >
                  <div className="shrink-0 mt-1">{value.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:bg-gray-900 dark:text-white">
                      {value.title}
                    </h4>
                    <p className="text-gray-700 dark:bg-gray-900 dark:text-white">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl relative z-[1]">
              <img
                src="/images/aboutUS.jpeg"
                alt="Coding education"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="absolute -bottom-0 -right-10 w-64 h-64 bg-coducators-green/55 rounded-full z-0"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-coducators-red/55 rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionValues;
