// src/models/website/studentCornerModel.js
//--------------------------------------------------------------
import db from "../../config/db.js";

/* -----------------------------------------------------------
   Utility helper
------------------------------------------------------------ */
const run = async (query, values = []) => {
  try {
    const [rows] = await db.promise().query(query, values);
    return rows;
  } catch (err) {
    console.error("DB error:", err);
    throw err;
  }
};

/* ============================================================
   1. Code‑of‑Conduct PDFs
============================================================ */
export const codeOfConductCreate = (title, file_path) =>
  run(`INSERT INTO sc_code_of_conduct_documents (title, file_path) VALUES (?, ?)`,
      [title, file_path]);

export const codeOfConductFetch = () =>
  run(`SELECT * FROM sc_code_of_conduct_documents ORDER BY uploaded_at DESC`);

export const getCodeOfConductById = (id) =>
  run(`SELECT * FROM sc_code_of_conduct_documents WHERE id = ?`, [id])
    .then(r => r[0]);

export const codeOfConductEdit = (id, title, file_path) =>
  run(`UPDATE sc_code_of_conduct_documents SET title = ?, file_path = ? WHERE id = ?`,
      [title, file_path, id]);

export const codeOfConductDelete = (id) =>
  run(`DELETE FROM sc_code_of_conduct_documents WHERE id = ?`, [id]);

/* ============================================================
   2. Student‑Council • Members
============================================================ */
export const councilMemberCreate = (full_name, position, council_year) =>
  run(`INSERT INTO sc_student_council_members (full_name, position, council_year)
       VALUES (?, ?, ?)`, [full_name, position, council_year]);

export const councilMembersFetch = () =>
  run(`SELECT * FROM sc_student_council_members ORDER BY position`);

export const getCouncilMemberById = (id) =>
  run(`SELECT * FROM sc_student_council_members WHERE id = ?`, [id])
    .then(r => r[0]);

export const councilMemberEdit = (id, full_name, position, council_year) =>
  run(`UPDATE sc_student_council_members
       SET full_name = ?, position = ?, council_year = ? WHERE id = ?`,
      [full_name, position, council_year, id]);

export const councilMemberDelete = (id) =>
  run(`DELETE FROM sc_student_council_members WHERE id = ?`, [id]);

/* ============================================================
   3. Student‑Council • Event Reports
============================================================ */
export const councilReportCreate = (event_name, council_year, file_path) =>
  run(`INSERT INTO sc_student_council_reports (event_name, council_year, file_path)
       VALUES (?, ?, ?)`, [event_name, council_year, file_path]);

export const councilReportsFetch = () =>
  run(`SELECT * FROM sc_student_council_reports ORDER BY council_year DESC`);

export const getCouncilReportById = (id) =>
  run(`SELECT * FROM sc_student_council_reports WHERE id = ?`, [id])
    .then(r => r[0]);

export const councilReportEdit = (id, event_name, council_year, file_path) =>
  run(`UPDATE sc_student_council_reports
       SET event_name = ?, council_year = ?, file_path = ? WHERE id = ?`,
      [event_name, council_year, file_path, id]);

export const councilReportDelete = (id) =>
  run(`DELETE FROM sc_student_council_reports WHERE id = ?`, [id]);

/* ============================================================
   4. Professional Bodies
============================================================ */
export const professionalBodyCreate = (short_name, full_name, logo_path, description, website) =>
  run(`INSERT INTO sc_professional_bodies (short_name, full_name, logo_path, description, website)
       VALUES (?, ?, ?, ?, ?)`,
      [short_name, full_name, logo_path, description, website]);

export const professionalBodiesFetch = () =>
  run(`SELECT * FROM sc_professional_bodies ORDER BY short_name`);

export const getProfessionalBodyById = (id) =>
  run(`SELECT * FROM sc_professional_bodies WHERE id = ?`, [id])
    .then(r => r[0]);

export const professionalBodyEdit = (id, short_name, full_name, logo_path, description, website) =>
  run(`UPDATE sc_professional_bodies
       SET short_name = ?, full_name = ?, logo_path = ?, description = ?, website = ?
       WHERE id = ?`,
      [short_name, full_name, logo_path, description, website, id]);

export const professionalBodyDelete = (id) =>
  run(`DELETE FROM sc_professional_bodies WHERE id = ?`, [id]);

/* ============================================================
   5. NSS
============================================================ */
// Officers
export const nssOfficerCreate  = (full_name) => run(
  `INSERT INTO sc_nss_program_officers (full_name) VALUES (?)`, [full_name]);
export const nssOfficersFetch = () => run(`SELECT * FROM sc_nss_program_officers`);

// Activity Reports
export const nssActivityReportCreate = (year_label, label, file_path) =>
  run(`INSERT INTO sc_nss_activity_reports (year_label, label, file_path)
       VALUES (?, ?, ?)`, [year_label, label, file_path]);

export const nssActivityReportsFetch = () =>
  run(`SELECT * FROM sc_nss_activity_reports ORDER BY year_label DESC`);

/* ============================================================
   6. Student Clubs
============================================================ */
export const studentClubCreate = (name, logo_path, description, website) =>
  run(`INSERT INTO sc_student_clubs (name, logo_path, description, website)
       VALUES (?, ?, ?, ?)`, [name, logo_path, description, website]);

export const studentClubsFetch = () =>
  run(`SELECT * FROM sc_student_clubs ORDER BY name`);

export const getStudentClubById = (id) =>
  run(`SELECT * FROM sc_student_clubs WHERE id = ?`, [id]).then(r => r[0]);

export const studentClubEdit = (id, name, logo_path, description, website) =>
  run(`UPDATE sc_student_clubs
       SET name = ?, logo_path = ?, description = ?, website = ? WHERE id = ?`,
      [name, logo_path, description, website, id]);

export const studentClubDelete = (id) =>
  run(`DELETE FROM sc_student_clubs WHERE id = ?`, [id]);

/* ============================================================
   7. Infrastructure Facilities
============================================================ */
export const facilityCreate = (name, image_path, short_desc, long_desc) =>
  run(`INSERT INTO sc_facilities (name, image_path, short_desc, long_desc)
       VALUES (?, ?, ?, ?)`, [name, image_path, short_desc, long_desc]);

export const facilitiesFetch = () =>
  run(`SELECT * FROM sc_facilities ORDER BY name`);

export const getFacilityById = (id) =>
  run(`SELECT * FROM sc_facilities WHERE id = ?`, [id]).then(r => r[0]);

export const facilityEdit = (id, name, image_path, short_desc, long_desc) =>
  run(`UPDATE sc_facilities
       SET name = ?, image_path = ?, short_desc = ?, long_desc = ? WHERE id = ?`,
      [name, image_path, short_desc, long_desc, id]);

export const facilityDelete = (id) =>
  run(`DELETE FROM sc_facilities WHERE id = ?`, [id]);

/* ============================================================
   8. Cultural Activities
============================================================ */
export const culturalActivityCreate = (title, event_date, description, gallery_path) =>
  run(`INSERT INTO sc_cultural_activities (title, event_date, description, gallery_path)
       VALUES (?, ?, ?, ?)`, [title, event_date, description, gallery_path]);

export const culturalActivitiesFetch = () =>
  run(`SELECT * FROM sc_cultural_activities ORDER BY event_date DESC`);

/* ============================================================
   9. Anti‑Ragging
============================================================ */
// Contacts
export const antiRaggingContactCreate = (full_name, designation, phone, email) =>
  run(`INSERT INTO sc_anti_ragging_contacts (full_name, designation, phone, email)
       VALUES (?, ?, ?, ?)`, [full_name, designation, phone, email]);

export const antiRaggingContactsFetch = () =>
  run(`SELECT * FROM sc_anti_ragging_contacts`);

// Notices
export const antiRaggingNoticeCreate = (title, file_path) =>
  run(`INSERT INTO sc_anti_ragging_notices (title, file_path) VALUES (?, ?)`,
      [title, file_path]);

export const antiRaggingNoticesFetch = () =>
  run(`SELECT * FROM sc_anti_ragging_notices ORDER BY posted_at DESC`);

/* ============================================================
   10. Student Satisfaction Surveys
============================================================ */
export const surveyCreate = (title, survey_year, form_url, results_file, active = 1) =>
  run(`INSERT INTO sc_surveys (title, survey_year, form_url, results_file, active)
       VALUES (?, ?, ?, ?, ?)`,
      [title, survey_year, form_url, results_file, active]);

export const surveysFetch = () =>
  run(`SELECT * FROM sc_surveys ORDER BY survey_year DESC`);

export const getSurveyById = (id) =>
  run(`SELECT * FROM sc_surveys WHERE id = ?`, [id]).then(r => r[0]);

export const surveyEdit = (id, title, survey_year, form_url, results_file, active) =>
  run(`UPDATE sc_surveys
       SET title = ?, survey_year = ?, form_url = ?, results_file = ?, active = ?
       WHERE id = ?`,
      [title, survey_year, form_url, results_file, active, id]);

export const surveyDelete = (id) =>
  run(`DELETE FROM sc_surveys WHERE id = ?`, [id]);
