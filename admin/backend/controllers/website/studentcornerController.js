// src/controllers/website/studentCornerController.js
//--------------------------------------------------------------
import {
  // Code‑of‑Conduct
  codeOfConductCreate,
  codeOfConductFetch,
  getCodeOfConductById,
  codeOfConductEdit,
  codeOfConductDelete,

  // Student‑Council
  councilMemberCreate,
  councilMembersFetch,
  getCouncilMemberById,
  councilMemberEdit,
  councilMemberDelete,
  councilReportCreate,
  councilReportsFetch,
  getCouncilReportById,
  councilReportEdit,
  councilReportDelete,

  // Professional Bodies
  professionalBodyCreate,
  professionalBodiesFetch,
  getProfessionalBodyById,
  professionalBodyEdit,
  professionalBodyDelete,

  // NSS
  nssOfficerCreate,
  nssOfficersFetch,
  nssActivityReportCreate,
  nssActivityReportsFetch,

  // Student Clubs
  studentClubCreate,
  studentClubsFetch,
  getStudentClubById,
  studentClubEdit,
  studentClubDelete,

  // Infrastructure
  facilityCreate,
  facilitiesFetch,
  getFacilityById,
  facilityEdit,
  facilityDelete,

  // Cultural Activities
  culturalActivityCreate,
  culturalActivitiesFetch,

  // Anti‑Ragging
  antiRaggingContactCreate,
  antiRaggingContactsFetch,
  antiRaggingNoticeCreate,
  antiRaggingNoticesFetch,

  // Surveys
  surveyCreate,
  surveysFetch,
  getSurveyById,
  surveyEdit,
  surveyDelete,
} from "../../models/website/studentcornerModel.js"; // adjust path if needed

/* ============================================================
   0.  ——— Helper wrapper for uniform error handling ———
============================================================ */
const handle = async (req, res, fn) => {
  try {
    const result = await fn();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   1.  Code‑of‑Conduct PDFs
============================================================ */
export const codeOfConductCreateController = (req, res) =>
  handle(req, res, async () => {
    const { title } = req.body;
    const fileObj = req.file || (req.files && req.files[0]); // ✅
    const file_path = fileObj ? `/cdn/${fileObj.filename}` : null;
    console.log("DEBUG create payload:", { title, file_path });
    const r = await codeOfConductCreate(title, file_path);

    return { message: "Document added", id: r.insertId };
  });

export const codeOfConductFetchController = (req, res) =>
  handle(req, res, async () => {
    const result = await codeOfConductFetch();
    console.log("Fetched Code of Conduct:", result); // ✅ Log here
    return { result };
  });

export const codeOfConductEditController = (req, res) =>
  handle(req, res, async () => {
    const { id } = req.params;
    const { title } = req.body;
    const existing = await getCodeOfConductById(id);
    const file_path = req.file
      ? `/cdn/${req.file.filename}`
      : existing.file_path;
    await codeOfConductEdit(id, title, file_path);
    return { message: "Document updated" };
  });

export const codeOfConductDeleteController = (req, res) =>
  handle(req, res, async () => {
    await codeOfConductDelete(req.params.id);
    return { message: "Document deleted" };
  });

/* ============================================================
   2.  Student Council – Members
============================================================ */
export const councilMemberCreateController = (req, res) =>
  handle(req, res, async () => {
    const { full_name, position, council_year } = req.body;
    const r = await councilMemberCreate(full_name, position, council_year);
    return { message: "Member added", id: r.insertId };
  });

export const councilMembersFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await councilMembersFetch() }));

export const councilMemberEditController = (req, res) =>
  handle(req, res, async () => {
    const { id } = req.params;
    const { full_name, position, council_year } = req.body;
    await councilMemberEdit(id, full_name, position, council_year);
    return { message: "Member updated" };
  });

export const councilMemberDeleteController = (req, res) =>
  handle(req, res, async () => {
    await councilMemberDelete(req.params.id);
    return { message: "Member deleted" };
  });

/* Student‑Council Event Reports */
export const councilReportCreateController = (req, res) =>
  handle(req, res, async () => {
    const { event_name, council_year } = req.body;
    const file_path = req.file ? `/cdn/${req.file.filename}` : null;
    const r = await councilReportCreate(event_name, council_year, file_path);
    return { message: "Report added", id: r.insertId };
  });

export const councilReportsFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await councilReportsFetch() }));

export const councilReportEditController = (req, res) =>
  handle(req, res, async () => {
    const { id } = req.params;
    const { event_name, council_year } = req.body;
    const existing = await getCouncilReportById(id);
    const file_path = req.file
      ? `/cdn/${req.file.filename}`
      : existing.file_path;
    await councilReportEdit(id, event_name, council_year, file_path);
    return { message: "Report updated" };
  });

export const councilReportDeleteController = (req, res) =>
  handle(req, res, async () => {
    await councilReportDelete(req.params.id);
    return { message: "Report deleted" };
  });

/* ============================================================
   3. Professional Bodies
============================================================ */
export const professionalBodyCreateController = (req, res) =>
  handle(req, res, async () => {
    const { short_name, full_name, description, website } = req.body;
    const logo_path = req.file ? `/cdn/${req.file.filename}` : null;
    const r = await professionalBodyCreate(
      short_name,
      full_name,
      logo_path,
      description,
      website
    );
    return { message: "Body added", id: r.insertId };
  });

export const professionalBodiesFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await professionalBodiesFetch() }));

export const professionalBodyEditController = (req, res) =>
  handle(req, res, async () => {
    const { id } = req.params;
    const { short_name, full_name, description, website } = req.body;
    const existing = await getProfessionalBodyById(id);
    const logo_path = req.file
      ? `/cdn/${req.file.filename}`
      : existing.logo_path;
    await professionalBodyEdit(
      id,
      short_name,
      full_name,
      logo_path,
      description,
      website
    );
    return { message: "Body updated" };
  });

export const professionalBodyDeleteController = (req, res) =>
  handle(req, res, async () => {
    await professionalBodyDelete(req.params.id);
    return { message: "Body deleted" };
  });

/* ============================================================
   4. NSS
============================================================ */
// Officers
export const nssOfficerCreateController = (req, res) =>
  handle(req, res, async () => {
    const { full_name } = req.body;
    const r = await nssOfficerCreate(full_name);
    return { message: "Officer added", id: r.insertId };
  });

export const nssOfficersFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await nssOfficersFetch() }));

// Activity Reports
export const nssActivityReportCreateController = (req, res) =>
  handle(req, res, async () => {
    const { year_label, label } = req.body;
    const file_path = req.file ? `/cdn/${req.file.filename}` : null;
    const r = await nssActivityReportCreate(year_label, label, file_path);
    return { message: "Report added", id: r.insertId };
  });

export const nssActivityReportsFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await nssActivityReportsFetch() }));

/* ============================================================
   5. Student Clubs
============================================================ */
export const studentClubCreateController = (req, res) =>
  handle(req, res, async () => {
    const { name, description, website } = req.body;
    const logo_path = req.file ? `/cdn/${req.file.filename}` : null;
    const r = await studentClubCreate(name, logo_path, description, website);
    return { message: "Club added", id: r.insertId };
  });

export const studentClubsFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await studentClubsFetch() }));

export const studentClubEditController = (req, res) =>
  handle(req, res, async () => {
    const { id } = req.params;
    const { name, description, website } = req.body;
    const existing = await getStudentClubById(id);
    const logo_path = req.file
      ? `/cdn/${req.file.filename}`
      : existing.logo_path;
    await studentClubEdit(id, name, logo_path, description, website);
    return { message: "Club updated" };
  });

export const studentClubDeleteController = (req, res) =>
  handle(req, res, async () => {
    await studentClubDelete(req.params.id);
    return { message: "Club deleted" };
  });

/* ============================================================
   6. Infrastructure
============================================================ */
export const facilityCreateController = (req, res) =>
  handle(req, res, async () => {
    const { name, short_desc, long_desc } = req.body;
    const image_path = req.file ? `/cdn/${req.file.filename}` : null;
    const r = await facilityCreate(name, image_path, short_desc, long_desc);
    return { message: "Facility added", id: r.insertId };
  });

export const facilitiesFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await facilitiesFetch() }));

export const facilityEditController = (req, res) =>
  handle(req, res, async () => {
    const { id } = req.params;
    const { name, short_desc, long_desc } = req.body;
    const existing = await getFacilityById(id);
    const image_path = req.file
      ? `/cdn/${req.file.filename}`
      : existing.image_path;
    await facilityEdit(id, name, image_path, short_desc, long_desc);
    return { message: "Facility updated" };
  });

export const facilityDeleteController = (req, res) =>
  handle(req, res, async () => {
    await facilityDelete(req.params.id);
    return { message: "Facility deleted" };
  });

/* ============================================================
   7. Cultural Activities
============================================================ */
export const culturalActivityCreateController = (req, res) =>
  handle(req, res, async () => {
    const { title, event_date, description } = req.body;
    const gallery_path = req.file ? `/cdn/${req.file.filename}` : null;
    const r = await culturalActivityCreate(
      title,
      event_date,
      description,
      gallery_path
    );
    return { message: "Activity added", id: r.insertId };
  });

export const culturalActivitiesFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await culturalActivitiesFetch() }));

/* ============================================================
   8. Anti‑Ragging
============================================================ */
// Contacts
export const antiRaggingContactCreateController = (req, res) =>
  handle(req, res, async () => {
    const { full_name, designation, phone, email } = req.body;
    const r = await antiRaggingContactCreate(
      full_name,
      designation,
      phone,
      email
    );
    return { message: "Contact added", id: r.insertId };
  });

export const antiRaggingContactsFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await antiRaggingContactsFetch() }));

// Notices
export const antiRaggingNoticeCreateController = (req, res) =>
  handle(req, res, async () => {
    const { title } = req.body;
    const file_path = req.file ? `/cdn/${req.file.filename}` : null;
    const r = await antiRaggingNoticeCreate(title, file_path);
    return { message: "Notice added", id: r.insertId };
  });

export const antiRaggingNoticesFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await antiRaggingNoticesFetch() }));

/* ============================================================
   9. Student Satisfaction Surveys
============================================================ */
export const surveyCreateController = (req, res) =>
  handle(req, res, async () => {
    const { title, survey_year, form_url, results_file, active } = req.body;
    const r = await surveyCreate(
      title,
      survey_year,
      form_url,
      results_file,
      active
    );
    return { message: "Survey added", id: r.insertId };
  });

export const surveysFetchController = (req, res) =>
  handle(req, res, async () => ({ result: await surveysFetch() }));

export const surveyEditController = (req, res) =>
  handle(req, res, async () => {
    const { id } = req.params;
    const { title, survey_year, form_url, results_file, active } = req.body;
    await surveyEdit(id, title, survey_year, form_url, results_file, active);
    return { message: "Survey updated" };
  });

export const surveyDeleteController = (req, res) =>
  handle(req, res, async () => {
    await surveyDelete(req.params.id);
    return { message: "Survey deleted" };
  });
