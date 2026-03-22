/* --- Theme Toggle Logic --- */
function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('themeToggleBtn');
    const isDark = html.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('cognipie_theme', 'light');
        btn.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>';
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('cognipie_theme', 'dark');
        btn.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
    }
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('cognipie_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const btn = document.getElementById('themeToggleBtn');
    if(savedTheme === 'dark') {
        btn.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
    }
});

/* --- Smooth Interactive Cursor --- */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.15; ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

const addHoverEvents = () => {
    document.querySelectorAll('button, a, input, select, textarea, .card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });
};

/* --- Application Logic & Data --- */
let blogs = JSON.parse(localStorage.getItem('cognipie_blogs')) || [
    { id: 1, title: "Local AI Agents: LangChain & Ollama", content: "Testing generative AI requires a secure sandbox. By running Ollama locally, QA teams can safely script automated prompts without exposing sensitive test data to the public cloud.\n\nImplementing LangChain in Python to parse the responses allows you to build assertions against fuzzy data. For instance, you can use semantic similarity checks rather than strict string matching to validate model outputs.", status: "approved", author: "AI_Engineer", imgSeed: "artificial" },
    { id: 2, title: "Automating Mainframe ZOS Workloads", content: "Legacy systems don't have to mean legacy workflows. Integrating your Mainframe ZOS operations into Ansible playbooks allows you to treat mainframe tasks as code.\n\nBy leveraging the IBM z/OS core collection, teams can automate job submission, data set management, and even IMS DB queries directly from their modern CI/CD pipelines.", status: "approved", author: "SysAdmin_Core", imgSeed: "mainframe" },
    { id: 3, title: "End-to-End Microservices Validation", content: "Testing a monolithic architecture is straightforward. Testing a distributed system across Kubernetes clusters is not. \n\nThis article breaks down how to orchestrate end-to-end tests across a React frontend and multiple Java/Python backend microservices using Playwright and Docker Compose for localized environment replication.", status: "approved", author: "K8s_Master", imgSeed: "servers" },
    { id: 4, title: "Migrating Legacy API Tests", content: "Moving away from bloated, UI-heavy test suites to streamlined API validation. We explore the structural differences between Selenium UI tests and REST Assured API tests, focusing on asynchronous assertions and complex JSON schema validation.", status: "pending", author: "Creative_QA", imgSeed: "code" }
];

const courses = [
    { id: 101, title: "AI-Powered Test Automation", desc: "Integrate LLMs into your testing workflows using local agents.", syllabus: ["Prompt Engineering for Testers", "Deploying Ollama Locally", "LangChain Python Basics", "Evaluating RAG Pipelines"], imgSeed: "neural" },
    { id: 102, title: "DevOps for Legacy Systems", desc: "Bridge the gap between modern CI/CD and legacy infrastructure.", syllabus: ["Linux Shell Scripting Masterclass", "Ansible Playbook Design", "Mainframe ZOS Automation Integration", "Secrets Management with Vault"], imgSeed: "datacenter" },
    { id: 103, title: "Full-Stack Microservices", desc: "Understand the architecture you are testing.", syllabus: ["React State Management", "Building Java/Python REST APIs", "Docker Containerization", "Kubernetes Ingress & Routing"], imgSeed: "stack" }
];

const events = [
    { id: 1, title: "Bengaluru AI & Automation Summit", type: "Conference", desc: "Join industry leaders in Bengaluru to discuss the integration of LLMs in enterprise test architecture." },
    { id: 2, title: "Campus Hackathon: Break the Pipeline", type: "Student Event", desc: "A weekend challenge for college students to build and intentionally break automated CI/CD pipelines." }
];

let activeNavId = 'nav-discover';
function getCurrentUser() { return document.getElementById('usernameInput').value.trim() || 'CognipieUser'; }

function toggleAdminView() {
    const role = document.getElementById('roleSelect').value;
    const display = (role === 'admin') ? 'block' : 'none';
    document.getElementById('adminLabel').style.display = display;
    document.getElementById('adminSub').style.display = display;
    if(role !== 'admin' && activeNavId === 'nav-admin') switchTab('discover', document.getElementById('nav-discover'));
    else render();
}

function switchTab(id, btn) {
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
        const animatedElements = s.querySelectorAll('.animate-up');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; 
            el.style.animation = null; 
        });
    });
    
    if(btn) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeNavId = btn.id;
    }
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
    render();
}

function openReader(id) {
    const article = blogs.find(b => b.id === id);
    document.getElementById('readTitle').innerText = article.title;
    document.getElementById('readAuthor').innerText = article.author;
    document.getElementById('readAvatarInitials').innerText = article.author.charAt(0).toUpperCase();
    document.getElementById('readContent').innerText = article.content;
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('read-view').classList.add('active');
    window.scrollTo(0, 0);
}
function closeReader() { document.querySelectorAll('.section').forEach(s => s.classList.remove('active')); document.getElementById(activeNavId.replace('nav-', '')).classList.add('active'); window.scrollTo(0, 0); }

function openCourse(id) {
    const course = courses.find(c => c.id === id);
    document.getElementById('courseTitleView').innerText = course.title;
    document.getElementById('courseDescView').innerText = course.desc;
    document.getElementById('courseSyllabusView').innerHTML = course.syllabus.map(s => `<li>${s}</li>`).join('');
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('course-view').classList.add('active');
    window.scrollTo(0, 0);
}
function closeCourse() { document.querySelectorAll('.section').forEach(s => s.classList.remove('active')); document.getElementById('academy').classList.add('active'); window.scrollTo(0, 0); }

function handleSave(status) {
    const id = document.getElementById('editId').value;
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    if(!title || !content) return alert("System requires complete data entry.");

    if(id) blogs = blogs.map(b => b.id == id ? {...b, title, content, status} : b);
    else blogs.push({ id: Date.now(), title, content, status, comment: "", author: getCurrentUser(), imgSeed: Date.now() });
    
    localStorage.setItem('cognipie_blogs', JSON.stringify(blogs));
    document.getElementById('editId').value = ''; document.getElementById('postTitle').value = ''; document.getElementById('postContent').value = '';
    document.getElementById('formTitle').innerHTML = `Initialize Draft`;
    render();
}

function render() {
    const currentUser = getCurrentUser();

    // Admin Stats
    document.getElementById('statApproved').innerText = blogs.filter(b => b.status === 'approved').length;
    document.getElementById('statPending').innerText = blogs.filter(b => b.status === 'pending').length;
    document.getElementById('statRejected').innerText = blogs.filter(b => b.status === 'rejected').length;

    // 1. Discover Feed
    document.getElementById('feedContainer').innerHTML = blogs.filter(b => b.status === 'approved').map(b => `
        <div class="card" onclick="openReader(${b.id})">
            <div class="card-img-wrapper"><img class="card-img" src="https://picsum.photos/seed/${b.imgSeed}/600/400?grayscale" alt="Cover"></div>
            <div class="card-body">
                <h3>${b.title}</h3>
                <p>${b.content.substring(0, 110)}...</p>
                <div class="card-footer">
                    <div style="display:flex; align-items:center; font-weight:700; font-size:0.9rem; letter-spacing:0.5px; color:var(--text-main);"><div class="author-av">${b.author.charAt(0).toUpperCase()}</div> ${b.author}</div>
                    <span style="color:var(--accent-1); font-size:1.5rem; transition: transform 0.3s;" class="arrow-icon"><i class="fa-solid fa-arrow-right-long"></i></span>
                </div>
            </div>
        </div>
    `).join('') || '<p style="color:var(--text-muted)">Awaiting transmissions...</p>';

    // 2. Events
    document.getElementById('eventsContainer').innerHTML = events.map(e => `
        <div class="card" style="flex-direction: row; align-items: center; border-left: 4px solid var(--accent-3);">
            <div class="card-body" style="flex-direction: row; align-items: center; gap: 30px;">
                <div style="background: rgba(236,72,153,0.1); color: var(--accent-3); padding: 20px; border-radius: 16px; font-size: 2rem; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-calendar-day"></i>
                </div>
                <div>
                    <span class="badge bg-warning" style="margin-bottom: 10px; display: inline-block;">${e.type}</span>
                    <h3 style="margin-bottom: 8px;">${e.title}</h3>
                    <p style="margin: 0; font-size: 0.95rem;">${e.desc}</p>
                </div>
            </div>
        </div>
    `).join('');

    // 3. Workspace
    const myBlogs = blogs.filter(b => b.author === currentUser);
    document.getElementById('myBlogsContainer').innerHTML = myBlogs.map(b => `
        <div style="background:var(--bg-surface); border:1px solid var(--border-light); border-radius:20px; padding:25px; display:flex; gap:25px; align-items:center;">
            <div style="width: 120px; height: 120px; border-radius: 16px; overflow: hidden; flex-shrink: 0; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
                <img style="width:100%; height:100%; object-fit:cover; filter: grayscale(20%);" src="https://picsum.photos/seed/${b.imgSeed}/200/200" alt="Cover">
            </div>
            <div style="flex-grow: 1;">
                <h3 style="font-size:1.3rem; margin-bottom:10px; color:var(--text-main);">${b.title}</h3>
                <span class="badge bg-${b.status}">${b.status}</span>
                ${b.comment ? `<div style="color:var(--accent-3); font-size:0.9rem; margin-top:10px; background: rgba(236, 72, 153, 0.1); padding: 10px; border-radius: 8px;"><i class="fa-solid fa-code-pull-request"></i> ${b.comment}</div>` : ''}
            </div>
            <div style="display:flex; flex-direction:column; gap:10px;">
                ${b.status !== 'approved' ? `<button class="btn-action btn-secondary" onclick="startEdit(${b.id})"><i class="fa-solid fa-pen"></i> Update</button>` : ''}
                <button class="btn-action btn-danger" onclick="deletePost(${b.id})"><i class="fa-solid fa-trash"></i> Drop</button>
            </div>
        </div>
    `).join('') || `<p style="color:var(--text-muted); font-size: 1.1rem;">No data entries for: <span style="color:var(--text-main); font-weight:bold;">${currentUser}</span></p>`;

    // 4. Admin Queue
    document.getElementById('adminQueueContainer').innerHTML = blogs.filter(b => b.status === 'pending').map(b => `
        <div class="card" style="border-top: 3px solid var(--accent-1);">
            <div class="card-body">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px; font-weight:700; color:var(--text-main); font-size:0.9rem; background:var(--input-bg); padding:10px 15px; border-radius:12px; border:1px solid var(--border-light);">
                    <div class="author-av" style="width:30px; height:30px; font-size:0.8rem; margin:0;">${b.author.charAt(0).toUpperCase()}</div> ORIGIN: ${b.author}
                </div>
                <h3>${b.title}</h3>
                <p>${b.content.substring(0, 100)}...</p>
                <div class="card-footer" style="padding-top:20px; margin-top:20px;">
                    <button class="btn btn-secondary" style="padding:10px 20px; font-size:0.9rem;" onclick="openReader(${b.id})">Analyze</button>
                    <div style="display:flex; gap:10px;">
                        <button class="btn-action btn-secondary" style="color:var(--success); border-color:rgba(16,185,129,0.3);" onclick="updateStatus(${b.id}, 'approved')"><i class="fa-solid fa-check"></i></button>
                        <button class="btn-action btn-secondary" style="color:var(--accent-3); border-color:rgba(236,72,153,0.3);" onclick="handleReject(${b.id})"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `).join('') || '<p style="color:var(--text-muted)">Queue empty. All systems normal.</p>';

    // 5. Academy Courses
    document.getElementById('coursesContainer').innerHTML = courses.map(c => `
        <div class="card">
            <div class="card-img-wrapper"><img class="card-img" src="https://picsum.photos/seed/${c.imgSeed}/600/400?grayscale" alt="Cover"></div>
            <div class="card-body">
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
                <button class="btn btn-primary mt-auto" style="width:100%;" onclick="openCourse(${c.id})">Load Simulation <i class="fa-solid fa-play"></i></button>
            </div>
        </div>
    `).join('');

    addHoverEvents();
}

function handleReject(id) {
    const feedback = prompt("Input rejection parameters:");
    if(feedback === null) return;
    blogs = blogs.map(b => b.id === id ? {...b, status: 'rejected', comment: feedback} : b);
    localStorage.setItem('cognipie_blogs', JSON.stringify(blogs));
    render();
}

function updateStatus(id, status) {
    blogs = blogs.map(b => b.id === id ? {...b, status, comment: ""} : b);
    localStorage.setItem('cognipie_blogs', JSON.stringify(blogs));
    render();
}

function startEdit(id) {
    const b = blogs.find(x => x.id == id);
    document.getElementById('editId').value = b.id; document.getElementById('postTitle').value = b.title; document.getElementById('postContent').value = b.content;
    document.getElementById('formTitle').innerHTML = `Modify Protocol`;
    window.scrollTo(0, 0);
}

function deletePost(id) {
    if(confirm("Execute permanent deletion?")) {
        blogs = blogs.filter(x => x.id != id);
        localStorage.setItem('cognipie_blogs', JSON.stringify(blogs));
        render();
    }
}

toggleAdminView();
