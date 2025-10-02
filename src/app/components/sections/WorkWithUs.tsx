
import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const WorkWithUs: React.FC = () => {
  return (
    <section id="careers" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Work With Us" 
          subtitle="Join our team and help shape the future of coding education for children."
          color="green"
        />
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-coducators-blue/10 to-coducators-green/10 rounded-2xl p-8 md:p-12 mb-8">
            <p className="text-lg text-gray-700 mb-8">
              {"At Coducators, we are building a community of educators who are passionate about empowering children through technology."}
            </p>

            <Link href="/careers/apply">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-coducators-green hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;
