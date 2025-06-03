import React, { useState, useEffect } from "react";
import { aboutUsApi } from "../../services/apiService";

// Shared container component from aboutusContent.jsx
const SectionContainer = ({ title, subtitle, children }) => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Title & Subtitle */}
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-500 mt-2 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

/**
 * Dynamic section template that can be reused for different sections
 *
 * @param {Object} props - Component props
 * @param {string} props.sectionKey - The key for the section to fetch from the API
 * @param {Object} props.defaultContent - Default content structure
 * @param {Function} props.renderContent - Function that renders the content
 */
const DynamicSectionTemplate = ({
  sectionKey,
  defaultContent,
  renderContent,
  fallbackComponent = null,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(
    defaultContent || {
      title: sectionKey,
      subtitle: "",
    }
  );
  const [useDefault, setUseDefault] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        console.log(`Fetching content for section: ${sectionKey}`);

        const response = await aboutUsApi.getSection(sectionKey);
        console.log(`API Response for ${sectionKey}:`, response);

        // Check for empty or invalid response
        if (!response) {
          console.warn(`No response data for ${sectionKey}, using defaults`);
          setUseDefault(true);
          setLoading(false);
          return;
        }

        // Check specific response structure
        if (response.content && Object.keys(response.content).length > 0) {
          console.log(`Content found for ${sectionKey}:`, response.content);
          // Merge with default content to ensure all expected properties exist
          setContent({
            ...defaultContent,
            ...response.content,
          });
        } else {
          console.log(`No content found for ${sectionKey}, using defaults`);
          setUseDefault(true);
        }

        setLoading(false);
      } catch (err) {
        console.error(`Error fetching ${sectionKey} content:`, err);
        setError(
          `Failed to load ${sectionKey} content. Please try again later.`
        );
        setUseDefault(true);
        setLoading(false);

        // Log detailed error information
        if (err.response) {
          console.error(`Response status: ${err.response.status}`);
          console.error(`Response data:`, err.response.data);
        }
      }
    };

    fetchContent();
  }, [sectionKey, defaultContent]);

  // Show loading state
  if (loading) {
    return (
      <SectionContainer title={content.title} subtitle={content.subtitle}>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </SectionContainer>
    );
  }

  // Show error state with fallback content
  if (error && fallbackComponent) {
    console.log(`Error occurred for ${sectionKey}, using fallback component`);
    return fallbackComponent;
  }

  // Show error state without fallback
  if (error) {
    return (
      <SectionContainer title={content.title} subtitle={content.subtitle}>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </SectionContainer>
    );
  }

  // If we should use fallback component (empty content)
  if (useDefault && fallbackComponent) {
    console.log(
      `Using fallback component for ${sectionKey} due to empty/invalid content`
    );
    return fallbackComponent;
  }

  // Log the content being rendered
  console.log(`Rendering content for ${sectionKey}:`, content);

  // Render the section with the content
  return (
    <SectionContainer
      title={content.title || defaultContent.title || sectionKey}
      subtitle={content.subtitle || defaultContent.subtitle || ""}
    >
      {renderContent(content)}
    </SectionContainer>
  );
};

export default DynamicSectionTemplate;
