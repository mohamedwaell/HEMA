// WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "201550565354"; 
  const defaultMessage = "let's talk ya sahpy"; 
  const msg = encodeURIComponent(defaultMessage);

  const handleClick = (e) => {
    e.preventDefault();
    const url = `https://wa.me/${phoneNumber}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Open WhatsApp chat"
      className="fixed bottom-5 right-5 z-45 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-300 hover:bg-gray-400 text-black shadow-xl transform transition-all duration-200
                 focus:outline-none focus:ring-4 focus:ring-white-50
                 hover:scale-105"
      title="تواصل عبر واتساب"
    >
      <span className="sr-only">Open WhatsApp</span>
      <FaWhatsapp size={25} />
    </button>
  );
};

export default WhatsAppButton;
