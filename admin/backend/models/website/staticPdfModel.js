import db from "../../config/db.js";

// Function to get all PDF files
export const getAllStaticPdfs = async () => {
  try {
    const query = "SELECT * FROM dept_Pdf_files ORDER BY created_at DESC";
    const [result] = await db.promise().query(query);

    return result;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to create a new PDF file record
export const createStaticPdfs = async (
  title,
  filename,
  originalname,
  userName
) => {
  try {
    const query =
      "INSERT INTO dept_Pdf_files (title, originalname, filename, created_by) VALUES (?, ?, ?, ?)";
    const [result] = await db
      .promise()
      .query(query, [title, originalname, filename, userName]);

    return result;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Function to delete a PDF file record by ID
export const deleteById = async (id) => {
  try {
    console.log("Delete Model");
    const query = "DELETE FROM dept_Pdf_files WHERE id = ?";
    const [result] = await db.promise().query(query, [id]);

    return result;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Function to get a single PDF file record by ID
export const getById = async (id) => {
  try {
    console.log("Delete getById Model");
    const query = "SELECT * FROM dept_Pdf_files WHERE id = ?";
    const [result] = await db.promise().query(query, [id]);

    return result;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Function to update the title of a PDF file by ID
export const updateById = (id, title) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE dept_Pdf_files SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    db.promise().query(query, [title, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
