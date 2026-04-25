import { icons as i } from './icons.js';
import * as D from './data.js';

const L = (path, text, cls = '') => `<a href="#${path}" class="${cls}">${text}</a>`;

export function formatEventDate(d) {
  const dateObj = new Date(d + 'T00:00:00');
  return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function eventCatClass(cat) {
  const m = {
    Arts: 'cat-arts',
    Sports: 'cat-sports',
    Education: 'cat-education',
    Health: 'cat-health',
    Family: 'cat-family',
    Senior: 'cat-senior',
    Youth: 'cat-youth',
    Food: 'cat-food',
    Environment: 'cat-environment',
    Culture: 'cat-culture',
  };
  return m[cat] || 'cat-family';
}

function resourceCatClass(cat) {
  const m = {
    Housing: 'rc-housing',
    'Food & Basic Needs': 'rc-food',
    Education: 'rc-education',
    Employment: 'rc-employment',
    'Legal Aid': 'rc-legal',
    Health: 'rc-health',
    Seniors: 'rc-seniors',
    Youth: 'rc-youth',
    Environment: 'rc-env',
    Community: 'rc-community',
    Fitness: 'rc-fitness',
    Clothing: 'rc-clothing',
    Family: 'rc-family',
    Sports: 'rc-sports',
  };
  return m[cat] || 'rc-default';
}

function ageGroupClass(ag) {
  const m = { Kids: 'rc-education', Teen: 'cat-arts', Adult: 'cat-family', Senior: 'cat-senior', 'All Ages': 'rc-food' };
  return m[ag] || 'cat-family';
}

function programCatClass(c) {
  const m = { Sports: 'cat-sports', Arts: 'cat-arts', STEM: 'cat-education', Fitness: 'cat-health', Social: 'cat-youth', Education: 'cat-family' };
  return m[c] || 'cat-family';
}

function sectionHeader(eyebrow, title, subtitle = '', align = 'center') {
  const ac = align === 'center' ? 'text-center' : 'text-left';
  const sub = subtitle
    ? `<p class="section-subtitle ${align === 'center' ? 'mx' : ''}">${subtitle}</p>`
    : '';
  return `<div class="reveal revealed ${ac}"><span class="section-eyebrow">${eyebrow}</span><h2 class="section-title">${title}</h2>${sub}</div>`;
}

function eventCard(ev, index = 0) {
  const isFull = ev.capacity !== 999 && ev.attending >= ev.capacity;
  const percent = ev.capacity === 999 ? 0 : Math.min((ev.attending / ev.capacity) * 100, 100);
  const dly = Math.min(index + 1, 5);
  const rsvp = ev.rsvpUrl
    ? `<a href="${ev.rsvpUrl}" target="_blank" rel="noopener noreferrer" class="btn ${isFull ? '' : 'btn-success'}" style="${isFull ? 'background:var(--lightgray);color:var(--text-secondary);pointer-events:none' : ''}">${isFull ? 'Event Full' : 'RSVP Now'} ${!isFull ? i.externalLink : ''}</a>`
    : `<span class="btn" style="background:var(--lightgray);color:var(--text-secondary);cursor:default">Open Attendance</span>`;
  const cap =
    ev.capacity !== 999
      ? `<div style="margin-bottom:1rem"><div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:0.25rem"><span style="display:flex;align-items:center;gap:0.25rem;color:var(--text-secondary)">${i.users} ${ev.attending} / ${ev.capacity} attending</span><span class="${percent > 80 ? 'text-warning' : ''}" style="color:${percent > 80 ? 'var(--warning)' : 'var(--success)'};font-weight:500">${percent > 80 ? 'Almost Full' : 'Spaces Available'}</span></div><div class="progress-track"><div class="progress-fill" style="width:${percent}%;background:${percent > 80 ? 'var(--warning)' : 'var(--success)'}"></div></div></div>`
      : '';
  return `<div class="reveal reveal-delay-${dly} card card-hover" data-reveal><div style="position:relative;height:10rem;overflow:hidden"><img src="${ev.image}" alt="${ev.name}" style="width:100%;height:100%;object-fit:cover" loading="lazy"/><span class="badge ${eventCatClass(ev.category)}" style="position:absolute;top:0.75rem;left:0.75rem">${ev.category}</span></div><div class="card-body"><div style="display:flex;align-items:center;gap:0.5rem;color:var(--sky);font-size:0.875rem;margin-bottom:0.5rem">${i.calendar}<span style="font-weight:500">${formatEventDate(ev.date)} • ${ev.time}</span></div><h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin:0 0 0.5rem">${ev.name}</h3><div style="display:flex;align-items:center;gap:0.5rem;color:var(--text-secondary);font-size:0.875rem;margin-bottom:0.75rem">${i.mapPin}<span>${ev.location}</span></div><p class="line-clamp-2" style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 1rem">${ev.description}</p>${cap}${rsvp}</div></div>`;
}

function resourceCard(r, index = 0) {
  const cats = r.categories.map((c) => `<span class="badge ${resourceCatClass(c)}" style="font-size:0.75rem;padding:0.125rem 0.5rem;border-radius:9999px">${c}</span>`).join('');
  const phone = r.phone ? `<div style="display:flex;align-items:center;gap:0.5rem;color:var(--text-secondary);font-size:0.875rem">${i.phone}<a href="tel:${r.phone}">${r.phone}</a></div>` : '';
  const addr = r.address ? `<div style="display:flex;align-items:center;gap:0.5rem;color:var(--text-secondary);font-size:0.875rem">${i.mapPin}<span>${r.address}</span></div>` : '';
  const hours = r.hours ? `<div style="display:flex;align-items:center;gap:0.5rem;color:var(--text-secondary);font-size:0.875rem">${i.clock}<span>${r.hours}</span></div>` : '';
  const web = r.website
    ? `<div style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem">${i.externalLink}<a href="${r.website}" target="_blank" rel="noopener noreferrer" style="color:var(--sky)">Visit Website</a></div>`
    : '';
  const dly = Math.min(index + 1, 5);
  return `<div class="reveal reveal-delay-${dly} card card-hover" data-reveal><div class="card-body"><div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem">${cats}</div><h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin:0 0 0.5rem">${r.name}</h3><p class="line-clamp-3" style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 1rem">${r.description}</p><div style="display:flex;flex-direction:column;gap:0.375rem">${phone}${addr}${hours}${web}</div></div></div>`;
}

function programCard(p, index = 0) {
  const isOpen = p.totalSpots === 999;
  const isLow = !isOpen && p.spotsLeft <= 5 && p.spotsLeft > 0;
  const isFull = !isOpen && p.spotsLeft === 0;
  const startLabel =
    p.startDate === 'Ongoing' ? 'Ongoing enrollment' : `Begins ${new Date(p.startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  const spot = !isOpen
    ? `<span style="font-size:0.75rem;font-weight:500;display:flex;align-items:center;gap:0.25rem;color:${isFull ? 'var(--error)' : isLow ? 'var(--warning)' : 'var(--success)'}">${i.users}${isFull ? 'Waitlist Only' : `${p.spotsLeft} spot${p.spotsLeft !== 1 ? 's' : ''} left`}</span>`
    : `<span style="font-size:0.75rem;font-weight:500;color:var(--success)">Open enrollment</span>`;
  const reg = p.registerUrl
    ? `<a href="${p.registerUrl}" target="_blank" rel="noopener noreferrer" class="btn ${isFull ? '' : 'btn-success'}" style="width:100%;${isFull ? 'background:var(--lightgray);color:var(--text-secondary);pointer-events:none' : ''}">${isFull ? 'Join Waitlist' : 'Register Now'}</a>`
    : `<span class="btn" style="width:100%;background:var(--lightgray);color:var(--text-secondary)">Registration Closed</span>`;
  const dly = Math.min(index + 1, 5);
  return `<div class="reveal reveal-delay-${dly} card card-hover" data-reveal><div style="position:relative;height:9rem;overflow:hidden"><img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover"/><span class="badge ${ageGroupClass(p.ageGroup)}" style="position:absolute;top:0.75rem;right:0.75rem;font-size:0.75rem">${p.ageGroup}</span><span class="badge ${programCatClass(p.category)}" style="position:absolute;top:0.75rem;left:0.75rem;font-size:0.75rem">${p.category}</span></div><div class="card-body"><h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin:0 0 0.5rem">${p.name}</h3><div style="font-size:0.875rem;margin-bottom:0.75rem"><div style="display:flex;align-items:center;gap:0.5rem;color:var(--text-secondary)">${i.clock}<span>${p.schedule}</span></div><div style="display:flex;align-items:center;gap:0.5rem;color:var(--sky);font-weight:500">${i.calendar}<span>${startLabel}</span></div></div><div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem"><span class="badge" style="background:${p.cost === 'Free' ? 'rgba(22,163,74,0.1)' : 'var(--navy-light)'};color:${p.cost === 'Free' ? 'var(--success)' : 'var(--navy)'};font-size:0.75rem">${p.cost}</span>${spot}</div><p class="line-clamp-2" style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 1rem">${p.description}</p>${reg}</div></div>`;
}

function therapistCard(t, index = 0) {
  const initials = t.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const status = t.acceptingNew
    ? `${i.checkCircle}<span style="font-size:0.75rem;font-weight:500;color:var(--success)">Accepting new patients</span>`
    : `${i.clock}<span style="font-size:0.75rem;font-weight:500;color:var(--warning)">Waitlist</span>`;
  const specs = t.specialties.map((s) => `<span style="font-size:0.75rem;background:var(--navy-light);color:var(--navy);padding:0.125rem 0.5rem;border-radius:9999px">${s}</span>`).join('');
  const addr = t.address ? `<div style="display:flex;align-items:center;gap:0.25rem;font-size:0.875rem;color:var(--text-secondary)">${i.mapPin}${t.address}</div>` : '';
  const dly = Math.min(index + 1, 5);
  const btns = `${t.phone ? `<a href="tel:${t.phone}" class="btn btn-outline-navy" style="flex:1;font-size:0.875rem;padding:0.5rem">${i.phone} Contact</a>` : ''}${t.website ? `<a href="${t.website}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-navy" style="flex:1;font-size:0.875rem;padding:0.5rem">${i.globe} Website</a>` : ''}`;
  return `<div class="reveal reveal-delay-${dly} card card-hover" data-reveal><div class="card-body"><div style="display:flex;gap:1rem;margin-bottom:1rem"><div style="width:3.5rem;height:3.5rem;border-radius:9999px;background:var(--navy-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;color:var(--navy)">${initials}</div><div style="flex:1;min-width:0"><h3 style="margin:0;font-size:1.125rem;font-weight:600;color:var(--navy)">${t.name}</h3><p style="margin:0;font-size:0.875rem;color:var(--text-secondary)">${t.credentials}</p><div style="display:flex;align-items:center;gap:0.375rem;margin-top:0.25rem">${status}</div></div></div><div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1rem"><div><span style="font-size:0.75rem;font-weight:500;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em">Specialties</span><div style="display:flex;flex-wrap:wrap;gap:0.375rem;margin-top:0.25rem">${specs}</div></div><div><span style="font-size:0.75rem;font-weight:500;color:var(--text-secondary);text-transform:uppercase">Insurance</span><p style="margin:0.125rem 0 0;font-size:0.875rem">${t.insurance.join(', ')}</p></div><div style="display:flex;gap:1.5rem"><div><span style="font-size:0.75rem;color:var(--text-secondary);text-transform:uppercase">Languages</span><p style="margin:0.125rem 0 0;font-size:0.875rem">${t.languages.join(', ')}</p></div><div><span style="font-size:0.75rem;color:var(--text-secondary);text-transform:uppercase">Format</span><p style="margin:0.125rem 0 0;font-size:0.875rem">${t.format.join(' & ')}</p></div></div>${addr}</div><div style="display:flex;gap:0.5rem">${btns}</div></div></div>`;
}

function breathingBlock(id, type, title, desc) {
  const phases = type === 'box' ? ['Inhale', 'Hold', 'Exhale', 'Hold'] : ['Inhale', 'Hold', 'Exhale'];
  const phaseDur = type === 'box' ? '4s' : '';
  const phaseLabels = type === 'box' ? phases.map((p) => `${p} 4s`).join(' · ') : 'Inhale 4s · Hold 7s · Exhale 8s';
  return `<div class="card"><div class="card-body"><h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin:0 0 0.25rem">${title}</h3><p style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 1.5rem">${desc}</p><div style="display:flex;flex-direction:column;align-items:center;margin-bottom:1.5rem"><div style="position:relative;width:10rem;height:10rem;display:flex;align-items:center;justify-content:center;margin-bottom:1rem"><div class="breathe-ring" id="${id}-ring" aria-hidden="true"></div><div class="breathe-inner" id="${id}-label">Inhale</div></div><p style="font-size:0.875rem;color:var(--text-secondary);text-align:center">${phaseLabels}</p></div>${type === 'box' ? `<div style="text-align:center;margin-bottom:1rem"><span id="${id}-timer" style="font-size:1.125rem;font-family:monospace;color:var(--navy)">04:00</span></div>` : ''}<div style="display:flex;justify-content:center;gap:0.75rem"><button type="button" class="btn btn-navy" data-breathe-toggle="${id}" data-breathe-type="${type}">${i.play} Start</button><button type="button" class="btn btn-outline-navy" data-breathe-reset="${id}" data-breathe-type="${type}">${i.rotateCcw} Reset</button></div></div></div>`;
}

export function renderHome() {
  const upcoming = D.events.slice(0, 3);
  return `<main id="main-content"><section style="position:relative;min-height:85vh;display:flex;align-items:center;overflow:hidden"><div style="position:absolute;inset:0"><img src="./images/hero-home.jpg" alt="Aerial view of Tracy, California" style="width:100%;height:100%;object-fit:cover"/><div style="position:absolute;inset:0;background:rgba(21,58,107,0.7)"></div></div><div class="container" style="position:relative;z-index:10;width:100%;padding-top:5rem;padding-bottom:5rem"><div class="reveal revealed" data-reveal style="max-width:42rem"><span class="section-eyebrow" style="color:var(--sky)">Welcome to Tracy</span><h1 style="font-size:2.25rem;font-weight:700;color:#fff;margin:0 0 1.5rem;line-height:1.15">Your Community.<br/>Your Resources.<br/>Your Home.</h1><p style="font-size:1.125rem;color:rgba(255,255,255,0.8);margin:0 0 2rem;max-width:36rem">Connecting Tracy residents with local services, events, mental health support, and opportunities to give back.</p><div style="display:flex;flex-wrap:wrap;gap:1rem">${L(
    '/resources',
    `Find Resources ${i.arrowRight}`,
    'btn btn-sky'
  )}${L('/events', 'Explore Events', 'btn btn-white-outline')}</div></div><div class="reveal reveal-delay-3 revealed grid-3" data-reveal style="margin-top:4rem;max-width:42rem"><div class="reveal revealed card" style="padding:1rem;display:flex;align-items:center;gap:0.75rem"><div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:var(--navy-light);display:flex;align-items:center;justify-content:center;color:var(--navy)">${i.building2}</div><div><p style="font-size:1.5rem;font-weight:700;color:var(--navy);margin:0">50+</p><p style="font-size:0.75rem;color:var(--text-secondary);margin:0">Resources</p></div></div><div class="card" style="padding:1rem;display:flex;align-items:center;gap:0.75rem"><div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:var(--navy-light);display:flex;align-items:center;justify-content:center;color:var(--navy)">${i.calendar}</div><div><p style="font-size:1.5rem;font-weight:700;color:var(--navy);margin:0">12</p><p style="font-size:0.75rem;color:var(--text-secondary);margin:0">Upcoming Events</p></div></div><div class="card" style="padding:1rem;display:flex;align-items:center;gap:0.75rem"><div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:var(--navy-light);display:flex;align-items:center;justify-content:center;color:var(--navy)">${i.handHeart}</div><div><p style="font-size:1.5rem;font-weight:700;color:var(--navy);margin:0">200+</p><p style="font-size:0.75rem;color:var(--text-secondary);margin:0">Volunteers</p></div></div></div></div></section><section style="padding:5rem 0;background:var(--offwhite)"><div class="container">${sectionHeader(
    'Explore the Center',
    'Everything you need, all in one place',
    'Browse resources, find support, discover events, and get involved in your community.'
  )}<div style="margin-top:3rem" class="grid-3">${[
    [i.building2, 'Community Resources', 'Housing, food, legal aid, and more', '/resources', 'var(--navy)'],
    [i.heart, 'Mental Health', 'Find therapists, crisis support, and self-care tools', '/mental-health', 'var(--success)'],
    [i.calendar, 'Events', 'Discover local events and RSVP', '/events', 'var(--sky)'],
    [i.handHeart, 'Volunteer', 'Give back through volunteering and donations', '/volunteer', 'var(--warning)'],
    [i.star, 'Programs', 'Register for classes, sports, and activities', '/programs', '#9333ea'],
    [i.phone, 'Get Help', 'Emergency contacts and immediate assistance', '/mental-health', 'var(--error)'],
  ]
    .map(
      ([ic, title, desc, path, bg], idx) => `<a href="#${path}" class="reveal reveal-delay-${Math.min(idx + 1, 5)} revealed card card-hover" data-reveal style="padding:1.5rem;display:flex;align-items:flex-start;gap:1rem;text-decoration:none;color:inherit"><div style="width:3rem;height:3rem;border-radius:9999px;background:${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff">${ic}</div><div style="flex:1"><h3 style="font-weight:600;color:var(--navy);margin:0 0 0.25rem">${title}</h3><p style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 0.5rem">${desc}</p><span style="display:inline-flex;align-items:center;gap:0.25rem;font-size:0.875rem;color:var(--sky);font-weight:500">Explore ${i.arrowRight}</span></div></a>`
    )
    .join('')}</div></div></section><section style="padding:5rem 0;background:var(--lightgray)"><div class="container"><div class="grid-2" style="align-items:center"><div style="overflow:hidden;border-radius:0.75rem"><img src="./images/event-tracy-earth-day.jpg" alt="Tracy Earth Day community event" style="width:100%;height:24rem;object-fit:cover"/></div><div><span class="section-eyebrow">Featured Event</span><h2 class="section-title">6th Annual Tracy Connects</h2><div style="color:var(--text-secondary);margin-bottom:1rem"><p style="display:flex;align-items:center;gap:0.5rem;margin:0.25rem 0">${i.calendar}<span>Saturday, September 19, 2026 • 9:00 AM – 3:00 PM</span></p><p style="display:flex;align-items:center;gap:0.5rem;margin:0.25rem 0">${i.users}<span>Lincoln Park, Tracy</span></p></div><p style="color:var(--text-secondary);line-height:1.6;margin-bottom:1.5rem">Join us for Tracy's largest community resource fair. Theme: "Living Your Best Life in Tracy: Bridging the Digital Divide — Youth and Seniors." Connect with local nonprofits, discover volunteer opportunities, and enjoy family-friendly activities.</p><div style="display:flex;flex-wrap:wrap;gap:1rem">${L('/events', 'RSVP Now', 'btn btn-success')}${L('/events', 'View All Events', 'btn btn-outline-navy')}</div></div></div></div></section><section style="padding:5rem 0;background:var(--navy);color:#fff"><div class="container text-center" style="max-width:48rem"><div class="reveal revealed" data-reveal>${i.heart.replace('class="icon"', 'class="icon" style="width:2.5rem;height:2.5rem;color:var(--sky);margin:0 auto 1.5rem;display:block"')}<blockquote style="font-size:1.25rem;font-weight:500;font-style:italic;line-height:1.6;margin:0 0 1.5rem">"The Tracy Community Center exists to ensure every resident has access to the resources, connections, and support they need to thrive."</blockquote><p style="color:rgba(255,255,255,0.6);font-size:0.875rem;margin-bottom:3rem">— Tracy Community Center Mission</p><div class="grid-3" style="text-align:center">${[
    [i.link2, 'Connect', 'Bridging residents to local services'],
    [i.shield, 'Support', 'Mental health and crisis resources'],
    [i.rocket, 'Empower', 'Programs that build skills and community'],
  ]
    .map(
      ([ic, t, d]) => `<div><div style="width:3rem;height:3rem;border-radius:9999px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;color:var(--sky)">${ic}</div><h3 style="font-weight:600;font-size:1.125rem;margin:0 0 0.25rem">${t}</h3><p style="color:rgba(255,255,255,0.6);font-size:0.875rem;margin:0">${d}</p></div>`
    )
    .join('')}</div></div></div></section><section style="padding:5rem 0;background:var(--offwhite)"><div class="container">${sectionHeader("Upcoming Events", "Don't miss what's happening in Tracy")}<div class="grid-3" style="margin-top:3rem">${upcoming.map((e, idx) => eventCard(e, idx)).join('')}</div><div class="text-center" style="margin-top:2.5rem">${L('/events', `View Full Calendar ${i.arrowRight}`, 'btn btn-navy')}</div></div></section><section style="padding:1.5rem 0;background:#fffbeb;border-top:1px solid #fde68a;border-bottom:1px solid #fde68a"><div class="container"><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.75rem;text-align:center">${i.alertTriangle}<p style="margin:0;color:var(--text-primary)"><strong>Need immediate help?</strong> Call <a href="tel:988" style="color:var(--navy);font-weight:600;text-decoration:underline">988 Suicide & Crisis Lifeline</a> or text <strong>HOME</strong> to <strong>741741</strong></p>${L('/mental-health', 'Mental Health Resources →', 'btn-ghost')}</div></div></section></main>`;
}

export function renderResources(state) {
  const { activeFilters, searchQuery: sq } = state;
  const searchQuery = sq ?? '';
  const filtered = D.resources.filter((resource) => {
    const matchesCategory = activeFilters.length === 0 || resource.categories.some((cat) => activeFilters.includes(cat));
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      !q ||
      resource.name.toLowerCase().includes(q) ||
      resource.description.toLowerCase().includes(q) ||
      resource.categories.some((cat) => cat.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });
  const pills = D.resourceCategories
    .map((cat) => {
      const isActive = cat === 'All' ? activeFilters.length === 0 : activeFilters.includes(cat);
      return `<button type="button" class="filter-pill${isActive ? ' is-active' : ''}" data-res-cat="${cat}">${cat}</button>`;
    })
    .join('');
  const clear =
    activeFilters.length > 0 || searchQuery
      ? `<button type="button" class="filter-pill" style="background:transparent;border:none;color:rgba(255,255,255,0.7)" data-res-clear>${i.x} Clear Filters</button>`
      : '';
  const grid =
    filtered.length > 0
      ? `<div class="grid-3">${filtered.map((r, i) => resourceCard(r, i % 6)).join('')}</div>`
      : `<div class="text-center" style="padding:5rem 0">${i.building2}<h3 style="font-size:1.25rem;font-weight:600;color:var(--navy)">No resources match your search</h3><p style="color:var(--text-secondary)">Try adjusting your filters or search terms.</p><button type="button" class="btn btn-navy" data-res-clear>${i.x} Clear All Filters</button></div>`;
  return `<main id="main-content"><section class="page-hero" style="padding-bottom:4rem"><div class="container"><div class="reveal revealed" data-reveal><span class="section-eyebrow">Community Resources</span><h1>Find the Help You Need</h1><p>Browse housing, food, legal aid, education, and more. Filter by category or search by keyword.</p></div><div style="margin-top:2.5rem"><div class="filter-pills" style="margin-bottom:1rem">${pills}</div><div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap"><div style="position:relative"><span style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.5)">${i.search}</span><input type="search" data-res-search value="${searchQuery.replace(/"/g, '&quot;')}" placeholder="Search resources..." style="width:16rem;padding:0.5rem 0.75rem 0.5rem 2.25rem;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.2);border-radius:0.5rem;color:#fff;font-size:0.875rem"/></div>${clear}</div></div></div></section><section style="padding:3rem 0 5rem;background:var(--offwhite)"><div class="container">${grid}</div></section></main>`;
}

export function renderEvents(state) {
  const { activeCategory, dateFilter, sortBy, viewMode } = state;
  let filtered = [...D.events];
  if (activeCategory !== 'All') filtered = filtered.filter((e) => e.category === activeCategory);
  const now = new Date();
  if (dateFilter === 'this-week') {
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);
    filtered = filtered.filter((e) => new Date(e.date) >= now && new Date(e.date) <= weekEnd);
  } else if (dateFilter === 'this-month') {
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    filtered = filtered.filter((e) => new Date(e.date) >= now && new Date(e.date) <= monthEnd);
  } else if (dateFilter === 'next-3-months') {
    const end = new Date(now);
    end.setMonth(end.getMonth() + 3);
    filtered = filtered.filter((e) => new Date(e.date) >= now && new Date(e.date) <= end);
  }
  if (sortBy === 'date') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  else filtered.sort((a, b) => b.attending - a.attending);
  const cats = D.eventCategories.map((c) => `<button type="button" class="filter-pill${activeCategory === c ? ' is-active' : ''}" data-ev-cat="${c}">${c}</button>`).join('');
  const df = D.eventDateFilters.map((f) => `<option value="${f.value}"${dateFilter === f.value ? ' selected' : ''}>${f.label}</option>`).join('');
  const clear = activeCategory !== 'All' || dateFilter !== 'all' ? `<button type="button" class="filter-pill" style="background:transparent;color:rgba(255,255,255,0.7)" data-ev-clear>Clear Filters</button>` : '';
  const listHtml = filtered
    .map((event) => {
      const dateStr = formatEventDate(event.date);
      const rsvp = event.rsvpUrl
        ? `<a href="${event.rsvpUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-success" style="font-size:0.875rem;padding:0.375rem 1rem">RSVP</a>`
        : `<span style="font-size:0.875rem;color:var(--text-secondary)">Open attendance</span>`;
      return `<div class="card card-hover" style="padding:1rem;display:flex;flex-direction:column;gap:1rem"><div style="width:100%;height:8rem;overflow:hidden;border-radius:0.5rem;flex-shrink:0"><img src="${event.image}" alt="${event.name}" style="width:100%;height:100%;object-fit:cover" loading="lazy"/></div><div style="flex:1"><div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem"><span class="badge-sky-soft" style="font-size:0.75rem;font-weight:600;padding:0.125rem 0.5rem;border-radius:9999px">${event.category}</span><span style="font-size:0.75rem;color:var(--text-secondary)">${dateStr} • ${event.time}</span></div><h3 style="font-weight:600;color:var(--navy);margin:0 0 0.25rem">${event.name}</h3><p class="line-clamp-2" style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 0.5rem">${event.description}</p>${rsvp}</div></div>`;
    })
    .join('');
  const gridHtml = filtered.map((e, idx) => eventCard(e, idx % 6)).join('');
  const body =
    filtered.length > 0
      ? viewMode === 'grid'
        ? `<div class="grid-3">${gridHtml}</div>`
        : `<div style="display:flex;flex-direction:column;gap:1rem">${listHtml}</div>`
      : `<div class="text-center" style="padding:5rem 0">${i.calendar}<h3 style="color:var(--navy)">No events found</h3><p style="color:var(--text-secondary)">Try adjusting your filters.</p><button type="button" class="btn btn-navy" data-ev-clear>Clear All Filters</button></div>`;
  return `<main id="main-content"><section class="page-hero"><div class="container"><div class="reveal revealed" data-reveal><span class="section-eyebrow">Community Events</span><h1>What's Happening in Tracy</h1><p>Discover local events, festivals, workshops, and gatherings. Filter by category or date.</p></div><div style="margin-top:2.5rem;display:flex;flex-direction:column;gap:1rem"><div class="filter-pills">${cats}</div><div style="display:flex;flex-wrap:wrap;align-items:center;gap:1rem"><div style="display:flex;align-items:center;gap:0.5rem;color:rgba(255,255,255,0.6)">${i.calendar}<select data-ev-date class="filter-pill" style="color:#fff">${df}</select></div><select data-ev-sort class="filter-pill" style="color:#fff"><option value="date"${sortBy === 'date' ? ' selected' : ''}>Sort by Date</option><option value="popularity"${sortBy === 'popularity' ? ' selected' : ''}>Sort by Popularity</option></select>${clear}</div></div></div></section><section style="padding:3rem 0 5rem;background:var(--offwhite)"><div class="container"><div style="display:flex;justify-content:flex-end;margin-bottom:1.5rem"><div class="view-toggle"><button type="button" data-ev-view="grid" class="${viewMode === 'grid' ? 'is-active' : ''}">${i.layoutGrid} Grid</button><button type="button" data-ev-view="list" class="${viewMode === 'list' ? 'is-active' : ''}">${i.list} List</button></div></div>${body}</div></section></main>`;
}

export function renderPrograms(state) {
  const { ageFilter, categoryFilter, costFilter } = state;
  const filtered = D.programs.filter((p) => {
    const matchAge = ageFilter === 'All' || p.ageGroup === ageFilter;
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchCost = costFilter === 'All' || (costFilter === 'Free' && p.cost === 'Free') || (costFilter === 'Paid' && p.cost !== 'Free');
    return matchAge && matchCat && matchCost;
  });
  const hasF = ageFilter !== 'All' || categoryFilter !== 'All' || costFilter !== 'All';
  const ageBtns = D.programAgeGroups.map((a) => `<button type="button" class="filter-pill${ageFilter === a ? ' is-active' : ''}" data-pr-age="${a}">${a}</button>`).join('');
  const catBtns = D.programCategories.map((c) => `<button type="button" class="filter-pill${categoryFilter === c ? ' is-active' : ''}" data-pr-cat="${c}">${c}</button>`).join('');
  const costBtns = D.programCosts.map((c) => `<button type="button" class="filter-pill${costFilter === c ? ' is-active' : ''}" data-pr-cost="${c}">${c}</button>`).join('');
  const clear = hasF ? `<button type="button" class="filter-pill" style="background:transparent;color:rgba(255,255,255,0.7)" data-pr-clear>Clear Filters</button>` : '';
  const grid =
    filtered.length > 0
      ? `<div class="grid-3">${filtered.map((p, i) => programCard(p, i % 6)).join('')}</div>`
      : `<div class="text-center" style="padding:5rem 0">${i.info}<h3 style="color:var(--navy)">No programs found</h3><button type="button" class="btn btn-navy" data-pr-clear>Clear All Filters</button></div>`;
  return `<main id="main-content"><section class="page-hero"><div class="container"><div class="reveal revealed" data-reveal><span class="section-eyebrow">Community Programs</span><h1>Programs for Every Age</h1><p>Sports, arts, STEM, fitness, and social programs running year-round at the Tracy Community Center.</p></div><div style="margin-top:2.5rem;display:flex;flex-direction:column;gap:1rem"><div><span style="font-size:0.75rem;color:rgba(255,255,255,0.6);text-transform:uppercase">Age Group</span><div class="filter-pills" style="margin-top:0.25rem">${ageBtns}</div></div><div><span style="font-size:0.75rem;color:rgba(255,255,255,0.6);text-transform:uppercase">Category</span><div class="filter-pills" style="margin-top:0.25rem">${catBtns}</div></div><div style="display:flex;flex-wrap:wrap;align-items:center;gap:1rem"><div><span style="font-size:0.75rem;color:rgba(255,255,255,0.6);text-transform:uppercase">Cost</span><div class="filter-pills" style="margin-top:0.25rem">${costBtns}</div></div>${clear}</div></div></div></section><section style="padding:3rem 0 5rem;background:var(--offwhite)"><div class="container">${grid}</div></section><section style="background:var(--navy-light);padding:2rem 0"><div class="container text-center" style="max-width:48rem"><div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;margin-bottom:0.75rem;color:var(--navy)">${i.info}<h3 style="margin:0;font-size:1rem;font-weight:600;color:var(--navy)">How to Register</h3></div><p style="color:rgba(30,77,140,0.8);margin-bottom:1rem">Most programs can be registered online at tracyartsandrec.com or by calling 209-831-6200. Walk-in registration is also available at the Tracy Community Center.</p><a href="https://tracyartsandrec.com" target="_blank" rel="noopener noreferrer" class="btn btn-navy">${i.externalLink} Visit TracyArtsandRec.com</a></div></section></main>`;
}

export function renderMentalHealth(state) {
  const { specialtyFilter, insuranceFilter, languageFilter, formatFilter } = state;
  const filtered = D.therapists.filter((t) => {
    const ms = specialtyFilter === 'All' || t.specialties.includes(specialtyFilter);
    const mi = insuranceFilter === 'All' || t.insurance.includes(insuranceFilter);
    const ml = languageFilter === 'All' || t.languages.includes(languageFilter);
    let mf = true;
    if (formatFilter === 'In-person') mf = t.format.includes('In-person');
    else if (formatFilter === 'Telehealth') mf = t.format.includes('Telehealth');
    return ms && mi && ml && mf;
  });
  const crisis = [
    { name: '988 Suicide & Crisis Lifeline', contact: '988', type: 'call', desc: 'Free, confidential, 24/7 support for people in distress.', border: '4px solid var(--error)', bg: '#fef2f2' },
    { name: 'Crisis Text Line', contact: 'HOME', number: '741741', type: 'text', desc: 'Text HOME to 741741 for free, 24/7 crisis counseling.', border: '4px solid var(--sky)', bg: 'rgba(74,144,217,0.1)' },
    { name: 'San Joaquin County Crisis', contact: '209-468-8686', type: 'call', desc: 'Local crisis support and intervention, 24/7.', border: '4px solid var(--success)', bg: '#f0fdf4' },
  ];
  const crisisHtml = crisis
    .map((line) => {
      const call =
        line.type === 'call'
          ? `<a href="tel:${line.contact.replace(/-/g, '')}" style="font-size:1.5rem;font-weight:700;color:var(--error);display:block;margin-bottom:0.5rem">${line.contact}</a><p style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 0.75rem">${line.desc}</p><a href="tel:${line.contact.replace(/-/g, '')}" class="btn" style="background:var(--error);color:#fff;font-size:0.875rem">${i.phone} Call Now</a>`
          : `<div style="margin-bottom:0.5rem"><span style="font-size:1.125rem;font-weight:700;color:var(--sky)">Text ${line.contact}</span><span style="color:var(--text-secondary)"> to </span><span style="font-size:1.5rem;font-weight:700;color:var(--sky)">${line.number}</span></div><p style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 0.75rem">${line.desc}</p><a href="sms:${line.number}?body=${line.contact}" class="btn btn-sky" style="font-size:0.875rem;color:#fff;background:var(--sky)">${i.messageSquare} Text Now</a>`;
      return `<div class="card" style="border-left:${line.border};background:${line.bg}"><div class="card-body"><h3 style="font-weight:600;color:var(--navy);margin:0 0 0.5rem">${line.name}</h3>${call}</div></div>`;
    })
    .join('');
  const optHtml = (arr, val) => arr.map((x) => `<option value="${x}"${val === x ? ' selected' : ''}>${x}</option>`).join('');
  const articles = [
    ['Understanding Anxiety', 'Recognize symptoms and find coping strategies that work.', '3 min', i.bookOpen],
    ['Supporting a Loved One', 'How to help someone who is struggling with their mental health.', '4 min', i.heart],
    ['Teen Mental Health', 'Warning signs and resources specifically for adolescents and families.', '5 min', i.users],
    ['When to Seek Help', 'Guidelines on when professional support is the right next step.', '3 min', i.clock],
  ];
  const artHtml = articles
    .map(([title, desc, rt, ic]) => `<div class="card card-hover"><div class="card-body">${ic.replace('class="icon"', 'class="icon" style="width:2rem;height:2rem;color:var(--sky);margin-bottom:0.75rem"')}<h3 style="font-weight:600;color:var(--navy);margin:0 0 0.5rem">${title}</h3><p style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 0.75rem">${desc}</p><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:0.75rem;color:var(--text-secondary)">${rt} read</span><button type="button" class="btn-ghost" style="font-size:0.875rem;color:var(--sky);padding:0">Read More ${i.chevronRight}</button></div></div></div>`)
    .join('');
  const th = filtered.map((t, i) => therapistCard(t, i)).join('');
  const empty = filtered.length === 0 ? `<p class="text-center" style="color:var(--text-secondary);padding:3rem 0">No therapists match your filters.</p>` : '';
  const filterGrid =
    '<div class="mh-filters">' +
    '<div><label class="section-eyebrow" style="display:block;margin-bottom:0.5rem;color:var(--text-secondary)">Specialty</label><select data-th-sp style="width:100%;padding:0.5rem;border:1px solid var(--border);border-radius:0.5rem;font-size:0.875rem;background:#fff">' +
    optHtml(D.therapistSpecialties, specialtyFilter) +
    '</select></div>' +
    '<div><label class="section-eyebrow" style="display:block;margin-bottom:0.5rem;color:var(--text-secondary)">Insurance</label><select data-th-in style="width:100%;padding:0.5rem;border:1px solid var(--border);border-radius:0.5rem;font-size:0.875rem;background:#fff">' +
    optHtml(D.therapistInsurance, insuranceFilter) +
    '</select></div>' +
    '<div><label class="section-eyebrow" style="display:block;margin-bottom:0.5rem;color:var(--text-secondary)">Language</label><select data-th-la style="width:100%;padding:0.5rem;border:1px solid var(--border);border-radius:0.5rem;font-size:0.875rem;background:#fff">' +
    optHtml(D.therapistLanguages, languageFilter) +
    '</select></div>' +
    '<div><label class="section-eyebrow" style="display:block;margin-bottom:0.5rem;color:var(--text-secondary)">Format</label><select data-th-fo style="width:100%;padding:0.5rem;border:1px solid var(--border);border-radius:0.5rem;font-size:0.875rem;background:#fff">' +
    optHtml(D.therapistFormats, formatFilter) +
    '</select></div></div>';
  return `<main id="main-content"><section class="page-hero" style="position:relative;overflow:hidden;padding-bottom:4rem"><div style="position:absolute;inset:0"><img src="./images/mental-health-hero.jpg" alt="" style="width:100%;height:100%;object-fit:cover;opacity:0.3"/><div style="position:absolute;inset:0;background:rgba(30,77,140,0.6)"></div></div><div class="container" style="position:relative;z-index:1"><div class="reveal revealed" data-reveal><span class="section-eyebrow">Mental Health</span><h1>You Are Not Alone</h1><p>Tracy residents have access to crisis support, professional care, and self-guided wellness tools.</p></div></div></section><section style="background:#fef2f2;border-top:2px solid #fecaca;border-bottom:2px solid #fecaca;padding:2.5rem 0"><div class="container"><div style="display:flex;align-items:center;justify-content:center;gap:0.75rem;margin-bottom:2rem">${i.alertTriangle}<h2 style="margin:0;font-size:1.5rem;font-weight:700;color:var(--error)">Crisis Support Available 24/7</h2></div><div class="grid-3">${crisisHtml}</div></div></section><section style="padding:5rem 0;background:var(--offwhite)"><div class="container">${sectionHeader('Find a Therapist', 'Filter by specialty, insurance, language, and format')}<div style="margin-top:2rem;margin-bottom:2.5rem">${filterGrid}</div><div class="grid-2">${th}</div>${empty}<p style="font-size:0.75rem;color:var(--text-secondary);text-align:center;margin-top:2rem">This directory is for informational purposes. Please contact providers directly to verify insurance and availability.</p></div></section><section style="padding:5rem 0;background:var(--lightgray)"><div class="container">${sectionHeader('Self-Care Tools', 'Guided breathing exercises to reduce stress and anxiety')}<div style="margin-top:2.5rem;display:grid;grid-template-columns:1fr;gap:1.5rem;max-width:48rem;margin:0 auto" class="grid-2">${breathingBlock('bx', 'box', 'Box Breathing', 'Breathe in for 4 seconds, hold for 4, out for 4, hold for 4. Repeat. A proven technique used by athletes and first responders.')}${breathingBlock(
    'f8',
    '478',
    '4-7-8 Breathing',
    'Inhale for 4, hold for 7, exhale for 8. Promotes deep relaxation and can help with sleep and anxiety relief.'
  )}</div></div></section><section style="padding:4rem 0;background:var(--offwhite)"><div class="container">${sectionHeader('Learn More', 'Short, accessible articles on common mental health topics')}<div class="grid-3" style="margin-top:2.5rem">${artHtml}</div></div></section></main>`;
}

const causeIcon = {
  Environment: i.treePine,
  Youth: i.baby,
  Seniors: i.heart,
  'Food Access': i.utensils,
  Animals: i.pawPrint,
  Homelessness: i.home,
  Arts: i.palette,
  Community: i.users,
};

export function renderVolunteer(state) {
  const { activeCause, activeTab, tutorSubmitted, skillSubmitted } = state;
  const opps = activeCause === 'All' ? D.volunteerOpportunities : D.volunteerOpportunities.filter((v) => v.cause === activeCause);
  const causePills = D.volunteerCauses.map((c) => `<button type="button" class="filter-pill-light${activeCause === c ? ' is-active' : ''}" data-vo-cause="${c}">${c}</button>`).join('');
  const tabs = [
    ['volunteer', 'Volunteer'],
    ['donate', 'Donate'],
    ['tutoring', 'Find a Tutor'],
    ['skills', 'Offer a Skill'],
  ];
  const tabHtml = `<div class="volunteer-tabs-wrap"><div class="container"><div class="volunteer-tabs scrollbar-hide">${tabs.map(([id, label]) => `<button type="button" class="${activeTab === id ? 'is-active' : ''}" data-vo-tab="${id}">${label}</button>`).join('')}</div></div></div>`;
  let content = '';
  if (activeTab === 'volunteer') {
    content = `<section style="padding:4rem 0;background:var(--offwhite)"><div class="container">${sectionHeader('Volunteer Opportunities', 'Local organizations seeking dedicated helpers')}<div style="margin:2rem 0" class="filter-pills">${causePills}</div><div style="display:flex;flex-direction:column;gap:1rem">${opps
      .map((opp) => {
        const ic = causeIcon[opp.cause] || i.handHeart;
        const btn = opp.applyUrl
          ? `<a href="${opp.applyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-navy" style="flex-shrink:0;font-size:0.875rem">Apply ${i.externalLink}</a>`
          : `<span class="btn" style="background:var(--lightgray);color:var(--text-secondary);font-size:0.875rem">Contact for Details</span>`;
        return `<div class="card card-hover"><div class="card-body" style="display:flex;flex-direction:column;gap:1rem"><div style="flex:1"><div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem"><span class="badge-sky-soft" style="display:inline-flex;align-items:center;gap:0.25rem;font-size:0.75rem;font-weight:600">${ic}${opp.cause}</span><span style="font-size:0.75rem;color:var(--text-secondary)">${opp.commitment}</span></div><h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin:0 0 0.5rem">${opp.organization}</h3><p style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 0.5rem">${opp.description}</p><p style="font-size:0.875rem;color:var(--text-secondary);margin:0">${opp.contact}</p></div>${btn}</div></div>`;
      })
      .join('')}</div></div></section>`;
  } else if (activeTab === 'donate') {
    content = `<section style="padding:4rem 0;background:var(--offwhite)"><div class="container">${sectionHeader('Make a Donation', 'Support organizations making a real impact')}<div class="grid-3" style="margin-top:2.5rem">${D.donationOrgs
      .map(
        (org) => `<div class="card card-hover" style="display:flex;flex-direction:column"><div class="card-body" style="flex:1;display:flex;flex-direction:column">${i.handHeart.replace('class="icon"', 'class="icon" style="width:2.5rem;height:2.5rem;color:var(--sky);margin-bottom:1rem"')}<h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin:0 0 0.5rem">${org.name}</h3><p style="font-size:0.875rem;color:var(--text-secondary);flex:1;margin-bottom:1rem">${org.description}</p><ul style="list-style:none;padding:0;margin:0 0 1.5rem">${org.impact.map((item) => `<li style="display:flex;gap:0.5rem;font-size:0.875rem;color:var(--text-secondary);margin-bottom:0.5rem">${i.checkCircle}<span>${item}</span></li>`).join('')}</ul><a href="${org.donateUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-success" style="font-size:0.875rem">Donate Now ${i.externalLink}</a></div></div>`
      )
      .join('')}</div><div style="margin-top:2rem;background:var(--navy-light);border-radius:0.5rem;padding:1.5rem;text-align:center"><p style="margin:0;font-size:0.875rem;color:var(--navy)"><strong>In-Kind Donations:</strong> Many organizations also need hygiene products, non-perishable food, clothing, and household items. Contact them directly to arrange drop-off.</p></div></div></section>`;
  } else if (activeTab === 'tutoring') {
    const formDone = tutorSubmitted
      ? `<div class="text-center" style="padding:1.5rem 0">${i.checkCircle.replace('class="icon"', 'class="icon" style="width:2.5rem;height:2.5rem;color:var(--success);margin:0 auto 0.75rem;display:block"')}<p style="font-weight:500;color:var(--navy)">Thank you! Your request has been submitted.</p><p style="font-size:0.875rem;color:var(--text-secondary)">A tutor coordinator will contact you within 2-3 business days.</p></div>`
      : `<form data-tutor-form class="space-y" style="display:flex;flex-direction:column;gap:1rem"><div><label style="font-size:0.875rem;font-weight:500;display:block;margin-bottom:0.25rem">Your Name</label><input required class="card-body" style="width:100%;border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem"/></div><div><label style="font-size:0.875rem;font-weight:500;display:block;margin-bottom:0.25rem">Email</label><input type="email" required class="card-body" style="width:100%;border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem"/></div><div><label style="font-size:0.875rem;font-weight:500;display:block;margin-bottom:0.25rem">Student Grade</label><select required class="card-body" style="width:100%;border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem"><option value="">Select grade</option>${['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((g) => `<option value="${g}">${g === 'K' ? 'Kindergarten' : `Grade ${g}`}</option>`).join('')}</select></div><div><label style="font-size:0.875rem;font-weight:500;display:block;margin-bottom:0.25rem">Subject Needs</label><textarea required rows="3" class="card-body" style="width:100%;border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem" placeholder="What subjects does the student need help with?"></textarea></div><button type="submit" class="btn btn-navy" style="width:100%">Submit Request</button></form>`;
    content = `<section style="padding:4rem 0;background:var(--offwhite)"><div class="container">${sectionHeader('Free & Low-Cost Tutoring', 'Connect with local tutors and mentoring programs')}<div class="grid-2" style="margin-top:2.5rem">${D.tutors
      .map(
        (tutor) => `<div class="card card-hover"><div class="card-body"><div style="display:flex;justify-content:space-between;margin-bottom:0.75rem">${i.bookOpen.replace('class="icon"', 'class="icon" style="width:2rem;height:2rem;color:var(--sky)"')}<span class="badge" style="font-size:0.75rem;font-weight:600;padding:0.25rem 0.625rem;border-radius:9999px;background:${tutor.cost === 'Free' ? 'rgba(22,163,74,0.1)' : 'rgba(217,119,6,0.1)'};color:${tutor.cost === 'Free' ? 'var(--success)' : 'var(--warning)'}">${tutor.cost}</span></div><h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin:0 0 0.5rem">${tutor.name}</h3><div style="display:flex;flex-wrap:wrap;gap:0.375rem;margin-bottom:0.75rem">${tutor.subjects.map((s) => `<span style="font-size:0.75rem;background:var(--navy-light);color:var(--navy);padding:0.125rem 0.5rem;border-radius:9999px">${s}</span>`).join('')}</div><div style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1rem"><p style="margin:0.25rem 0"><strong style="color:var(--text-primary)">Grades:</strong> ${tutor.gradeLevels}</p><p style="margin:0.25rem 0"><strong style="color:var(--text-primary)">Schedule:</strong> ${tutor.availability}</p><p style="margin:0.25rem 0">${tutor.description}</p><p style="font-weight:500;color:var(--navy);margin:0.25rem 0">${tutor.contact}</p></div></div></div>`
      )
      .join('')}</div><div class="card" style="max-width:36rem;margin:3rem auto 0"><div class="card-body"><h3 style="text-align:center;font-size:1.25rem;font-weight:600;color:var(--navy);margin:0 0 1rem">Request a Tutor</h3>${formDone}</div></div></div></section>`;
  } else {
    const skillForm = skillSubmitted
      ? `<div class="text-center" style="padding:2rem 0">${i.checkCircle.replace('class="icon"', 'class="icon" style="width:2.5rem;height:2.5rem;color:var(--success);display:block;margin:0 auto 0.75rem"')}<p style="font-weight:500;color:var(--navy)">Thank you! Your listing has been submitted for review.</p><p style="font-size:0.875rem;color:var(--text-secondary)">It will appear on the site after approval.</p></div>`
      : `<form data-skill-form style="display:flex;flex-direction:column;gap:1rem"><div><label style="font-size:0.875rem;font-weight:500;display:block;margin-bottom:0.25rem">Your Name</label><input required class="card-body" style="width:100%;border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem"/></div><div><label style="font-size:0.875rem;font-weight:500;display:block;margin-bottom:0.25rem">Skill Category</label><select required class="card-body" style="width:100%;border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem">${D.skillCategories.map((c) => `<option value="${c}">${c}</option>`).join('')}<option value="Other">Other</option></select></div><div><label style="font-size:0.875rem;font-weight:500;display:block;margin-bottom:0.25rem">Skill Description</label><textarea required rows="3" class="card-body" style="width:100%;border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem" placeholder="Describe what you can help with..."></textarea></div><div><label style="font-size:0.875rem;font-weight:500;display:block;margin-bottom:0.25rem">Availability</label><input required class="card-body" style="width:100%;border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem" placeholder="e.g., Weekends, evenings"/></div><div><label style="font-size:0.875rem;font-weight:500;display:block;margin-bottom:0.25rem">Contact (email or phone)</label><input required class="card-body" style="width:100%;border:1px solid var(--border);border-radius:0.5rem;padding:0.5rem"/></div><button type="submit" class="btn btn-navy" style="width:100%">Submit Listing</button><p style="font-size:0.75rem;color:var(--text-secondary);text-align:center;margin:0">Listings are reviewed before posting. No payment processing on this site.</p></form>`;
    content = `<section style="padding:4rem 0;background:var(--offwhite)"><div class="container">${sectionHeader('Share Your Skills', 'Offer your talents to help neighbors in need')}<div style="margin-top:2.5rem;display:grid;grid-template-columns:1fr;gap:2rem" class="grid-2"><div><h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin-bottom:1rem">Current Skill Listings</h3><div style="display:flex;flex-direction:column;gap:1rem">${D.skills
      .map(
        (sk) => `<div class="card card-hover"><div class="card-body"><div style="display:flex;justify-content:space-between;margin-bottom:0.5rem"><h4 style="margin:0;font-weight:600;color:var(--navy)">${sk.skill}</h4><span style="font-size:0.75rem;background:var(--navy-light);color:var(--navy);padding:0.125rem 0.5rem;border-radius:9999px">${sk.category}</span></div><p style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 0.5rem">${sk.description}</p><p style="font-size:0.75rem;color:var(--text-secondary);margin:0 0 0.75rem">Available: ${sk.availability}</p><p style="font-size:0.875rem;color:var(--sky);margin:0">${sk.contact}</p></div></div>`
      )
      .join('')}</div><div><h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin-bottom:1rem">Post Your Skill</h3><div class="card"><div class="card-body">${skillForm}</div></div></div></div></div></section>`;
  }
  return `<main id="main-content"><section class="page-hero" style="position:relative;overflow:hidden;padding-bottom:4rem"><div style="position:absolute;inset:0"><img src="./images/volunteer-hero.jpg" alt="Volunteers working together" style="width:100%;height:100%;object-fit:cover;opacity:0.25"/><div style="position:absolute;inset:0;background:rgba(30,77,140,0.6)"></div></div><div class="container" style="position:relative;z-index:1"><div class="reveal revealed" data-reveal><span class="section-eyebrow">Volunteer & Give Back</span><h1>Make a Difference in Tracy</h1><p>Whether you have an hour or a skill to share, your contribution matters.</p></div></div></section>${tabHtml}${content}</main>`;
}

export function renderReferences() {
  const acc = D.sourceGroups
    .map(
      (g, idx) => `<div class="accordion"><button type="button" class="accordion-btn" data-acc="${idx}" aria-expanded="${idx === 0 ? 'true' : 'false'}"><h3>${g.title}</h3><span data-acc-icon>${idx === 0 ? i.chevronUp : i.chevronDown}</span></button><div class="accordion-panel" id="acc-panel-${idx}" ${idx === 0 ? '' : 'hidden'}><ul style="list-style:none;padding:0;margin:0">${g.sources.map((s) => `<li style="font-size:0.875rem;color:var(--text-secondary);padding-left:1rem;border-left:2px solid rgba(74,144,217,0.3);margin-bottom:0.75rem">${s}</li>`).join('')}</ul></div></div>`
    )
    .join('');
  return `<main id="main-content"><section class="page-hero"><div class="container"><div class="reveal revealed" data-reveal><span class="section-eyebrow">References & Attribution</span><h1>Sources & Documentation</h1><p>All external sources, citations, and required TSA competition documents.</p></div></div></section><section style="padding:3rem 0;background:var(--lightgray)"><div class="container"><div class="grid-2">${[
    ['Student Copyright Checklist', 'Required TSA document confirming all content permissions and original work.', 'copyright'],
    ['Work Log', 'Complete development timeline and team member contributions.', 'worklog'],
  ]
    .map(
      ([t, d, key]) => `<div class="card card-hover text-center"><div class="card-body">${i.fileText.replace('class="icon"', 'class="icon" style="width:2.5rem;height:2.5rem;color:var(--navy);margin:0 auto 1rem;display:block"')}<h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin:0 0 0.5rem">${t}</h3><p style="font-size:0.875rem;color:var(--text-secondary);margin:0 0 1rem">${d}</p><button type="button" class="btn btn-navy" data-pdf="${key}">${i.download} Download PDF</button></div></div>`
    )
    .join('')}</div><p class="text-center" style="font-size:0.75rem;color:var(--text-secondary);margin-top:1.5rem"><strong>Note:</strong> These documents are required per TSA Webmaster competition rules. Failure to include results in disqualification. In a production environment, these would link to actual PDF files.</p></div></section><section style="padding:4rem 0;background:var(--offwhite)"><div class="container" style="max-width:56rem">${sectionHeader('Sources', 'References by Category', '', 'left')}<div style="margin-top:2.5rem">${acc}</div></div></section><section style="padding:3rem 0;background:var(--navy-light)"><div class="container text-center" style="max-width:48rem"><h3 style="font-size:1.125rem;font-weight:600;color:var(--navy);margin-bottom:1rem">Custom-Built Framework Statement</h3><p style="color:rgba(30,77,140,0.85);line-height:1.7;margin:0">This website was built entirely from scratch by the TSA Webmaster team. No pre-built templates, themes, or purchased layout packs were used. All HTML, CSS, and JavaScript were written by team members during the current school year. Styling uses custom CSS with design tokens that match the original site; behavior is implemented with plain JavaScript (no React or other UI frameworks).</p></div></section></main>`;
}
