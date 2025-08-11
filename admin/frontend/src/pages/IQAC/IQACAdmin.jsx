import React, { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import iqacService from "./services/iqacService";
import { toast } from "react-toastify";

const IQACAdmin = () => {
  const sectionsList = useMemo(
    () => [
      { key: "iqac_strategies", label: "Strategies" },
      { key: "iqac_functions", label: "Functions" },
      { key: "iqac_benefits", label: "Benefits" },
      { key: "iqac_coordinator", label: "Coordinator" },
      { key: "iqac_our_team", label: "Our Team" },
      { key: "iqac_initiatives", label: "Initiatives" },
    ],
    []
  );

  const [selectedKey, setSelectedKey] = useState(sectionsList[0].key);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await iqacService.getSection(selectedKey);
        const html = data?.content?.content ?? data?.content ?? "";
        setContent(html);
      } catch (e) {
        toast.error("Failed to load section");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedKey]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await iqacService.updateSection(selectedKey, { content });
      toast.success("Section saved");
    } catch (e) {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this section content? This cannot be undone.")) return;
    try {
      setLoading(true);
      await iqacService.deleteSection(selectedKey);
      setContent("");
      toast.success("Section deleted");
    } catch (e) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">IQAC Content Manager</h1>
      <div className="flex gap-4">
        <div className="w-64">
          <ul className="border rounded divide-y">
            {sectionsList.map((s) => (
              <li
                key={s.key}
                className={`p-3 cursor-pointer ${
                  selectedKey === s.key ? "bg-blue-50 font-medium" : ""
                }`}
                onClick={() => setSelectedKey(s.key)}
              >
                {s.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <ReactQuill value={content} onChange={setContent} theme="snow" />
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IQACAdmin;


