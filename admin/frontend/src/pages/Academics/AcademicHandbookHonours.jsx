import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaFilePdf } from "react-icons/fa";

const AcademicHandbookHonours = () => {
  const [handbooks, setHandbooks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pdfFile: null,
    pdfUrl: '',
    type: 'Honours' // honours or minors
  });

  useEffect(() => {
    fetchHandbooks();
  }, []);

  const fetchHandbooks = async () => {
    try {
      // Filter for honours and minors handbooks
      const response = await fetch('http://localhost:3663/api/academic/handbooks');
      const data = await response.json();
      setHandbooks(data.result );
    } catch (error) {
      console.error('Error fetching handbooks:', error);
    }
  };

  const handleAdd = () => {
    setFormData({ title: '', description: '', pdfFile: null, pdfUrl: '', type: 'Honours' });
    setIsAdding(true);
  };

  const handleEdit = (handbook) => {
    setFormData(handbook);
    setEditingId(handbook.id);
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('handbook_type', "Honours");
      if (formData.pdfFile) {
        formDataToSend.append('pdf', formData.pdfFile);
      }

      const url = editingId ? `http://localhost:3663/api/academic/handbooks-create/${editingId}` : 'http://localhost:3663/api/academic/handbooks-create';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (response.ok) {
        fetchHandbooks();
        handleCancel();
      }
    } catch (error) {
      console.error('Error saving handbook:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this handbook?')) {
      try {
        const response = await fetch(`http://localhost:3663/api/academic/delete-handbooks/${id}`, {
          method: 'PUT'
        });
        if (response.ok) {
          fetchHandbooks();
        }
      } catch (error) {
        console.error('Error deleting handbook:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', description: '', pdfFile: null, pdfUrl: '', type: 'Honours' });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pdfFile: e.target.files[0] });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Honours & Minors Handbook Management</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> Add Handbook
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Handbook' : 'Add New Handbook'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Honours">Honours</option>
                <option value="minors">Minors</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PDF File</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
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
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PDF
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {handbooks.filter((handbook) => handbook.handbook_type 
              !== 'Honours').map((handbook) => (
                <tr key={handbook.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {handbook.title}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      handbook.type === 'honours' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {handbook.type}
                    </span>
                  </td> */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {handbook.description}
                  </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           {handbook.pdf_url ? (
          <>
       <a
        href={`http://localhost:3663${handbook.pdf_url.trim()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-900 flex items-center"
      >
        View PDF
      </a>
      <br />
      
    </>
  ) : (
    'No PDF available'
  )}
</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(handbook)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(handbook.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcademicHandbookHonours;