import db from "../../config/db.js";

export const getProfile = async (id) => {
  try {
    // Fetch from faculties
    const [faculty] = await db.promise().query(
      `SELECT id, name, qualification, designation, email_address AS email, 
              joining_date AS dateOfJoining, image AS photo 
       FROM faculties WHERE id = ?`,
      [id]
    );

    if (!faculty[0]) return null;

    // Fetch bio-data
    const [bioData] = await db
      .promise()
      .query(
        `SELECT attachment AS bioData FROM faculty_resumes WHERE faculty_id = ?`,
        [id]
      );

    // Fetch publications
    const [publications] = await db
      .promise()
      .query(
        `SELECT attachment AS publications FROM faculty_publications WHERE faculty_id = ?`,
        [id]
      );

    // Fetch online profiles
    const [onlineProfiles] = await db
      .promise()
      .query(
        `SELECT id, description AS onlineProfile FROM faculty_online_profiles WHERE faculty_id = ?`,
        [id]
      );

    // Fetch specializations
    const [specializations] = await db
      .promise()
      .query(
        `SELECT id, description AS areasOfSpecialization FROM faculty_specializations WHERE faculty_id = ?`,
        [id]
      );

    // Fetch subjects
    const [subjects] = await db
      .promise()
      .query(
        `SELECT id, subject AS subjectTaught, type, semester FROM faculty_subjects WHERE faculty_id = ?`,
        [id]
      );

    // Fetch papers
    const [papers] = await db
      .promise()
      .query(
        `SELECT id, title, description AS papersPresented, link FROM faculty_papers WHERE faculty_id = ?`,
        [id]
      );

    // Fetch research projects
    const [researches] = await db
      .promise()
      .query(
        `SELECT id, title, grant_type, funding_organization, amount, duration FROM faculty_researches WHERE faculty_id = ?`,
        [id]
      );

    return {
      ...faculty[0],
      bioData: bioData[0]?.bioData || null,
      publications: publications[0]?.publications || null,
      onlineProfiles: onlineProfiles || [],
      specializations: specializations || [],
      subjects: subjects || [],
      papers: papers || [],
      researches: researches || [],
    };
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const updateProfile = async (id, data) => {
  try {
    // Update faculties table
    const [facultyResult] = await db.promise().query(
      `UPDATE faculties 
       SET name = COALESCE(?, name), 
           qualification = COALESCE(?, qualification), 
           designation = COALESCE(?, designation), 
           email_address = COALESCE(?, email_address), 
           joining_date = COALESCE(?, joining_date), 
           image = COALESCE(?, image)
       WHERE id = ?`,
      [
        data.name || null,
        data.qualification || null,
        data.designation || null,
        data.email || null,
        data.dateOfJoining || null,
        data.photo || null,
        id,
      ]
    );

    if (facultyResult.affectedRows === 0) return null;

    // Update or insert bio-data
    if (data.bioData) {
      const [bioData] = await db
        .promise()
        .query(`SELECT id FROM faculty_resumes WHERE faculty_id = ?`, [id]);
      if (bioData[0]) {
        await db
          .promise()
          .query(
            `UPDATE faculty_resumes SET attachment = ? WHERE faculty_id = ?`,
            [data.bioData, id]
          );
      } else {
        await db
          .promise()
          .query(
            `INSERT INTO faculty_resumes (faculty_id, attachment) VALUES (?, ?)`,
            [id, data.bioData]
          );
      }
    }

    // Update or insert publications
    if (data.publications) {
      const [publications] = await db
        .promise()
        .query(`SELECT id FROM faculty_publications WHERE faculty_id = ?`, [
          id,
        ]);
      if (publications[0]) {
        await db
          .promise()
          .query(
            `UPDATE faculty_publications SET attachment = ? WHERE faculty_id = ?`,
            [data.publications, id]
          );
      } else {
        await db
          .promise()
          .query(
            `INSERT INTO faculty_publications (faculty_id, attachment) VALUES (?, ?)`,
            [id, data.publications]
          );
      }
    }

    return await getProfile(id);
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};

export const addOnlineProfile = async (id, description) => {
  const query = `INSERT INTO faculty_online_profiles (faculty_id, description, created_by) VALUES (?, ?, 1)`;
  await db.promise().query(query, [id, description]);
};

export const addSpecialization = async (id, description) => {
  const query = `INSERT INTO faculty_specializations (faculty_id, description, created_by) VALUES (?, ?, 1)`;
  await db.promise().query(query, [id, description]);
};

export const addSubject = async (id, subject, type, semester) => {
  const query = `INSERT INTO faculty_subjects (faculty_id, subject, type, semester, created_by) VALUES (?, ?, ?, ?, 1)`;
  await db.promise().query(query, [id, subject, type, semester]);
};

export const addPaper = async (id, title, description, link) => {
  const [count] = await db
    .promise()
    .query(
      `SELECT COALESCE(MAX(sr_no), 0) + 1 AS nextSrNo FROM faculty_papers WHERE faculty_id = ?`,
      [id]
    );
  const sr_no = count[0].nextSrNo;
  const query = `INSERT INTO faculty_papers (faculty_id, sr_no, title, description, link, created_by) VALUES (?, ?, ?, ?, ?, 1)`;
  await db.promise().query(query, [id, sr_no, title, description, link || ""]);
};

export const addResearch = async (
  id,
  title,
  grant_type,
  funding_organization,
  amount,
  duration
) => {
  const query = `INSERT INTO faculty_researches (faculty_id, title, grant_type, funding_organization, amount, duration, created_by) 
                 VALUES (?, ?, ?, ?, ?, ?, 1)`;
  await db
    .promise()
    .query(query, [
      id,
      title,
      grant_type,
      funding_organization,
      amount,
      duration,
    ]);
};

export const deleteOnlineProfile = async (id, profileId) => {
  const [result] = await db
    .promise()
    .query(
      `DELETE FROM faculty_online_profiles WHERE id = ? AND faculty_id = ?`,
      [profileId, id]
    );
  return result.affectedRows > 0;
};

export const deleteSpecialization = async (id, specId) => {
  const [result] = await db
    .promise()
    .query(
      `DELETE FROM faculty_specializations WHERE id = ? AND faculty_id = ?`,
      [specId, id]
    );
  return result.affectedRows > 0;
};

export const deleteSubject = async (id, subjectId) => {
  const [result] = await db
    .promise()
    .query(`DELETE FROM faculty_subjects WHERE id = ? AND faculty_id = ?`, [
      subjectId,
      id,
    ]);
  return result.affectedRows > 0;
};

export const deletePaper = async (id, paperId) => {
  const [result] = await db
    .promise()
    .query(`DELETE FROM faculty_papers WHERE id = ? AND faculty_id = ?`, [
      paperId,
      id,
    ]);
  return result.affectedRows > 0;
};

export const deleteResearch = async (id, researchId) => {
  const [result] = await db
    .promise()
    .query(`DELETE FROM faculty_researches WHERE id = ? AND faculty_id = ?`, [
      researchId,
      id,
    ]);
  return result.affectedRows > 0;
};

export const updateOnlineProfile = async (userId, profileId, description) => {
  try {
    console.log(
      "userId, profileId, description",
      userId,
      profileId,
      description
    );
    const result = await db
      .promise()
      .query(
        "UPDATE faculty_online_profiles SET description = ? WHERE id = ? AND faculty_id = ?",
        [description, profileId, userId]
      );
    return [result];
  } catch (error) {
    console.log(`Error updating online profile: ${error.message}`);
  }
};

export const updateSpecialization = async (userId, specId, description) => {
  try {
    const result = await db
      .promise()
      .query(
        "UPDATE faculty_specializations SET description = ? WHERE id = ? AND faculty_id = ?",
        [description, specId, userId]
      );
    return [result];
  } catch (error) {
    throw new Error(`Error updating specialization: ${error.message}`);
  }
};

export const updateSubject = async (
  userId,
  subjectId,
  { subject, type, semester }
) => {
  try {
    const result = await db
      .promise()
      .query(
        "UPDATE faculty_subjects SET subject = ?, type = ?, semester = ? WHERE id = ? AND faculty_id = ?",
        [subject, type, semester, subjectId, userId]
      );
    return [result];
  } catch (error) {
    throw new Error(`Error updating subject: ${error.message}`);
  }
};

export const updatePaper = async (
  userId,
  paperId,
  { title, description, link }
) => {
  try {
    console.log("title, description, link", title, description, link);
    const result = await db
      .promise()
      .query(
        "UPDATE faculty_papers SET title = ?, description = ?, link = ? WHERE id = ? AND faculty_id = ?",
        [title, description, link, paperId, userId]
      );
    return [result];
  } catch (error) {
    throw new Error(`Error updating paper: ${error.message}`);
  }
};

export const updateResearch = async (
  userId,
  researchId,
  { title, grant_type, funding_organization, amount, duration }
) => {
  try {
    const result = await db
      .promise()
      .query(
        "UPDATE faculty_researches SET title = ?, grant_type = ?, funding_organization = ?, amount = ?, duration = ? WHERE id = ? AND faculty_id = ?",
        [
          title,
          grant_type,
          funding_organization,
          amount,
          duration,
          researchId,
          userId,
        ]
      );
    return [result];
  } catch (error) {
    throw new Error(`Error updating research project: ${error.message}`);
  }
};
