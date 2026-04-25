import { useState, useMemo } from 'react';
import { Calendar, List, LayoutGrid } from 'lucide-react';
import EventCard from '@/components/cards/EventCard';
import { events, eventCategories, eventDateFilters } from '@/data/events';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal<HTMLDivElement>(0.05);

  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    // Category filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(e => e.category === activeCategory);
    }

    // Date filter
    const now = new Date();
    if (dateFilter === 'this-week') {
      const weekEnd = new Date(now);
      weekEnd.setDate(weekEnd.getDate() + 7);
      filtered = filtered.filter(e => new Date(e.date) >= now && new Date(e.date) <= weekEnd);
    } else if (dateFilter === 'this-month') {
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      filtered = filtered.filter(e => new Date(e.date) >= now && new Date(e.date) <= monthEnd);
    } else if (dateFilter === 'next-3-months') {
      const threeMonthsEnd = new Date(now);
      threeMonthsEnd.setMonth(threeMonthsEnd.getMonth() + 3);
      filtered = filtered.filter(e => new Date(e.date) >= now && new Date(e.date) <= threeMonthsEnd);
    }

    // Sort
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.attending - a.attending);
    }

    return filtered;
  }, [activeCategory, dateFilter, sortBy]);

  const clearFilters = () => {
    setActiveCategory('All');
    setDateFilter('all');
    setSortBy('date');
  };

  return (
    <main id="main-content">
      {/* Page Header */}
      <section className="bg-navy py-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className={`reveal ${headerRevealed ? 'revealed' : ''}`}>
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-sky mb-3">
              Community Events
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What's Happening in Tracy
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Discover local events, festivals, workshops, and gatherings. Filter by category or date.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-10 space-y-4">
            <div className="flex flex-wrap gap-2">
              {eventCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-white text-navy'
                      : 'bg-white/15 text-white/80 hover:bg-white/25'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white/60" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-white/15 border border-white/20 rounded-lg text-sm text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky"
                >
                  {eventDateFilters.map(f => (
                    <option key={f.value} value={f.value} className="text-navy">{f.label}</option>
                  ))}
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/15 border border-white/20 rounded-lg text-sm text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky"
              >
                <option value="date" className="text-navy">Sort by Date</option>
                <option value="popularity" className="text-navy">Sort by Popularity</option>
              </select>
              {(activeCategory !== 'All' || dateFilter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 pb-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* View Toggle */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex bg-white border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-navy text-white' : 'text-textsecondary hover:text-navy'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-navy text-white' : 'text-textsecondary hover:text-navy'
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event, i) => (
                  <EventCard key={event.id} {...event} index={i % 6} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => {
                  const dateObj = new Date(event.date + 'T00:00:00');
                  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  return (
                    <div key={event.id} className="bg-white rounded-lg border border-border p-4 flex flex-col sm:flex-row gap-4 card-hover">
                      <div className="w-full sm:w-48 h-32 shrink-0 overflow-hidden rounded-lg">
                        <img src={event.image} alt={event.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky/10 text-sky">{event.category}</span>
                          <span className="text-xs text-textsecondary">{dateStr} &bull; {event.time}</span>
                        </div>
                        <h3 className="font-semibold text-navy mb-1">{event.name}</h3>
                        <p className="text-sm text-textsecondary mb-2 line-clamp-2">{event.description}</p>
                        <div className="flex items-center gap-3">
                          {event.rsvpUrl ? (
                            <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-success text-white text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-green-700 transition-colors">
                              RSVP
                            </a>
                          ) : (
                            <span className="text-sm text-textsecondary">Open attendance</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <Calendar className="w-12 h-12 text-textsecondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2">No events found</h3>
              <p className="text-textsecondary mb-6">Try adjusting your filters to see more results.</p>
              <button onClick={clearFilters} className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
