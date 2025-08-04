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

// import db from "../../config/db.js";

// NAAC Model
export const NAACModel = {
  async saveNAACContent(department_id, type, method) {
    const query = `
      INSERT INTO naacs (department_id, type, method)
      VALUES (?, ?, ?)
    `;
    try {
      const [result] = await db.promise().query(query, [department_id, type, method]);
      return result;
    } catch (error) {
      console.error("Database error saving NAAC content:", error);
      throw error;
    }
  },

  async updateNAACContent(id, department_id, type, method) {
    const query = `
      UPDATE naacs 
      SET department_id = ?, type = ?, method = ?
      WHERE id = ?
    `;
    try {
      const [result] = await db.promise().query(query, [department_id, type, method, id]);
      return result;
    } catch (error) {
      console.error("Database error updating NAAC content:", error);
      throw error;
    }
  },

  async getNAACContent(id = null) {
    let query = "SELECT * FROM naacs";
    let params = [];
    
    if (id) {
      query += " WHERE id = ?";
      params = [id];
    }
    
    query += " ORDER BY id DESC";
    
    try {
      const [rows] = await db.promise().query(query, params);
      return id ? (rows.length ? rows[0] : null) : rows;
    } catch (error) {
      console.error("Database error fetching NAAC content:", error);
      throw error;
    }
  },

  async deleteNAACContent(id) {
    const query = "DELETE FROM naacs WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error("Database error deleting NAAC content:", error);
      throw error;
    }
  }
};

// NAAC Appeals Model
export const NAACAppealsModel = {
  async saveAppealsContent(department_id, type, method) {
    const query = `
      INSERT INTO naac_appeals (department_id, type, method)
      VALUES (?, ?, ?)
    `;
    try {
      const [result] = await db.promise().query(query, [department_id, type, method]);
      return result;
    } catch (error) {
      console.error("Database error saving NAAC appeals content:", error);
      throw error;
    }
  },

  async updateAppealsContent(id, department_id, type, method) {
    const query = `
      UPDATE naac_appeals 
      SET department_id = ?, type = ?, method = ?
      WHERE id = ?
    `;
    try {
      const [result] = await db.promise().query(query, [department_id, type, method, id]);
      return result;
    } catch (error) {
      console.error("Database error updating NAAC appeals content:", error);
      throw error;
    }
  },

  async getAppealsContent(id = null) {
    let query = "SELECT * FROM naac_appeals";
    let params = [];
    
    if (id) {
      query += " WHERE id = ?";
      params = [id];
    }
    
    query += " ORDER BY id DESC";
    
    try {
      const [rows] = await db.promise().query(query, params);
      return id ? (rows.length ? rows[0] : null) : rows;
    } catch (error) {
      console.error("Database error fetching NAAC appeals content:", error);
      throw error;
    }
  },

  async deleteAppealsContent(id) {
    const query = "DELETE FROM naac_appeals WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error("Database error deleting NAAC appeals content:", error);
      throw error;
    }
  }
};

// AQAR 2019-20 Model
export const AQAR19Model = {
  async saveAQAR19Content(department_id, type, method) {
    const query = `
      INSERT INTO aqar19_naacs (department_id, type, method)
      VALUES (?, ?, ?)
    `;
    try {
      const [result] = await db.promise().query(query, [department_id, type, method]);
      return result;
    } catch (error) {
      console.error("Database error saving AQAR 2019-20 content:", error);
      throw error;
    }
  },

  async updateAQAR19Content(id, department_id, type, method) {
    const query = `
      UPDATE aqar19_naacs 
      SET department_id = ?, type = ?, method = ?
      WHERE id = ?
    `;
    try {
      const [result] = await db.promise().query(query, [department_id, type, method, id]);
      return result;
    } catch (error) {
      console.error("Database error updating AQAR 2019-20 content:", error);
      throw error;
    }
  },

  async getAQAR19Content(id = null) {
    let query = "SELECT * FROM aqar19_naacs";
    let params = [];
    
    if (id) {
      query += " WHERE id = ?";
      params = [id];
    }
    
    query += " ORDER BY id DESC";
    
    try {
      const [rows] = await db.promise().query(query, params);
      return id ? (rows.length ? rows[0] : null) : rows;
    } catch (error) {
      console.error("Database error fetching AQAR 2019-20 content:", error);
      throw error;
    }
  },

  async deleteAQAR19Content(id) {
    const query = "DELETE FROM aqar19_naacs WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error("Database error deleting AQAR 2019-20 content:", error);
      throw error;
    }
  }
};

// AQAR 2020-21 Model  
export const AQAR20Model = {
  async saveAQAR20Content(department_id, type, method) {
    const query = `
      INSERT INTO aqar20_naacs (department_id, type, method)
      VALUES (?, ?, ?)
    `;
    try {
      const [result] = await db.promise().query(query, [department_id, type, method]);
      return result;
    } catch (error) {
      console.error("Database error saving AQAR 2020-21 content:", error);
      throw error;
    }
  },

  async updateAQAR20Content(id, department_id, type, method) {
    const query = `
      UPDATE aqar20_naacs 
      SET department_id = ?, type = ?, method = ?
      WHERE id = ?
    `;
    try {
      const [result] = await db.promise().query(query, [department_id, type, method, id]);
      return result;
    } catch (error) {
      console.error("Database error updating AQAR 2020-21 content:", error);
      throw error;
    }
  },

  async getAQAR20Content(id = null) {
    let query = "SELECT * FROM aqar20_naacs";
    let params = [];
    
    if (id) {
      query += " WHERE id = ?";
      params = [id];
    }
    
    query += " ORDER BY id DESC";
    
    try {
      const [rows] = await db.promise().query(query, params);
      return id ? (rows.length ? rows[0] : null) : rows;
    } catch (error) {
      console.error("Database error fetching AQAR 2020-21 content:", error);
      throw error;
    }
  },

  async deleteAQAR20Content(id) {
    const query = "DELETE FROM aqar20_naacs WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [id]);
      return result;
    } catch (error) {
      console.error("Database error deleting AQAR 2020-21 content:", error);
      throw error;
    }
  }
};
