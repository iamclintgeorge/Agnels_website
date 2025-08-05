// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaLink } from "react-icons/fa";

// const AcademicExaminations = () => {
//   const [examinations, setExaminations] = useState([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     exam_type: '',
//     semester: '',
//     year: '',
//     timetable_url: '',
//     result_url: '',
//     notification: ''
//   });

//   useEffect(() => {
//     fetchExaminations();
//   }, []);

//   const fetchExaminations = async () => {
//     try {
//       const response = await fetch('http://localhost:3663/api/academics/examinations');
//       const data = await response.json();
//       setExaminations(data.result || []);
//     } catch (error) {
//       console.error('Error fetching examinations:', error);
//     }
//   };

//   const handleAdd = () => {
//     setFormData({
//       exam_type: '',
//       semester: '',
//       year: '',
//       timetable_url: '',
//       result_url: '',
//       notification: ''
//     });
//     setIsAdding(true);
//   };

//   const handleEdit = (examination) => {
//     setFormData(examination);
//     setEditingId(examination.id);
//     setIsAdding(true);
//   };

//   const handleSave = async () => {
//     try {
//       const url = editingId ? `http://localhost:3663/api/academics/examinations/${editingId}` : 'http://localhost:3663/api/academics/examinations';
//       const method = editingId ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           created_by: 1 // Replace with actual admin ID
//         })
//       });

//       if (response.ok) {
//         fetchExaminations();
//         handleCancel();
//       }
//     } catch (error) {
//       console.error('Error saving examination:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this examination?')) {
//       try {
//         const response = await fetch(`http://localhost:3663/api/academics/delete-examinations/${id}`, {
//           method: 'PUT'
//         });
//         if (response.ok) {
//           fetchExaminations();
//         }
//       } catch (error) {
//         console.error('Error deleting examination:', error);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setIsAdding(false);
//     setEditingId(null);
//     setFormData({
//       exam_type: '',
//       semester: '',
//       year: '',
//       timetable_url: '',
//       result_url: '',
//       notification: ''
//     });
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Examination Management</h1>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
//         >
//           <FaPlus className="mr-2" /> Add Examination
//         </button>
//       </div>

//       {isAdding && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4">
//             {editingId ? 'Edit Examination' : 'Add New Examination'}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
//               <select
//                 value={formData.exam_type}
//                 onChange={(e) => setFormData({ ...formData, exam_type: e.target.value })}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Exam Type</option>
//                 <option value="Semester">Semester</option>
//                 <option value="Mid-Term">Mid-Term</option>
//                 <option value="Final">Final</option>
//                 <option value="Remedial">Remedial</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
//               <select
//                 value={formData.semester}
//                 onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Semester</option>
//                 <option value="1">Semester 1</option>
//                 <option value="2">Semester 2</option>
//                 <option value="3">Semester 3</option>
//                 <option value="4">Semester 4</option>
//                 <option value="5">Semester 5</option>
//                 <option value="6">Semester 6</option>
//                 <option value="7">Semester 7</option>
//                 <option value="8">Semester 8</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
//               <input
//                 type="number"
//                 value={formData.year}
//                 onChange={(e) => setFormData({ ...formData, year: e.target.value })}
//                 placeholder="2024"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Timetable URL</label>
//               <input
//                 type="url"
//                 value={formData.timetable_url}
//                 onChange={(e) => setFormData({ ...formData, timetable_url: e.target.value })}
//                 placeholder="https://..."
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Result URL</label>
//               <input
//                 type="url"
//                 value={formData.result_url}
//                 onChange={(e) => setFormData({ ...formData, result_url: e.target.value })}
//                 placeholder="https://..."
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Notification</label>
//               <textarea
//                 value={formData.notification}
//                 onChange={(e) => setFormData({ ...formData, notification: e.target.value })}
//                 rows="3"
//                 placeholder="Enter examination notification or instructions..."
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//           <div className="flex gap-2 mt-4">
//             <button
//               onClick={handleSave}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
//             >
//               <FaSave className="mr-2" /> Save
//             </button>
//             <button
//               onClick={handleCancel}
//               className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-700"
//             >
//               <FaTimes className="mr-2" /> Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="w-full table-auto">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Exam Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Semester
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Year
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Timetable
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Results
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {examinations.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     No examinations found
//                   </td>
//                 </tr>
//               ) : (
//                 examinations.map((examination) => (
//                   <tr key={examination.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         {examination.exam_type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       Semester {examination.semester}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {examination.year}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {examination.timetable_url && (
//                         <a
//                           href={examination.timetable_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:text-blue-900 flex items-center"
//                         >
//                           <FaLink className="mr-1" /> View
//                         </a>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {examination.result_url && (
//                         <a
//                           href={examination.result_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-green-600 hover:text-green-900 flex items-center"
//                         >
//                           <FaLink className="mr-1" /> View
//                         </a>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleEdit(examination)}
//                           className="text-blue-600 hover:text-blue-900"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(examination.id)}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AcademicExaminations;
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaFilePdf, FaGraduationCap, FaImage, FaBell, FaArchive } from "react-icons/fa";

const AcademicExaminations = () => {
  const [activeTab, setActiveTab] = useState('timetables');
  const [data, setData] = useState({
    timetables: [],
    slides: [],
    notifications: [],
    forms: [],
    archives: []
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExaminations();
  }, []);

  const fetchExaminations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3663/api/academic/examinations');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);

      const newData = {
        timetables: [],
        slides: result.data?.slides || [],
        notifications: result.data?.notifications || [],
        forms: result.data?.forms || [],
        archives: result.data?.archives || []
      };

      // Process the nested timetables structure
      if (result.success && result.data && result.data.timetables) {
        const timetables = [];
        
        // Extract timetables from nested structure
        Object.keys(result.data.timetables).forEach(academicYear => {
          const yearData = result.data.timetables[academicYear];
          
          Object.keys(yearData).forEach(semesterKey => {
            const semesterData = yearData[semesterKey];
            
            if (Array.isArray(semesterData)) {
              semesterData.forEach(timetable => {
                timetables.push({
                  ...timetable,
                  academic_year: academicYear,
                  semester_key: semesterKey,
                  // Convert semester key to readable format
                  semester: semesterKey === 'FE' ? 'First Year' : 
                           semesterKey === 'SEM_III' ? 'Third Semester' :
                           semesterKey === 'SEM_V' ? 'Fifth Semester' :
                           semesterKey === 'EXAMS' ? 'General Exams' : semesterKey,
                  exam_type: timetable.name,
                  pdf_url: timetable.link
                });
              });
            }
          });
        });
        
        newData.timetables = timetables;
      }

      console.log('Processed Data:', newData);
      setData(newData);
      
    } catch (error) {
      console.error('Error fetching examinations:', error);
      setError(`Failed to fetch examination data: ${error.message}`);
      setData({
        timetables: [],
        slides: [],
        notifications: [],
        forms: [],
        archives: []
      });
    } finally {
      setLoading(false);
    }
  };

  const getDefaultFormData = (type) => {
    const defaults = {
      timetables: {
        title: '',
        description: '',
        academic_year: 'SH2024',
        semester: 'FE',
        exam_type: 'MSE',
        pdf: null,
        created_by: 'Admin'
      },
      slides: {
        title: '',
        display_order: 0,
        image: null,
        created_by: 'Admin'
      },
      notifications: {
        title: '',
        description: '',
        is_new: true,
        created_by: 'Admin'
      },
      forms: {
        name: '',
        description: '',
        pdf: null,
        created_by: 'Admin'
      },
      archives: {
        year: new Date().getFullYear().toString(),
        title: '',
        pdf: null,
        created_by: 'Admin'
      }
    };
    return defaults[type] || {};
  };

  const handleAdd = () => {
    setFormData(getDefaultFormData(activeTab));
    setIsAdding(true);
  };

  const handleEdit = (item) => {
    const editData = { ...item };
    if (activeTab === 'timetables' || activeTab === 'forms' || activeTab === 'archives') {
      editData.pdf = null;
    }
    if (activeTab === 'slides') {
      editData.image = null;
    }
    setFormData(editData);
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      let body;
      let headers = {};
      const isFileUpload =
        activeTab === 'timetables' ||
        activeTab === 'slides' ||
        activeTab === 'forms' ||
        activeTab === 'archives';

      if (isFileUpload) {
        body = new FormData();
        Object.keys(formData).forEach(key => {
          if (key !== 'pdf' && key !== 'image' && formData[key] !== null && formData[key] !== undefined) {
            body.append(key, formData[key]);
          }
        });

        if (activeTab === 'timetables' && formData.pdf) {
          body.append('pdf', formData.pdf);
        } else if (activeTab === 'slides' && formData.image) {
          body.append('pdf', formData.image);
        } else if ((activeTab === 'forms' || activeTab === 'archives') && formData.pdf) {
          body.append('pdf', formData.pdf);
        }
      } else {
        body = JSON.stringify(formData);
        headers['Content-Type'] = 'application/json';
      }

      const endpoints = {
        timetables: editingId ? `examinations/${editingId}` : 'examinations-create',
        slides: editingId ? `examination-slides/${editingId}` : 'examination-slides-create',
        notifications: editingId ? `examination-notifications/${editingId}` : 'examination-notifications-create',
        forms: editingId ? `examination-forms/${editingId}` : 'examination-forms-create',
        archives: editingId ? `examination-archives/${editingId}` : 'examination-archives-create',
      };

      const url = `http://localhost:3663/api/academic/${endpoints[activeTab]}`;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (response.ok) {
        fetchExaminations();
        handleCancel();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving:', error);
      setError('Failed to save data');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const endpoints = {
          timetables: `delete-examinations/${id}`,
          slides: `delete-examination-slides/${id}`,
          notifications: `delete-examination-notifications/${id}`,
          forms: `delete-examination-forms/${id}`,
          archives: `delete-examination-archives/${id}`
        };

        const response = await fetch(`http://localhost:3663/api/academic/${endpoints[activeTab]}`, {
          method: 'PUT'
        });
        if (response.ok) {
          fetchExaminations();
        } else {
          setError('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting:', error);
        setError('Failed to delete item');
      }
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
    setError(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (activeTab === 'slides') {
      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, pdf: file });
    }
  };

  const renderTimetableForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
        <select
          value={formData.exam_type || ''}
          onChange={(e) => setFormData({ ...formData, exam_type: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Exam Type</option>
          <option value="MSE">MSE</option>
          <option value="ESE">ESE</option>
          <option value="IA-1">IA-1</option>
          <option value="IA-2">IA-2</option>
          <option value="Prelim Examination">Prelim Examination</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Semester/Year</label>
        <select
          value={formData.semester || ''}
          onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Semester/Year</option>
          <option value="FE">First Year (FE)</option>
          <option value="SEM_III">Third Semester</option>
          <option value="SEM_V">Fifth Semester</option>
          <option value="EXAMS">General Exams</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
        <select
          value={formData.academic_year || ''}
          onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Academic Year</option>
          <option value="SH2024">SH2024</option>
          <option value="FH2024">FH2024</option>
          <option value="SH2025">SH2025</option>
          <option value="FH2025">FH2025</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">PDF File</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required={!editingId}
        />
      </div>
      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderSlideForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
        <input
          type="number"
          value={formData.display_order || 0}
          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Image File</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required={!editingId}
        />
      </div>
    </div>
  );

  const renderNotificationForm = () => (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_new || false}
            onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
            className="mr-2"
          />
          Mark as New
        </label>
      </div>
    </div>
  );

  const renderFormForm = () => (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Form Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">PDF File</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required={!editingId}
        />
      </div>
    </div>
  );

  const renderArchiveForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
        <input
          type="text"
          value={formData.year || ''}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">PDF File</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required={!editingId}
        />
      </div>
    </div>
  );

  const renderForm = () => {
    const forms = {
      timetables: renderTimetableForm,
      slides: renderSlideForm,
      notifications: renderNotificationForm,
      forms: renderFormForm,
      archives: renderArchiveForm
    };
    return forms[activeTab]();
  };

  const renderTable = () => {
    const currentData = data[activeTab];
    
    if (!Array.isArray(currentData)) {
      console.error(`Data for ${activeTab} is not an array:`, currentData);
      return (
        <div className="text-center py-8 text-red-500">
          Error: Data format is incorrect. Expected an array but got {typeof currentData}.
        </div>
      );
    }
    
    if (currentData.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No {activeTab} found. Click "Add {activeTab.slice(0, -1)}" to create one.
        </div>
      );
    }
    
    if (activeTab === 'timetables') {
      return (
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Academic Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PDF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    item.exam_type === 'ESE' ? 'bg-red-100 text-red-800' :
                    item.exam_type === 'MSE' ? 'bg-blue-100 text-blue-800' :
                    item.exam_type?.includes('IA') ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.exam_type}
                  </span>
                </td>
                <td className="px-6 py-4">{item.semester}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                    {item.academic_year}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.pdf_url && (
                    <a 
                      href={`http://localhost:3663${item.pdf_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <FaFilePdf className="mr-1" /> View PDF
                    </a>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    // Render tables for other sections
    return (
      <table className="w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {activeTab === 'slides' ? 'Title' : activeTab === 'notifications' ? 'Title' : activeTab === 'forms' ? 'Name' : 'Title'}
            </th>
            {activeTab === 'slides' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>}
            {activeTab === 'archives' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>}
            {activeTab === 'notifications' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descriptions</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData.map((item, index) => (
            <tr key={item.id || index} className="hover:bg-gray-50">
              <td className="px-6 py-4">{item.title || item.name}</td>
              {activeTab === 'slides' && <td className="px-6 py-4">{item.display_order}</td>}
              {activeTab === 'archives' && <td className="px-6 py-4">{item.year}</td>}
              {activeTab === 'notifications' && (
                <td className="px-6 py-4">
                  {(item.isNew || item.is_new) ?
                     <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">NEW</span> :
                     <span className="text-gray-500">Read</span>
                  }
                </td>
              )}
              <td className="px-6 py-4">
                {activeTab === 'slides' && item.image && (
                  <a href={`http://localhost:3663/${item.image}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 flex items-center">
                    <FaImage className="mr-1" /> View Image
                  </a>
                )}
                {(activeTab === 'forms' || activeTab === 'archives') && item.link && (
                  <a href={`http://localhost:3663${item.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 flex items-center">
                    <FaFilePdf className="mr-1" /> View PDF
                  </a>
                )}
                {activeTab === 'notifications' && (
                  <span className="text-gray-700">
                    {item.description || "No description"}
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <button
                     onClick={() => handleEdit(item)}
                     className="text-blue-600 hover:text-blue-900 p-1"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                     onClick={() => handleDelete(item.id)}
                     className="text-red-600 hover:text-red-900 p-1"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const tabs = [
    { key: 'timetables', label: 'Timetables', icon: FaGraduationCap },
    { key: 'slides', label: 'Slides', icon: FaImage },
    { key: 'notifications', label: 'Notifications', icon: FaBell },
    { key: 'forms', label: 'Forms', icon: FaFilePdf },
    { key: 'archives', label: 'Archives', icon: FaArchive },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <div className="ml-4 text-xl text-gray-600">Loading examination data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Examination Management</h1>
          <p className="text-gray-600">Manage timetables, slides, notifications, forms, and archives</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors shadow-lg"
        >
          <FaPlus className="mr-2" /> Add {activeTab.slice(0, -1)}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <span>{error}</span>
          <button 
            onClick={() => setError(null)} 
            className="font-bold text-red-700 hover:text-red-900 text-xl leading-none"
          >
            ×
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
                activeTab === tab.key 
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
              }`}
            >
              <Icon className="mr-2" />
              {tab.label}
              <span className="ml-2 bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
                {Array.isArray(data[tab.key]) ? data[tab.key].length : 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow-lg border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {editingId ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
          </h2>
          {renderForm()}
          <div className="flex gap-2 mt-6">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors shadow-md"
            >
              <FaSave className="mr-2" /> Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-gray-700 transition-colors shadow-md"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
        <div className="overflow-x-auto">
          {renderTable()}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">
              Total {activeTab}: <span className="font-medium">{Array.isArray(data[activeTab]) ? data[activeTab].length : 0}</span>
            </p>
            <button
              onClick={fetchExaminations}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              🔄 Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicExaminations;