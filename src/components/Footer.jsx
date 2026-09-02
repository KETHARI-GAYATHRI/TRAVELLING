import { Link } from 'react-router-dom';
import { MapPin, Mail, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div>
            <Link to="/" className="navbar__logo" style={{ color: 'white', fontSize: '1.5rem' }}>
              ESCAPE
            </Link>
            <p className="footer__brand-desc">
              Discover extraordinary destinations, real-time weather, and AI-powered travel itineraries. Your premium travel companion.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="footer__heading">Explore</h4>
            <div className="footer__links">
              <Link to="/explore" className="footer__link">All Destinations</Link>
              <Link to="/explore" className="footer__link">Popular Places</Link>
              <Link to="/explore" className="footer__link">Travel Tips</Link>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="footer__heading">Popular</h4>
            <div className="footer__links">
              <Link to="/destination/paris" className="footer__link">Paris</Link>
              <Link to="/destination/tokyo" className="footer__link">Tokyo</Link>
              <Link to="/destination/santorini" className="footer__link">Santorini</Link>
              <Link to="/destination/new-york" className="footer__link">New York</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer__heading">Connect</h4>
            <div className="footer__links">
              <a href="mailto:hello@escape.travel" className="footer__link">
                <Mail size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Contact Us
              </a>
              <a href="#" className="footer__link">
                <MapPin size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Find Us
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} ESCAPE. Crafted for travel enthusiasts.
          </p>
          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="#" className="footer__social-link" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="#" className="footer__social-link" aria-label="GitHub">
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
