import { useState, useMemo } from 'react';
import { Info, ExternalLink } from 'lucide-react';
import ProgramCard from '@/components/cards/ProgramCard';
import { programs, programAgeGroups, programCategories, programCosts } from '@/data/programs';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Programs() {
  const [ageFilter, setAgeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [costFilter, setCostFilter] = useState('All');
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal<HTMLDivElement>(0.05);

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchAge = ageFilter === 'All' || p.ageGroup === ageFilter;
      const matchCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchCost = costFilter === 'All' ||
        (costFilter === 'Free' && p.cost === 'Free') ||
        (costFilter === 'Paid' && p.cost !== 'Free');
      return matchAge && matchCategory && matchCost;
    });
  }, [ageFilter, categoryFilter, costFilter]);

  const clearFilters = () => {
    setAgeFilter('All');
    setCategoryFilter('All');
    setCostFilter('All');
  };

  const hasFilters = ageFilter !== 'All' || categoryFilter !== 'All' || costFilter !== 'All';

  return (
    <main id="main-content">
      {/* Page Header */}
      <section className="bg-navy py-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className={`reveal ${headerRevealed ? 'revealed' : ''}`}>
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-sky mb-3">
              Community Programs
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Programs for Every Age
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Sports, arts, STEM, fitness, and social programs running year-round at the Tracy Community Center.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-10 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider mr-2">Age Group</span>
                <div className="inline-flex flex-wrap gap-2 mt-1">
                  {programAgeGroups.map((age) => (
                    <button
                      key={age}
                      onClick={() => setAgeFilter(age)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        ageFilter === age
                          ? 'bg-white text-navy'
                          : 'bg-white/15 text-white/80 hover:bg-white/25'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider mr-2">Category</span>
                <div className="inline-flex flex-wrap gap-2 mt-1">
                  {programCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        categoryFilter === cat
                          ? 'bg-white text-navy'
                          : 'bg-white/15 text-white/80 hover:bg-white/25'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider mr-2">Cost</span>
                <div className="inline-flex flex-wrap gap-2 mt-1">
                  {programCosts.map((cost) => (
                    <button
                      key={cost}
                      onClick={() => setCostFilter(cost)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        costFilter === cost
                          ? 'bg-white text-navy'
                          : 'bg-white/15 text-white/80 hover:bg-white/25'
                      }`}
                    >
                      {cost}
                    </button>
                  ))}
                </div>
              </div>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-white/70 hover:text-white transition-colors ml-4"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12 pb-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program, i) => (
                <ProgramCard
                  key={program.id}
                  name={program.name}
                  ageGroup={program.ageGroup}
                  category={program.category}
                  schedule={program.schedule}
                  startDate={program.startDate}
                  cost={program.cost}
                  spotsLeft={program.spotsLeft}
                  totalSpots={program.totalSpots}
                  description={program.description}
                  image={program.image}
                  registerUrl={program.registerUrl}
                  index={i % 6}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Info className="w-12 h-12 text-textsecondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2">No programs found</h3>
              <p className="text-textsecondary mb-6">Try adjusting your filters to see more results.</p>
              <button onClick={clearFilters} className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Registration Info Banner */}
      <section className="bg-navy-light py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Info className="w-5 h-5 text-navy" />
            <h3 className="font-semibold text-navy">How to Register</h3>
          </div>
          <p className="text-navy/80 mb-4">
            Most programs can be registered online at tracyartsandrec.com or by calling 209-831-6200. 
            Walk-in registration is also available at the Tracy Community Center.
          </p>
          <a
            href="https://tracyartsandrec.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors"
          >
            Visit TracyArtsandRec.com
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
