import db from "../../config/db.js";

// Academic Home Models
// export const academicHomeCreate = async (
//   title,
//   description,
//   hero_image_url,
//   created_by
// ) => {
//   const query = `
//     INSERT INTO academic_home (title, description, hero_image_url, created_by)
//     VALUES (?, ?, ?, ?)
//   `;
//   const values = [title, description, hero_image_url, created_by];

//   try {
//     const [result] = await db.promise().query(query, values);
//     return result;
//   } catch (error) {
//     console.error("Database insertion error:", error);
//     throw error;
//   }
// };

export const academicHomeFetch = async () => {
  const query = `SELECT * FROM infoText WHERE Section = 'academic_home'`;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const academicHomeTextUpdate = async (id, content) => {
  if (!id || id === "undefined") {
    throw new Error("Invalid ID provided for update");
  }

  const query = `
    UPDATE infoText
    SET Content = ? 
    WHERE id = ?;
  `;
  const values = [content, id];

  try {
    const [result] = await db.promise().query(query, values);
    if (result.affectedRows === 0) return null;
    return { id, content };
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

export const getAcademicHomeById = async (id) => {
  const query = `SELECT * FROM academic_home WHERE id = ? AND deleted = '0'`;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result[0];
  } catch (error) {
    console.error("Database select error:", error);
    throw error;
  }
};

export const academicHomeEdit = async (
  id,
  title,
  description,
  hero_image_url,
  created_by
) => {
  const query = `
    UPDATE academic_home 
    SET title = ?, description = ?, hero_image_url = ?, created_by = ? 
    WHERE id = ?
  `;
  const values = [title, description, hero_image_url, created_by, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

export const academicHomeDelete = async (id) => {
  const query = `
    UPDATE academic_home 
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

// Academic Home Section Models
export const academicHomeSectionCreate = async (
  home_id,
  section_type,
  title,
  description,
  icon,
  order_index
) => {
  const query = `
    INSERT INTO academic_home_sections (home_id, section_type, title, description, icon, order_index) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [home_id, section_type, title, description, icon, order_index];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

export const academicHomeSectionEdit = async (
  id,
  section_type,
  title,
  description,
  icon,
  order_index,
  is_active
) => {
  const query = `
    UPDATE academic_home_sections 
    SET section_type = ?, title = ?, description = ?, icon = ?, order_index = ?, is_active = ?
    WHERE id = ?
  `;
  const values = [
    section_type,
    title,
    description,
    icon,
    order_index,
    is_active,
    id,
  ];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

export const academicHomeSectionDelete = async (id) => {
  const query = `
    UPDATE academic_home_sections 
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

// Academic Admin Card Models
export const academicHomeAdminCardCreate = async (
  section_id,
  title,
  description,
  icon,
  order_index
) => {
  const query = `
    INSERT INTO academic_admin_cards (section_id, title, description, icon, order_index) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [section_id, title, description, icon, order_index];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

export const academicHomeAdminCardEdit = async (
  id,
  title,
  description,
  icon,
  order_index,
  is_active
) => {
  const query = `
    UPDATE academic_admin_cards 
    SET title = ?, description = ?, icon = ?, order_index = ?, is_active = ?
    WHERE id = ?
  `;
  const values = [title, description, icon, order_index, is_active, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

export const academicHomeAdminCardDelete = async (id) => {
  const query = `
    UPDATE academic_admin_cards 
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

// Academic Handbook Models
export const academicHandbookCreate = async (
  title,
  description,
  pdf_url,
  handbook_type,
  created_by
) => {
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
export const getHandbookById = async (id) => {
  const query = `SELECT * FROM academic_handbooks WHERE id = ?`;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result[0];
  } catch (error) {
    console.error("Database select error:", error);
    throw error;
  }
};

export const academicHandbookEdit = async (
  id,
  title,
  description,
  pdf_url,
  handbook_type,
  created_by
) => {
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
export const academicCalendarCreate = async (
  year,
  semester,
  issue_date,
  pdf_url,
  description,
  created_by
) => {
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
export const getCalendarById = async (id) => {
  const query = `SELECT * FROM academic_calendar WHERE id = ?`;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result[0];
  } catch (error) {
    console.error("Database select error:", error);
    throw error;
  }
};

export const academicCalendarEdit = async (
  id,
  year,
  semester,
  issue_date,
  pdf_url,
  description,
  created_by
) => {
  console.log("issue_date: ", issue_date);
  const query = `
    UPDATE academic_calendar 
    SET year = ?, semester = ?, issue_date = ?, pdf_url = ?, description = ?, created_by = ? 
    WHERE id = ?
  `;
  const values = [
    year,
    semester,
    issue_date,
    pdf_url,
    description,
    created_by,
    id,
  ];

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
// export const examinationCreate = async (
//   exam_type,
//   semester,
//   year,
//   timetable_url,
//   result_url,
//   notification,
//   created_by
// ) => {
//   console.log(exam_type, "created_by:", created_by);
//   const query = `
//     INSERT INTO examinations (exam_type, semester, year, timetable_url, result_url, notification, created_by)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;
//   const values = [
//     exam_type,
//     semester,
//     year,
//     timetable_url,
//     result_url,
//     notification,
//     created_by,
//   ];

//   try {
//     const [result] = await db.promise().query(query, values);
//     return result;
//   } catch (error) {
//     console.error("Database insertion error:", error);
//     throw error;
//   }
// };

// export const examinationFetch = async () => {
//   const query = `
//     SELECT * FROM examinations
//     WHERE deleted = '0'
//     ORDER BY created_at DESC
//   `;

//   try {
//     const [rows] = await db.promise().query(query);
//     return rows;
//   } catch (error) {
//     console.error("Database fetch error:", error);
//     throw error;
//   }
// };
// export const getExaminationById = async (id) => {
//   const query = `SELECT * FROM examinations WHERE id = ?`;

//   try {
//     const [result] = await db.promise().query(query, [id]);
//     return result[0];
//   } catch (error) {
//     console.error("Database select error:", error);
//     throw error;
//   }
// };

// export const examinationEdit = async (
//   id,
//   exam_type,
//   semester,
//   year,
//   timetable_url,
//   result_url,
//   notification,
//   created_by
// ) => {
//   const query = `
//     UPDATE examinations
//     SET exam_type = ?, semester = ?, year = ?, timetable_url = ?, result_url = ?, notification = ?, created_by = ?
//     WHERE id = ?
//   `;
//   const values = [
//     exam_type,
//     semester,
//     year,
//     timetable_url,
//     result_url,
//     notification,
//     created_by,
//     id,
//   ];

//   try {
//     const [result] = await db.promise().query(query, values);
//     return result;
//   } catch (error) {
//     console.error("Database update error:", error);
//     throw error;
//   }
// };

// export const examinationDelete = async (id) => {
//   const query = `
//     UPDATE examinations
//     SET deleted = '1'
//     WHERE id = ?
//   `;

//   try {
//     const [result] = await db.promise().query(query, [id]);
//     return result;
//   } catch (error) {
//     console.error("Database deletion error:", error);
//     throw error;
//   }
// };

// Academic Links Models
export const getAcademicLinkById = async (id) => {
  const query = `SELECT * FROM academic_links WHERE id = ?`;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result[0];
  } catch (error) {
    console.error("Database select error:", error);
    throw error;
  }
};
export const academicLinksCreate = async (
  title,
  description,
  url,
  link_type,
  created_by
) => {
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

export const academicLinksEdit = async (
  id,
  title,
  description,
  url,
  link_type,
  created_by
) => {
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
export const stakeholderFeedbackCreate = async (
  title,
  description,
  pdf_url,
  feedback_type,
  created_by
) => {
  const query = `
    INSERT INTO stakeholder_feedback (title, description, pdf_url, feedback_type, created_by)
    VALUES (?, ?, ?, 'syllabus', '1')
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
export const getFeedbackById = async (id) => {
  const query = `SELECT * FROM stakeholder_feedback WHERE id = ?`;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result[0];
  } catch (error) {
    console.error("Database select error:", error);
    throw error;
  }
};

export const stakeholderFeedbackEdit = async (
  id,
  title,
  description,
  pdf_url,
  feedback_type,
  created_by
) => {
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

// ==================== EXAMINATIONS TIMETABLE CRUD ====================

// Create examination timetable
export const examinationCreate = async (
  title,
  description,
  academic_year,
  semester,
  exam_type,
  pdf_url
) => {
  const query = `
    INSERT INTO examinations (title, description, academic_year, semester, exam_type, pdf_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    title,
    description,
    academic_year,
    semester,
    exam_type,
    pdf_url,
  ];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

// Fetch all examinations grouped by academic year and semester
export const examinationFetch = async () => {
  const query = `
    SELECT id, title, description, academic_year, semester, exam_type, pdf_url, is_active, created_at
    FROM examinations 
    WHERE is_active = TRUE 
    ORDER BY academic_year DESC, semester, exam_type
  `;

  try {
    const [rows] = await db.promise().query(query);

    // Group by academic year and semester to match frontend structure
    const grouped = {};
    rows.forEach((row) => {
      if (!grouped[row.academic_year]) {
        grouped[row.academic_year] = {};
      }
      if (!grouped[row.academic_year][row.semester]) {
        grouped[row.academic_year][row.semester] = [];
      }
      grouped[row.academic_year][row.semester].push({
        name: row.exam_type,
        link: row.pdf_url,
        id: row.id,
        title: row.title,
        description: row.description,
      });
    });

    return grouped;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Get examination by ID
export const getExaminationById = async (id) => {
  const query = `SELECT * FROM examinations WHERE id = ? AND is_active = TRUE`;

  try {
    const [rows] = await db.promise().query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Edit examination
export const examinationEdit = async (
  id,
  title,
  description,
  academic_year,
  semester,
  exam_type,
  pdf_url
) => {
  const query = `
    UPDATE examinations 
    SET title = ?, description = ?, academic_year = ?, semester = ?, exam_type = ?, pdf_url = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const values = [
    title,
    description,
    academic_year,
    semester,
    exam_type,
    pdf_url,
    id,
  ];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

// Delete examination (soft delete)
export const examinationDelete = async (id) => {
  const query = `UPDATE examinations SET is_active = FALSE WHERE id = ?`;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database delete error:", error);
    throw error;
  }
};

// ==================== EXAMINATION SLIDES CRUD ====================

// Create slide
export const examinationSlideCreate = async (
  title,
  image_url,
  display_order
) => {
  const query = `
    INSERT INTO examination_slides (title, image_url, display_order)
    VALUES (?, ?, ?)
  `;
  const values = [title, image_url, display_order];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

// Fetch all slides
export const examinationSlidesFetch = async () => {
  const query = `
    SELECT id, title, image_url, display_order, is_active, created_at
    FROM examination_slides 
    WHERE is_active = TRUE 
    ORDER BY display_order ASC
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      image: row.image_url,
      display_order: row.display_order,
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Get slide by ID
export const getExaminationSlideById = async (id) => {
  const query = `SELECT * FROM examination_slides WHERE id = ? AND is_active = TRUE`;

  try {
    const [rows] = await db.promise().query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Edit slide
export const examinationSlideEdit = async (
  id,
  title,
  image_url,
  display_order
) => {
  const query = `
    UPDATE examination_slides 
    SET title = ?, image_url = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const values = [title, image_url, display_order, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

// Delete slide
export const examinationSlideDelete = async (id) => {
  const query = `UPDATE examination_slides SET is_active = FALSE WHERE id = ?`;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database delete error:", error);
    throw error;
  }
};

// ==================== EXAMINATION NOTIFICATIONS CRUD ====================

// Create notification
export const examinationNotificationCreate = async (
  title,
  description,
  is_new
) => {
  const query = `
    INSERT INTO examination_notifications (title, description, is_new)
    VALUES (?, ?, ?)
  `;
  const values = [title, description, is_new];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

// Fetch all notifications
export const examinationNotificationsFetch = async () => {
  const query = `
    SELECT id, title, description, is_new, is_active, created_at
    FROM examination_notifications 
    WHERE is_active = TRUE 
    ORDER BY created_at DESC
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      isNew: row.is_new,
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Get notification by ID
export const getExaminationNotificationById = async (id) => {
  const query = `SELECT * FROM examination_notifications WHERE id = ? AND is_active = TRUE`;

  try {
    const [rows] = await db.promise().query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Edit notification
export const examinationNotificationEdit = async (
  id,
  title,
  description,
  is_new
) => {
  const query = `
    UPDATE examination_notifications 
    SET title = ?, description = ?, is_new = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const values = [title, description, is_new, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

// Delete notification
export const examinationNotificationDelete = async (id) => {
  const query = `UPDATE examination_notifications SET is_active = FALSE WHERE id = ?`;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database delete error:", error);
    throw error;
  }
};

// ==================== EXAMINATION FORMS CRUD ====================

// Create form
export const examinationFormCreate = async (name, description, pdf_url) => {
  const query = `
    INSERT INTO examination_forms (name, description, pdf_url)
    VALUES (?, ?, ?)
  `;
  const values = [name, description, pdf_url];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

// Fetch all forms
export const examinationFormsFetch = async () => {
  const query = `
    SELECT id, name, description, pdf_url, is_active, created_at
    FROM examination_forms 
    WHERE is_active = TRUE 
    ORDER BY created_at DESC
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      link: row.pdf_url,
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Get form by ID
export const getExaminationFormById = async (id) => {
  const query = `SELECT * FROM examination_forms WHERE id = ? AND is_active = TRUE`;

  try {
    const [rows] = await db.promise().query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Edit form
export const examinationFormEdit = async (id, name, description, pdf_url) => {
  const query = `
    UPDATE examination_forms 
    SET name = ?, description = ?, pdf_url = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const values = [name, description, pdf_url, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

// Delete form
export const examinationFormDelete = async (id) => {
  const query = `UPDATE examination_forms SET is_active = FALSE WHERE id = ?`;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database delete error:", error);
    throw error;
  }
};

// ==================== EXAMINATION ARCHIVES CRUD ====================

// Create archive
export const examinationArchiveCreate = async (year, title, pdf_url) => {
  const query = `
    INSERT INTO examination_archives (year, title, pdf_url)
    VALUES (?, ?, ?)
  `;
  const values = [year, title, pdf_url];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};

// Fetch all archives
export const examinationArchivesFetch = async () => {
  const query = `
    SELECT id, year, title, pdf_url, is_active, created_at
    FROM examination_archives 
    WHERE is_active = TRUE 
    ORDER BY year DESC
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows.map((row) => ({
      id: row.id,
      year: row.year,
      title: row.title,
      link: row.pdf_url,
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Get archive by ID
export const getExaminationArchiveById = async (id) => {
  const query = `SELECT * FROM examination_archives WHERE id = ? AND is_active = TRUE`;

  try {
    const [rows] = await db.promise().query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

// Edit archive
export const examinationArchiveEdit = async (id, year, title, pdf_url) => {
  const query = `
    UPDATE examination_archives 
    SET year = ?, title = ?, pdf_url = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const values = [year, title, pdf_url, id];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

// Delete archive
export const examinationArchiveDelete = async (id) => {
  const query = `UPDATE examination_archives SET is_active = FALSE WHERE id = ?`;

  try {
    const [result] = await db.promise().query(query, [id]);
    return result;
  } catch (error) {
    console.error("Database delete error:", error);
    throw error;
  }
};
