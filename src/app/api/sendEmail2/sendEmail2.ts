"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const organizationName = formData.get("organizationName");
  const contactPerson = formData.get("contactPerson");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const website = formData.get("website");
  const location = formData.get("location");
  const preferredDays = formData.get("preferredDays");
  const preferredTimes = formData.get("preferredTimes");
  const startDate = formData.get("startDate");
  const duration = formData.get("duration");

const selectedSessions = formData.getAll("sessions[]"); // returns array like ['coding', 'ai']

const robotics = selectedSessions.includes("robotics");
const coding = selectedSessions.includes("coding");
const ai = selectedSessions.includes("ai");
const gameDesign = selectedSessions.includes("gameDesign");
const digitalArt = selectedSessions.includes("digitalArt");

const otherSession = formData.get("sessionOther") || "";


  const targetAgeGroup = formData.get("targetAgeGroup");
  const studentCount = formData.get("studentCount");
  const hasRooms = formData.get("hasRooms");
  const ownDevices = formData.get("ownDevices");
  const wifiAccess = formData.get("wifiAccess");
  const needEquipment = formData.get("needEquipment");
  const additionalNotes = formData.get("additionalNotes");
 
  

  // Create readable session list
  const sessionsSelected = [
    robotics && "Robotics",
    coding && "Coding",
    ai && "AI",
    gameDesign && "Game Design",
    digitalArt && "Digital Art",
    otherSession && `Other: ${otherSession}`
  ]
    .filter(Boolean)
    .join(", ") || "None selected";

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
      subject: "New Organization Partnership Inquiry",
      text: `
New Organization Submission

1. Organization Details
Organization Name: ${organizationName}
Contact Person: ${contactPerson}
Phone Number: ${phone}
Email Address: ${email}
Website: ${website}
Location: ${location}

2. Scheduling Preferences
Preferred Days: ${preferredDays}
Preferred Times: ${preferredTimes}
Start Date: ${startDate}
Duration: ${duration}

3. Session Interests
Sessions Interested In: ${sessionsSelected}

4. Student & Facility Info
Target Age Group: ${targetAgeGroup}
Estimated Student Count: ${studentCount}
Has Available Rooms: ${hasRooms}
Own Devices: ${ownDevices}
Wi-Fi Access: ${wifiAccess}
Requires Equipment from Us: ${needEquipment}

5. Additional Notes
${additionalNotes}
      `,
    });

    return { success: true, message: "Submission sent successfully." };
  } catch (error) {
    console.error("Send email error:", error);
    return { success: false, message: "Failed to send submission." };
  }
};
