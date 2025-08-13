import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    photo: null,
    name: "",
    qualification: "",
    designation: "",
    email: "",
    dateOfJoining: "",
    bioData: null,
    publications: null,
    onlineProfiles: [],
    specializations: [],
    subjects: [],
    papers: [],
    researches: [],
  });
  const [activeTab, setActiveTab] = useState("specializations");

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/profile/${id}`
      );
      console.log("Fetched profile:", response.data);
      setProfile(response.data);
    } catch (error) {
      console.error("Fetch profile error:", error);
    }
  };

  // Get image via proxy to avoid CORS
  const getImageDataURL = async (url) => {
    if (!url) return null;

    try {
      // Use your proxy to get the image with proper CORS headers
      const proxyUrl = `http://localhost:3663/api/image-proxy?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn("Image fetch via proxy failed:", error);
      return null;
    }
  };

 // Enhanced HTML tag removal function
const stripAllHTML = (html) => {
  if (!html) return '';
  
  // Convert to string
  const str = String(html);
  
  // Remove script and style elements and their content
  const cleanStr = str
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    // Remove all HTML tags
    .replace(/<[^>]*>/g, '')
    // Decode HTML entities
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#39;/gi, "'")
    // Clean up whitespace
    .replace(/\s+/g, ' ')
    .trim();
    
  return cleanStr;
};

// Updated specialization extraction function
const extractSpecializationItems = (specEntry) => {
  if (!specEntry) return [];
  
  // First, completely strip all HTML tags
  const cleanText = stripAllHTML(specEntry);
  
  // If we have clean text, split it into items
  if (cleanText) {
    // Split by common separators and bullet points
    const items = cleanText
      .split(/[•\n\r,;]|(?:\s*-\s*)/)
      .map(item => item.trim())
      .filter(item => item.length > 0 && item.length < 200)
      .filter(item => !item.match(/^\s*$/)); // Remove empty or whitespace-only items
    
    // Remove duplicates
    return Array.from(new Set(items));
  }
  
  return [];
};


const handleDownload = async () => {
  try {
    // 1) Fetch profile fresh
    const { data: fetchedProfile } = await axios.get(
      `http://localhost:3663/api/profile/${id}`
    );

    // 2) Get image via proxy
    const sourcePhoto = fetchedProfile.photo
      ? (fetchedProfile.photo.startsWith("http") 
          ? fetchedProfile.photo 
          : fetchedProfile.photo.startsWith("/") 
            ? `https://fcrit.ac.in${fetchedProfile.photo}`
            : fetchedProfile.photo)
      : null;

    const imageDataURL = await getImageDataURL(sourcePhoto);

    // 3) Create PDF
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 50; // Increased top margin

    // 4) Header image with more spacing
    if (imageDataURL) {
      const imgSize = 120; // Slightly larger image
      const imgX = (pageWidth - imgSize) / 2;
      // White circular background
      doc.setFillColor(255, 255, 255);
      doc.circle(pageWidth / 2, y + imgSize / 2, imgSize / 2 + 8, "F");
      // Add subtle shadow effect
      doc.setFillColor(240, 240, 240);
      doc.circle(pageWidth / 2 + 2, y + imgSize / 2 + 2, imgSize / 2 + 8, "F");
      doc.setFillColor(255, 255, 255);
      doc.circle(pageWidth / 2, y + imgSize / 2, imgSize / 2 + 6, "F");
      doc.addImage(imageDataURL, "JPEG", imgX, y, imgSize, imgSize);
      y += imgSize + 30; // Much more space after image
    }

    // 5) Name with better spacing
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22); // Slightly larger font
    doc.text(fetchedProfile.name || "Faculty Profile", pageWidth / 2, y, { align: "center" });
    y += 15; // Space after name

    // Designation + Qualification with better spacing
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80); // Slightly gray text for subtitle
    doc.text(fetchedProfile.designation || "No Designation", pageWidth / 2, y, { align: "center" });
    y += 20;
    doc.setFontSize(12);
    doc.setTextColor(120, 120, 120); // Lighter gray for qualification
    doc.text(fetchedProfile.qualification || "No Qualification", pageWidth / 2, y, { align: "center" });
    y += 35; // More space before divider

    // Professional divider
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.line(60, y, pageWidth - 60, y);
    y += 35; // Space after divider

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Helper functions with better spacing
    const ensureRoom = (h = 60) => {
      if (y > pageHeight - h) {
        doc.addPage();
        y = 50;
      }
    };

    const sectionTitle = (title) => {
      ensureRoom(80);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(12, 35, 64); // Your brand color
      doc.text(title, 60, y);
      y += 8;
      // Underline for section titles
      doc.setDrawColor(12, 35, 64);
      doc.setLineWidth(2);
      doc.line(60, y, 200, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      y += 20; // More space after section title
    };

    const addKeyVal = (label, val) => {
      ensureRoom(40);
      const text = `${label}: ${val || "N/A"}`;
      const maxWidth = pageWidth - 120;
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, 80, y); // Increased left margin
      y += lines.length * 18 + 5; // More line spacing
    };

    const addLink = (label, url) => {
      if (!url) return;
      ensureRoom(30);
      doc.setTextColor(0, 102, 204);
      doc.setFont("helvetica", "normal");
      // Create actual clickable link
      doc.textWithLink(`• ${label}`, 80, y, { url: url });
      doc.setTextColor(0, 0, 0);
      y += 20;
    };

    // 6) Personal Information Section
    sectionTitle("Personal Information");
    addKeyVal("Email", fetchedProfile.email);
    addKeyVal("Date of Joining", 
      fetchedProfile.dateOfJoining ? fetchedProfile.dateOfJoining.split("T")[0] : "N/A"
    );
    y += 15; // Space after section

    // 7) Academic Links Section
    if (fetchedProfile.bioData || fetchedProfile.publications) {
      sectionTitle("Academic Resources");
      
      if (fetchedProfile.bioData) {
        ensureRoom(30);
        doc.setTextColor(0, 102, 204);
        doc.setFont("helvetica", "normal");
        doc.textWithLink("• View Bio-Data", 80, y, { url: fetchedProfile.bioData });
        doc.setTextColor(0, 0, 0);
        y += 20;
      }
      
      if (fetchedProfile.publications) {
        ensureRoom(30);
        doc.setTextColor(0, 102, 204);
        doc.setFont("helvetica", "normal");
        doc.textWithLink("• View Publications", 80, y, { url: fetchedProfile.publications });
        doc.setTextColor(0, 0, 0);
        y += 20;
      }
      
      y += 15;
    }

    // 8) Online Profiles Section
    if (fetchedProfile.onlineProfiles?.length) {
      sectionTitle("Online Profiles");
      fetchedProfile.onlineProfiles.forEach((p) => {
        if (!p.onlineProfile) return;
        ensureRoom(30);
        doc.setTextColor(0, 102, 204);
        doc.setFont("helvetica", "normal");
        
        // Handle long URLs by splitting them but keeping the link functional
        const linkText = `• ${p.onlineProfile}`;
        const linkLines = doc.splitTextToSize(linkText, pageWidth - 120);
        
        // Make the first line clickable (full URL)
        doc.textWithLink(linkLines[0], 80, y, { url: p.onlineProfile });
        
        // If URL is too long and wraps, show remaining lines as regular text
        if (linkLines.length > 1) {
          doc.setTextColor(0, 0, 0);
          linkLines.slice(1).forEach((line) => {
            y += 16;
            doc.text(line, 85, y);
          });
        }
        doc.setTextColor(0, 0, 0);
        y += 20;
      });
      y += 15;
    }

    // 9) Areas of Specialization
    if (fetchedProfile.specializations?.length) {
      sectionTitle("Areas of Specialization");
      const maxWidth = pageWidth - 120;
      fetchedProfile.specializations.forEach((spec) => {
        const items = extractSpecializationItems(spec.areasOfSpecialization);
        if (!items.length) return;
        items.forEach((item) => {
          ensureRoom(30);
          const lines = doc.splitTextToSize(`• ${item}`, maxWidth);
          doc.text(lines, 80, y);
          y += lines.length * 18 + 5;
        });
      });
      y += 20; // More space before tables
    }

    // 10) Subjects table with better styling
    if (fetchedProfile.subjects?.length) {
      ensureRoom(100);
      
      // Add section title for table
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(12, 35, 64);
      doc.text("Subjects Taught", 60, y);
      y += 8;
      doc.setDrawColor(12, 35, 64);
      doc.setLineWidth(2);
      doc.line(60, y, 200, y);
      y += 15;

      autoTable(doc, {
        startY: y,
        headStyles: { 
          fillColor: [12, 35, 64],
          textColor: [255, 255, 255],
          fontSize: 11,
          fontStyle: 'bold',
          halign: 'center'
        },
        styles: { 
          fontSize: 10, 
          cellPadding: 8,
          halign: 'center'
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        },
        head: [["Subject", "Type", "Semester"]],
        body: fetchedProfile.subjects.map((s) => [
          s.subjectTaught || "N/A",
          s.type || "N/A",
          s.semester || "N/A",
        ]),
        margin: { left: 60, right: 60 },
      });
      y = doc.lastAutoTable.finalY + 30; // More space after table
    }

    // 11) Papers table with better styling
    if (fetchedProfile.papers?.length) {
      ensureRoom(100);
      
      // Add section title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(12, 35, 64);
      doc.text("Papers Presented", 60, y);
      y += 8;
      doc.setDrawColor(12, 35, 64);
      doc.setLineWidth(2);
      doc.line(60, y, 220, y);
      y += 15;

      autoTable(doc, {
        startY: y,
        headStyles: { 
          fillColor: [12, 35, 64],
          textColor: [255, 255, 255],
          fontSize: 11,
          fontStyle: 'bold'
        },
        styles: { 
          fontSize: 9, 
          cellPadding: 8, 
          overflow: "linebreak",
          valign: 'top'
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        },
        columnStyles: { 
          0: { cellWidth: 140 },
          1: { cellWidth: 200 },
          2: { cellWidth: 80, halign: 'center' }
        },
        head: [["Title", "Description", "Link"]],
        body: fetchedProfile.papers.map((p) => [
          p.title || "N/A",
          p.papersPresented || p.description || "N/A",
          p.link ? "Available" : "N/A",
        ]),
        margin: { left: 60, right: 60 },
      });
      y = doc.lastAutoTable.finalY + 30;
    }

    // 12) Research projects table with better styling
    if (fetchedProfile.researches?.length) {
      ensureRoom(100);
      
      // Add section title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(12, 35, 64);
      doc.text("Research Projects", 60, y);
      y += 8;
      doc.setDrawColor(12, 35, 64);
      doc.setLineWidth(2);
      doc.line(60, y, 240, y);
      y += 15;

      autoTable(doc, {
        startY: y,
        headStyles: { 
          fillColor: [12, 35, 64],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: { 
          fontSize: 8, 
          cellPadding: 6,
          valign: 'top'
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        },
        columnStyles: {
          0: { cellWidth: 120 },
          1: { cellWidth: 80 },
          2: { cellWidth: 100 },
          3: { cellWidth: 70, halign: 'center' },
          4: { cellWidth: 70, halign: 'center' }
        },
        head: [["Title", "Grant Type", "Funding Organization", "Amount", "Duration"]],
        body: fetchedProfile.researches.map((r) => [
          r.title || "N/A",
          r.grant_type || "N/A",
          r.funding_organization || "N/A",
          r.amount || "N/A",
          r.duration || "N/A",
        ]),
        margin: { left: 60, right: 60 },
      });
    }

    // Save with clean filename
    const safeName = (fetchedProfile.name || "faculty_profile").replace(/[\\/:*?"<>|]/g, "");
    doc.save(`${safeName}_Profile.pdf`);
  } catch (err) {
    console.error("Error generating PDF:", err);
    alert("Failed to generate the PDF. Please try again.");
  }
};

  const tabs = [
    { id: "specializations", label: "Areas of Specialization" },
    { id: "subjects", label: "Subjects Taught" },
    { id: "papers", label: "Papers Presented" },
    { id: "researches", label: "Research Projects" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto border-2 border-gray-300 rounded-xl shadow-sm overflow-hidden">
        {/* Profile Header Section */}
        <div className="relative p-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            {/* Left: Faculty Image */}
            <div className="flex-shrink-0">
              <img
                src={
                  profile.photo
                    ? (profile.photo.startsWith("http") 
                        ? profile.photo 
                        : profile.photo.startsWith("/") 
                          ? `https://fcrit.ac.in${profile.photo}`
                          : profile.photo)
                    : "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Right: Info & Download Button */}
            <div className="flex-1 relative">
              {/* Download Button */}
              <button
                type="button"
                onClick={handleDownload}
                className="absolute top-0 right-0 inline-flex items-center gap-2 rounded-md border border-[#0c2340] bg-[#0c2340] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0a1d34] hover:border-[#0a1d34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0c2340]"
                aria-label="Download profile"
                title="Download profile"
              >
                {/* Download Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M12 15V3" />
                </svg>
              </button>

              {/* Profile Info */}
              <div className="pr-28">
                <h2 className="text-3xl font-semibold text-gray-900">
                  {profile.name || "Unknown Faculty"}
                </h2>
                <p className="text-lg text-gray-600">
                  {profile.designation || "No Designation"}
                </p>
                <p className="text-md text-gray-500">
                  {profile.qualification || "No Qualification"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of your existing JSX stays exactly the same... */}
        {/* Personal Information, Academic Details, Tabs sections */}
        {/* (keeping the rest unchanged for brevity) */}
        
        {/* Personal Information */}
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900 text-sm">
                {profile.email || "No Email Provided"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Date of Joining
              </p>
              <p className="text-gray-900 text-sm">
                {profile.dateOfJoining
                  ? profile.dateOfJoining.split("T")[0]
                  : "Not Specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="p-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Academic Details
          </h3>
          <div className="space-y-6">
            {/* Bio-Data */}
            <div>
              <p className="text-sm font-medium text-gray-500">Bio-Data</p>
              <p className="text-sm">
                {profile.bioData ? (
                  <a
                    href={`${profile.bioData}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    View Bio-Data
                  </a>
                ) : (
                  <span className="text-gray-500">No Bio-Data available</span>
                )}
              </p>
            </div>

            {/* Publications */}
            <div>
              <p className="text-sm font-medium text-gray-500">Publications</p>
              <p className="text-sm">
                {profile.publications ? (
                  <a
                    href={`${profile.publications}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    View Publications
                  </a>
                ) : (
                  <span className="text-gray-500">
                    No Publications available
                  </span>
                )}
              </p>
            </div>

            {/* Online Profiles */}
            <div>
              <p className="text-sm font-medium text-gray-500">
                Online Profiles
              </p>
              {profile.onlineProfiles.length > 0 ? (
                profile.onlineProfiles.map((profile) => (
                  <a
                    key={profile.id}
                    href={profile.onlineProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm block transition-colors duration-200"
                  >
                    {profile.onlineProfile}
                  </a>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No profiles available</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs for Specializations, Subjects, Papers, Research */}
        <div className="p-8 border-t border-gray-200">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-gray-50"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "specializations" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Specializations
                </h3>

                {profile.specializations.length > 0 ? (
                  <div
                    className="overflow-x-auto"
                    dangerouslySetInnerHTML={{
                      __html: `
    ${profile.specializations
      .map((spec) => `${spec.areasOfSpecialization}`)
      .join("")}
  `,
                    }}
                  ></div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No specializations listed
                  </p>
                )}
              </div>
            )}

            {activeTab === "subjects" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Subjects Taught
                </h3>
                {profile.subjects.length > 0 ? (
                  <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Subject
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Type
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Semester
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.subjects.map((subject) => (
                        <tr
                          key={subject.id}
                          className="border-t border-gray-200"
                        >
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {subject.subjectTaught}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {subject.type}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {subject.semester}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-sm">No subjects listed</p>
                )}
              </div>
            )}

            {activeTab === "papers" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Papers Presented
                </h3>
                {profile.papers.length > 0 ? (
                  <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Title
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Description
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Link
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.papers.map((paper) => (
                        <tr key={paper.id} className="border-t border-gray-200">
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {paper.title}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {paper.papersPresented ||
                              paper.description ||
                              "No description"}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {paper.link ? (
                              <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                              >
                                View Paper
                              </a>
                            ) : (
                              <span className="text-gray-500">No link</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-sm">No papers presented</p>
                )}
              </div>
            )}

            {activeTab === "researches" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Research Projects
                </h3>
                {profile.researches.length > 0 ? (
                  <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Title
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Grant Type
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Funding Organization
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Amount
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.researches.map((research) => (
                        <tr
                          key={research.id}
                          className="border-t border-gray-200"
                        >
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {research.title}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {research.grant_type}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {research.funding_organization}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {research.amount}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {research.duration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No research projects listed
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;