-- Admin Activity Logs Table
-- This table stores all activities performed in the admin panel for audit trail

CREATE TABLE admin_activity_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resource_id VARCHAR(50) DEFAULT NULL,
    method VARCHAR(10) NOT NULL,
    endpoint VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    request_data JSON DEFAULT NULL,
    response_status INT DEFAULT NULL,
    old_data JSON DEFAULT NULL,
    new_data JSON DEFAULT NULL,
    description TEXT DEFAULT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_id VARCHAR(255) DEFAULT NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_username (username),
    INDEX idx_action (action),
    INDEX idx_resource (resource),
    INDEX idx_timestamp (timestamp),
    INDEX idx_user_role (user_role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for reference
INSERT INTO admin_activity_logs (
    user_id, username, user_role, action, resource, resource_id, 
    method, endpoint, description
) VALUES 
(1, 'superAdmin', 'superAdmin', 'CREATE', 'hod_desk', '1', 
 'POST', '/api/hod-desk/computer', 'Created new HOD desk content for computer department'),
(1, 'superAdmin', 'superAdmin', 'UPDATE', 'placement_overview', '1', 
 'PUT', '/api/placement/overview/1', 'Updated placement overview content'),
(2, 'compHod', 'compHod', 'DELETE', 'announcement', '3', 
 'DELETE', '/api/announcements/3', 'Deleted announcement with ID 3'); 