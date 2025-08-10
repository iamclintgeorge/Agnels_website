import React from "react";
import {
  FaGlobeAsia,
  FaEnvelope,
  FaCalendarAlt,
  FaBook,
  FaRegNewspaper,
} from "react-icons/fa";

const Button = ({ icon: Icon, label, subLabel }) => (
  <button className="flex flex-col items-center w-10 px-2 pb-4 pt-5 border-2 border-gray-300 hover:shadow-[8px_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out flex-1 space-y-3">
    <Icon className="text-3xl mb-3 text-[#0E1D3F]" />
    <div className="text-lg font-librefranklin font-medium text-gray-800">
      {label}
    </div>
    {subLabel && (
      <div className="text-sm text-gray-500 font-medium">{subLabel}</div>
    )}
  </button>
);

const Widgets = () => (
  <div className="flex space-x-6 px-16 py-12 w-full bg-[#F7F7F7] justify-center">
    <Button icon={FaEnvelope} label="Transcripts" />
    <Button icon={FaCalendarAlt} label="Academic Calendar" />
    <Button icon={FaRegNewspaper} label="E-News Letter" />
    <Button icon={FaBook} label="Manthan" />
    <Button icon={FaGlobeAsia} label="ICNTE" />
    <Button icon={FaGlobeAsia} label="Invest" />
  </div>
);

export default Widgets;
