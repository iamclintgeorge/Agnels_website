# System Design - Low Level Design (LLD)

## Fr. Conceicao Rodrigues Institute of Technology Website

### Table of Contents

1. [Component Architecture](#component-architecture)
2. [Database Design](#database-design)
3. [API Design](#api-design)
4. [Class Diagrams](#class-diagrams)
5. [Sequence Diagrams](#sequence-diagrams)
6. [Data Models](#data-models)
7. [Security Implementation](#security-implementation)
8. [File Structure](#file-structure)

---

## Component Architecture

### Frontend Component Hierarchy

#### Public Website Components

```
App
├── Layouts
│   └── StaticPages
│       ├── Header
│       ├── NavBar
│       └── Footer
├── Pages
│   ├── Home
│   │   ├── HeroSection
│   │   ├── AboutSection
│   │   └── NewsSection
│   ├── AboutUs
│   │   ├── History
│   │   ├── VisionMission
│   │   └── Leadership
│   ├── Departments
│   │   ├── Computer
│   │   ├── Mechanical
│   │   ├── Electrical
│   │   ├── EXTC
│   │   ├── CSE
│   │   └── BSH
│   ├── Academics
│   │   ├── Programs
│   │   ├── Calendar
│   │   └── Curriculum
│   └── Contact
└── Components
    ├── Common
    │   ├── Button
    │   ├── Modal
    │   ├── LoadingSpinner
    │   └── ErrorBoundary
    └── Specific
        ├── FacultyCard
        ├── NewsCard
        └── DepartmentCard
```

#### Admin Panel Components

```
AdminApp
├── Layout
│   ├── AdminNavbar
│   ├── Sidebar
│   └── AdminLayout
├── Pages
│   ├── Dashboard
│   ├── RoleManager
│   │   ├── components
│   │   │   ├── RoleCard
│   │   │   ├── RoleEditor
│   │   │   ├── RoleList
│   │   │   └── PermissionEditor
│   │   ├── services
│   │   │   └── roleService
│   │   └── constants
│   │       └── permissions
│   ├── AboutUsManager
│   │   ├── components
│   │   │   ├── SectionSelector
│   │   │   ├── ContentEditor
│   │   │   └── FileUploadManager
│   │   ├── services
│   │   │   └── aboutUsService
│   │   └── constants
│   │       └── sectionStructures
│   ├── Faculty
│   │   ├── FacultyProfile
│   │   ├── FacultyList
│   │   └── FacultyEditor
│   └── ContentApproval
└── Services
    ├── api.js
    ├── authService.js
    └── useAuthCheck.jsx
```

### Backend Component Architecture

#### MVC Structure

```
Backend
├── config
│   └── db.js
├── models
│   ├── admin
│   │   ├── userModels.js
│   │   ├── roleModel.js
│   │   └── activityLogModel.js
│   └── website
│       ├── aboutUsModel.js
│       ├── facultyModel.js
│       ├── departmentModel.js
│       └── contentModel.js
├── controllers
│   ├── admin
│   │   ├── userController.js
│   │   ├── roleController.js
│   │   └── activityLogController.js
│   └── website
│       ├── aboutUsController.js
│       ├── facultyController.js
│       └── contentController.js
├── routes
│   ├── admin
│   │   ├── userRoutes.js
│   │   └── roleRoutes.js
│   └── website
│       ├── aboutUsRoutes.js
│       └── facultyRoutes.js
├── middlewares
│   ├── authMiddleware.js
│   ├── permissionMiddleware.js
│   └── loggingMiddleware.js
├── services
│   ├── authService.js
│   ├── fileService.js
│   └── emailService.js
└── utils
    ├── permissions.js
    ├── validation.js
    └── constants.js
```

---

## Database Design

### Core Tables

#### Users and Authentication

```sql
-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(50) NOT NULL UNIQUE,
    emailId VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'non_teach_staff',
    isActive BOOLEAN DEFAULT true,
    lastLogin TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (emailId),
    INDEX idx_role (role),
    INDEX idx_active (isActive)
);

-- Roles table
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    permissions JSON NOT NULL,
    is_system_role TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_role_name (role_name)
);

-- Permissions table
CREATE TABLE permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    permission_name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_permission_name (permission_name),
    INDEX idx_category (category)
);
```

#### Faculty Management

```sql
-- Faculty table
CREATE TABLE faculties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    designation VARCHAR(100),
    qualification VARCHAR(255),
    department_id INT NOT NULL,
    staff_type ENUM('teaching', 'non_teaching') DEFAULT 'teaching',
    image_url VARCHAR(500),
    bio TEXT,
    joining_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_department (department_id),
    INDEX idx_staff_type (staff_type),
    INDEX idx_active (is_active)
);

-- Faculty specializations
CREATE TABLE faculty_specializations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    specialization VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE CASCADE,
    INDEX idx_faculty_id (faculty_id)
);

-- Faculty subjects
CREATE TABLE faculty_subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    subject_name VARCHAR(200) NOT NULL,
    academic_year VARCHAR(20),
    semester VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE CASCADE,
    INDEX idx_faculty_id (faculty_id)
);

-- Faculty publications
CREATE TABLE faculty_publications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    title VARCHAR(500) NOT NULL,
    journal_name VARCHAR(300),
    publication_date DATE,
    doi VARCHAR(100),
    url VARCHAR(500),
    publication_type ENUM('journal', 'conference', 'book', 'chapter') DEFAULT 'journal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE CASCADE,
    INDEX idx_faculty_id (faculty_id),
    INDEX idx_type (publication_type)
);
```

#### Content Management

```sql
-- About Us sections
CREATE TABLE about_us_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_name VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    content JSON NOT NULL,
    is_visible TINYINT(1) DEFAULT 1,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_section_name (section_name),
    INDEX idx_visible_order (is_visible, display_order)
);

-- Content approval system
CREATE TABLE content_approvals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content_type VARCHAR(50) NOT NULL,
    content_id INT NOT NULL,
    submitted_by INT NOT NULL,
    approved_by INT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    comments TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    FOREIGN KEY (submitted_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id),
    INDEX idx_status (status),
    INDEX idx_content (content_type, content_id)
);
```

#### Activity Logging

```sql
-- Activity logs
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id INT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_resource (resource_type, resource_id),
    INDEX idx_created_at (created_at)
);
```

---

## API Design

### Authentication Endpoints

```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/profile
PUT    /api/auth/profile
POST   /api/auth/change-password
```

### Role Management Endpoints

```
GET    /api/roles                     # Get all roles
POST   /api/roles                     # Create new role
GET    /api/roles/:id                 # Get role by ID
PUT    /api/roles/:id                 # Update role
DELETE /api/roles/:id                 # Delete role
GET    /api/roles/permissions/all     # Get all permissions
POST   /api/roles/permissions         # Create permission
PUT    /api/roles/users/:userId/role  # Update user role
```

### Faculty Management Endpoints

```
GET    /api/faculty/department/:dept  # Get faculty by department
GET    /api/faculty/profile/:id       # Get faculty profile
POST   /api/faculty/admin/create      # Create faculty (admin)
PUT    /api/faculty/admin/update/:id  # Update faculty (admin)
DELETE /api/faculty/admin/delete/:id  # Delete faculty (admin)
```

### About Us Management Endpoints

```
GET    /api/aboutus/sections          # Get all sections
GET    /api/aboutus/sections/:name    # Get specific section
PUT    /api/aboutus/sections/:name    # Update section
POST   /api/aboutus/sections          # Create section
DELETE /api/aboutus/sections/:name    # Delete section
POST   /api/aboutus/upload/file       # Upload file
POST   /api/aboutus/upload/image      # Upload image
```

### Content Approval Endpoints

```
GET    /api/content/approvals         # Get pending approvals
POST   /api/content/approvals         # Submit for approval
PUT    /api/content/approvals/:id     # Approve/reject content
GET    /api/content/approvals/history # Get approval history
```

---

## Class Diagrams

### Frontend React Components

#### Role Management Classes

```typescript
interface Role {
  id: number;
  name: string;
  displayName: string;
  permissions: string[];
  isSystemRole?: boolean;
}

interface Permission {
  id: string;
  name: string;
  category: string;
  description?: string;
}

class RoleManager {
  - roles: Role[]
  - permissions: Permission[]
  - selectedRole: Role | null
  - isEditing: boolean

  + loadRoles(): Promise<void>
  + createRole(role: Role): Promise<void>
  + updateRole(id: number, role: Role): Promise<void>
  + deleteRole(id: number): Promise<void>
  + handlePermissionToggle(roleId: number, permissionId: string): void
}
```

#### Faculty Management Classes

```typescript
interface Faculty {
  id: number;
  name: string;
  email: string;
  designation: string;
  qualification: string;
  departmentId: number;
  imageUrl?: string;
  specializations: string[];
  subjects: Subject[];
  publications: Publication[];
}

interface Subject {
  id: number;
  name: string;
  academicYear: string;
  semester: string;
}

interface Publication {
  id: number;
  title: string;
  journalName?: string;
  publicationDate: Date;
  doi?: string;
  url?: string;
  type: 'journal' | 'conference' | 'book' | 'chapter';
}

class FacultyManager {
  - faculties: Faculty[]
  - departments: Department[]
  - selectedFaculty: Faculty | null

  + loadFaculties(departmentId?: number): Promise<void>
  + createFaculty(faculty: Faculty): Promise<void>
  + updateFaculty(id: number, faculty: Faculty): Promise<void>
  + deleteFaculty(id: number): Promise<void>
  + uploadFacultyImage(id: number, file: File): Promise<string>
}
```

### Backend Classes

#### Authentication & Authorization

```typescript
class AuthService {
  + generateToken(user: User): string
  + verifyToken(token: string): User | null
  + hashPassword(password: string): string
  + comparePassword(password: string, hash: string): boolean
  + validatePermission(user: User, permission: string): boolean
}

class PermissionService {
  + checkPermission(userId: number, permission: string): boolean
  + getUserPermissions(userId: number): string[]
  + getRolePermissions(roleName: string): string[]
  + hasAnyPermission(userId: number, permissions: string[]): boolean
}
```

#### Data Access Layer

```typescript
class BaseModel {
  # db: DatabaseConnection

  + findById(id: number): Promise<T | null>
  + findAll(filters?: object): Promise<T[]>
  + create(data: Partial<T>): Promise<T>
  + update(id: number, data: Partial<T>): Promise<boolean>
  + delete(id: number): Promise<boolean>
}

class FacultyModel extends BaseModel<Faculty> {
  + findByDepartment(departmentId: number): Promise<Faculty[]>
  + findWithProfile(id: number): Promise<FacultyProfile>
  + addSpecialization(facultyId: number, specialization: string): Promise<void>
  + addPublication(facultyId: number, publication: Publication): Promise<void>
}
```

---

## Sequence Diagrams

### User Authentication Flow

```
User -> Frontend: Enter credentials
Frontend -> Backend: POST /api/auth/login
Backend -> Database: Validate user
Database -> Backend: User data
Backend -> Backend: Generate JWT token
Backend -> Frontend: Return token + user info
Frontend -> Frontend: Store token in localStorage
Frontend -> User: Redirect to dashboard
```

### Role Management Flow

```
Admin -> Frontend: Click "Create Role"
Frontend -> Frontend: Show role editor
Admin -> Frontend: Fill role details + permissions
Frontend -> Backend: POST /api/roles
Backend -> Middleware: Check permissions
Middleware -> Backend: Permission granted
Backend -> Database: Insert role data
Database -> Backend: Success response
Backend -> Frontend: Role created response
Frontend -> Frontend: Update roles list
Frontend -> Admin: Show success message
```

### Faculty Profile Creation Flow

```
Admin -> Frontend: Upload faculty data
Frontend -> Backend: POST /api/faculty/admin/create
Backend -> Middleware: Auth + permission check
Middleware -> Backend: Authorized
Backend -> Database: Insert faculty record
Database -> Backend: Faculty ID
Backend -> FileService: Save faculty image
FileService -> Backend: Image URL
Backend -> Database: Update faculty with image URL
Database -> Backend: Success
Backend -> Frontend: Faculty created response
Frontend -> Admin: Show success + redirect
```

### Content Approval Flow

```
HOD -> Frontend: Submit content changes
Frontend -> Backend: POST /api/content/approvals
Backend -> Database: Save as pending approval
Database -> Backend: Approval ID
Backend -> NotificationService: Notify approvers
NotificationService -> Principal: Email notification
Principal -> Frontend: Review pending approvals
Frontend -> Backend: GET /api/content/approvals
Backend -> Database: Fetch pending items
Database -> Backend: Approval list
Backend -> Frontend: Return approvals
Frontend -> Principal: Show approval interface
Principal -> Frontend: Approve/Reject
Frontend -> Backend: PUT /api/content/approvals/:id
Backend -> Database: Update approval status
Backend -> ContentService: Apply approved changes
ContentService -> Database: Update live content
```

---

## Data Models

### User Data Model

```json
{
  "id": 1,
  "userName": "john.doe",
  "emailId": "john.doe@fcrit.ac.in",
  "role": "compHod",
  "isActive": true,
  "lastLogin": "2024-01-15T10:30:00Z",
  "createdAt": "2024-01-01T00:00:00Z",
  "permissions": [
    "dashboard",
    "departments.computer-engineering",
    "faculty_management"
  ]
}
```

### Faculty Data Model

```json
{
  "id": 1,
  "name": "Dr. John Smith",
  "email": "john.smith@fcrit.ac.in",
  "phone": "+91-9876543210",
  "designation": "Professor & HOD",
  "qualification": "Ph.D. in Computer Science",
  "departmentId": 1,
  "staffType": "teaching",
  "imageUrl": "/cdn/faculty/john-smith.jpg",
  "bio": "Dr. Smith has 15 years of experience...",
  "joiningDate": "2010-07-01",
  "isActive": true,
  "specializations": [
    "Machine Learning",
    "Data Science",
    "Artificial Intelligence"
  ],
  "subjects": [
    {
      "id": 1,
      "name": "Machine Learning",
      "academicYear": "2023-24",
      "semester": "Even"
    }
  ],
  "publications": [
    {
      "id": 1,
      "title": "Advanced ML Techniques",
      "journalName": "IEEE Transactions on AI",
      "publicationDate": "2023-06-15",
      "doi": "10.1109/TAI.2023.123456",
      "type": "journal"
    }
  ]
}
```

### Content Section Data Model

```json
{
  "id": 1,
  "sectionName": "History",
  "title": "Our History",
  "content": {
    "subtitle": "Tracing the roots and evolution",
    "headerImage": "/cdn/images/history-header.jpg",
    "sections": {
      "establishment": {
        "heading": "Establishment",
        "text": "The institution was established...",
        "image": "/cdn/images/establishment.jpg"
      }
    }
  },
  "isVisible": true,
  "displayOrder": 1,
  "updatedAt": "2024-01-15T14:30:00Z"
}
```

---

## Security Implementation

### JWT Token Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": 1,
    "userName": "john.doe",
    "role": "compHod",
    "permissions": ["dashboard", "faculty_management"],
    "iat": 1641398400,
    "exp": 1641484800
  }
}
```

### Permission Checking Implementation

```javascript
// Middleware for permission checking
const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = req.user; // From auth middleware

      // Super admin has all permissions
      if (user.permissions.includes("all")) {
        return next();
      }

      // Check specific permission
      if (user.permissions.includes(requiredPermission)) {
        return next();
      }

      // Permission denied
      return res.status(403).json({
        success: false,
        error: "Insufficient permissions",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Permission check failed",
      });
    }
  };
};
```

### Input Validation

```javascript
// Validation schemas
const facultyValidationSchema = {
  name: {
    required: true,
    type: "string",
    minLength: 2,
    maxLength: 100,
  },
  email: {
    required: true,
    type: "email",
    unique: true,
  },
  designation: {
    required: true,
    type: "string",
    maxLength: 100,
  },
  departmentId: {
    required: true,
    type: "number",
    min: 1,
  },
};

// Validation middleware
const validateInput = (schema) => {
  return (req, res, next) => {
    const errors = validateSchema(req.body, schema);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errors,
      });
    }
    next();
  };
};
```

---

## File Structure

### Complete Project Structure

```
Agnels_website/
├── admin/
│   ├── backend/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── admin/
│   │   │   │   ├── roleController.js
│   │   │   │   ├── userController.js
│   │   │   │   └── activityLogsController.js
│   │   │   └── website/
│   │   │       ├── aboutUsController.js
│   │   │       ├── facultyController.js
│   │   │       └── contentController.js
│   │   ├── models/
│   │   │   ├── admin/
│   │   │   │   ├── roleModel.js
│   │   │   │   └── userModels.js
│   │   │   └── website/
│   │   │       ├── aboutUsModel.js
│   │   │       ├── facultyModel.js
│   │   │       └── contentModel.js
│   │   ├── routes/
│   │   │   ├── admin/
│   │   │   │   ├── roleRoutes.js
│   │   │   │   └── userRoutes.js
│   │   │   ├── website/
│   │   │   │   ├── aboutUsRoutes.js
│   │   │   │   └── facultyRoutes.js
│   │   │   └── routes.js
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   ├── permissionMiddleware.js
│   │   │   └── loggingMiddleware.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── fileService.js
│   │   │   └── logger.js
│   │   ├── utils/
│   │   │   ├── permissions.js
│   │   │   ├── permissionMap.js
│   │   │   └── validation.js
│   │   ├── public/
│   │   │   ├── images/
│   │   │   └── uploads/
│   │   ├── app.js
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Modal.jsx
│       │   │   ├── navBar.jsx
│       │   │   └── ApprovalWrapper.jsx
│       │   ├── pages/
│       │   │   ├── RoleManager/
│       │   │   │   ├── components/
│       │   │   │   │   ├── RoleCard.jsx
│       │   │   │   │   ├── RoleEditor.jsx
│       │   │   │   │   ├── RoleList.jsx
│       │   │   │   │   └── PermissionEditor.jsx
│       │   │   │   ├── services/
│       │   │   │   │   └── roleService.js
│       │   │   │   ├── constants/
│       │   │   │   │   └── permissions.js
│       │   │   │   ├── RoleManager.jsx
│       │   │   │   └── index.js
│       │   │   ├── AboutUsManager/
│       │   │   │   ├── components/
│       │   │   │   │   ├── SectionSelector.jsx
│       │   │   │   │   ├── ContentEditor.jsx
│       │   │   │   │   └── FileUploadManager.jsx
│       │   │   │   ├── services/
│       │   │   │   │   └── aboutUsService.js
│       │   │   │   ├── constants/
│       │   │   │   │   └── sectionStructures.js
│       │   │   │   ├── AboutUsManager.jsx
│       │   │   │   └── index.js
│       │   │   ├── Faculty/
│       │   │   │   └── FacultyProfile.jsx
│       │   │   └── Department/
│       │   │       ├── Computer/
│       │   │       │   └── computer_staffs.jsx
│       │   │       └── [other departments]/
│       │   ├── services/
│       │   │   ├── api.js
│       │   │   └── useAuthCheck.jsx
│       │   ├── layout/
│       │   │   └── adminLayout.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       ├── public/
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
└── website/
    └── frontend/
        ├── src/
        │   ├── pages/
        │   │   ├── AboutUs/
        │   │   ├── Departments/
        │   │   ├── Academics/
        │   │   └── Contact/
        │   ├── components/
        │   ├── layouts/
        │   ├── App.jsx
        │   └── main.jsx
        ├── public/
        ├── index.html
        └── package.json
```

### Key Configuration Files

#### Database Configuration

```javascript
// admin/backend/config/db.js
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "agnels_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const db = mysql.createPool(dbConfig);
export default db;
```

#### Environment Configuration

```bash
# .env file
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=agnels_db

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

UPLOAD_PATH=/cdn
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,jpg,jpeg,png

NODE_ENV=development
PORT=3663
```

---

This LLD provides detailed implementation guidance for all system components, ensuring consistent development practices and maintainable code architecture.
