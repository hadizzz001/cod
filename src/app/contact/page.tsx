"use client"

import { FaFacebook, FaPhone, FaLinkedin, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { sendEmail } from '../api/sendEmail/sendEmail';
import React, { useEffect, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import { useSearchParams } from 'next/navigation';


const Contact: React.FC = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [messageStatus, setMessageStatus] = useState<null | { success: boolean; message: string }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const cleanValue = name === "phone" ? value.replace(/[^0-9]/g, "") : value;

    setInputs((prev) => ({
      ...prev,
      [name]: cleanValue,
    }));
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await sendEmail(formData);
    setMessageStatus(result);

    // ✅ Clear form if success
    if (result.success) {
      setInputs({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };


  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />
      <section id="contact" className="py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto px-4 dark:bg-gray-900 dark:text-white">
          <SectionHeading
            title="Contact Us"
            subtitle="Have questions or ready to enroll? Get in touch with our team for personalized assistance."
            color="blue"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 dark:bg-gray-900 dark:text-white">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden dark:bg-gray-900 dark:text-white">
              <div className="p-8 dark:bg-gray-900 dark:text-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 dark:bg-gray-900 dark:text-white">
                  Send Us a Message
                </h3>

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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                        placeholder="John Doe"
                        onChange={handleChange}
                        value={inputs.name}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                        placeholder="john@example.com"
                        onChange={handleChange}
                        value={inputs.email}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">
                      Phone
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                      name="phone"
                      type="text"
                      placeholder="Phone Number"
                      value={inputs.phone}
                      onChange={handleChange}
                      required
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coducators-blue focus:border-transparent"
                      placeholder="Tell us more about your inquiry..."
                      value={inputs.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-coducators-blue text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>

                {messageStatus && (
                  <p className={`mt-4 text-sm font-semibold ${messageStatus.success ? "text-green-600" : "text-red-600"}`}>
                    {messageStatus.message}
                  </p>
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
                    <div className="bg-coducators-blue/10 p-3 rounded-full ">
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

                  <div className="flex items-start space-x-4">
                    <div className="bg-coducators-green/10 p-3 rounded-full">
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

                  <div className="flex items-start space-x-4">
                    <div className="bg-coducators-red/10 p-3 rounded-full">
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
                <div className="flex space-x-3">
                  <a
                    href="https://api.whatsapp.com/send/?phone=96170128107&text&app_absent=0"
                    target="_blank"
                    className="rounded-full cursor-pointer bg-coducators-blue/15 w-12 h-12 grid place-items-center"
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
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
