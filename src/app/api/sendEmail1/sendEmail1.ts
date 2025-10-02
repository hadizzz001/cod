"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const fullName = formData.get("fullName");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const dob = formData.get("dob");
  const availableSaturday = formData.get("availableSaturday");
  const city = formData.get("city");
  const commute = formData.get("commute");
  const enrolledUniversity = formData.get("enrolledUniversity");
  const startDate = formData.get("startDate");
  const motivation = formData.get("motivation");
  const notes = formData.get("notes");
  const position = formData.get("position");
  const otherPosition = formData.get("otherPosition");
  const cvUrl = formData.get("cvUrl");

  const languages = formData.getAll("languages[]").join(", ") || "None selected";

  const finalPosition = position === "Other" && otherPosition
    ? `Other: ${otherPosition}`
    : position;

 

  try {
    await resend.emails.send({
      from: "noreply@noreply.hadizproductions.com",
      // to: "alihadimedlej001@gmail.com",
  to: [
    "info@coducators.com",
    "marcsabeh@coducators.com",
    "admin@coducators.com",
    "sales@coducators.com"
  ],
      subject: "New Job Application",
      text: `
Coducators – Job Application Form Submission

1. Personal Information
Full Name: ${fullName}
Phone Number: ${phone}
Email Address: ${email}
Date of Birth: ${dob}

2. Availability & Location
Available on Saturdays: ${availableSaturday}
Current City or Area: ${city}
Can commute to Ashrafieh: ${commute}

3. Education & Languages
Enrolled in University: ${enrolledUniversity}
Languages Spoken: ${languages}

4. Position Applied For
Position: ${finalPosition}

5. Availability
Start Date: ${startDate}

6. Motivation
${motivation}

7. Additional Notes
${notes}

8. CV
${cvUrl}
      `,
    });

    return { success: true, message: "Application sent successfully." };
  } catch (error) {
    console.error("Send email error:", error);
    return { success: false, message: "Failed to send application." };
  }
};
