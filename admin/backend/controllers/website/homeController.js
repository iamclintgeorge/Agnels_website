import {
  carouselUpload,
  carouselDisplay,
  carouselDelete,
  fetchText,
} from "../../models/website/homeModel.js";
import fs from "fs/promises";
import path from "path";

export const carouselUploadController = async (req, res) => {
  try {
    const { altText } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = `/uploads/${image.filename}`;
    await carouselUpload(altText, imageUrl);

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
  try {
    const images = await carouselDisplay();
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

    // Delete the file from the server
    const filePath = path.join(process.cwd(), "public", image.imageUrl);
    await fs.unlink(filePath);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Error deleting image" });
  }
};

export const introTextController = async (req, res) => {
  try {
    const text = await fetchText();
    res.json(text);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Error fetching IntroText" });
  }
};
