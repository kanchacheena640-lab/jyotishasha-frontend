'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { Search, Menu, X, ChevronDown } from 'lucide-react';

const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), { ssr: false });

type NavLink = {
  type: 'link';
  href: string;
  label: { en: string; hi: string };
};

type NavDropdown = {
  type: 'dropdown';
  key: string;
  href: string;
  label: { en: string; hi: string };
  items: Array<{ href: string; label: { en: string; hi: string } }>;
};

type NavItem = NavLink | NavDropdown;

export default function Header() {
  const params = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentLang = params?.locale === 'hi' ? 'hi' : 'en';
  const lp = currentLang === 'hi' ? '/hi' : '';
  const holiYear = new Date().getFullYear();

  const navItems: NavItem[] = [
    { type: 'link', href: currentLang === 'hi' ? '/hi' : '/', label: { en: 'Home', hi: 'होम' } },
    { type: 'link', href: `${lp}/panchang`, label: { en: 'Panchang', hi: 'पंचांग' } },
    {
      type: 'dropdown',
      key: 'learn',
      href: `${lp}/learn-astrology`,
      label: { en: 'Learn Astrology', hi: 'ज्योतिष सीखें' },
      items: [
        { href: `${lp}/planet-in-house`, label: { en: 'Planet in House', hi: 'भावों में ग्रह' } },
        { href: `${lp}/retrograde-planets`, label: { en: 'Retrograde Planets', hi: 'वक्री ग्रह' } },
        { href: `${lp}/nakshatra`, label: { en: 'Nakshatra', hi: 'नक्षत्र' } },
        { href: `${lp}/vedic-panchang`, label: { en: 'Vedic Panchang', hi: 'वैदिक पंचांग' } },
      ],
    },
    {
      type: 'dropdown',
      key: 'vrat',
      href: `${lp}/vrat-tyohar`,
      label: { en: 'Vrat & Tyohar', hi: 'व्रत और त्योहार' },
      items: [
        { href: `${lp}/ekadashi`, label: { en: 'Ekadashi', hi: 'एकादशी' } },
        { href: `${lp}/navratri`, label: { en: 'Navratri', hi: 'नवरात्रि' } },
        { href: `${lp}/holi/${holiYear}`, label: { en: 'Holi', hi: 'होली' } },
      ],
    },
    { type: 'link', href: `${lp}/tools`, label: { en: 'Tools', hi: 'ज्योतिष टूल्स' } },
    { type: 'link', href: `${lp}/blogs`, label: { en: 'Blogs', hi: 'ब्लॉग्स' } },
    { type: 'link', href: '/reports', label: { en: 'Reports', hi: 'रिपोर्ट्स' } },
  ];

  // Cancel any pending close and open the given dropdown immediately
  const openItem = (key: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(key);
  };

  // Schedule close with a short delay so the cursor can travel from trigger to panel
  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

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
              <Search size={20} />
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
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex justify-center gap-8 text-[17px] text-gray-200 mt-4"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-purple-400 transition-colors duration-300 font-medium"
              >
                {item.label[currentLang]}
              </Link>
            );
          }
          return (
            // Wrap label + chevron + panel in one hover zone; moving between them won't close the dropdown
            <div
              key={item.key}
              className="relative flex items-center"
              onMouseEnter={() => openItem(item.key)}
              onMouseLeave={scheduleClose}
            >
              {/* Clicking the label navigates to the hub page */}
              <Link
                href={item.href}
                className="hover:text-purple-400 transition-colors duration-300 font-medium"
              >
                {item.label[currentLang]}
              </Link>

              {/* Clicking the chevron toggles the dropdown */}
              <button
                className="ml-1 hover:text-purple-400 transition-colors duration-300 p-0.5"
                onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                aria-expanded={openDropdown === item.key}
                aria-haspopup="true"
                aria-label={`Toggle ${item.label[currentLang]} submenu`}
              >
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${openDropdown === item.key ? 'rotate-180' : ''}`}
                />
              </button>

              {openDropdown === item.key && (
                // Panel re-enters the hover zone — keeps dropdown alive as cursor travels the gap
                <div
                  className="absolute top-full left-0 mt-2 min-w-48 bg-[#1a1744] border border-purple-900/50 rounded-xl shadow-xl py-2 z-50"
                  onMouseEnter={() => openItem(item.key)}
                  onMouseLeave={scheduleClose}
                >
                  {item.items.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2.5 text-sm text-gray-200 hover:text-purple-300 hover:bg-white/5 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {sub.label[currentLang]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0f0c29]/95 p-5 flex flex-col gap-4 md:hidden">
          {navItems.map((item) => {
            if (item.type === 'link') {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg border-b border-white/5 pb-2 text-white"
                >
                  {item.label[currentLang]}
                </Link>
              );
            }
            const isOpen = openDropdown === item.key;
            return (
              <div key={item.key} className="border-b border-white/5 pb-2">
                <div className="flex items-center justify-between">
                  {/* Tapping the label navigates to the hub page */}
                  <Link
                    href={item.href}
                    className="text-lg text-white flex-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label[currentLang]}
                  </Link>
                  {/* Tapping the chevron expands sub-items inline */}
                  <button
                    className="text-white p-1"
                    onClick={() => setOpenDropdown(isOpen ? null : item.key)}
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? 'Close' : 'Open'} ${item.label[currentLang]} submenu`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                {isOpen && (
                  <div className="mt-3 pl-3 flex flex-col gap-3">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="text-base text-purple-300 hover:text-purple-200 transition-colors"
                        onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}
                      >
                        {sub.label[currentLang]}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
