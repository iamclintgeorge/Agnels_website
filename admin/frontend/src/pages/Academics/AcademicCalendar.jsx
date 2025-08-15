import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaFilePdf,
  FaCalendarAlt,
} from "react-icons/fa";

const AcademicCalendar = () => {
  const [calendars, setCalendars] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    year: "",
    issueDate: "",
    description: "",
    pdfFile: null,
    pdfUrl: "",
  });

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      const response = await fetch(
        "http://localhost:3663/api/academic/calendar"
      );
      const data = await response.json();
      setCalendars(data.result);
    } catch (error) {
      console.error("Error fetching calendars:", error);
    }
  };

  const handleAdd = () => {
    setFormData({
      year: "",
      issueDate: new Date().toISOString().split("T")[0],
      description: "",
      pdfFile: null,
      pdfUrl: "",
    });
    setIsAdding(true);
  };

  const handleEdit = (calendar) => {
    setFormData({
      ...calendar,
      issueDate: calendar.issueDate ? calendar.issueDate.split("T")[0] : "",
    });
    setEditingId(calendar.id);
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("year", formData.year);
      formDataToSend.append("issue_date", formData.issueDate);
      formDataToSend.append("created_by", 1);
      if (formData.pdfFile) {
        formDataToSend.append("pdf", formData.pdfFile); // ✅ matches multer.single("pdf")
      }
      formDataToSend.append("description", formData.description);
      const url = editingId
        ? `http://localhost:3663/api/academic/calendar/${editingId}`
        : "http://localhost:3663/api/academic/calendar-create";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        fetchCalendars();
        handleCancel();
      }
    } catch (error) {
      console.error("Error saving calendar:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this calendar?")) {
      try {
        const response = await fetch(
          `http://localhost:3663/api/academic/delete-calendar/${id}`,
          {
            method: "PUT",
          }
        );
        if (response.ok) {
          fetchCalendars();
        }
      } catch (error) {
        console.error("Error deleting calendar:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      year: "",
      issueDate: "",
      description: "",
      pdfFile: null,
      pdfUrl: "",
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pdfFile: e.target.files[0] });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Academic Calendar Management
        </h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> Add Calendar
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaCalendarAlt className="mr-2" />
            {editingId ? "Edit Calendar" : "Add New Calendar"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                placeholder="e.g., FH-2025 (Autonomy Curriculum) FY and SY"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Date
              </label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) =>
                  setFormData({ ...formData, issueDate: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PDF File</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File
              </label>
              {editingId ? (
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500">
                  PDF cannot be changed during edit. Current PDF will be
                  preserved.
                </div>
              ) : (
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="2"
                placeholder="Optional description..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
            >
              <FaSave className="mr-2" /> Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-700"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PDF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {calendars.map((calendar) => (
                <tr key={calendar.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {calendar.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {calendar.issue_date && formatDate(calendar.issue_date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {calendar.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {calendar.pdf_url && (
                      <a
                        href={`http://localhost:3663${calendar.pdf_url.trim()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <FaFilePdf className="mr-1" /> View PDF
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(calendar)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(calendar.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {calendars.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No academic calendars found. Click "Add Calendar" to create
                    one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
