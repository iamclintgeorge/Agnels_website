import db from "../../config/db.js";

// Fetch a single IQAC section by key
export const getIQACSection = async (sectionKey) => {
  const query = `
    SELECT id, Section AS sectionKey, Content AS content 
    FROM infoText 
    WHERE Section = ?;
  `;
  try {
    const [rows] = await db.promise().query(query, [sectionKey]);
    if (rows.length > 0) {
      try {
        try {
          rows[0].content = JSON.parse(rows[0].content || "{}");
        } catch (parseError) {
          rows[0].content = { content: rows[0].content || "" };
        }
      } catch (error) {
        console.error(`Error handling content for section ${sectionKey}:`, error);
        rows[0].content = {};
      }
      return rows[0];
    }
    return { sectionKey, content: {} };
  } catch (error) {
    console.error(`Database fetch error for section ${sectionKey}:`, error);
    throw error;
  }
};

// Upsert an IQAC section
export const upsertIQACSection = async (sectionKey, contentObject) => {
  if (contentObject === null || contentObject === undefined) {
    contentObject = { content: "" };
  } else if (typeof contentObject === "string") {
    try {
      contentObject = JSON.parse(contentObject);
    } catch (_e) {
      contentObject = { content: contentObject };
    }
  }

  let contentString;
  try {
    contentString = JSON.stringify(contentObject);
  } catch (jsonError) {
    console.error(`Error stringifying content for section ${sectionKey}:`, jsonError);
    contentString = "{}";
  }

  try {
    const [existingRows] = await db
      .promise()
      .query("SELECT id FROM infoText WHERE Section = ?", [sectionKey]);

    let result;
    if (existingRows.length > 0) {
      const query = `
        UPDATE infoText 
        SET Content = ?, Updated_At = CURRENT_TIMESTAMP 
        WHERE Section = ?;
      `;
      [result] = await db.promise().query(query, [contentString, sectionKey]);
    } else {
      const query = `
        INSERT INTO infoText (Section, Content) 
        VALUES (?, ?);
      `;
      [result] = await db.promise().query(query, [sectionKey, contentString]);
    }

    return await getIQACSection(sectionKey);
  } catch (error) {
    console.error(`Database upsert error for section ${sectionKey}:`, error);
    console.error(`Content that failed:`, contentString);
    throw error;
  }
};

// List all IQAC sections (prefixed with iqac_)
export const getAllIQACSections = async () => {
  const query = `
    SELECT id, Section AS sectionKey, Content AS content 
    FROM infoText 
    WHERE Section LIKE 'iqac_%';
  `;
  try {
    const [rows] = await db.promise().query(query);
    return rows.map((row) => {
      try {
        try {
          row.content = JSON.parse(row.content || "{}");
        } catch (_parseError) {
          row.content = { content: row.content || "" };
        }
      } catch (error) {
        console.error(`Error handling content for section ${row.sectionKey}:`, error);
        row.content = {};
      }
      return row;
    });
  } catch (error) {
    console.error("Database fetch error for all IQAC sections:", error);
    throw error;
  }
};

// Delete IQAC section by key
export const deleteIQACSection = async (sectionKey) => {
  const query = `DELETE FROM infoText WHERE Section = ?`;
  try {
    const [result] = await db.promise().query(query, [sectionKey]);
    return result;
  } catch (error) {
    console.error(`Database delete error for section ${sectionKey}:`, error);
    throw error;
  }
};


