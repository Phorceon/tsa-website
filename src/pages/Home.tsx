'use client';

import { useEffect, useLayoutEffect, useRef, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { Building2, Heart, Link2, Rocket, Shield, AlertTriangle, ArrowRight, Calendar, HandHeart } from 'lucide-react';
import { Sparkles } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import QuickAccessGrid from '@/components/cards/QuickAccessCard';
import EventCard from '@/components/cards/EventCard';
import { events } from '@/data/events';
import HeroScene from '@/components/3d/HeroScene';
import LiquidGlass from '@/components/ui/LiquidGlass';

gsap.registerPlugin(ScrollTrigger);

function AnimatedNumber({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { textContent: '0' },
        {
          textContent: value,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [value]);

  return <span ref={ref}>{value}{suffix}</span>;
}

function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [scrollBounds, setScrollBounds] = useState({ start: 0, end: 1 });

  useLayoutEffect(() => {
    const updateBounds = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const travel = Math.max(ref.current.offsetHeight - window.innerHeight, 1);

      setScrollBounds({
        start: top,
        end: top + travel,
      });
    };

    updateBounds();

    const resizeObserver = new ResizeObserver(() => updateBounds());
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    window.addEventListener('resize', updateBounds);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  const scrollYProgress = useTransform(
    scrollY,
    [scrollBounds.start, scrollBounds.end],
    [0, 1],
    { clamp: true }
  );

  // Calculate opacities for the different scrollytelling text blocks
  // Synced with the 3D camera rig in HeroScene.
  // 0.0 - 0.15: Main Hero Text
  // 0.2 - 0.4: Business Text
  // 0.4 - 0.6: NPO Text
  // 0.6 - 0.8: Services Text

  const heroOpacity = useTransform(scrollYProgress, [0, 0.18, 0.26], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.26], ['0%', '-22%']);

  const businessOpacity = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.5], [0, 1, 1, 0]);
  const businessY = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.5], ['18%', '0%', '0%', '-18%']);

  const npoOpacity = useTransform(scrollYProgress, [0.5, 0.56, 0.72, 0.78], [0, 1, 1, 0]);
  const npoY = useTransform(scrollYProgress, [0.5, 0.56, 0.72, 0.78], ['18%', '0%', '0%', '-18%']);

  const servicesOpacity = useTransform(scrollYProgress, [0.78, 0.84, 0.98, 1], [0, 1, 1, 0]);
  const servicesY = useTransform(scrollYProgress, [0.78, 0.84, 0.98, 1], ['18%', '0%', '0%', '-18%']);

  return (
    <div ref={ref} className="relative h-[430vh] bg-canvas">
      
      {/* Sticky Container holding the Background and 3D Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Dusk city atmosphere behind the scrollytelling Canvas */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,214,122,0.18),transparent_24%),radial-gradient(circle_at_74%_28%,rgba(74,144,217,0.28),transparent_32%),radial-gradient(circle_at_84%_68%,rgba(85,239,196,0.18),transparent_28%),linear-gradient(150deg,#06111f_0%,#10273b_38%,#180f28_68%,#020713_100%)]" />
        <div className="absolute inset-0 z-0 opacity-[0.18] bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.18)_42%,transparent_55%),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_100%,96px_96px,96px_96px]" />
        <div className="absolute inset-x-0 top-0 z-0 h-40 bg-surface ]" />
        
        {/* 3D Scrollytelling Scene */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas
            shadows="soft"
            dpr={[1, 1.75]}
            camera={{ position: [1.8, -0.5, 5.5], fov: 45, near: 0.1, far: 80 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          >
            <Suspense fallback={null}>
              <HeroScene scrollProgress={scrollYProgress} />
            </Suspense>
          </Canvas>
        </div>

        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,6,23,0.62)_100%)]" />

        {/* HTML Text Overlays (Synchronized to Scroll) */}
        <div className="absolute inset-0 z-10 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1: Main Welcome */}
          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute max-w-md pointer-events-auto">
            <span className="inline-block px-4 py-2 bg-surface border border-outline text-xs font-medium uppercase tracking-widest text-ink mb-6">
              Welcome to Tracy
            </span>
            <h1 className="font-black tracking-tighter uppercase text-3xl sm:text-[2.55rem] md:text-[3.05rem] lg:text-[3.45rem] font-bold text-ink mb-6 leading-[0.94] tracking-[-0.035em] drop-">
              <span className="block">Your Community.</span>
              <span className="block text-ink">Your Resources.</span>
              <span className="block">Your Home.</span>
            </h1>
            <p className="text-sm md:text-base text-ink mb-8 max-w-sm leading-relaxed">
              Connecting Tracy residents with local services, events, mental health support, and opportunities to give back.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link to="/resources" className="group relative px-8 py-4 bg-surface hover:bg-surface-light text-ink font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(74,144,217,0.3)] hover:shadow-[0_0_30px_rgba(74,144,217,0.5)] hover:-translate-y-0 flex items-center overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Find Resources
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/events" className="px-8 py-4 bg-surface hover:bg-surface text-ink border border-outline font-semibold transition-all duration-300 hover:-translate-y-0">
                Explore Events
              </Link>
            </div>
          </motion.div>

        {/* Section 2: Local Businesses */}
        <div className="absolute inset-0 flex items-start justify-end px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <motion.div style={{ opacity: businessOpacity, y: businessY }} className="max-w-lg pointer-events-auto">
            <LiquidGlass intensity="medium" className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 border border-white/[0.08] bg-white/[0.04] flex items-center justify-center">
                <Building2 className="w-7 h-7 text-ink" />
              </div>
              <div className="w-12 h-[1px] bg-white/[0.12]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-ink mb-4 uppercase tracking-tighter">
              Local Businesses
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-6 max-w-md font-mono">
              Discover and support the shops, restaurants, and services that build the foundation of our community.
            </p>
            <Link to="/resources?category=business" className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] hover:bg-white/[0.10] text-ink border border-white/[0.10] font-bold transition-all">
              View Directory <ArrowRight className="w-4 h-4" />
            </Link>
            </LiquidGlass>
          </motion.div>
        </div>

        {/* Section 3: Non-Profits */}
        <div className="absolute inset-0 flex items-start justify-start px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <motion.div style={{ opacity: npoOpacity, y: npoY }} className="max-w-lg pointer-events-auto">
            <LiquidGlass intensity="medium" className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 border border-white/[0.08] bg-white/[0.04] flex items-center justify-center">
                <Heart className="w-7 h-7 text-ink" />
              </div>
              <div className="w-12 h-[1px] bg-white/[0.12]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-ink mb-4 uppercase tracking-tighter">
              Non-Profit Organizations
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-6 max-w-md font-mono">
              Connect with local charities, find volunteer opportunities, and make a real difference in Tracy.
            </p>
            <Link to="/resources?category=npo" className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] hover:bg-white/[0.10] text-ink border border-white/[0.10] font-bold transition-all">
              Get Involved <ArrowRight className="w-4 h-4" />
            </Link>
            </LiquidGlass>
          </motion.div>
        </div>

        {/* Section 4: City Services */}
        <div className="absolute inset-0 flex items-start justify-end px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <motion.div style={{ opacity: servicesOpacity, y: servicesY }} className="max-w-lg pointer-events-auto">
            <LiquidGlass intensity="medium" className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 border border-white/[0.08] bg-white/[0.04] flex items-center justify-center">
                <Shield className="w-7 h-7 text-ink" />
              </div>
              <div className="w-12 h-[1px] bg-white/[0.12]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-ink mb-4 uppercase tracking-tighter">
              City & Social Services
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-6 max-w-md font-mono">
              Access critical support when you need it most. Mental health resources, city planning, and more.
            </p>
            <Link to="/resources?category=services" className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] hover:bg-white/[0.10] text-ink border border-white/[0.10] font-bold transition-all">
              Access Services <ArrowRight className="w-4 h-4" />
            </Link>
            </LiquidGlass>
          </motion.div>
        </div>

        </div>
      </div>
    </div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  
  const stats = [
    { icon: Building2, label: 'Resources', value: '50+' },
    { icon: Calendar, label: 'Upcoming Events', value: '12' },
    { icon: HandHeart, label: 'Volunteers', value: '200+' },
  ];

  return (
    <section ref={ref} className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
        <div className="absolute inset-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: false, alpha: true }}>
            <Sparkles count={100} scale={10} size={2} speed={0.3} color="#4A90D9" />
          </Canvas>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <LiquidGlass intensity="subtle" className="group p-8">
                <div className="w-16 h-16 bg-white/[0.04] flex items-center justify-center mb-5 group-hover:scale-100 transition-transform">
                  <Icon className="w-8 h-8 text-ink" />
                </div>
                <p className="text-5xl font-bold text-ink mb-2">
                  <AnimatedNumber value={stat.value} />
                </p>
                <p className="text-ink text-lg">{stat.label}</p>
                </LiquidGlass>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function QuickAccessSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute top-0 left-0 right-0 h-px bg-surface" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-surface" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-surface text-xs font-medium uppercase tracking-widest text-ink mb-4">
            Explore the Center
          </span>
          <h2 className="font-black tracking-tighter uppercase text-5xl md:text-6xl font-bold text-ink mb-4">
            Everything you need, all in one place
          </h2>
          <p className="text-xl text-textsecondary max-w-2xl mx-auto">
            Browse resources, find support, discover events, and get involved in your community.
          </p>
        </motion.div>
        
        <QuickAccessGrid />
      </div>
    </section>
  );
}

function MissionSection() {
  const pillars = [
    { icon: Link2, title: 'Connect', desc: 'Bridging residents to local services' },
    { icon: Shield, title: 'Support', desc: 'Mental health and crisis resources' },
    { icon: Rocket, title: 'Empower', desc: 'Programs that build skills and community' },
  ];

  return (
    <section className="py-32 bg-canvas relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 bg-surface flex items-center justify-center mx-auto mb-8"
          >
            <Heart className="w-10 h-10 text-ink" />
          </motion.div>
          
          <blockquote className="font-black tracking-tighter uppercase text-3xl md:text-5xl font-medium text-ink mb-8 leading-relaxed italic drop-">
            "The Tracy Community Center exists to ensure every resident has access to the resources, connections, and support they need to thrive."
          </blockquote>
          
          <p className="text-ink text-lg mb-16">
            — Tracy Community Center Mission
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-surface flex items-center justify-center mx-auto mb-4"
                >
                  <Icon className="w-8 h-8 text-ink" />
                </motion.div>
                <h3 className="font-semibold text-xl text-ink mb-2">{pillar.title}</h3>
                <p className="text-ink">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function UpcomingEventsSection() {
  const upcomingEvents = events.slice(0, 3);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-surface" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-surface text-xs font-medium uppercase tracking-widest text-ink mb-4">
            Upcoming Events
          </span>
          <h2 className="font-black tracking-tighter uppercase text-5xl md:text-6xl font-bold text-ink">
            Don't miss what's happening in Tracy
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, rotateX: 5 }}
            >
              <EventCard {...event} index={i} />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-canvas text-ink font-bold px-8 py-4 hover:bg-canvas hover:scale-100 transition-all hover: hover:shadow-sky/30"
          >
            View Full Calendar
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CrisisBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-8 bg-surface border-y-2 border-red-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertTriangle className="w-8 h-8 text-error" />
          </motion.div>
          <p className="text-ink">
            <span className="font-bold">Need immediate help?</span>{' '}
            Call <a href="tel:988" className="font-bold underline hover:text-ink transition-colors">988</a> or text <span className="font-bold">HOME</span> to <span className="font-bold">741741</span>
          </p>
          <Link
            to="/mental-health"
            className="font-medium text-ink hover:text-ink transition-colors flex items-center gap-1"
          >
            Mental Health Resources →
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  return (
    <main id="main-content">
      <ParallaxHero />
      <StatsSection />
      <QuickAccessSection />
      <MissionSection />
      <UpcomingEventsSection />
      <CrisisBanner />
    </main>
  );
}
