import db from "../../config/db.js";

// Academic Handbook Models
export const academicHandbookCreate = async (title, description, pdf_url, handbook_type, created_by) => {
  const query = `
    INSERT INTO academic_handbooks (title, description, pdf_url, handbook_type, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [title, description, pdf_url, handbook_type, created_by];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

export const academicHandbookFetch = async () => {
  const query = `
    SELECT * FROM academic_handbooks 
    WHERE deleted = '0' 
    ORDER BY created_at DESC
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const academicHandbookEdit = async (id, title, description, pdf_url, handbook_type, created_by) => {
  const query = `
    UPDATE academic_handbooks 
    SET title = ?, description = ?, pdf_url = ?, handbook_type = ?, created_by = ? 
    WHERE id = ?
  `;
  const values = [title, description, pdf_url, handbook_type, created_by, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

export const academicHandbookDelete = async (id) => {
  const query = `
    UPDATE academic_handbooks 
    SET deleted = '1' 
    WHERE id = ?
  `;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database deletion error:", error);
    throw error;
  }
};

// Academic Calendar Models
export const academicCalendarCreate = async (year, semester, issue_date, pdf_url, description, created_by) => {
  const query = `
    INSERT INTO academic_calendar (year, semester, issue_date, pdf_url, description, created_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [year, semester, issue_date, pdf_url, description, created_by];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

export const academicCalendarFetch = async () => {
  const query = `
    SELECT * FROM academic_calendar 
    WHERE deleted = '0' 
    ORDER BY issue_date DESC
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const academicCalendarEdit = async (id, year, semester, issue_date, pdf_url, description, created_by) => {
  const query = `
    UPDATE academic_calendar 
    SET year = ?, semester = ?, issue_date = ?, pdf_url = ?, description = ?, created_by = ? 
    WHERE id = ?
  `;
  const values = [year, semester, issue_date, pdf_url, description, created_by, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

export const academicCalendarDelete = async (id) => {
  const query = `
    UPDATE academic_calendar 
    SET deleted = '1' 
    WHERE id = ?
  `;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database deletion error:", error);
    throw error;
  }
};

// Examination Models
export const examinationCreate = async (exam_type, semester, year, timetable_url, result_url, notification, created_by) => {
  console.log(exam_type)
  const query = `
    INSERT INTO examinations (exam_type, semester, year, timetable_url, result_url, notification, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [exam_type, semester, year, timetable_url, result_url, notification, created_by];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

export const examinationFetch = async () => {
  const query = `
    SELECT * FROM examinations 
    WHERE deleted = '0' 
    ORDER BY created_at DESC
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const examinationEdit = async (id, exam_type, semester, year, timetable_url, result_url, notification, created_by) => {
  const query = `
    UPDATE examinations 
    SET exam_type = ?, semester = ?, year = ?, timetable_url = ?, result_url = ?, notification = ?, created_by = ? 
    WHERE id = ?
  `;
  const values = [exam_type, semester, year, timetable_url, result_url, notification, created_by, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

export const examinationDelete = async (id) => {
  const query = `
    UPDATE examinations 
    SET deleted = '1' 
    WHERE id = ?
  `;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database deletion error:", error);
    throw error;
  }
};

// Academic Links Models
export const academicLinksCreate = async (title, description, url, link_type, created_by) => {
  const query = `
    INSERT INTO academic_links (title, description, url, link_type, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [title, description, url, link_type, created_by];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

export const academicLinksFetch = async () => {
  const query = `
    SELECT * FROM academic_links 
    WHERE deleted = '0' 
    ORDER BY created_at DESC
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const academicLinksEdit = async (id, title, description, url, link_type, created_by) => {
  const query = `
    UPDATE academic_links 
    SET title = ?, description = ?, url = ?, link_type = ?, created_by = ? 
    WHERE id = ?
  `;
  const values = [title, description, url, link_type, created_by, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

export const academicLinksDelete = async (id) => {
  const query = `
    UPDATE academic_links 
    SET deleted = '1' 
    WHERE id = ?
  `;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database deletion error:", error);
    throw error;
  }
};

// Stakeholder Feedback Models
export const stakeholderFeedbackCreate = async (title, description, pdf_url, feedback_type, created_by) => {
  const query = `
    INSERT INTO stakeholder_feedback (title, description, pdf_url, feedback_type, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [title, description, pdf_url, feedback_type, created_by];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

export const stakeholderFeedbackFetch = async () => {
  const query = `
    SELECT * FROM stakeholder_feedback 
    WHERE deleted = '0' 
    ORDER BY created_at DESC
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const stakeholderFeedbackEdit = async (id, title, description, pdf_url, feedback_type, created_by) => {
  const query = `
    UPDATE stakeholder_feedback 
    SET title = ?, description = ?, pdf_url = ?, feedback_type = ?, created_by = ? 
    WHERE id = ?
  `;
  const values = [title, description, pdf_url, feedback_type, created_by, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

export const stakeholderFeedbackDelete = async (id) => {
  const query = `
    UPDATE stakeholder_feedback 
    SET deleted = '1' 
    WHERE id = ?
  `;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database deletion error:", error);
    throw error;
  }
};