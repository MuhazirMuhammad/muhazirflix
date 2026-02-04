import { useLocation } from "react-router-dom";
const location = useLocation();
<Link to="/category/indonesian-movies" style={{ color: location.pathname.includes('indonesian-movies') ? 'var(--accent)' : 'white' }}>Movies</Link>

