import React from "react";

export const SectionContainer = ({ title, subtitle, children }) => {
  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              {title}
            </h2>
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
