'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

// Language switcher ko dynamic rakha hai taaki hydration issue na aaye
const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), { ssr: false });

export default function Header() {
  const params = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  // ✅ Simple Logic: URL se locale uthao, i18n hooks par depend mat raho
  const currentLang = params?.locale === 'hi' ? 'hi' : 'en';

  const navLinks = [
    { href: currentLang === 'hi' ? '/hi' : '/', label: { en: 'Home', hi: 'होम' } },
    { href: currentLang === 'hi' ? '/hi/free-kundali' : '/free-kundali', label: { en: 'Free-Kundali', hi: 'फ्री कुंडली' } },
    { href: currentLang === 'hi' ? '/hi/tools' : '/tools', label: { en: 'Astrology', hi: 'ज्योतिष टूल्स' } },
    { href: '/reports', label: { en: 'Reports', hi: 'रिपोर्ट्स' } },
    { href: currentLang === 'hi' ? '/hi/blogs' : '/blogs', label: { en: 'Blogs', hi: 'ब्लॉग्स' } },
    { href: currentLang === 'hi' ? '/hi/love' : '/love', label: { en: 'Match-Making', hi: 'कुंडली मिलान' } },
    { href: currentLang === 'hi' ? '/hi/contact' : '/contact', label: { en: 'Contact', hi: 'संपर्क' } },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchPath = currentLang === 'hi' ? '/hi/search' : '/search';
      window.location.href = `${searchPath}?query=${encodeURIComponent(query)}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0f0c29] px-4 py-3 z-50 shadow-md">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        
        <Link
          href={currentLang === 'hi' ? '/hi' : '/'}
          className="text-3xl font-bold text-white tracking-wide"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Jyotishasha
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <LanguageSwitcher />

          {!showSearch ? (
            <button onClick={() => setShowSearch(true)} className="text-white hover:text-purple-400 transition">
              <i className="fas fa-search text-lg"></i>
            </button>
          ) : (
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                autoFocus
                placeholder={currentLang === 'hi' ? 'खोजें...' : 'Search...'}
                className="px-4 py-1.5 rounded-full text-black w-40 md:w-56 text-sm outline-none border-2 border-purple-500/50 focus:border-purple-500"
              />
            </form>
          )}

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center gap-8 text-[17px] text-gray-200 mt-4">
        {navLinks.map((link, index) => (
          <Link key={index} href={link.href} className="hover:text-purple-400 transition-colors duration-300 font-medium">
            {link.label[currentLang]}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0f0c29]/95 p-5 flex flex-col gap-4 md:hidden">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} onClick={() => setMenuOpen(false)} className="text-lg border-b border-white/5 pb-2 text-white">
              {link.label[currentLang]}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}