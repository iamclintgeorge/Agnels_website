import {
  getProfile,
  updateProfile,
  addOnlineProfile,
  addSpecialization,
  addSubject,
  addPaper,
  addResearch,
  deleteOnlineProfile,
  deleteSpecialization,
  deleteSubject,
  deletePaper,
  deleteResearch,
} from "../../models/website/profileModel.js";
import fs from "fs/promises";
import path from "path";

export const getProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await getProfile(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error("Fetch profile error:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, qualification, designation, email, dateOfJoining } = req.body;
    const files = req.files;

    // Debug incoming data
    console.log("Request body:", req.body);
    console.log("Files:", files);

    // Validate required fields
    if (!name || !qualification || !designation || !email || !dateOfJoining) {
      return res.status(400).json({
        message:
          "All required fields (name, qualification, designation, email, dateOfJoining) must be provided",
      });
    }

    const updateData = {
      name,
      qualification,
      designation,
      email,
      dateOfJoining,
      photo: files?.photo ? `/cdn/${files.photo[0].filename}` : null,
      bioData: files?.bioData ? `/cdn/${files.bioData[0].filename}` : null,
      publications: files?.publications
        ? `/cdn/${files.publications[0].filename}`
        : null,
    };

    const updatedProfile = await updateProfile(id, updateData);
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

export const addOnlineProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    await addOnlineProfile(id, description);
    res.json({ message: "Online profile added successfully" });
  } catch (error) {
    console.error("Add online profile error:", error);
    res.status(500).json({ message: "Error adding online profile" });
  }
};

export const addSpecializationController = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    await addSpecialization(id, description);
    res.json({ message: "Specialization added successfully" });
  } catch (error) {
    console.error("Add specialization error:", error);
    res.status(500).json({ message: "Error adding specialization" });
  }
};

export const addSubjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, type, semester } = req.body;
    if (!subject || !type || !semester) {
      return res
        .status(400)
        .json({ message: "Subject, type, and semester are required" });
    }
    await addSubject(id, subject, type, semester);
    res.json({ message: "Subject added successfully" });
  } catch (error) {
    console.error("Add subject error:", error);
    res.status(500).json({ message: "Error adding subject" });
  }
};

export const addPaperController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    await addPaper(id, title, description, link);
    res.json({ message: "Paper added successfully" });
  } catch (error) {
    console.error("Add paper error:", error);
    res.status(500).json({ message: "Error adding paper" });
  }
};

export const addResearchController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, grant_type, funding_organization, amount, duration } =
      req.body;
    if (
      !title ||
      !grant_type ||
      !funding_organization ||
      !amount ||
      !duration
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await addResearch(
      id,
      title,
      grant_type,
      funding_organization,
      amount,
      duration
    );
    res.json({ message: "Research project added successfully" });
  } catch (error) {
    console.error("Add research error:", error);
    res.status(500).json({ message: "Error adding research project" });
  }
};

export const deleteOnlineProfileController = async (req, res) => {
  try {
    const { id, profileId } = req.params;
    const deleted = await deleteOnlineProfile(id, profileId);
    if (!deleted) {
      return res.status(404).json({ message: "Online profile not found" });
    }
    res.json({ message: "Online profile deleted successfully" });
  } catch (error) {
    console.error("Delete online profile error:", error);
    res.status(500).json({ message: "Error deleting online profile" });
  }
};

export const deleteSpecializationController = async (req, res) => {
  try {
    const { id, specId } = req.params;
    const deleted = await deleteSpecialization(id, specId);
    if (!deleted) {
      return res.status(404).json({ message: "Specialization not found" });
    }
    res.json({ message: "Specialization deleted successfully" });
  } catch (error) {
    console.error("Delete specialization error:", error);
    res.status(500).json({ message: "Error deleting specialization" });
  }
};

export const deleteSubjectController = async (req, res) => {
  try {
    const { id, subjectId } = req.params;
    const deleted = await deleteSubject(id, subjectId);
    if (!deleted) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Delete subject error:", error);
    res.status(500).json({ message: "Error deleting subject" });
  }
};

export const deletePaperController = async (req, res) => {
  try {
    const { id, paperId } = req.params;
    const deleted = await deletePaper(id, paperId);
    if (!deleted) {
      return res.status(404).json({ message: "Paper not found" });
    }
    res.json({ message: "Paper deleted successfully" });
  } catch (error) {
    console.error("Delete paper error:", error);
    res.status(500).json({ message: "Error deleting paper" });
  }
};

export const deleteResearchController = async (req, res) => {
  try {
    const { id, researchId } = req.params;
    const deleted = await deleteResearch(id, researchId);
    if (!deleted) {
      return res.status(404).json({ message: "Research project not found" });
    }
    res.json({ message: "Research project deleted successfully" });
  } catch (error) {
    console.error("Delete research error:", error);
    res.status(500).json({ message: "Error deleting research project" });
  }
};
