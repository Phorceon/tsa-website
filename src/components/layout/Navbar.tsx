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

  const closeMobileMenu = () => setMobileOpen(false);

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

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      window.addEventListener('keydown', onEscape);
    }

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-surface focus:text-ink focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-6xl bg-black/85 border border-outline shadow-[0_20px_55px_rgba(0,0,0,0.32)]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0 group">
              <span className="font-outfit font-semibold text-ink text-[1.2rem] sm:text-[1.45rem] leading-none tracking-[-0.01em]">
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
                    className="relative px-2.5 py-2 text-[15px] font-semibold tracking-[0.01em] transition-colors duration-200"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={`relative z-10 ${isActive ? 'text-ink' : 'text-ink hover:text-ink'}`}>
                      {link.label}
                    </span>
                    {isActive && (
                      <span className="absolute left-2.5 right-2.5 -bottom-0.5 h-0.5 bg-surface" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href="tel:988"
                className="hidden sm:inline-flex items-center gap-2 border border-outline text-ink text-sm font-semibold px-4 py-2 hover:bg-surface hover:text-black transition-colors"
              >
                <Phone className="w-4 h-4" />
                Get Help
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 hover:bg-surface transition-colors text-ink"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-drawer"
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
          onClick={closeMobileMenu}
        />
        <div
          id="mobile-nav-drawer"
          className={`absolute right-0 top-0 h-[100dvh] w-80 max-w-[90vw] bg-surface border-l border-black/10  transform transition-transform duration-300 overflow-y-auto ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-black/10 bg-surface">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-neutral-700">Navigation</span>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-neutral-800" />
            </button>
          </div>
          <div className="p-5 pb-8 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`px-3 py-3 text-[1.02rem] font-semibold border-b border-black/10 transition-colors ${
                  location.pathname === link.path
                    ? 'text-neutral-950 bg-neutral-100 border-l-4 border-l-neutral-900'
                    : 'text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:988"
              onClick={closeMobileMenu}
              className="mt-5 flex items-center justify-center gap-2 bg-neutral-900 text-ink font-semibold px-4 py-3 hover:bg-black transition-colors"
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
