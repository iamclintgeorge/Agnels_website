import DepartmentModel from "../../models/website/departmentModel.js";

class DepartmentController {
  // DEPT_TEXT CONTROLLERS
  static async createDeptText(req, res) {
    try {
      const { departmentId, section, content } = req.body;
      const createdBy = req.user?.id || 1;

      if (!departmentId || !section || !content) {
        return res.status(400).json({
          success: false,
          message: "Department ID, section, and content are required",
        });
      }

      // Check if text already exists for this department and section
      const existingText = await DepartmentModel.getDeptText(
        departmentId,
        section
      );

      let result;
      if (existingText) {
        // Update existing text
        result = await DepartmentModel.updateDeptText(existingText.id, content);
      } else {
        // Create new text
        result = await DepartmentModel.createDeptText(
          departmentId,
          section,
          content,
          createdBy
        );
      }

      res.status(200).json({
        success: true,
        message: existingText
          ? "Text updated successfully"
          : "Text created successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error in createDeptText:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getDeptText(req, res) {
    try {
      const { departmentId, section } = req.params;

      if (!departmentId || !section) {
        return res.status(400).json({
          success: false,
          message: "Department ID and section are required",
        });
      }

      const text = await DepartmentModel.getDeptText(departmentId, section);

      res.status(200).json({
        success: true,
        data: text,
      });
    } catch (error) {
      console.error("Error in getDeptText:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deleteDeptText(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deleteDeptText(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Text not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Text deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteDeptText:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  //Dept Vision and Mission Controllers
  static async updateDeptVisionText(req, res) {
    try {
      const { vision } = req.body;
      const { id } = req.params;
      console.log("id, vision", id, vision);

      if (!id || !vision) {
        return res.status(400).json({
          success: false,
          message: "ID, and vision are required",
        });
      }

      const result = await DepartmentModel.updateDeptVisionText(id, vision);

      res.status(200).json({
        success: true,
        message: "Text updated successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error in updateDeptVisionText:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateDeptMissionText(req, res) {
    try {
      const { mission } = req.body;
      const { id } = req.params;
      console.log("id, mission", id, mission);

      if (!id || !mission) {
        return res.status(400).json({
          success: false,
          message: "ID, and mission are required",
        });
      }

      const result = await DepartmentModel.updateDeptMissionText(id, mission);

      res.status(200).json({
        success: true,
        message: "Text updated successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error in updateDeptVisionText:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateDeptObjectivesText(req, res) {
    try {
      const { objective } = req.body;
      const { id } = req.params;

      if (!id || !objective) {
        return res.status(400).json({
          success: false,
          message: "ID, and objective are required",
        });
      }

      const result = await DepartmentModel.updateDeptObjectiveText(
        id,
        objective
      );

      res.status(200).json({
        success: true,
        message: "Text updated successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error in updateDeptVisionText:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateDeptOutcomesText(req, res) {
    try {
      const { outcome } = req.body;
      const { id } = req.params;

      if (!id || !outcome) {
        return res.status(400).json({
          success: false,
          message: "ID, and outcome are required",
        });
      }

      const result = await DepartmentModel.updateDeptOutcomesText(id, outcome);

      res.status(200).json({
        success: true,
        message: "Text updated successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error in updateDeptVisionText:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getDeptVisionText(req, res) {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const text = await DepartmentModel.getDeptVisionText(departmentId);

      res.status(200).json({
        success: true,
        data: text,
      });
    } catch (error) {
      console.error("Error in getDeptVisionText:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getDeptObjectiveText(req, res) {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const text = await DepartmentModel.getDeptObjectiveText(departmentId);

      res.status(200).json({
        success: true,
        data: text,
      });
    } catch (error) {
      console.error("Error in getDeptVisionText:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // DEPT_COMMITTEES CONTROLLERS
  static async createCommittee(req, res) {
    try {
      const { type, departmentId, year } = req.body;
      const createdBy = req.user?.id || 1;

      if (!type || !departmentId || !year || !req.file) {
        return res.status(400).json({
          success: false,
          message: "Type, department ID, year, and file are required",
        });
      }

      const attachment = req.file.filename;
      const result = await DepartmentModel.createCommittee(
        type,
        departmentId,
        year,
        attachment,
        createdBy
      );

      res.status(201).json({
        success: true,
        message: "Committee document created successfully",
        data: { id: result.insertId, attachment },
      });
    } catch (error) {
      console.error("Error in createCommittee:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getCommittees(req, res) {
    try {
      const { departmentId } = req.params;
      const { type } = req.query;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const committees = await DepartmentModel.getCommittees(
        departmentId,
        type
      );

      res.status(200).json({
        success: true,
        data: committees,
      });
    } catch (error) {
      console.error("Error in getCommittees:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateCommittee(req, res) {
    try {
      const { id } = req.params;
      const { year } = req.body;
      const attachment = req.file?.filename;

      if (!id || !year) {
        return res.status(400).json({
          success: false,
          message: "ID and year are required",
        });
      }

      const result = await DepartmentModel.updateCommittee(
        id,
        year,
        attachment
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Committee document not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Committee document updated successfully",
      });
    } catch (error) {
      console.error("Error in updateCommittee:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deleteCommittee(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deleteCommittee(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Committee document not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Committee document deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteCommittee:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // PUBLICATIONS CONTROLLERS
  static async createPublication(req, res) {
    try {
      const { departmentId, year } = req.body;
      const createdBy = req.user?.id || 1;

      if (!departmentId || !year || !req.file) {
        return res.status(400).json({
          success: false,
          message: "Department ID, year, and file are required",
        });
      }

      const attachment = req.file.filename;
      const result = await DepartmentModel.createPublication(
        departmentId,
        year,
        attachment,
        createdBy
      );

      res.status(201).json({
        success: true,
        message: "Publication created successfully",
        data: { id: result.insertId, attachment },
      });
    } catch (error) {
      console.error("Error in createPublication:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getPublications(req, res) {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const publications = await DepartmentModel.getPublications(departmentId);

      res.status(200).json({
        success: true,
        data: publications,
      });
    } catch (error) {
      console.error("Error in getPublications:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updatePublication(req, res) {
    try {
      const { id } = req.params;
      const { year } = req.body;
      const attachment = req.file?.filename;

      if (!id || !year) {
        return res.status(400).json({
          success: false,
          message: "ID and year are required",
        });
      }

      const result = await DepartmentModel.updatePublication(
        id,
        year,
        attachment
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Publication not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Publication updated successfully",
      });
    } catch (error) {
      console.error("Error in updatePublication:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deletePublication(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deletePublication(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Publication not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Publication deleted successfully",
      });
    } catch (error) {
      console.error("Error in deletePublication:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // MAGAZINES CONTROLLERS
  static async createMagazine(req, res) {
    try {
      const { departmentId, year } = req.body;
      const createdBy = req.user?.id || 1;

      if (!departmentId || !year || !req.file) {
        return res.status(400).json({
          success: false,
          message: "Department ID, year, and file are required",
        });
      }

      const attachment = req.file.filename;
      const result = await DepartmentModel.createMagazine(
        departmentId,
        year,
        attachment,
        createdBy
      );

      res.status(201).json({
        success: true,
        message: "Magazine created successfully",
        data: { id: result.insertId, attachment },
      });
    } catch (error) {
      console.error("Error in createMagazine:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getMagazines(req, res) {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const magazines = await DepartmentModel.getMagazines(departmentId);

      res.status(200).json({
        success: true,
        data: magazines,
      });
    } catch (error) {
      console.error("Error in getMagazines:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateMagazine(req, res) {
    try {
      const { id } = req.params;
      const { year } = req.body;
      const attachment = req.file?.filename;

      if (!id || !year) {
        return res.status(400).json({
          success: false,
          message: "ID and year are required",
        });
      }

      const result = await DepartmentModel.updateMagazine(id, year, attachment);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Magazine not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Magazine updated successfully",
      });
    } catch (error) {
      console.error("Error in updateMagazine:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deleteMagazine(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deleteMagazine(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Magazine not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Magazine deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteMagazine:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // TIME_TABLES CONTROLLERS
  static async createTimeTable(req, res) {
    try {
      const { departmentId, type, division, semester } = req.body;
      const createdBy = req.user?.id || 1;

      if (!departmentId || !type || !semester || !req.file) {
        return res.status(400).json({
          success: false,
          message: "Department ID, type, semester, and file are required",
        });
      }

      const attachment = req.file.filename;
      const result = await DepartmentModel.createTimeTable(
        departmentId,
        type,
        division,
        semester,
        attachment,
        createdBy
      );

      res.status(201).json({
        success: true,
        message: "Time table created successfully",
        data: { id: result.insertId, attachment },
      });
    } catch (error) {
      console.error("Error in createTimeTable:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getTimeTables(req, res) {
    try {
      const { departmentId } = req.params;
      const { type, semester } = req.query;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const timeTables = await DepartmentModel.getTimeTables(
        departmentId,
        type,
        semester
      );

      res.status(200).json({
        success: true,
        data: timeTables,
      });
    } catch (error) {
      console.error("Error in getTimeTables:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateTimeTable(req, res) {
    try {
      const { id } = req.params;
      const { type, division, semester } = req.body;
      const attachment = req.file?.filename;

      if (!id || !type || !semester) {
        return res.status(400).json({
          success: false,
          message: "ID, type, and semester are required",
        });
      }

      const result = await DepartmentModel.updateTimeTable(
        id,
        type,
        division,
        semester,
        attachment
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Time table not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Time table updated successfully",
      });
    } catch (error) {
      console.error("Error in updateTimeTable:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deleteTimeTable(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deleteTimeTable(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Time table not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Time table deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteTimeTable:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // ACHIEVEMENTS CONTROLLERS
  static async createAchievement(req, res) {
    try {
      const { type, departmentId, year } = req.body;
      const createdBy = req.user?.id || 1;

      if (!type || !departmentId || !year || !req.file) {
        return res.status(400).json({
          success: false,
          message: "Type, department ID, year, and file are required",
        });
      }

      const attachment = req.file.filename;
      const result = await DepartmentModel.createAchievement(
        type,
        departmentId,
        year,
        attachment,
        createdBy
      );

      res.status(201).json({
        success: true,
        message: "Achievement created successfully",
        data: { id: result.insertId, attachment },
      });
    } catch (error) {
      console.error("Error in createAchievement:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getAchievements(req, res) {
    try {
      const { departmentId } = req.params;
      const { type } = req.query;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const achievements = await DepartmentModel.getAchievements(
        departmentId,
        type
      );

      res.status(200).json({
        success: true,
        data: achievements,
      });
    } catch (error) {
      console.error("Error in getAchievements:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateAchievement(req, res) {
    try {
      const { id } = req.params;
      const { year } = req.body;
      const attachment = req.file?.filename;

      if (!id || !year) {
        return res.status(400).json({
          success: false,
          message: "ID and year are required",
        });
      }

      const result = await DepartmentModel.updateAchievement(
        id,
        year,
        attachment
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Achievement not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Achievement updated successfully",
      });
    } catch (error) {
      console.error("Error in updateAchievement:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deleteAchievement(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deleteAchievement(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Achievement not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Achievement deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteAchievement:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // ACADEMIC_CALENDARS CONTROLLERS
  static async createAcademicCalendar(req, res) {
    try {
      const { type, departmentId } = req.body;
      const createdBy = req.user?.id || 1;

      if (!type || !departmentId || !req.file) {
        return res.status(400).json({
          success: false,
          message: "Type, department ID, and file are required",
        });
      }

      const attachment = req.file.filename;
      const result = await DepartmentModel.createAcademicCalendar(
        type,
        departmentId,
        attachment,
        createdBy
      );

      res.status(201).json({
        success: true,
        message: "Academic calendar created successfully",
        data: { id: result.insertId, attachment },
      });
    } catch (error) {
      console.error("Error in createAcademicCalendar:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getAcademicCalendars(req, res) {
    try {
      const { departmentId } = req.params;
      const { type } = req.query;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const calendars = await DepartmentModel.getAcademicCalendars(
        departmentId,
        type
      );

      res.status(200).json({
        success: true,
        data: calendars,
      });
    } catch (error) {
      console.error("Error in getAcademicCalendars:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateAcademicCalendar(req, res) {
    try {
      const { id } = req.params;

      if (!id || !req.file) {
        return res.status(400).json({
          success: false,
          message: "ID and file are required",
        });
      }

      const attachment = req.file.filename;
      const result = await DepartmentModel.updateAcademicCalendar(
        id,
        attachment
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Academic calendar not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Academic calendar updated successfully",
      });
    } catch (error) {
      console.error("Error in updateAcademicCalendar:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deleteAcademicCalendar(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deleteAcademicCalendar(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Academic calendar not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Academic calendar deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteAcademicCalendar:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // ACTIVITIES CONTROLLERS
  static async createActivity(req, res) {
    try {
      const { departmentId, heading } = req.body;
      const createdBy = req.user?.id || 1;

      if (!departmentId || !heading || !req.file) {
        return res.status(400).json({
          success: false,
          message: "Department ID, heading, and file are required",
        });
      }

      const attachment = req.file.filename;
      const result = await DepartmentModel.createActivity(
        departmentId,
        heading,
        attachment,
        createdBy
      );

      res.status(201).json({
        success: true,
        message: "Activity created successfully",
        data: { id: result.insertId, attachment },
      });
    } catch (error) {
      console.error("Error in createActivity:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getActivities(req, res) {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const activities = await DepartmentModel.getActivities(departmentId);

      res.status(200).json({
        success: true,
        data: activities,
      });
    } catch (error) {
      console.error("Error in getActivities:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateActivity(req, res) {
    try {
      const { id } = req.params;
      const { heading } = req.body;
      const attachment = req.file?.filename;

      if (!id || !heading) {
        return res.status(400).json({
          success: false,
          message: "ID and heading are required",
        });
      }

      const result = await DepartmentModel.updateActivity(
        id,
        heading,
        attachment
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Activity not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Activity updated successfully",
      });
    } catch (error) {
      console.error("Error in updateActivity:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deleteActivity(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deleteActivity(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Activity not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Activity deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteActivity:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // ASSOCIATIONS CONTROLLERS
  static async createAssociation(req, res) {
    try {
      const { departmentId, year } = req.body;
      const createdBy = req.user?.id || 1;

      if (!departmentId || !year || !req.file) {
        return res.status(400).json({
          success: false,
          message: "Department ID, year, and file are required",
        });
      }

      const attachment = req.file.filename;
      const result = await DepartmentModel.createAssociation(
        departmentId,
        year,
        attachment,
        createdBy
      );

      res.status(201).json({
        success: true,
        message: "Association created successfully",
        data: { id: result.insertId, attachment },
      });
    } catch (error) {
      console.error("Error in createAssociation:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getAssociations(req, res) {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const associations = await DepartmentModel.getAssociations(departmentId);

      res.status(200).json({
        success: true,
        data: associations,
      });
    } catch (error) {
      console.error("Error in getAssociations:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateAssociation(req, res) {
    try {
      const { id } = req.params;
      const { year } = req.body;
      const attachment = req.file?.filename;

      if (!id || !year) {
        return res.status(400).json({
          success: false,
          message: "ID and year are required",
        });
      }

      const result = await DepartmentModel.updateAssociation(
        id,
        year,
        attachment
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Association not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Association updated successfully",
      });
    } catch (error) {
      console.error("Error in updateAssociation:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deleteAssociation(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deleteAssociation(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Association not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Association deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteAssociation:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // PROJECTS CONTROLLERS (BE/TE/SE)
  static async createUndergraduateProject(req, res) {
    try {
      const { departmentId, projects } = req.body;
      const createdBy = req.user?.id || 1;

      if (!departmentId || !projects) {
        return res.status(400).json({
          success: false,
          message: "Department ID and projects are required",
        });
      }

      const result = await DepartmentModel.createUndergraduateProject(
        departmentId,
        projects,
        createdBy
      );

      res.status(201).json({
        success: true,
        message: "BE project created successfully",
        data: { id: result.insertId },
      });
    } catch (error) {
      console.error("Error in createUndergraduateProject:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getUndergraduateProjects(req, res) {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const projects = await DepartmentModel.getUndergraduateProjects(
        departmentId
      );

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      console.error("Error in getUndergraduateProjects:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateUndergraduateProject(req, res) {
    try {
      const { id } = req.params;
      const { projects } = req.body;

      if (!id || !projects) {
        return res.status(400).json({
          success: false,
          message: "ID and projects are required",
        });
      }

      const result = await DepartmentModel.updateUndergraduateProject(
        id,
        projects
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "BE project not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "BE project updated successfully",
      });
    } catch (error) {
      console.error("Error in updateUndergraduateProject:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deleteUndergraduateProject(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deleteUndergraduateProject(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "BE project not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "BE project deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteUndergraduateProject:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async createMiniProject(req, res) {
    try {
      const { departmentId, level, projects } = req.body;
      const createdBy = req.user?.id || 1;

      if (!departmentId || !level || !projects) {
        return res.status(400).json({
          success: false,
          message: "Department ID, level, and projects are required",
        });
      }

      if (!["TE", "SE"].includes(level)) {
        return res.status(400).json({
          success: false,
          message: "Level must be either TE or SE",
        });
      }

      const result = await DepartmentModel.createMiniProject(
        departmentId,
        level,
        projects,
        createdBy
      );

      res.status(201).json({
        success: true,
        message: `${level} project created successfully`,
        data: { id: result.insertId },
      });
    } catch (error) {
      console.error("Error in createMiniProject:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async getMiniProjects(req, res) {
    try {
      const { departmentId } = req.params;
      const { level } = req.query;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Department ID is required",
        });
      }

      const projects = await DepartmentModel.getMiniProjects(
        departmentId,
        level
      );

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      console.error("Error in getMiniProjects:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async updateMiniProject(req, res) {
    try {
      const { id } = req.params;
      const { projects } = req.body;

      if (!id || !projects) {
        return res.status(400).json({
          success: false,
          message: "ID and projects are required",
        });
      }

      const result = await DepartmentModel.updateMiniProject(id, projects);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Mini project not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Mini project updated successfully",
      });
    } catch (error) {
      console.error("Error in updateMiniProject:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  static async deleteMiniProject(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required",
        });
      }

      const result = await DepartmentModel.deleteMiniProject(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Mini project not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Mini project deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteMiniProject:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  // Infrastructure Controller
  static async getInfra(req, res) {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Infrastructure ID is required",
        });
      }

      const infrastructure = await DepartmentModel.getInfraModel(departmentId);

      if (!infrastructure) {
        return res.status(404).json({
          success: false,
          message: "Infrastructure not found",
        });
      }

      res.json({
        success: true,
        data: infrastructure,
        message: "Infrastructure retrieved successfully",
      });
    } catch (error) {
      console.error("Error getting infrastructure by ID:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve infrastructure",
        error: error.message,
      });
    }
  }

  // Syllabus Controller
  static async getSyllabus(req, res) {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "Syllabus ID is required",
        });
      }

      const Syllabus = await DepartmentModel.getSyllabusModel(departmentId);

      if (!Syllabus) {
        return res.status(404).json({
          success: false,
          message: "Syllabus not found",
        });
      }

      res.json({
        success: true,
        data: Syllabus,
        message: "Syllabus retrieved successfully",
      });
    } catch (error) {
      console.error("Error getting Syllabus by ID:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve Syllabus",
        error: error.message,
      });
    }
  }

  // Innovative Teaching Method Controller
  static async getITM(req, res) {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "ITM ID is required",
        });
      }

      const ITM = await DepartmentModel.getITMModel(departmentId);

      if (!ITM) {
        return res.status(404).json({
          success: false,
          message: "ITM not found",
        });
      }

      res.json({
        success: true,
        data: ITM,
        message: "ITM retrieved successfully",
      });
    } catch (error) {
      console.error("Error getting ITM by ID:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve ITM",
        error: error.message,
      });
    }
  }
}

export default DepartmentController;
