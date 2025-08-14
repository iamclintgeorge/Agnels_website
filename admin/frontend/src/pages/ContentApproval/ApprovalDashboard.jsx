import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  FileText,
  Users,
  X,
  MessageSquare,
  Loader2,
} from "lucide-react";
import axios from "axios"; // Added axios import

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
  const [actionLoading, setActionLoading] = useState(false);
  const [comments, setComments] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Toast notification function
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3663/api/content-approval/pending",
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log("API Response:", data);

      if (data.success && Array.isArray(data.requests)) {
        setPendingRequests(data.requests);

        // Calculate stats from the data
        const requests = data.requests;
        const newStats = {
          pendingApprovals: requests.filter((r) => r.status === "Pending")
            .length,
          totalRequests: requests.length,
          approvedRequests: requests.filter((r) => r.status === "Approved")
            .length,
          rejectedRequests: requests.filter((r) => r.status === "rejected")
            .length,
          needsRevision: requests.filter((r) => r.status === "needs_revision")
            .length,
        };
        setStats(newStats);
      } else {
        setPendingRequests([]);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      showToast("Failed to load dashboard data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleViewRequest = (requestId) => {
    try {
      const request = pendingRequests.find((req) => req.id === requestId);
      if (request) {
        setSelectedRequest(request);
        setModalOpen(true);
      } else {
        showToast("Request not found", "error");
      }
    } catch (error) {
      console.error("Error fetching request details:", error);
      showToast("Failed to load request details", "error");
    }
  };

  const handleApprovalAction = async (requestId, req_roleId) => {
    try {
      setActionLoading(true);
      const response = await axios.post(
        `http://localhost:3663/api/content-approval/${requestId}/approve`,
        { slaveId: req_roleId },
        {
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        showToast(`Request approved successfully`, "success");
        setModalOpen(false);
        setComments("");
        setShowCommentInput(false);
        setPendingAction(null);
        fetchDashboardData();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error approving request:`, error);
      showToast(`Failed to Approve request`, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectAction = async (requestId, req_roleId) => {
    try {
      setActionLoading(true);
      const response = await axios.put(
        `http://localhost:3663/api/content-approval/${requestId}/reject`,
        { slaveId: req_roleId },
        {
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        showToast(`Request rejected successfully`, "error");
        setModalOpen(false);
        setComments("");
        setShowCommentInput(false);
        setPendingAction(null);
        setPendingRequests((prev) =>
          prev.filter((req) => req.id !== requestId)
        );
        fetchDashboardData();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error Reject request:`, error);
      showToast(`Failed to Reject request`, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleActionClick = (action, requestId) => {
    if (action === "approve") {
      handleApprovalAction(requestId);
    } else {
      setPendingAction({ action, requestId });
      setShowCommentInput(true);
    }
  };

  const handleCommentSubmit = () => {
    if (pendingAction) {
      handleApprovalAction(pendingAction.requestId);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
    setComments("");
    setShowCommentInput(false);
    setPendingAction(null);
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

    const badge = badges[status.toLowerCase()] || badges.pending;
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

  const RequestCard = ({ request, showActions = false, onCardClick }) => (
    <div
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onCardClick(request.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {request.title}
          </h3>

          {request.change_summary && (
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Change Summary:</span>{" "}
              {request.change_summary}
            </p>
          )}

          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Created:</span>{" "}
            {new Date(request.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Section:</span> {request.section}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Requested By:</span>{" "}
            {request.req_username}
          </p>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {getStatusBadge(request.status)}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCardClick(request.id);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            disabled={actionLoading}
          >
            {actionLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Eye size={16} />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">Request ID: {request.id}</div>
        {showActions && request.status.toLowerCase() === "pending" && (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleApprovalAction(request.id, request.req_roleId);
              }}
              disabled={actionLoading}
              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50"
            >
              Approve
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleActionClick("revision", request.id);
              }}
              disabled={actionLoading}
              className="px-3 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700 disabled:opacity-50"
            >
              Request Revision
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRejectAction(request.id, request.req_roleId);
              }}
              disabled={actionLoading}
              className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const ViewRequestModal = ({ request, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-4/5 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {request.title}
            </h2>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Change Summary:</span>{" "}
                {request.change_summary}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Created:</span>{" "}
                {new Date(request.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Section:</span> {request.section}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Requested By:</span>{" "}
                {request.req_username}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span>{" "}
                {getStatusBadge(request.status)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle size={24} />
          </button>
        </div>

        {/* Content Comparison */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Current Content
            </h3>
            <div
              className="p-4 border border-gray-200 rounded-md bg-gray-50 max-h-64 overflow-y-auto"
              dangerouslySetInnerHTML={{
                __html: request.current_content,
              }}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Proposed Content
            </h3>
            <div
              className="p-4 border border-gray-200 rounded-md bg-blue-50 max-h-64 overflow-y-auto"
              dangerouslySetInnerHTML={{
                __html: request.proposed_content,
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-2">
          {request.status.toLowerCase() === "pending" && (
            <>
              <button
                onClick={() =>
                  handleApprovalAction(request.id, request.req_roleId)
                }
                disabled={actionLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                {actionLoading && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                Approve
              </button>
              <button
                onClick={() => handleActionClick("revision", request.id)}
                disabled={actionLoading}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 flex items-center gap-2"
              >
                Request Revision
              </button>
              <button
                onClick={() =>
                  handleRejectAction(request.id, request.req_roleId)
                }
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
              >
                Reject
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Toast Component
  const Toast = ({ show, message, type }) => {
    if (!show) return null;

    const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
    const icon =
      type === "error" ? <XCircle size={16} /> : <CheckCircle size={16} />;

    return (
      <div
        className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2`}
      >
        {icon}
        {message}
      </div>
    );
  };

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

        {/* Request Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedTab("pending")}
            className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors ${
              selectedTab === "pending"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setSelectedTab("my-requests")}
            className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors ${
              selectedTab === "my-requests"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            My Requests
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 size={32} className="animate-spin text-blue-500" />
          </div>
        )}

        {/* Requests List */}
        {!loading && (
          <div className="space-y-4">
            {selectedTab === "pending" &&
              Array.isArray(pendingRequests) &&
              pendingRequests.length > 0 &&
              pendingRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  showActions={true}
                  onCardClick={handleViewRequest}
                />
              ))}

            {selectedTab === "pending" && pendingRequests.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No pending approvals
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  All caught up! No requests waiting for your approval.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Request Details */}
      {modalOpen && selectedRequest && (
        <ViewRequestModal request={selectedRequest} onClose={closeModal} />
      )}

      {/* Toast Notifications */}
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
};

export default ApprovalDashboard;
