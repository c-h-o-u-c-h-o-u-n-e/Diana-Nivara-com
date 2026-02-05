import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SubscribeSection from './components/SubscribeSection';
import EntryModal from './components/EntryModal';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import RatesPage from './pages/RatesPage';
import EssentialsPage from './pages/EssentialsPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import MobileLandingPage from './pages/MobileLandingPage';
import { useIsMobile } from './hooks/use-mobile';

function App() {
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(false);
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);
  const isMobileView = useIsMobile(825); // Check if screen width is 824px or less

  useEffect(() => {
    // Check sessionStorage for age gate acceptance
    const ageGateAccepted = sessionStorage.getItem('ageGateAccepted');
    
    if (ageGateAccepted === 'true') {
      setIsAgeVerified(true);
    }
    
    setIsCheckingSession(false);
  }, []);

  const handleAgeAccept = () => {
    setIsAgeVerified(true);
  };

  // Show entry modal if age not verified and session check is complete
  const showEntryModal = !isAgeVerified && !isCheckingSession;

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Entry Modal - Age Gate */}
        {showEntryModal && <EntryModal onAccept={handleAgeAccept} />}
        
        {/* Main Site Content - Only interactive after age verification */}
        <Header />

        {/* Global styles for anchor links */}
        <style>{`
          /* Adjust scroll position for anchor links to account for fixed header */
          html {
            scroll-padding-top: 100px; /* Slightly more than header height to add some spacing */
          }
        `}</style>
        
        <main className="flex-1">
          {isMobileView ? (
            // Mobile landing page for screens 824px and less
            <Routes>
              <Route path="/" element={<MobileLandingPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            // Regular routes for larger screens
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/rates" element={<RatesPage />} />
              <Route path="/essentials" element={<EssentialsPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>
        
        <SubscribeSection />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
