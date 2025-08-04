import React, { useState, useEffect } from "react";

import {
  FaChalkboardTeacher,
  FaUsers,
  FaEye,
  FaClipboardCheck,
  FaCheckCircle,
  FaUniversity,
  FaGraduationCap,
  FaBook,
  FaCertificate,
  FaAward,
  FaChartLine,
  FaCog,
  FaSpinner,
  FaFilePdf,
  FaBookOpen,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaDesktop,
  FaTags,
  FaUser,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaBell,
} from "react-icons/fa";

export const Homee = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3663/api/academic/home");
      const data = await response.json();
      console.log("Fetched Home Data:", data);

      if (data.result && data.result.length > 0) {
        const homeInfo = data.result[0];

        // Parse admin_cards for each section and rename to cards
        if (homeInfo.sections) {
          homeInfo.sections = homeInfo.sections.map((section) => ({
            ...section,
            cards: section.admin_cards || [], // Use admin_cards from your query
          }));
        }

        console.log("Processed Home Data with Cards:", homeInfo);
        setHomeData(homeInfo);
      } else {
        setError("No data available");
      }
    } catch (error) {
      console.error("Error fetching home data:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (iconName, className = "text-4xl") => {
    const iconMap = {
      FaChalkboardTeacher: <FaChalkboardTeacher className={className} />,
      FaUsers: <FaUsers className={className} />,
      FaEye: <FaEye className={className} />,
      FaClipboardCheck: <FaClipboardCheck className={className} />,
      FaCheckCircle: <FaCheckCircle className={className} />,
      FaUniversity: <FaUniversity className={className} />,
      FaGraduationCap: <FaGraduationCap className={className} />,
      FaBook: <FaBook className={className} />,
      FaCertificate: <FaCertificate className={className} />,
      FaAward: <FaAward className={className} />,
      FaChartLine: <FaChartLine className={className} />,
      FaCog: <FaCog className={className} />,
    };
    return iconMap[iconName] || <FaUsers className={className} />;
  };

  const AdminCard = ({ title, description, icon }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
      <div className="text-blue-700 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4 mx-auto" />
          <p className="text-lg text-gray-600">
            Loading Academic Information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchHomeData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Content Available
          </h2>
          <p className="text-gray-600">
            Academic information is not available at the moment.
          </p>
        </div>
      </div>
    );
  }

  // Debug: Log sections data
  console.log("Sections data:", homeData.sections);

  // Group sections by type - Fixed filtering logic
  const sectionsByType = {
    mission:
      homeData.sections?.filter(
        (s) =>
          s.section_type === "mission" &&
          (s.is_active === "1" || s.is_active === 1)
      ) || [],
    admin:
      homeData.sections?.filter(
        (s) =>
          s.section_type === "admin" &&
          (s.is_active === "1" || s.is_active === 1)
      ) || [],
    attendance:
      homeData.sections?.filter(
        (s) =>
          s.section_type === "attendance" &&
          (s.is_active === "1" || s.is_active === 1)
      ) || [],
    audit:
      homeData.sections?.filter(
        (s) =>
          s.section_type === "audit" &&
          (s.is_active === "1" || s.is_active === 1)
      ) || [],
    custom:
      homeData.sections?.filter(
        (s) =>
          s.section_type === "custom" &&
          (s.is_active === "1" || s.is_active === 1)
      ) || [],
    other:
      homeData.sections?.filter(
        (s) =>
          !["mission", "admin", "attendance", "audit", "custom"].includes(
            s.section_type
          ) &&
          (s.is_active === "1" || s.is_active === 1)
      ) || [],
  };

  // Debug: Log filtered sections
  console.log("Filtered sections by type:", sectionsByType);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* Header Section: Vision & Leadership */}
      <section className="intro py-20 text-black relative">
        {homeData.hero_image_url && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url(http://localhost:3663${homeData.hero_image_url?.trim()})`,
            }}
          ></div>
        )}
        <div className="container mx-auto text-center px-6 relative z-10">
          <h1 className="text-5xl font-extrabold mb-6">{homeData.title}</h1>
          <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            {homeData.description}
          </p>
          {homeData.hero_image_url && (
            <div className="relative mb-8">
              <img
                src={`http://localhost:3663${homeData.hero_image_url?.trim()}`}
                alt="Academic Excellence"
                className="mx-auto rounded-lg shadow-lg max-h-64 object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Debug Section - Remove this in production */}
      {/* <section className="debug py-8 bg-yellow-100">
        <div className="container mx-auto px-6">
          <h3 className="text-lg font-semibold mb-4">Debug Info (Remove in production):</h3>
          <p className="text-sm mb-2">Total sections: {homeData.sections?.length || 0}</p>
          <p className="text-sm mb-2">Mission sections: {sectionsByType.mission.length}</p>
          <p className="text-sm mb-2">Admin sections: {sectionsByType.admin.length}</p>
          <p className="text-sm mb-2">Attendance sections: {sectionsByType.attendance.length}</p>
          <p className="text-sm mb-2">Audit sections: {sectionsByType.audit.length}</p>
          <p className="text-sm mb-2">Custom sections: {sectionsByType.custom.length}</p>
          <p className="text-sm mb-2">Other sections: {sectionsByType.other.length}</p>
          
        
          {homeData.sections?.map(section => (
            <p key={section.id} className="text-sm mb-1">
              Section "{section.title}" ({section.section_type}): {section.cards?.length || 0} cards
            </p>
          ))}
          
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium">View raw sections data</summary>
            <pre className="mt-2 text-xs bg-white p-4 rounded overflow-auto max-h-40">
              {JSON.stringify(homeData.sections, null, 2)}
            </pre>
          </details>
        </div>
      </section> */}

      {/* Mission Statement & Teaching Philosophy */}
      {sectionsByType.mission.map((section) => (
        <section key={section.id} className="mission py-16 bg-white">
          <div className="container mx-auto text-center px-6">
            <div className="mb-4">
              <span className="text-sm text-blue-600 uppercase font-semibold tracking-wide">
                {section.section_type} Section
              </span>
            </div>
            <h2 className="text-4xl font-semibold text-blue-900 mb-6 flex justify-center items-center">
              <span className="mr-3 text-blue-700">
                {renderIcon(section.icon)}
              </span>
              {section.title}
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed mb-8">
              {section.description}
            </p>

            {/* Mission Cards */}
            {section.cards && section.cards.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.cards
                  .filter(
                    (card) => card.is_active === "1" || card.is_active === 1
                  )
                  .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                  .map((card) => (
                    <AdminCard
                      key={card.id}
                      title={card.title}
                      description={card.description}
                      icon={renderIcon(card.icon)}
                    />
                  ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Academic Administration Section */}
      {sectionsByType.admin.map((section) => (
        <section key={section.id} className="admin py-20 bg-gray-100">
          <div className="container mx-auto text-center px-6">
            <div className="mb-4">
              <span className="text-sm text-blue-600 uppercase font-semibold tracking-wide">
                {section.section_type} Section
              </span>
            </div>
            <h2 className="text-4xl font-semibold text-blue-900 mb-8 flex justify-center items-center">
              <span className="mr-3 text-blue-700">
                {renderIcon(section.icon)}
              </span>
              {section.title}
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed mb-8">
              {section.description}
            </p>

            {/* Admin Cards */}
            {section.cards && section.cards.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {section.cards
                  .filter(
                    (card) => card.is_active === "1" || card.is_active === 1
                  )
                  .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                  .map((card) => (
                    <AdminCard
                      key={card.id}
                      title={card.title}
                      description={card.description}
                      icon={renderIcon(card.icon)}
                    />
                  ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Attendance Monitoring & Grievance Redressal */}
      {sectionsByType.attendance.map((section) => (
        <section
          key={section.id}
          className="attendance-grievance py-16 bg-white"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-4">
              <span className="text-sm text-blue-600 uppercase font-semibold tracking-wide">
                {section.section_type} Section
              </span>
            </div>
            <h2 className="text-4xl font-semibold text-blue-900 text-center mb-8 flex justify-center items-center">
              <span className="mr-3 text-blue-700">
                {renderIcon(section.icon)}
              </span>
              {section.title}
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed mb-8 text-center">
              {section.description}
            </p>

            {/* Attendance Cards */}
            {section.cards && section.cards.length > 0 && (
              <div className="grid md:grid-cols-2 gap-12">
                {section.cards
                  .filter(
                    (card) => card.is_active === "1" || card.is_active === 1
                  )
                  .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                  .map((card) => (
                    <AdminCard
                      key={card.id}
                      title={card.title}
                      description={card.description}
                      icon={renderIcon(card.icon)}
                    />
                  ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Academic Audit and Appraisal */}
      {sectionsByType.audit.map((section) => (
        <section key={section.id} className="audit py-16 bg-gray-100">
          <div className="container mx-auto text-center px-6">
            <div className="mb-4">
              <span className="text-sm text-blue-600 uppercase font-semibold tracking-wide">
                {section.section_type} Section
              </span>
            </div>
            <h2 className="text-4xl font-semibold text-blue-900 mb-6 flex justify-center items-center">
              <span className="mr-3 text-blue-700">
                {renderIcon(section.icon)}
              </span>
              {section.title}
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed mb-8">
              {section.description}
            </p>

            {/* Audit Cards or List */}
            {section.cards && section.cards.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.cards
                  .filter(
                    (card) => card.is_active === "1" || card.is_active === 1
                  )
                  .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                  .map((card) => (
                    <AdminCard
                      key={card.id}
                      title={card.title}
                      description={card.description}
                      icon={renderIcon(card.icon)}
                    />
                  ))}
              </div>
            ) : (
              // Fallback list for audit section if no cards
              <ul className="list-disc list-inside text-left text-gray-700 mx-auto max-w-xl space-y-2 text-lg">
                <li>📌 Department Working Committee (DWC)</li>
                <li>📌 Departmental Quality Assurance Cell (DQAC)</li>
                <li>📌 Departmental Advisory Board (DAB)</li>
                <li>📌 Institute Quality Assurance Cell (IQAC)</li>
                <li>📌 Industry Advisory Board (IAB)</li>
              </ul>
            )}
          </div>
        </section>
      ))}

      {/* Custom Sections */}
      {sectionsByType.custom.map((section, index) => (
        <section
          key={section.id}
          className={`custom-section py-16 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto text-center px-6">
            <div className="mb-4">
              <span className="text-sm text-blue-600 uppercase font-semibold tracking-wide">
                {section.section_type} Section
              </span>
            </div>
            <h2 className="text-4xl font-semibold text-blue-900 mb-6 flex justify-center items-center">
              <span className="mr-3 text-blue-700">
                {renderIcon(section.icon)}
              </span>
              {section.title}
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed mb-8">
              {section.description}
            </p>

            {/* Custom Section Cards */}
            {section.cards && section.cards.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.cards
                  .filter(
                    (card) => card.is_active === "1" || card.is_active === 1
                  )
                  .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                  .map((card) => (
                    <AdminCard
                      key={card.id}
                      title={card.title}
                      description={card.description}
                      icon={renderIcon(card.icon)}
                    />
                  ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Other Sections (for sections that don't match standard types) */}
      {sectionsByType.other.map((section, index) => (
        <section
          key={section.id}
          className={`other-section py-16 ${
            index % 2 === 0 ? "bg-blue-50" : "bg-gray-50"
          }`}
        >
          <div className="container mx-auto text-center px-6">
            <div className="mb-4">
              <span className="text-sm text-blue-600 uppercase font-semibold tracking-wide">
                {section.section_type || "General"} Section
              </span>
            </div>
            <h2 className="text-4xl font-semibold text-blue-900 mb-6 flex justify-center items-center">
              <span className="mr-3 text-blue-700">
                {renderIcon(section.icon)}
              </span>
              {section.title}
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed mb-8">
              {section.description}
            </p>

            {/* Other Section Cards */}
            {section.cards && section.cards.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.cards
                  .filter(
                    (card) => card.is_active === "1" || card.is_active === 1
                  )
                  .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                  .map((card) => (
                    <AdminCard
                      key={card.id}
                      title={card.title}
                      description={card.description}
                      icon={renderIcon(card.icon)}
                    />
                  ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Footer Note */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto text-center px-6">
          <p className="text-lg">Building Tomorrow's Engineers Today</p>
          <p className="text-sm mt-2 opacity-80">
            Fr. Conceicao Rodrigues Institute of Technology
          </p>
        </div>
      </footer>
    </div>
  );
};

const AdminCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl text-center">
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-800 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

``;

// Academic Handbook Component (for general handbooks)
export const AcademicHandbook = () => {
  const [handbook, setHandbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHandbook = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3663/api/academic/handbooks"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // 🔍 DEBUG: Log the actual API response structure
        // console.log('🔍 API Response:', responseData);
        // console.log('🔍 Response type:', typeof responseData);
        // console.log('🔍 Is array?', Array.isArray(responseData));
        // console.log('🔍 Response keys:', Object.keys(responseData || {}));
        // console.log('🔍 Full response structure:', JSON.stringify(responseData, null, 2));

        // Handle different response formats with more debugging
        let data;
        if (Array.isArray(responseData)) {
          // console.log('✅ Using direct array format');
          data = responseData;
        } else if (
          responseData &&
          responseData.data &&
          Array.isArray(responseData.data)
        ) {
          // console.log('✅ Using responseData.data format');
          data = responseData.data;
        } else if (
          responseData &&
          responseData.handbooks &&
          Array.isArray(responseData.handbooks)
        ) {
          // console.log('✅ Using responseData.handbooks format');
          data = responseData.handbooks;
        } else if (
          responseData &&
          responseData.results &&
          Array.isArray(responseData.results)
        ) {
          // console.log('✅ Using responseData.results format');
          data = responseData.results;
        } else if (
          responseData &&
          responseData.result &&
          Array.isArray(responseData.result)
        ) {
          // console.log('✅ Using responseData.result format (singular)');
          data = responseData.result;
        } else if (
          responseData &&
          responseData.rows &&
          Array.isArray(responseData.rows)
        ) {
          // console.log('✅ Using responseData.rows format');
          data = responseData.rows;
        } else {
          // console.log('❌ None of the expected formats matched');
          // console.log('❌ Available keys:', responseData ? Object.keys(responseData) : 'responseData is null/undefined');
          throw new Error(
            `API response format not recognized. Response keys: ${
              responseData ? Object.keys(responseData).join(", ") : "none"
            }`
          );
        }

        // console.log('📚 Processed data:', data);

        // Filter for general handbooks and get the latest one
        const generalHandbooks = data.filter(
          (item) =>
            item.handbook_type === "general" &&
            item.title &&
            item.pdf_url &&
            (item.deleted === 0 || item.deleted === "0")
        );

        if (generalHandbooks.length > 0) {
          // 🔍 LATEST ENTRY LOGIC: Sort by updated_at (priority) or created_at (fallback)
          // This sorts in DESCENDING order - newest first
          const latestHandbook = generalHandbooks.sort((a, b) => {
            const dateA = new Date(a.updated_at || a.created_at);
            const dateB = new Date(b.updated_at || b.created_at);
            return dateB - dateA; // Descending order: newer dates first
          })[0]; // Take the first element (newest)

          // console.log('📊 All general handbooks:', generalHandbooks.map(h => ({
          //   id: h.id,
          //   title: h.title,
          //   updated_at: h.updated_at,
          //   created_at: h.created_at
          // })));
          // console.log('🎯 Selected latest handbook:', {
          //   id: latestHandbook.id,
          //   title: latestHandbook.title,
          //   updated_at: latestHandbook.updated_at,
          //   created_at: latestHandbook.created_at
          // });

          setHandbook(latestHandbook);
        } else {
          setError("No general handbook found");
        }
      } catch (err) {
        console.error("❌ Full error details:", err);
        console.error("❌ Error message:", err.message);
        console.error("❌ Error stack:", err.stack);

        // More specific error messages
        if (err.message.includes("API response is not in expected format")) {
          setError(`API Format Error: ${err.message}`);
        } else if (err.message.includes("Failed to fetch")) {
          setError(
            "Cannot connect to server. Is your API running on port 3663?"
          );
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHandbook();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center text-center p-10">
        <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading handbook...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center text-center p-10">
        <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!handbook) {
    return (
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center text-center p-10">
        <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-yellow-600 mb-4">
          No Handbook Available
        </h1>
        <p className="text-lg text-gray-600">
          No academic handbook is currently available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 flex items-center">
        <FaBookOpen className="mr-3 text-blue-700" /> Academic Handbook
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          {handbook.title}
        </h2>
        {handbook.description && (
          <p className="text-lg text-gray-700 mb-4">{handbook.description}</p>
        )}
        <p className="text-sm text-gray-500 mb-4">
          Last updated:{" "}
          {new Date(
            handbook.updated_at || handbook.created_at
          ).toLocaleDateString()}
        </p>
      </div>

      {/* Button to Open PDF in New Tab */}
      <a
        href={
          handbook.pdf_url.startsWith("http")
            ? handbook.pdf_url
            : `http://localhost:3663${handbook.pdf_url}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
      >
        📄 View Handbook
      </a>
    </div>
  );
};

export const AcademicHandbookDetails = () => {
  const [handbook, setHandbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHandbook = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3663/api/academic/handbooks"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // 🔍 DEBUG: Log the actual API response structure
        // console.log('🔍 API Response:', responseData);
        // console.log('🔍 Response type:', typeof responseData);
        // console.log('🔍 Is array?', Array.isArray(responseData));
        // console.log('🔍 Response keys:', Object.keys(responseData || {}));
        // console.log('🔍 Full response structure:', JSON.stringify(responseData, null, 2));

        // Handle different response formats with more debugging
        let data;
        if (Array.isArray(responseData)) {
          // console.log('✅ Using direct array format');
          data = responseData;
        } else if (
          responseData &&
          responseData.data &&
          Array.isArray(responseData.data)
        ) {
          // console.log('✅ Using responseData.data format');
          data = responseData.data;
        } else if (
          responseData &&
          responseData.handbooks &&
          Array.isArray(responseData.handbooks)
        ) {
          // console.log('✅ Using responseData.handbooks format');
          data = responseData.handbooks;
        } else if (
          responseData &&
          responseData.results &&
          Array.isArray(responseData.results)
        ) {
          // console.log('✅ Using responseData.results format');
          data = responseData.results;
        } else if (
          responseData &&
          responseData.result &&
          Array.isArray(responseData.result)
        ) {
          // console.log('✅ Using responseData.result format (singular)');
          data = responseData.result;
        } else if (
          responseData &&
          responseData.rows &&
          Array.isArray(responseData.rows)
        ) {
          // console.log('✅ Using responseData.rows format');
          data = responseData.rows;
        } else {
          console.log("❌ None of the expected formats matched");
          console.log(
            "❌ Available keys:",
            responseData
              ? Object.keys(responseData)
              : "responseData is null/undefined"
          );
          throw new Error(
            `API response format not recognized. Response keys: ${
              responseData ? Object.keys(responseData).join(", ") : "none"
            }`
          );
        }

        // console.log('📚 Processed data:', data);

        // Filter for honours_minors handbooks and get the latest one
        const honoursMinorsHandbooks = data.filter(
          (item) =>
            item.handbook_type === "honours_minors" &&
            item.title &&
            item.pdf_url &&
            (item.deleted === 0 || item.deleted === "0")
        );

        if (honoursMinorsHandbooks.length > 0) {
          // 🔍 LATEST ENTRY LOGIC: Sort by updated_at (priority) or created_at (fallback)
          // This sorts in DESCENDING order - newest first
          const latestHandbook = honoursMinorsHandbooks.sort((a, b) => {
            const dateA = new Date(a.updated_at || a.created_at);
            const dateB = new Date(b.updated_at || b.created_at);
            return dateB - dateA; // Descending order: newer dates first
          })[0]; // Take the first element (newest)

          // console.log('📊 All honours_minors handbooks:', honoursMinorsHandbooks.map(h => ({
          //   id: h.id,
          //   title: h.title,
          //   updated_at: h.updated_at,
          //   created_at: h.created_at
          // })));
          // console.log('🎯 Selected latest handbook:', {
          //   id: latestHandbook.id,
          //   title: latestHandbook.title,
          //   updated_at: latestHandbook.updated_at,
          //   created_at: latestHandbook.created_at
          // });

          setHandbook(latestHandbook);
        } else {
          setError("No Honours & Minors handbook found");
        }
      } catch (err) {
        console.error("❌ Full error details:", err);
        console.error("❌ Error message:", err.message);
        console.error("❌ Error stack:", err.stack);

        // More specific error messages
        if (err.message.includes("API response is not in expected format")) {
          setError(`API Format Error: ${err.message}`);
        } else if (err.message.includes("Failed to fetch")) {
          setError(
            "Cannot connect to server. Is your API running on port 3663?"
          );
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHandbook();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center text-center p-10">
        <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading handbook...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center text-center p-10">
        <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!handbook) {
    return (
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center text-center p-10">
        <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-yellow-600 mb-4">
          No Handbook Available
        </h1>
        <p className="text-lg text-gray-600">
          No Honours & Minors handbook is currently available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 flex items-center">
        <FaFilePdf className="mr-3 text-blue-700" /> Academic Handbook for
        Honours & Minors
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          {handbook.title}
        </h2>
        {handbook.description && (
          <p className="text-lg text-gray-700 mb-4">{handbook.description}</p>
        )}
        <p className="text-sm text-gray-500 mb-4">
          Last updated:{" "}
          {new Date(
            handbook.updated_at || handbook.created_at
          ).toLocaleDateString()}
        </p>
      </div>

      {/* Button to Open PDF in New Tab */}
      <a
        href={
          handbook.pdf_url.startsWith("http")
            ? handbook.pdf_url
            : `http://localhost:3663${handbook.pdf_url}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
      >
        📄 View Honours & Minors Handbook
      </a>
    </div>
  );
};

export const AcademicCalender = () => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3663/api/academic/calendar"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // 🔍 DEBUG: Log the actual API response structure
        console.log("🔍 Calendar API Response:", responseData);
        console.log("🔍 Response type:", typeof responseData);
        console.log("🔍 Is array?", Array.isArray(responseData));
        console.log("🔍 Response keys:", Object.keys(responseData || {}));

        // Handle different response formats
        let data;
        if (Array.isArray(responseData)) {
          console.log("✅ Using direct array format");
          data = responseData;
        } else if (
          responseData &&
          responseData.result &&
          Array.isArray(responseData.result)
        ) {
          console.log("✅ Using responseData.result format");
          data = responseData.result;
        } else if (
          responseData &&
          responseData.data &&
          Array.isArray(responseData.data)
        ) {
          console.log("✅ Using responseData.data format");
          data = responseData.data;
        } else if (
          responseData &&
          responseData.calendars &&
          Array.isArray(responseData.calendars)
        ) {
          console.log("✅ Using responseData.calendars format");
          data = responseData.calendars;
        } else {
          console.log("❌ None of the expected formats matched");
          console.log(
            "❌ Available keys:",
            responseData
              ? Object.keys(responseData)
              : "responseData is null/undefined"
          );
          throw new Error(
            `API response format not recognized. Response keys: ${
              responseData ? Object.keys(responseData).join(", ") : "none"
            }`
          );
        }

        console.log("📅 Processed calendar data:", data);

        // Filter out deleted entries and sort by date (newest first)
        const activeCalendars = data
          .filter((item) => item.deleted === 0 || item.deleted === "0")
          .sort((a, b) => {
            // Sort by created_at or updated_at, newest first
            const dateA = new Date(
              a.updated_at || a.created_at || a.issue_date
            );
            const dateB = new Date(
              b.updated_at || b.created_at || b.issue_date
            );
            return dateB - dateA;
          });

        setCalendars(activeCalendars);
      } catch (err) {
        console.error("❌ Error fetching calendars:", err);
        console.error("❌ Error message:", err.message);

        // More specific error messages
        if (err.message.includes("Failed to fetch")) {
          setError(
            "Cannot connect to server. Is your API running on port 3663?"
          );
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCalendars();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
        <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading academic calendars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
        <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!calendars || calendars.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
        <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-yellow-600 mb-4">
          No Calendars Available
        </h1>
        <p className="text-lg text-gray-600">
          No academic calendars are currently available.
        </p>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString; // Return original if parsing fails
    }
  };

  // Helper function to create full PDF URL
  const getPdfUrl = (pdfPath) => {
    if (!pdfPath) return "#";
    return pdfPath.startsWith("http")
      ? pdfPath
      : `http://localhost:3663${pdfPath}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center flex items-center justify-center">
          <FaCalendarAlt className="mr-3 text-blue-700" />
          Academic Calendar
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-md">
            <thead className="bg-blue-700 text-white text-left">
              <tr>
                <th className="py-3 px-5">Sr No.</th>
                <th className="py-3 px-5">Year</th>
                <th className="py-3 px-5">Issue Date</th>
                <th className="py-3 px-5 text-center">View / Download</th>
              </tr>
            </thead>
            <tbody>
              {calendars.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-100 transition-all"
                >
                  <td className="py-3 px-5">{index + 1}</td>
                  <td className="py-3 px-5">
                    {item.year || item.title || item.academic_year || "N/A"}
                  </td>
                  <td className="py-3 px-5">
                    {formatDate(
                      item.issue_date || item.date || item.created_at
                    )}
                  </td>
                  <td className="py-3 px-5 text-center">
                    <a
                      href={getPdfUrl(
                        item.pdf_url || item.link || item.file_path
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all inline-flex items-center justify-center"
                    >
                      <FaExternalLinkAlt className="mr-2" /> View PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-6 text-center text-gray-600">
          <p>
            Total Academic Calendars: <strong>{calendars.length}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export const APMS = () => {
  const [apmsData, setApmsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPMSData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3663/api/academic/links"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("🔍 APMS API Response:", responseData);

        // Handle different response formats
        let data;
        if (Array.isArray(responseData)) {
          data = responseData;
        } else if (
          responseData &&
          responseData.result &&
          Array.isArray(responseData.result)
        ) {
          data = responseData.result;
        } else if (
          responseData &&
          responseData.data &&
          Array.isArray(responseData.data)
        ) {
          data = responseData.data;
        } else {
          throw new Error("API response format not recognized");
        }

        // Find APMS link (filter by link_type or title)
        const apmsLink = data.find(
          (item) =>
            item.link_type === "APMS" ||
            item.title?.toLowerCase().includes("apms") ||
            item.url?.includes("apms")
        );

        if (apmsLink) {
          setApmsData(apmsLink);
        } else {
          throw new Error("APMS link not found in API response");
        }
      } catch (err) {
        console.error("❌ Error fetching APMS data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAPMSData();
  }, []);

  const handleRedirect = () => {
    const url = apmsData?.url || "https://apms.fcrit.ac.in/apms/index.php";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
        <div className="text-center bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
          <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4 mx-auto" />
          <p className="text-lg text-gray-600">Loading APMS Portal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
        <div className="text-center bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
          <FaExclamationTriangle className="text-4xl text-red-500 mb-4 mx-auto" />
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-lg text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
      <div className="text-center bg-white shadow-lg rounded-lg p-10 w-full max-w-lg">
        <div className="flex items-center justify-center mb-4">
          <FaDesktop className="text-4xl text-blue-700 mr-3" />
          <h1 className="text-3xl font-bold text-blue-900">
            {apmsData?.title || "APMS Portal"}
          </h1>
        </div>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          {apmsData?.description ||
            "Academic Performance Monitoring System for student performance tracking."}
        </p>

        <div className="mb-6 text-sm text-gray-500">
          <p>
            <strong>Link Type:</strong> {apmsData?.link_type || "APMS"}
          </p>
          {apmsData?.updated_at && (
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(apmsData.updated_at).toLocaleDateString("en-GB")}
            </p>
          )}
        </div>

        <button
          onClick={handleRedirect}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center mx-auto"
        >
          <FaExternalLinkAlt className="mr-2" />
          Open APMS Portal
        </button>
      </div>
    </div>
  );
};

export const LMS = () => {
  const [lmsData, setLmsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLMSData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3663/api/academic/links"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("🔍 LMS API Response:", responseData);

        // Handle different response formats
        let data;
        if (Array.isArray(responseData)) {
          data = responseData;
        } else if (
          responseData &&
          responseData.result &&
          Array.isArray(responseData.result)
        ) {
          data = responseData.result;
        } else if (
          responseData &&
          responseData.data &&
          Array.isArray(responseData.data)
        ) {
          data = responseData.data;
        } else {
          throw new Error("API response format not recognized");
        }

        // Find LMS link (filter by link_type or title)
        const lmsLink = data.find(
          (item) =>
            item.link_type === "LMS" ||
            item.title?.toLowerCase().includes("lms") ||
            item.title?.toLowerCase().includes("learning management") ||
            item.url?.includes("lms")
        );

        if (lmsLink) {
          setLmsData(lmsLink);
        } else {
          throw new Error("LMS link not found in API response");
        }
      } catch (err) {
        console.error("❌ Error fetching LMS data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLMSData();
  }, []);

  const handleRedirect = () => {
    const url = lmsData?.url || "http://lms.fcrit.ac.in/moodle/";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-10">
        <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">
          Loading Learning Management System...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-10">
        <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-10">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          <FaGraduationCap className="text-4xl text-blue-700 mr-3" />
          <h1 className="text-4xl font-bold text-blue-900">
            {lmsData?.title || "Learning Management System"}
          </h1>
        </div>

        <p className="text-lg max-w-2xl text-gray-700 mb-6 leading-relaxed">
          {lmsData?.description ||
            "Access our Learning Management System (LMS) for online courses, assignments, and educational resources."}
        </p>

        {/* <div className="mb-6 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
          <p><strong>System Type:</strong> {lmsData?.link_type || 'LMS'}</p>
          {lmsData?.updated_at && (
            <p><strong>Last Updated:</strong> {new Date(lmsData.updated_at).toLocaleDateString('en-GB')}</p>
          )}
          {lmsData?.created_at && (
            <p><strong>Available Since:</strong> {new Date(lmsData.created_at).toLocaleDateString('en-GB')}</p>
          )}
        </div> */}

        <button
          onClick={handleRedirect}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium flex items-center hover:bg-blue-700 transition-all mx-auto"
        >
          <FaExternalLinkAlt className="mr-2" />
          Visit Learning Management System
        </button>
      </div>
    </div>
  );
};

export const StakeholderFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3663/api/academic/feedback"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Get the result array and filter out deleted items (where deleted is not 0)
      const feedbackArray = data.result || [];
      const nonDeletedFeedback = feedbackArray.filter(
        (item) => item.deleted === "0"
      );
      setFeedbackData(nonDeletedFeedback);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching feedback data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPDF = (pdfUrl, title) => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    } else {
      alert(`PDF not available for: ${title}`);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const getFeedbackTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "syllabus":
        return "bg-blue-100 text-blue-800";
      case "industry":
        return "bg-green-100 text-green-800";
      case "student":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4 mx-auto" />
          <p className="text-gray-600">Loading feedback data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md">
          <FaExclamationTriangle className="text-4xl text-red-500 mb-4 mx-auto" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchFeedbackData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2 flex items-center justify-center">
            <FaFilePdf className="mr-3 text-red-600" />
            Stakeholder Feedback
          </h1>
          <p className="text-lg text-gray-600">
            View and access all stakeholder feedback documents
          </p>
          <div className="mt-2 text-sm text-gray-500">
            Total Feedback: {feedbackData.length}
          </div>
        </div>

        {feedbackData.length === 0 ? (
          <div className="text-center bg-white shadow-lg rounded-lg p-8">
            <FaFilePdf className="text-4xl text-gray-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Feedback Available
            </h3>
            <p className="text-gray-500">
              There are currently no feedback documents to display.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbackData.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {feedback.title || "Untitled Feedback"}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFeedbackTypeColor(
                        feedback.feedback_type
                      )}`}
                    >
                      <FaTags className="mr-1" />
                      {feedback.feedback_type || "General"}
                    </span>
                  </div>
                </div>

                {feedback.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {feedback.description}
                  </p>
                )}
                {/* 
                <div className="space-y-2 mb-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <FaUser className="mr-2 flex-shrink-0" />
                    <span>Created by: User {feedback.created_by}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 flex-shrink-0" />
                    <span>Created: {formatDate(feedback.created_at)}</span>
                  </div>
                  {feedback.updated_at !== feedback.created_at && (
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 flex-shrink-0" />
                      <span>Updated: {formatDate(feedback.updated_at)}</span>
                    </div>
                  )}
                </div> */}

                <button
                  onClick={() =>
                    handleViewPDF(feedback.pdf_url, feedback.title)
                  }
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  disabled={!feedback.pdf_url}
                >
                  <FaFilePdf className="mr-2" />
                  {feedback.pdf_url ? "View PDF" : "PDF Not Available"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// export const Examination = () => {
//   const [examinationData, setExaminationData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchExaminationData();
//   }, []);

//   const fetchExaminationData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:3663/api/academic/examinations');

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // Get the result array and filter out deleted items
//       const examinationArray = data.result || [];
//       console.log('Raw examination data:', examinationArray); // Debug log

//       // Filter out deleted items - handle both string and number values
//       const nonDeletedExaminations = examinationArray.filter(item => {
//         const isDeleted = item.deleted === 0 || item.deleted === '0' || !item.deleted;
//         console.log(`Item ${item.id}: deleted=${item.deleted}, isDeleted=${isDeleted}`); // Debug log
//         return isDeleted;
//       });

//       console.log('Filtered examinations:', nonDeletedExaminations); // Debug log
//       setExaminationData(nonDeletedExaminations);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching examination data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewPDF = (timetableUrl, examType, semester) => {
//     if (timetableUrl && timetableUrl !== 'NULL') {
//       // Handle relative URLs by prepending the server base URL if needed
//       const fullUrl = timetableUrl.startsWith('http')
//         ? timetableUrl
//         : `http://localhost:3663${timetableUrl}`;
//       window.open(fullUrl, '_blank', 'noopener,noreferrer');
//     } else {
//       alert(`Timetable not available for: ${examType} - Semester ${semester}`);
//     }
//   };

//   const handleViewResult = (resultUrl, examType, semester) => {
//     if (resultUrl && resultUrl !== 'NULL') {
//       const fullUrl = resultUrl.startsWith('http')
//         ? resultUrl
//         : `http://localhost:3663${resultUrl}`;
//       window.open(fullUrl, '_blank', 'noopener,noreferrer');
//     } else {
//       alert(`Result not available for: ${examType} - Semester ${semester}`);
//     }
//   };

//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   const getExamTypeColor = (examType) => {
//     switch (examType?.toUpperCase()) {
//       case 'MSE':
//         return 'bg-blue-100 text-blue-800';
//       case 'ESE':
//         return 'bg-green-100 text-green-800';
//       case 'FINAL':
//         return 'bg-red-100 text-red-800';
//       case 'MIDTERM':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getSemesterColor = (semester) => {
//     const colors = [
//       'bg-purple-100 text-purple-800',
//       'bg-pink-100 text-pink-800',
//       'bg-indigo-100 text-indigo-800',
//       'bg-teal-100 text-teal-800',
//       'bg-orange-100 text-orange-800',
//       'bg-cyan-100 text-cyan-800',
//       'bg-lime-100 text-lime-800',
//       'bg-rose-100 text-rose-800'
//     ];
//     return colors[(semester - 1) % colors.length] || 'bg-gray-100 text-gray-800';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4 mx-auto" />
//           <p className="text-gray-600">Loading examination data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md">
//           <FaExclamationTriangle className="text-4xl text-red-500 mb-4 mx-auto" />
//           <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchExaminationData}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-blue-900 mb-2 flex items-center justify-center">
//             <FaGraduationCap className="mr-3 text-blue-600" />
//             Examinations
//           </h1>
//           <p className="text-lg text-gray-600">
//             View examination timetables and results
//           </p>
//           <div className="mt-2 text-sm text-gray-500">
//             Total Examinations: {examinationData.length}
//           </div>
//         </div>

//         {examinationData.length === 0 ? (
//           <div className="text-center bg-white shadow-lg rounded-lg p-8">
//             <FaGraduationCap className="text-4xl text-gray-400 mb-4 mx-auto" />
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">No Examinations Available</h3>
//             <p className="text-gray-500">There are currently no examination records to display.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {examinationData.map((exam) => (
//               <div
//                 key={exam.id}
//                 className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     <div className="flex flex-wrap gap-2 mb-3">
//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getExamTypeColor(
//                           exam.exam_type
//                         )}`}
//                       >
//                         <FaBookOpen className="mr-1" />
//                         {exam.exam_type || 'General'}
//                       </span>
//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSemesterColor(
//                           exam.semester
//                         )}`}
//                       >
//                         Semester {exam.semester}
//                       </span>
//                     </div>
//                     <h3 className="text-lg font-bold text-gray-800 mb-2">
//                       {exam.exam_type} - Semester {exam.semester}
//                     </h3>
//                     <p className="text-sm text-gray-600 mb-2">
//                       <strong>Year:</strong> {exam.year}
//                     </p>
//                   </div>
//                 </div>

//                 {exam.notification && exam.notification !== 'NULL' && (
//                   <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                     <div className="flex items-start">
//                       <FaBell className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
//                       <p className="text-sm text-yellow-800">{exam.notification}</p>
//                     </div>
//                   </div>
//                 )}

//                 {/* <div className="space-y-2 mb-4 text-xs text-gray-500">
//                   <div className="flex items-center">
//                     <FaUser className="mr-2 flex-shrink-0" />
//                     <span>Created by: User {exam.created_by}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <FaCalendarAlt className="mr-2 flex-shrink-0" />
//                     <span>Created: {formatDate(exam.created_at)}</span>
//                   </div>
//                   {exam.updated_at !== exam.created_at && (
//                     <div className="flex items-center">
//                       <FaCalendarAlt className="mr-2 flex-shrink-0" />
//                       <span>Updated: {formatDate(exam.updated_at)}</span>
//                     </div>
//                   )}
//                 </div> */}

//                 <div className="space-y-2">
//                   <button
//                     onClick={() => handleViewPDF(exam.timetable_url, exam.exam_type, exam.semester)}
//                     className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
//                       exam.timetable_url && exam.timetable_url !== 'NULL'
//                         ? 'bg-blue-600 text-white hover:bg-blue-700'
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                     disabled={!exam.timetable_url || exam.timetable_url === 'NULL'}
//                   >
//                     <FaFilePdf className="mr-2" />
//                     {exam.timetable_url && exam.timetable_url !== 'NULL' ? 'View Timetable' : 'Timetable Not Available'}
//                   </button>

//                   <button
//                     onClick={() => handleViewResult(exam.result_url, exam.exam_type, exam.semester)}
//                     className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
//                       exam.result_url && exam.result_url !== 'NULL'
//                         ? 'bg-green-600 text-white hover:bg-green-700'
//                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                     disabled={!exam.result_url || exam.result_url === 'NULL'}
//                   >
//                     <FaGraduationCap className="mr-2" />
//                     {exam.result_url && exam.result_url !== 'NULL' ? 'View Results' : 'Results Not Available'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
