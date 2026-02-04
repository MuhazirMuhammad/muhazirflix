import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ContentGrid({ fetchData }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadItems();
  }, [page]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchData(page);
      setItems(prev => [...prev, ...data.items]);
      setHasMore(data.hasMore);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleScroll = () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading){
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="grid grid-4 grid-3 grid-2">
      {items.map(item => (
        <Link to={`/detail/${item.detailPath}`} key={item.id} style={{ background: 'var(--bg-card)', borderRadius:'0.5rem', overflow:'hidden' }}>
          <img src={item.poster} alt={item.title} />
          <div style={{ padding:'0.5rem' }}>
            <h3 style={{ margin:'0.5rem 0', fontSize:'1rem' }}>{item.title}</h3>
            <p style={{ fontSize:'0.8rem', color:'var(--text-muted)' }}>{item.genre} • {item.year}</p>
          </div>
        </Link>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

