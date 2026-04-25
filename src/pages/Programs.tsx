'use client';

import { useState, useMemo, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'motion/react';
import { Info, ExternalLink } from 'lucide-react';
import { Sparkles } from '@react-three/drei';
import ProgramCard from '@/components/cards/ProgramCard';
import { programs, programAgeGroups, programCategories, programCosts } from '@/data/programs';
import ProgramsScene from '@/components/3d/ProgramsScene';

export default function Programs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [ageFilter, setAgeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [costFilter, setCostFilter] = useState('All');
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

  const filterGroups = [
    { label: 'Age Group', options: programAgeGroups, value: ageFilter, setter: setAgeFilter },
    { label: 'Category', options: programCategories, value: categoryFilter, setter: setCategoryFilter },
    { label: 'Cost', options: programCosts, value: costFilter, setter: setCostFilter },
  ];

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
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.3} color="#16A34A" />
              <ProgramsScene />
              <Sparkles count={50} scale={8} size={2} speed={0.3} color="#9333EA" />
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
              Community Programs
            </motion.span>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Programs for Every Age
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl">
              Sports, arts, STEM, fitness, and social programs running year-round at the Tracy Community Center.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6 mt-10"
          >
            {filterGroups.map((group, groupIndex) => (
              <motion.div 
                key={group.label}
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + groupIndex * 0.1 }}
              >
                <span className="text-sm font-semibold text-white/60 uppercase tracking-wider min-w-[100px]">{group.label}</span>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((opt, i) => (
                    <motion.button
                      key={opt}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + groupIndex * 0.1 + i * 0.03 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => group.setter(opt)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        group.value === opt
                          ? 'bg-white text-navy shadow-lg shadow-white/20'
                          : 'bg-white/15 text-white/80 hover:bg-white/25 border border-white/20'
                      }`}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
            
            {hasFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="text-white/70 hover:text-white transition-colors"
              >
                Clear Filters
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16 pb-24 bg-gradient-to-b from-navy to-offwhite">
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
              <h3 className="text-2xl font-bold text-navy mb-2">No programs found</h3>
              <p className="text-textsecondary mb-6">Try adjusting your filters to see more results.</p>
              <button onClick={clearFilters} className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors">
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
        className="bg-gradient-to-r from-navy-light via-white to-navy-light py-16"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Info className="w-6 h-6 text-navy" />
              <h3 className="text-2xl font-bold text-navy">How to Register</h3>
            </div>
          </motion.div>
          
          <p className="text-navy/80 mb-6 text-lg">
            Most programs can be registered online at tracyartsandrec.com or by calling 209-831-6200. 
            Walk-in registration is also available at the Tracy Community Center.
          </p>
          <a
            href="https://tracyartsandrec.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-navy-dark transition-all hover:scale-105 hover:shadow-2xl hover:shadow-navy/30"
          >
            Visit TracyArtsandRec.com
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </motion.section>
    </main>
  );
}