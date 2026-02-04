import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <Link href="/" className="logo">MuhazirFlix</Link>
        <div className="desktop-menu flex gap-4">
          <Link href="/category/indonesian-movies">Movies</Link>
          <Link href="/category/indonesian-drama">Drama</Link>
          <Link href="/category/kdrama">K-Drama</Link>
          <Link href="/category/anime">Anime</Link>
        </div>
        <SearchBar />
        <FaBars className="mobile-menu-icon" onClick={() => setOpen(!open)} />
      </div>
      {open && (
        <div className="mobile-menu flex flex-col gap-2 mt-2">
          <Link href="/category/indonesian-movies">Movies</Link>
          <Link href="/category/indonesian-drama">Drama</Link>
          <Link href="/category/kdrama">K-Drama</Link>
          <Link href="/category/anime">Anime</Link>
        </div>
      )}
    </nav>
  );
}

