import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../../services/useAuthCheck";
import ApprovalWrapper from "../../components/ApprovalWrapper";
import { toast } from "react-hot-toast";

const ComHodWithApproval = () => {
  const { user } = useAuth();
  const [hodText, setHodText] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const quillRef = useRef(null);

  // Check if user has permission to edit (compHod role or superAdmin)
  const canEdit = user && (user.role === "compHod" || user.role === "superAdmin");
  const canDirectEdit = user && user.role === "superAdmin";
  const requiresApproval = user && user.role !== "superAdmin";

  useEffect(() => {
    fetchText();
  }, []);

  useEffect(() => {
    // Add custom tab handling when in edit mode
    if (!editMode || !quillRef.current) return;

    const handleTab = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        if (range) {
          const tabSpaces = "\u00A0\u00A0\u00A0\u00A0";
          quill.insertText(range.index, tabSpaces);
          quill.setSelection(range.index + 4);
        }
      }
    };

    const timer = setTimeout(() => {
      const quillEditor = quillRef.current?.getEditor();
      if (quillEditor) {
        const editorContainer = quillEditor.container;
        editorContainer.addEventListener("keydown", handleTab);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      const quillEditor = quillRef.current?.getEditor();
      if (quillEditor) {
        const editorContainer = quillEditor.container;
        editorContainer.removeEventListener("keydown", handleTab);
      }
    };
  }, [editMode]);

  useEffect(() => {
    if (editMode && hodText.length > 0 && hodText[0].Content) {
      const contentWithSpaces = hodText[0].Content.replace(
        /\t/g,
        "\u00A0\u00A0\u00A0\u00A0"
      );
      setContent(contentWithSpaces);
    }
  }, [editMode, hodText]);

  const fetchText = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/hod-desk/computer"
      );
      console.log("Fetched Computer HOD Text:", response.data);
      setHodText(response.data);
      if (response.data.length > 0 && response.data[0].id) {
        setContent(response.data[0].Content);
      } else {
        console.warn("No valid id or content in fetched data:", response.data);
        setMessage("No valid text entry found.");
      }
    } catch (err) {
      console.error("Error loading Computer HOD text:", err);
      setMessage("Error fetching Computer HOD text.");
    }
  };

  // Direct update for superAdmin (bypasses approval)
  const handleDirectUpdate = async () => {
    console.log("hodText before update:", hodText);
    if (!hodText.length || !hodText[0]?.id) {
      setMessage("No valid text entry to update.");
      console.error("Invalid hodText data:", hodText);
      return;
    }

    const id = hodText[0].id;
    console.log("Updating with id:", id);
    try {
      const contentForStorage = content.replace(/\u00A0{4}/g, "\t");

      await axios.put(`http://localhost:3663/api/hod-desk/computer/${id}`, {
        content: contentForStorage,
      });
      setMessage("Computer HOD text updated successfully!");
      setEditMode(false);
      fetchText();
      toast.success("HOD Desk content updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Error updating Computer HOD text.");
      toast.error("Failed to update HOD Desk content.");
    }
  };

  // Approval callback handler
  const handleApprovalSubmit = (approvedContent, requestId) => {
    setEditMode(false);
    setContent(hodText[0]?.Content || "");
    setMessage("");
    
    if (requestId) {
      toast.success(
        `Your changes have been submitted for approval (Request #${requestId}). You will be notified when reviewed.`,
        { duration: 5000 }
      );
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "size",
    "font",
    "align",
    "link",
  ];

  const ContentEditor = ({ onSubmitForApproval, requiresApproval }) => (
    <div>
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        className="mb-4"
      />

      <div className="flex gap-4">
        {requiresApproval ? (
          <button
            onClick={() => {
              const contentForStorage = content.replace(/\u00A0{4}/g, "\t");
              onSubmitForApproval(contentForStorage);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          >
            Submit for Approval
          </button>
        ) : (
          <button
            onClick={handleDirectUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Directly
          </button>
        )}
        
        <button
          onClick={() => {
            setEditMode(false);
            setContent(hodText[0]?.Content || "");
            setMessage("");
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
      
      {message && <p className="mt-2 text-green-600">{message}</p>}
      
      {requiresApproval && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Your changes will be submitted for approval before going live. 
            The approval process typically involves review by the Principal and/or Super Admin.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4">
      <style jsx>{`
        .ql-editor {
          font-family: "Courier New", monospace;
          line-height: 1.6;
        }

        .preview-content {
          white-space: pre-wrap;
          font-family: "Courier New", monospace;
          line-height: 1.6;
        }

        .ql-editor,
        .preview-content {
          word-spacing: normal;
        }
      `}</style>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Computer Engineering - HOD Desk</h2>
        {requiresApproval && (
          <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
            <span className="font-medium">Quality Control Active:</span> Changes require approval
          </div>
        )}
      </div>

      {hodText.length > 0 ? (
        editMode ? (
          <ApprovalWrapper
            contentType="hod_desk"
            section="comHod"
            currentContent={hodText[0]?.Content || ""}
            onApprovalSubmit={handleApprovalSubmit}
            title="Computer Engineering HOD Desk Content"
            requiresApproval={requiresApproval}
          >
            <ContentEditor />
          </ApprovalWrapper>
        ) : (
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: hodText[0].Content }}
              className="mb-4 preview-content border border-gray-200 rounded-lg p-4"
            />
            {canEdit && (
              <div className="flex gap-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Edit HOD Desk
                </button>
                
                {requiresApproval && (
                  <a
                    href="/content-approval"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
                  >
                    View My Requests
                  </a>
                )}
              </div>
            )}
          </div>
        )
      ) : (
        <div>
          <p className="text-gray-600 mb-4">No Computer HOD text available.</p>
          {canEdit && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create HOD Desk Content
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ComHodWithApproval; 