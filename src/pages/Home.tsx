'use client';

import { useEffect, useLayoutEffect, useRef, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { Building2, Heart, Link2, Rocket, Shield, AlertTriangle, ArrowRight, Users, Calendar, HandHeart } from 'lucide-react';
import { Sparkles } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import QuickAccessGrid from '@/components/cards/QuickAccessCard';
import EventCard from '@/components/cards/EventCard';
import { events } from '@/data/events';
import HeroScene from '@/components/3d/HeroScene';

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

  const businessOpacity = useTransform(scrollYProgress, [0.24, 0.3, 0.48, 0.56], [0, 1, 1, 0]);
  const businessY = useTransform(scrollYProgress, [0.24, 0.3, 0.48, 0.56], ['18%', '0%', '0%', '-18%']);

  const npoOpacity = useTransform(scrollYProgress, [0.52, 0.58, 0.76, 0.84], [0, 1, 1, 0]);
  const npoY = useTransform(scrollYProgress, [0.52, 0.58, 0.76, 0.84], ['18%', '0%', '0%', '-18%']);

  const servicesOpacity = useTransform(scrollYProgress, [0.8, 0.86, 0.99, 1], [0, 1, 1, 0]);
  const servicesY = useTransform(scrollYProgress, [0.8, 0.86, 0.99, 1], ['18%', '0%', '0%', '-18%']);

  return (
    <div ref={ref} className="relative h-[430vh] bg-navy-dark">
      
      {/* Sticky Container holding the Background and 3D Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Subtle gradient background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,rgba(74,144,217,0.24),transparent_30%),radial-gradient(circle_at_82%_58%,rgba(85,239,196,0.16),transparent_28%),linear-gradient(135deg,#061323_0%,#091d32_42%,#020713_100%)]" />
        
        {/* 3D Scrollytelling Scene */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas
            shadows="basic"
            dpr={[1, 1.75]}
            camera={{ position: [0.85, 2.05, 7.8], fov: 30, near: 0.1, far: 80 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          >
            <Suspense fallback={null}>
              <HeroScene scrollProgress={scrollYProgress} />
            </Suspense>
          </Canvas>
        </div>

        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,6,23,0.62)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-navy-dark to-transparent" />

        {/* HTML Text Overlays (Synchronized to Scroll) */}
        <div className="absolute inset-0 z-10 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section 1: Main Welcome */}
          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute max-w-3xl pointer-events-auto">
            <span className="inline-block px-4 py-2 bg-sky/20 border border-sky/40 rounded-full text-xs font-medium uppercase tracking-widest text-sky mb-6 backdrop-blur-sm">
              Welcome to Tracy
            </span>
            <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
              <span className="block">Your Community.</span>
              <span className="block text-sky">Your Resources.</span>
              <span className="block">Your Home.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-xl leading-relaxed">
              Connecting Tracy residents with local services, events, mental health support, and opportunities to give back.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link to="/resources" className="group relative px-8 py-4 bg-sky hover:bg-sky-light text-white rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(74,144,217,0.3)] hover:shadow-[0_0_30px_rgba(74,144,217,0.5)] hover:-translate-y-1 flex items-center overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Find Resources
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/events" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-semibold backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                Explore Events
              </Link>
            </div>
          </motion.div>

        {/* Section 2: Local Businesses */}
        <div className="absolute inset-0 flex items-center justify-end">
          <motion.div style={{ opacity: businessOpacity, y: businessY }} className="max-w-lg pointer-events-auto rounded-[2rem] border border-white/10 bg-slate-950/28 p-7 shadow-2xl shadow-black/20 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#4A90D9]/20 border border-[#4A90D9]/30 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-[#4A90D9]" />
              </div>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#4A90D9] to-transparent" />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Local Businesses
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6 max-w-md">
              Discover and support the shops, restaurants, and services that build the foundation of our community.
            </p>
            <Link to="/resources?category=business" className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A90D9]/20 hover:bg-[#4A90D9]/30 text-[#4A90D9] border border-[#4A90D9]/40 rounded-full font-semibold transition-all">
              View Directory <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Section 3: Non-Profits */}
        <div className="absolute inset-0 flex items-center justify-start">
          <motion.div style={{ opacity: npoOpacity, y: npoY }} className="max-w-lg pointer-events-auto rounded-[2rem] border border-white/10 bg-slate-950/28 p-7 shadow-2xl shadow-black/20 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#ff7675]/20 border border-[#ff7675]/30 flex items-center justify-center">
                <Heart className="w-7 h-7 text-[#ff7675]" />
              </div>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#ff7675] to-transparent" />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Non-Profit Organizations
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6 max-w-md">
              Connect with local charities, find volunteer opportunities, and make a real difference in Tracy.
            </p>
            <Link to="/resources?category=npo" className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff7675]/20 hover:bg-[#ff7675]/30 text-[#ff7675] border border-[#ff7675]/40 rounded-full font-semibold transition-all">
              Get Involved <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Section 4: City Services */}
        <div className="absolute inset-0 flex items-center justify-end">
          <motion.div style={{ opacity: servicesOpacity, y: servicesY }} className="max-w-lg pointer-events-auto rounded-[2rem] border border-white/10 bg-slate-950/28 p-7 shadow-2xl shadow-black/20 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#55efc4]/20 border border-[#55efc4]/30 flex items-center justify-center">
                <Shield className="w-7 h-7 text-[#55efc4]" />
              </div>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#55efc4] to-transparent" />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              City & Social Services
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6 max-w-md">
              Access critical support when you need it most. Mental health resources, city planning, and more.
            </p>
            <Link to="/resources?category=services" className="inline-flex items-center gap-2 px-6 py-3 bg-[#55efc4]/20 hover:bg-[#55efc4]/30 text-[#55efc4] border border-[#55efc4]/40 rounded-full font-semibold transition-all">
              Access Services <ArrowRight className="w-4 h-4" />
            </Link>
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
    <section ref={ref} className="py-24 bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
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
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-sky/50 transition-all hover:shadow-2xl hover:shadow-sky/20"
              >
                <div className="w-16 h-16 rounded-2xl bg-sky/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-sky" />
                </div>
                <p className="text-5xl font-bold text-white mb-2">
                  <AnimatedNumber value={stat.value} />
                </p>
                <p className="text-white/60 text-lg">{stat.label}</p>
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
      <div className="absolute inset-0 bg-gradient-to-b from-offwhite via-white to-offwhite" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky/30 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-sky/10 rounded-full text-xs font-medium uppercase tracking-widest text-sky mb-4">
            Explore the Center
          </span>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-navy mb-4">
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

function FeaturedEventSection() {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-lightgray via-white to-lightgray relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/event-tracy-earth-day.jpg"
                alt="Tracy Earth Day community event"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-sky text-white text-sm font-semibold rounded-full">
                  Featured Event
                </span>
              </div>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-sky rounded-2xl flex items-center justify-center shadow-xl"
            >
              <Calendar className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-navy mb-6">
              6th Annual Tracy Unity
            </h2>
            
            <div className="space-y-4 mb-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-textsecondary"
              >
                <div className="w-10 h-10 rounded-lg bg-sky/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-sky" />
                </div>
                <span className="text-lg">Saturday, September 19, 2026 • 9:00 AM – 3:00 PM</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 text-textsecondary"
              >
                <div className="w-10 h-10 rounded-lg bg-sky/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-sky" />
                </div>
                <span className="text-lg">Lincoln Park, Tracy</span>
              </motion.div>
            </div>
            
            <p className="text-lg text-textsecondary mb-8 leading-relaxed">
              Join us for Tracy's largest community resource fair. Theme: "Living Your Best Life in Tracy: Bridging the Digital Divide — Youth and Seniors." Connect with local nonprofits, discover volunteer opportunities, and enjoy family-friendly activities.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 bg-success text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 hover:scale-105 transition-all hover:shadow-xl hover:shadow-success/30"
              >
                RSVP Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 border-2 border-navy text-navy font-bold px-6 py-3 rounded-xl hover:bg-navy hover:text-white hover:scale-105 transition-all"
              >
                View All Events
              </Link>
            </div>
          </motion.div>
        </div>
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
    <section className="py-32 bg-navy relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky/20 via-navy to-navy" />
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
            className="w-20 h-20 rounded-full bg-sky/20 flex items-center justify-center mx-auto mb-8"
          >
            <Heart className="w-10 h-10 text-sky" />
          </motion.div>
          
          <blockquote className="font-playfair text-3xl md:text-5xl font-medium text-white mb-8 leading-relaxed italic drop-shadow-lg">
            "The Tracy Community Center exists to ensure every resident has access to the resources, connections, and support they need to thrive."
          </blockquote>
          
          <p className="text-white/50 text-lg mb-16">
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
                  className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4"
                >
                  <Icon className="w-8 h-8 text-sky" />
                </motion.div>
                <h3 className="font-semibold text-xl text-white mb-2">{pillar.title}</h3>
                <p className="text-white/60">{pillar.desc}</p>
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
      <div className="absolute inset-0 bg-gradient-to-b from-offwhite via-white to-offwhite" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-sky/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-sky/10 rounded-full text-xs font-medium uppercase tracking-widest text-sky mb-4">
            Upcoming Events
          </span>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-navy">
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
            className="inline-flex items-center gap-2 bg-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-navy-dark hover:scale-105 transition-all hover:shadow-2xl hover:shadow-navy/30"
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
      className="py-8 bg-gradient-to-r from-red-50 via-red-100 to-red-50 border-y-2 border-red-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertTriangle className="w-8 h-8 text-error" />
          </motion.div>
          <p className="text-navy">
            <span className="font-bold">Need immediate help?</span>{' '}
            Call <a href="tel:988" className="font-bold underline hover:text-sky transition-colors">988</a> or text <span className="font-bold">HOME</span> to <span className="font-bold">741741</span>
          </p>
          <Link
            to="/mental-health"
            className="font-medium text-navy hover:text-sky transition-colors flex items-center gap-1"
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
      <FeaturedEventSection />
      <MissionSection />
      <UpcomingEventsSection />
      <CrisisBanner />
    </main>
  );
}
