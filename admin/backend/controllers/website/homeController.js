import {
  carouselUpload,
  carouselDisplay,
} from "../../models/website/homeModel.js";

export const carouselUploadController = (req, res) => {
  try {
    const { altText } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = `/uploads/${image.filename}`;
    const db_upload = carouselUpload(altText, imageUrl); // This now saves both altText and filename

    console.log({
      altText,
      imageUrl,
      originalName: image.originalname,
      size: image.size,
    });

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
