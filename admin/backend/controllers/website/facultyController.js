import {
  getFacultiesByDepartment,
  getFacultyById,
  getAllFaculties,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  addFacultyResume,
  addFacultyPublication,
  addFacultyOnlineProfile,
  addFacultySpecialization,
  addFacultySubject,
  addFacultyPaper,
  addFacultyResearch,
} from "../../models/website/facultyModel.js";

// Department ID mapping
const DEPARTMENT_IDS = {
  computer: 1,
  mechanical: 2,
  electrical: 3,
  extc: 4,
  cse: 5,
  bsh: 6,
};

// Get faculties by department name
export const getFacultiesByDepartmentController = async (req, res) => {
  try {
    const { department } = req.params;
    
    if (!department) {
      return res.status(400).json({ error: "Department is required" });
    }

    const departmentId = DEPARTMENT_IDS[department.toLowerCase()];
    if (!departmentId) {
      return res.status(400).json({ 
        error: "Invalid department. Valid departments: computer, mechanical, electrical, extc, cse, bsh" 
      });
    }

    const faculties = await getFacultiesByDepartment(departmentId);
    res.json({
      success: true,
      data: faculties,
      department: department,
      departmentId: departmentId
    });
  } catch (error) {
    console.error("Error in getFacultiesByDepartmentController:", error);
    res.status(500).json({ error: "Error fetching faculties" });
  }
};

// Get faculty details by ID
export const getFacultyByIdController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    
    if (!facultyId) {
      return res.status(400).json({ error: "Faculty ID is required" });
    }

    const faculty = await getFacultyById(facultyId);
    
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json({
      success: true,
      data: faculty
    });
  } catch (error) {
    console.error("Error in getFacultyByIdController:", error);
    res.status(500).json({ error: "Error fetching faculty details" });
  }
};

// Get all faculties (admin)
export const getAllFacultiesController = async (req, res) => {
  try {
    const faculties = await getAllFaculties();
    res.json({
      success: true,
      data: faculties
    });
  } catch (error) {
    console.error("Error in getAllFacultiesController:", error);
    res.status(500).json({ error: "Error fetching all faculties" });
  }
};

// Create new faculty
export const createFacultyController = async (req, res) => {
  try {
    const facultyData = req.body;
    
    // Validate required fields
    const requiredFields = [
      'department_id', 'sr_no', 'name', 'qualification', 
      'designation', 'email_address', 'joining_date', 'teaching_staff'
    ];
    
    for (const field of requiredFields) {
      if (!facultyData[field] && facultyData[field] !== 0) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const newFaculty = await createFaculty(facultyData);
    res.status(201).json({
      success: true,
      data: newFaculty,
      message: "Faculty created successfully"
    });
  } catch (error) {
    console.error("Error in createFacultyController:", error);
    res.status(500).json({ error: "Error creating faculty" });
  }
};

// Update faculty
export const updateFacultyController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const facultyData = req.body;
    
    if (!facultyId) {
      return res.status(400).json({ error: "Faculty ID is required" });
    }

    const success = await updateFaculty(facultyId, facultyData);
    
    if (!success) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json({
      success: true,
      message: "Faculty updated successfully"
    });
  } catch (error) {
    console.error("Error in updateFacultyController:", error);
    res.status(500).json({ error: "Error updating faculty" });
  }
};

// Delete faculty
export const deleteFacultyController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    
    if (!facultyId) {
      return res.status(400).json({ error: "Faculty ID is required" });
    }

    const success = await deleteFaculty(facultyId);
    
    if (!success) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json({
      success: true,
      message: "Faculty deleted successfully"
    });
  } catch (error) {
    console.error("Error in deleteFacultyController:", error);
    res.status(500).json({ error: "Error deleting faculty" });
  }
};

// Add faculty resume
export const addFacultyResumeController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { attachment } = req.body;
    
    if (!facultyId || !attachment) {
      return res.status(400).json({ error: "Faculty ID and attachment are required" });
    }

    const resume = await addFacultyResume(facultyId, attachment);
    res.status(201).json({
      success: true,
      data: resume,
      message: "Resume added successfully"
    });
  } catch (error) {
    console.error("Error in addFacultyResumeController:", error);
    res.status(500).json({ error: "Error adding resume" });
  }
};

// Add faculty publication
export const addFacultyPublicationController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { attachment } = req.body;
    
    if (!facultyId || !attachment) {
      return res.status(400).json({ error: "Faculty ID and attachment are required" });
    }

    const publication = await addFacultyPublication(facultyId, attachment);
    res.status(201).json({
      success: true,
      data: publication,
      message: "Publication added successfully"
    });
  } catch (error) {
    console.error("Error in addFacultyPublicationController:", error);
    res.status(500).json({ error: "Error adding publication" });
  }
};

// Add faculty online profile
export const addFacultyOnlineProfileController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { description, created_by } = req.body;
    
    if (!facultyId || !description) {
      return res.status(400).json({ error: "Faculty ID and description are required" });
    }

    const profile = await addFacultyOnlineProfile(facultyId, description, created_by || 1);
    res.status(201).json({
      success: true,
      data: profile,
      message: "Online profile added successfully"
    });
  } catch (error) {
    console.error("Error in addFacultyOnlineProfileController:", error);
    res.status(500).json({ error: "Error adding online profile" });
  }
};

// Add faculty specialization
export const addFacultySpecializationController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { description, created_by } = req.body;
    
    if (!facultyId || !description) {
      return res.status(400).json({ error: "Faculty ID and description are required" });
    }

    const specialization = await addFacultySpecialization(facultyId, description, created_by || 1);
    res.status(201).json({
      success: true,
      data: specialization,
      message: "Specialization added successfully"
    });
  } catch (error) {
    console.error("Error in addFacultySpecializationController:", error);
    res.status(500).json({ error: "Error adding specialization" });
  }
};

// Add faculty subject
export const addFacultySubjectController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { subject, type, semester, created_by } = req.body;
    
    if (!facultyId || !subject || !type || !semester) {
      return res.status(400).json({ error: "Faculty ID, subject, type, and semester are required" });
    }

    const facultySubject = await addFacultySubject(facultyId, subject, type, semester, created_by || 1);
    res.status(201).json({
      success: true,
      data: facultySubject,
      message: "Subject added successfully"
    });
  } catch (error) {
    console.error("Error in addFacultySubjectController:", error);
    res.status(500).json({ error: "Error adding subject" });
  }
};

// Add faculty paper
export const addFacultyPaperController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { sr_no, title, description, link, created_by } = req.body;
    
    if (!facultyId || !sr_no || !title || !description || !link) {
      return res.status(400).json({ error: "Faculty ID, sr_no, title, description, and link are required" });
    }

    const paper = await addFacultyPaper(facultyId, sr_no, title, description, link, created_by || 1);
    res.status(201).json({
      success: true,
      data: paper,
      message: "Paper added successfully"
    });
  } catch (error) {
    console.error("Error in addFacultyPaperController:", error);
    res.status(500).json({ error: "Error adding paper" });
  }
};

// Add faculty research
export const addFacultyResearchController = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { title, grant_type, funding_organization, amount, duration, created_by } = req.body;
    
    if (!facultyId || !title || !grant_type || !funding_organization || !amount || !duration) {
      return res.status(400).json({ 
        error: "Faculty ID, title, grant_type, funding_organization, amount, and duration are required" 
      });
    }

    const research = await addFacultyResearch(
      facultyId, title, grant_type, funding_organization, amount, duration, created_by || 1
    );
    res.status(201).json({
      success: true,
      data: research,
      message: "Research added successfully"
    });
  } catch (error) {
    console.error("Error in addFacultyResearchController:", error);
    res.status(500).json({ error: "Error adding research" });
  }
}; 