'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, BookOpen, ExternalLink, HandHeart, Users, Wrench } from 'lucide-react';
import { volunteerOpportunities, volunteerCauses, donationOrgs, tutors, skills, skillCategories } from '@/data/volunteers';
import CinematicScrollyHero from '@/components/CinematicScrollyHero';
import LiquidGlass from '@/components/ui/LiquidGlass';

export default function Volunteer() {
  const [activeCause, setActiveCause] = useState('All');
  const [activeTab, setActiveTab] = useState<'volunteer' | 'donate' | 'tutoring' | 'skills'>('volunteer');
  const [skillSubmitted, setSkillSubmitted] = useState(false);
  const [tutorSubmitted, setTutorSubmitted] = useState(false);

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
      <CinematicScrollyHero
        tone="volunteer"
        accent="#f43f5e"
        secondary="#f59e0b"
        background="linear-gradient(135deg, #120502 0%, #250909 48%, #101406 100%)"
        icon={HandHeart}
  images={[
    {
      url: '/images/event-tracy-earth-day.jpg',
      label: 'Tracy Earth Day community volunteering',
    },
    {
      url: '/images/tracy-community-center.jpg',
      label: 'Tracy Community Center',
    },
    {
      url: '/images/lolly-hansen-senior-center.jpg',
      label: 'Lolly Hansen Senior Center in Tracy',
    },
  ]}
        chapters={[
          {
            eyebrow: 'Volunteer & Give Back',
            title: 'Make a',
            accent: 'Difference',
            description: "Whether you have an hour or a skill, your contribution becomes part of Tracy's shared support system.",
          },
          {
            eyebrow: 'Contribution Paths',
            title: 'Four Ways',
            accent: 'Forward',
            align: 'right',
            positionClassName: 'top-[13%] lg:pr-10',
            content: (
              <div className="space-y-3">
                {[
                  { icon: Users, label: 'Volunteer Your Time', sub: 'Local orgs actively recruiting', color: '#ef4444' },
                  { icon: HandHeart, label: 'Donate to Causes', sub: 'Food banks, shelters & nonprofits', color: '#D97706' },
                  { icon: BookOpen, label: 'Tutor a Student', sub: 'Free & low-cost tutoring programs', color: '#4A90D9' },
                  { icon: Wrench, label: 'Share a Skill', sub: 'Teach neighbors what you know', color: '#16A34A' },
                ].map(({ icon: Icon, label, sub, color }) => (
                  <LiquidGlass key={label} intensity="subtle" className="flex items-center gap-4 px-5 py-4">
                    <Icon className="h-6 w-6 shrink-0" style={{ color }} />
                    <div>
                      <p className="font-semibold text-ink">{label}</p>
                      <p className="text-sm text-ink">{sub}</p>
                    </div>
                  </LiquidGlass>
                ))}
              </div>
            ),
          },
          {
            eyebrow: 'Get Involved',
            title: 'Start',
            accent: 'Today',
            description: 'Pick a cause here, then continue into volunteer opportunities, donations, tutoring, and skill sharing.',
            content: (
              <div className="pointer-events-auto flex flex-wrap gap-3">
                {volunteerCauses.slice(0, 6).map(cause => (
                  <button key={cause} onClick={() => { setActiveCause(cause); setActiveTab('volunteer'); }}
                    className="border border-amber-500/30 bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-300 transition-all hover:bg-amber-500/30">{cause}</button>
                ))}
              </div>
            ),
          },
        ]}
      />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="sticky top-16 z-30 bg-[#0a111a] border-b border-outline shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]"
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
                    ? 'border-outline text-ink bg-canvas'
                    : 'border-transparent text-textsecondary hover:text-ink hover:bg-gray-50'
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
          className="py-16 bg-surface"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-surface text-xs font-medium uppercase tracking-widest text-ink mb-4">
                Volunteer Opportunities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-ink">
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
                  className={`px-4 py-2  text-sm font-semibold transition-all ${
                    activeCause === cause
                      ? 'bg-canvas text-ink  shadow-navy/30'
                      : 'bg-lightgray text-textsecondary hover:bg-canvas hover:text-ink'
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
                  >
                    <LiquidGlass intensity="subtle" className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 bg-white/[0.04] text-ink">
                            {opp.cause}
                          </span>
                          <span className="text-textsecondary">{opp.commitment}</span>
                        </div>
                        <h3 className="text-xl font-bold text-ink mb-3">{opp.organization}</h3>
                        <p className="text-textsecondary mb-3">{opp.description}</p>
                        <p className="text-textsecondary font-medium">{opp.contact}</p>
                      </div>
                      {opp.applyUrl ? (
                        <a
                          href={opp.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-2 bg-white/[0.06] text-ink font-bold px-6 py-3 hover:bg-white/[0.10] transition-all hover:scale-100 self-start"
                        >
                          Apply
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-2 bg-lightgray text-textsecondary font-semibold px-6 py-3 self-start">
                          Contact for Details
                        </span>
                      )}
                    </div>
                    </LiquidGlass>
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
          className="py-16 bg-surface"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-success/10 text-xs font-medium uppercase tracking-widest text-success mb-4">
                Make a Donation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-ink">
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
                >
                  <LiquidGlass intensity="subtle" className="p-8 flex flex-col h-full">
                  <HandHeart className="w-12 h-12 text-ink mb-5" />
                  <h3 className="text-xl font-bold text-ink mb-3">{org.name}</h3>
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
                    className="inline-flex items-center justify-center gap-2 bg-success text-ink font-bold px-6 py-3 hover:bg-green-700 transition-all hover:scale-100"
                  >
                    Donate Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 bg-canvas p-8 text-center"
            >
              <p className="text-ink">
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
          className="py-16 bg-surface"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-surface text-xs font-medium uppercase tracking-widest text-ink mb-4">
                Free & Low-Cost Tutoring
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-ink">
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
                >
                  <LiquidGlass intensity="subtle" className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <BookOpen className="w-10 h-10 text-ink" />
                    <span className={`text-sm font-semibold px-3 py-1  ${tutor.cost === 'Free' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                      {tutor.cost}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-3">{tutor.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.subjects.map((s) => (
                      <span key={s} className="text-sm bg-white/[0.04] text-ink px-3 py-1">{s}</span>
                    ))}
                  </div>
                  <div className="space-y-2 text-textsecondary mb-4">
                    <p><span className="font-medium text-textprimary">Grades:</span> {tutor.gradeLevels}</p>
                    <p><span className="font-medium text-textprimary">Schedule:</span> {tutor.availability}</p>
                    <p>{tutor.description}</p>
                    <p className="font-medium text-ink">{tutor.contact}</p>
                  </div>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <LiquidGlass intensity="subtle" className="max-w-xl mx-auto p-10">
              <h3 className="text-2xl font-bold text-ink mb-6 text-center">Request a Tutor</h3>
              {tutorSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <p className="text-ink font-bold text-lg">Thank you! Your request has been submitted.</p>
                  <p className="text-textsecondary mt-2">A tutor coordinator will contact you within 2-3 business days.</p>
                </motion.div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setTutorSubmitted(true); }} className="space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-textprimary mb-2 block">Your Name</label>
                    <input type="text" required className="w-full px-4 py-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-sky focus:border-outline transition-all" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-textprimary mb-2 block">Email</label>
                    <input type="email" required className="w-full px-4 py-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-sky focus:border-outline transition-all" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-textprimary mb-2 block">Student Grade</label>
                    <select required className="w-full px-4 py-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-sky focus:border-outline transition-all">
                      <option value="">Select grade</option>
                      {['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(g => <option key={g} value={g}>{g === 'K' ? 'Kindergarten' : `Grade ${g}`}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-textprimary mb-2 block">Subject Needs</label>
                    <textarea required rows={3} className="w-full px-4 py-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-sky focus:border-outline transition-all" placeholder="What subjects does the student need help with?" />
                  </div>
                  <button type="submit" className="w-full bg-canvas text-ink font-bold py-4 hover:bg-canvas transition-all hover:scale-100] hover:">
                    Submit Request
                  </button>
                </form>
              )}
              </LiquidGlass>
            </motion.div>
          </div>
        </motion.section>
      )}

      {activeTab === 'skills' && (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 bg-surface"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-purple-600/10 text-xs font-medium uppercase tracking-widest text-purple-600 mb-4">
                Share Your Skills
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-ink">
                Offer your talents to help neighbors in need
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-ink mb-6">Current Skill Listings</h3>
                <div className="space-y-5">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <LiquidGlass intensity="subtle" className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-ink">{skill.skill}</h4>
                        <span className="text-sm bg-canvas text-ink px-3 py-1">{skill.category}</span>
                      </div>
                      <p className="text-textsecondary mb-3">{skill.description}</p>
                      <p className="text-sm text-textsecondary mb-2">Available: {skill.availability}</p>
                      <p className="text-ink font-medium">{skill.contact}</p>
                      </LiquidGlass>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-ink mb-6">Post Your Skill</h3>
                <LiquidGlass intensity="subtle" className="p-8">
                  {skillSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                      <p className="text-ink font-bold text-lg">Thank you! Your listing has been submitted for review.</p>
                      <p className="text-textsecondary mt-2">It will appear on the site after approval.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSkillSubmitted(true); }} className="space-y-5">
                      <div>
                        <label className="text-sm font-semibold text-textprimary mb-2 block">Your Name</label>
                        <input type="text" required className="w-full px-4 py-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-sky focus:border-outline transition-all" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-textprimary mb-2 block">Skill Category</label>
                        <select required className="w-full px-4 py-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-sky focus:border-outline transition-all">
                          {skillCategories.map(c => <option key={c} value={c}>{c}</option>)}
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-textprimary mb-2 block">Skill Description</label>
                        <textarea required rows={3} className="w-full px-4 py-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-sky focus:border-outline transition-all" placeholder="Describe what you can help with..." />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-textprimary mb-2 block">Availability</label>
                        <input type="text" required className="w-full px-4 py-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-sky focus:border-outline transition-all" placeholder="e.g., Weekends, evenings" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-textprimary mb-2 block">Contact (email or phone)</label>
                        <input type="text" required className="w-full px-4 py-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-sky focus:border-outline transition-all" />
                      </div>
                      <button type="submit" className="w-full bg-canvas text-ink font-bold py-4 hover:bg-canvas transition-all hover:scale-100] hover:">
                        Submit Listing
                      </button>
                      <p className="text-xs text-textsecondary text-center">Listings are reviewed before posting. No payment processing on this site.</p>
                    </form>
                  )}
                </LiquidGlass>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </main>
  );
}
