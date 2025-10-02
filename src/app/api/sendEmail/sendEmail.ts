"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const firstname = formData.get("name");
  const interest = formData.get("interest");
  const phone = formData.get("phone");
  const message = formData.get("message");
  const age = formData.get("age");

  // Get 3 dates from form data
  const dateStr1 = formData.get("date1");
  const dateStr2 = formData.get("date2");
  const dateStr3 = formData.get("date3");

  // Helper function to format a date string
  const formatDate = (dateStr: FormDataEntryValue | null) => {
    if (!dateStr) return "N/A";
    const dateObj = new Date(dateStr.toString());
    if (isNaN(dateObj.getTime())) return "Invalid date";
    return dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formattedDate1 = formatDate(dateStr1);
  const formattedDate2 = formatDate(dateStr2);
  const formattedDate3 = formatDate(dateStr3);

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
      subject: "New message from your website",
      text: `Name: ${firstname}
Phone: ${phone}
Interest: ${interest}
Age: ${age}
Best Date & Time Options:
  1) ${formattedDate1}
  2) ${formattedDate2}
  3) ${formattedDate3}
Message: ${message}`,
    });

    return { success: true, message: "Your free trial session request has been received. In the meantime, you can check out our projects." };
  } catch (error) {
    console.error("Send email error:", error);
    return { success: false, message: "Failed to send message." };
  }
};
