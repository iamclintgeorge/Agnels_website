import db from "../../config/db.js";

export const NBANAACModel = {
  async saveHomeContent(content, imageUrls, pdfUrl, pdfTitle) {
    const query = `
      INSERT INTO nba_naac_home (content, image_urls, pdf_url, pdf_title)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        content = ?, 
        image_urls = ?, 
        pdf_url = ?, 
        pdf_title = ?, 
        updated_at = CURRENT_TIMESTAMP
    `;
    try {
      const [result] = await db
        .promise()
        .query(query, [
          content,
          JSON.stringify(imageUrls),
          pdfUrl,
          pdfTitle,
          content,
          JSON.stringify(imageUrls),
          pdfUrl,
          pdfTitle,
        ]);
      return result;
    } catch (error) {
      console.error("Database error saving home content:", error);
      throw error;
    }
  },

  async getHomeContent() {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT * FROM nba_naac_home ORDER BY updated_at DESC LIMIT 1");
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error("Database error fetching home content:", error);
      throw error;
    }
  },

  async saveFile(section, fileType, fileUrl, fileTitle) {
    const query = `
      INSERT INTO nba_naac_files (section, file_type, file_url, file_title)
      VALUES (?, ?, ?, ?)
    `;
    try {
      const [result] = await db
        .promise()
        .query(query, [section, fileType, fileUrl, fileTitle]);
      return result;
    } catch (error) {
      console.error("Database error saving file:", error);
      throw error;
    }
  },

  async getFiles(section) {
    try {
      const [rows] = await db
        .promise()
        .query(
          "SELECT * FROM nba_naac_files WHERE section = ? ORDER BY created_at DESC",
          [section]
        );
      return rows;
    } catch (error) {
      console.error("Database error fetching files:", error);
      throw error;
    }
  },
};
