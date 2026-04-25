'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ScrollySectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ScrollySection({ children, className = '', id }: ScrollySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
      
      elements?.forEach((el, i) => {
        gsap.fromTo(el, 
          { 
            opacity: 0, 
            y: 100,
            scale: 0.9,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  );
}