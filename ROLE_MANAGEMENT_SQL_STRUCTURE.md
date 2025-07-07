# Role Management System - SQL Table Structure

## Overview
This document outlines the database table structures required for the Role Management System in the Agnels Website application.

## Tables

### 1. `roles` Table
Stores role definitions with their permissions and metadata.

```sql
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    permissions JSON NOT NULL,
    is_system_role TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_role_name (role_name),
    INDEX idx_system_role (is_system_role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**Field Descriptions:**
- `id`: Primary key, auto-increment
- `role_name`: Unique identifier for the role (e.g., 'superAdmin', 'compHod')
- `display_name`: Human-readable name for the role (e.g., 'Super Admin', 'HOD Computer')
- `permissions`: JSON array containing permission strings
- `is_system_role`: Flag to mark system roles that cannot be deleted
- `created_at`: Timestamp when role was created
- `updated_at`: Timestamp when role was last modified

### 2. `permissions` Table
Stores available permissions that can be assigned to roles.

```sql
CREATE TABLE permissions (
    id INT NOT NULL AUTO_INCREMENT,
    permission_name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_permission_name (permission_name),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**Field Descriptions:**
- `id`: Primary key, auto-increment
- `permission_name`: Unique identifier for the permission (e.g., 'dashboard', 'manage_users')
- `display_name`: Human-readable name for the permission
- `category`: Category grouping (e.g., 'core', 'content', 'admin', 'departments')
- `description`: Optional detailed description of the permission
- `created_at`: Timestamp when permission was created

### 3. `user_role_history` Table (Optional)
Tracks role assignment history for audit purposes.

```sql
CREATE TABLE user_role_history (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    old_role VARCHAR(50),
    new_role VARCHAR(50) NOT NULL,
    changed_by INT NOT NULL,
    change_reason VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_user_id (user_id),
    INDEX idx_changed_by (changed_by),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**Field Descriptions:**
- `id`: Primary key, auto-increment
- `user_id`: Foreign key to users table
- `old_role`: Previous role name (NULL for first assignment)
- `new_role`: New role name assigned
- `changed_by`: User ID who made the change
- `change_reason`: Optional reason for the role change
- `created_at`: Timestamp when change was made

## Modifications to Existing Tables

### Update `users` Table
If not already present, ensure the users table has proper role field:

```sql
ALTER TABLE users 
MODIFY COLUMN role VARCHAR(50) NOT NULL DEFAULT 'non_teach_staff',
ADD INDEX idx_role (role);
```

## Initial Data

### Default Roles
```sql
INSERT INTO roles (role_name, display_name, permissions, is_system_role) VALUES
('superAdmin', 'Super Admin', '["all"]', 1),
('compHod', 'HOD (Computer Engineering)', '["dashboard", "home_page", "departments.computer-engineering", "manage_users", "faculty_management"]', 0),
('mechHod', 'HOD (Mechanical Engineering)', '["dashboard", "home_page", "departments.mechanical-engineering", "faculty_management"]', 0),
('extcHod', 'HOD (EXTC)', '["dashboard", "home_page", "departments.extc", "faculty_management"]', 0),
('bshHod', 'HOD (Basic Science & Humanities)', '["dashboard", "home_page", "departments.basic-science-and-humanities", "faculty_management"]', 0),
('cseHod', 'HOD (Computer Science Engineering)', '["dashboard", "home_page", "departments.computer-science-and-engineering", "faculty_management"]', 0),
('electricalHod', 'HOD (Electrical Engineering)', '["dashboard", "home_page", "departments.electrical-engineering", "faculty_management"]', 0),
('teach_staff', 'Teaching Staff', '["dashboard", "home_page", "students_corner"]', 0),
('non_teach_staff', 'Non-Teaching Staff', '["dashboard", "home_page"]', 0),
('principal', 'Principal', '["dashboard", "home_page", "about_us", "academics", "research", "faculty_management", "role_management"]', 0);
```

### Default Permissions
```sql
INSERT INTO permissions (permission_name, display_name, category, description) VALUES
-- Core permissions
('dashboard', 'Dashboard Access', 'core', 'Access to main dashboard'),
('all', 'All Permissions (Super Admin)', 'core', 'Complete system access'),

-- Content management
('home_page', 'Home Page Management', 'content', 'Manage home page content'),
('about_us', 'About Us Management', 'content', 'Manage about us sections'),
('academics', 'Academics Management', 'content', 'Manage academic content'),
('training_placement', 'Training & Placement', 'content', 'Manage training and placement content'),
('students_corner', 'Students Corner', 'content', 'Access to students corner'),
('research', 'Research & Publication', 'content', 'Manage research and publications'),
('human_resource', 'Human Resource', 'content', 'Manage HR content'),
('nirf', 'NIRF Management', 'content', 'Manage NIRF content'),
('nba_naac', 'NBA/NAAC Management', 'content', 'Manage NBA/NAAC content'),

-- Department permissions
('departments.computer-engineering', 'Computer Engineering Department', 'departments', 'Access to Computer Engineering department'),
('departments.mechanical-engineering', 'Mechanical Engineering Department', 'departments', 'Access to Mechanical Engineering department'),
('departments.extc', 'EXTC Department', 'departments', 'Access to EXTC department'),
('departments.electrical-engineering', 'Electrical Engineering Department', 'departments', 'Access to Electrical Engineering department'),
('departments.computer-science-and-engineering', 'Computer Science Engineering Department', 'departments', 'Access to CSE department'),
('departments.basic-science-and-humanities', 'Basic Science & Humanities Department', 'departments', 'Access to BSH department'),

-- Administrative permissions
('manage_users', 'User Management', 'admin', 'Create, edit, and manage users'),
('role_management', 'Role & Permission Management', 'admin', 'Manage roles and permissions'),
('logs', 'System Logs', 'admin', 'View system logs and audit trails'),
('faculty_management', 'Faculty Management', 'admin', 'Manage faculty information'),
('content_approval', 'Content Approval', 'admin', 'Approve content changes');
```

## Indexes and Performance

### Recommended Indexes
```sql
-- For faster role lookups
CREATE INDEX idx_roles_name_display ON roles(role_name, display_name);

-- For permission filtering
CREATE INDEX idx_permissions_category_name ON permissions(category, permission_name);

-- For user role lookups (if not already exists)
CREATE INDEX idx_users_role_email ON users(role, emailId);
```

## Security Considerations

1. **System Roles Protection**: The `is_system_role` flag prevents deletion of critical roles
2. **Permission Validation**: Always validate permissions on the backend
3. **Audit Trail**: Use `user_role_history` table to track role changes
4. **JSON Validation**: Ensure permissions JSON contains valid permission names
5. **Role Hierarchy**: Consider implementing role hierarchy if needed in future

## Migration Scripts

### Migration to Add Role Management Tables
```sql
-- Run this migration to add role management to existing system
START TRANSACTION;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    permissions JSON NOT NULL,
    is_system_role TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_role_name (role_name),
    INDEX idx_system_role (is_system_role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
    id INT NOT NULL AUTO_INCREMENT,
    permission_name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_permission_name (permission_name),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert default roles and permissions
-- (Insert statements from above)

COMMIT;
```

## API Endpoints

The Role Management system provides the following API endpoints:

- `GET /api/roles` - Get all roles
- `POST /api/roles` - Create new role
- `GET /api/roles/:id` - Get role by ID
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role
- `GET /api/roles/permissions/all` - Get all permissions
- `POST /api/roles/permissions` - Create new permission
- `PUT /api/roles/users/:userId/role` - Update user role
- `GET /api/roles/users/role/:roleName` - Get users by role

All endpoints require appropriate authentication and permissions. 