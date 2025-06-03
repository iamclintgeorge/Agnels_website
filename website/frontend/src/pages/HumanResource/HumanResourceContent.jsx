import React from "react";

export const Teaching_Staff = () => {
    return (
        <div className="p-4 bg-white shadow rounded-lg mt-4">
            <h2 className="text-3xl font-semibold">List of Teaching Staff</h2>
            <div className="border-t-2 border-blue-500 my-4"></div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            </p>
        </div>
    );
};

export const Non_Teaching_Staff = () => {
    return (
        <div className="p-4 bg-white shadow rounded-lg mt-4">
        <h2 className="text-3xl font-semibold">List of Non-Teaching Staff</h2>
        <div className="border-t-2 border-blue-500 my-4"></div>
        <h1 className="text-2xl font-semibold mt-12 mb-6">Technical Staff</h1>
          {/* <div className="border-t-2 border-blue-500 my-4"></div> */}
          <iframe
        src="/pdfs/Technicalstaff(T).pdf"
        width="100%"
        height="800px"
        title="Technical Staff"
      />
      <div className="border-t-2 border-blue-500 my-4"></div>
        <h1 className="text-2xl font-semibold mt-12 mb-6">Non-Technical/Administrative Staff</h1>
          
          <iframe
        src="/pdfs/Administrativestaff(NT).pdf"
        width="100%"
        height="800px"
        title="Non-Technical"
      />
    </div>
      
    );
};
