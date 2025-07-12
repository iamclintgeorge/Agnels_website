// import db from "../../config/db.js";

// export const principalTextDisplay = async () => {
//   const query = `
//         SELECT * FROM infoText WHERE Section = 'principalDesk';
//       `;

//   try {
//     const [rows] = await db.promise().promise().query(query);
//     return rows;
//   } catch (error) {
//     console.error("Database fetch error:", error);
//     throw error;
//   }
// };

import db from "../../config/db.js";

export const principalTextDisplay = async () => {
  const query = `
    SELECT * FROM infoText WHERE Section = 'principalDesk';
  `;

  try {
    const [rows] = await db.promise().query(query);
    return rows;
  } catch (error) {
    console.error("Database fetch error:", error);
    throw error;
  }
};

export const getAboutUsSection = async (sectionKey) => {
  const query = `
    SELECT id, Section AS sectionKey, Content AS content 
    FROM infoText 
    WHERE Section = ?;
  `;
  try {
    const [rows] = await db.query(query, [sectionKey]);
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

export const upsertAboutUsSection = async (sectionKey, contentObject) => {
  // Ensure contentObject is properly formatted
  if (contentObject === null || contentObject === undefined) {
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

  // Handle special case for sections with known structures
  if (sectionKey === "Managing Director's Desk") {
    // Create a clean object without prototype properties
    const cleanDirector = {};
    const cleanQuotes = {};

    // Ensure director object exists and copy its properties safely
    if (contentObject.director && typeof contentObject.director === "object") {
      Object.keys(contentObject.director).forEach((key) => {
        if (typeof contentObject.director[key] !== "function") {
          cleanDirector[key] = contentObject.director[key];
        }
      });
    }

    // Ensure quotes object exists and copy its properties safely
    if (contentObject.quotes && typeof contentObject.quotes === "object") {
      Object.keys(contentObject.quotes).forEach((key) => {
        if (typeof contentObject.quotes[key] !== "function") {
          cleanQuotes[key] = contentObject.quotes[key];
        }
      });
    }

    // Create a new clean object
    const cleanObject = {
      title: contentObject.title || "Managing Director's Desk",
      subtitle:
        contentObject.subtitle || "A message from our Managing Director",
      director: cleanDirector,
      quotes: cleanQuotes,
    };

    // Replace contentObject with the clean version
    contentObject = cleanObject;
  }

  // Safely convert to JSON string, handling circular references
  let contentString;
  try {
    // Create clean copy of entire object to ensure no prototype issues
    const safeObject = {};
    for (const key in contentObject) {
      if (
        Object.prototype.hasOwnProperty.call(contentObject, key) &&
        typeof contentObject[key] !== "function"
      ) {
        // Handle nested objects carefully
        if (
          typeof contentObject[key] === "object" &&
          contentObject[key] !== null
        ) {
          try {
            // Convert to JSON and back to strip any problematic properties
            safeObject[key] = JSON.parse(JSON.stringify(contentObject[key]));
          } catch (e) {
            console.error(`Error processing nested object for key ${key}:`, e);
            // If conversion fails, try to salvage with a simpler object
            if (Array.isArray(contentObject[key])) {
              safeObject[key] = [];
            } else {
              safeObject[key] = {};
            }
          }
        } else {
          // For primitive values, copy directly
          safeObject[key] = contentObject[key];
        }
      }
    }

    contentString = JSON.stringify(safeObject);
    console.log(
      "Successfully stringified content:",
      contentString.substring(0, 100) + "..."
    );
  } catch (jsonError) {
    console.error(
      `Error stringifying content for section ${sectionKey}:`,
      jsonError
    );
    // Fallback to an empty object if all else fails
    contentString = "{}";
  }

  try {
    // First check if the section exists
    const [existingRows] = await db.query(
      "SELECT id FROM infoText WHERE Section = ?",
      [sectionKey]
    );

    let result;
    if (existingRows.length > 0) {
      console.log(`Updating existing section ${sectionKey}`);
      // Update existing section
      const query = `
        UPDATE infoText 
        SET Content = ?, Updated_At = CURRENT_TIMESTAMP 
        WHERE Section = ?;
      `;
      [result] = await db.query(query, [contentString, sectionKey]);
    } else {
      console.log(`Creating new section ${sectionKey}`);
      // Insert new section
      const query = `
        INSERT INTO infoText (Section, Content) 
        VALUES (?, ?);
      `;
      [result] = await db.query(query, [sectionKey, contentString]);
    }

    console.log(`Database operation successful for ${sectionKey}`);

    // Fetch and return the updated section
    return await getAboutUsSection(sectionKey);
  } catch (error) {
    console.error(`Database upsert error for section ${sectionKey}:`, error);
    console.error(`Content that failed:`, contentString);
    throw error;
  }
};

export const getAllAboutUsSections = async () => {
  const query = `
    SELECT id, Section AS sectionKey, Content AS content 
    FROM infoText 
    WHERE Section != 'principalDesk';
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
    console.error("Database fetch error for all About Us sections:", error);
    throw error;
  }
};
