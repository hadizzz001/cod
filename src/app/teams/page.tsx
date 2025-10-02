'use client';
import React, { useState, useEffect } from 'react';
import SectionHeading from '@/app/components/ui/SectionHeading';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import { TeamCard } from "@/app/components/ui/TeamCard";
import { motion } from "framer-motion";

const CourseGrid = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/team');
        const data = await res.json();
        setTeam(data);
      } catch (error) {
        console.error('Failed to fetch team:', error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />
      <section id="team" className="py-20 bg-white dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto px-4">

          <SectionHeading
            title="Our Team"
            subtitle="Meet the passionate individuals behind our mission."
            color="blue"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {team.map((member, index) => (
              <motion.div
                key={`member-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid place-items-center"
              >
                <TeamCard index={index} data={member} />
              </motion.div>
            ))}
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CourseGrid;
