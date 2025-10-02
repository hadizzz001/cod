"use client";

import { useState } from "react";
import { sendEmail } from "../api/sendEmail1/sendEmail1";
import Upload from "../components/Upload"; // make sure this is correct
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SectionHeading from "../components/ui/SectionHeading";

const WorkWithUs = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    availableSaturday: "",
    city: "",
    commute: "",
    enrolledUniversity: "",
    languages: {
      arabic: false,
      french: false,
      english: false,
    },
    position: "",
    otherPosition: "",
    startDate: "",
    motivation: "",
    notes: "",
  });


  const [cvUrl, setCvUrl] = useState("");
  const [messageStatus, setMessageStatus] = useState<null | { success: boolean; message: string }>(null);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const target = e.target;
  const { name, value, type } = target;

  // Extract checked only if target is an input element (checkbox/radio)
  const checked = target instanceof HTMLInputElement ? target.checked : undefined;

  if (name in inputs.languages) {
    // Use `checked` here (will be boolean if input, undefined otherwise)
    setInputs((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [name]: !!checked, // Convert undefined to false safely
      },
    }));
  } else {
    const cleanValue = name === "phone" ? value.replace(/[^0-9]/g, "") : value;
    setInputs((prev) => ({ ...prev, [name]: cleanValue }));
  }
};



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(inputs).forEach(([key, value]) => {
      if (key === "languages") {
        Object.entries(value).forEach(([lang, checked]) => {
          if (checked) formData.append("languages[]", lang);
        });
      } else {
        formData.append(key, value as string);
      }
    });

    formData.append("cvUrl", cvUrl);






    const selectedLanguages = Object.entries(inputs.languages)
      .filter(([_, checked]) => checked)
      .map(([lang]) => lang);

    const payload = {
      ...inputs,
      languages: selectedLanguages,
      cvUrl,
    };

    try {
      const res = await fetch('/api/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });


    } catch (err) {
      console.error(err);
    }




    const result = await sendEmail(formData);
    setMessageStatus(result);

    if (result.success) {
      setInputs({
        fullName: "",
        phone: "",
        email: "",
        dob: "",
        availableSaturday: "",
        city: "",
        commute: "",
        enrolledUniversity: "",
        languages: {
          arabic: false,
          french: false,
          english: false,
        },
        position: "",
        otherPosition: "",
        startDate: "",
        motivation: "",
        notes: "",
      });
      setCvUrl("");
    }
  };


  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />

      <section className="py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto px-4 dark:bg-gray-900 dark:text-white">
          <SectionHeading
            title="Work With Us"
            subtitle="Submit your job application and we’ll get in touch."
            color="blue"
          />

          <div className="grid grid-cols-1 dark:bg-gray-900 dark:text-white">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden p-8 dark:bg-gray-900 dark:text-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 dark:bg-gray-900 dark:text-white">Apply Now</h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* 1. Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300"
                      placeholder="John Doe"
                      onChange={handleChange}
                      value={inputs.fullName}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300"
                      placeholder="70 00 00 00"
                      value={inputs.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300"
                      placeholder="john@example.com"
                      onChange={handleChange}
                      value={inputs.email}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="dob" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300"
                      onChange={handleChange}
                      value={inputs.dob}
                      required
                    />
                  </div>
                </div>

                {/* 2. Availability & Location */}
                <div className="space-y-4">
                  <label className="block text-gray-700 dark:bg-gray-900 dark:text-white">Are you available on Saturdays?</label>
                  <select
                    name="availableSaturday"
                    onChange={handleChange}
                    value={inputs.availableSaturday}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  <label htmlFor="city" className="block text-gray-700 dark:bg-gray-900 dark:text-white">Current City or Area</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    onChange={handleChange}
                    value={inputs.city}
                    required
                  />

                  <label className="block text-gray-700 dark:bg-gray-900 dark:text-white">Can you commute to Ashrafieh?</label>
                  <select
                    name="commute"
                    onChange={handleChange}
                    value={inputs.commute}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* 3. Education & Languages */}
                <div className="space-y-4">
                  <label className="block text-gray-700 dark:bg-gray-900 dark:text-white">Are you currently enrolled in university?</label>
                  <select
                    name="enrolledUniversity"
                    onChange={handleChange}
                    value={inputs.enrolledUniversity}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  <fieldset>
                    <legend className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">Languages Spoken (Check all that apply):</legend>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" name="arabic" checked={inputs.languages.arabic} onChange={handleChange} />
                        <span>Arabic</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" name="french" checked={inputs.languages.french} onChange={handleChange} />
                        <span>French</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" name="english" checked={inputs.languages.english} onChange={handleChange} />
                        <span>English</span>
                      </label>
                    </div>
                  </fieldset>

                </div>

                {/* 4. Position Applied For */}
                <div className="space-y-4 ">
                  <label className="block text-gray-700 dark:bg-gray-900 dark:text-white">Which position are you applying for?</label>
                  <div className="space-y-2">
                    {["Coding Instructor", "Robotics Instructor", "Camp Supervisor", "Admin / Office Assistant", "Sales / Marketing"].map((role) => (
                      <label key={role} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="position"
                          value={role}
                          onChange={handleChange}
                          checked={inputs.position === role}
                        />
                        <span>{role}</span>
                      </label>
                    ))}
                    <label className="block">
                      <input
                        type="radio"
                        name="position"
                        value="Other"
                        onChange={handleChange}
                        checked={inputs.position === 'Other'}
                      />{" "}
                      Other:
                      <input
                        type="text"
                        name="otherPosition"
                        placeholder="Please specify"
                        className="ml-2 px-2 py-1 border border-gray-300 rounded"
                        onChange={handleChange}
                        value={inputs.otherPosition}
                      />
                    </label>
                  </div>
                </div>

                {/* 5. Availability */}
                <div>
                  <label htmlFor="startDate" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">When can you start?</label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    onChange={handleChange}
                    value={inputs.startDate}
                    required
                  />
                </div>

                {/* 6. Motivation */}
                <div>
                  <label htmlFor="motivation" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">Why do you want to work with us?</label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    placeholder="Write your answer here..."
                    onChange={handleChange}
                    value={inputs.motivation}
                    required
                  ></textarea>
                </div>

                {/* 7. Additional Notes */}
                <div>
                  <label htmlFor="notes" className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">Additional Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    placeholder="Add anything else you'd like us to know..."
                    onChange={handleChange}
                    value={inputs.notes}
                  ></textarea>
                </div>

                {/* 8. Upload CV */}
                <div>
                  <label className="block text-gray-700 mb-2 dark:bg-gray-900 dark:text-white">Upload Your CV</label>
                  <Upload onFileUpload={(urls) => setCvUrl(urls[0])} />
                  {cvUrl && <p className="text-sm text-green-600 mt-2">File uploaded successfully.</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-coducators-blue text-white rounded-lg font-semibold shadow-md hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </form>


              {messageStatus && (
                <p className={`mt-4 text-sm font-semibold ${messageStatus.success ? "text-green-600" : "text-red-600"}`}>
                  {messageStatus.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkWithUs;
