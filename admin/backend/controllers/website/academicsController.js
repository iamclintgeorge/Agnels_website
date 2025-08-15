import {
  academicHandbookCreate,
  academicHandbookFetch,
  academicHomeTextUpdate,
  getHandbookById,
  academicHandbookEdit,
  academicHandbookDelete,
  academicCalendarCreate,
  academicCalendarFetch,
  academicCalendarEdit,
  academicCalendarDelete,
  getCalendarById,
  academicLinksCreate,
  getAcademicLinkById,
  academicLinksFetch,
  academicLinksEdit,
  academicLinksDelete,
  stakeholderFeedbackCreate,
  getFeedbackById,
  stakeholderFeedbackFetch,
  stakeholderFeedbackEdit,
  stakeholderFeedbackDelete,
  // academicHomeCreate,
  academicHomeFetch,
  // academicHomeEdit,
  // academicHomeDelete,
  // getAcademicHomeById,
  academicHomeSectionCreate,
  academicHomeSectionEdit,
  academicHomeSectionDelete,
  academicHomeAdminCardCreate,
  academicHomeAdminCardEdit,
  academicHomeAdminCardDelete,
  examinationCreate,
  examinationFetch,
  getExaminationById,
  examinationEdit,
  examinationDelete,
  examinationSlideCreate,
  examinationSlidesFetch,
  getExaminationSlideById,
  examinationSlideEdit,
  examinationSlideDelete,
  examinationNotificationCreate,
  examinationNotificationsFetch,
  getExaminationNotificationById,
  examinationNotificationEdit,
  examinationNotificationDelete,
  examinationFormCreate,
  examinationFormsFetch,
  getExaminationFormById,
  examinationFormEdit,
  examinationFormDelete,
  examinationArchiveCreate,
  examinationArchivesFetch,
  getExaminationArchiveById,
  examinationArchiveEdit,
  examinationArchiveDelete,
} from "../../models/website/academicModel.js"; // Adjust path as needed

// Academic Home Controllers
// export const academicHomeCreateController = async (req, res) => {
//   const { title, description, created_by } = req.body;
//   const hero_image_url = req.file ? `/cdn/${req.file.filename}` : null;

//   try {
//     const result = await academicHomeCreate(
//       title,
//       description,
//       hero_image_url,
//       created_by
//     );
//     res.json({
//       message: "Academic Home created successfully",
//       id: result.insertId,
//     });
//   } catch (error) {
//     console.error("Academic Home Creation Error: ", error);
//     res.status(500).json({ message: "Error creating academic home" });
//   }
// };

export const academicHomeFetchController = async (req, res) => {
  try {
    const result = await academicHomeFetch();
    res.status(200).json({ result: result });
  } catch (error) {
    console.error("Academic Home Fetch Error: ", error);
    res.status(500).json({ message: "Error fetching academic home" });
  }
};

export const academicHomeEditController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const updatedText = await academicHomeTextUpdate(id, content);
    if (!updatedText) {
      return res.status(404).json({ message: "Text not found" });
    }

    res.json({ message: "Text updated successfully", content: updatedText });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating Academic Home text" });
  }
};

// Academic Home Section Controllers
export const academicHomeSectionCreateController = async (req, res) => {
  const { home_id, section_type, title, description, icon, order_index } =
    req.body;

  try {
    const result = await academicHomeSectionCreate(
      home_id,
      section_type,
      title,
      description,
      icon,
      order_index
    );
    res.json({
      message: "Academic Home Section created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Academic Home Section Creation Error: ", error);
    res.status(500).json({ message: "Error creating academic home section" });
  }
};

export const academicHomeSectionEditController = async (req, res) => {
  const { section_type, title, description, icon, order_index, is_active } =
    req.body;
  const { id } = req.params;

  try {
    const result = await academicHomeSectionEdit(
      id,
      section_type,
      title,
      description,
      icon,
      order_index,
      is_active
    );
    res.json({ message: "Academic Home Section updated successfully" });
  } catch (error) {
    console.error("Academic Home Section Edit Error: ", error);
    res.status(500).json({ message: "Error updating academic home section" });
  }
};

export const academicHomeSectionDeleteController = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    if (!id || id === "null") {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await academicHomeSectionDelete(id);
    res.json({ message: "Academic Home Section deleted successfully" });
  } catch (error) {
    console.error("Academic Home Section Delete Error: ", error);
    res.status(500).json({ message: "Error deleting academic home section" });
  }
};

// Academic Admin Card Controllers
export const academicHomeAdminCardCreateController = async (req, res) => {
  const { section_id, title, description, icon, order_index } = req.body;

  try {
    const result = await academicHomeAdminCardCreate(
      section_id,
      title,
      description,
      icon,
      order_index
    );
    res.json({
      message: "Admin Card created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Admin Card Creation Error: ", error);
    res.status(500).json({ message: "Error creating admin card" });
  }
};

export const academicHomeAdminCardEditController = async (req, res) => {
  const { title, description, icon, order_index, is_active } = req.body;
  const { id } = req.params;

  try {
    const result = await academicHomeAdminCardEdit(
      id,
      title,
      description,
      icon,
      order_index,
      is_active
    );
    res.json({ message: "Admin Card updated successfully" });
  } catch (error) {
    console.error("Admin Card Edit Error: ", error);
    res.status(500).json({ message: "Error updating admin card" });
  }
};

export const academicHomeAdminCardDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await academicHomeAdminCardDelete(id);
    res.json({ message: "Admin Card deleted successfully" });
  } catch (error) {
    console.error("Admin Card Delete Error: ", error);
    res.status(500).json({ message: "Error deleting admin card" });
  }
};
// Academic Handbook Controllers
// export const academicHandbookCreateController = async (req, res) => {
//   const { title, description, pdf_url, handbook_type, created_by } = req.body;

//   try {
//     const result = await academicHandbookCreate(title, description, pdf_url, handbook_type, created_by);
//     res.json({ message: "Academic Handbook created successfully", id: result.insertId });
//   } catch (error) {
//     console.error("Academic Handbook Creation Error: ", error);
//     res.status(500).json({ message: "Error creating academic handbook" });
//   }
// };

export const academicHandbookCreateController = async (req, res) => {
  const { title, description, handbook_type, created_by } = req.body;
  console.log("Uploaded File:", req.file);

  const pdf_url = req.file ? `/cdn/${req.file.filename}` : null;
  console.log("PDF URL:", pdf_url); // Debugging line to check the PDF URL
  // Optional: If pdf is mandatory, validate
  console.log("Received Handbook Data:", {
    title,
    description,
    handbook_type,
  });
  if (!pdf_url) {
    return res.status(400).json({ message: "PDF file is required" });
  }

  try {
    const result = await academicHandbookCreate(
      title,
      description,
      pdf_url,
      handbook_type,
      created_by
    );
    res.json({
      message: "Academic Handbook created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Academic Handbook Creation Error: ", error);
    res.status(500).json({ message: "Error creating academic handbook" });
  }
};

export const academicHandbookFetchController = async (req, res) => {
  try {
    const result = await academicHandbookFetch();
    res.json({ result: result });
  } catch (error) {
    console.error("Academic Handbook Fetch Error: ", error);
    res.status(500).json({ message: "Error fetching academic handbooks" });
  }
};

export const academicHandbookEditController = async (req, res) => {
  const { title, description, handbook_type, created_by } = req.body;
  const { id } = req.params;
  console.log("handbook_type:", handbook_type);
  try {
    const existingCalendar = await getHandbookById(id); // You'll need this function

    let pdf_url = existingCalendar.pdf_url;
    const result = await academicHandbookEdit(
      id,
      title,
      description,
      pdf_url,
      handbook_type,
      created_by
    );
    res.json({ message: "Academic Handbook updated successfully" });
  } catch (error) {
    console.error("Academic Handbook Edit Error: ", error);
    res.status(500).json({ message: "Error updating academic handbook" });
  }
};

export const academicHandbookDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await academicHandbookDelete(id);
    res.json({ message: "Academic Handbook deleted successfully" });
  } catch (error) {
    console.error("Academic Handbook Delete Error: ", error);
    res.status(500).json({ message: "Error deleting academic handbook" });
  }
};

// Academic Calendar Controllers
export const academicCalendarCreateController = async (req, res) => {
  const { year, semester, issue_date, description, created_by } = req.body;
  console.log(req.body);
  const pdf_url = req.file ? `/cdn/${req.file.filename}` : null;
  try {
    const result = await academicCalendarCreate(
      year,
      semester,
      issue_date,
      pdf_url,
      description,
      created_by
    );
    res.json({
      message: "Academic Calendar created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Academic Calendar Creation Error: ", error);
    res.status(500).json({ message: "Error creating academic calendar" });
  }
};

export const academicCalendarFetchController = async (req, res) => {
  try {
    const result = await academicCalendarFetch();
    res.json({ result: result });
  } catch (error) {
    console.error("Academic Calendar Fetch Error: ", error);
    res.status(500).json({ message: "Error fetching academic calendar" });
  }
};

// export const academicCalendarEditController = async (req, res) => {
//   const { year, semester, issue_date, pdf_url, description, created_by } = req.body;
//   const { id } = req.params;

//   try {
//     const result = await academicCalendarEdit(id, year, semester, issue_date, pdf_url, description, created_by);
//     res.json({ message: "Academic Calendar updated successfully" });
//   } catch (error) {
//     console.error("Academic Calendar Edit Error: ", error);
//     res.status(500).json({ message: "Error updating academic calendar" });
//   }
// };
export const academicCalendarEditController = async (req, res) => {
  const { year, semester, issue_date, description, created_by } = req.body;
  const { id } = req.params;

  try {
    // Get existing calendar data first
    const existingCalendar = await getCalendarById(id); // You'll need this function

    let pdf_url = existingCalendar.pdf_url; // Keep existing PDF by default

    // Only update PDF if a new file was uploaded

    const result = await academicCalendarEdit(
      id,
      year,
      semester,
      issue_date,
      pdf_url,
      description,
      created_by
    );
    res.json({ message: "Academic Calendar updated successfully" });
  } catch (error) {
    console.error("Academic Calendar Edit Error: ", error);
    res.status(500).json({ message: "Error updating academic calendar" });
  }
};
export const academicCalendarDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await academicCalendarDelete(id);
    res.json({ message: "Academic Calendar deleted successfully" });
  } catch (error) {
    console.error("Academic Calendar Delete Error: ", error);
    res.status(500).json({ message: "Error deleting academic calendar" });
  }
};

// Examination Controllers
// export const examinationCreateController = async (req, res) => {
//   const { exam_type, semester, year,   notification, created_by } = req.body;
//   const timetable_url = req.files?.pdf?.[0]?.filename
//   ? `/cdn/${req.files.pdf[0].filename}`
//   : null;
// const result_url = req.files?.result_pdf?.[0]?.filename
//   ? `/cdn/${req.files.result_pdf[0].filename}`
//   : null
//   try {
//     const result = await examinationCreate(exam_type, semester, year, timetable_url, result_url, notification, created_by);
//     res.json({ message: "Examination created successfully", id: result.insertId });
//   } catch (error) {
//     console.error("Examination Creation Error: ", error);
//     res.status(500).json({ message: "Error creating examination" });
//   }
// };
// export const examinationCreateController = async (req, res) => {
//   console.log("Request body:", req.body); // Debug log
//   console.log("Request files:", req.files); // Debug log

//   const { exam_type, semester, year, notification, created_by } = req.body;
//   console.log("Exam Type:", exam_type); // Debug log
//   // Fix the file path extraction - check for timetable_pdf instead of pdf
//   const timetable_url = req.files?.timetable_pdf?.[0]?.filename
//     ? `/cdn/${req.files.timetable_pdf[0].filename}`
//     : null;

//   const result_url = req.files?.result_pdf?.[0]?.filename
//     ? `/cdn/${req.files.result_pdf[0].filename}`
//     : null;

//   // Add validation to ensure required fields are present
//   if (!exam_type || !semester || !year || !created_by) {
//     return res.status(400).json({
//       message: "Missing required fields: exam_type, semester, year, created_by",
//     });
//   }

//   try {
//     const result = await examinationCreate(
//       exam_type,
//       semester,
//       year,
//       timetable_url,
//       result_url,
//       notification,
//       created_by
//     );
//     res.json({
//       message: "Examination created successfully",
//       id: result.insertId,
//     });
//   } catch (error) {
//     console.error("Examination Creation Error: ", error);
//     res.status(500).json({ message: "Error creating examination" });
//   }
// };

// export const examinationFetchController = async (req, res) => {
//   try {
//     const result = await examinationFetch();
//     res.json({ result: result });
//   } catch (error) {
//     console.error("Examination Fetch Error: ", error);
//     res.status(500).json({ message: "Error fetching examinations" });
//   }
// };

// export const examinationEditController = async (req, res) => {
//   const { exam_type, semester, year, result_url, notification, created_by } =
//     req.body;
//   const { id } = req.params;

//   try {
//     const existingCalendar = await getExaminationById(id); // You'll need this function

//     let timetable_url = existingCalendar.timetable_url;
//     const result = await examinationEdit(
//       id,
//       exam_type,
//       semester,
//       year,
//       timetable_url,
//       result_url,
//       notification,
//       created_by
//     );
//     res.json({ message: "Examination updated successfully" });
//   } catch (error) {
//     console.error("Examination Edit Error: ", error);
//     res.status(500).json({ message: "Error updating examination" });
//   }
// };

// export const examinationDeleteController = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await examinationDelete(id);
//     res.json({ message: "Examination deleted successfully" });
//   } catch (error) {
//     console.error("Examination Delete Error: ", error);
//     res.status(500).json({ message: "Error deleting examination" });
//   }
// };

// Academic Links Controllers
export const academicLinksCreateController = async (req, res) => {
  const { title, description, link_type, created_by } = req.body;
  const url = req.body.url || null;
  try {
    const result = await academicLinksCreate(
      title,
      description,
      url,
      link_type,
      created_by
    );
    res.json({
      message: "Academic Link created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Academic Links Creation Error: ", error);
    res.status(500).json({ message: "Error creating academic link" });
  }
};

export const academicLinksFetchController = async (req, res) => {
  try {
    const result = await academicLinksFetch();
    res.json({ result: result });
  } catch (error) {
    console.error("Academic Links Fetch Error: ", error);
    res.status(500).json({ message: "Error fetching academic links" });
  }
};

export const academicLinksEditController = async (req, res) => {
  const { title, description, url, link_type, created_by } = req.body;
  const { id } = req.params;

  try {
    const existingCalendar = await getAcademicLinkById(id); // You'll need this function

    let url = existingCalendar.url;
    const result = await academicLinksEdit(
      id,
      title,
      description,
      url,
      link_type,
      created_by
    );
    res.json({ message: "Academic Link updated successfully" });
  } catch (error) {
    console.error("Academic Links Edit Error: ", error);
    res.status(500).json({ message: "Error updating academic link" });
  }
};

export const academicLinksDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await academicLinksDelete(id);
    res.json({ message: "Academic Link deleted successfully" });
  } catch (error) {
    console.error("Academic Links Delete Error: ", error);
    res.status(500).json({ message: "Error deleting academic link" });
  }
};

// Stakeholder Feedback Controllers
export const stakeholderFeedbackCreateController = async (req, res) => {
  const { title, description, feedback_type, created_by } = req.body;
  const pdf_url = req.file ? `/cdn/${req.file.filename}` : null;
  try {
    const result = await stakeholderFeedbackCreate(
      title,
      description,
      pdf_url,
      feedback_type,
      created_by
    );
    res.json({
      message: "Stakeholder Feedback created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Stakeholder Feedback Creation Error: ", error);
    res.status(500).json({ message: "Error creating stakeholder feedback" });
  }
};

export const stakeholderFeedbackFetchController = async (req, res) => {
  try {
    const result = await stakeholderFeedbackFetch();
    res.json({ result: result });
  } catch (error) {
    console.error("Stakeholder Feedback Fetch Error: ", error);
    res.status(500).json({ message: "Error fetching stakeholder feedback" });
  }
};

export const stakeholderFeedbackEditController = async (req, res) => {
  const { title, description, feedback_type, created_by } = req.body;
  const { id } = req.params;

  try {
    const existingCalendar = await getFeedbackById(id); // You'll need this function

    let pdf_url = existingCalendar.pdf_url;
    const result = await stakeholderFeedbackEdit(
      id,
      title,
      description,
      pdf_url,
      feedback_type,
      created_by
    );
    res.json({ message: "Stakeholder Feedback updated successfully" });
  } catch (error) {
    console.error("Stakeholder Feedback Edit Error: ", error);
    res.status(500).json({ message: "Error updating stakeholder feedback" });
  }
};

export const stakeholderFeedbackDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await stakeholderFeedbackDelete(id);
    res.json({ message: "Stakeholder Feedback deleted successfully" });
  } catch (error) {
    console.error("Stakeholder Feedback Delete Error: ", error);
    res.status(500).json({ message: "Error deleting stakeholder feedback" });
  }
};

export const examinationCreateController = async (req, res) => {
  const { title, description, academic_year, semester, exam_type, created_by } =
    req.body;
  const pdf_url = req.file ? `/cdn/${req.file.filename}` : null;

  try {
    const result = await examinationCreate(
      title,
      description,
      academic_year,
      semester,
      exam_type,
      pdf_url,
      created_by
    );

    res.json({
      success: true,
      message: "Examination timetable created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Examination Creation Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error creating examination timetable",
    });
  }
};

// Fetch all examinations (formatted for frontend)
export const examinationFetchController = async (req, res) => {
  try {
    const examinations = await examinationFetch();
    const slides = await examinationSlidesFetch();
    const notifications = await examinationNotificationsFetch();
    const forms = await examinationFormsFetch();
    const archives = await examinationArchivesFetch();

    res.json({
      success: true,
      data: {
        timetables: examinations,
        slides: slides,
        notifications: notifications,
        forms: forms,
        archives: archives,
      },
    });
  } catch (error) {
    console.error("Examination Fetch Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching examinations",
    });
  }
};

// Get examination by ID
export const examinationGetByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const examination = await getExaminationById(id);

    if (!examination) {
      return res.status(404).json({
        success: false,
        message: "Examination not found",
      });
    }

    res.json({
      success: true,
      data: examination,
    });
  } catch (error) {
    console.error("Examination Get Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching examination",
    });
  }
};

// Edit examination
export const examinationEditController = async (req, res) => {
  const { id } = req.params;
  const { title, description, academic_year, semester, exam_type } = req.body;

  try {
    const existingExam = await getExaminationById(id);

    if (!existingExam) {
      return res.status(404).json({
        success: false,
        message: "Examination not found",
      });
    }

    const pdf_url = req.file
      ? `/cdn/${req.file.filename}`
      : existingExam.pdf_url;

    const result = await examinationEdit(
      id,
      title,
      description,
      academic_year,
      semester,
      exam_type,
      pdf_url
    );

    res.json({
      success: true,
      message: "Examination updated successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Examination Edit Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error updating examination",
    });
  }
};

// Delete examination
export const examinationDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await examinationDelete(id);

    res.json({
      success: true,
      message: "Examination deleted successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Examination Delete Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error deleting examination",
    });
  }
};

// ==================== EXAMINATION SLIDES CONTROLLERS ====================

// Create slide
export const examinationSlideCreateController = async (req, res) => {
  const { title, display_order, created_by } = req.body;
  const image_url = req.file ? `/cdn/${req.file.filename}` : null;

  if (!image_url) {
    return res.status(400).json({
      success: false,
      message: "Image file is required",
    });
  }

  try {
    const result = await examinationSlideCreate(
      title,
      image_url,
      display_order || 0,
      created_by
    );

    res.json({
      success: true,
      message: "Examination slide created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Slide Creation Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error creating examination slide",
    });
  }
};

// Get slide by ID
export const examinationSlideGetByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const slide = await getExaminationSlideById(id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: "Slide not found",
      });
    }

    res.json({
      success: true,
      data: slide,
    });
  } catch (error) {
    console.error("Slide Get Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching slide",
    });
  }
};

// Edit slide
export const examinationSlideEditController = async (req, res) => {
  const { id } = req.params;
  const { title, display_order } = req.body;

  try {
    const existingSlide = await getExaminationSlideById(id);

    if (!existingSlide) {
      return res.status(404).json({
        success: false,
        message: "Slide not found",
      });
    }

    const image_url = req.file
      ? `/cdn/${req.file.filename}`
      : existingSlide.image_url;

    const result = await examinationSlideEdit(
      id,
      title,
      image_url,
      display_order
    );

    res.json({
      success: true,
      message: "Slide updated successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Slide Edit Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error updating slide",
    });
  }
};

// Delete slide
export const examinationSlideDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await examinationSlideDelete(id);

    res.json({
      success: true,
      message: "Slide deleted successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Slide Delete Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error deleting slide",
    });
  }
};

// ==================== EXAMINATION NOTIFICATIONS CONTROLLERS ====================

// Create notification
// export const examinationNotificationCreateController = async (req, res) => {
//   const { title, description, is_new, created_by } = req.body;

//   try {
//     const result = await examinationNotificationCreate(
//       title,
//       description,
//       is_new || true,
//       created_by
//     );

//     res.json({
//       success: true,
//       message: "Notification created successfully",
//       id: result.insertId,
//     });
//   } catch (error) {
//     console.error("Notification Creation Error: ", error);
//     res.status(500).json({
//       success: false,
//       message: "Error creating notification"
//     });
//   }
// };
export const examinationNotificationCreateController = async (req, res) => {
  // Handle both JSON and FormData
  const { title, description, is_new, created_by } = req.body;

  // Validation
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  try {
    const result = await examinationNotificationCreate(
      title,
      description || null,
      is_new !== undefined ? is_new : true,
      created_by || "Admin" // Default fallback
    );

    res.json({
      success: true,
      message: "Notification created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Notification Creation Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error creating notification",
    });
  }
};

// Get notification by ID
export const examinationNotificationGetByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await getExaminationNotificationById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Notification Get Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching notification",
    });
  }
};

// Edit notification
export const examinationNotificationEditController = async (req, res) => {
  const { id } = req.params;
  const { title, description, is_new } = req.body;

  try {
    const existingNotification = await getExaminationNotificationById(id);

    if (!existingNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    const result = await examinationNotificationEdit(
      id,
      title,
      description,
      is_new
    );

    res.json({
      success: true,
      message: "Notification updated successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Notification Edit Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error updating notification",
    });
  }
};

// Delete notification
export const examinationNotificationDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await examinationNotificationDelete(id);

    res.json({
      success: true,
      message: "Notification deleted successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Notification Delete Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error deleting notification",
    });
  }
};

// ==================== EXAMINATION FORMS CONTROLLERS ====================

// Create form
export const examinationFormCreateController = async (req, res) => {
  const { name, description, created_by } = req.body;
  const pdf_url = req.file ? `/cdn/${req.file.filename}` : null;

  if (!pdf_url) {
    return res.status(400).json({
      success: false,
      message: "PDF file is required",
    });
  }

  try {
    const result = await examinationFormCreate(
      name,
      description,
      pdf_url,
      created_by
    );

    res.json({
      success: true,
      message: "Examination form created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Form Creation Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error creating examination form",
    });
  }
};

// Get form by ID
export const examinationFormGetByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await getExaminationFormById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.json({
      success: true,
      data: form,
    });
  } catch (error) {
    console.error("Form Get Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching form",
    });
  }
};

// Edit form
export const examinationFormEditController = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const existingForm = await getExaminationFormById(id);

    if (!existingForm) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    const pdf_url = req.file
      ? `/cdn/${req.file.filename}`
      : existingForm.pdf_url;

    const result = await examinationFormEdit(id, name, description, pdf_url);

    res.json({
      success: true,
      message: "Form updated successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Form Edit Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error updating form",
    });
  }
};

// Delete form
export const examinationFormDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await examinationFormDelete(id);

    res.json({
      success: true,
      message: "Form deleted successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Form Delete Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error deleting form",
    });
  }
};

// ==================== EXAMINATION ARCHIVES CONTROLLERS ====================

// Create archive
export const examinationArchiveCreateController = async (req, res) => {
  const { year, title, created_by } = req.body;
  const pdf_url = req.file ? `/cdn/${req.file.filename}` : null;

  if (!pdf_url) {
    return res.status(400).json({
      success: false,
      message: "PDF file is required",
    });
  }

  try {
    const result = await examinationArchiveCreate(
      year,
      title,
      pdf_url,
      created_by
    );

    res.json({
      success: true,
      message: "Examination archive created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Archive Creation Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error creating examination archive",
    });
  }
};

// Get archive by ID
export const examinationArchiveGetByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const archive = await getExaminationArchiveById(id);

    if (!archive) {
      return res.status(404).json({
        success: false,
        message: "Archive not found",
      });
    }

    res.json({
      success: true,
      data: archive,
    });
  } catch (error) {
    console.error("Archive Get Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching archive",
    });
  }
};

// Edit archive
export const examinationArchiveEditController = async (req, res) => {
  const { id } = req.params;
  const { year, title } = req.body;

  try {
    const existingArchive = await getExaminationArchiveById(id);

    if (!existingArchive) {
      return res.status(404).json({
        success: false,
        message: "Archive not found",
      });
    }

    const pdf_url = req.file
      ? `/cdn/${req.file.filename}`
      : existingArchive.pdf_url;

    const result = await examinationArchiveEdit(id, year, title, pdf_url);

    res.json({
      success: true,
      message: "Archive updated successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Archive Edit Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error updating archive",
    });
  }
};

// Delete archive
export const examinationArchiveDeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await examinationArchiveDelete(id);

    res.json({
      success: true,
      message: "Archive deleted successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Archive Delete Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error deleting archive",
    });
  }
};
