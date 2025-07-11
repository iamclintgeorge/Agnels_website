-- Department Management SQL Structure
-- This file contains all table structures for the new department management system

-- Create dept_text table (similar to infoText)
CREATE TABLE dept_text (
  id int(11) NOT NULL AUTO_INCREMENT,
  department_id int(11) NOT NULL,
  section varchar(50) NOT NULL,
  content longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  created_by tinyint(1) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_dept_section (department_id, section)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Committees and Boards of Studies
CREATE TABLE dept_committees (
  id int(11) NOT NULL AUTO_INCREMENT,
  type enum('Under-graduate','Post-graduate','PhD') NOT NULL,
  department_id int(11) NOT NULL,
  year varchar(12) NOT NULL,
  attachment varchar(1000) NOT NULL,
  created_by tinyint(4) NOT NULL,
  created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_dept_committees (department_id, type, year)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Department Publications
CREATE TABLE dept_publications (
  id int(11) NOT NULL AUTO_INCREMENT,
  department_id int(11) NOT NULL,
  year varchar(255) NOT NULL,
  attachment varchar(1000) NOT NULL,
  created_by tinyint(1) NOT NULL,
  created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_dept_publications (department_id, year)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Magazines
CREATE TABLE magzines (
  id int(11) NOT NULL AUTO_INCREMENT,
  department_id int(11) NOT NULL,
  year varchar(255) NOT NULL,
  attachment varchar(1000) NOT NULL,
  created_by tinyint(1) NOT NULL,
  created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_magzines (department_id, year)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Time Tables
CREATE TABLE time_tables (
  id int(11) NOT NULL AUTO_INCREMENT,
  department_id int(11) NOT NULL,
  type enum('Under-graduate','Post-graduate','PhD') NOT NULL,
  division varchar(256) DEFAULT NULL,
  semester int(2) NOT NULL,
  attachment varchar(1000) NOT NULL,
  created_by tinyint(1) NOT NULL,
  created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_time_tables (department_id, type, semester)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Achievements
CREATE TABLE achievements (
  id int(11) NOT NULL AUTO_INCREMENT,
  type enum('Under-graduate','Post-graduate','PhD') NOT NULL,
  department_id int(11) NOT NULL,
  year varchar(12) NOT NULL,
  attachment varchar(1000) NOT NULL,
  created_by tinyint(1) NOT NULL,
  created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_achievements (department_id, type, year)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Academic Calendars
CREATE TABLE academic_calendars (
  id int(11) NOT NULL AUTO_INCREMENT,
  type enum('Under-graduate','Post-graduate','PhD') NOT NULL,
  department_id int(11) NOT NULL,
  attachment varchar(1000) NOT NULL,
  created_by tinyint(1) NOT NULL,
  created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_academic_calendars (department_id, type)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Activities
CREATE TABLE activities (
  id int(11) NOT NULL AUTO_INCREMENT,
  department_id int(11) NOT NULL,
  heading varchar(256) NOT NULL,
  attachment varchar(1000) NOT NULL,
  created_by tinyint(1) NOT NULL,
  created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_activities (department_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Associations
CREATE TABLE associations (
  id int(11) NOT NULL AUTO_INCREMENT,
  department_id int(25) NOT NULL,
  year varchar(20) NOT NULL,
  attachment text NOT NULL,
  created_by tinyint(1) NOT NULL,
  created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_associations (department_id, year)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Undergraduate Projects (BE level)
CREATE TABLE undergraduate_projects (
  id int(11) NOT NULL AUTO_INCREMENT,
  department_id int(11) NOT NULL,
  type varchar(200) NOT NULL DEFAULT 'Under-graduate',
  projects text NOT NULL,
  created_by tinyint(1) NOT NULL,
  created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_undergraduate_projects (department_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Mini Projects (TE and SE level)
CREATE TABLE mini_projects (
  id int(11) NOT NULL AUTO_INCREMENT,
  department_id int(11) NOT NULL,
  type varchar(200) NOT NULL DEFAULT 'Under-graduate',
  level enum('TE','SE') NOT NULL,
  projects text NOT NULL,
  created_by tinyint(1) NOT NULL,
  created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_mini_projects (department_id, level)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Add foreign key constraints (optional, uncomment if needed)
/*
ALTER TABLE dept_text ADD CONSTRAINT fk_dept_text_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE dept_committees ADD CONSTRAINT fk_dept_committees_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE dept_publications ADD CONSTRAINT fk_dept_publications_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE magzines ADD CONSTRAINT fk_magzines_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE time_tables ADD CONSTRAINT fk_time_tables_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE achievements ADD CONSTRAINT fk_achievements_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE academic_calendars ADD CONSTRAINT fk_academic_calendars_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE activities ADD CONSTRAINT fk_activities_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE associations ADD CONSTRAINT fk_associations_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE undergraduate_projects ADD CONSTRAINT fk_undergraduate_projects_department FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE mini_projects ADD CONSTRAINT fk_mini_projects_department FOREIGN KEY (department_id) REFERENCES departments(id);
*/ 