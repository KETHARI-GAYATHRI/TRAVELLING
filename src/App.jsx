import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import DestinationPage from './pages/DestinationPage';
import { ArrowLeft } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <div className="not-found page-enter">
      <div>
        <p className="not-found__code">404</p>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__desc">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn--primary btn--lg">
          <ArrowLeft size={16} />
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isDestinationPage = location.pathname.startsWith('/destination/');

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/destination/:id" element={<DestinationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {!isDestinationPage && <ChatAssistant />}
    </div>
  );
}
