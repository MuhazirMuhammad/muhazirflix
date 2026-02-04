import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = debounce((q) => {
    if(q.trim()) navigate(`/search?q=${encodeURIComponent(q)}`);
  }, 500);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <input
      type="text"
      placeholder="Search movies, series..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        outline: 'none',
        background: '#1e1e1e',
        color: 'var(--text-light)'
      }}
    />
  );
}

