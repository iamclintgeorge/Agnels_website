import express from "express";
import {
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
  getAllDepartments,
} from "../../controllers/website/facultyStaffController.js";

const router = express.Router();

// Fetch all faculties
router.get("/", getAllFaculties);

//Fetch all the departments
router.get("/departments", getAllDepartments);

// Update department and sr_no
router.put("/:id", updateFaculty);

// Delete a faculty
router.put("/delete/:id", deleteFaculty);

export default router;
