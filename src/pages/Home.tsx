import { Link } from 'react-router-dom';
import { Building2, Heart, Link2, Rocket, Shield, AlertTriangle, ArrowRight, Users, Calendar, HandHeart } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import QuickAccessGrid from '@/components/cards/QuickAccessCard';
import EventCard from '@/components/cards/EventCard';
import { events } from '@/data/events';

export default function Home() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal<HTMLDivElement>(0.05);
  const { ref: missionRef, isRevealed: missionRevealed } = useScrollReveal<HTMLDivElement>();
  const { ref: statsRef, isRevealed: statsRevealed } = useScrollReveal<HTMLDivElement>();

  const upcomingEvents = events.slice(0, 3);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-home.jpg"
            alt="Aerial view of Tracy, California"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-dark/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div
            ref={heroRef}
            className={`reveal ${heroRevealed ? 'revealed' : ''} max-w-2xl`}
          >
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-sky mb-4">
              Welcome to Tracy
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Community.<br />Your Resources.<br />Your Home.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              Connecting Tracy residents with local services, events, mental health support, and opportunities to give back.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 bg-sky text-navy font-semibold px-6 py-3 rounded-lg hover:bg-sky/90 transition-colors"
              >
                Find Resources
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Explore Events
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className={`reveal reveal-delay-3 ${statsRevealed ? 'revealed' : ''} grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-2xl`}
          >
            {[
              { icon: Building2, label: 'Resources', value: '50+' },
              { icon: Calendar, label: 'Upcoming Events', value: '12' },
              { icon: HandHeart, label: 'Volunteers', value: '200+' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`reveal reveal-delay-${i + 1} ${statsRevealed ? 'revealed' : ''} bg-white rounded-lg p-4 flex items-center gap-3`}
                >
                  <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center">
                    <Icon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-navy">{stat.value}</p>
                    <p className="text-xs text-textsecondary">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionHeader
              eyebrow="Explore the Center"
              title="Everything you need, all in one place"
              subtitle="Browse resources, find support, discover events, and get involved in your community."
            />
          </div>
          <QuickAccessGrid />
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-20 bg-lightgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/images/event-tracy-earth-day.jpg"
                alt="Tracy Earth Day community event"
                className="w-full h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div>
              <span className="inline-block text-xs font-medium uppercase tracking-widest text-sky mb-3">
                Featured Event
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                6th Annual Tracy Connects
              </h2>
              <div className="space-y-2 text-textsecondary mb-4">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky" />
                  Saturday, September 19, 2026 &bull; 9:00 AM – 3:00 PM
                </p>
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky" />
                  Lincoln Park, Tracy
                </p>
              </div>
              <p className="text-textsecondary mb-6 leading-relaxed">
                Join us for Tracy's largest community resource fair. Theme: "Living Your Best Life in Tracy: Bridging the Digital Divide — Youth and Seniors." Connect with local nonprofits, discover volunteer opportunities, and enjoy family-friendly activities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 bg-success text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  RSVP Now
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 border border-navy text-navy font-semibold px-6 py-3 rounded-lg hover:bg-navy hover:text-white transition-colors"
                >
                  View All Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={missionRef} className={`reveal ${missionRevealed ? 'revealed' : ''}`}>
            <Heart className="w-10 h-10 text-sky mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl font-medium italic leading-relaxed mb-6">
              "The Tracy Community Center exists to ensure every resident has access to the resources, connections, and support they need to thrive."
            </blockquote>
            <p className="text-white/60 text-sm mb-12">
              — Tracy Community Center Mission
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { icon: Link2, title: 'Connect', desc: 'Bridging residents to local services' },
                { icon: Shield, title: 'Support', desc: 'Mental health and crisis resources' },
                { icon: Rocket, title: 'Empower', desc: 'Programs that build skills and community' },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-sky" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{pillar.title}</h3>
                    <p className="text-white/60 text-sm">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionHeader
              eyebrow="Upcoming Events"
              title="Don't miss what's happening in Tracy"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.id} {...event} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors"
            >
              View Full Calendar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Crisis Banner */}
      <section className="py-6 bg-amber-50 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
            <AlertTriangle className="w-6 h-6 text-warning shrink-0" />
            <p className="text-textprimary">
              <span className="font-semibold">Need immediate help?</span>{' '}
              Call <a href="tel:988" className="text-navy font-semibold underline">988 Suicide & Crisis Lifeline</a> or text <span className="font-semibold">HOME</span> to <span className="font-semibold">741741</span>
            </p>
            <Link
              to="/mental-health"
              className="text-navy font-medium hover:underline shrink-0"
            >
              Mental Health Resources →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
