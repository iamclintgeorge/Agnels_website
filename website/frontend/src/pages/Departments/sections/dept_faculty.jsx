import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is imported

const FacultySupportingStaff = ({ departmentName }) => {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState(null); // State for department selection
  const [loading, setLoading] = useState(false);

  const dept_url = {
    "Computer Engineering": 2,
    "Mechanical Engineering": 5,
    "Electronics and Telecommunication Engineering": 1,
    "Electrical Engineering": 4,
    "Computer Science and Engineering (Prev. IT)": 6,
    "Basic Science and Humanities": 3,
  };

  // Use departmentName prop to get department_id directly from dept_url
  const department_id = dept_url[departmentName];

  useEffect(() => {
    // Set selectedDeptId directly based on departmentName
    if (department_id) {
      setSelectedDeptId(department_id);
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [deptRes, facRes] = await Promise.all([
          axios.get("http://localhost:3663/api/faculties/departments"),
          axios.get("http://localhost:3663/api/faculties?limit=1000"),
        ]);
        setDepartments(deptRes.data);
        setFaculties(facRes.data);
      } catch (e) {
        console.error(e);
        alert("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [department_id]); // Re-run the effect when department_id changes

  // Filter faculties based on selectedDeptId
  const filteredFaculties = faculties.filter(
    (f) => f.department_id === selectedDeptId
  );

  return (
    <div className="faculty-supporting-staff-section">
      {loading ? (
        <div className="text-center text-gray-500 py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0c2340]"></div>
          <p className="mt-2 text-sm">Loading faculty information...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {filteredFaculties.length > 0 ? (
            filteredFaculties.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden group h-80 flex flex-col"
              >
                {/* Faculty Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={faculty.image || "/img/no_user.jpg"}
                    alt={faculty.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Faculty Information */}
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-[#0c2340] mb-3 text-center font-librefranklin leading-tight">
                    {faculty.name}
                  </h3>

                  <div className="space-y-2 text-center">
                    {faculty.designation && (
                      <p className="text-sm font-medium text-[#AE9142] font-librefranklin">
                        {faculty.designation}
                      </p>
                    )}

                    {faculty.qualification && (
                      <p className="text-xs text-gray-600 font-librefranklin leading-relaxed">
                        {faculty.qualification}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-200">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2 font-librefranklin">
                  No Faculty Found
                </h3>
                <p className="text-gray-500 font-librefranklin">
                  No faculty members are currently listed for this department.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FacultySupportingStaff;
