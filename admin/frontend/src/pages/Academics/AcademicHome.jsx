// AcademicHome.jsx - Enhanced Admin Component
import React, { useState, useEffect } from "react";
import { 
  FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaChalkboardTeacher, 
  FaUsers, FaEye, FaClipboardCheck, FaCheckCircle, FaUniversity,
  FaImage, FaUpload, FaGraduationCap, FaBook, FaCertificate, 
  FaAward, FaChartLine, FaCog
} from "react-icons/fa";

const AcademicHome = () => {
  const [homeData, setHomeData] = useState(null);
  const [isEditingMain, setIsEditingMain] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [selectedSectionForCard, setSelectedSectionForCard] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [mainForm, setMainForm] = useState({
    title: '',
    description: '',
    hero_image_url: '',
    imageFile: null
  });
  
  const [sectionForm, setSectionForm] = useState({
    section_type: '',
    title: '',
    description: '',
    icon: '',
    order_index: 0,
    is_active: '1'
  });
  
  const [cardForm, setCardForm] = useState({
    section_id: '',
    title: '',
    description: '',
    icon: '',
    order_index: 0,
    is_active: '1'
  });

  const sectionTypes = [
    { value: 'mission', label: 'Mission/Philosophy' },
    { value: 'admin', label: 'Administration' },
    { value: 'attendance', label: 'Attendance & Grievance' },
    { value: 'audit', label: 'Audit & Appraisal' },
    { value: 'custom', label: 'Custom Section' }
  ];

  const iconOptions = [
    'FaChalkboardTeacher', 'FaUsers', 'FaEye', 'FaClipboardCheck',
    'FaCheckCircle', 'FaUniversity', 'FaGraduationCap', 'FaBook',
    'FaCertificate', 'FaAward', 'FaChartLine', 'FaCog'
  ];

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3663/api/academic/home');
      const data = await response.json();
      if (data.result && data.result.length > 0) {
        setHomeData(data.result[0]);
        setMainForm({
          title: data.result[0].title || '',
          description: data.result[0].description || '',
          hero_image_url: data.result[0].hero_image_url || '',
          imageFile: null
        });
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
      alert('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMainEdit = () => {
    setIsEditingMain(true);
  };

  const handleMainSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', mainForm.title);
      formData.append('description', mainForm.description);
      formData.append('created_by', 'Admin');
      
      if (mainForm.imageFile) {
        formData.append('pdf', mainForm.imageFile);
      }

      const url = homeData ? 
        `http://localhost:3663/api/academic/home/${homeData.id}` : 
        'http://localhost:3663/api/academic/home-create';
      const method = homeData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData
      });

      if (response.ok) {
        await fetchHomeData();
        setIsEditingMain(false);
        alert('Main content saved successfully!');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving home data:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMainCancel = () => {
    setIsEditingMain(false);
    if (homeData) {
      setMainForm({
        title: homeData.title || '',
        description: homeData.description || '',
        hero_image_url: homeData.hero_image_url || '',
        imageFile: null
      });
    }
  };

  const handleSectionEdit = (section) => {
    setSectionForm({
      section_type: section.section_type || '',
      title: section.title || '',
      description: section.description || '',
      icon: section.icon || '',
      order_index: section.order_index || 0,
      is_active: section.is_active || '1'
    });
    setEditingSectionId(section.id);
  };

  const handleSectionSave = async () => {
    setLoading(true);
    try {
      const url = editingSectionId ? 
        `http://localhost:3663/api/academic/home-section/${editingSectionId}` : 
        'http://localhost:3663/api/academic/home-section-create';
      const method = editingSectionId ? 'PUT' : 'POST';

      const payload = editingSectionId ? sectionForm : { ...sectionForm, home_id: homeData.id };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchHomeData();
        setEditingSectionId(null);
        setIsAddingSection(false);
        setSectionForm({
          section_type: '',
          title: '',
          description: '',
          icon: '',
          order_index: 0,
          is_active: '1'
        });
        alert('Section saved successfully!');
      } else {
        throw new Error('Failed to save section');
      }
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Error saving section. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSectionCancel = () => {
    setEditingSectionId(null);
    setIsAddingSection(false);
    setSectionForm({
      section_type: '',
      title: '',
      description: '',
      icon: '',
      order_index: 0,
      is_active: '1'
    });
  };

  const handleSectionDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3663/api/academic/delete-home-section/${id}`, {
          method: 'PUT'
        });
        if (response.ok) {
          await fetchHomeData();
          alert('Section deleted successfully!');
        } else {
          throw new Error('Failed to delete section');
        }
      } catch (error) {
        console.error('Error deleting section:', error);
        alert('Error deleting section. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCardEdit = (card, sectionId) => {
    setCardForm({
      section_id: sectionId,
      title: card.title || '',
      description: card.description || '',
      icon: card.icon || '',
      order_index: card.order_index || 0,
      is_active: card.is_active || '1'
    });
    setEditingCardId(card.id);
  };

  const handleCardSave = async () => {
    setLoading(true);
    try {
      const url = editingCardId ? 
        `http://localhost:3663/api/academic/admin-card/${editingCardId}` : 
        'http://localhost:3663/api/academic/admin-card-create';
      const method = editingCardId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardForm)
      });

      if (response.ok) {
        await fetchHomeData();
        setEditingCardId(null);
        setIsAddingCard(false);
        setSelectedSectionForCard(null);
        setCardForm({
          section_id: '',
          title: '',
          description: '',
          icon: '',
          order_index: 0,
          is_active: '1'
        });
        alert('Card saved successfully!');
      } else {
        throw new Error('Failed to save card');
      }
    } catch (error) {
      console.error('Error saving card:', error);
      alert('Error saving card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardCancel = () => {
    setEditingCardId(null);
    setIsAddingCard(false);
    setSelectedSectionForCard(null);
    setCardForm({
      section_id: '',
      title: '',
      description: '',
      icon: '',
      order_index: 0,
      is_active: '1'
    });
  };

  const handleCardDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3663/api/academic/delete-admin-card/${id}`, {
          method: 'PUT'
        });
        if (response.ok) {
          await fetchHomeData();
          alert('Card deleted successfully!');
        } else {
          throw new Error('Failed to delete card');
        }
      } catch (error) {
        console.error('Error deleting card:', error);
        alert('Error deleting card. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainForm({ ...mainForm, imageFile: file });
    }
  };

  const renderIcon = (iconName) => {
    const iconMap = {
      FaChalkboardTeacher: <FaChalkboardTeacher />,
      FaUsers: <FaUsers />,
      FaEye: <FaEye />,
      FaClipboardCheck: <FaClipboardCheck />,
      FaCheckCircle: <FaCheckCircle />,
      FaUniversity: <FaUniversity />,
      FaGraduationCap: <FaGraduationCap />,
      FaBook: <FaBook />,
      FaCertificate: <FaCertificate />,
      FaAward: <FaAward />,
      FaChartLine: <FaChartLine />,
      FaCog: <FaCog />
    };
    return iconMap[iconName] || <FaUsers />;
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Academic Home Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddingSection(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            <FaPlus className="mr-2" /> Add Section
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-900">Main Content</h2>
          {!isEditingMain ? (
            <button
              onClick={handleMainEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              <FaEdit className="mr-2" /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleMainSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
                disabled={loading}
              >
                <FaSave className="mr-2" /> Save
              </button>
              <button
                onClick={handleMainCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-700 transition-colors"
                disabled={loading}
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </div>
          )}
        </div>

        {isEditingMain ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={mainForm.title}
                onChange={(e) => setMainForm({ ...mainForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={mainForm.description}
                onChange={(e) => setMainForm({ ...mainForm, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
              />
              {mainForm.hero_image_url && (
                <img
                  src={mainForm.hero_image_url}
                  alt="Current hero"
                  className="mt-2 h-20 object-cover rounded"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{homeData?.title || 'No title set'}</h3>
              <p className="text-gray-600 mt-2">{homeData?.description || 'No description set'}</p>
            </div>
            {homeData?.hero_image_url && (
              <div>
                <img
                  // src={homeData.hero_image_url}
                  src={`http://localhost:3663${homeData.hero_image_url?.trim()}`}

                  alt="Hero"
                  className="h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sections */}
      {homeData?.sections?.map((section) => (
        <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="text-blue-600 mr-3 text-xl">
                {renderIcon(section.icon)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                <span className="text-sm text-gray-500 capitalize">{section.section_type}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedSectionForCard(section.id);
                  setIsAddingCard(true);
                  setCardForm({ ...cardForm, section_id: section.id });
                }}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center hover:bg-green-700 transition-colors"
                disabled={loading}
              >
                <FaPlus className="mr-1" /> Add Card
              </button>
              <button
                onClick={() => handleSectionEdit(section)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={() => handleSectionDelete(section.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center hover:bg-red-700 transition-colors"
                disabled={loading}
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{section.description}</p>

          {/* Cards Grid */}
          {section.cards && section.cards.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.cards.map((card) => (
                <div key={card.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="text-blue-600 mr-2">
                        {renderIcon(card.icon)}
                      </div>
                      <h4 className="font-medium text-gray-900">{card.title}</h4>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleCardEdit(card, section.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        disabled={loading}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleCardDelete(card.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                        disabled={loading}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Add/Edit Section Modal */}
      {(isAddingSection || editingSectionId) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingSectionId ? 'Edit Section' : 'Add New Section'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Type</label>
                <select
                  value={sectionForm.section_type}
                  onChange={(e) => setSectionForm({ ...sectionForm, section_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  {sectionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={sectionForm.title}
                  onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={sectionForm.description}
                  onChange={(e) => setSectionForm({ ...sectionForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <select
                  value={sectionForm.icon}
                  onChange={(e) => setSectionForm({ ...sectionForm, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Icon</option>
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
                <input
                  type="number"
                  value={sectionForm.order_index}
                  onChange={(e) => setSectionForm({ ...sectionForm, order_index: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={sectionForm.is_active}
                  onChange={(e) => setSectionForm({ ...sectionForm, is_active: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleSectionCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSectionSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {editingSectionId ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Card Modal */}
      {(isAddingCard || editingCardId) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingCardId ? 'Edit Card' : 'Add New Card'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={cardForm.title}
                  onChange={(e) => setCardForm({ ...cardForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={cardForm.description}
                  onChange={(e) => setCardForm({ ...cardForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <select
                  value={cardForm.icon}
                  onChange={(e) => setCardForm({ ...cardForm, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Icon</option>
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
                <input
                  type="number"
                  value={cardForm.order_index}
                  onChange={(e) => setCardForm({ ...cardForm, order_index: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={cardForm.is_active}
                  onChange={(e) => setCardForm({ ...cardForm, is_active: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleCardCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleCardSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {editingCardId ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicHome;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AcademicHome = () => {
//   const [homeData, setHomeData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHomeData = async () => {
//       try {
//         const res = await axios.get("http://localhost:3663/api/academic/home");
//         if (res.data.result && res.data.result.length > 0) {
//           setHomeData(res.data.result[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching academic home:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHomeData();
//   }, []);

//   const renderIcon = (iconName) => {
//     const iconMap = {
//       FaChalkboardTeacher: "👨‍🏫",
//       FaUsers: "👥",
//       FaEye: "👁️",
//       FaClipboardCheck: "📋",
//       FaCheckCircle: "✅",
//       FaUniversity: "🏛️",
//       FaGraduationCap: "🎓",
//       FaBook: "📖",
//       FaCertificate: "📜",
//       FaAward: "🏆",
//       FaChartLine: "📈",
//       FaCog: "⚙️",
//     };
//     return iconMap[iconName] || "📌";
//   };

//   if (loading) return <div className="p-6 text-lg">Loading...</div>;

//   return (
//     <div className="bg-[#f4f4db] min-h-screen font-sans px-4 py-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Title and Description */}
//         <h1 className="text-2xl font-bold mb-4 text-blue-900">
//           {homeData?.title}
//         </h1>
//         <p className="text-gray-800 leading-relaxed whitespace-pre-line mb-6">
//           {homeData?.description}
//         </p>

//         {/* Hero Image (if available) */}
//         {homeData?.hero_image_url && (
//           <img
//             src={`http://localhost:3663${homeData.hero_image_url}`}
//             alt="Academic Hero"
//             className="rounded shadow mb-10 max-h-[400px] w-auto"
//           />
//         )}

//         {/* Sections */}
//         {homeData?.sections?.map((section, index) => (
//           <div key={section.id} className="mb-10">
//             <h2 className="text-xl font-semibold text-blue-800 border-b-2 border-blue-400 pb-1 mb-4">
//               {index + 1}. {section.title}
//             </h2>
//             <p className="text-gray-700 mb-4 whitespace-pre-line">{section.description}</p>

//             {/* Cards within the section */}
//             {section.cards && section.cards.length > 0 && (
//               <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                 {section.cards.map((card) => (
//                   <div
//                     key={card.id}
//                     className="bg-white p-4 rounded-lg shadow border border-gray-200"
//                   >
//                     <div className="flex items-center text-blue-600 mb-2">
//                       <span className="mr-2 text-xl">{renderIcon(card.icon)}</span>
//                       <h4 className="font-semibold text-gray-900">{card.title}</h4>
//                     </div>
//                     <p className="text-gray-700 text-sm whitespace-pre-line">{card.description}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AcademicHome;
