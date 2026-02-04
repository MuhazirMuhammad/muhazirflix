import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Category from "./pages/Category";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:detailPath" element={<Detail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </Router>
  );
}
