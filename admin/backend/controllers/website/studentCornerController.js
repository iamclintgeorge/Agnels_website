import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define path to JSON file for storing student corner data
const dataFilePath = path.join(__dirname, '../../data/studentCorner.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify({}), 'utf-8');
}

// Helper function to read data from JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return {};
  }
};

// Helper function to write data to JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to data file:', error);
    return false;
  }
};

// Helper function to get section content
export const getStudentCornerSection = async (sectionKey) => {
  try {
    const data = readData();
    return data[sectionKey] || null;
  } catch (error) {
    console.error(`Error fetching student corner section ${sectionKey}:`, error);
    throw error;
  }
};

// Get all student corner sections
export const getAllSections = async (req, res) => {
  try {
    const data = readData();
    const sections = Object.keys(data).map(sectionKey => ({
      sectionKey,
      content: data[sectionKey]
    }));
    res.json(sections);
  } catch (error) {
    console.error("Error in getAllSections:", error);
    res.status(500).json({ error: "Error fetching student corner sections" });
  }
};

// Get specific student corner section content
export const getSectionContent = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    if (!sectionKey) {
      return res.status(400).json({ error: "Section key is required" });
    }

    const data = readData();
    const content = data[sectionKey] || {};

    res.json({ sectionKey, content });
  } catch (error) {
    console.error("Error in getSectionContent:", error);
    res.status(500).json({ error: "Error fetching section content" });
  }
};

// Update student corner section content
export const updateSectionContent = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    const { content } = req.body;

    if (!sectionKey) {
      return res.status(400).json({ error: "Section key is required" });
    }

    if (!content || typeof content !== 'object') {
      return res.status(400).json({ error: "Content must be provided as a JSON object" });
    }

    // Read current data
    const data = readData();
    
    // Update the section
    data[sectionKey] = content;
    
    // Write back to file
    const success = writeData(data);
    
    if (success) {
      res.json({ success: true, message: "Content updated successfully" });
    } else {
      res.status(500).json({ error: "Failed to update content" });
    }
  } catch (error) {
    console.error("Error in updateSectionContent:", error);
    res.status(500).json({ 
      error: "Error updating section content",
      details: error.message
    });
  }
}; 