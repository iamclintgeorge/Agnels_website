import express from 'express';
import DepartmentController from '../../../controllers/website/departmentController.js';
import { upload } from '../../../models/website/departmentModel.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';
import { checkPermission } from '../../../utils/permissions.js';

const router = express.Router();

// DEPT_TEXT ROUTES
router.post('/text/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.createDeptText
);

router.get('/text/:departmentId/:section', 
  DepartmentController.getDeptText
);

router.delete('/text/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deleteDeptText
);

// DEPT_COMMITTEES ROUTES
router.post('/committees/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.createCommittee
);

router.get('/committees/:departmentId', 
  DepartmentController.getCommittees
);

router.put('/committees/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.updateCommittee
);

router.delete('/committees/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deleteCommittee
);

// DEPT_PUBLICATIONS ROUTES
router.post('/publications/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.createPublication
);

router.get('/publications/:departmentId', 
  DepartmentController.getPublications
);

router.put('/publications/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.updatePublication
);

router.delete('/publications/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deletePublication
);

// MAGAZINES ROUTES
router.post('/magazines/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.createMagazine
);

router.get('/magazines/:departmentId', 
  DepartmentController.getMagazines
);

router.put('/magazines/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.updateMagazine
);

router.delete('/magazines/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deleteMagazine
);

// TIME_TABLES ROUTES
router.post('/timetables/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.createTimeTable
);

router.get('/timetables/:departmentId', 
  DepartmentController.getTimeTables
);

router.put('/timetables/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.updateTimeTable
);

router.delete('/timetables/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deleteTimeTable
);

// ACHIEVEMENTS ROUTES
router.post('/achievements/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.createAchievement
);

router.get('/achievements/:departmentId', 
  DepartmentController.getAchievements
);

router.put('/achievements/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.updateAchievement
);

router.delete('/achievements/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deleteAchievement
);

// ACADEMIC_CALENDARS ROUTES
router.post('/calendars/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.createAcademicCalendar
);

router.get('/calendars/:departmentId', 
  DepartmentController.getAcademicCalendars
);

router.put('/calendars/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.updateAcademicCalendar
);

router.delete('/calendars/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deleteAcademicCalendar
);

// ACTIVITIES ROUTES
router.post('/activities/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.createActivity
);

router.get('/activities/:departmentId', 
  DepartmentController.getActivities
);

router.put('/activities/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.updateActivity
);

router.delete('/activities/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deleteActivity
);

// ASSOCIATIONS ROUTES
router.post('/associations/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.createAssociation
);

router.get('/associations/:departmentId', 
  DepartmentController.getAssociations
);

router.put('/associations/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  upload.single('file'), 
  DepartmentController.updateAssociation
);

router.delete('/associations/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deleteAssociation
);

// PROJECTS ROUTES
// BE Projects (Undergraduate)
router.post('/projects/undergraduate/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.createUndergraduateProject
);

router.get('/projects/undergraduate/:departmentId', 
  DepartmentController.getUndergraduateProjects
);

router.put('/projects/undergraduate/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.updateUndergraduateProject
);

router.delete('/projects/undergraduate/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deleteUndergraduateProject
);

// TE/SE Projects (Mini Projects)
router.post('/projects/mini/create', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.createMiniProject
);

router.get('/projects/mini/:departmentId', 
  DepartmentController.getMiniProjects
);

router.put('/projects/mini/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.updateMiniProject
);

router.delete('/projects/mini/:id', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.deleteMiniProject
);

// UTILITY ROUTES
router.get('/data/:departmentId', 
  DepartmentController.getAllDepartmentData
);

router.get('/statistics/:departmentId?', 
  authMiddleware, 
  checkPermission('department_management'), 
  DepartmentController.getDepartmentStatistics
);

export default router; 