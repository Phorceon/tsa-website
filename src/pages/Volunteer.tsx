'use client';

import { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'motion/react';
import { CheckCircle, BookOpen, ExternalLink, HandHeart } from 'lucide-react';
import { Sparkles } from '@react-three/drei';
import VolunteerScene from '@/components/3d/VolunteerScene';
import { volunteerOpportunities, volunteerCauses, donationOrgs, tutors, skills, skillCategories } from '@/data/volunteers';

export default function Volunteer() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeCause, setActiveCause] = useState('All');
  const [activeTab, setActiveTab] = useState<'volunteer' | 'donate' | 'tutoring' | 'skills'>('volunteer');
  const [skillSubmitted, setSkillSubmitted] = useState(false);
  const [tutorSubmitted, setTutorSubmitted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const filteredOpportunities = activeCause === 'All'
    ? volunteerOpportunities
    : volunteerOpportunities.filter(v => v.cause === activeCause);

  const tabs: { id: 'volunteer' | 'donate' | 'tutoring' | 'skills'; label: string }[] = [
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'donate', label: 'Donate' },
    { id: 'tutoring', label: 'Find a Tutor' },
    { id: 'skills', label: 'Offer a Skill' },
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
              <VolunteerScene />
              <Sparkles count={50} scale={8} size={2} speed={0.3} color="#D97706" />
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
              Volunteer & Give Back
            </motion.span>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Make a Difference in Tracy
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl">
              Whether you have an hour or a skill to share, your contribution matters.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="sticky top-16 z-30 bg-white/90 backdrop-blur-lg border-b border-border shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 scrollbar-hide">
            {tabs.map((tab, i) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => setActiveTab(tab.id as 'volunteer' | 'donate' | 'tutoring' | 'skills')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-4 text-sm font-bold border-b-3 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-navy text-navy bg-navy-light/30'
                    : 'border-transparent text-textsecondary hover:text-navy hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {activeTab === 'volunteer' && (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 bg-gradient-to-b from-offwhite via-white to-offwhite"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-sky/10 rounded-full text-xs font-medium uppercase tracking-widest text-sky mb-4">
                Volunteer Opportunities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy">
                Local organizations seeking dedicated helpers
              </h2>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-3 justify-center mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {volunteerCauses.map((cause, i) => (
                <motion.button
                  key={cause}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCause(cause)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCause === cause
                      ? 'bg-navy text-white shadow-lg shadow-navy/30'
                      : 'bg-lightgray text-textsecondary hover:bg-navy-light hover:text-navy'
                  }`}
                >
                  {cause}
                </motion.button>
              ))}
            </motion.div>
            
            <div className="space-y-6">
              {filteredOpportunities.map((opp, i) => {
                return (
                  <motion.div
                    key={opp.id}
                    initial={{ opacity: 0, y: 30, rotateX: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5, rotateX: 3 }}
                    className="bg-white rounded-2xl border border-border p-8 shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full bg-sky/10 text-sky">
                            {opp.cause}
                          </span>
                          <span className="text-textsecondary">{opp.commitment}</span>
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-3">{opp.organization}</h3>
                        <p className="text-textsecondary mb-3">{opp.description}</p>
                        <p className="text-textsecondary font-medium">{opp.contact}</p>
                      </div>
                      {opp.applyUrl ? (
                        <a
                          href={opp.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-2 bg-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-dark transition-all hover:scale-105 hover:shadow-xl self-start"
                        >
                          Apply
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-2 bg-lightgray text-textsecondary font-semibold px-6 py-3 rounded-xl self-start">
                          Contact for Details
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}

      {activeTab === 'donate' && (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 bg-gradient-to-b from-offwhite via-white to-offwhite"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-success/10 rounded-full text-xs font-medium uppercase tracking-widest text-success mb-4">
                Make a Donation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy">
                Support organizations making a real impact
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {donationOrgs.map((org, i) => (
                <motion.div
                  key={org.id}
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -10, rotateX: 5 }}
                  className="bg-white rounded-2xl border border-border p-8 shadow-lg hover:shadow-2xl transition-all flex flex-col"
                >
                  <HandHeart className="w-12 h-12 text-sky mb-5" />
                  <h3 className="text-xl font-bold text-navy mb-3">{org.name}</h3>
                  <p className="text-textsecondary mb-6 flex-1">{org.description}</p>
                  <ul className="space-y-3 mb-6">
                    {org.impact.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-textsecondary">
                        <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={org.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-success text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 transition-all hover:scale-105 hover:shadow-xl"
                  >
                    Donate Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 bg-navy-light rounded-2xl p-8 text-center"
            >
              <p className="text-navy">
                <span className="font-bold">In-Kind Donations:</span> Many organizations also need hygiene products, non-perishable food, clothing, and household items. Contact them directly to arrange drop-off.
              </p>
            </motion.div>
          </div>
        </motion.section>
      )}

      {activeTab === 'tutoring' && (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 bg-gradient-to-b from-offwhite via-white to-offwhite"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-sky/10 rounded-full text-xs font-medium uppercase tracking-widest text-sky mb-4">
                Free & Low-Cost Tutoring
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy">
                Connect with local tutors and mentoring programs
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {tutors.map((tutor, i) => (
                <motion.div
                  key={tutor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl border border-border p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <BookOpen className="w-10 h-10 text-sky" />
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${tutor.cost === 'Free' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                      {tutor.cost}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{tutor.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.subjects.map((s) => (
                      <span key={s} className="text-sm bg-navy-light text-navy px-3 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="space-y-2 text-textsecondary mb-4">
                    <p><span className="font-medium text-textprimary">Grades:</span> {tutor.gradeLevels}</p>
                    <p><span className="font-medium text-textprimary">Schedule:</span> {tutor.availability}</p>
                    <p>{tutor.description}</p>
                    <p className="font-medium text-navy">{tutor.contact}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-xl mx-auto bg-white rounded-2xl border border-border p-10 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-navy mb-6 text-center">Request a Tutor</h3>
              {tutorSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <p className="text-navy font-bold text-lg">Thank you! Your request has been submitted.</p>
                  <p className="text-textsecondary mt-2">A tutor coordinator will contact you within 2-3 business days.</p>
                </motion.div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setTutorSubmitted(true); }} className="space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-textprimary mb-2 block">Your Name</label>
                    <input type="text" required className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-textprimary mb-2 block">Email</label>
                    <input type="email" required className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-textprimary mb-2 block">Student Grade</label>
                    <select required className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all">
                      <option value="">Select grade</option>
                      {['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(g => <option key={g} value={g}>{g === 'K' ? 'Kindergarten' : `Grade ${g}`}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-textprimary mb-2 block">Subject Needs</label>
                    <textarea required rows={3} className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" placeholder="What subjects does the student need help with?" />
                  </div>
                  <button type="submit" className="w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-navy-dark transition-all hover:scale-[1.02] hover:shadow-xl">
                    Submit Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.section>
      )}

      {activeTab === 'skills' && (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 bg-gradient-to-b from-offwhite via-white to-offwhite"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-purple-600/10 rounded-full text-xs font-medium uppercase tracking-widest text-purple-600 mb-4">
                Share Your Skills
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy">
                Offer your talents to help neighbors in need
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-navy mb-6">Current Skill Listings</h3>
                <div className="space-y-5">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="bg-white rounded-2xl border border-border p-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-navy">{skill.skill}</h4>
                        <span className="text-sm bg-navy-light text-navy px-3 py-1 rounded-full">{skill.category}</span>
                      </div>
                      <p className="text-textsecondary mb-3">{skill.description}</p>
                      <p className="text-sm text-textsecondary mb-2">Available: {skill.availability}</p>
                      <p className="text-sky font-medium">{skill.contact}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-navy mb-6">Post Your Skill</h3>
                <div className="bg-white rounded-2xl border border-border p-8 shadow-2xl">
                  {skillSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                      <p className="text-navy font-bold text-lg">Thank you! Your listing has been submitted for review.</p>
                      <p className="text-textsecondary mt-2">It will appear on the site after approval.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSkillSubmitted(true); }} className="space-y-5">
                      <div>
                        <label className="text-sm font-semibold text-textprimary mb-2 block">Your Name</label>
                        <input type="text" required className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-textprimary mb-2 block">Skill Category</label>
                        <select required className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all">
                          {skillCategories.map(c => <option key={c} value={c}>{c}</option>)}
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-textprimary mb-2 block">Skill Description</label>
                        <textarea required rows={3} className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" placeholder="Describe what you can help with..." />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-textprimary mb-2 block">Availability</label>
                        <input type="text" required className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" placeholder="e.g., Weekends, evenings" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-textprimary mb-2 block">Contact (email or phone)</label>
                        <input type="text" required className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" />
                      </div>
                      <button type="submit" className="w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-navy-dark transition-all hover:scale-[1.02] hover:shadow-xl">
                        Submit Listing
                      </button>
                      <p className="text-xs text-textsecondary text-center">Listings are reviewed before posting. No payment processing on this site.</p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </main>
  );
}