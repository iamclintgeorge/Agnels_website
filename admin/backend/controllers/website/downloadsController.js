import {
  downloadCreate,
  downloadFetch,
  downloadFetchByCategory,
  downloadGetById,
  downloadUpdate,
  downloadDelete,
} from "../../models/website/downloadsModel.js";

// Create download
export const downloadCreateController = async (req, res) => {
  const { title, description, category, external_link, display_order, created_by } = req.body;
  const pdf_url = req.file ? `/cdn/${req.file.filename}` : null;

  try {
    const result = await downloadCreate(
      title,
      description,
      category,
      pdf_url,
      external_link,
      display_order || 0,
      created_by
    );

    res.json({
      success: true,
      message: "Download created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Download Creation Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error creating download"
    });
  }
};

// Fetch all downloads
export const downloadFetchController = async (req, res) => {
  try {
    const downloads = await downloadFetch();
    
    // Group downloads by category
    const groupedDownloads = {
      undergraduate: [],
      postgraduate: [],
      phd: [],
      other: []
    };

    downloads.forEach(download => {
      if (groupedDownloads[download.category]) {
        groupedDownloads[download.category].push(download);
      }
    });

    res.json({
      success: true,
      data: groupedDownloads
    });
  } catch (error) {
    console.error("Download Fetch Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching downloads"
    });
  }
};

// Fetch downloads by category
export const downloadFetchByCategoryController = async (req, res) => {
  const { category } = req.params;

  try {
    const downloads = await downloadFetchByCategory(category);
    res.json({
      success: true,
      data: downloads
    });
  } catch (error) {
    console.error("Download Fetch by Category Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching downloads by category"
    });
  }
};

// Get download by ID
export const downloadGetByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const download = await downloadGetById(id);
    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download not found"
      });
    }

    res.json({
      success: true,
      data: download
    });
  } catch (error) {
    console.error("Download Get by ID Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching download"
    });
  }
};

// Edit download
export const downloadEditController = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, external_link, display_order } = req.body;
  
  try {
    // Get existing download to preserve PDF if no new file uploaded
    const existingDownload = await downloadGetById(id);
    if (!existingDownload) {
      return res.status(404).json({
        success: false,
        message: "Download not found"
      });
    }

    const pdf_url = req.file ? `/cdn/${req.file.filename}` : null;

    const result = await downloadUpdate(
      id,
      title,
      description,
      category,
      pdf_url,
      external_link,
      display_order || 0
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Download not found"
      });
    }

    res.json({
      success: true,
      message: "Download updated successfully"
    });
  } catch (error) {
    console.error("Download Edit Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error updating download"
    });
  }
};

// Delete download
export const downloadDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await downloadDelete(id);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Download not found"
      });
    }

    res.json({
      success: true,
      message: "Download deleted successfully"
    });
  } catch (error) {
    console.error("Download Delete Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error deleting download"
    });
  }
};