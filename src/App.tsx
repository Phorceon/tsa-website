import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import PageTransition from '@/components/PageTransition';
import ErrorBoundary from '@/components/ErrorBoundary';
import Home from '@/pages/Home';
import Resources from '@/pages/Resources';
import MentalHealth from '@/pages/MentalHealth';
import Events from '@/pages/Events';
import Volunteer from '@/pages/Volunteer';
import Programs from '@/pages/Programs';
import References from '@/pages/References';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/events" element={<Events />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/references" element={<References />} />
        </Routes>
      </PageTransition>
      <Footer />
    </>
  );
}