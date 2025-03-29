import React, { useState, useEffect, useRef } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "/") {
      setIsActive(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleClear = () => {
    setQuery("");
  };

  useEffect(() => {
    // Attach keydown event listener
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-[45vw]">
      <div className="group flex items-center relative mt-3">
        <svg
          className="absolute left-4 fill-gray-600 w-4 h-4"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </g>
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full h-9 font-inter pl-14 pr-12 text-gray-800 bg-gray-100 border-black rounded-sm outline-none transition duration-300 placeholder:text-gray-600"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute text-2xl right-5 text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        )}
        {!isActive && !query && (
          <div className="absolute text-sm right-3 font-thin text-[#3e3d3d] cursor-pointer border-2 border-[#959595] rounded-md px-3 py-1">
            /
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
