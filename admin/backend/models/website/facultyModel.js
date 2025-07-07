import db from "../../config/db.js";

// Get all faculties by department
export const getFacultiesByDepartment = async (departmentId) => {
  const query = `
    SELECT 
      id, 
      department_id, 
      sr_no, 
      name, 
      qualification, 
      designation, 
      email_address, 
      joining_date, 
      image, 
      teaching_staff,
      created_timestamp
    FROM faculties 
    WHERE department_id = ? 
    ORDER BY sr_no ASC;
  `;

  try {
    const [rows] = await db.query(query, [departmentId]);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Get faculty by ID with all related data
export const getFacultyById = async (facultyId) => {
  const facultyQuery = `
    SELECT 
      id, 
      department_id, 
      sr_no, 
      name, 
      qualification, 
      designation, 
      email_address, 
      joining_date, 
      image, 
      teaching_staff,
      created_timestamp
    FROM faculties 
    WHERE id = ?;
  `;

  try {
    const [facultyRows] = await db.query(facultyQuery, [facultyId]);
    
    if (facultyRows.length === 0) {
      return null;
    }

    const faculty = facultyRows[0];

    // Get faculty resumes
    const resumeQuery = `
      SELECT id, attachment 
      FROM faculty_resumes 
      WHERE faculty_id = ?;
    `;
    const [resumes] = await db.query(resumeQuery, [facultyId]);

    // Get faculty publications
    const publicationQuery = `
      SELECT id, attachment 
      FROM faculty_publications 
      WHERE faculty_id = ?;
    `;
    const [publications] = await db.query(publicationQuery, [facultyId]);

    // Get faculty online profiles
    const profileQuery = `
      SELECT id, description, created_by, created_timestamp 
      FROM faculty_online_profiles 
      WHERE faculty_id = ?;
    `;
    const [profiles] = await db.query(profileQuery, [facultyId]);

    // Get faculty specializations
    const specializationQuery = `
      SELECT id, description, created_by, created_timestamp 
      FROM faculty_specializations 
      WHERE faculty_id = ?;
    `;
    const [specializations] = await db.query(specializationQuery, [facultyId]);

    // Get faculty subjects
    const subjectQuery = `
      SELECT id, subject, type, semester, created_by, created_timestamp 
      FROM faculty_subjects 
      WHERE faculty_id = ?;
    `;
    const [subjects] = await db.query(subjectQuery, [facultyId]);

    // Get faculty papers
    const paperQuery = `
      SELECT id, sr_no, title, description, link, created_by, created_timestamp 
      FROM faculty_papers 
      WHERE faculty_id = ? 
      ORDER BY sr_no ASC;
    `;
    const [papers] = await db.query(paperQuery, [facultyId]);

    // Get faculty researches
    const researchQuery = `
      SELECT id, title, grant_type, funding_organization, amount, duration, created_by, created_timestamp 
      FROM faculty_researches 
      WHERE faculty_id = ?;
    `;
    const [researches] = await db.query(researchQuery, [facultyId]);

    return {
      ...faculty,
      resumes,
      publications,
      online_profiles: profiles,
      specializations,
      subjects,
      papers,
      researches
    };
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Get all faculties (for admin)
export const getAllFaculties = async () => {
  const query = `
    SELECT 
      id, 
      department_id, 
      sr_no, 
      name, 
      qualification, 
      designation, 
      email_address, 
      joining_date, 
      image, 
      teaching_staff,
      created_timestamp
    FROM faculties 
    ORDER BY department_id ASC, sr_no ASC;
  `;

  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Create new faculty
export const createFaculty = async (facultyData) => {
  const query = `
    INSERT INTO faculties (
      department_id, 
      sr_no, 
      name, 
      qualification, 
      designation, 
      email_address, 
      joining_date, 
      image, 
      teaching_staff
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await db.query(query, [
      facultyData.department_id,
      facultyData.sr_no,
      facultyData.name,
      facultyData.qualification,
      facultyData.designation,
      facultyData.email_address,
      facultyData.joining_date,
      facultyData.image || '/img/no_user.jpg',
      facultyData.teaching_staff
    ]);
    
    return { id: result.insertId, ...facultyData };
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
};

// Update faculty
export const updateFaculty = async (facultyId, facultyData) => {
  const query = `
    UPDATE faculties 
    SET 
      department_id = ?, 
      sr_no = ?, 
      name = ?, 
      qualification = ?, 
      designation = ?, 
      email_address = ?, 
      joining_date = ?, 
      image = ?, 
      teaching_staff = ?
    WHERE id = ?;
  `;

  try {
    const [result] = await db.query(query, [
      facultyData.department_id,
      facultyData.sr_no,
      facultyData.name,
      facultyData.qualification,
      facultyData.designation,
      facultyData.email_address,
      facultyData.joining_date,
      facultyData.image,
      facultyData.teaching_staff,
      facultyId
    ]);
    
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

// Delete faculty
export const deleteFaculty = async (facultyId) => {
  const query = `DELETE FROM faculties WHERE id = ?;`;

  try {
    const [result] = await db.query(query, [facultyId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Database delete error:", error);
    throw error;
  }
};

// Add faculty resume
export const addFacultyResume = async (facultyId, attachment) => {
  const query = `
    INSERT INTO faculty_resumes (faculty_id, attachment) 
    VALUES (?, ?);
  `;

  try {
    const [result] = await db.query(query, [facultyId, attachment]);
    return { id: result.insertId, faculty_id: facultyId, attachment };
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
};

// Add faculty publication
export const addFacultyPublication = async (facultyId, attachment) => {
  const query = `
    INSERT INTO faculty_publications (faculty_id, attachment) 
    VALUES (?, ?);
  `;

  try {
    const [result] = await db.query(query, [facultyId, attachment]);
    return { id: result.insertId, faculty_id: facultyId, attachment };
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
};

// Add faculty online profile
export const addFacultyOnlineProfile = async (facultyId, description, createdBy) => {
  const query = `
    INSERT INTO faculty_online_profiles (faculty_id, description, created_by) 
    VALUES (?, ?, ?);
  `;

  try {
    const [result] = await db.query(query, [facultyId, description, createdBy]);
    return { id: result.insertId, faculty_id: facultyId, description, created_by: createdBy };
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
};

// Add faculty specialization
export const addFacultySpecialization = async (facultyId, description, createdBy) => {
  const query = `
    INSERT INTO faculty_specializations (faculty_id, description, created_by) 
    VALUES (?, ?, ?);
  `;

  try {
    const [result] = await db.query(query, [facultyId, description, createdBy]);
    return { id: result.insertId, faculty_id: facultyId, description, created_by: createdBy };
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
};

// Add faculty subject
export const addFacultySubject = async (facultyId, subject, type, semester, createdBy) => {
  const query = `
    INSERT INTO faculty_subjects (faculty_id, subject, type, semester, created_by) 
    VALUES (?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await db.query(query, [facultyId, subject, type, semester, createdBy]);
    return { id: result.insertId, faculty_id: facultyId, subject, type, semester, created_by: createdBy };
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
};

// Add faculty paper
export const addFacultyPaper = async (facultyId, srNo, title, description, link, createdBy) => {
  const query = `
    INSERT INTO faculty_papers (faculty_id, sr_no, title, description, link, created_by) 
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await db.query(query, [facultyId, srNo, title, description, link, createdBy]);
    return { id: result.insertId, faculty_id: facultyId, sr_no: srNo, title, description, link, created_by: createdBy };
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
};

// Add faculty research
export const addFacultyResearch = async (facultyId, title, grantType, fundingOrganization, amount, duration, createdBy) => {
  const query = `
    INSERT INTO faculty_researches (faculty_id, title, grant_type, funding_organization, amount, duration, created_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await db.query(query, [facultyId, title, grantType, fundingOrganization, amount, duration, createdBy]);
    return { 
      id: result.insertId, 
      faculty_id: facultyId, 
      title, 
      grant_type: grantType, 
      funding_organization: fundingOrganization, 
      amount, 
      duration, 
      created_by: createdBy 
    };
  } catch (error) {
    console.error("Database insert error:", error);
    throw error;
  }
}; 