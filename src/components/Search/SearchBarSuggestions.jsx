import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { products } from "../../../data/ProductDetailsData";
import { useDebounce } from "../../hooks/useDebounce";

const SearchWithSuggestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q") || "";

  const [value, setValue] = useState(queryParam);
  const debouncedValue = useDebounce(value, 300);
  const [suggestions, setSuggestions] = useState([]);

  // Filter products for suggestions
  useEffect(() => {
    if (!debouncedValue) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
      return;
    }

    const filtered = products
      .filter((p) =>
        p.name.toLowerCase().includes(debouncedValue.toLowerCase()),
      )
      .slice(0, 3); // max 3 suggestions

    setSuggestions(filtered);
  }, [debouncedValue]);

  const handleSelect = (product) => {
    navigate(`/product/${product.id}`);
    setValue("");
  };

  const handleSearch = () => {
    navigate(`/search/all?q=${value}`);
  };

  return (
    <div className="relative w-full 2xl:w-133">
      {/* Search Input */}
      <input
        type="search"
        placeholder="Search the desired product....."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          navigate(`/search/all?q=${e.target.value}`);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="w-full h-12 bg-light-gray focus:outline-none rounded-lg px-9 pl-12 appearance-none text-gray-600
         [&::-webkit-search-cancel-button]:hidden
         [&::-webkit-search-decoration]:hidden
         [&::-ms-clear]:hidden"
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            navigate("/search/all");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IoClose size={20} />
        </button>
      )}

      {/* Search Icon */}
      <img
        src="/path/to/Search.svg"
        alt="search"
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50"
        loading="lazy"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((p) => (
            <li
              key={p.id}
              onClick={() => handleSelect(p)}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                src={
                  p.image ||
                  `https://source.unsplash.com/60x60/?${encodeURIComponent(
                    p.name,
                  )}`
                }
                alt={p.name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <span className="text-gray-700">{p.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchWithSuggestions;
