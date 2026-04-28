import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { lenisInstance } from '@/components/SmoothScroll';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
