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
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

export const carouselDisplayController = async (req, res) => {
  const section = req.params.section;
  console.log("carouselDisplayController", section);
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
  const { subject, description, attachment, created_by } = req.body;
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
  const sql = `SELECT * FROM announcements WHERE deleted = '0'`;
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
  const { subject, description, attachment, created_by } = req.body;
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
  const sql = `UPDATE announcements SET deleted = '1' WHERE id = ?`;
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
