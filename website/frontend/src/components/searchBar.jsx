import React, { useState, useRef, useEffect } from "react";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Handle clicks outside to collapse the input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
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
    setTimeout(() => inputRef.current?.focus(), 0); // Ensure focus after animation
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
        className={`
        absolute right-12
        h-12
        outline-none
        bg-transparent
        placeholder:text-gray-400
        font-librefranklin text-[17px]
        transition-all duration-500 ease-in-out
        overflow-hidden
        ${
          isExpanded
            ? "w-64 pl-4 pr-10 text-[#CACACA] border-b-2 border-[#CACACA]"
            : "w-0 p-0 border-0"
        }
        `}
      />
      <button
        onClick={handleIconClick}
        className="w-12 h-12 flex items-center justify-center rounded-full text-white z-10"
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
    </div>
  );
};

export default SearchBar;
