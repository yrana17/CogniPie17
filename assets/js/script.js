/* ═══════════════════════════════════════════
   CogniPie — script.js
   ═══════════════════════════════════════════ */

/* ─── THEME ─── */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('cognipie_theme', next);
  const btn = document.getElementById('themeToggleBtn');
  btn.innerHTML = next === 'dark'
    ? '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>'
    : '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>';
}

/* ─── SIDEBAR MOBILE ─── */
function toggleSidebar() {
  const nav = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  nav.classList.toggle('open');
  overlay.style.display = nav.classList.contains('open') ? 'block' : 'none';
}

function toggleCollapse(groupId, labelEl) {
  const group = document.getElementById(groupId);
  const isNowCollapsed = group.classList.toggle('collapsed');
  labelEl.classList.toggle('collapsed', isNowCollapsed);
}

/* ─── CURSOR ─── */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
window.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px';
});
function animateRing() {
  ringX += (mouseX - ringX) * 0.15; ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

function attachHover() {
  document.querySelectorAll('button,a,input,select,textarea,.card,.timeline-card,.job-card,.book-card,.project-card,.oss-card,.academy-card,.nl-item,.nav-label,.social-btn,.legal-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('hovered');
        el.classList.add('pointer-active');
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('hovered');
        el.classList.remove('pointer-active');
    });
  });
}

/* ─── TYPING ANIMATION ─── */
const phrases = [
  'Empowering the Next Generation of QA.',
  'Master Test Automation.',
  'Ace API Testing.',
  'Build Your QA Career.',
  'Grow with the QA Community.'
];
let pIdx = 0, cIdx = 0, deleting = false;
function typeLoop() {
  const el = document.getElementById('typingText');
  if (!el) return;
  const phrase = phrases[pIdx];
  el.textContent = deleting ? phrase.substring(0, cIdx--) : phrase.substring(0, cIdx++);
  if (!deleting && cIdx > phrase.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  if (deleting && cIdx < 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
  setTimeout(typeLoop, deleting ? 38 : 78);
}

/* ─── COOKIE HELPERS ─── */
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}
function getCookie(name) {
  const ca = document.cookie.split(';');
  for (let c of ca) {
    const cv = c.trim();
    if (cv.startsWith(name + '=')) return decodeURIComponent(cv.substring(name.length + 1));
  }
  return null;
}

/* ─── USER NAME ─── */
function getUserName() {
  return getCookie('cognipie_name') || localStorage.getItem('cognipie_name') || null;
}
function setUserName(name) {
  setCookie('cognipie_name', name, 365);
  localStorage.setItem('cognipie_name', name);
  updateGreeting(name);
}
function updateGreeting(name) {
  const el = document.getElementById('userGreeting');
  if (el) el.textContent = name && name !== 'Guest' ? `Hello, ${name} 👋` : 'Hello, Guest';
}

/* ─── WELCOME POPUP ─── */
function saveWelcomeName(forceName) {
  const input = document.getElementById('welcomeNameInput');
  const name = forceName || (input ? input.value.trim() : '') || 'Guest';
  setUserName(name);
  localStorage.setItem('cognipie_welcomed', '1');
  closeModal('welcomeModal');
}

/* ─── TOAST ─── */
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i> ${msg}`;
  t.className = `toast show ${type}`;
  setTimeout(() => { t.className = 'toast'; }, 3500);
}

/* ─── MODALS ─── */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function showGuestModal() { openModal('guestModal'); }

/* ─── NAV / TABS ─── */
let activeNavId = 'nav-home';
let currentReadSection = 'blogs';

function switchTab(id, btn) {
  // Update sidebar active state even if no button passed (via ID search)
  const targetId = btn ? btn.id : `nav-${id}`;
  const targetBtn = document.getElementById(targetId);

  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active');
    s.querySelectorAll('.animate-up').forEach(el => { el.style.animation = 'none'; el.offsetHeight; el.style.animation = null; });
  });

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (targetBtn) targetBtn.classList.add('active');

  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').style.display = 'none';
  render();
}

function toggleAdminView() {
  const role = document.getElementById('roleSelect').value;
  const adminSection = document.getElementById('admin-section');
  if (adminSection) adminSection.style.display = role === 'admin' ? 'block' : 'none';
  render();
}

/* ─── BLOG READER ─── */
let allBlogs = [...DATA.blogs];
let activeBlogTag = 'All';

function openReader(id) {
  const b = allBlogs.find(x => x.id === id);
  if (!b) return;
  currentReadSection = activeNavId.replace('nav-', '');
  document.getElementById('readTitle').innerText = b.title;
  document.getElementById('readAuthor').innerText = b.author;
  document.getElementById('readRole').innerText = b.authorRole || 'QA Professional';
  document.getElementById('readDate').innerText = `${b.date} · ${b.readTime}`;
  document.getElementById('readAvatarInitials').innerText = b.author.charAt(0).toUpperCase();
  const stats = b.stats || { likes: 0, loves: 0, insightful: 0 };
  document.getElementById('readMeta').innerHTML = `
    <div style="display:flex;gap:12px;margin-bottom:15px;color:var(--text-muted);font-size:.85rem;">
      <span><i class="fa-solid fa-thumbs-up" style="color:var(--accent-1);"></i> ${stats.likes}</span>
      <span><i class="fa-solid fa-heart" style="color:var(--danger);"></i> ${stats.loves}</span>
      <span><i class="fa-solid fa-lightbulb" style="color:var(--warning);"></i> ${stats.insightful}</span>
    </div>
    ${(b.tags || []).map(t => `<span class="badge bg-approved">${t}</span>`).join('')}
  `;
  document.getElementById('readContent').innerText = b.content;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('read-view').classList.add('active');
  window.scrollTo(0, 0);
}

function closeReader() {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = currentReadSection || 'blogs';
  const el = document.getElementById(target);
  if (el) el.classList.add('active'); else document.getElementById('blogs').classList.add('active');
  window.scrollTo(0, 0);
}

/* ─── BLOG FILTER ─── */
function filterBlogs() {
  const q = (document.getElementById('blogSearch')?.value || '').toLowerCase();
  const filtered = allBlogs.filter(b => {
    const matchTag = activeBlogTag === 'All' || b.category === activeBlogTag;
    const matchQ = b.title.toLowerCase().includes(q) || (b.excerpt || '').toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
    return matchTag && matchQ;
  });
  renderBlogGrid(filtered, 'blogContainer');
}

function setTag(tag, btn) {
  activeBlogTag = tag;
  document.querySelectorAll('#blogFilters .tag-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterBlogs();
}

function renderBlogGrid(list, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = list.length ? list.map(b => `
    <div class="card" onclick="openReader(${b.id})" style="cursor:pointer;">
      <div class="card-img-wrapper"><img class="card-img" src="${b.img}" alt="${b.title}" loading="lazy"></div>
      <div class="card-body">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span class="badge bg-approved">${b.category}</span>
          <div style="display:flex;gap:8px;font-size:.75rem;color:var(--text-muted);">
            <span><i class="fa-solid fa-heart" style="color:var(--danger);"></i> ${b.stats?.loves || 0}</span>
            <span><i class="fa-solid fa-thumbs-up" style="color:var(--accent-1);"></i> ${b.stats?.likes || 0}</span>
          </div>
        </div>
        <h3>${b.title}</h3>
        <p>${b.excerpt || (b.content || '').substring(0,110) + '…'}</p>
        <div class="card-footer">
          <div style="display:flex;align-items:center;gap:8px;font-weight:700;font-size:.82rem;color:var(--text-main);">
            <div class="author-av">${b.author.charAt(0)}</div>${b.author}
          </div>
          <span style="color:var(--accent-1);font-size:.78rem;font-weight:600;">${b.readTime}</span>
        </div>
      </div>
    </div>`).join('') : '<p style="color:var(--text-muted);">No blogs found.</p>';
  attachHover();
}

/* ─── TESTIMONIALS SLIDER ─── */
let slideIdx = 0;
let sliderTimer = null;

function renderTestimonials() {
  const items = DATA.testimonials;
  const track = document.getElementById('testimonialTrack');
  const dots = document.getElementById('sliderDots');
  if (!track) return;
  track.innerHTML = items.map(t => `
    <div class="testimonial-card">
      <div style="font-size:2.2rem;color:var(--accent-1);opacity:.25;line-height:1;flex-shrink:0;"><i class="fa-solid fa-quote-left"></i></div>
      <div style="flex:1;">
        <p class="t-text">"${t.text}"</p>
        <div class="t-author">
          <img src="${t.img}" alt="${t.name}" onerror="this.style.display='none'">
          <div>
            <div class="t-name">${t.name}</div>
            <div class="t-role">${t.role}</div>
            <div class="t-achiev"><i class="fa-solid fa-trophy"></i> ${t.achievement}</div>
          </div>
        </div>
      </div>
    </div>`).join('');
  dots.innerHTML = items.map((_, i) =>
    `<button class="slider-dot ${i === 0 ? 'active' : ''}" onclick="goSlide(${i})"></button>`).join('');
  setSlide(0);
  if (sliderTimer) clearInterval(sliderTimer);
  sliderTimer = setInterval(() => setSlide((slideIdx + 1) % items.length), 5000);
}

function setSlide(i) {
  slideIdx = i;
  const track = document.getElementById('testimonialTrack');
  if (track) track.style.transform = `translateX(-${i * 100}%)`;
  document.querySelectorAll('.slider-dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
}
function goSlide(i) { setSlide(i); }

/* ─── EVENTS ─── */
function renderHomeEvents() {
  const list = DATA.events.filter(e => !e.past).slice(0, 3);
  const el = document.getElementById('homeEvents');
  if (!el) return;
  el.innerHTML = list.map(e => `
    <div class="card">
      <div class="card-img-wrapper"><img class="card-img" src="${e.img}" alt="${e.title}" loading="lazy"></div>
      <div class="card-body">
        <span class="badge ${e.priceType === 'Free' ? 'bg-approved' : 'bg-warning'}" style="margin-bottom:10px;display:inline-block;">${e.priceType}</span>
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
        <div class="card-footer">
          <span style="font-size:.8rem;color:var(--text-muted);"><i class="fa-regular fa-calendar"></i> ${e.date}</span>
          ${e.link ? `<a href="${e.link}" target="_blank" class="btn btn-gradient" style="padding:7px 14px;font-size:.8rem;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Site</a>` : ''}
        </div>
      </div>
    </div>`).join('');
  attachHover();
}

let activeEventsTab = 'upcoming';

function switchEventsTab(tab) {
  activeEventsTab = tab;
  renderEventsTimeline();
}

function renderEventsTimeline() {
  const el = document.getElementById('eventsTimeline');
  if (!el) return;

  const upcoming = DATA.events.filter(e => !e.past);
  const past = DATA.events.filter(e => e.past);

  const tabButtons = `
    <div class="filter-bar" style="margin-bottom:24px;">
      <button class="tag-btn ${activeEventsTab === 'upcoming' ? 'active' : ''}" onclick="switchEventsTab('upcoming')">Upcoming Events</button>
      <button class="tag-btn ${activeEventsTab === 'past' ? 'active' : ''}" onclick="switchEventsTab('past')">Past Events</button>
    </div>
  `;

  if (activeEventsTab === 'upcoming') {
    el.innerHTML = `
      ${tabButtons}
      <div style="background:rgba(37,99,235,.05);border:1px solid rgba(37,99,235,.12);border-radius:14px;padding:16px 20px;margin-bottom:28px;font-size:.9rem;color:var(--text-muted);">
        <i class="fa-solid fa-circle-info" style="color:var(--accent-1);"></i>
        <strong style="color:var(--text-main);">We curate global events — we don't host them.</strong>
        Click <em>Visit Official Site</em> to register directly on the event's official website. We list both <span style="color:var(--success);font-weight:700;">Free</span> and <span style="color:var(--warning);font-weight:700;">Paid</span> events.
      </div>
      <div class="timeline">${upcoming.map(e => timelineCard(e, false)).join('')}</div>
    `;
  } else {
    el.innerHTML = `
      ${tabButtons}
      <div style="background:rgba(100,100,100,.05);border:1px solid rgba(100,100,100,.15);border-radius:14px;padding:16px 20px;margin-bottom:28px;font-size:.9rem;color:var(--text-muted);">
        <i class="fa-solid fa-globe" style="color:var(--accent-1);"></i>
        <strong style="color:var(--text-main);">These global events have concluded.</strong>
        Listed here for reference only. Check <button onclick="switchEventsTab('upcoming')" style="background:none;border:none;color:var(--accent-1);font-weight:700;font-size:.9rem;text-decoration:underline;cursor:pointer;">upcoming events</button> to register for future ones.
      </div>
      <div class="timeline">${past.map(e => timelineCard(e, true)).join('')}</div>
    `;
  }
  attachHover();
}

function timelineCard(e, isPast) {
  const parts = e.date.split(' ');
  const month = parts[0]?.substring(0, 3) || '';
  const day = parts[1]?.replace(',', '') || '';
  const badgeClass = e.priceType === 'Free' ? 'badge bg-approved' : 'badge bg-warning';
  return `
    <div class="timeline-item">
      <div class="timeline-dot" style="${isPast ? 'background:var(--text-muted);' : ''}"></div>
      <div class="timeline-card" style="${isPast ? 'opacity:.75;' : ''}">
        <div class="timeline-date-block">
          <span class="t-month">${month}</span>
          <span class="t-day">${day || '—'}</span>
        </div>
        <div class="timeline-info">
          <div class="timeline-meta" style="margin-bottom:8px;">
            <span class="${badgeClass}">${e.priceType || 'Paid'}</span>
            <span class="meta-chip"><i class="fa-solid fa-wifi" style="font-size:.7rem;"></i> ${e.mode}</span>
            <span class="meta-chip"><i class="fa-solid fa-location-dot" style="font-size:.7rem;"></i> ${e.location}</span>
          </div>
          <h3>${e.title}</h3>
          <p>${e.desc}</p>
          <div style="margin-top:14px;">
            ${e.link ? `<a href="${e.link}" target="_blank" class="btn btn-gradient" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;font-size:.88rem;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> ${isPast ? 'View Event Details' : 'Visit Official Site'}
            </a>` : ''}
          </div>
        </div>
      </div>
    </div>`;
}

function getRegistration(eventId) {
  return JSON.parse(localStorage.getItem('cognipie_regs') || '[]').includes(eventId);
}
function registerEvent(eventId) {
  const regs = JSON.parse(localStorage.getItem('cognipie_regs') || '[]');
  if (!regs.includes(eventId)) { regs.push(eventId); localStorage.setItem('cognipie_regs', JSON.stringify(regs)); }
  showToast('You are registered! Check hello@cognipie.com for confirmation.', 'success');
  renderEventsTimeline();
}

/* ─── SERVICES ─── */
function renderServices() {
  const el = document.getElementById('servicesContainer');
  if (!el) return;
  el.innerHTML = DATA.services.map(s => `
    <div class="service-card">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;background:${s.color}18;color:${s.color};border:1px solid ${s.color}28;flex-shrink:0;">
          <i class="fa-solid ${s.icon}"></i>
        </div>
        <div>
          <h3 style="font-size:1.05rem;font-weight:700;color:var(--text-main);">${s.title}</h3>
          <span style="font-size:.75rem;font-weight:700;color:${s.color};">${s.price}</span>
        </div>
      </div>
      <p style="color:var(--text-muted);font-size:.88rem;line-height:1.6;">${s.desc}</p>
      <ul class="service-features">${s.features.map(f => `<li>${f}</li>`).join('')}</ul>
      <button class="btn btn-gradient" style="width:100%;margin-top:auto;padding:11px;" onclick="openServiceModal('${s.title.replace(/'/g,"\\'")}')">
        <i class="fa-solid fa-paper-plane"></i> Inquire Now
      </button>
    </div>`).join('');
  attachHover();
}

function openServiceModal(title) {
  document.getElementById('serviceModalTitle').innerText = title;
  openModal('serviceModal');
}

/* ─── CAREERS ─── */
function renderCareers() {
  const el = document.getElementById('careersContainer');
  if (!el) return;
  el.innerHTML = DATA.careers.map(c => `
    <div class="job-card">
      <div class="job-card-left">
        <div class="job-meta">
          <span class="badge bg-approved">${c.type}</span>
          <span class="meta-chip"><i class="fa-solid fa-location-dot" style="font-size:.7rem;"></i> ${c.location}</span>
          <span class="meta-chip"><i class="fa-solid fa-briefcase" style="font-size:.7rem;"></i> ${c.experience}</span>
          <span style="font-size:.72rem;color:var(--text-muted);">${c.posted}</span>
        </div>
        <h3>${c.title}</h3>
        <p style="color:var(--accent-1);font-size:.82rem;font-weight:600;margin-bottom:6px;">${c.company}</p>
        <p>${c.desc}</p>
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:6px;">${c.skills.map(sk => `<span class="skill-tag">${sk}</span>`).join('')}</div>
      </div>
      <div class="job-card-right">
        <span class="salary-text">${c.salary}</span>
        <button class="btn btn-gradient" style="padding:10px 16px;font-size:.82rem;" onclick="openApplyModal('${c.title.replace(/'/g,"\\'")} @ ${c.company.replace(/'/g,"\\'")}')">
          Apply Now <i class="fa-solid fa-arrow-right"></i>
        </button>
        <span style="font-size:.72rem;color:var(--text-muted);display:block;margin-top:6px;">${c.posted}</span>
      </div>
    </div>`).join('');
  attachHover();
}

function openApplyModal(title) {
  document.getElementById('applyModalTitle').innerText = title;
  openModal('applyModal');
}

/* ─── ACADEMY ─── */
function renderAcademy() {
  const el = document.getElementById('academyContainer');
  if (!el) return;
  el.innerHTML = DATA.academy.map(c => `
    <div class="academy-card">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;background:${c.color}18;color:${c.color};border:1px solid ${c.color}28;flex-shrink:0;">
          <i class="fa-solid ${c.icon}"></i>
        </div>
        <div>
          <h3 style="font-size:1.05rem;font-weight:700;color:var(--text-main);">${c.title}</h3>
          <div style="font-size:.75rem;color:var(--text-muted);">${c.level} &bull; ${c.duration}</div>
        </div>
      </div>
      <p style="color:var(--text-muted);font-size:.88rem;line-height:1.6;">${c.desc}</p>
      <ul class="academy-topics">${c.topics.map(t => `<li>${t}</li>`).join('')}</ul>
      ${c.webinar === true
        ? `<a href="https://workshop.cognipie.com" target="_blank" class="btn btn-gradient" style="width:100%;padding:11px;font-size:.88rem;">
            <i class="fa-solid fa-video"></i> Join Upcoming Live — workshop.cognipie.com
           </a>`
        : `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:var(--input-bg);border:1px solid var(--border-light);color:var(--text-muted);font-size:.85rem;font-weight:600;">
            <i class="fa-solid fa-clock" style="color:var(--accent-1);"></i> Coming Soon — Notify me when registration opens
           </div>`
      }
    </div>`).join('');
  attachHover();
}

/* ─── PROJECTS ─── */
function renderProjects() {
  const pc = document.getElementById('projectsContainer');
  if (pc) {
    pc.innerHTML = DATA.projects.map(p => `
      <div class="project-card">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span class="diff-badge" style="background:${p.color}18;color:${p.color};border:1px solid ${p.color}28;">${p.difficulty}</span>
          <span style="font-size:.75rem;color:var(--text-muted);"><i class="fa-solid fa-users"></i> ${p.participants} participants</span>
        </div>
        <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-main);">${p.title}</h3>
        <p style="color:var(--text-muted);font-size:.88rem;line-height:1.6;">${p.desc}</p>
        <div style="display:flex;gap:5px;flex-wrap:wrap;">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
        <ul class="objectives-list">${p.objectives.map(o => `<li>${o}</li>`).join('')}</ul>
        <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);">
          <span><i class="fa-regular fa-clock"></i> Deadline: ${p.deadline}</span>
          <span style="color:${p.color};font-weight:700;">${p.difficulty}</span>
        </div>
      </div>`).join('');
  }

  const oc = document.getElementById('ossContainer');
  if (oc) {
    oc.innerHTML = DATA.openSourceProjects.map(p => `
      <div class="oss-card">
        <div class="oss-header">
          <i class="fa-brands fa-github" style="font-size:1.4rem;color:var(--text-muted);"></i>
          <div style="flex:1;">
            <div class="oss-name">${p.name}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:3px;">
              <span class="oss-stars"><i class="fa-solid fa-star"></i> ${p.stars}</span>
              <span class="oss-lang">${p.lang}</span>
            </div>
          </div>
        </div>
        <p class="oss-desc">${p.desc}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="${p.repo}" target="_blank" class="btn btn-secondary" style="padding:9px 14px;font-size:.8rem;">
            <i class="fa-brands fa-github"></i> View Repo
          </a>
          <button class="btn btn-gradient" style="padding:9px 14px;font-size:.8rem;" onclick="openContributeModal('${p.name}','${p.issue}','${p.repo}','${p.desc.replace(/'/g,"\\'")}')">
            <i class="fa-solid fa-code-branch"></i> Start Contributing
          </button>
        </div>
      </div>`).join('');
  }
  attachHover();
}

function openContributeModal(name, issue, repo, desc) {
  document.getElementById('ossModalName').innerText = name;
  document.getElementById('ossModalDesc').innerText = desc;
  document.getElementById('ossModalIssue').innerText = issue;
  document.getElementById('ossModalLink').href = repo;
  openModal('contributeModal');
}

/* ─── BOOKS & COURSES ─── */
let activeBookCat = 'All';
function renderBooks(cat) {
  if (cat !== undefined) activeBookCat = cat;
  const categories = ['All', ...new Set(DATA.books.map(b => b.category))];
  const fEl = document.getElementById('bookFilters');
  if (fEl) {
    fEl.innerHTML = categories.map(c =>
      `<button class="tag-btn ${c === activeBookCat ? 'active' : ''}" onclick="renderBooks('${c}')">${c}</button>`
    ).join('');
  }
  const filtered = activeBookCat === 'All' ? DATA.books : DATA.books.filter(b => b.category === activeBookCat);
  const el = document.getElementById('booksContainer');
  if (!el) return;
  el.innerHTML = filtered.map(b => {
    const isCourse = b.category === 'Free Courses' || b.category === 'Courses';
    const btnColor = isCourse ? 'background:linear-gradient(135deg,#a855f7,#7c3aed);' : '';
    const btnIcon = isCourse ? 'fa-play-circle' : 'fa-amazon';
    const btnText = b.linkLabel || (isCourse ? 'View Course' : 'View on Amazon');
    const btnLink = b.link || b.amazon || '#';
    return `
    <div class="book-card">
      <div class="book-img-wrap">
        <img src="${b.img}" alt="${b.title}" loading="lazy">
        <div style="position:absolute;inset:0;background:linear-gradient(to top,var(--bg-surface) 0%,transparent 55%);z-index:2;"></div>
        <span class="book-badge-abs">${b.badge}</span>
      </div>
      <div class="book-body">
        <span style="font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:${isCourse ? 'var(--accent-2)' : 'var(--accent-1)'};display:block;margin-bottom:4px;">${b.category}</span>
        <h3>${b.title}</h3>
        <div class="book-author">${b.author}</div>
        <div class="star-rating">${'★'.repeat(Math.floor(b.rating))}<span style="color:var(--text-muted);font-size:.75rem;"> ${b.rating}</span></div>
        <p>${b.desc}</p>
        <a href="${btnLink}" target="_blank" class="btn btn-gradient" style="width:100%;margin-top:12px;padding:10px;font-size:.85rem;${btnColor}">
          <i class="fa-solid ${btnIcon}"></i> ${btnText}
        </a>
      </div>
    </div>`;
  }).join('');
  attachHover();
}

/* ─── NEWSLETTERS ─── */
function renderNewsletters() {
  const el = document.getElementById('newslettersContainer');
  if (!el) return;
  // Group by month-year
  const groups = {};
  DATA.newsletters.forEach(n => {
    const key = `${n.month} ${n.year}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
  });
  el.innerHTML = Object.keys(groups).map(key => `
    <div class="nl-month-group">
      <div class="nl-month-label"><i class="fa-regular fa-calendar-check"></i> ${key}</div>
      <div class="nl-list">
        ${groups[key].map(n => `
          <div class="nl-item" onclick="openNewsletter(${n.id})">
            <img class="nl-item-img" src="${n.img}" alt="${n.subject}" loading="lazy">
            <div class="nl-item-info">
              <div class="nl-item-edition">Edition ${n.edition}</div>
              <div class="nl-item-subject">${n.subject}</div>
              <div class="nl-item-preview">${n.preview}</div>
            </div>
            <div class="nl-item-date">${n.date}<br><i class="fa-solid fa-chevron-right" style="color:var(--accent-1);margin-top:6px;display:block;"></i></div>
          </div>`).join('')}
      </div>
    </div>`).join('');
  attachHover();
}

function openNewsletter(id) {
  const n = DATA.newsletters.find(x => x.id === id);
  if (!n) return;
  const contentHtml = n.content.map(block => {
    if (block.type === 'heading') return `<h3 class="nl-section-heading">${block.text}</h3>`;
    if (block.type === 'paragraph') return `<p class="nl-paragraph">${block.text}</p>`;
    if (block.type === 'list') return `<ul class="nl-bullet">${block.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
    return '';
  }).join('');
  document.getElementById('nlModalContent').innerHTML = `
    <div class="nl-modal-header">
      <span class="badge bg-approved" style="margin-bottom:8px;display:inline-block;">Edition ${n.edition}</span>
      <h2>${n.subject}</h2>
      <div class="nl-modal-date"><i class="fa-regular fa-calendar"></i> ${n.date} &bull; The QA Pulse</div>
    </div>
    ${contentHtml}`;
  openModal('nlModal');
}

/* ─── ADMIN ─── */
let userBlogs = JSON.parse(localStorage.getItem('cognipie_user_blogs') || '[]');
function renderAdmin() {
  document.getElementById('statApproved').innerText = DATA.blogs.length;
  document.getElementById('statPending').innerText = userBlogs.filter(b => b.status === 'pending').length;
  document.getElementById('statRejected').innerText = userBlogs.filter(b => b.status === 'rejected').length;
  const el = document.getElementById('adminQueueContainer');
  if (!el) return;
  el.innerHTML = userBlogs.filter(b => b.status === 'pending').map(b => `
    <div class="card" style="border-top:3px solid var(--accent-1);">
      <div class="card-body">
        <h3>${b.title}</h3>
        <p>${(b.content || '').substring(0, 100)}…</p>
        <div class="card-footer" style="padding-top:14px;margin-top:14px;">
          <div></div>
          <div style="display:flex;gap:8px;">
            <button class="btn-action btn-secondary" style="color:var(--success);" onclick="updateUserBlog(${b.id},'approved')"><i class="fa-solid fa-check"></i> Approve</button>
            <button class="btn-action btn-danger" onclick="updateUserBlog(${b.id},'rejected')"><i class="fa-solid fa-xmark"></i> Reject</button>
          </div>
        </div>
      </div>
    </div>`).join('') || '<p style="color:var(--text-muted);">Queue empty. All systems normal.</p>';
  attachHover();
}

function updateUserBlog(id, status) {
  userBlogs = userBlogs.map(b => b.id === id ? {...b, status} : b);
  localStorage.setItem('cognipie_user_blogs', JSON.stringify(userBlogs));
  renderAdmin();
}

/* ─── FORM SUBMISSIONS ─── */
function submitServiceInquiry(e) {
  e.preventDefault();
  const service = document.getElementById('serviceModalTitle').innerText;
  const name = document.getElementById('siqName').value;
  const email = document.getElementById('siqEmail').value;
  const msg = document.getElementById('siqMessage').value;
  window.open(`mailto:hello@cognipie.com?subject=${encodeURIComponent('Service Inquiry: ' + service)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${msg}`)}`, '_blank');
  closeModal('serviceModal');
  e.target.reset();
  showToast('Inquiry sent! We respond within 24 hours.', 'success');
}

function submitJobApplication(e) {
  e.preventDefault();
  const role = document.getElementById('applyModalTitle').innerText;
  const name = document.getElementById('aplName').value;
  const email = document.getElementById('aplEmail').value;
  const resume = document.getElementById('aplResume').value;
  const msg = document.getElementById('aplMessage').value;
  window.open(`mailto:hello@cognipie.com?subject=${encodeURIComponent('Job Application: ' + role)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nResume: ${resume}\nNote: ${msg}`)}`, '_blank');
  closeModal('applyModal');
  e.target.reset();
  showToast('Application submitted! Good luck! 🚀', 'success');
}

function submitProjectForm(e) {
  e.preventDefault();
  const name = document.getElementById('projName').value;
  const proj = document.getElementById('projProject').value;
  const link = document.getElementById('projLink').value;
  const notes = document.getElementById('projNotes').value;
  window.open(`mailto:hello@cognipie.com?subject=${encodeURIComponent('Project Submission: ' + proj)}&body=${encodeURIComponent(`Name: ${name}\nProject: ${proj}\nLink: ${link}\nNotes: ${notes}`)}`, '_blank');
  e.target.reset();
  showToast('Work submitted for review! We will get back to you soon.', 'success');
}

function subscribeNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('nlEmail').value;
  const subs = JSON.parse(localStorage.getItem('cognipie_subs') || '[]');
  if (subs.includes(email)) { showToast('You are already subscribed!', 'success'); return; }
  subs.push(email);
  localStorage.setItem('cognipie_subs', JSON.stringify(subs));
  window.open(`mailto:hello@cognipie.com?subject=Newsletter+Subscription&body=Please+subscribe:+${encodeURIComponent(email)}`, '_blank');
  e.target.reset();
  showToast('Welcome to The QA Pulse! 🎉 Check your inbox.', 'success');
}

/* ─── MASTER RENDER ─── */
function render() {
  const active = document.querySelector('.section.active');
  if (!active) return;
  const id = active.id;
  if (id === 'home') { 
    allBlogs = DATA.blogs; 
    renderBlogGrid(DATA.blogs.slice(0, 3), 'homeBlogs'); 
    renderHomeEvents(); 
    renderTestimonials(); 
    attachHover();
  }
  if (id === 'blogs') {
    allBlogs = DATA.blogs;
    const cats = ['All', ...new Set(DATA.blogs.map(b => b.category))];
    const fEl = document.getElementById('blogFilters');
    if (fEl) fEl.innerHTML = cats.map(c =>
      `<button class="tag-btn ${c === activeBlogTag ? 'active' : ''}" onclick="setTag('${c}',this)">${c}</button>`).join('');
    filterBlogs();
  }
  if (id === 'events') renderEventsTimeline();
  if (id === 'services') renderServices();
  if (id === 'careers') renderCareers();
  if (id === 'academy') renderAcademy();
  if (id === 'projects') renderProjects();
  if (id === 'books') renderBooks();
  if (id === 'newsletters') renderNewsletters();
  if (id === 'admin-hub') renderAdmin();
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  // Theme
  const savedTheme = localStorage.getItem('cognipie_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const btn = document.getElementById('themeToggleBtn');
  btn.innerHTML = savedTheme === 'dark'
    ? '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>'
    : '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>';

  // Name / greeting
  const savedName = getUserName();
  if (savedName) {
    updateGreeting(savedName);
    // hide welcome if already visited
    if (localStorage.getItem('cognipie_welcomed')) closeModal('welcomeModal');
  }

  typeLoop();
  render();
  toggleAdminView();
  attachHover();
});
