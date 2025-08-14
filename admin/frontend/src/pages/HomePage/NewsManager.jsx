import React, { useState, useEffect } from "react";
import axios from "axios";

function NewsManager() {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    attachment: "",
    created_by: "",
  });
  const [news, setNews] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [prevContent, setprevContent] = useState("");

  // ─── Handlers ──────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      created_by: parseInt(formData.created_by, 10) || 0,
    };

    try {
      if (editingId) {
        const formData = new FormData();
        formData.append("method", "PUT");
        formData.append("section", "Homepage");
        formData.append("title", "Update Homepage News");
        formData.append("change_summary", "Update Existing Entry of News");
        formData.append("current_content", JSON.stringify(prevContent));
        formData.append("proposed_content", JSON.stringify(payload));
        formData.append("endpoint_url", `api/home/news`);
        formData.append("id", editingId);

        await axios.post(
          `http://localhost:3663/api/content-approval/request`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("News updated!");
        setEditingId(null);
      } else {
        const formData = new FormData();
        formData.append("method", "POST");
        formData.append("section", "Homepage");
        formData.append("title", "Create Homepage News");
        formData.append("change_summary", "Added Entry to News Section");
        formData.append("current_content", "");
        formData.append("proposed_content", JSON.stringify(payload));
        formData.append("endpoint_url", `api/home/news`);
        formData.append("id", 0);

        await axios.post(
          "http://localhost:3663/api/content-approval/request",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("News added!");
      }
      setFormData({
        subject: "",
        description: "",
        attachment: "",
        created_by: "",
      });
      fetchNews();
    } catch (err) {
      alert("Request failed: " + (err.response?.data?.message || err.message));
    }
  };

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:3663/api/home/news");
      setNews(res.data.result || []);
      setShowTable(true);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleEdit = (row) => {
    setFormData({
      subject: row.subject,
      description: row.description,
      attachment: row.attachment,
      created_by: row.created_by.toString(),
    });
    setEditingId(row.id);
    setprevContent(row);
  };

  const handleDelete = async (row, id) => {
    setprevContent(row);
    try {
      const formData = new FormData();
      formData.append("method", "DELETE");
      formData.append("section", "Homepage");
      formData.append("title", "Delete Homepage Notice Board");
      formData.append(
        "change_summary",
        "Delete Existing Entry of Notice Board"
      );
      formData.append("current_content", JSON.stringify(prevContent));
      formData.append("proposed_content", "");
      formData.append("endpoint_url", `api/home/delete-news`);
      formData.append("id", id);

      await axios.post(
        `http://localhost:3663/api/content-approval/request`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchNews();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <section className="py-10 px-5 bg-[#F7F7F7] min-h-screen">
      {/* Form */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="font-semibold italic text-[30px] text-[#0C2340] mb-5">
          {editingId ? "Edit News" : "Add News"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full p-2 border rounded-md"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            name="attachment"
            value={formData.attachment}
            onChange={handleChange}
            placeholder="Attachment URL"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="created_by"
            value={formData.created_by}
            onChange={handleChange}
            placeholder="Created By (User ID)"
            className="w-full p-2 border rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#0E1D3F] text-white py-2 rounded-md"
          >
            {editingId ? "Save Changes" : "Submit"}
          </button>
        </form>
      </div>

      {/* ── DISPLAY BUTTON ───────────────────────── */}
      <div className="mt-10 text-center">
        <button
          onClick={fetchNews}
          className="bg-[#AE9142] text-white py-2 px-6 rounded-md"
        >
          Display News
        </button>
      </div>

      {/* ── TABLE ────────────────────────────────── */}
      {showTable && news.length !== 0 && (
        <div className="overflow-x-auto">
          <table className="mt-6 w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Subject</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Attachment</th>
                <th className="border p-2">Created By</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map((row) => (
                <tr key={row.id} className="border">
                  <td className="border p-2">{row.subject}</td>
                  <td className="border p-2">{row.description}</td>
                  <td className="border p-2">
                    {row.attachment || "No attachment"}
                  </td>
                  <td className="border p-2">{row.created_by}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(row)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row, row.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default NewsManager;
