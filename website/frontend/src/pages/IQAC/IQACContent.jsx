import React, { useEffect, useState } from "react";
import axios from "axios";

const Section = ({ title, sectionKey }) => {
  const [html, setHtml] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3663/api/iqac/sections/" +
            encodeURIComponent(sectionKey)
        );
        setHtml(res.data?.content?.content ?? res.data?.content ?? "");
      } catch (_e) {
        setHtml("");
      }
    };
    fetchData();
  }, [sectionKey]);
  return (
    <div id="vm" className="mt-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-playfair font-semibold mb-10">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};

export const Strategies = () => (
  <Section title="Strategies" sectionKey="iqac_strategies" />
);

export const Functions = () => (
  <Section title="Functions" sectionKey="iqac_functions" />
);

export const Benefits = () => (
  <Section title="Benefits" sectionKey="iqac_benefits" />
);

export const Coordinator = () => (
  <Section title="Coordinator" sectionKey="iqac_coordinator" />
);

export const Our_Team = () => (
  <Section title="Our Team" sectionKey="iqac_our_team" />
);

export const IQAC_Initiatives = () => (
  <Section title="Initiatives" sectionKey="iqac_initiatives" />
);
