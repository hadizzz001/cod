'use client'
import SectionHeading from "../ui/SectionHeading";
import TestimonialCard from "../ui/TestimonialCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react'; 

const Testimonials: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState({
    attend: '',     // This seems like the "Attend" field, will keep it
    name: '',
    son: '',
    age: '',
    description: '',
    // removed stars from state
  });
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/rate');
        const data = await res.json();
        setTestimonials(data.slice(0, 4)); // Get only the first 4 items
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      if (!res.ok) throw new Error('Submission failed');

      alert('Submitted successfully!');
      setShowModal(false);
      setInputs({ attend:'', name: '', son: '', age: '', description: '' });
      window.location.replace(`/reviews`);
    } catch (err) {
      console.error(err);
      alert('Error submitting the form');
    }
  };

  return (
    <section
      id="testimonials"
      className="py-20 dark:bg-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-4 ">
        <SectionHeading
          title="Testimonials"
          subtitle="See how Coducators is making a difference—straight from those who’ve lived it."
          color="green"
        />

        <div className="flex relative flex-wrap gap-6 justify-between items-start px-5 mt-10 w-full lg:min-h-[550px] max-md:max-w-full">
          {testimonials.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="lg:w-[48%]"
              key={index}
            >
              <TestimonialCard 
                quote={item.description}
                name={item.name}
                attend={item.attend}
                role={`Parent of ${item.son}, ${item.age}`}
                imageUrl={`https://www.svgrepo.com/show/527946/user-circle.svg`} // or use a proper image from API
                variant={
                  index === 1
                    ? 'green'
                    : index === 2
                    ? 'red'
                    : index === 3
                    ? 'blue'
                    : 'blue'
                }
                className={cn(
                  index === 1 && 'lg:mt-5',
                  index === 2 && 'lg:mt-6',
                  index === 3 && 'lg:mt-5'
                )} 
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mt-5">
<div className="flex gap-4">
  <button
    onClick={() => setShowModal(true)}
    className="flex-1 px-6 py-3 bg-coducators-green text-white rounded-lg shadow hover:bg-green"
  >
    Rate Now!
  </button>
  <button
    onClick={() => window.location.href = "/reviews"} // navigate to reviews page
    className="flex-1 px-6 py-3 bg-coducators-green text-white rounded-lg shadow hover:bg-green"
  >
    Read More Success Stories!
  </button>
</div>

        

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
              <button
                className="absolute top-2 right-3 text-gray-600 text-xl font-bold hover:text-red-500 "
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

              <h2 className="text-xl font-semibold mb-4 text-black">Submit a Rating</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-md text-black"
                  onChange={handleChange}
                  value={inputs.name}
                  required
                />
                <input
                  type="text"
                  name="son"
                  placeholder="Son's Name"
                  className="w-full px-4 py-2 border rounded-md text-black"
                  onChange={handleChange}
                  value={inputs.son}
                  required
                />
                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  className="w-full px-4 py-2 border rounded-md text-black"
                  onChange={handleChange}
                  value={inputs.age}
                  required
                />

                {/* Attend dropdown */}
                <select
                  name="attend"
                  className="w-full px-4 py-2 border rounded-md text-black"
                  onChange={handleChange}
                  value={inputs.attend}
                  required
                >
                  <option value="" disabled>
                    Attend
                  </option>
                  <option value="Course">Course</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Camp">Camp</option>
                </select>

                <textarea
                  name="description"
                  rows={4}
                  placeholder="Your Description"
                  className="w-full px-4 py-2 border rounded-md text-black"
                  onChange={handleChange}
                  value={inputs.description}
                  required
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      
    </section>
  );
};

export default Testimonials;
