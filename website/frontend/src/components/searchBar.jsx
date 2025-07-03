import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // List of pages (routes) to search against
  const pages = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/aboutus" },
    { name: "Departments", path: "/departments" },
    { name: "Academics", path: "/academics" },
    { name: "Admissions", path: "/admissions" },
    { name: "Students Corner", path: "/studentCorner" },
    { name: "Downloads", path: "/downloads" },
    { name: "Important Links", path: "/Important-Links" },
    { name: "Circulars", path: "/circulars" },
    { name: "Computer Engineering", path: "/computer_engineering" },
    { name: "Mechanical Engineering", path: "/mechanical_engineering" },
    { name: "Electronics and Telecommunication Engineering", path: "/extc" },
    { name: "Electrical Engineering", path: "/electrical_engineering" },
    { name: "Basic Science and Humanities", path: "/humanities" },
  ];

  // Handle keydown events (ctrl + /, Enter, Escape)
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "/") {
      e.preventDefault();
      setIsExpanded(true);
      setIsActive(true);
      setTimeout(() => inputRef.current?.focus(), 0); // Ensure focus after animation
    }

    if (e.key === "Escape") {
      setQuery("");
      setIsActive(false);
      setIsExpanded(false);
      if (inputRef.current) inputRef.current.blur();
    }

    if (e.key === "Enter" && filteredResults.length > 0) {
      navigate(filteredResults[0].path);
      setQuery("");
      setIsActive(false);
      setIsExpanded(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsActive(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (query === "") {
        setIsActive(false);
        setIsExpanded(false);
      }
    }, 200);
  };

  // Filter pages based on the query
  useEffect(() => {
    if (query.trim()) {
      const results = pages.filter((page) =>
        page.name.toLowerCase().includes(query.toLowerCase().trim())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [query]);

  const handleResultClick = (path) => {
    navigate(path);
    setQuery("");
    setIsActive(false);
    setIsExpanded(false);
  };

  // Handle clicks outside to collapse the input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsExpanded(false);
        setIsActive(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
        setIsActive(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleIconClick = () => {
    setIsExpanded(true);
    setIsActive(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div
      ref={wrapperRef}
      className="flex items-center justify-end -mt-9 pb-3 pr-7 relative"
    >
      <input
        ref={inputRef}
        type="text"
        name="text"
        placeholder="search.."
        value={query}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setIsExpanded(true)}
        className={`
          absolute right-12 h-12 outline-none bg-transparent placeholder:text-gray-400 font-librefranklin text-[17px]
          transition-all duration-500 ease-in-out overflow-hidden
          ${
            isExpanded
              ? "w-64 pl-4 pr-10 text-[#CACACA] border-b-2 border-[#CACACA]"
              : "w-0 p-0 border-0"
          }
        `}
      />
      <button
        onClick={handleIconClick}
        className="w-12 h-12 items-center justify-center rounded-full text-white z-10 hidden xl:flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height="18px"
          width="18px"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            stroke="#fff"
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          />
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            stroke="#fff"
            d="M22 22L20 20"
          />
        </svg>
      </button>

      {isActive && filteredResults.length > 0 && (
        <div
          className="absolute z-20 w-72 bg-white border rounded-sm shadow-lg max-h-60 overflow-y-auto"
          style={{ top: "100%" }} // Ensures dropdown stays below the search input
        >
          {filteredResults.map((result, index) => (
            <div
              key={index}
              onMouseDown={() => handleResultClick(result.path)} // Use onMouseDown to handle click before blur
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 font-inter text-gray-800"
            >
              {result.name}
            </div>
          ))}
        </div>
      )}

      {isActive && query && filteredResults.length === 0 && (
        <div
          className="absolute z-20 w-72 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto"
          style={{ top: "100%" }} // Ensures dropdown stays below the search input
        >
          <div className="px-4 py-2 text-gray-500">No results found</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
