import db from "../../config/db.js";

export const saveAdmissionApplication = async (data) => {
  try {
    const {
      name,
      email,
      phone,
      course,
      academicDetails,
      address,
      dateOfBirth,
      photo,
      documents,
    } = data;

    const [result] = await db.promise().query(
      `INSERT INTO admissions 
      (name, email, phone, course, academic_details, address, date_of_birth, photo, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [name, email, phone, course, academicDetails, address, dateOfBirth, photo]
    );

    const applicationId = result.insertId;

    if (documents && documents.length > 0) {
      const docInsertPromises = documents.map((docPath) =>
        db.promise().query(
          `INSERT INTO admission_documents (admission_id, document_path) VALUES (?, ?)`,
          [applicationId, docPath]
        )
      );
      await Promise.all(docInsertPromises);
    }

    return await getAdmissionApplicationById(applicationId);
  } catch (error) {
    console.error("Database save admission application error:", error);
    throw error;
  }
};

export const getAdmissionApplicationById = async (id) => {
  try {
    const [applications] = await db.promise().query(
      `SELECT id, name, email, phone, course, academic_details AS academicDetails, 
              address, date_of_birth AS dateOfBirth, photo, created_at
       FROM admissions WHERE id = ?`,
      [id]
    );

    if (!applications[0]) return null;

    const [documents] = await db.promise().query(
      `SELECT id, document_path AS documentPath FROM admission_documents WHERE admission_id = ?`,
      [id]
    );

    return {
      ...applications[0],
      documents: documents || [],
    };
  } catch (error) {
    console.error("Database fetch admission application error:", error);
    throw error;
  }
};

export const getAllAdmissions = async () => {
  try {
    const [applications] = await db.promise().query(
      `SELECT id, name, email, phone, course, created_at FROM admissions ORDER BY created_at DESC`
    );
    return applications;
  } catch (error) {
    console.error("Database fetch all admissions error:", error);
    throw error;
  }
};
