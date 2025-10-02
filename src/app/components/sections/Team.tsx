import React, { useState, useEffect } from "react";
import SectionHeading from "../ui/SectionHeading";
import { Button } from "../ui/button";
import { TeamCard } from "../ui/TeamCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const router = useRouter();

  // Function to fetch team data from the API
  const getTeamMembers = async () => {
    try {
      const response = await fetch("/api/team");
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, []);



  // Show either all team members or just a subset
  const displayedMembers = teamMembers.slice(0, 4);

  return (
    <section id="team" className="py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Meet Our Team"
          subtitle="Behind every student’s success is a team of innovators, educators, and mentors—meet them here."
          color="blue"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedMembers.map((member, index) => (
            <motion.div
              key={index}
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


        <div className="text-center mt-10">
          <a
            href="/teams"
            className="inline-block py-3 px-8 bg-coducators-blue text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1"
          >
            Meet the Team
          </a>
        </div>

      </div>
    </section>
  );
};

export default Team;
