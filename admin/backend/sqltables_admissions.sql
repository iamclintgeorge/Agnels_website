-- SQL script to create admissions and admission_documents tables

CREATE TABLE admissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  course VARCHAR(255) NOT NULL,
  academic_details TEXT,
  address TEXT,
  date_of_birth DATE,
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admission_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admission_id INT NOT NULL,
  document_path VARCHAR(255) NOT NULL,
  FOREIGN KEY (admission_id) REFERENCES admissions(id) ON DELETE CASCADE
);
