import React, { useState, useEffect, useRef } from "react";

interface SearchableSelectProps {
  options: string[];
  selectedTopic: string;
  setSelectedTopic: React.Dispatch<React.SetStateAction<string>>;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  selectedTopic,
  setSelectedTopic,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !(inputRef.current as HTMLElement).contains(event.target as Node) &&
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const newFilteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(newFilteredOptions);
  }, [searchTerm, options]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setSelectedTopic(option);
    setSearchTerm(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mb-4">
      <div className="text-lg text-left mb-2">
        {selectedTopic
          ? `Jūsų pasirinkta tema: ${selectedTopic}`
          : "Dar nesate pasirinkę temos"}
      </div>
      <label className="input h-16 w-full rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
        <svg
          className="h-[1em] opacity-85"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>

        <input
          ref={inputRef}
          type="search"
          placeholder={
            selectedTopic ||
            "Paspauskite čia arba rašykite, kad surastumėte temą..."
          }
          className="px-2"
          onClick={() => setIsOpen(true)}
          onChange={(e) => handleInputChange(e)}
          value={searchTerm}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-chevron-down"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </label>
      {isOpen && filteredOptions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-base-100 shadow-lg rounded-box overflow-y-auto max-h-48"
        >
          {filteredOptions.map((option) => (
            <li key={option} className="">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-base-200 focus:outline-none animation-base"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
      {isOpen && filteredOptions.length === 0 && searchTerm && (
        <div className="absolute z-10 mt-1 w-full bg-base-100 shadow-lg rounded-box px-4 py-2">
          Tokių temų nėrasta
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
