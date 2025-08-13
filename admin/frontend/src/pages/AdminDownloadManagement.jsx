import React, { useState, useEffect } from 'react';
import { UploadCloud, Edit, Trash2, Download, ExternalLink, FileText } from 'lucide-react';

const AdminDownloadManagement = () => {
  const [downloads, setDownloads] = useState({
    undergraduate: [],
    postgraduate: [],
    phd: [],
    other: []
  });
  const [showModal, setShowModal] = useState(false);
  const [editingDownload, setEditingDownload] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'undergraduate',
    external_link: '',
    display_order: 0,
    pdf: null
  });

  const categories = [
    { value: 'undergraduate', label: 'Under Graduate / Common' },
    { value: 'postgraduate', label: 'Post Graduate' },
    { value: 'phd', label: 'PhD' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const response = await fetch('http://localhost:3663/api/downloads/downloads');
      const result = await response.json();
      if (result.success) {
        setDownloads(result.data);
      }
    } catch (error) {
      console.error('Error fetching downloads:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('external_link', formData.external_link);
      formDataToSend.append('display_order', formData.display_order);
      formDataToSend.append('created_by', 1); // Replace with actual user ID

      if (formData.pdf) {
        formDataToSend.append('pdf', formData.pdf);
      }

      const url = editingDownload 
  ? `http://localhost:3663/api/downloads/downloads/${editingDownload.id}`
  : 'http://localhost:3663/api/downloads/downloads-create';

      
      const method = editingDownload ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchDownloads();
        resetForm();
        setShowModal(false);
        alert(editingDownload ? 'Download updated successfully!' : 'Download created successfully!');
      } else {
        alert(result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the download');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (download) => {
    setEditingDownload(download);
    setFormData({
      title: download.title,
      description: download.description || '',
      category: download.category,
      external_link: download.external_link || '',
      display_order: download.display_order,
      pdf: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this download?')) {
      try {
        const response = await fetch(`http://localhost:3663/api/downloads/delete-downloads/${id}`, {
          method: 'PUT',
        });

        const result = await response.json();
        if (result.success) {
          await fetchDownloads();
          alert('Download deleted successfully!');
        } else {
          alert(result.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the download');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'undergraduate',
      external_link: '',
      display_order: 0,
      pdf: null
    });
    setEditingDownload(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
            <h1 className="text-2xl font-bold text-gray-900 min-w-0 truncate">Download Management</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm shrink-0 sm:ml-auto"
            >
              <UploadCloud size={20} />
              Upload
            </button>
          </div>

          <div className="p-6">
            {categories.map(category => (
              <div key={category.value} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                  {category.label}
                </h2>
                {downloads[category.value]?.length > 0 ? (
                  <div className="grid gap-4">
                    {downloads[category.value].map(download => (
                      <div key={download.id} className="bg-white p-4 rounded-lg border hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{download.title}</h3>
                            {download.description && (
                              <p className="text-gray-600 text-sm mb-3">{download.description}</p>
                            )}
                            <div className="flex gap-4 text-sm text-gray-500">
                              {download.pdf_url && (
                                <div className="flex items-center gap-1">
                                  <FileText size={16} />
                                  <span>PDF Available</span>
                                </div>
                              )}
                              {download.external_link && (
                                <div className="flex items-center gap-1">
                                  <ExternalLink size={16} />
                                  <span>External Link</span>
                                </div>
                              )}
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">Order: {download.display_order}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleEdit(download)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(download.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 text-center bg-gray-50">
                    <div className="flex flex-col items-center gap-3">
                      <UploadCloud className="text-gray-400" size={36} />
                      <p className="text-gray-500">No downloads available for this category</p>
                      <p className="text-xs text-gray-400">Use the Upload button above to add a file.</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">
                {editingDownload ? 'Edit Download' : 'Upload New File'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PDF File
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFormData({...formData, pdf: e.target.files[0]})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    External Link
                  </label>
                  <input
                    type="url"
                    value={formData.external_link}
                    onChange={(e) => setFormData({...formData, external_link: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editingDownload ? 'Update' : 'Upload')}
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDownloadManagement;