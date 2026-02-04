import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchContent } from "../api/api";
import ContentGrid from "../components/ContentGrid";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    searchContent(query)
      .then(res => setResults(res.items))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <h1>Search results for "{query}"</h1>
      {loading ? <LoadingSkeleton /> : results.length ? (
        <ContentGrid fetchData={() => Promise.resolve({ items: results, hasMore: false })} />
      ) : <p>No results found.</p>}
    </div>
  );
}

