'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, X, Building2, Home, Heart, BookOpen, Scale, Utensils } from 'lucide-react';
import { resources, resourceCategories } from '@/data/resources';
import ResourceCard from '@/components/cards/ResourceCard';
import CinematicScrollyHero from '@/components/CinematicScrollyHero';

export default function Resources() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory = activeFilters.length === 0 || 
        resource.categories.some(cat => activeFilters.includes(cat));
      const matchesSearch = searchQuery === '' ||
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeFilters, searchQuery]);

  const toggleFilter = (category: string) => {
    if (category === 'All') {
      setActiveFilters([]);
      return;
    }
    setActiveFilters(prev =>
      prev.includes(category)
        ? prev.filter(f => f !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
  };

  return (
    <main id="main-content">
      <CinematicScrollyHero
        tone="resources"
        accent="#22d3ee"
        secondary="#55efc4"
        background="linear-gradient(135deg, #010b18 0%, #03192b 52%, #020910 100%)"
        icon={Building2}
        images={[
          {
            url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1800&q=80',
            label: 'Food & Supplies',
          },
          {
            url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1800&q=80',
            label: 'Community Support',
          },
          {
            url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=80',
            label: 'Local Help',
          },
        ]}
        chapters={[
          {
            eyebrow: 'Community Resources',
            title: 'Find the Help',
            accent: 'You Need',
            description: 'Housing, food, healthcare, legal aid, and local support are connected into one searchable civic network.',
          },
          {
            eyebrow: 'Service Network',
            title: 'Six Doors',
            accent: 'One Map',
            align: 'right',
            content: (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { icon: Home, label: 'Housing & Shelter', color: '#4A90D9' },
                  { icon: Utensils, label: 'Food & Nutrition', color: '#16A34A' },
                  { icon: Heart, label: 'Health & Wellness', color: '#DC2626' },
                  { icon: Scale, label: 'Legal Aid', color: '#9333EA' },
                  { icon: BookOpen, label: 'Education', color: '#D97706' },
                  { icon: Building2, label: 'City Services', color: '#0891b2' },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <Icon className="h-5 w-5 shrink-0" style={{ color }} />
                    <span className="text-sm font-semibold text-white/80">{label}</span>
                  </div>
                ))}
              </div>
            ),
          },
          {
            eyebrow: 'Search Resources',
            title: 'Search &',
            accent: 'Filter',
            description: 'Tune the directory before the full result grid appears below.',
            content: (
              <div className="pointer-events-auto space-y-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search resources..."
                    className="w-full rounded-xl border border-white/20 bg-white/15 py-3 pl-12 pr-4 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {resourceCategories.map(cat => {
                    const isActive = cat === 'All' ? activeFilters.length === 0 : activeFilters.includes(cat);
                    return (
                      <button key={cat} onClick={() => toggleFilter(cat)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                          isActive ? 'bg-white text-navy shadow-lg' : 'border border-white/20 bg-white/15 text-white/80 hover:bg-white/25'
                        }`}>{cat}</button>
                    );
                  })}
                </div>
                {(activeFilters.length > 0 || searchQuery) && (
                  <button onClick={clearFilters} className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
                    <X className="h-4 w-4" /> Clear filters
                  </button>
                )}
              </div>
            ),
          },
        ]}
      />

      <section className="py-16 pb-24 bg-gradient-to-b from-navy to-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, i) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 50, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -10, rotateX: 5 }}
                >
                  <ResourceCard
                    name={resource.name}
                    categories={resource.categories}
                    description={resource.description}
                    phone={resource.phone}
                    email={resource.email}
                    website={resource.website}
                    address={resource.address}
                    hours={resource.hours}
                    index={i % 6}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Building2 className="w-16 h-16 text-textsecondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">No resources match your search</h3>
              <p className="text-textsecondary mb-6">Try adjusting your filters or search terms.</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
