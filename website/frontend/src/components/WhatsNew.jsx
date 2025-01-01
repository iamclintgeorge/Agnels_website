import React from "react";
import "../styles/WhatsNew.css";

function WhatsNew() {
  const tablesData = [
    {
      title: "Admissions",
      tabs: ["1st Year (B.tech)", "2nd Year (B.tech)", "M.tech/ Ph.D"],
    },
    {
      title: "Events",
      tabs: ["Workshops", "Seminars", "Cultural Fest"],
    },
    {
      title: "Placements",
      tabs: ["Internships", "Full-time Offers", "Recruitment Drives"],
    },
  ];

  return (
    <section className="whats-new">
      <h2>WHAT'S NEW?</h2>
      <div className="underline"></div>
      <div className="cards">
        {tablesData.map((table, index) => (
          <div className="card" key={index}>
            <h3>{table.title}</h3>
            <div className="tabs">
              {table.tabs.map((tab, tabIndex) => (
                <span key={tabIndex}>{tab}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatsNew;