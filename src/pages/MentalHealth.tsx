'use client';

import { useState, useMemo, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone, MessageSquare, AlertTriangle, Play, Pause, RotateCcw, ChevronRight, Clock, BookOpen, Heart, Users } from 'lucide-react';
import { Sparkles } from '@react-three/drei';
import TherapistCard from '@/components/cards/TherapistCard';
import { therapists, therapistSpecialties, therapistInsurance, therapistLanguages, therapistFormats } from '@/data/therapists';
import MentalHealthScene from '@/components/3d/MentalHealthScene';

const crisisLines = [
  {
    name: '988 Suicide & Crisis Lifeline',
    contact: '988',
    type: 'call',
    description: 'Free, confidential, 24/7 support for people in distress.',
    color: 'border-l-error',
    bgColor: 'bg-red-50',
  },
  {
    name: 'Crisis Text Line',
    contact: 'HOME',
    number: '741741',
    type: 'text',
    description: 'Text HOME to 741741 for free, 24/7 crisis counseling.',
    color: 'border-l-sky',
    bgColor: 'bg-sky/10',
  },
  {
    name: 'San Joaquin County Crisis',
    contact: '209-468-8686',
    type: 'call',
    description: 'Local crisis support and intervention, 24/7.',
    color: 'border-l-success',
    bgColor: 'bg-green-50',
  },
];

const articles = [
  { title: 'Understanding Anxiety', desc: 'Recognize symptoms and find coping strategies that work.', readTime: '3 min', icon: BookOpen },
  { title: 'Supporting a Loved One', desc: 'How to help someone who is struggling with their mental health.', readTime: '4 min', icon: Heart },
  { title: 'Teen Mental Health', desc: 'Warning signs and resources specifically for adolescents and families.', readTime: '5 min', icon: Users },
  { title: 'When to Seek Help', desc: 'Guidelines on when professional support is the right next step.', readTime: '3 min', icon: Clock },
];

function BreathingExercise({ type, title, description }: { type: 'box' | '478'; title: string; description: string }) {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [timer, setTimer] = useState(type === 'box' ? 240 : 0);

  const phases = type === 'box'
    ? ['Inhale', 'Hold', 'Exhale', 'Hold']
    : ['Inhale', 'Hold', 'Exhale'];

  const reset = () => {
    setIsRunning(false);
    setPhase(0);
    setTimer(type === 'box' ? 240 : 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl border border-border p-8 shadow-xl hover:shadow-2xl transition-shadow"
    >
      <h3 className="text-2xl font-bold text-navy mb-2">{title}</h3>
      <p className="text-textsecondary mb-6">{description}</p>

      <div className="flex flex-col items-center mb-6">
        <motion.div
          animate={isRunning ? {
            scale: type === 'box' ? [1, 1.5, 1.5, 1, 1] : [1, 1.5, 1.5, 1],
          } : { scale: 1 }}
          transition={{ duration: type === 'box' ? 16 : 19, repeat: Infinity, ease: 'linear' }}
          className="relative w-40 h-40 flex items-center justify-center mb-4"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky/30 to-navy/30" />
          <motion.div
            animate={{ 
              scale: isRunning ? [1, 1.2, 1.2, 1, 1] : 1 
            }}
            transition={{ duration: type === 'box' ? 16 : 19, repeat: Infinity, ease: 'linear' }}
            className="w-28 h-28 rounded-full bg-gradient-to-br from-sky to-navy flex items-center justify-center shadow-xl"
          >
            <span className="text-2xl font-bold text-white">
              {phases[phase % phases.length]}
            </span>
          </motion.div>
        </motion.div>

        <div className="flex items-center gap-4 text-sm text-textsecondary">
          {phases.map((p, i) => (
            <motion.span
              key={p}
              animate={{ 
                color: isRunning && i === phase % phases.length ? '#1E4D8C' : '#6B7280',
                scale: isRunning && i === phase % phases.length ? 1.1 : 1
              }}
              className="font-medium"
            >
              {p} {type === 'box' ? '4s' : i === 0 ? '4s' : i === 1 ? '7s' : '8s'}
            </motion.span>
          ))}
        </div>
      </div>

      {type === 'box' && (
        <div className="text-center mb-4">
          <span className="text-3xl font-mono font-bold text-navy">{formatTime(timer)}</span>
        </div>
      )}

      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsRunning(!isRunning)}
          className="inline-flex items-center gap-2 bg-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-dark transition-colors shadow-lg hover:shadow-xl"
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isRunning ? 'Pause' : 'Start'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="inline-flex items-center gap-2 border-2 border-navy text-navy font-bold px-6 py-3 rounded-xl hover:bg-navy hover:text-white transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function MentalHealth() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [insuranceFilter, setInsuranceFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [formatFilter, setFormatFilter] = useState('All');

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const filteredTherapists = useMemo(() => {
    return therapists.filter((t) => {
      const matchSpecialty = specialtyFilter === 'All' || t.specialties.includes(specialtyFilter);
      const matchInsurance = insuranceFilter === 'All' || t.insurance.includes(insuranceFilter);
      const matchLanguage = languageFilter === 'All' || t.languages.includes(languageFilter);
      const matchFormat = formatFilter === 'All' || t.format.some(f => {
        if (formatFilter === 'In-person') return f === 'In-person';
        if (formatFilter === 'Telehealth') return f === 'Telehealth';
        return true;
      });
      return matchSpecialty && matchInsurance && matchLanguage && matchFormat;
    });
  }, [specialtyFilter, insuranceFilter, languageFilter, formatFilter]);

  return (
    <main id="main-content">
      <motion.section 
        ref={heroRef}
        style={{ y, opacity }}
        className="relative min-h-[80vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} color="#DC2626" />
              <MentalHealthScene />
              <Sparkles count={100} scale={10} size={2} speed={0.3} color="#4A90D9" />
            </Suspense>
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-sky/20 border border-sky/40 rounded-full text-xs font-medium uppercase tracking-widest text-sky mb-4"
            >
              Mental Health
            </motion.span>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              You Are Not Alone
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl">
              Tracy residents have access to crisis support, professional care, and self-guided wellness tools.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-red-50 via-red-100 to-red-50 border-y-4 border-red-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <AlertTriangle className="w-10 h-10 text-error" />
            </motion.div>
            <h2 className="text-3xl font-bold text-error">Crisis Support Available 24/7</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {crisisLines.map((line, i) => (
              <motion.div
                key={line.name}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -10, rotateY: 5 }}
                className={`bg-white rounded-2xl p-8 border-l-4 ${line.color} shadow-xl hover:shadow-2xl transition-all`}
              >
                <h3 className="font-bold text-xl text-navy mb-3">{line.name}</h3>
                {line.type === 'call' ? (
                  <a href={`tel:${line.contact.replace(/-/g, '')}`} className="text-4xl font-bold text-error hover:underline block mb-3">
                    {line.contact}
                  </a>
                ) : (
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-sky">Text {line.contact}</span>
                    <span className="text-lg text-textsecondary"> to </span>
                    <span className="text-3xl font-bold text-sky">{line.number}</span>
                  </div>
                )}
                <p className="text-textsecondary mb-4">{line.description}</p>
                {line.type === 'call' && (
                  <a
                    href={`tel:${line.contact.replace(/-/g, '')}`}
                    className="inline-flex items-center gap-2 bg-error text-white font-bold px-5 py-3 rounded-xl hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                )}
                {line.type === 'text' && (
                  <a
                    href={`sms:${line.number}?body=${line.contact}`}
                    className="inline-flex items-center gap-2 bg-sky text-white font-bold px-5 py-3 rounded-xl hover:bg-sky/90 transition-colors shadow-lg hover:shadow-xl"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Text Now
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="py-20 bg-gradient-to-b from-offwhite via-white to-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-sky/10 rounded-full text-xs font-medium uppercase tracking-widest text-sky mb-4">
              Find a Therapist
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Filter by specialty, insurance, language, and format
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Specialty', value: specialtyFilter, setter: setSpecialtyFilter, options: therapistSpecialties },
                { label: 'Insurance', value: insuranceFilter, setter: setInsuranceFilter, options: therapistInsurance },
                { label: 'Language', value: languageFilter, setter: setLanguageFilter, options: therapistLanguages },
                { label: 'Format', value: formatFilter, setter: setFormatFilter, options: therapistFormats },
              ].map((filter, i) => (
                <motion.div
                  key={filter.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <label className="text-sm font-semibold text-textsecondary uppercase tracking-wider mb-2 block">{filter.label}</label>
                  <select
                    value={filter.value}
                    onChange={(e) => filter.setter(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all"
                  >
                    {filter.options.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTherapists.map((therapist, i) => (
              <motion.div
                key={therapist.id}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, rotateX: 3 }}
              >
                <TherapistCard
                  name={therapist.name}
                  credentials={therapist.credentials}
                  specialties={therapist.specialties}
                  insurance={therapist.insurance}
                  languages={therapist.languages}
                  format={therapist.format}
                  acceptingNew={therapist.acceptingNew}
                  phone={therapist.phone}
                  website={therapist.website}
                  address={therapist.address}
                  index={i}
                />
              </motion.div>
            ))}
          </div>

          {filteredTherapists.length === 0 && (
            <div className="text-center py-12">
              <p className="text-textsecondary">No therapists match your filters. Try adjusting your criteria.</p>
            </div>
          )}

          <p className="text-xs text-textsecondary mt-8 text-center">
            This directory is for informational purposes. Please contact providers directly to verify insurance and availability.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-lightgray via-white to-lightgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-sky/10 rounded-full text-xs font-medium uppercase tracking-widest text-sky mb-4">
              Self-Care Tools
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Guided breathing exercises to reduce stress and anxiety
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <BreathingExercise
              type="box"
              title="Box Breathing"
              description="Breathe in for 4 seconds, hold for 4, out for 4, hold for 4. Repeat. A proven technique used by athletes and first responders."
            />
            <BreathingExercise
              type="478"
              title="4-7-8 Breathing"
              description="Inhale for 4, hold for 7, exhale for 8. Promotes deep relaxation and can help with sleep and anxiety relief."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-offwhite via-white to-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-sky/10 rounded-full text-xs font-medium uppercase tracking-widest text-sky mb-4">
              Learn More
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
              Short, accessible articles on common mental health topics
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {articles.map((article, i) => {
              const Icon = article.icon;
              return (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10, rotateX: 5 }}
                  className="bg-white rounded-2xl border border-border p-6 shadow-lg hover:shadow-2xl transition-all"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl bg-sky/10 flex items-center justify-center mb-4"
                  >
                    <Icon className="w-7 h-7 text-sky" />
                  </motion.div>
                  <h3 className="font-bold text-lg text-navy mb-2">{article.title}</h3>
                  <p className="text-textsecondary mb-4">{article.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-textsecondary">{article.readTime} read</span>
                    <button className="text-sky font-semibold hover:underline flex items-center gap-1">
                      Read More <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}