-- Content Quality Control Database Schema

-- Content approval requests table
CREATE TABLE content_approval_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content_type ENUM('hod_desk', 'department_pdf', 'home_page', 'about_us', 'academics', 'research', 'announcement') NOT NULL,
  content_id VARCHAR(255), -- Original content ID if updating existing content
  section VARCHAR(100), -- Section identifier (e.g., 'comHod', 'computer-engineering/activities')
  title VARCHAR(255) NOT NULL,
  current_content LONGTEXT, -- Current live content (if updating)
  proposed_content LONGTEXT NOT NULL, -- New content being proposed
  change_type ENUM('create', 'update', 'delete') NOT NULL DEFAULT 'create',
  change_summary TEXT, -- Brief description of changes
  
  -- Requester information
  requested_by INT NOT NULL, -- User ID who requested the change
  requester_role VARCHAR(50) NOT NULL,
  department VARCHAR(100), -- Department associated with the request
  
  -- Approval workflow
  status ENUM('pending', 'approved', 'rejected', 'needs_revision') NOT NULL DEFAULT 'pending',
  approval_level INT DEFAULT 1, -- Current approval level (1=HOD, 2=Principal, 3=SuperAdmin)
  required_approval_level INT DEFAULT 1, -- Maximum approval level required
  
  -- Approval chain
  hod_approved_by INT NULL,
  hod_approved_at TIMESTAMP NULL,
  hod_comments TEXT NULL,
  
  principal_approved_by INT NULL,
  principal_approved_at TIMESTAMP NULL,
  principal_comments TEXT NULL,
  
  superadmin_approved_by INT NULL,
  superadmin_approved_at TIMESTAMP NULL,
  superadmin_comments TEXT NULL,
  
  -- Final approval
  final_approved_by INT NULL,
  final_approved_at TIMESTAMP NULL,
  implemented_at TIMESTAMP NULL,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Foreign keys
  FOREIGN KEY (requested_by) REFERENCES users(id),
  FOREIGN KEY (hod_approved_by) REFERENCES users(id),
  FOREIGN KEY (principal_approved_by) REFERENCES users(id),
  FOREIGN KEY (superadmin_approved_by) REFERENCES users(id),
  FOREIGN KEY (final_approved_by) REFERENCES users(id),
  
  -- Indexes
  INDEX idx_status (status),
  INDEX idx_content_type (content_type),
  INDEX idx_department (department),
  INDEX idx_requested_by (requested_by),
  INDEX idx_approval_level (approval_level),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Content approval workflow rules
CREATE TABLE content_approval_rules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content_type VARCHAR(50) NOT NULL,
  requester_role VARCHAR(50) NOT NULL,
  department VARCHAR(100),
  
  -- Approval requirements
  requires_hod_approval BOOLEAN DEFAULT TRUE,
  requires_principal_approval BOOLEAN DEFAULT FALSE,
  requires_superadmin_approval BOOLEAN DEFAULT FALSE,
  
  -- Auto-approval conditions
  auto_approve_minor_changes BOOLEAN DEFAULT FALSE,
  auto_approve_same_department BOOLEAN DEFAULT FALSE,
  
  -- Escalation rules
  escalate_after_hours INT DEFAULT 72, -- Escalate if no response within X hours
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_rule (content_type, requester_role, department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Content approval notifications
CREATE TABLE content_approval_notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  approval_request_id INT NOT NULL,
  recipient_id INT NOT NULL,
  notification_type ENUM('approval_required', 'approved', 'rejected', 'escalated', 'implemented') NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL,
  
  FOREIGN KEY (approval_request_id) REFERENCES content_approval_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES users(id),
  
  INDEX idx_recipient (recipient_id),
  INDEX idx_request (approval_request_id),
  INDEX idx_type (notification_type),
  INDEX idx_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Content change history/audit trail
CREATE TABLE content_change_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  approval_request_id INT NOT NULL,
  action ENUM('submitted', 'approved', 'rejected', 'revised', 'escalated', 'implemented') NOT NULL,
  performed_by INT NOT NULL,
  performer_role VARCHAR(50) NOT NULL,
  comments TEXT,
  previous_status VARCHAR(50),
  new_status VARCHAR(50),
  action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (approval_request_id) REFERENCES content_approval_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (performed_by) REFERENCES users(id),
  
  INDEX idx_request (approval_request_id),
  INDEX idx_action (action),
  INDEX idx_performer (performed_by),
  INDEX idx_timestamp (action_timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Department hierarchy mapping
CREATE TABLE department_hierarchy (
  id INT PRIMARY KEY AUTO_INCREMENT,
  department VARCHAR(100) NOT NULL,
  hod_role VARCHAR(50) NOT NULL,
  reports_to_principal BOOLEAN DEFAULT TRUE,
  escalation_order JSON, -- Array of roles in escalation order
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_department (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default approval rules
INSERT INTO content_approval_rules (content_type, requester_role, department, requires_hod_approval, requires_principal_approval, requires_superadmin_approval) VALUES
-- HOD desk content rules
('hod_desk', 'teach_staff', 'computer-engineering', TRUE, FALSE, FALSE),
('hod_desk', 'teach_staff', 'mechanical-engineering', TRUE, FALSE, FALSE),
('hod_desk', 'teach_staff', 'electrical-engineering', TRUE, FALSE, FALSE),
('hod_desk', 'teach_staff', 'extc', TRUE, FALSE, FALSE),
('hod_desk', 'teach_staff', 'basic-science-and-humanities', TRUE, FALSE, FALSE),
('hod_desk', 'teach_staff', 'computer-science-and-engineering', TRUE, FALSE, FALSE),
('hod_desk', 'compHod', 'computer-engineering', FALSE, TRUE, FALSE),
('hod_desk', 'mechHod', 'mechanical-engineering', FALSE, TRUE, FALSE),
('hod_desk', 'electricalHod', 'electrical-engineering', FALSE, TRUE, FALSE),
('hod_desk', 'extcHod', 'extc', FALSE, TRUE, FALSE),
('hod_desk', 'bshHod', 'basic-science-and-humanities', FALSE, TRUE, FALSE),
('hod_desk', 'itHod', 'computer-science-and-engineering', FALSE, TRUE, FALSE),

-- Department PDF rules
('department_pdf', 'teach_staff', 'computer-engineering', TRUE, FALSE, FALSE),
('department_pdf', 'teach_staff', 'mechanical-engineering', TRUE, FALSE, FALSE),
('department_pdf', 'teach_staff', 'electrical-engineering', TRUE, FALSE, FALSE),
('department_pdf', 'teach_staff', 'extc', TRUE, FALSE, FALSE),
('department_pdf', 'teach_staff', 'basic-science-and-humanities', TRUE, FALSE, FALSE),
('department_pdf', 'teach_staff', 'computer-science-and-engineering', TRUE, FALSE, FALSE),

-- Home page content rules
('home_page', 'teach_staff', NULL, TRUE, TRUE, FALSE),
('home_page', 'compHod', NULL, FALSE, TRUE, FALSE),
('home_page', 'principal', NULL, FALSE, FALSE, TRUE),

-- About us content rules  
('about_us', 'teach_staff', NULL, TRUE, TRUE, FALSE),
('about_us', 'principal', NULL, FALSE, FALSE, TRUE),

-- Research content rules
('research', 'teach_staff', 'computer-engineering', TRUE, TRUE, FALSE),
('research', 'teach_staff', 'mechanical-engineering', TRUE, TRUE, FALSE),
('research', 'teach_staff', 'electrical-engineering', TRUE, TRUE, FALSE),
('research', 'teach_staff', 'extc', TRUE, TRUE, FALSE),
('research', 'teach_staff', 'basic-science-and-humanities', TRUE, TRUE, FALSE),
('research', 'teach_staff', 'computer-science-and-engineering', TRUE, TRUE, FALSE);

-- Insert department hierarchy
INSERT INTO department_hierarchy (department, hod_role, reports_to_principal, escalation_order) VALUES
('computer-engineering', 'compHod', TRUE, '["compHod", "principal", "superAdmin"]'),
('mechanical-engineering', 'mechHod', TRUE, '["mechHod", "principal", "superAdmin"]'),
('electrical-engineering', 'electricalHod', TRUE, '["electricalHod", "principal", "superAdmin"]'),
('extc', 'extcHod', TRUE, '["extcHod", "principal", "superAdmin"]'),
('basic-science-and-humanities', 'bshHod', TRUE, '["bshHod", "principal", "superAdmin"]'),
('computer-science-and-engineering', 'itHod', TRUE, '["itHod", "principal", "superAdmin"]');

-- Create indexes for better performance
CREATE INDEX idx_approval_workflow ON content_approval_requests (status, approval_level, department);
CREATE INDEX idx_pending_approvals ON content_approval_requests (status, approval_level, created_at);
CREATE INDEX idx_user_requests ON content_approval_requests (requested_by, status);
CREATE INDEX idx_content_lookup ON content_approval_requests (content_type, section, status); 