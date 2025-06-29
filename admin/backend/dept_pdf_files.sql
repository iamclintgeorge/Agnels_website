-- Table structure for department PDF files
CREATE TABLE dept_Pdf_files (
  id int NOT NULL AUTO_INCREMENT,
  department varchar(100) NOT NULL,
  section varchar(100) NOT NULL,
  title varchar(255) NOT NULL,
  filename varchar(255) NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_dept_section (department, section),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Example data for reference
-- INSERT INTO dept_Pdf_files (department, section, title, filename) VALUES
-- ('computer-engineering', 'activities', 'Sample Activity Document', '1234567890-sample.pdf'),
-- ('mechanical-engineering', 'publications', 'Research Paper 2024', '1234567891-research.pdf'),
-- ('electrical-engineering', 'achievements', 'Student Awards 2024', '1234567892-awards.pdf'); 