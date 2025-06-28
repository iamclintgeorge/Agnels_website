-- Table structure for HOD Desk infoText
CREATE TABLE IF NOT EXISTS `infoText` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Section` varchar(20) NOT NULL,
  `Content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_section` (`Section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Sample data for HOD desk sections
INSERT INTO `infoText` (`Section`, `Content`) VALUES
('comHod', '<h2>Welcome to Computer Engineering Department</h2><p>Message from the Head of Department - Computer Engineering</p><p>Content will be updated by the HOD.</p>'),
('mechHod', '<h2>Welcome to Mechanical Engineering Department</h2><p>Message from the Head of Department - Mechanical Engineering</p><p>Content will be updated by the HOD.</p>'),
('extcHod', '<h2>Welcome to EXTC Department</h2><p>Message from the Head of Department - EXTC</p><p>Content will be updated by the HOD.</p>'),
('electricalHod', '<h2>Welcome to Electrical Engineering Department</h2><p>Message from the Head of Department - Electrical Engineering</p><p>Content will be updated by the HOD.</p>'),
('itHod', '<h2>Welcome to Information Technology Department</h2><p>Message from the Head of Department - Information Technology</p><p>Content will be updated by the HOD.</p>'),
('bshHod', '<h2>Welcome to Basic Science and Humanities Department</h2><p>Message from the Head of Department - Basic Science and Humanities</p><p>Content will be updated by the HOD.</p>');

-- Add additional indexes for better performance
CREATE INDEX `idx_section_created` ON `infoText` (`Section`, `Created_At`);
CREATE INDEX `idx_updated_at` ON `infoText` (`Updated_At`); 