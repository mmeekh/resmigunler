
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ExperienceBar from './components/ExperienceBar';
import FeedbackPanel from './components/FeedbackPanel';
import Home from './pages/Home';
import HolidaysList from './pages/HolidaysList';
import HolidayDetail from './pages/HolidayDetail';
import TatillerBlog from './pages/TatillerBlog';
import LeaveCalculatorPage from './pages/LeaveCalculatorPage';
import About from './pages/About';

// SEO & Title Updater
const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    let title = 'Resmi Günler - Tatil Hesaplayıcı';
    const path = location.pathname;

    if (path.startsWith('/calculator')) title = 'İzin Hesapla - Resmi Günler';
    else if (path.startsWith('/holidays')) title = 'Tüm Resmi Tatiller - 2024/2025';
    else if (path.startsWith('/holiday/')) title = 'Tatil Detayı ve Öneriler - Resmi Günler';
    else if (path.startsWith('/blog')) title = 'Tatiller Blogu: Net Cevaplar - Resmi Günler';
    else if (path.startsWith('/about')) title = 'Hakkında - Resmi Günler';

    document.title = title;
    // Reset scroll on route change
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

// Routes with Animation
// @ts-ignore
const AnimatedRoutes = ({ liteMode }: { liteMode: boolean }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home liteMode={liteMode} />} />
        <Route path="/holidays" element={<HolidaysList liteMode={liteMode} />} />
        <Route path="/holiday/:id" element={<HolidayDetail liteMode={liteMode} />} />
        <Route path="/blog" element={<TatillerBlog />} />
        <Route path="/calculator" element={<LeaveCalculatorPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home liteMode={liteMode} />} />
      </Routes>
    </AnimatePresence>
  );
};

const Layout = ({
  liteMode,
  setLiteMode,
  lowDataDetected,
  isOffline,
  pwaReady
}: {
  liteMode: boolean;
  setLiteMode: (m: boolean) => void;
  lowDataDetected: boolean;
  isOffline: boolean;
  pwaReady: boolean;
}) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <TitleUpdater />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-slate-900 px-4 py-2 rounded-md shadow z-50">İçeriğe atla</a>
      <Header />
      <ExperienceBar
        liteMode={liteMode}
        onToggleLite={setLiteMode}
        lowDataDetected={lowDataDetected}
        isOffline={isOffline}
        pwaReady={pwaReady}
      />
      <main id="main-content" className="flex-grow">
        <AnimatedRoutes liteMode={liteMode} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeedbackPanel context={location.pathname} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [pwaReady, setPwaReady] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const detectLowData = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection;
    return connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType);
  };

  const [liteMode, setLiteMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('liteMode');
    if (stored !== null) return stored === 'true';
    return Boolean(detectLowData());
  });
  const [lowDataDetected, setLowDataDetected] = useState<boolean>(detectLowData());

  useEffect(() => {
    localStorage.setItem('liteMode', String(liteMode));
  }, [liteMode]);

  useEffect(() => {
    const updateStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection;
    const handler = () => {
      const shouldSuggest = detectLowData();
      setLowDataDetected(Boolean(shouldSuggest));
      if (shouldSuggest) setLiteMode(true);
    };
    if (connection) {
      connection.addEventListener?.('change', handler);
      handler();
      return () => connection.removeEventListener?.('change', handler);
    }
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(() => setPwaReady(true)).catch(() => setPwaReady(false));
    }
  }, []);

  return (
    <Router>
      <Layout
        liteMode={liteMode}
        setLiteMode={setLiteMode}
        lowDataDetected={lowDataDetected}
        isOffline={isOffline}
        pwaReady={pwaReady}
      />
    </Router>
  );
};

export default App;
