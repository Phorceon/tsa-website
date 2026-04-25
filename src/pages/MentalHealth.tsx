import { useState, useMemo, useEffect, useRef } from 'react';
import { Phone, MessageSquare, AlertTriangle, Play, Pause, RotateCcw, ChevronRight, Clock, BookOpen, Heart, Users } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import TherapistCard from '@/components/cards/TherapistCard';
import { therapists, therapistSpecialties, therapistInsurance, therapistLanguages, therapistFormats } from '@/data/therapists';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phases = type === 'box'
    ? ['Inhale', 'Hold', 'Exhale', 'Hold']
    : ['Inhale', 'Hold', 'Exhale'];

  const phaseDuration = type === 'box' ? 4 : 1;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setPhase(p => (p + 1) % phases.length);
        if (type === 'box') {
          setTimer(t => Math.max(0, t - phaseDuration));
        }
      }, phaseDuration * 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, type, phases.length, phaseDuration]);

  const reset = () => {
    setIsRunning(false);
    setPhase(0);
    setTimer(type === 'box' ? 240 : 0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-navy mb-1">{title}</h3>
      <p className="text-sm text-textsecondary mb-6">{description}</p>

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
          <div
            className={`absolute inset-0 rounded-full bg-navy-light transition-transform duration-1000 ${
              isRunning ? (type === 'box' ? 'animate-breathe-box' : 'animate-breathe-478') : ''
            }`}
            style={!isRunning ? { transform: 'scale(1)' } : undefined}
          />
          <div className="relative z-10 w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="text-2xl font-bold text-navy">
              {phases[phase]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-textsecondary">
          {phases.map((p, i) => (
            <span key={p} className={i === phase && isRunning ? 'text-navy font-semibold' : ''}>
              {p} {type === 'box' ? '4s' : i === 0 ? '4s' : i === 1 ? '7s' : '8s'}
            </span>
          ))}
        </div>
      </div>

      {type === 'box' && (
        <div className="text-center mb-4">
          <span className="text-lg font-mono text-navy">{formatTime(timer)}</span>
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-dark transition-colors"
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 border border-navy text-navy font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-light transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}

export default function MentalHealth() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal<HTMLDivElement>(0.05);

  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [insuranceFilter, setInsuranceFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [formatFilter, setFormatFilter] = useState('All');

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
      {/* Page Header */}
      <section className="relative bg-navy py-20 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/mental-health-hero.jpg"
            alt="Peaceful garden scene"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className={`reveal ${headerRevealed ? 'revealed' : ''}`}>
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-sky mb-3">
              Mental Health
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              You Are Not Alone
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Tracy residents have access to crisis support, professional care, and self-guided wellness tools.
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Hotlines */}
      <section className="bg-red-50 border-y-2 border-red-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <AlertTriangle className="w-8 h-8 text-error" />
            <h2 className="text-2xl font-bold text-error">Crisis Support Available 24/7</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crisisLines.map((line) => (
              <div key={line.name} className={`bg-white rounded-lg p-6 border-l-4 ${line.color} shadow-sm`}>
                <h3 className="font-semibold text-navy mb-2">{line.name}</h3>
                {line.type === 'call' ? (
                  <a href={`tel:${line.contact.replace(/-/g, '')}`} className="text-2xl font-bold text-error hover:underline block mb-2">
                    {line.contact}
                  </a>
                ) : (
                  <div className="mb-2">
                    <span className="text-lg font-bold text-sky">Text {line.contact}</span>
                    <span className="text-lg text-textsecondary"> to </span>
                    <span className="text-2xl font-bold text-sky">{line.number}</span>
                  </div>
                )}
                <p className="text-sm text-textsecondary">{line.description}</p>
                {line.type === 'call' && (
                  <a
                    href={`tel:${line.contact.replace(/-/g, '')}`}
                    className="inline-flex items-center gap-2 mt-3 bg-error text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                )}
                {line.type === 'text' && (
                  <a
                    href={`sms:${line.number}?body=${line.contact}`}
                    className="inline-flex items-center gap-2 mt-3 bg-sky text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-sky/90 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Text Now
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapist Finder */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Find a Therapist"
            title="Filter by specialty, insurance, language, and format"
          />
          <div className="mt-8 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-medium text-textsecondary uppercase tracking-wider mb-2 block">Specialty</label>
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky"
                >
                  {therapistSpecialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-textsecondary uppercase tracking-wider mb-2 block">Insurance</label>
                <select
                  value={insuranceFilter}
                  onChange={(e) => setInsuranceFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky"
                >
                  {therapistInsurance.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-textsecondary uppercase tracking-wider mb-2 block">Language</label>
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky"
                >
                  {therapistLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-textsecondary uppercase tracking-wider mb-2 block">Format</label>
                <select
                  value={formatFilter}
                  onChange={(e) => setFormatFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky"
                >
                  {therapistFormats.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTherapists.map((therapist, i) => (
              <TherapistCard
                key={therapist.id}
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

      {/* Breathing Exercises */}
      <section className="py-20 bg-lightgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Self-Care Tools"
            title="Guided breathing exercises to reduce stress and anxiety"
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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

      {/* Informational Articles */}
      <section className="py-16 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Learn More"
            title="Short, accessible articles on common mental health topics"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => {
              const Icon = article.icon;
              return (
                <div
                  key={article.title}
                  className="bg-white rounded-lg border border-border p-5 card-hover"
                >
                  <Icon className="w-8 h-8 text-sky mb-3" />
                  <h3 className="font-semibold text-navy mb-2">{article.title}</h3>
                  <p className="text-sm text-textsecondary mb-3">{article.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-textsecondary">{article.readTime} read</span>
                    <button className="text-sm text-sky font-medium hover:underline flex items-center gap-1">
                      Read More <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}