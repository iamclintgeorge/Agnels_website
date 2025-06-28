import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import { toast } from "react-hot-toast";

const ApprovalDashboard = () => {
  const [stats, setStats] = useState({
    pendingApprovals: 0,
    totalRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    needsRevision: 0,
  });
  const [pendingRequests, setPendingRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [selectedTab, setSelectedTab] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, pendingRes, myRequestsRes] = await Promise.all([
        axios.get("http://localhost:3663/api/content-approval/stats", {
          withCredentials: true,
        }),
        axios.get("http://localhost:3663/api/content-approval/pending", {
          withCredentials: true,
        }),
        axios.get("http://localhost:3663/api/content-approval/my-requests", {
          withCredentials: true,
        }),
      ]);

      setStats(statsRes.data.stats);
      setPendingRequests(pendingRes.data.requests);
      setMyRequests(myRequestsRes.data.requests);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleViewRequest = async (requestId) => {
    try {
      const response = await axios.get(
        `http://localhost:3663/api/content-approval/${requestId}`,
        { withCredentials: true }
      );
      setSelectedRequest(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching request details:", error);
      toast.error("Failed to load request details");
    }
  };

  const handleApprovalAction = async (requestId, action, comments = "") => {
    try {
      await axios.post(
        `http://localhost:3663/api/content-approval/${requestId}/${action}`,
        { comments },
        { withCredentials: true }
      );

      toast.success(`Request ${action}d successfully`);
      setModalOpen(false);
      fetchDashboardData();
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
      toast.error(`Failed to ${action} request`);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock size={14} />,
      },
      approved: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle size={14} />,
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle size={14} />,
      },
      needs_revision: {
        color: "bg-orange-100 text-orange-800",
        icon: <AlertCircle size={14} />,
      },
    };

    const badge = badges[status] || badges.pending;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}
      >
        {badge.icon}
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
    </div>
  );

  const RequestCard = ({ request, showActions = false }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {request.title}
          </h3>
          <p className="text-sm text-gray-600">
            {request.content_type.replace("_", " ").toUpperCase()} •{" "}
            {request.section}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            By {request.requester_name} • {new Date(request.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(request.status)}
          <button
            onClick={() => handleViewRequest(request.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {request.change_summary && (
        <p className="text-sm text-gray-700 mb-4">{request.change_summary}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Level {request.approval_level} of {request.required_approval_level}
        </div>
        {showActions && request.status === "pending" && (
          <div className="flex gap-2">
            <button
              onClick={() => handleApprovalAction(request.id, "approve")}
              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={() => handleApprovalAction(request.id, "revision", "Please revise")}
              className="px-3 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700"
            >
              Request Revision
            </button>
            <button
              onClick={() => handleApprovalAction(request.id, "reject", "Request rejected")}
              className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Content Approval Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and review content approval requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            icon={<Clock size={24} />}
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard
            title="Total Requests"
            value={stats.totalRequests || 0}
            icon={<FileText size={24} />}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard
            title="Approved"
            value={stats.approvedRequests || 0}
            icon={<CheckCircle size={24} />}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            title="Needs Revision"
            value={stats.needsRevision || 0}
            icon={<AlertCircle size={24} />}
            color="bg-orange-100 text-orange-600"
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab("pending")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "pending"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Users className="inline mr-2" size={16} />
                Pending Approvals ({stats.pendingApprovals})
              </button>
              <button
                onClick={() => setSelectedTab("my-requests")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === "my-requests"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FileText className="inline mr-2" size={16} />
                My Requests ({myRequests.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {selectedTab === "pending" && (
            <>
              <h2 className="text-xl font-semibold text-gray-900">
                Requests Pending Your Approval
              </h2>
              {pendingRequests.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No pending approvals
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    All caught up! No requests waiting for your approval.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      showActions={true}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {selectedTab === "my-requests" && (
            <>
              <h2 className="text-xl font-semibold text-gray-900">
                My Approval Requests
              </h2>
              {myRequests.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No requests found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't submitted any approval requests yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myRequests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Request Details Modal */}
      {modalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Request Details</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900">
                  {selectedRequest.request.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedRequest.request.content_type} • {selectedRequest.request.section}
                </p>
              </div>

              {selectedRequest.request.change_summary && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Summary of Changes</h4>
                  <p className="text-sm text-gray-700">{selectedRequest.request.change_summary}</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Current Content</h4>
                  <div className="bg-gray-50 p-3 rounded border max-h-60 overflow-y-auto">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: selectedRequest.request.current_content || "No current content" 
                      }} 
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Proposed Content</h4>
                  <div className="bg-blue-50 p-3 rounded border max-h-60 overflow-y-auto">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: selectedRequest.request.proposed_content 
                      }} 
                    />
                  </div>
                </div>
              </div>

              {selectedRequest.history && selectedRequest.history.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Approval History</h4>
                  <div className="space-y-2">
                    {selectedRequest.history.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{entry.action}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            by {entry.userName} ({entry.performer_role})
                          </span>
                          {entry.comments && (
                            <p className="text-sm text-gray-700 mt-1">{entry.comments}</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(entry.action_timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalDashboard; 