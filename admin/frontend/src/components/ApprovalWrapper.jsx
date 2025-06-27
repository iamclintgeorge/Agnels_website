import React, { useState } from "react";
import axios from "axios";
import { AlertCircle, Send, Clock } from "lucide-react";
import { toast } from "react-hot-toast";

const ApprovalWrapper = ({ 
  children, 
  contentType, 
  section, 
  currentContent = "", 
  onApprovalSubmit,
  title,
  requiresApproval = true 
}) => {
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [changeSummary, setChangeSummary] = useState("");
  const [submittingApproval, setSubmittingApproval] = useState(false);
  const [proposedContent, setProposedContent] = useState("");

  const handleSubmitForApproval = async (content, changeType = "update") => {
    if (!requiresApproval) {
      // If no approval required, submit directly
      if (onApprovalSubmit) {
        onApprovalSubmit(content);
      }
      return;
    }

    setProposedContent(content);
    setShowApprovalModal(true);
  };

  const submitApprovalRequest = async () => {
    if (!changeSummary.trim()) {
      toast.error("Please provide a summary of changes");
      return;
    }

    try {
      setSubmittingApproval(true);
      
      const approvalData = {
        contentType,
        section,
        title: title || `${contentType} - ${section}`,
        currentContent,
        proposedContent,
        changeType: currentContent ? "update" : "create",
        changeSummary
      };

      const response = await axios.post(
        "http://localhost:3663/api/content-approval",
        approvalData,
        { withCredentials: true }
      );

      toast.success("Content submitted for approval successfully!");
      setShowApprovalModal(false);
      setChangeSummary("");
      
      // Callback to parent component
      if (onApprovalSubmit) {
        onApprovalSubmit(proposedContent, response.data.requestId);
      }
      
    } catch (error) {
      console.error("Error submitting for approval:", error);
      toast.error("Failed to submit for approval");
    } finally {
      setSubmittingApproval(false);
    }
  };

  // Clone children and inject the approval submission handler
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onSubmitForApproval: handleSubmitForApproval,
        requiresApproval
      });
    }
    return child;
  });

  return (
    <>
      {enhancedChildren}

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-yellow-600" size={24} />
              <h2 className="text-xl font-semibold">Submit for Approval</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Content Type:</strong> {contentType}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Section:</strong> {section}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary of Changes *
                </label>
                <textarea
                  value={changeSummary}
                  onChange={(e) => setChangeSummary(e.target.value)}
                  placeholder="Please describe the changes you've made and why they're necessary..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="text-blue-600 mt-0.5" size={16} />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800">Approval Process</p>
                    <p className="text-blue-700">
                      Your changes will be reviewed by the appropriate approvers 
                      (HOD → Principal → Super Admin as required) before going live.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={submittingApproval}
                >
                  Cancel
                </button>
                <button
                  onClick={submitApprovalRequest}
                  disabled={submittingApproval || !changeSummary.trim()}
                  className={`px-4 py-2 text-white rounded-md flex items-center gap-2 ${
                    submittingApproval || !changeSummary.trim()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {submittingApproval ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit for Approval
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApprovalWrapper; 