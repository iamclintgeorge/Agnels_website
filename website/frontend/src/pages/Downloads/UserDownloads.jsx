import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, FileText, Loader } from 'lucide-react';

const UserDownloads = () => {
  const [downloads, setDownloads] = useState({
    undergraduate: [],
    postgraduate: [],
    phd: [],
    other: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { value: 'undergraduate', label: 'Under Graduate / Common' },
    { value: 'postgraduate', label: 'Post Graduate' },
    { value: 'phd', label: 'PhD' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3663/api/downloads/downloads');
      const result = await response.json();
      if (result.success) {
        setDownloads(result.data);
      } else {
        setError('Failed to fetch downloads');
      }
    } catch (error) {
      console.error('Error fetching downloads:', error);
      setError('Error loading downloads');
    } finally {
      setLoading(false);
    }
  };

  const getPdfUrl = (pdfPath) => {
    if (!pdfPath) return "#";
    return pdfPath.startsWith("http")
      ? pdfPath
      : `http://localhost:3663${pdfPath}`;
  };

  const handleDownload = (download) => {
    if (download.pdf_url) {
      // Open PDF in new tab or download with proper URL formatting
      const pdfUrl = getPdfUrl(download.pdf_url);
      window.open(pdfUrl, '_blank');
    } else if (download.external_link) {
      // Open external link
      window.open(download.external_link, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader className="animate-spin" size={24} />
          <span>Loading downloads...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {categories.map(category => {
          const categoryDownloads = downloads[category.value] || [];
          
          // Only show categories that have downloads
          if (categoryDownloads.length === 0) return null;

          return (
            <div key={category.value} className="mb-12">
              {/* Category Header */}
              <div className="bg-white rounded-t-lg shadow-sm">
                <div className="px-6 py-4 border-b-4 border-blue-500">
                  <h2 className="text-2xl font-bold text-gray-800 text-center">
                    {category.label}
                  </h2>
                </div>
              </div>

              {/* Downloads List */}
              <div className="bg-white rounded-b-lg shadow-sm">
                <div className="divide-y divide-gray-100">
                  {categoryDownloads
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((download, index) => (
                    <div 
                      key={download.id} 
                      className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-gray-600">
                            {download.pdf_url && <FileText size={18} />}
                            {download.external_link && !download.pdf_url && <ExternalLink size={18} />}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {download.title}
                            </h3>
                            {download.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {download.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        <button
                          onClick={() => handleDownload(download)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors min-w-[120px] justify-center"
                          disabled={!download.pdf_url && !download.external_link}
                        >
                          <Download size={18} />
                          DOWNLOAD
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* No Downloads Message */}
        {Object.values(downloads).every(categoryDownloads => categoryDownloads.length === 0) && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Downloads Available</h3>
            <p className="text-gray-500">There are currently no downloads available. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDownloads;