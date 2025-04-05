import React from "react";
import { aboutUsApi } from "../../services/apiService";
import DynamicSectionTemplate from "./DynamicSectionTemplate";
import { Managing_Director_Desk } from "./aboutusContent";

/* ------------------------------------------------------------------
   DYNAMIC MANAGING DIRECTOR'S DESK
   This component fetches content from the API instead of using hardcoded data
   ------------------------------------------------------------------ */

// Shared container from aboutusContent.jsx
const SectionContainer = ({ title, subtitle, children }) => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Title & Subtitle */}
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">{title}</h2>
            {subtitle && (
              <p className="text-gray-500 mt-2 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

// Default content structure matches the admin panel structure
const defaultContent = {
  title: "Managing Director's Desk",
  subtitle: "Hear from our esteemed Managing Director",
  director: {
    name: "Rev. Fr. Peter D'Souza",
    position: "Managing Director",
    message: "",
    image: "src/assets/imgs/Father.jpg"
  },
  quotes: {
    text: "",
    author: ""
  }
};

export const Managing_Director_Desk_Dynamic = () => {
  // Render function that receives the content and returns JSX
  const renderContent = (content) => (
    <div className="flex flex-col gap-10">
      {/* Single Card Matching the Layout of Other Pages */}
      <div className="bg-white rounded-md shadow-sm p-5 hover:shadow-md transition-shadow">
        {/* Image - Using our API helper to format the URL */}
        {content.director && content.director.image && (
          <div className="overflow-hidden rounded-md mb-6 max-w-xs mx-auto shadow-sm hover:shadow-md transition-shadow">
            <img
              src={aboutUsApi.formatImageUrl(content.director.image)}
              alt={content.director.name || "Managing Director"}
              className="w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          {content.director && (content.director.title || `${content.director.name}, ${content.director.position}`)}
        </h3>

        {/* Text Content */}
        {content.director && content.director.message && (
          <div className="text-gray-700 space-y-4">
            {content.director.message.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Quote */}
        {content.quotes && content.quotes.text && (
          <blockquote className="italic mt-8 border-l-4 border-gray-400 pl-4 text-gray-600">
            "{content.quotes.text}"
            {content.quotes.author && (
              <footer className="mt-2 not-italic font-semibold">— {content.quotes.author}</footer>
            )}
          </blockquote>
        )}
      </div>
    </div>
  );

  return (
    <DynamicSectionTemplate
      sectionKey="Managing Director's Desk"
      defaultContent={defaultContent}
      renderContent={renderContent}
      fallbackComponent={<Managing_Director_Desk />}
    />
  );
};

export default Managing_Director_Desk_Dynamic; 