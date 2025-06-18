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
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaFilePdf, FaGraduationCap } from "react-icons/fa";

const AcademicExaminations = () => {
  const [examinations, setExaminations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    exam_type: '',
    semester: '',
    year: '',
    timetable_pdf: null,
    result_pdf: null,
    notification: '',
    exam_date: '',
    result_date: ''
  });

  useEffect(() => {
    fetchExaminations();
  }, []);

  const fetchExaminations = async () => {
    try {
      const response = await fetch('http://localhost:3663/api/academic/examinations');
      const data = await response.json();
      setExaminations(data.result || []);
    } catch (error) {
      console.error('Error fetching examinations:', error);
    }
  }; // Fixed: Added missing closing brace

  const handleAdd = () => {
    setFormData({
      exam_type: '',
      semester: '',
      year: new Date().getFullYear().toString(),
      timetable_pdf: null,
      result_pdf: null,
      notification: '',
      exam_date: '',
      result_date: ''
    });
    setIsAdding(true);
  };

  const handleEdit = (examination) => {
    setFormData({
      ...examination,
      exam_date: examination.exam_date ? examination.exam_date.split('T')[0] : '',
      result_date: examination.result_date ? examination.result_date.split('T')[0] : '',
      timetable_pdf: null,
      result_pdf: null
    });
    setEditingId(examination.id);
    setIsAdding(true);
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('exam_type', formData.exam_type);
      formDataToSend.append('semester', formData.semester);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('notification', formData.notification);
      formDataToSend.append('exam_date', formData.exam_date);
      formDataToSend.append('result_date', formData.result_date);
      formDataToSend.append('created_by', "Admin");
      
      if (formData.timetable_pdf) {
        formDataToSend.append('timetable_pdf', formData.timetable_pdf);
      }
      if (formData.result_pdf) {
        formDataToSend.append('result_pdf', formData.result_pdf);
      }

      const url = editingId 
        ? `http://localhost:3663/api/academic/examinations/${editingId}` 
        : 'http://localhost:3663/api/academic/examinations-create';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (response.ok) {
        fetchExaminations();
        handleCancel();
      }
    } catch (error) {
      console.error('Error saving examination:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this examination?')) {
      try {
        const response = await fetch(`http://localhost:3663/api/academic/delete-examinations/${id}`, {
          method: 'PUT'
        });
        if (response.ok) {
          fetchExaminations();
        }
      } catch (error) {
        console.error('Error deleting examination:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      exam_type: '',
      semester: '',
      year: '',
      timetable_pdf: null,
      result_pdf: null,
      notification: '',
      exam_date: '',
      result_date: ''
    });
  };

  const handleTimetableFileChange = (e) => {
    setFormData({ ...formData, timetable_pdf: e.target.files[0] });
  };

  const handleResultFileChange = (e) => {
    setFormData({ ...formData, result_pdf: e.target.files[0] });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getExamTypeColor = (examType) => {
    const colors = {
      'Semester': 'bg-blue-100 text-blue-800',
      'Mid-Term': 'bg-yellow-100 text-yellow-800',
      'Final': 'bg-red-100 text-red-800',
      'Remedial': 'bg-gray-100 text-gray-800'
    };
    return colors[examType] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Examination Management</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" /> Add Examination
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaGraduationCap className="mr-2" />
            {editingId ? 'Edit Examination' : 'Add New Examination'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
              <select
                value={formData.exam_type}
                onChange={(e) => setFormData({ ...formData, exam_type: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Exam Type</option>
                <option value="MSE">MSE</option>
                <option value="ESE">ESE</option>
                <option value="IA-1">IA-1</option>
                <option value="IA-2">IA-2</option>
                <option value="Prelim">Prelim</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g., 2024-25"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Date</label>
              <input
                type="date"
                value={formData.exam_date}
                onChange={(e) => setFormData({ ...formData, exam_date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Result Date</label>
              <input
                type="date"
                value={formData.result_date}
                onChange={(e) => setFormData({ ...formData, result_date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timetable PDF</label>
                    {editingId ? (
    <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500">
      PDF cannot be changed during edit. Current PDF will be preserved.
    </div>
  ) :(
              <input
                type="file"
                accept=".pdf"
                onChange={handleTimetableFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />)}
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Result PDF</label>
              
              <input
                type="file"
                accept=".pdf"
                onChange={handleResultFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification/Instructions</label>
              <textarea
                value={formData.notification}
                onChange={(e) => setFormData({ ...formData, notification: e.target.value })}
                rows="3"
                placeholder="Enter examination notification, instructions, or important notes..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
            >
              <FaSave className="mr-2" /> Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-700 transition-colors"
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
                  Exam Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  semeseter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Year
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Date
                </th> */}
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result Date
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PDF Files
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examinations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No examinations found. Click "Add Examination" to create one.
                  </td>
                </tr>
              ) : (
                examinations.map((examination) => (
                  <tr key={examination.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-1 ${getExamTypeColor(examination.exam_type)}`}>
                          {examination.exam_type}
                        </span>
                        
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {examination.semester}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {examination.notification}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {examination.year}
                    </td>
                    
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {examination.result_date ? formatDate(examination.result_date) : '-'}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-col space-y-1">
                        {examination.timetable_url && (
                          <a
                            href={`http://localhost:3663${examination.timetable_url?.trim()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FaFilePdf className="mr-1" /> Timetable PDF
                          </a>
                        )}
                        {examination.result_pdf_url && (
                          <a
                            href={`http://localhost:3663${examination.result_url?.trim()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <FaFilePdf className="mr-1" /> Result PDF
                          </a>
                        )}
                        {!examination.timetable_pdf_url && !examination.result_pdf_url && (
                          <span className="text-gray-400 text-xs">No result PDFs available</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(examination)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(examination.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {examinations.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              Total examinations: <span className="font-medium">{examinations.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicExaminations;