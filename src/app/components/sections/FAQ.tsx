'use client';

import React, { useEffect, useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';

const FAQ: React.FC = () => {
  const [faqItems, setFaqItems] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('/api/faq');
        const data = await response.json();
        setFaqItems(data.slice(0, 6)); // Show only the first 4 FAQs
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <section id="faq" className="py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Got questions? Our FAQ has everything you need to get started with Coducators."
          color="red"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {faqItems.map((item, index) => (
<div
  key={index}
  className="bg-coducators-lightgray rounded-xl overflow-hidden h-fit border border-gray-300 dark:border-gray-700 shadow-sm"
>
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

        <div className="text-center mt-12"> 
          <a
            href="/faq"
            className="inline-block py-3 px-8 bg-coducators-red text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-1"
          >
            Read All FAQs
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
