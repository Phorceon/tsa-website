'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar, List, LayoutGrid, Star, MapPin, Ticket, X } from 'lucide-react';
import EventCard from '@/components/cards/EventCard';
import { events, eventCategories, eventDateFilters } from '@/data/events';
import CinematicScrollyHero from '@/components/CinematicScrollyHero';
import LiquidGlass from '@/components/ui/LiquidGlass';

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredEvents = useMemo(() => {
    let filtered = [...events];
    if (activeCategory !== 'All') filtered = filtered.filter(e => e.category === activeCategory);
    const now = new Date();
    if (dateFilter === 'this-week') {
      const weekEnd = new Date(now); weekEnd.setDate(weekEnd.getDate() + 7);
      filtered = filtered.filter(e => new Date(e.date) >= now && new Date(e.date) <= weekEnd);
    } else if (dateFilter === 'this-month') {
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      filtered = filtered.filter(e => new Date(e.date) >= now && new Date(e.date) <= monthEnd);
    } else if (dateFilter === 'next-3-months') {
      const threeMonthsEnd = new Date(now); threeMonthsEnd.setMonth(threeMonthsEnd.getMonth() + 3);
      filtered = filtered.filter(e => new Date(e.date) >= now && new Date(e.date) <= threeMonthsEnd);
    }
    if (sortBy === 'date') filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    else if (sortBy === 'popularity') filtered.sort((a, b) => b.attending - a.attending);
    return filtered;
  }, [activeCategory, dateFilter, sortBy]);

  const clearFilters = () => { setActiveCategory('All'); setDateFilter('all'); setSortBy('date'); };

  const hasActiveFilters = activeCategory !== 'All' || dateFilter !== 'all';

  return (
    <main id="main-content">
    <CinematicScrollyHero
      tone="events"
      accent="#f59e0b"
      secondary="#f43f5e"
      background="linear-gradient(135deg, #100408 0%, #220817 42%, #120b02 100%)"
      icon={Calendar}
      images={[
        {
          url: '/images/tracy-event-black-brilliance.jpg',
          label: 'Black Brilliance Event at Grand Theatre',
        },
        {
          url: '/images/tracy-event-girls-night.jpg',
          label: "Girls' Night Out: Witches and Broomsticks",
        },
      ]}
      chapters={[
          {
            eyebrow: 'Community Events',
            title: "What's Happening",
            accent: 'in Tracy',
            description: 'Festivals, workshops, markets, and community gatherings move through the city like a living calendar.',
          },
          {
            eyebrow: 'Next Major Event',
            title: 'Unity Takes',
            accent: 'the Park',
            align: 'right',
            content: (
              <div className="pointer-events-auto">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center border border-amber-400/35 bg-amber-400/18">
                    <Ticket className="h-7 w-7 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Saturday, September 19, 2026</p>
                    <h2 className="font-black tracking-tighter uppercase text-3xl font-bold text-ink">6th Annual Tracy Unity</h2>
                  </div>
                </div>
                <p className="mb-2 text-ink">9 AM - 3 PM at Lincoln Park, Tracy.</p>
                <p className="mb-5 text-ink">A community resource fair themed "Living Your Best Life in Tracy."</p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 bg-rose-500/18 px-4 py-2 text-sm font-semibold text-rose-200"><Star className="h-4 w-4" /> Featured</span>
                  <span className="inline-flex items-center gap-2 bg-amber-500/18 px-4 py-2 text-sm font-semibold text-amber-200"><MapPin className="h-4 w-4" /> Lincoln Park</span>
                </div>
              </div>
            ),
          },
        ]}
      />

      <section className="py-12 pb-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  {eventCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 text-sm font-semibold transition-all ${
                        activeCategory === cat
                          ? 'bg-canvas text-ink border border-border'
                          : 'border border-outline bg-surface text-ink hover:bg-canvas'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={dateFilter}
                    onChange={e => setDateFilter(e.target.value)}
                    className="border border-outline bg-surface px-4 py-3 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sky"
                  >
                    {eventDateFilters.map(f => <option key={f.value} value={f.value} className="text-ink">{f.label}</option>)}
                  </select>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="border border-outline bg-surface px-4 py-3 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sky"
                  >
                    <option value="date" className="text-ink">Sort by Date</option>
                    <option value="popularity" className="text-ink">Sort by Popularity</option>
                  </select>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 text-ink text-sm font-semibold hover:text-error transition-colors"
                    >
                      <X className="w-4 h-4" /> Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-end mb-8"
          >
            <div className="inline-flex bg-surface overflow-hidden border border-border">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${
                  viewMode === 'grid' ? 'bg-canvas text-ink' : 'text-textsecondary hover:text-ink'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
                Grid
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${
                  viewMode === 'list' ? 'bg-canvas text-ink' : 'text-textsecondary hover:text-ink'
                }`}
              >
                <List className="w-5 h-5" />
                List
              </motion.button>
            </div>
          </motion.div>

          {filteredEvents.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    whileHover={{ y: -10, rotateX: 5 }}
                  >
                    <EventCard {...event} index={i % 6} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredEvents.map((event, i) => {
                  const dateObj = new Date(event.date + 'T00:00:00');
                  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 10 }}
                    >
                      <LiquidGlass intensity="subtle" className="p-6 flex flex-col sm:flex-row gap-6">
                      <div className="w-full sm:w-56 h-40 shrink-0 overflow-hidden">
                        <img src={event.image} alt={event.name} className="w-full h-full object-cover hover:scale-100 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-semibold px-3 py-1 bg-surface text-ink">{event.category}</span>
                          <span className="text-textsecondary">{dateStr} • {event.time}</span>
                        </div>
                        <h3 className="text-xl font-bold text-ink mb-2">{event.name}</h3>
                        <p className="text-textsecondary mb-4 line-clamp-2">{event.description}</p>
                        <div className="flex items-center gap-4">
                          {event.rsvpUrl ? (
                            <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-success text-ink font-bold px-5 py-2.5 hover:bg-green-700 transition-colors hover:">
                              RSVP
                            </a>
                          ) : (
                            <span className="text-textsecondary font-medium">Open attendance</span>
                          )}
                        </div>
                      </div>
                      </LiquidGlass>
                    </motion.div>
                  );
                })}
              </div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Calendar className="w-16 h-16 text-textsecondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-ink mb-2">No events found</h3>
              <p className="text-textsecondary mb-6">Try adjusting your filters to see more results.</p>
              <button onClick={clearFilters} className="bg-canvas text-ink font-semibold px-6 py-3 hover:bg-canvas transition-colors">
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
