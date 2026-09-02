import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

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

  const navClass = `navbar ${scrolled ? 'navbar--scrolled' : ''} ${isHome && !scrolled ? 'navbar--transparent' : ''}`;

  const links = [
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/explore', label: 'Destinations', icon: MapPin },
  ];

  return (
    <>
      <header className={navClass} role="banner">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo" aria-label="ESCAPE Home">
            ESCAPE
          </Link>

          <nav className="navbar__nav" aria-label="Main navigation">
            {links.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="navbar__actions">
            <Link to="/explore" className="btn btn--primary btn--sm navbar__cta">
              <span className="navbar__cta-text">Get Started</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileOpen ? 'mobile-nav--open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-nav__overlay" onClick={() => setMobileOpen(false)} />
        <div className="mobile-nav__panel">
          <div className="mobile-nav__header">
            <span className="navbar__logo">ESCAPE</span>
            <button
              className="mobile-nav__close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="mobile-nav__links" aria-label="Mobile navigation">
            <Link to="/" className={`mobile-nav__link ${location.pathname === '/' ? 'mobile-nav__link--active' : ''}`}>
              Home
            </Link>
            {links.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className={`mobile-nav__link ${location.pathname === link.to ? 'mobile-nav__link--active' : ''}`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: 'auto' }}>
            <Link
              to="/explore"
              className="btn btn--primary btn--lg"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={16} />
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
