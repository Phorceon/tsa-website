'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Info, ExternalLink, Dumbbell, Palette, FlaskConical, Footprints } from 'lucide-react';
import ProgramCard from '@/components/cards/ProgramCard';
import { programs, programAgeGroups, programCategories, programCosts } from '@/data/programs';
import CinematicScrollyHero from '@/components/CinematicScrollyHero';
import LiquidGlass from '@/components/ui/LiquidGlass';

export default function Programs() {
  const [ageFilter, setAgeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [costFilter, setCostFilter] = useState('All');

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

  const clearFilters = () => { setAgeFilter('All'); setCategoryFilter('All'); setCostFilter('All'); };
  const hasFilters = ageFilter !== 'All' || categoryFilter !== 'All' || costFilter !== 'All';
  const filterGroups = [
    { label: 'Age Group', options: programAgeGroups, value: ageFilter, setter: setAgeFilter },
    { label: 'Category', options: programCategories, value: categoryFilter, setter: setCategoryFilter },
    { label: 'Cost', options: programCosts, value: costFilter, setter: setCostFilter },
  ];

  const programTypes = [
    { icon: Dumbbell, label: 'Sports', desc: 'Basketball, soccer, swim & more', color: '#D97706' },
    { icon: Palette, label: 'Arts', desc: 'Painting, ceramics, music & dance', color: '#9333EA' },
    { icon: FlaskConical, label: 'STEM', desc: 'Coding, robotics & science', color: '#4A90D9' },
    { icon: Footprints, label: 'Fitness', desc: 'Yoga, zumba & senior fitness', color: '#16A34A' },
  ];

  return (
    <main id="main-content">
      <CinematicScrollyHero
        tone="programs"
        accent="#a855f7"
        secondary="#22c55e"
        background="linear-gradient(135deg, #070214 0%, #16072b 46%, #021507 100%)"
        icon={Dumbbell}
  images={[
    {
      url: '/images/tracy-community-center-hall.jpg',
      label: 'Tracy Community Center Classes',
    },
    {
      url: '/images/program-senior-fitness.jpg',
      label: 'Tracy Senior Fitness',
    },
    {
      url: '/images/joe-wilson-pool.jpg',
      label: 'Joe Wilson Pool Programs',
    },
  ]}
        chapters={[
          {
            eyebrow: 'Community Programs',
            title: 'Programs for',
            accent: 'Every Age',
            description: 'Sports, arts, STEM, and fitness run like colorful lanes across the Tracy Community Center calendar.',
          },
          {
            eyebrow: 'Activity Lanes',
            title: 'Choose Your',
            accent: 'Track',
            align: 'right',
            content: (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {programTypes.map(({ icon: Icon, label, desc, color }) => (
                  <LiquidGlass key={label} intensity="subtle" className="rounded-[1.25rem] p-4">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                      <Icon className="h-6 w-6" style={{ color }} />
                    </div>
                    <h3 className="text-lg font-bold text-ink">{label}</h3>
                    <p className="text-sm text-ink">{desc}</p>
                  </LiquidGlass>
                ))}
              </div>
            ),
          },
          {
            eyebrow: 'Filter Programs',
            title: 'Find Your',
            accent: 'Program',
            description: 'Filter the catalog by age, activity, and cost before jumping into the full program list.',
            content: (
              <div className="pointer-events-auto space-y-4">
                {filterGroups.map((group) => (
                  <div key={group.label} className="flex flex-wrap items-center gap-3">
                    <span className="min-w-[90px] text-sm font-semibold uppercase tracking-wider text-ink">{group.label}</span>
                    {group.options.map((opt) => (
                      <button key={opt} onClick={() => group.setter(opt)}
                        className={` px-4 py-2 text-sm font-semibold transition-all ${
                          group.value === opt ? 'bg-surface text-ink ' : 'border border-outline bg-surface text-ink hover:bg-surface'
                        }`}>{opt}</button>
                    ))}
                  </div>
                ))}
                {hasFilters && <button onClick={clearFilters} className="text-sm text-ink transition-colors hover:text-ink">Clear Filters</button>}
              </div>
            ),
          },
        ]}
      />

      <section className="py-16 pb-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, i) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 50, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -10, rotateX: 5 }}
                >
                  <ProgramCard
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
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Info className="w-16 h-16 text-textsecondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-ink mb-2">No programs found</h3>
              <p className="text-textsecondary mb-6">Try adjusting your filters to see more results.</p>
              <button onClick={clearFilters} className="bg-canvas text-ink font-semibold px-6 py-3 hover:bg-canvas transition-colors">
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-surface py-16"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Info className="w-6 h-6 text-ink" />
              <h3 className="text-2xl font-bold text-ink">How to Register</h3>
            </div>
          </motion.div>
          
          <p className="text-ink mb-6 text-lg">
            Most programs can be registered online at tracyartsandrec.com or by calling 209-831-6200. 
            Walk-in registration is also available at the Tracy Community Center.
          </p>
          <a
            href="https://tracyartsandrec.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-canvas text-ink font-bold px-8 py-4 hover:bg-canvas transition-all hover:scale-100 hover: hover:shadow-navy/30"
          >
            Visit TracyArtsandRec.com
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </motion.section>
    </main>
  );
}
