import React from "react";
import SectionHeading from "../ui/SectionHeading";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const WhatWeDo: React.FC = () => {
const features = [
  "Hands-on tech education for ages kids and teens",
  "Curriculum tailored to skill and interest.",
  "Fun, creative, real-world learning.",
  "Expert instructors provide personal guidance.",
  "Collaborative environment builds confidence.",
  "We equip kids with future-ready skills."
];


  return (
    <section id="what-we-do" className=" py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 mt-10">
        <SectionHeading
          title="What We Do"
          subtitle="Our approach to teaching coding combines education with fun, creating an environment where children thrive."
          color="green"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl relative z-[1]">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200"
                alt="Collaborative coding environment"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="absolute -bottom-9 -left-10 w-64 h-64 bg-coducators-red/55 rounded-full z-0"></div>
          </div>

          <div>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 dark:bg-gray-900 dark:text-white">
              Empowering Future Innovators
            </h3> 

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={fadeUp}
                >
                  <div className="mr-4 mt-1 bg-coducators-green rounded-full p-1 ">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700 dark:bg-gray-900 dark:text-white">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
