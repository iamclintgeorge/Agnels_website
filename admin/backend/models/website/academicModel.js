import db from "../../config/db.js";

// Academic Home Models
export const academicHomeCreate = async (title, description, hero_image_url, created_by) => {
  const query = `
    INSERT INTO academic_home (title, description, hero_image_url, created_by) 
    VALUES (?, ?, ?, ?)
  `;
  const values = [title, description, hero_image_url, created_by];

  try {
    const [result] = await db.promise().query(query, values);
    return result;
  } catch (error) {
    console.error("Database insertion error:", error);
    throw error;
  }
};
// export const academicHomeFetch = async () => {
//   const query = `
//     SELECT 
//       h.*,
//       CONCAT('[', GROUP_CONCAT(
//         CONCAT(
//           '{',
//             '"id":', s.id, ',',
//             '"section_type":"', s.section_type, '",',
//             '"title":"', REPLACE(s.title, '"', '\\"'), '",',
//             '"description":"', REPLACE(s.description, '"', '\\"'), '",',
//             '"icon":"', s.icon, '",',
//             '"order_index":', s.order_index, ',',
//             '"is_active":', s.is_active, ',',
//             '"admin_cards":', (
//               SELECT CONCAT('[', GROUP_CONCAT(
//                 CONCAT(
//                   '{',
//                     '"id":', ac.id, ',',
//                     '"title":"', REPLACE(ac.title, '"', '\\"'), '",',
//                     '"description":"', REPLACE(ac.description, '"', '\\"'), '",',
//                     '"icon":"', ac.icon, '",',
//                     '"order_index":', ac.order_index, ',',
//                     '"is_active":', ac.is_active,
//                   '}'
//                 )
//               ), ']')
//               FROM academic_admin_cards ac 
//               WHERE ac.section_id = s.id AND ac.deleted = '0'
//             ),
//           '}'
//         )
//       ), ']') AS sections
//     FROM academic_home h
//     LEFT JOIN academic_home_sections s ON h.id = s.home_id AND s.deleted = '0'
//     WHERE h.deleted = '0'
//     GROUP BY h.id
//     ORDER BY h.created_at DESC
//   `;


//   try {
//     const [rows] = await db.promise().query(query);
//     return rows;
//   } catch (error) {
//     console.error("Database fetch error:", error);
//     throw error;
//   }
// };
export const academicHomeFetch = async () => {
  const query = `
    SELECT 
      h.*,
      CONCAT('[', GROUP_CONCAT(
        CONCAT(
          '{',
            '"id":', IFNULL(s.id, 'null'), ',',
            '"section_type":"', IFNULL(REPLACE(s.section_type, '"', '\\"'), ''), '",',
            '"title":"', IFNULL(REPLACE(s.title, '"', '\\"'), ''), '",',
            '"description":"', IFNULL(REPLACE(s.description, '"', '\\"'), ''), '",',
            '"icon":"', IFNULL(s.icon, ''), '",',
            '"order_index":', IFNULL(s.order_index, 0), ',',
            '"is_active":', IFNULL(s.is_active, 0), ',',
            '"admin_cards":', IFNULL((
              SELECT CONCAT('[', GROUP_CONCAT(
                CONCAT(
                  '{',
                    '"id":', IFNULL(ac.id, 'null'), ',',
                    '"title":"', IFNULL(REPLACE(ac.title, '"', '\\"'), ''), '",',
                    '"description":"', IFNULL(REPLACE(ac.description, '"', '\\"'), ''), '",',
                    '"icon":"', IFNULL(ac.icon, ''), '",',
                    '"order_index":', IFNULL(ac.order_index, 0), ',',
                    '"is_active":', IFNULL(ac.is_active, 0),
                  '}'
                )
              SEPARATOR ','), ']')
              FROM academic_admin_cards ac 
              WHERE ac.section_id = s.id AND ac.deleted = '0'
            ), '[]'),
          '}'
        ) SEPARATOR ','
      ), ']') AS sections
    FROM academic_home h
    LEFT JOIN academic_home_sections s ON h.id = s.home_id AND s.deleted = '0'
    WHERE h.deleted = '0'
    GROUP BY h.id
    ORDER BY h.created_at DESC
  `;

  try {
    const [rows] = await db.promise().query(query);
    // Optionally parse the JSON string into objects
    const parsedRows = rows.map(row => ({
      ...row,
      sections: row.sections ? JSON.parse(row.sections) : []
    }));
    return parsedRows;
  } catch (error) {
    console.error("Database fetch error:", error);
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

export const academicHomeEdit = async (id, title, description, hero_image_url, created_by) => {
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
export const academicHomeSectionCreate = async (home_id, section_type, title, description, icon, order_index) => {
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

export const academicHomeSectionEdit = async (id, section_type, title, description, icon, order_index, is_active) => {
  const query = `
    UPDATE academic_home_sections 
    SET section_type = ?, title = ?, description = ?, icon = ?, order_index = ?, is_active = ?
    WHERE id = ?
  `;
  const values = [section_type, title, description, icon, order_index, is_active, id];

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
export const academicHomeAdminCardCreate = async (section_id, title, description, icon, order_index) => {
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

export const academicHomeAdminCardEdit = async (id, title, description, icon, order_index, is_active) => {
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
export const getExaminationById = async (id) => {
  const query = `SELECT * FROM examinations WHERE id = ?`;
  
  try {
    const [result] = await db.promise().query(query, [id]);
    return result[0];
  } catch (error) {
    console.error("Database select error:", error);
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