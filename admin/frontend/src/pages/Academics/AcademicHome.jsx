// AcademicHome.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from "react-icons/fa";

const AcademicHome = () => {
  const [homeContent, setHomeContent] = useState({
    title: "Welcome to Academics at Fr.CRIT",
    description: "One of the leading Engineering Institutions in Navi Mumbai, known for visionary management, stable leadership, and a dedicated faculty upholding high academic standards.",
    image: "",
    sections: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      // API call to fetch home content
      const response = await fetch('/api/academics/home');
      const data = await response.json();
      setHomeContent(data);
    } catch (error) {
      console.error('Error fetching home content:', error);
    }
  };

  const handleEdit = () => {
    setEditForm({ ...homeContent });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // API call to update home content
      const response = await fetch('/api/academics/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      setHomeContent(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating home content:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({});
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Academic Home Management</h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <FaEdit className="mr-2" /> Edit Content
          </button>
        ) : (
          <div className="flex gap-2">
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
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={editForm.title || ''}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
              <input
                type="text"
                value={editForm.image || ''}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-900">{homeContent.title}</h2>
            <p className="text-gray-700 text-lg">{homeContent.description}</p>
            {homeContent.image && (
              <img src={homeContent.image} alt="Academic" className="w-full h-64 object-cover rounded-lg" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicHome