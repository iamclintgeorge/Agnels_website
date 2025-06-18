import React from "react";
import {
  FaGlobeAsia,
  FaEnvelope,
  FaCalendarAlt,
  FaBook,
  FaRegNewspaper,
} from "react-icons/fa";

const Button = ({ icon: Icon, label, subLabel }) => (
  <button className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 flex-1">
    <Icon className="text-4xl mb-4" />
    <div className="text-xl font-semibold">{label}</div>
    {subLabel && <div className="text-md text-gray-500">{subLabel}</div>}
  </button>
);

const Widgets = () => (
  <div className="flex space-x-4 p-4 w-full">
    <Button icon={FaEnvelope} label="Transcripts" />
    <Button icon={FaCalendarAlt} label="Academic Calendar" />
    <Button icon={FaRegNewspaper} label="E-News Letter" />
    <Button icon={FaBook} label="Manthan" subLabel="FCRIT Magazine" />
    <Button icon={FaGlobeAsia} label="ICNTE" subLabel="Connecting Ideas" />
    <Button icon={FaGlobeAsia} label="INVEST" />
  </div>
);

export default Widgets;
