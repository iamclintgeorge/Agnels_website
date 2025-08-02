// src/pages/StudentsCorner.jsx
//------------------------------------------------------------
import React, { useState, useEffect } from "react";
import api from "../../services/api"; // your configured axios instance
import { toast } from "react-toastify";

/* ---------- Tab definitions ---------- */
const tabs = [
  { key: "Home", label: "Home" }, // Code‑of‑Conduct docs
  { key: "council", label: "Student Council" }, // Council members
  { key: "reports", label: "Reports" }, // Council reports (FACES / ETAMAX)
  { key: "clubs", label: "Student Clubs" },
  { key: "infrastructure", label: "Infrastructure" },
  { key: "antiRagging", label: "Anti Ragging" }, // Notices only here
  { key: "survey", label: "Student Satisfaction Survey" },
];

/* ---------- Routes / field config per tab ---------- */
const tabConfig = {
  Home: {
    fetch: "/codeofconduct",
    create: "/codeofconduct-create",
    edit: (id) => `/codeofconduct/${id}`,
    del: (id) => `/delete-codeofconduct/${id}`,
    fileKey: "file", // PDF upload
  },
  council: {
    fetch: "/council-members",
    create: "/council-member-create",
    edit: (id) => `/council-member/${id}`,
    del: (id) => `/delete-council-member/${id}`,
  },
  reports: {
    fetch: "/council-reports",
    create: "/council-report-create",
    edit: (id) => `/council-report/${id}`,
    del: (id) => `/delete-council-report/${id}`,
    fileKey: "file", // PDF upload
  },
  clubs: {
    fetch: "/clubs",
    create: "/club-create",
    edit: (id) => `/club/${id}`,
    del: (id) => `/delete-club/${id}`,
    fileKey: "logo", // image upload
  },
  infrastructure: {
    fetch: "/facilities",
    create: "/facility-create",
    edit: (id) => `/facility/${id}`,
    del: (id) => `/delete-facility/${id}`,
    fileKey: "image", // image upload
  },
  antiRagging: {
    fetch: "/anti-ragging-notices",
    create: "/anti-ragging-notice-create",
    del: (id) => null, // no update/delete for notices
    fileKey: "file",
  },
  survey: {
    fetch: "/surveys",
    create: "/survey-create",
    edit: (id) => `/survey/${id}`,
    del: (id) => `/delete-survey/${id}`,
  },
};

/* ---------- Empty‑row factories ---------- */
const emptyRow = {
  Home: { title: "", file: null },
  council: { full_name: "", position: "" },
  reports: { event_name: "", council_year: "", file: null },
  clubs: { name: "", description: "", logo: null },
  infrastructure: { name: "", short_desc: "", long_desc: "", image: null },
  antiRagging: { title: "", file: null },
  survey: { title: "", survey_year: "", form_url: "", results_file: "" },
};

/* ============================================================
   MAIN COMPONENT
============================================================ */
const StudentsCorner = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  /* --- fetch on tab change --- */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/api/students-corner${tabConfig[activeTab].fetch}`
        );
        setRows(data.result || data || []); // controllers return {result:[…]}
      } catch (err) {
        toast.error("Fetch failed");
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeTab]);

  /* ---------- handlers ---------- */
  const handleAdd = () => openModal(null);
  const handleEdit = (idx) => openModal(idx);

  const handleDelete = async (id) => {
    const delURL = tabConfig[activeTab].del?.(id);
    if (!delURL) return toast.warn("Delete not supported for this tab");
    if (!window.confirm("Delete this record?")) return;
    setLoading(true);
    try {
      await api.put(`/api/students-corner${delURL}`);
      setRows((r) => r.filter((item) => item.id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
    setLoading(false);
  };

  /* ---------- modal helpers ---------- */
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState({});
  const [editId, setEditId] = useState(null);

  const openModal = (idx) => {
    if (idx === null) {
      setEditId(null);
      setDraft({ ...emptyRow[activeTab] });
    } else {
      setEditId(rows[idx].id);
      setDraft({ ...rows[idx] });
    }
    setModalOpen(true);
  };

  const saveDraft = async () => {
    setLoading(true);
    const cfg = tabConfig[activeTab];
    try {
      let payload, url, method;
      if (cfg.fileKey) {
        const fd = new FormData();
        Object.entries(draft).forEach(([k, v]) => fd.append(k, v));
        payload = fd;
        // axios will set correct headers
      } else {
        payload = draft;
      }
      if (editId) {
        // update
        url = `/api/students-corner${cfg.edit(editId)}`;
        method = "put";
      } else {
        // create
        url = `/api/students-corner${cfg.create}`;
        method = "post";
      }
      await api[method](url, payload);
      toast.success("Saved");
      // refresh list
      const { data } = await api.get(`/api/students-corner${cfg.fetch}`);
      setRows(data.result || data || []);
      setModalOpen(false);
    } catch (err) {
      toast.error("Save failed");
    }
    setLoading(false);
  };

  /* ---------- render ---------- */
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Students Corner Management</h1>

      {/* tab nav */}
      <div className="mb-6 border-b">
        <nav className="flex -mb-px space-x-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === t.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {/* table + add */}
      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          "Loading…"
        ) : (
          <SectionTable
            tab={activeTab}
            rows={rows}
            onEdit={(idx) => handleEdit(idx)}
            onDelete={(idx) => handleDelete(rows[idx].id)}
          />
        )}
        {!!tabConfig[activeTab].create && (
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleAdd}
          >
            Add New
          </button>
        )}
      </div>

      {/* modal */}
      {modalOpen && (
        <ModalForm
          tab={activeTab}
          draft={draft}
          setDraft={setDraft}
          fileKey={tabConfig[activeTab].fileKey}
          onClose={() => setModalOpen(false)}
          onSave={saveDraft}
        />
      )}
    </div>
  );
};

/* ============================================================
   SectionTable – renders according to tab
============================================================ */
function SectionTable({ tab, rows, onEdit, onDelete }) {
  const columns = columnDefs[tab];
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">{tabTitles[tab]}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase"
                >
                  {c.label}
                </th>
              ))}
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, i) => (
              <tr key={row.id || i}>
                {columns.map((c) => (
                  <td key={c.key} className="px-6 py-4 whitespace-nowrap">
                    {row[c.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(i)}
                    className="mr-3 text-blue-600"
                  >
                    Edit
                  </button>
                  {onDelete && (
                    <button
                      onClick={() => onDelete(i)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="p-4 text-center text-gray-400"
                >
                  No records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   ModalForm
============================================================ */
function ModalForm({ tab, draft, setDraft, fileKey, onClose, onSave }) {
  const columns = columnDefs[tab];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="mb-4 text-xl font-bold">Edit</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="space-y-4"
        >
          {columns.map((col) => (
            <div key={col.key}>
              <label className="block mb-1 font-medium">{col.label}</label>
              <input
                type={col.type || "text"}
                value={draft[col.key] || ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, [col.key]: e.target.value }))
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}
          {fileKey && (
            <div>
              <label className="block mb-1 font-medium">Upload file</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) =>
                  setDraft((d) => ({ ...d, [fileKey]: e.target.files[0] }))
                }
              />
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================================================
   Column definitions & titles
============================================================ */
const tabTitles = {
  Home: "Code of Conduct",
  council: "Student Council Members",
  reports: "Council Event Reports",
  clubs: "Student Clubs",
  infrastructure: "Infrastructure Facilities",
  antiRagging: "Anti‑Ragging Notices",
  survey: "Student Satisfaction Survey",
};

const columnDefs = {
  Home: [
    { key: "title", label: "Title" },
    { key: "file_path", label: "File" },
  ],
  council: [
    { key: "full_name", label: "Name" },
    { key: "position", label: "Position" },
    { key: "council_year", label: "Year" },
  ],
  reports: [
    { key: "event_name", label: "Event" },
    { key: "council_year", label: "Year" },
    { key: "file_path", label: "Report" },
  ],
  clubs: [
    { key: "name", label: "Club" },
    { key: "description", label: "Description" },
  ],
  infrastructure: [
    { key: "name", label: "Facility" },
    { key: "short_desc", label: "Short desc" },
  ],
  antiRagging: [
    { key: "title", label: "Title" },
    { key: "file_path", label: "Notice" },
  ],
  survey: [
    { key: "title", label: "Title" },
    { key: "survey_year", label: "Year" },
    { key: "form_url", label: "Form URL" },
  ],
};

export default StudentsCorner;
