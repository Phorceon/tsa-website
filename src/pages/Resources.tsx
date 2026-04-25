import { useState, useMemo, useCallback } from 'react';
import { Search, X, Building2 } from 'lucide-react';
import { resources, resourceCategories } from '@/data/resources';
import ResourceCard from '@/components/cards/ResourceCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Resources() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal<HTMLDivElement>(0.05);

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

  const toggleFilter = useCallback((category: string) => {
    if (category === 'All') {
      setActiveFilters([]);
      return;
    }
    setActiveFilters(prev =>
      prev.includes(category)
        ? prev.filter(f => f !== category)
        : [...prev, category]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters([]);
    setSearchQuery('');
  }, []);

  return (
    <main id="main-content">
      {/* Page Header */}
      <section className="bg-navy py-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className={`reveal ${headerRevealed ? 'revealed' : ''}`}>
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-sky mb-3">
              Community Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find the Help You Need
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Browse housing, food, legal aid, education, and more. Filter by category or search by keyword.
            </p>
          </div>

          {/* Filter Bar in hero */}
          <div className="mt-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {resourceCategories.map((cat) => {
                const isActive = cat === 'All'
                  ? activeFilters.length === 0
                  : activeFilters.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleFilter(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white text-navy'
                        : 'bg-white/15 text-white/80 hover:bg-white/25'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                  className="w-64 pl-9 pr-4 py-2 bg-white/15 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky"
                />
              </div>
              {(activeFilters.length > 0 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 pb-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, i) => (
                <ResourceCard
                  key={resource.id}
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
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Building2 className="w-12 h-12 text-textsecondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2">No resources match your search</h3>
              <p className="text-textsecondary mb-6">Try adjusting your filters or search terms.</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
