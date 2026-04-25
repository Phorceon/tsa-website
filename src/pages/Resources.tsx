'use client';

import { useState, useMemo, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, X, Building2 } from 'lucide-react';
import { Sparkles } from '@react-three/drei';
import { resources, resourceCategories } from '@/data/resources';
import ResourceCard from '@/components/cards/ResourceCard';
import ResourcesScene from '@/components/3d/ResourcesScene';

export default function Resources() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
              <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4A90D9" />
              <ResourcesScene />
              <Sparkles count={50} scale={8} size={2} speed={0.3} color="#4A90D9" />
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
              Community Resources
            </motion.span>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Find the Help You Need
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mb-10">
              Browse housing, food, legal aid, education, and more. Filter by category or search by keyword.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {resourceCategories.map((cat, i) => {
                const isActive = cat === 'All'
                  ? activeFilters.length === 0
                  : activeFilters.includes(cat);
                return (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    onClick={() => toggleFilter(cat)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-navy shadow-lg shadow-white/20'
                        : 'bg-white/15 text-white/80 hover:bg-white/25 border border-white/20'
                    }`}
                  >
                    {cat}
                  </motion.button>
                );
              })}
            </motion.div>
            
            <div className="flex items-center gap-4 flex-wrap">
              <motion.div 
                className="relative max-w-sm flex-1 min-w-[250px]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full pl-12 pr-4 py-3 bg-white/15 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky focus:border-transparent backdrop-blur-sm"
                />
              </motion.div>
              
              {(activeFilters.length > 0 || searchQuery) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                  Clear Filters
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

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