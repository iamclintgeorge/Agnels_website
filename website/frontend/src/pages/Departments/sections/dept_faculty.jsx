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
    "Information Technology": 6,
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
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-16 font-librefranklin">
          {filteredFaculties.length > 0 ? (
            filteredFaculties.map((faculty) => (
              <div
                key={faculty.id}
                className="cursor-pointer rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <img
                  src={faculty.image || "/img/no_user.jpg"}
                  alt={faculty.name}
                  className="w-full h-40 object-fill rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-black text-center font-librefranklin">
                  {faculty.name}
                </h3>
                <p>{faculty.qualification}</p>
                <p>{faculty.designation}</p>
                <p>{faculty.email_address}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No faculty in this department.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FacultySupportingStaff;
