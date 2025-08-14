import React, { useState, useEffect } from "react";
import axios from "axios";

function AnnouncementsManager() {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    attachment: "",
    created_by: "",
  });
  const [announcements, setAnnouncements] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [prevContent, setprevContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //With Content Approval System
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      created_by: parseInt(formData.created_by, 10) || 0,
    };

    try {
      if (editingId) {
        const formData = new FormData();
        formData.append("method", "PUT");
        formData.append("section", "Homepage");
        formData.append("title", "Update Homepage Notice Board");
        formData.append(
          "change_summary",
          "Update Existing Entry of Notice Board"
        );
        formData.append("current_content", JSON.stringify(prevContent));
        formData.append("proposed_content", JSON.stringify(dataToSend));
        formData.append("endpoint_url", `api/home/announcements`);
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
        alert("Announcement updated successfully!");
        setEditingId(null);
      } else {
        const formData = new FormData();
        formData.append("method", "POST");
        formData.append("section", "Homepage");
        formData.append("title", "Create Homepage Notice Board");
        formData.append("change_summary", "Added Entry to Notice Board");
        formData.append("current_content", "");
        formData.append("proposed_content", JSON.stringify(dataToSend));
        formData.append("endpoint_url", `api/home/announcements`);
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
        alert("Announcement added successfully!");
      }
      setFormData({
        subject: "",
        description: "",
        attachment: "",
        created_by: "",
      });
      fetchAnnouncements();
    } catch (error) {
      alert(
        "Failed to process request: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/home/announcements"
      );
      console.log("Fetched Announcements:", response.data);
      setAnnouncements(response.data.result || []);
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    console.log("Announcements state:", announcements);
  }, [announcements]);

  const handleEdit = (announcement) => {
    setFormData({
      subject: announcement.subject || "",
      description: announcement.description || "",
      attachment: announcement.attachment || "",
      created_by: announcement.created_by?.toString() || "",
    });
    setEditingId(announcement.id);
    setprevContent(announcement);
    console.log(editingId);
    console.log(prevContent);
  };

  //With Content Approval
  const handleDelete = async (announcement, id) => {
    setprevContent(announcement);
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
      formData.append("endpoint_url", `api/home/delete-announcements`);
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

      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-10 px-5 bg-[#F7F7F7] min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="font-bold font-inter text-[30px] text-[#0C2340] mb-5">
          {editingId ? "Edit Announcement" : "Add Announcement"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
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
            type="text"
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

      <div className="mt-10 text-center">
        <button
          onClick={fetchAnnouncements}
          className="bg-[#AE9142] text-white py-2 px-6 rounded-md"
        >
          Display Announcements
        </button>
      </div>

      {showTable && announcements.length > 0 && (
        <div>
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
              {announcements.map((announcement) => (
                <tr key={announcement.id} className="border">
                  <td className="border p-2">{announcement.subject}</td>
                  <td className="border p-2">{announcement.description}</td>
                  <td className="border p-2">
                    {announcement.attachment || "No attachment"}
                  </td>
                  <td className="border p-2">{announcement.created_by}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(announcement)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(announcement, announcement.id)
                      }
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

export default AnnouncementsManager;
