import axios from "axios";

/**
 * Submits a content approval request to the backend.
 * @param {Object} data - The approval request data.
 * @param {string} data.title - Title of the request (e.g., 'Edit About Us').
 * @param {string} data.content_type - Type of content (e.g., 'about_us').
 * @param {string} data.section - Section identifier (e.g., 'main', 'vision').
 * @param {string} data.change_summary - Short summary of the change.
 * @param {string} data.proposed_content - The new/edited content (HTML or text).
 * @returns {Promise}
 */
export const submitApprovalRequest = async (data) => {
  return axios.post("http://localhost:3663/api/content-approval/submit", data, {
    withCredentials: true,
  });
};
