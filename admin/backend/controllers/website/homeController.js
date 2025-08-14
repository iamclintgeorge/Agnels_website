import {
  carouselUpload,
  carouselDisplay,
  carouselDelete,
  introTextDisplay,
  introTextUpdate,
} from "../../models/website/homeModel.js";
// import fs from "fs/promises";
import path from "path";
import db from "../../config/db.js";
import fs from "fs";

export const carouselUploadController = async (req, res) => {
  try {
    const section = req.params.section;
    const { content } = req.body;
    const parsed = JSON.parse(content);
    const { altText, imageFilename } = parsed;

    const pendingPath = path.join("public/cdn/pending", imageFilename);
    const finalPath = path.join("public/cdn", imageFilename);

    // Move image if it exists
    if (fs.existsSync(pendingPath)) {
      fs.renameSync(pendingPath, finalPath);
    }

    const imageUrl = `/cdn/${imageFilename}`;
    await carouselUpload(altText, imageUrl, section);

    res.json({
      message: "Upload successful",
      imageUrl: imageUrl,
      altText: altText,
    });
    // logger.info("Home Carousel Upload", {
    //   id: uuidv4(), // Use a UUID or other method to generate an ID
    //   title: `Home Carousel Image Successfully Uploaded`,
    //   service: "Home Page",
    //   description: "No additional info",
    //   level: "INFO",
    //   created_by: "To Be Added",
    //   source_ip: "N/A",
    //   created_on: new Date().toISOString(),
    // });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

export const carouselDisplayController = async (req, res) => {
  const section = req.params.section;
  try {
    const images = await carouselDisplay(section);
    res.json(images);
  } catch (error) {
    console.error("Display error:", error);
    res.status(500).json({ message: "Error fetching images" });
  }
};

export const carouselDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await carouselDelete(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete the file synchronously
    const filePath = path.join(process.cwd(), "public", image.imageUrl);
    console.log(filePath);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.warn("File delete issue:", filePath);
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Error deleting image" });
  }
};

export const introTextController = async (req, res) => {
  try {
    const text = await introTextDisplay();
    res.json(text);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Error fetching IntroText" });
  }
};

export const introTextUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const updatedText = await introTextUpdate(id, content);
    if (!updatedText) {
      return res.status(404).json({ message: "Text not found" });
    }

    res.json({ message: "Text updated successfully", content: updatedText });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating text" });
  }
};

export const announcementsCreateController = async (req, res) => {
  // console.log("hi");
  const sql =
    "INSERT INTO announcements (subject, description, attachment, created_by) VALUES (?, ?, ?, ?)";

  // const content =
  //   typeof req.body.content === "string"
  //     ? JSON.parse(req.body.content)
  //     : req.body.content;

  // const { subject, description, attachment, created_by } = content;

  const { subject, description, attachment, created_by } = JSON.parse(
    req.body.content
  );

  try {
    const values = [subject, description, attachment, created_by];
    const [result] = await db.promise().query(sql, values);
    res.json({ message: "Inserted Successfully" });
  } catch (error) {
    console.error("Database Insertion Error: ", error);
    throw error;
  }
};

export const announcementsFetchController = async (req, res) => {
  // console.log("hi");
  const sql = `SELECT * FROM announcements WHERE Type='Announcements' AND deleted = '0'`;
  try {
    // const values = [subject, description, attachment, created_by];
    const [result] = await db.promise().query(sql);
    res.json({ result: result });
  } catch (error) {
    console.error("Database Fetch Error: ", error);
    throw error;
  }
};

export const announcementsEditController = async (req, res) => {
  // console.log("hi");
  const sql =
    "UPDATE announcements SET subject = ?, description = ?, attachment = ?, created_by = ? WHERE id = ?";
  const { subject, description, attachment, created_by } = JSON.parse(
    req.body.content
  );
  const { id } = req.params;
  try {
    const values = [subject, description, attachment, created_by, id];
    const [result] = await db.promise().query(sql, values);
    res.json({ message: "Edited Successfully" });
  } catch (error) {
    console.error("Database Edit Error: ", error);
    throw error;
  }
};

export const announcementsDeleteController = async (req, res) => {
  console.log("hi");
  const sql = `DELETE FROM announcements WHERE id = ?`;
  const { id } = req.params;
  console.log(id);
  try {
    const values = [id];
    const [result] = await db.promise().query(sql, values);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error("Database Delete Error: ", error);
    throw error;
  }
};

export const achievementsCreateController = async (req, res) => {
  const sql = `
    INSERT INTO home_achievements
      (subject, description, attachment, created_by, Type)
    VALUES (?,?,?,?,?)`;
  const { subject, description, attachment, created_by, Type } = JSON.parse(
    req.body.content
  );
  try {
    await db
      .promise()
      .query(sql, [subject, description, attachment, created_by, Type]);
    res.json({ message: "Achievement added successfully" });
  } catch (err) {
    console.error("DB-Insert Error:", err);
    res.status(500).json({ message: "Insert failed" });
  }
};

/*  READ  */
export const achievementsFetchController = async (_req, res) => {
  const sql = `SELECT * FROM home_achievements`;
  try {
    const [result] = await db.promise().query(sql);
    res.json({ result });
  } catch (err) {
    console.error("DB-Fetch Error:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};

/*  UPDATE  */
export const achievementsEditController = async (req, res) => {
  const sql = `
    UPDATE home_achievements
    SET subject = ?, description = ?, attachment = ?, created_by = ?, Type = ?
    WHERE id = ?`;
  const { subject, description, attachment, created_by, Type } = JSON.parse(
    req.body.content
  );
  const { id } = req.params;
  try {
    await db
      .promise()
      .query(sql, [subject, description, attachment, created_by, Type, id]);
    res.json({ message: "Achievement updated successfully" });
  } catch (err) {
    console.error("DB-Update Error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

/*  SOFT-DELETE  */
export const achievementsDeleteController = async (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM home_achievements WHERE id = ?`;

  try {
    await db.promise().query(sql, [id]);
    res.json({ message: "Achievement deleted permanently" });
  } catch (err) {
    console.error("DB-Delete Error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

/* =================================================================== */
/*                         ADMISSIONS CONTROLLERS                      */
/* =================================================================== */

// CREATE
export const admissionsCreateController = async (req, res) => {
  const sql = `
    INSERT INTO home_admissions
      (subject, description, attachment, created_by, Type)
    VALUES (?,?,?,?,?)`;
  console.log(req.body.content);
  const { subject, description, attachment, created_by, Type } = JSON.parse(
    req.body.content
  );

  try {
    await db
      .promise()
      .query(sql, [subject, description, attachment, created_by, Type]);
    res.json({ message: "Admission entry added" });
  } catch (err) {
    console.error("DB-Insert Error:", err);
    res.status(500).json({ message: "Insert failed" });
  }
};

// READ
export const admissionsFetchController = async (_req, res) => {
  const sql = `SELECT * FROM home_admissions`;
  try {
    const [result] = await db.promise().query(sql);
    res.json({ result });
  } catch (err) {
    console.error("DB-Fetch Error:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};

// UPDATE
export const admissionsEditController = async (req, res) => {
  const sql = `
    UPDATE home_admissions
    SET subject = ?, description = ?, attachment = ?, created_by = ?, Type = ?
    WHERE id = ?`;
  const { subject, description, attachment, created_by, Type } = JSON.parse(
    req.body.content
  );
  const { id } = req.params;
  try {
    await db
      .promise()
      .query(sql, [subject, description, attachment, created_by, Type, id]);
    res.json({ message: "Admission entry updated" });
  } catch (err) {
    console.error("DB-Update Error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

// HARD DELETE
export const admissionsDeleteController = async (req, res) => {
  const sql = `DELETE FROM home_admissions WHERE id = ?`;
  const { id } = req.params;
  try {
    await db.promise().query(sql, [id]);
    res.json({ message: "Admission entry deleted" });
  } catch (err) {
    console.error("DB-Delete Error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

/* =================================================================== */
/*                         CIRCULARS CONTROLLERS                      */
/* =================================================================== */

// CREATE
export const circularsCreateController = async (req, res) => {
  const sql = `
    INSERT INTO home_circulars
      (subject, description, attachment, created_by)
    VALUES (?,?,?,?)`;
  const { subject, description, attachment, created_by } = JSON.parse(
    req.body.content
  );
  try {
    await db
      .promise()
      .query(sql, [subject, description, attachment, created_by]);
    res.json({ message: "Circular added" });
  } catch (err) {
    console.error("DB-Insert Error:", err);
    res.status(500).json({ message: "Insert failed" });
  }
};

// READ
export const circularsFetchController = async (_req, res) => {
  const sql = `SELECT * FROM home_circulars`;
  try {
    const [result] = await db.promise().query(sql);
    res.json({ result });
  } catch (err) {
    console.error("DB-Fetch Error:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};

// UPDATE
export const circularsEditController = async (req, res) => {
  const sql = `
    UPDATE home_circulars
    SET subject = ?, description = ?, attachment = ?, created_by = ?
    WHERE id = ?`;
  const { subject, description, attachment, created_by } = JSON.parse(
    req.body.content
  );
  const { id } = req.params;
  try {
    await db
      .promise()
      .query(sql, [subject, description, attachment, created_by, id]);
    res.json({ message: "Circular updated" });
  } catch (err) {
    console.error("DB-Update Error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

// HARD DELETE
export const circularsDeleteController = async (req, res) => {
  const sql = `DELETE FROM home_circulars WHERE id = ?`;
  const { id } = req.params;
  try {
    await db.promise().query(sql, [id]);
    res.json({ message: "Circular deleted" });
  } catch (err) {
    console.error("DB-Delete Error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};
/* =================================================================== */
/*                           NEWS  (announcements table)               */
/* =================================================================== */

// INSERT  (Type is hard-coded to 'News')
export const newsCreateController = async (req, res) => {
  const sql = `INSERT INTO announcements
      (subject, description, attachment, created_by, Type)
     VALUES (?,?,?,?, 'News')`;

  const { subject, description, attachment, created_by } = JSON.parse(
    req.body.content
  );
  try {
    await db
      .promise()
      .query(sql, [subject, description, attachment, created_by]);
    res.json({ message: "News inserted" });
  } catch (err) {
    console.error("DB-Insert Error (News):", err);
    res.status(500).json({ message: "Insert failed" });
  }
};

// READ  (only rows where Type = 'News')
export const newsFetchController = async (_req, res) => {
  const sql = `SELECT * FROM announcements WHERE Type = 'News' AND deleted = 0`;
  try {
    const [result] = await db.promise().query(sql);
    res.json({ result });
  } catch (err) {
    console.error("DB-Fetch Error (News):", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};

// UPDATE
export const newsEditController = async (req, res) => {
  const sql = `UPDATE announcements
     SET subject = ?, description = ?, attachment = ?, created_by = ?
     WHERE id = ? AND Type = 'News'`;

  const { subject, description, attachment, created_by } = JSON.parse(
    req.body.content
  );
  const { id } = req.params;
  try {
    await db
      .promise()
      .query(sql, [subject, description, attachment, created_by, id]);
    res.json({ message: "News updated" });
  } catch (err) {
    console.error("DB-Update Error (News):", err);
    res.status(500).json({ message: "Update failed" });
  }
};

// HARD DELETE
export const newsDeleteController = async (req, res) => {
  const sql = `DELETE FROM announcements WHERE id = ? AND Type = 'News'`;
  const { id } = req.params;
  try {
    await db.promise().query(sql, [id]);
    res.json({ message: "News deleted" });
  } catch (err) {
    console.error("DB-Delete Error (News):", err);
    res.status(500).json({ message: "Delete failed" });
  }
};
