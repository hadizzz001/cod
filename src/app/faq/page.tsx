'use client';
import React, { useState, useEffect } from 'react';
import SectionHeading from '@/app/components/ui/SectionHeading';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer'; 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [faqItems, setFaqItems] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('/api/faq');
        const data = await response.json();
        setFaqItems(data); // Show only the first 4 FAQs
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);



  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />
      <section id="faq" className="py-20 bg-white dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto px-4 dark:bg-gray-900 dark:text-white">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our programs, teaching methods, and enrollment process."
            color="red"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 ">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-coducators-lightgray rounded-xl overflow-hidden h-fit">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${index}`} className="border-0">
                    <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline hover:bg-gray-100/50">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-1 text-gray-700">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
 
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
























