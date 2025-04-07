import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define path to JSON file for storing academics data
const dataFilePath = path.join(__dirname, '../../data/academics.json');

// Ensure the data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper function to read data from JSON file
const readData = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      // Initialize with empty data if file doesn't exist
      const initialData = {};
      fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    
    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading academics data:", error);
    return {};
  }
};

// Helper function to write data to JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing academics data:", error);
    return false;
  }
};

// Get all available sections
export const getAllSections = async (req, res) => {
  try {
    const data = readData();
    const sections = Object.keys(data);
    
    res.json({ sections });
  } catch (error) {
    console.error("Error in getAllSections:", error);
    res.status(500).json({ error: "Error fetching sections" });
  }
};

// Get specific academics section content
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

// Update academics section content
export const updateSectionContent = async (req, res) => {
  try {
    const { sectionKey } = req.params;
    const { content } = req.body;
    
    if (!sectionKey || !content) {
      return res.status(400).json({ error: "Section key and content are required" });
    }

    // Read current data
    const data = readData();
    
    // Update the specific section
    data[sectionKey] = content;
    
    // Write updated data back to file
    const success = writeData(data);
    
    if (!success) {
      return res.status(500).json({ error: "Failed to save content" });
    }
    
    res.json({ message: "Content updated successfully", sectionKey });
  } catch (error) {
    console.error("Error in updateSectionContent:", error);
    res.status(500).json({ error: "Error updating section content" });
  }
}; 