import React, { useEffect, useState } from "react";
import { Link as LinkIcon, ExternalLink, PlusCircle, Edit2, Trash2 } from "lucide-react";

const ImportantLinksAdmin = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", link: "" });

  const apiBase = "http://localhost:3663/api/important-links";

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiBase, { credentials: "include" });
      const data = await res.json();
      if (data.success) setLinks(data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", link: "" });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title || "", link: (item.link || "").trim() });
    setShowModal(true);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.link) return alert("Title and link are required");
    try {
      setLoading(true);
      const method = editing ? "PUT" : "POST";
      const url = editing ? `${apiBase}/${editing.id}` : apiBase;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title: form.title, link: form.link }),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setEditing(null);
        setForm({ title: "", link: "" });
        await fetchLinks();
      } else {
        alert(data.message || "Failed");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving link");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this link?")) return;
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        await fetchLinks();
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <LinkIcon size={22} className="text-blue-600" /> Important Links
          </h1>
          <button
            onClick={openCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <PlusCircle size={18} /> Add Link
          </button>
        </div>

        <div className="p-6">
          {loading && <p className="text-gray-500">Loading...</p>}
          {!loading && links.length === 0 && (
            <p className="text-gray-500">No links yet</p>
          )}
          {!loading && links.length > 0 && (
            <div className="divide-y">
              {links.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between">
                  <div className="pr-4">
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <a
                      href={(item.link || "").trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 text-sm break-all hover:underline"
                    >
                      <ExternalLink size={14} /> {(item.link || "").trim()}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="px-3 py-1.5 rounded-lg border text-blue-600 border-blue-200 hover:bg-blue-50 inline-flex items-center gap-1"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="px-3 py-1.5 rounded-lg border text-red-600 border-red-200 hover:bg-red-50 inline-flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editing ? "Edit Link" : "Add Link"}
            </h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Link</label>
                <input
                  name="link"
                  value={form.link}
                  onChange={onChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportantLinksAdmin;

