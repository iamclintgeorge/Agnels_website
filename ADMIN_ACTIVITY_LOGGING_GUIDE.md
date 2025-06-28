# Admin Activity Logging System

## Overview
A comprehensive logging mechanism has been implemented for your admin panel using MySQL and Winston. This system tracks every action performed in the admin panel with detailed audit trails, timestamps, user information, and change history.

## Features Implemented

### 🔍 **Automatic Activity Tracking**
- **Every HTTP request** to the admin panel is automatically logged
- **User identification** - captures user ID, username, and role
- **Timestamp tracking** - precise timing of all activities
- **IP address and browser info** - for security auditing
- **Request/Response data** - sanitized to hide sensitive information

### 📊 **Database Storage**
- **MySQL table** `admin_activity_logs` stores all activity data
- **JSON columns** for storing complex data structures
- **Indexed fields** for fast querying and filtering
- **Complete audit trail** with before/after data for updates

### 🛡️ **Security & Privacy**
- **Sensitive data redaction** - passwords, tokens automatically hidden
- **Role-based access control** - users see only relevant logs
- **Session tracking** - links activities to specific user sessions

### 📈 **Analytics & Reporting**
- **Activity statistics** - most active users, popular actions
- **Filtering capabilities** - by user, date, action type, resource
- **CSV export** - for external analysis
- **Real-time monitoring** - immediate logging of activities

## Files Created/Modified

### Backend Components

#### 1. **Database Schema**
```sql
admin/backend/admin_activity_logs.sql
```
- Complete table structure for storing activity logs
- Indexes for performance optimization
- Sample data for testing

#### 2. **Logging Service**
```javascript
admin/backend/services/logger.js
```
- Winston configuration for file and console logging
- MySQL database logging functions
- Activity retrieval and statistics functions

#### 3. **Logging Middleware**
```javascript
admin/backend/middlewares/loggingMiddleware.js
```
- Automatic request/response interception
- Smart action detection (CREATE, UPDATE, DELETE, READ)
- Resource identification from endpoints
- Request data sanitization

#### 4. **Activity Logs Controller**
```javascript
admin/backend/controllers/admin/activityLogsController.js
```
- API endpoints for viewing logs
- Filtering and pagination
- Statistics generation
- CSV export functionality

#### 5. **Routes Configuration**
```javascript
admin/backend/routes/admin/activityLogsRoutes.js
```
- Role-based access control
- RESTful API endpoints
- Department-specific log access for HODs

### Frontend Components

#### 6. **Activity Logs Interface**
```jsx
admin/frontend/src/pages/AuditLogs/ActivityLogs.jsx
```
- Modern React component for viewing logs
- Advanced filtering capabilities
- Real-time statistics dashboard
- Responsive design with Tailwind CSS

#### 7. **Navigation Integration**
- Updated `main.jsx` with routing
- Updated `sideBar.jsx` with navigation menu
- Role-based visibility controls

## Installation & Setup

### 1. Install Dependencies
```bash
cd admin/backend
npm install winston winston-mysql
```

### 2. Create Database Table
```sql
-- Run this SQL in your MySQL database
SOURCE admin/backend/admin_activity_logs.sql;
```

### 3. Server Configuration
The logging system is already integrated into your server.js with:
- Logging middleware added to request pipeline
- Activity logs routes mounted at `/api/activity-logs`

## API Endpoints

### Public Endpoints (All authenticated users)
- `GET /api/activity-logs/my-activities` - Current user's activities

### Admin Endpoints (superAdmin, principal)
- `GET /api/activity-logs` - All activities with filtering
- `GET /api/activity-logs/stats` - Activity statistics
- `GET /api/activity-logs/filter-options` - Filter dropdown options
- `GET /api/activity-logs/export` - CSV export
- `GET /api/activity-logs/:id` - Specific activity details

### Department HOD Endpoints
- `GET /api/activity-logs/resource/:resource` - Department-specific activities

## Usage Examples

### 1. **Viewing All Activities** (Super Admin)
```javascript
// Fetch all activities with pagination
const response = await fetch('/api/activity-logs?page=1&limit=50', {
  credentials: 'include'
});
const data = await response.json();
```

### 2. **Filtering Activities**
```javascript
// Filter by user role and date range
const response = await fetch('/api/activity-logs?' + new URLSearchParams({
  userRole: 'compHod',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  action: 'UPDATE'
}), { credentials: 'include' });
```

### 3. **Getting Statistics**
```javascript
// Get activity statistics for last 30 days
const response = await fetch('/api/activity-logs/stats', {
  credentials: 'include'
});
const stats = await response.json();
```

### 4. **Manual Logging in Controllers**
```javascript
import { logCustomActivity } from '../../middlewares/loggingMiddleware.js';

// In your controller function
await logCustomActivity(req, {
  action: 'UPDATE',
  resource: 'hod_desk',
  resourceId: id,
  oldData: oldRecord,
  newData: newRecord,
  description: 'Updated HOD desk content'
});
```

## Role-Based Access Control

### SuperAdmin & Principal
- ✅ View all activities across the system
- ✅ Export data to CSV
- ✅ Access detailed statistics
- ✅ Filter by any criteria

### Department HODs
- ✅ View their own activities
- ✅ View their department's activities
- ❌ Cannot access other departments' logs
- ❌ Limited statistical access

### Teaching & Non-Teaching Staff
- ✅ View their own activities only
- ❌ Cannot access others' activities
- ❌ No administrative access

## Activity Log Data Structure

Each activity log contains:
```json
{
  "id": 1,
  "user_id": 123,
  "username": "john.doe",
  "user_role": "compHod",
  "action": "UPDATE",
  "resource": "hod_desk",
  "resource_id": "5",
  "method": "PUT",
  "endpoint": "/api/hod-desk/computer/5",
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0...",
  "request_data": {"content": "New content"},
  "response_status": 200,
  "old_data": {"content": "Old content"},
  "new_data": {"content": "New content"},
  "description": "Updated HOD desk content for computer department",
  "timestamp": "2024-01-15 10:30:45",
  "session_id": "sess_abc123"
}
```

## Monitoring & Maintenance

### Log File Locations
- **Error logs**: `admin/backend/logs/error.log`
- **Combined logs**: `admin/backend/logs/combined.log`
- **Console output**: Real-time in development

### Database Maintenance
```sql
-- Clean old logs (optional, run monthly)
DELETE FROM admin_activity_logs 
WHERE timestamp < DATE_SUB(NOW(), INTERVAL 1 YEAR);

-- Get log statistics
SELECT 
  action, 
  COUNT(*) as count,
  DATE(timestamp) as date
FROM admin_activity_logs 
WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY action, DATE(timestamp)
ORDER BY date DESC, count DESC;
```

### Performance Optimization
- Logs are indexed on frequently queried fields
- Automatic log rotation prevents file size issues
- Database queries use efficient pagination

## Security Considerations

### Data Protection
- **Sensitive fields** (passwords, tokens) are automatically redacted
- **User data** is sanitized before storage
- **Session tracking** enables security auditing

### Access Control
- **Role-based permissions** ensure data privacy
- **Department isolation** prevents unauthorized access
- **Audit trail** cannot be modified by users

## Troubleshooting

### Common Issues

#### 1. **Logs not appearing**
```bash
# Check if middleware is running
tail -f admin/backend/logs/combined.log

# Verify database connection
mysql -u username -p database_name
> SELECT COUNT(*) FROM admin_activity_logs;
```

#### 2. **Permission errors**
- Ensure user roles are correctly set in the database
- Check authMiddleware is properly authenticating users
- Verify role-based access in activityLogsRoutes.js

#### 3. **Performance issues**
```sql
-- Check database indexes
SHOW INDEX FROM admin_activity_logs;

-- Optimize queries with EXPLAIN
EXPLAIN SELECT * FROM admin_activity_logs WHERE user_id = 123;
```

## Benefits

### For Administrators
- **Complete visibility** into all admin panel activities
- **Security monitoring** with IP tracking and session management
- **Compliance support** with detailed audit trails
- **Performance insights** through activity analytics

### For Department HODs
- **Department oversight** with activity monitoring
- **Change tracking** for their content areas
- **Historical reference** for past modifications

### For Faculty
- **Personal activity history** for reference
- **Accountability tracking** for their actions
- **Transparency** in content management

## Future Enhancements

### Potential Additions
1. **Real-time notifications** for critical activities
2. **Advanced analytics** with charts and graphs
3. **Automated alerts** for suspicious activities
4. **Integration with backup systems** for data recovery
5. **Mobile-responsive** activity monitoring

### Customization Options
1. **Custom activity types** for specific use cases
2. **Extended retention policies** for different log types
3. **External log forwarding** to security systems
4. **API webhooks** for third-party integrations

---

## Summary

This comprehensive logging system provides:
- ✅ **Complete activity tracking** for all admin panel actions
- ✅ **Role-based access control** with appropriate restrictions
- ✅ **Real-time logging** with immediate data capture
- ✅ **Historical analysis** with filtering and export capabilities
- ✅ **Security auditing** with IP and session tracking
- ✅ **User-friendly interface** with modern React components

The system is now fully integrated into your existing codebase and will automatically begin logging all admin panel activities. Users can access their activity logs through the "Activity Logs" menu item in the admin sidebar. 