import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Use your axios instance
import { toast } from "react-toastify";

const tabs = [
  { key: "sc_home", label: "SC_Home" },
  { key: "council", label: "Student Council" },
  { key: "clubs", label: "Student Clubs" },
  { key: "reports", label: "Reports" },
  { key: "achievements", label: "Achievements" },
  { key: "infrastructure", label: "Infrastructure" },
  { key: "antiRagging", label: "Anti Ragging" },
  { key: "survey", label: "Student Satisfaction Survey" },
];

const defaultStates = {
  sc_home:[],
  council: [],
  clubs: [],
  reports: [],
  achievements: [],
  infrastructure: [],
  antiRagging: [],
  survey: [],
};

const StudentsCorner = () => {
  const [activeTab, setActiveTab] = useState("sc_home");
  const [data, setData] = useState(defaultStates);
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editObj, setEditObj] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch data for the active tab
  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/students-corner/${activeTab}`)
      .then((res) => {
        setData((prev) => ({ ...prev, [activeTab]: res.data || [] }));
      })
      .catch(() => setData((prev) => ({ ...prev, [activeTab]: [] })))
      .finally(() => setLoading(false));
  }, [activeTab]);

  // Open modal for add/edit
  const handleEdit = (idx = null) => {
    setEditIdx(idx);
    setEditObj(
      idx !== null
        ? { ...data[activeTab][idx] }
        : getEmptyObjForTab(activeTab)
    );
    setModalOpen(true);
  };

  // Save (add or update)
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let updated;
      if (editIdx !== null) {
        // Update
        updated = [...data[activeTab]];
        updated[editIdx] = editObj;
      } else {
        // Add
        updated = [...data[activeTab], editObj];
      }
      await api.post(`/api/students-corner/${activeTab}`, updated);
      setData((prev) => ({ ...prev, [activeTab]: updated }));
      toast.success("Saved!");
      setModalOpen(false);
    } catch {
      toast.error("Error saving data");
    }
    setLoading(false);
  };

  // Delete
  const handleDelete = async (idx) => {
    if (!window.confirm("Delete this record?")) return;
    setLoading(true);
    try {
      const updated = data[activeTab].filter((_, i) => i !== idx);
      await api.post(`/api/students-corner/${activeTab}`, updated);
      setData((prev) => ({ ...prev, [activeTab]: updated }));
      toast.success("Deleted!");
    } catch {
      toast.error("Error deleting");
    }
    setLoading(false);
  };

  // Render table/form for each tab
  const renderTabContent = () => {
    const rows = data[activeTab] || [];
    switch (activeTab) {
      case "council":
        return (
          <SectionTable
            title="Student Council"
            rows={rows}
            columns={[
              { key: "name", label: "Name" },
              { key: "post", label: "Post" },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "clubs":
        return (
          <SectionTable
            title="Student Clubs"
            rows={rows}
            columns={[
              { key: "name", label: "Club Name" },
              { key: "description", label: "Description" },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "reports":
        return (
          <SectionTable
            title="Reports"
            rows={rows}
            columns={[
              { key: "event", label: "Event" },
              { key: "year", label: "Year" },
              { key: "url", label: "Report Link" },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "achievements":
        return (
          <SectionTable
            title="Achievements"
            rows={rows}
            columns={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description" },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "infrastructure":
        return (
          <SectionTable
            title="Infrastructure"
            rows={rows}
            columns={[
              { key: "name", label: "Name" },
              { key: "details", label: "Details" },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "antiRagging":
        return (
          <SectionTable
            title="Anti Ragging"
            rows={rows}
            columns={[
              { key: "title", label: "Title" },
              { key: "link", label: "Link" },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case "survey":
        return (
          <SectionTable
            title="Student Satisfaction Survey"
            rows={rows}
            columns={[
              { key: "year", label: "Year" },
              { key: "link", label: "Survey Link" },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Students Corner Management</h1>
      {/* Tabs */}
      <div className="mb-6 border-b">
        <nav className="flex -mb-px space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize
                ${activeTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {loading ? <div>Loading...</div> : renderTabContent()}
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => handleEdit(null)}
        >
          Add New
        </button>
      </div>
      {/* Modal for Add/Edit */}
      {modalOpen && (
        <ModalForm
          columns={getColumnsForTab(activeTab)}
          editObj={editObj}
          setEditObj={setEditObj}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

// Table component for each section
function SectionTable({ title, rows, columns, onEdit, onDelete }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                    {row[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(idx)}
                    className="mr-3 font-medium text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(idx)}
                    className="font-medium text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Modal form for add/edit
function ModalForm({ columns, editObj, setEditObj, onClose, onSave }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="mb-4 text-xl font-bold">Edit Details</h2>
        <form onSubmit={onSave} className="space-y-4">
          {columns.map((col) => (
            <div key={col.key}>
              <label className="block mb-2 font-medium">{col.label}</label>
              <input
                type={col.type || "text"}
                value={editObj[col.key] || ""}
                onChange={(e) =>
                  setEditObj((prev) => ({ ...prev, [col.key]: e.target.value }))
                }
                className="p-2 w-full rounded border"
                required
              />
            </div>
          ))}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helpers
function getEmptyObjForTab(tab) {
  switch (tab) {
    case "council":
      return { name: "", post: "" };
    case "clubs":
      return { name: "", description: "" };
    case "reports":
      return { event: "", year: "", url: "" };
    case "achievements":
      return { title: "", description: "" };
    case "infrastructure":
      return { name: "", details: "" };
    case "antiRagging":
      return { title: "", link: "" };
    case "survey":
      return { year: "", link: "" };
    default:
      return {};
  }
}
function getColumnsForTab(tab) {
  switch (tab) {
    case "council":
      return [
        { key: "name", label: "Name" },
        { key: "post", label: "Post" },
      ];
    case "clubs":
      return [
        { key: "name", label: "Club Name" },
        { key: "description", label: "Description" },
      ];
    case "reports":
      return [
        { key: "event", label: "Event" },
        { key: "year", label: "Year" },
        { key: "url", label: "Report Link", type: "url" },
      ];
    case "achievements":
      return [
        { key: "title", label: "Title" },
        { key: "description", label: "Description" },
      ];
    case "infrastructure":
      return [
        { key: "name", label: "Name" },
        { key: "details", label: "Details" },
      ];
    case "antiRagging":
      return [
        { key: "title", label: "Title" },
        { key: "link", label: "Link", type: "url" },
      ];
    case "survey":
      return [
        { key: "year", label: "Year" },
        { key: "link", label: "Survey Link", type: "url" },
      ];
    default:
      return [];
  }
}

export default StudentsCorner;