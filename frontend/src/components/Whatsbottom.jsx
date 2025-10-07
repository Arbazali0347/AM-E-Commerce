import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "+923451081010"; // apna WhatsApp number (country code ke sath)
  const message = "Hey! Can i get more info ?"; // default message

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-14 h-14 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
      />
    </a>
  );
};

export default WhatsAppButton;
