import React from "react";
import Faq from "react-faq-component";

const data = {
  title: "FAQs for Pet Booking Management",
  rows: [
    {
      title: `How can I book boarding services for my pet?`,
      content: `You can book boarding services for your pet by navigating to the booking section, selecting the dates, specifying the duration, and any special requirements for your pet.`,
    },
    {
      title: "What facilities are available for boarding?",
      content: `Our boarding facilities include spacious kennels, outdoor play areas, and grooming services to ensure your pet's comfort.`,
    },
    {
      title: "Can I specify dietary preferences for my pet during their stay?",
      content: `Yes, you can specify any dietary preferences or special instructions for your pet's care when booking.`,
    },
    {
      title: "Is there a limit to the duration of boarding?",
      content: `There is no strict limit, but please check availability for longer stays.`,
    },
    {
      title: "Do you provide updates on my pet's stay?",
      content: `We offer regular updates through email or our app, including photos and activity reports.`,
    },
    {
      title: "What if my pet has special medical needs?",
      content: `Please inform us of any medical conditions or medications your pet requires, and our staff will ensure proper care.`,
    },
    {
      title: "Can I visit the boarding facility before booking?",
      content: `Yes, you are welcome to schedule a visit to our facility to see our amenities and meet our staff.`,
    },
    {
      title: "What are the check-in and check-out times?",
      content: `Check-in and check-out times vary, but we strive to accommodate your schedule. Please check with us for specific times.`,
    },
    {
      title: "Are there additional services available?",
      content: `Additional services such as grooming, training sessions, and medical check-ups are available upon request.`,
    },
    {
      title: "How can I contact customer support for further questions?",
      content: `For any additional questions or assistance, please contact our customer support team via phone or email.`,
    },
  ],
};

const styles = {
  bgColor: "white",
  titleTextColor: "black",
  rowTitleColor: "skyblue", 
  rowContentColor: "black",
  arrowColor: "blue",
  margin: "20px",

  rowContainer: {
    marginBottom: "20px", 
    border: "1px solid skyblue", 
    borderRadius: "5px",
    padding: "20px", 
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginLeft: "20px", 
  },
};

const FAQ = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Faq data={data} styles={styles} />
    </div>
  );
};

export default FAQ;
