import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeptStaffs = () => {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/faculty/department/computer"
      );
      if (response.data.success) {
        setFaculties(response.data.data);
      }
    } catch (err) {
      console.error("Error loading faculties:", err);
      toast.error("Error fetching faculty data");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (facultyId) => {
    navigate(`/faculty-profile/${facultyId}`);
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading faculty data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Computer Engineering - Faculty & Supporting Staff
      </h2>

      {faculties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {faculties.map((faculty) => (
            <div
              key={faculty.id}
              onClick={() => handleCardClick(faculty.id)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 overflow-hidden"
            >
              <div className="p-4">
                {/* Faculty Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={
                      faculty.image && faculty.image !== "/img/no_user.jpg"
                        ? `http://localhost:3663${faculty.image}`
                        : "/default-avatar.png"
                    }
                    alt={faculty.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                </div>

                {/* Faculty Details */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {faculty.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Qualification:</span>{" "}
                    {faculty.qualification}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Designation:</span>{" "}
                    {faculty.designation}
                  </p>
                  <p className="text-sm text-blue-600 hover:text-blue-800 mb-2">
                    {faculty.email_address}
                  </p>

                  {/* Staff Type Badge */}
                  <div className="mt-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        faculty.teaching_staff
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {faculty.teaching_staff
                        ? "Teaching Staff"
                        : "Supporting Staff"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Click to view more info */}
              <div className="bg-gray-50 px-4 py-3 text-center">
                <p className="text-xs text-gray-500">
                  Click to view full profile
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No faculty data available.</p>
        </div>
      )}
    </div>
  );
};

export default DeptStaffs;
