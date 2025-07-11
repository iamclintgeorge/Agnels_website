# About Us Management System - SQL Table Structure

## Overview
This document outlines the database table structures required for the About Us Management System in the Agnels Website application.

## Tables

### 1. `about_us_sections` Table
Main table storing all About Us section content with flexible JSON structure.

```sql
CREATE TABLE about_us_sections (
    id INT NOT NULL AUTO_INCREMENT,
    section_name VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    content JSON NOT NULL,
    is_visible TINYINT(1) NOT NULL DEFAULT 1,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_section_name (section_name),
    INDEX idx_visible_order (is_visible, display_order),
    INDEX idx_section_name (section_name),
    INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**Field Descriptions:**
- `id`: Primary key, auto-increment
- `section_name`: Unique identifier for the section (e.g., 'History', 'Vision and Mission')
- `title`: Display title for the section
- `content`: JSON field containing the structured content for the section
- `is_visible`: Flag to show/hide section on public website
- `display_order`: Order in which sections appear on the website
- `created_at`: Timestamp when section was created
- `updated_at`: Timestamp when section was last modified

### 2. `about_us_section_history` Table
Tracks version history and changes made to About Us sections for audit purposes.

```sql
CREATE TABLE about_us_section_history (
    id INT NOT NULL AUTO_INCREMENT,
    section_name VARCHAR(100) NOT NULL,
    content JSON NOT NULL,
    changed_by INT NOT NULL,
    change_description VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_section_name (section_name),
    INDEX idx_changed_by (changed_by),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**Field Descriptions:**
- `id`: Primary key, auto-increment
- `section_name`: Reference to the section that was changed
- `content`: Snapshot of content at the time of change
- `changed_by`: Foreign key to users table (who made the change)
- `change_description`: Optional description of what was changed
- `created_at`: Timestamp when change was recorded

### 3. `about_us_media` Table (Optional)
Stores metadata for images and files used in About Us sections.

```sql
CREATE TABLE about_us_media (
    id INT NOT NULL AUTO_INCREMENT,
    section_name VARCHAR(100) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    uploaded_by INT NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_section_field (section_name, field_name),
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_active (is_active),
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**Field Descriptions:**
- `id`: Primary key, auto-increment
- `section_name`: Which section this media belongs to
- `field_name`: Which field in the section (e.g., 'headerImage', 'documentUrl')
- `file_name`: Generated unique filename
- `original_name`: Original filename when uploaded
- `file_path`: Relative path to the file
- `file_size`: File size in bytes
- `mime_type`: MIME type of the file
- `uploaded_by`: User who uploaded the file
- `is_active`: Flag to mark file as active/inactive
- `created_at`: Upload timestamp

### 4. `about_us_templates` Table (Optional)
Stores template structures for different section types.

```sql
CREATE TABLE about_us_templates (
    id INT NOT NULL AUTO_INCREMENT,
    template_name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(150) NOT NULL,
    template_structure JSON NOT NULL,
    description TEXT,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_template_name (template_name),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**Field Descriptions:**
- `id`: Primary key, auto-increment
- `template_name`: Unique identifier for the template
- `display_name`: Human-readable name for the template
- `template_structure`: JSON defining the structure and fields
- `description`: Optional description of the template
- `is_active`: Flag to enable/disable template
- `created_at`: Creation timestamp
- `updated_at`: Last modification timestamp

## Sample Data

### Default About Us Sections
```sql
INSERT INTO about_us_sections (section_name, title, content, is_visible, display_order) VALUES
('History', 'Our History', '{
    "subtitle": "Tracing the roots and evolution of our institution",
    "headerImage": "",
    "sections": {
        "establishment": {
            "heading": "Establishment",
            "text": "",
            "image": ""
        },
        "endeavor": {
            "heading": "An Endeavor called Fr. CRIT",
            "text": "The Agnel Ashram Family Movement originated way back in 1957...",
            "image": ""
        },
        "history": {
            "heading": "History", 
            "text": "The Agnel Ashram Fathers - a group of Catholic priests...",
            "image": ""
        }
    }
}', 1, 1),

('Vision and Mission', 'Vision & Mission', '{
    "subtitle": "Exploring our guiding principles and aspirations",
    "headerImage": "",
    "vision": "To evolve and flourish as a progressive centre for modern technical education...",
    "mission": [
        "To provide industry oriented quality education.",
        "To provide holistic environment for overall personal development.",
        "To foster relationship with other institutes of repute, alumni, and industry."
    ],
    "message": {
        "author": "Rev. Dr. Ivon Almeida",
        "text": "Fr. C. Rodrigues Institute of Technology, Vashi, is one such exemplar...",
        "image": ""
    }
}', 1, 2),

('Trustees', 'List of Trustees', '{
    "subtitle": "Guiding us with vision and leadership",
    "headerImage": "",
    "trustees": [
        {"name": "Fr. Bento Rodrigues", "position": "Chairman", "image": ""},
        {"name": "Fr. Alarico Carvalho", "position": "Vice Chairman", "image": ""},
        {"name": "Fr. Peter D''Souza", "position": "Treasurer", "image": ""},
        {"name": "Fr. Valerian D''Souza", "position": "Secretary", "image": ""},
        {"name": "Fr. Agnelo Gomes", "position": "Member", "image": ""}
    ]
}', 1, 3),

('Managing Director''s Desk', 'Managing Director''s Desk', '{
    "subtitle": "A message from our Managing Director",
    "headerImage": "",
    "director": {
        "name": "Rev. Fr. Peter D''Souza",
        "position": "Managing Director",
        "message": "In its brief existence of thirty years...",
        "image": ""
    },
    "quotes": {
        "text": "Any sound disciplinary policy should aim at education rather than punishment...",
        "author": "Goethe"
    }
}', 1, 4),

('Principal''s Desk', 'Principal''s Desk', '{
    "subtitle": "A message from our Principal",
    "headerImage": "",
    "principal": {
        "name": "",
        "position": "Principal",
        "message": "Welcome to Principal''s Desk. Here is a brief message from our Principal...",
        "image": ""
    }
}', 1, 5),

('Service Regulation', 'Service Regulation', '{
    "subtitle": "Guidelines and policies for our staff",
    "headerImage": "",
    "content": "Information on policies and standards",
    "documentUrl": ""
}', 1, 6),

('Best Practices', 'Best Practices', '{
    "subtitle": "Excellence in education and administration",
    "headerImage": "",
    "content": "Committed to excellence in every endeavor",
    "documentUrl": ""
}', 1, 7),

('Mandatory Disclosures', 'Mandatory Disclosures', '{
    "subtitle": "Information required by regulatory bodies",
    "headerImage": "",
    "content": "Ensuring compliance and transparency",
    "documentUrl": ""
}', 1, 8);
```

### Sample Templates
```sql
INSERT INTO about_us_templates (template_name, display_name, template_structure, description) VALUES
('simple_content', 'Simple Content Section', '{
    "fields": [
        {"name": "title", "type": "text", "required": true},
        {"name": "subtitle", "type": "text", "required": false},
        {"name": "headerImage", "type": "image", "required": false},
        {"name": "content", "type": "textarea", "required": true}
    ]
}', 'Basic content section with title, subtitle, image and content'),

('document_section', 'Document Section', '{
    "fields": [
        {"name": "title", "type": "text", "required": true},
        {"name": "subtitle", "type": "text", "required": false},
        {"name": "content", "type": "textarea", "required": false},
        {"name": "documentUrl", "type": "file", "required": false}
    ]
}', 'Section with document upload capability'),

('people_list', 'People List Section', '{
    "fields": [
        {"name": "title", "type": "text", "required": true},
        {"name": "subtitle", "type": "text", "required": false},
        {"name": "people", "type": "array", "required": true, "structure": {
            "name": {"type": "text", "required": true},
            "position": {"type": "text", "required": true},
            "image": {"type": "image", "required": false}
        }}
    ]
}', 'Section for displaying list of people (trustees, committee members, etc.)');
```

## Indexes and Performance

### Recommended Additional Indexes
```sql
-- For faster content searches
CREATE INDEX idx_about_us_content_search ON about_us_sections((CAST(content AS CHAR(1000))));

-- For media file lookups
CREATE INDEX idx_media_section_field ON about_us_media(section_name, field_name, is_active);

-- For history tracking
CREATE INDEX idx_history_date_range ON about_us_section_history(section_name, created_at DESC);

-- For template queries
CREATE INDEX idx_template_active_name ON about_us_templates(is_active, template_name);
```

## JSON Content Structure Examples

### History Section Structure
```json
{
  "subtitle": "Tracing the roots and evolution of our institution",
  "headerImage": "/uploads/images/history-header.jpg",
  "sections": {
    "establishment": {
      "heading": "Establishment",
      "text": "The institution was established in...",
      "image": "/uploads/images/establishment.jpg"
    },
    "endeavor": {
      "heading": "An Endeavor called Fr. CRIT",
      "text": "The Agnel Ashram Family Movement...",
      "image": "/uploads/images/endeavor.jpg"
    },
    "history": {
      "heading": "History",
      "text": "Detailed history content...",
      "image": "/uploads/images/history.jpg"
    }
  }
}
```

### Vision and Mission Structure
```json
{
  "subtitle": "Exploring our guiding principles and aspirations",
  "headerImage": "/uploads/images/vision-mission.jpg",
  "vision": "To evolve and flourish as a progressive centre...",
  "mission": [
    "To provide industry oriented quality education.",
    "To provide holistic environment for overall development.",
    "To foster relationships with institutes and industry."
  ],
  "message": {
    "author": "Rev. Dr. Ivon Almeida",
    "text": "Fr. C. Rodrigues Institute of Technology...",
    "image": "/uploads/images/director.jpg"
  }
}
```

### Trustees List Structure
```json
{
  "subtitle": "Guiding us with vision and leadership",
  "headerImage": "/uploads/images/trustees-header.jpg",
  "trustees": [
    {
      "name": "Fr. Bento Rodrigues",
      "position": "Chairman",
      "image": "/uploads/images/trustees/bento-rodrigues.jpg"
    },
    {
      "name": "Fr. Alarico Carvalho", 
      "position": "Vice Chairman",
      "image": "/uploads/images/trustees/alarico-carvalho.jpg"
    }
  ]
}
```

## Security and Validation

### Content Validation Rules
```sql
-- Add check constraints for validation
ALTER TABLE about_us_sections 
ADD CONSTRAINT chk_section_name_format 
CHECK (section_name REGEXP '^[a-zA-Z0-9\\s\\-\']+$');

ALTER TABLE about_us_sections 
ADD CONSTRAINT chk_title_length 
CHECK (CHAR_LENGTH(title) >= 1 AND CHAR_LENGTH(title) <= 200);

ALTER TABLE about_us_sections 
ADD CONSTRAINT chk_display_order_positive 
CHECK (display_order >= 0);
```

### Media File Validation
```sql
-- Add constraints for media files
ALTER TABLE about_us_media 
ADD CONSTRAINT chk_file_size_limit 
CHECK (file_size > 0 AND file_size <= 10485760); -- 10MB limit

ALTER TABLE about_us_media 
ADD CONSTRAINT chk_mime_type_allowed 
CHECK (mime_type IN (
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf', 'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
));
```

## Migration Scripts

### Initial Setup Migration
```sql
-- Create About Us management tables
START TRANSACTION;

-- Create main sections table
CREATE TABLE IF NOT EXISTS about_us_sections (
    id INT NOT NULL AUTO_INCREMENT,
    section_name VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    content JSON NOT NULL,
    is_visible TINYINT(1) NOT NULL DEFAULT 1,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_section_name (section_name),
    INDEX idx_visible_order (is_visible, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create history tracking table
CREATE TABLE IF NOT EXISTS about_us_section_history (
    id INT NOT NULL AUTO_INCREMENT,
    section_name VARCHAR(100) NOT NULL,
    content JSON NOT NULL,
    changed_by INT NOT NULL,
    change_description VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_section_name (section_name),
    INDEX idx_changed_by (changed_by),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create media tracking table
CREATE TABLE IF NOT EXISTS about_us_media (
    id INT NOT NULL AUTO_INCREMENT,
    section_name VARCHAR(100) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    uploaded_by INT NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_section_field (section_name, field_name),
    INDEX idx_uploaded_by (uploaded_by),
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert default sections
-- (Use the INSERT statements from above)

COMMIT;
```

## API Endpoints

The About Us Management system provides the following API endpoints:

### Public Endpoints
- `GET /api/aboutus/public/sections` - Get all visible sections for public website
- `GET /api/aboutus/public/sections/:name` - Get specific visible section

### Admin Endpoints (Protected)
- `GET /api/aboutus/sections` - Get all sections (admin)
- `GET /api/aboutus/sections/:name` - Get specific section (admin)
- `POST /api/aboutus/sections` - Create new section
- `PUT /api/aboutus/sections/:name` - Update section content
- `DELETE /api/aboutus/sections/:name` - Delete section
- `PATCH /api/aboutus/sections/:name/visibility` - Toggle section visibility
- `PUT /api/aboutus/sections/bulk` - Bulk update sections
- `GET /api/aboutus/sections/:name/history` - Get section change history
- `POST /api/aboutus/upload/file` - Upload document file
- `POST /api/aboutus/upload/image` - Upload image file
- `GET /api/aboutus/templates` - Get available section templates

### File Management Endpoints
- `POST /api/aboutus/media/upload` - Upload media file
- `GET /api/aboutus/media/:id` - Get media file info
- `DELETE /api/aboutus/media/:id` - Delete media file

All admin endpoints require proper authentication and `about_us` permission. 