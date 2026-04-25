import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/resources', label: 'Resources' },
  { path: '/mental-health', label: 'Mental Health' },
  { path: '/events', label: 'Events' },
  { path: '/volunteer', label: 'Volunteer' },
  { path: '/programs', label: 'Programs' },
  { path: '/references', label: 'References' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-navy focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-full bg-sky/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-sky font-playfair font-bold text-lg">TC</span>
              </div>
              <span className="font-playfair font-semibold text-white hidden sm:inline text-lg tracking-wide">
                Tracy Center
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={`relative z-10 ${isActive ? 'text-navy' : 'text-white group-hover:text-sky'}`}>
                      {link.label}
                    </span>
                    {isActive && (
                      <span className="absolute inset-0 bg-white rounded-full shadow-sm -z-0" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href="tel:988"
                className="hidden sm:inline-flex items-center gap-2 bg-sky text-navy text-sm font-semibold px-4 py-2 rounded-full hover:bg-white hover:scale-105 transition-all shadow-lg shadow-sky/20"
              >
                <Phone className="w-4 h-4" />
                Get Help
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold text-navy">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-navy" />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-navy-light text-navy'
                    : 'text-navy hover:bg-gray-50'
                }`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:988"
              className="mt-4 flex items-center justify-center gap-2 bg-sky text-navy font-semibold px-4 py-3 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              Get Help Now — 988
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
