'use client';
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), { ssr: false });

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(query)}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0f0c29] px-4 py-3 z-50 shadow-md">
  <div className="flex items-center justify-between w-full">
    {/* Logo */}
    <Link
      href="/"
      className="text-3xl font-bold text-white"
      style={{ fontFamily: 'Playfair Display, serif' }}
    >
      Jyotishasha
    </Link>

    {/* Right: Language + Search + Menu */}
    <div className="flex items-center gap-3 md:gap-6">
      {/* Language Switcher (Always visible) */}
      <LanguageSwitcher />

      {/* Search */}
      {!showSearch ? (
        <button onClick={() => setShowSearch(true)} className="text-white">
          <i className="fas fa-search text-lg"></i>
        </button>
      ) : (
        <form onSubmit={handleSearch} className="relative flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setShowSearch(false)}
            autoFocus
            placeholder="Search..."
            className="px-4 py-2 rounded-lg text-black w-44 md:w-52"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
      )}

      {/* Hamburger Menu */}
      <button
        className="md:hidden text-white text-xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>
  </div>

  {/* Desktop Nav */}
  <nav className="hidden md:flex justify-center gap-8 text-lg text-white mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
    <Link href="/">Home</Link>
    <Link href="/free-kundali">Free-Kudnali</Link>
    <Link href="/tools" suppressHydrationWarning>
      Astrology
    </Link>
    <Link href="/reports">Reports</Link>
    <Link href="/panchang">Panchang</Link>
    <Link href="/gemstone-consult" suppressHydrationWarning>
      Rashi by Name
    </Link>
    <Link href="/contact">Contact</Link>
  </nav>

  {/* Mobile Dropdown Menu */}
  {menuOpen && (
    <div className="bg-[#1e1b4b] rounded-b-lg p-4 flex flex-col gap-4 text-white md:hidden mt-2 z-40">
      <Link href="/" passHref>
        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Home</span>
      </Link>
      <Link href="/free-kundali" passHref>
        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Free-Kundali</span>
      </Link>
      <Link href="/tools" passHref suppressHydrationWarning>
        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Astrology</span>
      </Link>
      <Link href="/reports" passHref>
        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Reports</span>
      </Link>
      <Link href="/panchang" passHref>
        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Panchang</span>
      </Link>
      <Link href="/gemstone-consult" passHref suppressHydrationWarning>
        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Rashi by Name</span>
      </Link>
      <Link href="/contact" passHref>
        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Contact</span>
      </Link>
    </div>
  )}
</header>

  );
}
