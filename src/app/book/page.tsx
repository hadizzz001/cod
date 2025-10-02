"use client"

import { FaFacebook, FaPhone, FaLinkedin, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { sendEmail } from '../api/sendEmail/sendEmail';
import React, { useEffect, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import { useSearchParams } from 'next/navigation';
import GoogleMap from '@/app/components/GoogleMap';
import SearchParamHandler from '@/app/components/SearchParamHandler';
import { Suspense } from 'react';


const Contact: React.FC = () => {
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    message: "",
    age: "",
    interest: "",
    date1: "",
    date2: "",
    date3: "",
  });
  const [messageStatus, setMessageStatus] = useState<null | { success: boolean; message: string }>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);

 


  useEffect(() => {
    if (messageStatus) {
      setShowModal(true);
    }
  }, [messageStatus]);

  const closeModal = () => {
    setShowModal(false);
  };


  const interestOptions = [
    'Camp',
    'Course',
    'Workshop',
  ];

  const toggleOption = (option) => {
    setSelected((prevSelected) => {
      let updated;
      if (prevSelected.includes(option)) {
        updated = prevSelected.filter((item) => item !== option);
      } else {
        updated = [...prevSelected, option];
      }
      return updated;
    });

    // Close the dropdown immediately after selection
    setShowDropdown(false);
  };




  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const cleanValue = name === "phone" ? value.replace(/[^0-9]/g, "") : value;

    setInputs((prev) => ({
      ...prev,
      [name]: cleanValue,
    }));
  };

  const handleSubmit = async (formData: FormData) => {
    // Ensure updated interest is added to FormData
    formData.set("interest", selected.join(", ")); // 👈 force update interest field

    const result = await sendEmail(formData);
    setMessageStatus(result);

    if (result.success) {
      setInputs({
        name: "",
        interest: "",
        phone: "",
        message: "",
        age: "",
        date1: "",
        date2: "",
        date3: "",
      });
      setSelected([]); // 👈 reset selected interests
    }
  };







  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />


<Suspense fallback={null}>
  <SearchParamHandler setSelected={setSelected} setInputs={setInputs} />
</Suspense>


      <section id="contact" className="py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto px-4 dark:bg-gray-900 dark:text-white">
          <SectionHeading
            title="Book a Free Session"
            subtitle="Ready to book your session or need more information? Contact our team today for personalized support and scheduling."
            color="blue"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 dark:bg-gray-900 dark:text-white">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden dark:bg-gray-900 dark:text-white">
              <div className="p-8 dark:bg-gray-900 dark:text-white">



                <form
                  className="space-y-6 dark:bg-gray-900 dark:text-white" action={handleSubmit}  >

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 dark:bg-gray-900 dark:text-white">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                        placeholder="John Doe"
                        onChange={handleChange}
                        value={inputs.name}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">
                        Phone
                      </label>
                      <input
                        className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                        name="phone"
                        type="text"
                        placeholder="Phone Number"
                        value={inputs.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 dark:bg-gray-900 dark:text-white">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">
                        Kids age
                      </label>
                      <input
                        type="text"
                        name="age"
                        id="age"
                        className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                        placeholder="Kids age"
                        onChange={handleChange}
                        value={inputs.age}
                        required
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="interest"
                        className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white"
                      >
                        Interest
                      </label>

                      <div
                        onClick={() => setShowDropdown((prev) => !prev)}
                        className="cursor-pointer w-full px-4 py-3 bg-white  text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                      >
                        {selected.length > 0 ? selected.join(', ') : 'Select interests'}
                      </div>

                      {showDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                          {interestOptions.map((option) => (
                            <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={selected.includes(option)}
                                onChange={() => toggleOption(option)}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">
                      Best Date & Time (1)
                    </label>
                    <input
                      className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                      name="date1"
                      type="datetime-local"
                      placeholder="Select date and time"
                      value={inputs.date1}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">
                      Best Date & Time (2)
                    </label>
                    <input
                      className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                      name="date2"
                      type="datetime-local"
                      placeholder="Select date and time"
                      value={inputs.date2}
                      onChange={handleChange}

                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">
                      Best Date & Time (3)
                    </label>
                    <input
                      className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                      name="date3"
                      type="datetime-local"
                      placeholder="Select date and time"
                      value={inputs.date3}
                      onChange={handleChange}

                    />
                  </div>


                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                      placeholder="Topic of the session..."
                      value={inputs.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-coducators-blue text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                  >
                    Book Now
                  </button>
                </form>

                {showModal && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                  >
                    <div
                      className="bg-white rounded-lg shadow-lg p-12 max-w-lg w-full relative"
                      onClick={(e) => e.stopPropagation()} // prevent closing modal on clicking inside box
                    >
                      <button
                        onClick={closeModal}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl p-2"
                        aria-label="Close modal"
                      >
                        &times;
                      </button>


                      <h1
                        className={`text-3xl font-bold ${messageStatus.success ? "text-gray-500" : "text-red-600"
                          }`}
                      >
                        {messageStatus.message}
                      </h1>

                      {messageStatus.success && (
                        <a
                          href="/courses"
                          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                          onClick={closeModal}
                        >
                          Our Courses
                        </a>
                      )}
                    </div>
                  </div>
                )}


              </div>
            </div>

            <div className="space-y-8 dark:bg-gray-900 dark:text-white">
              <div className="bg-white rounded-2xl shadow-md p-8 dark:bg-gray-900 dark:text-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 dark:bg-gray-900 dark:text-white">
                  Contact Information
                </h3>

                <div className="space-y-4 dark:bg-gray-900 dark:text-white">
                  <div className="flex items-start space-x-4 dark:bg-gray-900 dark:text-white">
                    <div className="bg-coducators-blue/10 p-3 rounded-full dark:bg-gray-900 dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-coducators-blue"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:bg-gray-900 dark:text-white">Location</h4>
                      <p className="text-gray-600 mt-1 dark:bg-gray-900 dark:text-white">
                        Beirut, Achrafieh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 dark:bg-gray-900 dark:text-white">
                    <div className="bg-coducators-green/10 p-3 rounded-full dark:bg-gray-900 dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-coducators-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:bg-gray-900 dark:text-white">Email</h4>
                      <p className="text-gray-600 mt-1 dark:bg-gray-900 dark:text-white">info@coducators.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 dark:bg-gray-900 dark:text-white">
                    <div className="bg-coducators-red/10 p-3 rounded-full dark:bg-gray-900 dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-coducators-red"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:bg-gray-900 dark:text-white">Phone</h4>
                      <p className="text-gray-600 mt-1 dark:bg-gray-900 dark:text-white">+961 70 128 107</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md overflow-hidden p-8 dark:bg-gray-900 dark:text-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 dark:bg-gray-900 dark:text-white">
                  Our Social Links
                </h3>
                <div className="flex space-x-3 dark:bg-gray-900 dark:text-white">
                  <a
                    href="https://api.whatsapp.com/send/?phone=96170128107&text&app_absent=0"
                    target="_blank"
                    className="rounded-full cursor-pointer bg-coducators-blue/15 w-12 h-12 grid place-items-center "
                  >
                    <FaWhatsapp size={24} className="fill-coducators-blue stroke-none" />
                  </a>
                  <a
                    href="https://www.instagram.com/coducators/"
                    target="_blank"
                    className="rounded-full cursor-pointer bg-coducators-blue/15 w-12 h-12 grid place-items-center"
                  >
                    <FaInstagram size={24} className="fill-coducators-blue stroke-none" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/coducators"
                    target="_blank"
                    className="rounded-full cursor-pointer bg-coducators-blue/15 w-12 h-12 grid place-items-center"
                  >
                    <FaLinkedin size={24} className="fill-coducators-blue stroke-none" />
                  </a>
                  <a
                    href="https://www.facebook.com/coducators"
                    target="_blank"
                    className="rounded-full cursor-pointer bg-coducators-blue/15 w-12 h-12 grid place-items-center"
                  >
                    <FaFacebook size={24} className="fill-coducators-blue stroke-none" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@coducators"
                    target="_blank"
                    className="rounded-full cursor-pointer bg-coducators-blue/15 w-12 h-12 grid place-items-center"
                  >
                    <FaTiktok size={24} className="fill-coducators-blue stroke-none" />
                  </a>
                </div>



              </div>

              <div className="bg-white rounded-2xl shadow-md overflow-hidden p-8 dark:bg-gray-900 dark:text-white">
                <GoogleMap />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
