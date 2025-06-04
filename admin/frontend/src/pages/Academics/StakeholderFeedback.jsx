import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Save, X, FileText, Eye } from "lucide-react";

const StakeholderFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pdfFile: null,
    pdfUrl: '',
    feedback_type: ''
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:3663/api/academic/feedback');
      const data = await response.json();
      setFeedbacks(data.result || []);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      pdfFile: null,
      pdfUrl: '',
      feedback_type: ''
    });
    setIsAdding(true);
  };

  const handleEdit = (feedback) => {
    setFormData(feedback);
    setEditingId(feedback.id);
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('feedback_type', formData.feedback_type);
      formDataToSend.append('created_by', 1); // Replace with actual admin ID
      
      if (formData.pdfFile) {
        formDataToSend.append('pdf', formData.pdfFile);
      }

      const url = editingId ? `http://localhost:3663/api/academic/feedback/${editingId}` : 'http://localhost:3663/api/academic/feedback-create';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (response.ok) {
        fetchFeedbacks();
        handleCancel();
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const response = await fetch(`http://localhost:3663/api/academic/delete-feedback/${id}`, {
          method: 'PUT'
        });
        if (response.ok) {
          fetchFeedbacks();
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      pdfFile: null,
      pdfUrl: '',
      feedback_type: ''
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pdfFile: e.target.files[0] });
  };

  const getFeedbackTypeColor = (type) => {
    const colors = {
      'student': 'bg-blue-100 text-blue-800',
      'faculty': 'bg-green-100 text-green-800',
      'industry': 'bg-purple-100 text-purple-800',
      'alumni': 'bg-orange-100 text-orange-800',
      'parent': 'bg-pink-100 text-pink-800',
      'employer': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Stakeholder Feedback Management</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Feedback
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Feedback' : 'Add New Feedback'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter feedback title..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Type</label>
              <select
                value={formData.feedback_type}
                onChange={(e) => setFormData({ ...formData, feedback_type: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Feedback Type</option>
                <option value="student">Student Feedback</option>
                <option value="faculty">Faculty Feedback</option>
                <option value="industry">Industry Feedback</option>
                <option value="alumni">Alumni Feedback</option>
                <option value="parent">Parent Feedback</option>
                <option value="employer">Employer Feedback</option>
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
                placeholder="Enter feedback description..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-600"
            >
              <X className="mr-2 h-4 w-4" /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
            >
              <Save className="mr-2 h-4 w-4" /> Save
            </button>
          </div>
        </div>
      )}

      {/* Feedbacks List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{feedback.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(feedback)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(feedback.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getFeedbackTypeColor(feedback.feedback_type)}`}>
                {feedback.feedback_type ? feedback.feedback_type.charAt(0).toUpperCase() + feedback.feedback_type.slice(1) : 'N/A'}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {feedback.description}
            </p>
            
            {feedback.pdf_url && (
              <div className="flex justify-between items-center pt-3 border-t">
                <a
                  href={feedback.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-800 flex items-center text-sm"
                >
                  <FileText className="mr-1 h-4 w-4" /> View PDF
                </a>
                <span className="text-xs text-gray-500">
                  {feedback.created_at && new Date(feedback.created_at).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {feedbacks.length === 0 && !isAdding && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback records found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first stakeholder feedback.</p>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center mx-auto hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Add First Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default StakeholderFeedback;