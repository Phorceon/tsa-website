import { Link } from 'react-router-dom';
import { Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/resources', label: 'Community Resources' },
  { path: '/mental-health', label: 'Mental Health' },
  { path: '/events', label: 'Events' },
  { path: '/volunteer', label: 'Volunteer' },
  { path: '/programs', label: 'Programs' },
  { path: '/references', label: 'References' },
];

export default function Footer() {
  return (
    <footer className="bg-canvas text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Col 1: About & Contact */}
          <div>
            <div className="mb-4">
              <span className="font-semibold text-ink">Tracy Community Center</span>
            </div>
            <p className="text-ink text-sm leading-relaxed mb-5">
              Connecting Tracy residents to resources, events, and community support. 
              A central hub for all ages and backgrounds.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5 text-ink">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-ink" />
                <span>Tracy, California 95376</span>
              </div>
              <div className="flex items-center gap-2.5 text-ink">
                <Phone className="w-4 h-4 shrink-0 text-ink" />
                <a href="tel:209-831-6200" className="hover:text-ink transition-colors">209-831-6200</a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-ink mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ink text-sm hover:text-ink hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div>
            <h3 className="font-semibold text-ink mb-4 text-sm uppercase tracking-wider">Connect With Us</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-surface flex items-center justify-center hover:bg-surface transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-surface flex items-center justify-center hover:bg-surface transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-surface flex items-center justify-center hover:bg-surface transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <p className="text-ink text-xs mb-3">
              Subscribe for weekly updates on events and resources.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing!');
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-surface border border-outline px-3 py-2 text-sm text-ink placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sky"
                required
              />
              <button
                type="submit"
                className="bg-surface text-ink font-semibold px-4 py-2 text-sm hover:bg-surface transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-outline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink text-xs text-center sm:text-left">
            &copy; 2026 Tracy Community Center. Built for the TSA Webmaster Competition.
          </p>
          <div className="flex items-center gap-4 text-xs text-ink">
            <Link to="/references" className="hover:text-ink transition-colors">References</Link>
            <span className="text-ink">|</span>
            <a href="#" className="hover:text-ink transition-colors">Privacy</a>
            <span className="text-ink">|</span>
            <a href="#" className="hover:text-ink transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
