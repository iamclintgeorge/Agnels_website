# Content Quality Control System

## Overview

The Content Quality Control system provides a moderated approval process for your website, ensuring all changes are vetted by key staff members (superAdmin, compHOD, Principal, etc.) before going live. This system implements a hierarchical approval workflow where faculty members report to their respective HODs, and content flows through appropriate approval chains.

## System Architecture

### Database Schema

The system uses several database tables to manage the approval workflow:

1. **`content_approval_requests`** - Core table storing approval requests
2. **`content_approval_rules`** - Defines approval requirements for different content types and user roles
3. **`content_approval_notifications`** - Manages notifications for approval events
4. **`content_change_history`** - Audit trail of all approval actions
5. **`department_hierarchy`** - Maps departments to HOD roles and escalation paths

### User Hierarchy

```
Teaching Staff → Department HOD → Principal → Super Admin
```

#### Role Mappings:
- **Computer Engineering**: `teach_staff` → `compHod` → `principal` → `superAdmin`
- **Mechanical Engineering**: `teach_staff` → `mechHod` → `principal` → `superAdmin`
- **Electrical Engineering**: `teach_staff` → `electricalHod` → `principal` → `superAdmin`
- **EXTC**: `teach_staff` → `extcHod` → `principal` → `superAdmin`
- **CSE/IT**: `teach_staff` → `itHod` → `principal` → `superAdmin`
- **BSH**: `teach_staff` → `bshHod` → `principal` → `superAdmin`

## Content Types and Approval Requirements

### HOD Desk Content
- **Teaching Staff**: Requires HOD approval
- **HODs**: Requires Principal approval
- **Principal**: Requires Super Admin approval
- **Super Admin**: Direct access (no approval needed)

### Department PDFs
- **Teaching Staff**: Requires HOD approval
- **HODs**: Can approve directly for their department
- **Super Admin**: Direct access

### Home Page Content
- **Teaching Staff**: Requires HOD → Principal approval
- **HODs**: Requires Principal approval
- **Principal**: Requires Super Admin approval

### Research & Publications
- **Teaching Staff**: Requires HOD → Principal approval
- **HODs**: Requires Principal approval

## API Endpoints

### Backend Routes (`/api/content-approval`)

```javascript
// Create approval request
POST /api/content-approval

// Get user's own requests
GET /api/content-approval/my-requests

// Get pending approvals to review
GET /api/content-approval/pending

// Get dashboard statistics
GET /api/content-approval/stats

// Get specific request details
GET /api/content-approval/:id

// Get approval history
GET /api/content-approval/:id/history

// Approve a request
POST /api/content-approval/:id/approve

// Reject a request
POST /api/content-approval/:id/reject

// Request revision
POST /api/content-approval/:id/revision
```

## Frontend Components

### 1. ApprovalDashboard (`/pages/ContentApproval/ApprovalDashboard.jsx`)

Main dashboard showing:
- Pending approvals requiring user's action
- User's submitted requests and their status
- Statistics and overview

**Access**: `/content-approval`

### 2. ApprovalWrapper (`/components/ApprovalWrapper.jsx`)

Wrapper component that adds approval workflow to existing forms:

```jsx
import ApprovalWrapper from "../../components/ApprovalWrapper";

<ApprovalWrapper
  contentType="hod_desk"
  section="comHod"
  currentContent={existingContent}
  onApprovalSubmit={handleApprovalSubmit}
  title="Computer Engineering HOD Desk"
  requiresApproval={userRole !== "superAdmin"}
>
  <YourExistingForm />
</ApprovalWrapper>
```

## Implementation Summary

✅ **Database Schema**: Complete approval system tables with relationships
✅ **Backend API**: Full REST API with authentication and role-based access
✅ **Frontend Dashboard**: Approval management interface
✅ **Wrapper Component**: Easy integration with existing forms
✅ **Role-Based Permissions**: Hierarchical approval workflows
✅ **Audit Trail**: Complete history of all approval actions
✅ **Example Integration**: HOD desk component with approval workflow

## Key Features

- **Multi-level Approval**: Supports complex approval hierarchies
- **Department-Specific**: HODs can only manage their department's content
- **Role-Based Access**: Different capabilities based on user role
- **Change Tracking**: Full audit trail of all modifications
- **Easy Integration**: Wrapper component for existing forms
- **Flexible Rules**: Configurable approval requirements

This system ensures content quality while maintaining organizational hierarchy and providing transparency through audit trails.

## Implementation Guide

### Step 1: Database Setup

Run the SQL schema from `admin/backend/content_approval_system.sql`:

```sql
-- This creates all necessary tables and default rules
source admin/backend/content_approval_system.sql;
```

### Step 2: Backend Integration

The backend is automatically integrated when you start the server. Routes are available at `/api/content-approval/*`.

### Step 3: Frontend Integration

#### Option A: Use ApprovalWrapper (Recommended)

Wrap existing forms with the ApprovalWrapper component:

```jsx
// Before
<YourForm onSubmit={handleSubmit} />

// After  
<ApprovalWrapper
  contentType="your_content_type"
  section="your_section"
  currentContent={currentContent}
  onApprovalSubmit={handleApprovalCallback}
  requiresApproval={userRole !== "superAdmin"}
>
  <YourForm />
</ApprovalWrapper>
```

#### Option B: Manual Integration

Modify existing components to submit approval requests instead of direct updates:

```jsx
const handleSubmit = async (content) => {
  if (requiresApproval) {
    // Submit for approval
    const response = await axios.post('/api/content-approval', {
      contentType: 'hod_desk',
      section: 'comHod',
      proposedContent: content,
      // ... other fields
    });
    // Handle approval submission
  } else {
    // Direct update for superAdmin
    await axios.put('/api/hod-desk/computer', { content });
  }
};
```

## User Experience

### For Content Creators (Teaching Staff)

1. **Edit Content**: Use existing forms/editors
2. **Submit for Approval**: Instead of direct save, content goes to approval queue
3. **Track Progress**: View request status in approval dashboard
4. **Receive Notifications**: Get notified when approved/rejected

### For Approvers (HODs, Principal)

1. **Review Queue**: See pending requests in approval dashboard
2. **Review Content**: Compare current vs proposed changes
3. **Take Action**: Approve, reject, or request revisions
4. **Add Comments**: Provide feedback for requesters

### For Super Admin

1. **Full Control**: Can bypass approval for direct edits
2. **Final Authority**: Handles escalated approvals
3. **System Overview**: Access to all requests and statistics

## Approval Workflow States

```
pending → approved → implemented
      ↘ rejected
      ↘ needs_revision → pending (resubmitted)
```

### State Descriptions

- **pending**: Awaiting approval at current level
- **approved**: Fully approved and ready for implementation
- **rejected**: Denied with comments
- **needs_revision**: Requires changes before resubmission
- **implemented**: Changes have been applied to live content

## Permission System

### Role-Based Access

```javascript
// In sidebar.jsx
{(user.role === "superAdmin" || 
  user.role === "principal" || 
  user.role?.endsWith("Hod") || 
  user.role === "teach_staff") && (
  <Link to="/content-approval">Content Approval</Link>
)}
```

### Department-Specific Access

HODs can only see/approve requests from their department:
- `compHod` → Computer Engineering requests
- `mechHod` → Mechanical Engineering requests
- etc.

## Configuration

### Approval Rules

Modify rules in `content_approval_rules` table:

```sql
-- Example: Make homepage changes require principal approval for HODs
UPDATE content_approval_rules 
SET requires_principal_approval = TRUE 
WHERE content_type = 'home_page' AND requester_role LIKE '%Hod';
```

### Department Hierarchy

Update department mappings in `department_hierarchy` table:

```sql
-- Example: Change escalation order
UPDATE department_hierarchy 
SET escalation_order = '["compHod", "principal", "superAdmin"]'
WHERE department = 'computer-engineering';
```

## Monitoring and Audit

### Audit Trail

All actions are logged in `content_change_history`:
- Who performed the action
- When it was performed  
- What action was taken
- Comments/reasoning

### Dashboard Statistics

Track system usage:
- Total requests by status
- Pending approvals by user role
- Average approval times
- Most active content types

## Notifications (Future Enhancement)

The system includes a notifications table for future implementation:
- Email notifications on approval/rejection
- In-app notification badges
- Escalation alerts for overdue approvals

## Security Considerations

1. **Session-Based Auth**: Uses existing session middleware
2. **Role Validation**: Server-side permission checks
3. **Input Sanitization**: Content is validated before storage
4. **Audit Logging**: All actions are tracked

## Troubleshooting

### Common Issues

1. **Approval not showing up**: Check user permissions and department mapping
2. **Direct edits not working**: Verify user role (should be superAdmin)
3. **Missing requests**: Check approval level requirements

### Debug Endpoints

```bash
# Check user's pending approvals
curl -X GET http://localhost:3663/api/content-approval/pending

# Get request details
curl -X GET http://localhost:3663/api/content-approval/123

# View approval history
curl -X GET http://localhost:3663/api/content-approval/123/history
```

## Future Enhancements

1. **Email Notifications**: Automatic email alerts for approval events
2. **Bulk Operations**: Approve/reject multiple requests at once
3. **Content Comparison**: Visual diff tool for changes
4. **Approval Templates**: Predefined approval workflows
5. **Auto-Escalation**: Automatic escalation for overdue approvals
6. **Content Scheduling**: Schedule approved content for future publication

## Migration from Existing System

To migrate existing components:

1. **Identify Content Types**: Map your forms to content types
2. **Update Components**: Wrap with ApprovalWrapper or modify manually
3. **Test Workflows**: Verify approval chains work correctly
4. **Train Users**: Educate staff on new approval process
5. **Monitor Usage**: Track adoption and adjust rules as needed

## Support

For issues or questions:
1. Check the audit logs in `content_change_history`
2. Verify approval rules in `content_approval_rules`
3. Test with different user roles
4. Review server logs for API errors

This system provides a robust foundation for content quality control while maintaining flexibility for different organizational needs. 