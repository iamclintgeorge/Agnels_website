import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Building, 
  Image as ImageIcon,
  X,
  Save
} from "lucide-react";

const ElectricalInfrastructure = () => {
  const navigate = useNavigate();
  const [infrastructures, setInfrastructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedInfra, setSelectedInfra] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description1: "",
    image: null,
    imagePreview: ""
  });

  // Department ID for Electrical Engineering
  const DEPARTMENT_ID = 3;

  useEffect(() => {
    fetchInfrastructures();
  }, []);

  const fetchInfrastructures = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3663/api/infrastructure/department/${DEPARTMENT_ID}`, {
        credentials: "include"
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch infrastructures");
      }
      
      const data = await response.json();
      setInfrastructures(data.data || []);
    } catch (error) {
      console.error("Error fetching infrastructures:", error);
      toast.error("Failed to load infrastructures");
    } finally {
      setLoading(false);
    }
  };

  const handleAddInfrastructure = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description1 || !formData.image) {
      toast.error("Please fill all fields and select an image");
      return;
    }

    try {
      setUploading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description1", formData.description1);
      formDataToSend.append("department_id", DEPARTMENT_ID);
      formDataToSend.append("image", formData.image);

      const response = await fetch("http://localhost:3663/api/infrastructure/admin/create", {
        method: "POST",
        credentials: "include",
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error("Failed to create infrastructure");
      }

      const data = await response.json();
      toast.success("Infrastructure added successfully!");
      
      // Reset form and close modal
      setFormData({
        name: "",
        description1: "",
        image: null,
        imagePreview: ""
      });
      setShowAddModal(false);
      
      // Refresh the list
      fetchInfrastructures();
    } catch (error) {
      console.error("Error adding infrastructure:", error);
      toast.error("Failed to add infrastructure");
    } finally {
      setUploading(false);
    }
  };

  const handleEditInfrastructure = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description1) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setUploading(true);
      const response = await fetch(`http://localhost:3663/api/infrastructure/admin/update/${selectedInfra.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          description1: formData.description1
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update infrastructure");
      }

      toast.success("Infrastructure updated successfully!");
      
      // Reset form and close modal
      setFormData({
        name: "",
        description1: "",
        image: null,
        imagePreview: ""
      });
      setShowEditModal(false);
      setSelectedInfra(null);
      
      // Refresh the list
      fetchInfrastructures();
    } catch (error) {
      console.error("Error updating infrastructure:", error);
      toast.error("Failed to update infrastructure");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteInfrastructure = async (id) => {
    if (!window.confirm("Are you sure you want to delete this infrastructure item?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3663/api/infrastructure/admin/delete/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to delete infrastructure");
      }

      toast.success("Infrastructure deleted successfully!");
      fetchInfrastructures();
    } catch (error) {
      console.error("Error deleting infrastructure:", error);
      toast.error("Failed to delete infrastructure");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setFormData({
      name: "",
      description1: "",
      image: null,
      imagePreview: ""
    });
    setShowAddModal(true);
  };

  const openEditModal = (infra) => {
    setSelectedInfra(infra);
    setFormData({
      name: infra.name,
      description1: infra.description1,
      image: null,
      imagePreview: ""
    });
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedInfra(null);
    setFormData({
      name: "",
      description1: "",
      image: null,
      imagePreview: ""
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading infrastructures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Building className="mr-3" size={32} />
                Electrical Engineering Infrastructure
              </h1>
              <p className="text-gray-600 mt-2">
                Manage infrastructure facilities for the Electrical Engineering department
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus size={20} />
              <span>Add Infrastructure</span>
            </button>
          </div>
        </div>

        {/* Infrastructure Grid */}
        {infrastructures.length === 0 ? (
          <div className="text-center py-12">
            <Building className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Infrastructure Found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first infrastructure item.</p>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add Infrastructure
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructures.map((infra) => (
              <div key={infra.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={infra.image || "/api/placeholder/400/300"}
                    alt={infra.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{infra.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{infra.description1}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Added: {new Date(infra.created_timestamp).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(infra)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Infrastructure"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteInfrastructure(infra.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Infrastructure"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Infrastructure Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Add New Infrastructure</h2>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddInfrastructure} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Infrastructure Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter infrastructure name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description1}
                    onChange={(e) => setFormData(prev => ({ ...prev, description1: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    placeholder="Enter infrastructure description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Infrastructure Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {formData.imagePreview && (
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="mt-2 w-full h-32 object-cover rounded-md"
                    />
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Add Infrastructure</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Infrastructure Modal */}
        {showEditModal && selectedInfra && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Edit Infrastructure</h2>
                <button
                  onClick={closeModals}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleEditInfrastructure} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Infrastructure Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter infrastructure name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description1}
                    onChange={(e) => setFormData(prev => ({ ...prev, description1: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    placeholder="Enter infrastructure description"
                    required
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <img
                    src={selectedInfra.image || "/api/placeholder/400/300"}
                    alt={selectedInfra.name}
                    className="w-full h-32 object-cover rounded-md"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Note: To change the image, you'll need to delete and recreate the infrastructure item.
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Update Infrastructure</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectricalInfrastructure; 