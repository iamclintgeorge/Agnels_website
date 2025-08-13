import {
  saveAdmissionApplication,
  getAdmissionApplicationById,
  getAllAdmissions,
} from "../../models/website/admissionModel.js";

export const applyAdmissionController = async (req, res) => {
  try {
    const files = req.files;
    const {
      name,
      email,
      phone,
      course,
      academicDetails,
      address,
      dateOfBirth,
    } = req.body;

    // Basic validation
    if (!name || !email || !phone || !course) {
      return res.status(400).json({
        message: "Name, email, phone, and course are required fields.",
      });
    }

    // Prepare document paths
    const photoPath = files?.photo
      ? `/cdn/admissions/${files.photo[0].filename}`
      : null;
    const documentPaths = files?.documents
      ? files.documents.map((file) => `/cdn/admissions/${file.filename}`)
      : [];

    const applicationData = {
      name,
      email,
      phone,
      course,
      academicDetails,
      address,
      dateOfBirth,
      photo: photoPath,
      documents: documentPaths,
    };

    const savedApplication = await saveAdmissionApplication(applicationData);

    res.status(201).json({
      message: "Admission application submitted successfully.",
      application: savedApplication,
    });
  } catch (error) {
    console.error("Admission application error:", error);
    res
      .status(500)
      .json({ message: "Error submitting admission application." });
  }
};

export const getAdmissionController = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await getAdmissionApplicationById(id);
    if (!application) {
      return res
        .status(404)
        .json({ message: "Admission application not found." });
    }
    res.json(application);
  } catch (error) {
    console.error("Get admission application error:", error);
    res.status(500).json({ message: "Error fetching admission application." });
  }
};

export const getAllAdmissionsController = async (req, res) => {
  try {
    const applications = await getAllAdmissions();
    res.json(applications);
  } catch (error) {
    console.error("Get all admissions error:", error);
    res.status(500).json({ message: "Error fetching admission applications." });
  }
};
