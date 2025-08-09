import db from "../../config/db.js";

// Use the same infoText table pattern as About Us
export const getAdmissionsSection = async (sectionKey) => {
  const query = `
    SELECT id, Section AS sectionKey, Content AS content 
    FROM infoText 
    WHERE Section = ?;
  `;
  try {
    const [rows] = await db.promise().query(query, [sectionKey]);
    if (rows.length > 0) {
      try {
        // Try to parse as JSON, if it fails, wrap the content in a content object
        try {
          rows[0].content = JSON.parse(rows[0].content || "{}");
        } catch (parseError) {
          // If parsing fails, assume it's legacy content and wrap it
          rows[0].content = {
            content: rows[0].content || "",
          };
        }
      } catch (error) {
        console.error(
          `Error handling content for section ${sectionKey}:`,
          error
        );
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

export const upsertAdmissionsSection = async (sectionKey, contentObject) => {
  // Ensure contentObject is properly formatted
  if (!contentObject || typeof contentObject !== "object") {
    contentObject = { content: "" };
  } else if (typeof contentObject === "string") {
    try {
      // Try to parse if it's a JSON string
      contentObject = JSON.parse(contentObject);
    } catch (e) {
      // If parsing fails, wrap as simple content
      contentObject = { content: contentObject };
    }
  }

  // Safely convert to JSON string
  let contentString;
  try {
    contentString = JSON.stringify(contentObject);
  } catch (error) {
    console.error(`JSON stringify error for ${sectionKey}:`, error);
    contentString = JSON.stringify({ content: "" });
  }

  try {
    // First check if the section exists
    const [existingRows] = await db
      .promise()
      .query("SELECT id FROM infoText WHERE Section = ?", [sectionKey]);

    let result;
    if (existingRows.length > 0) {
      console.log(`Updating existing section ${sectionKey}`);
      // Update existing section
      const query = `
        UPDATE infoText 
        SET Content = ?, Updated_At = CURRENT_TIMESTAMP 
        WHERE Section = ?;
      `;
      [result] = await db.promise().query(query, [contentString, sectionKey]);
    } else {
      console.log(`Creating new section ${sectionKey}`);
      // Insert new section
      const query = `
        INSERT INTO infoText (Section, Content) 
        VALUES (?, ?);
      `;
      [result] = await db.promise().query(query, [sectionKey, contentString]);
    }

    console.log(`Database operation successful for ${sectionKey}`);

    // Fetch and return the updated section
    return await getAdmissionsSection(sectionKey);
  } catch (error) {
    console.error(`Database upsert error for section ${sectionKey}:`, error);
    console.error(`Content that failed:`, contentString);
    throw error;
  }
};

export const getAllAdmissionsSections = async () => {
  const query = `
    SELECT id, Section AS sectionKey, Content AS content 
    FROM infoText 
    WHERE Section LIKE 'admission_%';
  `;
  try {
    const [rows] = await db.promise().query(query);
    return rows.map((row) => {
      try {
        // Try to parse as JSON, if it fails, wrap the content in a content object
        try {
          row.content = JSON.parse(row.content || "{}");
        } catch (parseError) {
          // If parsing fails, assume it's legacy content and wrap it
          row.content = {
            content: row.content || "",
          };
        }
      } catch (error) {
        console.error(
          `Error handling content for section ${row.sectionKey}:`,
          error
        );
        row.content = {};
      }
      return row;
    });
  } catch (error) {
    console.error("Database fetch error for all admission sections:", error);
    throw error;
  }
};

