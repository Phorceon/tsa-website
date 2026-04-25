import { useState } from 'react';
import { TreePine, Baby, Heart, Utensils, PawPrint, Home, Palette, Users, CheckCircle, BookOpen, ExternalLink, HandHeart } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { volunteerOpportunities, volunteerCauses, donationOrgs, tutors, skills, skillCategories } from '@/data/volunteers';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const causeIcons: Record<string, React.ElementType> = {
  "Environment": TreePine,
  "Youth": Baby,
  "Seniors": Heart,
  "Food Access": Utensils,
  "Animals": PawPrint,
  "Homelessness": Home,
  "Arts": Palette,
  "Community": Users,
};

export default function Volunteer() {
  const [activeCause, setActiveCause] = useState('All');
  const [activeTab, setActiveTab] = useState<'volunteer' | 'donate' | 'tutoring' | 'skills'>('volunteer');
  const [skillSubmitted, setSkillSubmitted] = useState(false);
  const [tutorSubmitted, setTutorSubmitted] = useState(false);
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal<HTMLDivElement>(0.05);

  const filteredOpportunities = activeCause === 'All'
    ? volunteerOpportunities
    : volunteerOpportunities.filter(v => v.cause === activeCause);

  const tabs = [
    { id: 'volunteer' as const, label: 'Volunteer' },
    { id: 'donate' as const, label: 'Donate' },
    { id: 'tutoring' as const, label: 'Find a Tutor' },
    { id: 'skills' as const, label: 'Offer a Skill' },
  ];

  return (
    <main id="main-content">
      {/* Page Header */}
      <section className="relative bg-navy py-20 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/volunteer-hero.jpg" alt="Volunteers working together" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className={`reveal ${headerRevealed ? 'revealed' : ''}`}>
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-sky mb-3">Volunteer & Give Back</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Make a Difference in Tracy</h1>
            <p className="text-lg text-white/80 max-w-2xl">Whether you have an hour or a skill to share, your contribution matters.</p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-navy text-navy'
                    : 'border-transparent text-textsecondary hover:text-navy'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Volunteer Opportunities */}
      {activeTab === 'volunteer' && (
        <section className="py-16 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Volunteer Opportunities" title="Local organizations seeking dedicated helpers" />
            <div className="mt-8 mb-8">
              <div className="flex flex-wrap gap-2">
                {volunteerCauses.map((cause) => (
                  <button
                    key={cause}
                    onClick={() => setActiveCause(cause)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCause === cause
                        ? 'bg-navy text-white'
                        : 'bg-lightgray text-textsecondary hover:bg-navy-light hover:text-navy'
                    }`}
                  >
                    {cause}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {filteredOpportunities.map((opp) => {
                const Icon = causeIcons[opp.cause] || HandHeart;
                return (
                  <div key={opp.id} className="bg-white rounded-lg border border-border p-6 card-hover">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-sky/10 text-sky">
                            <Icon className="w-3 h-3" />
                            {opp.cause}
                          </span>
                          <span className="text-xs text-textsecondary">{opp.commitment}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-navy mb-2">{opp.organization}</h3>
                        <p className="text-sm text-textsecondary mb-3">{opp.description}</p>
                        <p className="text-sm text-textsecondary">{opp.contact}</p>
                      </div>
                      {opp.applyUrl ? (
                        <a
                          href={opp.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1.5 bg-navy text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-dark transition-colors text-sm self-start"
                        >
                          Apply
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-1.5 bg-lightgray text-textsecondary font-semibold px-5 py-2.5 rounded-lg text-sm self-start">
                          Contact for Details
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Donations */}
      {activeTab === 'donate' && (
        <section className="py-16 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Make a Donation" title="Support organizations making a real impact" />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {donationOrgs.map((org) => (
                <div key={org.id} className="bg-white rounded-lg border border-border p-6 card-hover flex flex-col">
                  <HandHeart className="w-10 h-10 text-sky mb-4" />
                  <h3 className="text-lg font-semibold text-navy mb-2">{org.name}</h3>
                  <p className="text-sm text-textsecondary mb-4 flex-1">{org.description}</p>
                  <ul className="space-y-2 mb-6">
                    {org.impact.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-textsecondary">
                        <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={org.donateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-success text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Donate Now
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-navy-light rounded-lg p-6 text-center">
              <p className="text-sm text-navy">
                <span className="font-semibold">In-Kind Donations:</span> Many organizations also need hygiene products, non-perishable food, clothing, and household items. Contact them directly to arrange drop-off.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Tutoring */}
      {activeTab === 'tutoring' && (
        <section className="py-16 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Free & Low-Cost Tutoring" title="Connect with local tutors and mentoring programs" />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutors.map((tutor) => (
                <div key={tutor.id} className="bg-white rounded-lg border border-border p-6 card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <BookOpen className="w-8 h-8 text-sky" />
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tutor.cost === 'Free' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                      {tutor.cost}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{tutor.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tutor.subjects.map((s) => (
                      <span key={s} className="text-xs bg-navy-light text-navy px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="space-y-1.5 text-sm text-textsecondary mb-4">
                    <p><span className="font-medium text-textprimary">Grades:</span> {tutor.gradeLevels}</p>
                    <p><span className="font-medium text-textprimary">Schedule:</span> {tutor.availability}</p>
                    <p>{tutor.description}</p>
                    <p className="font-medium text-navy">{tutor.contact}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Request a Tutor Form */}
            <div className="mt-12 max-w-xl mx-auto bg-white rounded-lg border border-border p-8">
              <h3 className="text-xl font-semibold text-navy mb-4 text-center">Request a Tutor</h3>
              {tutorSubmitted ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
                  <p className="text-navy font-medium">Thank you! Your request has been submitted.</p>
                  <p className="text-sm text-textsecondary mt-1">A tutor coordinator will contact you within 2-3 business days.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setTutorSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-textprimary mb-1 block">Your Name</label>
                    <input type="text" required className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-textprimary mb-1 block">Email</label>
                    <input type="email" required className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-textprimary mb-1 block">Student Grade</label>
                    <select required className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky">
                      <option value="">Select grade</option>
                      {['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(g => <option key={g} value={g}>{g === 'K' ? 'Kindergarten' : `Grade ${g}`}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-textprimary mb-1 block">Subject Needs</label>
                    <textarea required rows={3} className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky" placeholder="What subjects does the student need help with?" />
                  </div>
                  <button type="submit" className="w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-navy-dark transition-colors">
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Offer a Skill */}
      {activeTab === 'skills' && (
        <section className="py-16 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Share Your Skills" title="Offer your talents to help neighbors in need" />
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Listings */}
              <div>
                <h3 className="text-lg font-semibold text-navy mb-4">Current Skill Listings</h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="bg-white rounded-lg border border-border p-5 card-hover">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-navy">{skill.skill}</h4>
                        <span className="text-xs bg-navy-light text-navy px-2 py-0.5 rounded-full">{skill.category}</span>
                      </div>
                      <p className="text-sm text-textsecondary mb-2">{skill.description}</p>
                      <p className="text-xs text-textsecondary mb-3">Available: {skill.availability}</p>
                      <p className="text-sm text-sky">{skill.contact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post Your Skill Form */}
              <div>
                <h3 className="text-lg font-semibold text-navy mb-4">Post Your Skill</h3>
                <div className="bg-white rounded-lg border border-border p-6">
                  {skillSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
                      <p className="text-navy font-medium">Thank you! Your listing has been submitted for review.</p>
                      <p className="text-sm text-textsecondary mt-1">It will appear on the site after approval.</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSkillSubmitted(true); }} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-textprimary mb-1 block">Your Name</label>
                        <input type="text" required className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-textprimary mb-1 block">Skill Category</label>
                        <select required className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky">
                          {skillCategories.map(c => <option key={c} value={c}>{c}</option>)}
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-textprimary mb-1 block">Skill Description</label>
                        <textarea required rows={3} className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky" placeholder="Describe what you can help with..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-textprimary mb-1 block">Availability</label>
                        <input type="text" required className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky" placeholder="e.g., Weekends, evenings" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-textprimary mb-1 block">Contact (email or phone)</label>
                        <input type="text" required className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky" />
                      </div>
                      <button type="submit" className="w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-navy-dark transition-colors">
                        Submit Listing
                      </button>
                      <p className="text-xs text-textsecondary text-center">Listings are reviewed before posting. No payment processing on this site.</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
