/* ═══════════════════════════════════════════
   COGNIEPIE — data.js  (all site content)
   ═══════════════════════════════════════════ */

const DATA = {

  /* ─── BLOGS ─── */
  blogs: [
    {
      id: 1,
      title: "Performance Testing: Backbone of Scalable Applications",
      excerpt: "Users expect apps to be fast under any load. Performance testing ensures they are — before your users find out the hard way.",
      content: `In today's fast-paced digital world, users expect applications to be fast, responsive, and reliable—no matter how many people are using them simultaneously. A delay of even a few seconds can lead to poor user experience, loss of revenue, and damage to brand reputation.

What is Performance Testing?
Performance testing is a non-functional testing technique used to evaluate the speed, responsiveness, stability, and scalability of an application under a particular workload.

Why It Matters:
1. Ensures Scalability — Applications must handle increasing numbers of users.
2. Identifies Bottlenecks — Uncovers slow queries, memory leaks, inefficient APIs.
3. Improves User Experience — Fast applications lead to better engagement.
4. Prevents System Failures — Avoid crashes during peak usage (sales, launches).

Types of Performance Testing:
- Load Testing: Expected user load behavior
- Stress Testing: Beyond system limits, finding breaking points
- Spike Testing: Sudden traffic surges (flash sales, viral events)
- Endurance (Soak) Testing: Sustained load to detect memory leaks
- Volume Testing: Large data volumes to validate DB efficiency

Key Metrics:
Response Time | Throughput (TPS) | Latency | Error Rate | CPU & Memory | Concurrent Users

Common Tools:
Apache JMeter, LoadRunner, Gatling, k6, BlazeMeter

Best Practices:
- Start performance testing early in the SDLC
- Use production-like environments
- Monitor both app and infrastructure metrics
- Automate for continuous integration
- Analyse trends over time, not single results

Conclusion:
Performance testing is not just a technical activity—it is a business necessity. Ensuring your application performs efficiently under all conditions is crucial in an era where user expectations have never been higher.`,
      category: "Performance Testing",
      tags: ["Performance Testing", "Load Testing", "JMeter", "k6"],
      author: "Amit Kumar",
      authorRole: "Senior QA Engineer",
      date: "March 25, 2026",
      readTime: "8 min read",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      featured: true,
      stats: { likes: 25, loves: 30, insightful: 12 }
    },
    {
      id: 2,
      title: "Mastering API Testing with Postman & REST Assured",
      excerpt: "API testing is the cornerstone of modern QA. Design robust, maintainable API test suites that catch regressions before they hit production.",
      content: `API testing is the cornerstone of modern QA strategy. As microservices architectures become the standard, validating the contracts between services is more important than ever.

Why API Testing First?
UI tests are slow, brittle, and expensive. API tests run faster, require less setup, and provide more precise failure isolation. Shift-left testing means catching defects at the API layer before they propagate to the UI.

Postman Collections for Team Collaboration:
Postman's collection runner allows you to execute hundreds of API tests in sequence. Environment variables manage credentials and base URLs. Use Newman to run collections in your CI/CD pipeline automatically.

REST Assured in Java:
given()
  .baseUri("https://api.cognipie.com")
  .header("Authorization", "Bearer " + token)
.when()
  .get("/qa/articles")
.then()
  .statusCode(200)
  .body("data.size()", greaterThan(0));

JSON Schema Validation:
Never just check status codes. Validate the response schema to catch breaking changes early. A 200 OK with malformed data is still a failure.

Best Practices:
- Test both happy paths and edge cases
- Validate response headers, not just bodies
- Include negative tests (invalid tokens, missing fields)
- Automate contract testing with Pact or Spring Cloud Contract
- Use environment variables — never hardcode credentials`,
      category: "API Testing",
      tags: ["API Testing", "Postman", "REST Assured", "Contract Testing"],
      author: "Neha",
      authorRole: "Automation Architect",
      date: "March 20, 2026",
      readTime: "6 min read",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
      featured: false,
      stats: { likes: 30, loves: 25, insightful: 8 }
    },
    {
      id: 3,
      title: "AI in QA: How LLMs Are Transforming Test Automation",
      excerpt: "Generative AI is not replacing QA engineers — it's supercharging them. Learn to integrate LLMs into your testing workflow.",
      content: `Generative AI is reshaping every profession, and QA is no exception. But the narrative that "AI will replace testers" misses the point entirely. AI is a force multiplier that gives skilled QA engineers superpowers.

AI-Powered Test Case Generation:
Using an LLM, you can generate comprehensive test cases from plain English feature descriptions. Feed the model your requirements and get a structured test matrix in seconds that would take hours manually.

Self-Healing Test Scripts:
Tools like Testim and Healenium automatically detect when a UI element locator breaks and apply fixes — drastically reducing test maintenance overhead in fast-moving UIs.

Visual Testing with AI:
Computer vision models compare screenshots pixel-by-pixel and flag visual regressions. Applitools Eyes uses AI to intelligently ignore irrelevant differences (timestamps, ads, dynamic content).

Natural Language Test Assertions:
Instead of writing brittle XPath selectors, describe what you want to verify in plain English. The AI maps your description to the correct element at runtime.

Getting Started:
1. Start with AI-assisted test case generation for new features
2. Integrate visual testing into your regression suite
3. Explore self-healing locators for high-churn UIs
4. Use LLMs for root cause analysis of flaky tests

The future of QA is human + AI collaboration. Those who embrace these tools will be the most valuable engineers in their organizations.`,
      category: "AI in QA",
      tags: ["AI in QA", "Test Automation", "LLM", "Visual Testing"],
      author: "Rohitash",
      authorRole: "QA Innovation Lead",
      date: "March 15, 2026",
      readTime: "7 min read",
      img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
      featured: true,
      stats: { likes: 45, loves: 40, insightful: 15 }
    },
    {
      id: 4,
      title: "Selenium 4 with TestNG: Enterprise-Grade Test Frameworks",
      excerpt: "Selenium 4 brought native DevTools Protocol support and a revamped Grid. Build a production-ready framework that scales.",
      content: `Selenium 4 is a significant upgrade. Native CDP support, improved W3C compliance, and a revamped grid make it the most production-ready version yet.

Project Architecture (Page Object Model):
src/
  main/java/
    pages/         → Page Objects
    utils/         → DriverFactory, ConfigReader
    models/        → Data models
  test/java/
    tests/         → TestNG test classes
    listeners/     → Reporting, retry logic
  resources/
    testng.xml     → Suite configuration

Key Selenium 4 Features:
- Relative Locators: Find elements relative to others (toLeftOf, above, near)
- CDP Integration: Mock network conditions, intercept requests, capture performance
- New Window APIs: driver.switchTo().newWindow(WindowType.TAB)
- Grid 4: Docker-first, auto-scaling, built-in observability

Parallel Execution:
Configure parallel execution in testng.xml to reduce suite runtime. With Grid 4, scale horizontally on demand using Docker containers.

Reporting:
Integrate Allure Reports for rich, interactive HTML reports your entire team will read — not just QA.

Best Practices:
- Keep page objects thin — no assertions inside page classes
- Use explicit waits, never Thread.sleep()
- Centralise configuration via properties files
- Tag tests for selective execution (smoke, regression, sanity)`,
      category: "Automation",
      tags: ["Selenium", "TestNG", "Java", "Page Object Model"],
      author: "Yogesh",
      authorRole: "SDET Lead",
      date: "March 10, 2026",
      readTime: "9 min read",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      featured: false,
      stats: { likes: 20, loves: 15, insightful: 5 }
    },
    {
      id: 5,
      title: "Cypress vs Playwright: Which Framework Wins in 2026?",
      excerpt: "Two modern frontrunners in web test automation go head-to-head. We compare DX, speed, cross-browser support, and enterprise readiness.",
      content: `The E2E testing landscape in 2026 has two dominant players: Cypress and Playwright. Both are excellent, but they have distinct philosophical differences.

Cypress — JavaScript-First, Developer-Friendly:
Runs inside the browser giving unique capabilities like time-travel debugging and real-time reloading. The go-to choice for teams prioritizing developer experience.
Strengths: Real-time test runner, component testing support, exceptional documentation.
Limitations: Limited multi-tab support, single-origin restriction.

Playwright — The Enterprise Powerhouse:
Microsoft's Playwright is built for cross-platform, cross-browser automation. Runs outside the browser via WebSocket for true parallel execution across Chromium, Firefox, and WebKit.
Strengths: True parallel execution, network interception, mobile emulation, trace viewer.
Limitations: Steeper learning curve, less opinionated structure.

Comparison:
Speed         → Playwright wins (parallel by default)
DX            → Cypress wins (visual runner)
Cross-browser → Playwright wins (Firefox + WebKit)
Component     → Cypress wins (CT built-in)
Enterprise    → Playwright wins (scaling, tracing)

The Verdict:
Choose Cypress if your team is JS/React-focused and values DX.
Choose Playwright for large-scale enterprise automation with cross-browser and mobile requirements.`,
      category: "Automation",
      tags: ["Playwright", "Cypress", "E2E Testing", "Comparison"],
      author: "Neha",
      authorRole: "Principal Automation Engineer",
      date: "March 5, 2026",
      readTime: "5 min read",
      img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
      featured: false,
      stats: { likes: 35, loves: 20, insightful: 10 }
    }
  ],

  /* ─── EVENTS ─── */
  // past: true = happened already | past: false = upcoming
  events: [
    {
      id: 1,
      title: "ERA Summer Fellowship in AI Safety",
      type: "Fellowship",
      mode: "In-Person",
      date: "July 6 - September 11, 2026",
      location: "Cambridge, UK",
      desc: "ERA opened applications for their summer fellowship in AI safety. Ten weeks supporting early-career researchers and entrepreneurs to mitigate risks from frontier AI.",
      tags: ["AI Safety", "Research", "Fellowship"],
      img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
      priceType: "Free", past: false, link: "https://erafellowship.org/fellowship"
    },
    {
      id: 2,
      title: "EuroSTAR Software Testing Conference 2026",
      type: "Conference",
      mode: "In-Person",
      date: "June 15-18, 2026",
      location: "Oslo, Norway",
      desc: "Europe's premier software testing conference. Theme: 'Testing at its Best'. Over 500 QA professionals from 40+ countries.",
      tags: ["Software Testing", "EuroSTAR", "Conference"],
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
      priceType: "Paid", past: false, link: "https://conference.eurostarsoftwaretesting.com/conference/2026/programme/"
    },
    {
      id: 3,
      title: "Strategink Visionary Awards 2026",
      type: "Award Ceremony",
      mode: "In-Person",
      date: "August 2026",
      location: "Mumbai, India",
      desc: "Celebrating pioneers transforming industries through innovation, resilience, and strategic excellence. Open for nominations.",
      tags: ["Leadership", "Innovation", "Awards"],
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      priceType: "Paid", past: false, link: "https://www.strategink.com/vision-2026/award-nomination/?urlid=Response"
    },
    {
      id: 4,
      title: "Red Hat Summit Field Events",
      type: "Enterprise Event",
      mode: "Hybrid",
      date: "September 2026",
      location: "Global — Multiple Cities",
      desc: "Red Hat field events across major cities covering open source innovation, hybrid cloud, and DevOps at scale.",
      tags: ["Open Source", "Red Hat", "Cloud"],
      img: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=800&auto=format&fit=crop",
      priceType: "Free", past: false, link: "https://reg.experiences.redhat.com/flow/redhat/3642950/fieldeventsregapproveform"
    },
    {
      id: 5,
      title: "TestBash Brighton 2025",
      type: "Conference",
      mode: "In-Person",
      date: "October 14-15, 2025",
      location: "Brighton, UK",
      desc: "Ministry of Testing's flagship conference for the global testing community. Talks, workshops, and deep networking.",
      tags: ["Software Testing", "TestBash", "Ministry of Testing"],
      img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
      priceType: "Paid", past: true, link: "https://www.ministryoftesting.com/testbash"
    },
    {
      id: 6,
      title: "STAREAST Software Testing Conference 2025",
      type: "Conference",
      mode: "In-Person",
      date: "April 27 - May 2, 2025",
      location: "Orlando, Florida, USA",
      desc: "One of North America's largest software testing conferences. Deep dives into automation, AI, Agile testing, and leadership.",
      tags: ["Software Testing", "STAREAST", "Automation"],
      img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
      priceType: "Paid", past: true, link: "https://stareast.techwell.com/"
    }
  ],

  /* ─── SERVICES ─── */
  services: [
    { id:1, title:"Test Automation Setup", icon:"fa-robot", color:"#3b82f6", desc:"End-to-end automation framework setup using Selenium, Playwright, or Cypress. Includes CI/CD integration, reporting, and team enablement.", features:["Framework Architecture","CI/CD Integration","Allure Reporting","3-month Support"], price:"Starting at ₹50,000" },
    { id:2, title:"API & Contract Testing", icon:"fa-plug", color:"#8b5cf6", desc:"Comprehensive API test strategy, collection design, and Pact contract testing to ensure microservices communicate reliably.", features:["Postman/REST Assured Setup","Pact Contract Testing","Mock Server Config","Documentation"], price:"Starting at ₹35,000" },
    { id:3, title:"Performance Testing", icon:"fa-gauge-high", color:"#10b981", desc:"Load, stress, and endurance testing using JMeter or k6. Identify bottlenecks before they impact your production users.", features:["Workload Modeling","Bottleneck Analysis","Infrastructure Recommendations","Executive Report"], price:"Starting at ₹45,000" },
    { id:4, title:"Security Testing", icon:"fa-shield-halved", color:"#f59e0b", desc:"OWASP Top 10 assessment, penetration testing, and security test automation to protect your application and user data.", features:["OWASP Assessment","Penetration Testing","SAST/DAST Integration","Compliance Report"], price:"Starting at ₹60,000" },
    { id:5, title:"QA Consulting & Strategy", icon:"fa-lightbulb", color:"#ec4899", desc:"Strategic QA roadmap, process audit, and team capability assessment to elevate your quality engineering maturity.", features:["QA Maturity Assessment","Process Optimization","Toolchain Evaluation","Training Plan"], price:"Starting at ₹25,000" },
    { id:6, title:"AI/ML Model Testing", icon:"fa-brain", color:"#06b6d4", desc:"Specialized testing for ML models including data validation, model evaluation, bias detection, and LLM prompt testing.", features:["Dataset Validation","Model Benchmarking","Bias & Fairness Testing","LLM Prompt Testing"], price:"Starting at ₹70,000" }
  ],

  /* ─── CAREERS ─── */
  careers: [
    { id:1, title:"Senior QA Automation Engineer", company:"CogniPie Partner Network", location:"Bengaluru / Remote", type:"Full-time", experience:"3-6 Years", skills:["Selenium","Java","TestNG","Cucumber"], salary:"₹12–20 LPA", desc:"Lead automation framework development for a fast-growing fintech startup. Own the quality strategy for web and mobile.", posted:"2 days ago" },
    { id:2, title:"API & Performance Testing Lead", company:"TechScale Solutions", location:"Hyderabad / Hybrid", type:"Full-time", experience:"4-8 Years", skills:["JMeter","k6","Postman","REST Assured"], salary:"₹15–22 LPA", desc:"Build and scale the performance testing practice for a cloud SaaS platform serving 2M+ users.", posted:"5 days ago" },
    { id:3, title:"QA Engineer — AI Products", company:"NeuralBridge AI", location:"Remote", type:"Full-time", experience:"2-4 Years", skills:["Python","LLM Testing","Pytest","Data Validation"], salary:"₹10–18 LPA", desc:"Test cutting-edge AI products including conversational agents and ML-powered recommendation systems.", posted:"1 week ago" },
    { id:4, title:"SDET — Mobile Testing", company:"Appcraft Labs", location:"Pune / Remote", type:"Full-time", experience:"2-5 Years", skills:["Appium","Espresso","XCUITest","Python"], salary:"₹8–15 LPA", desc:"Drive mobile quality for a consumer finance app with 10M+ downloads on iOS and Android.", posted:"1 week ago" },
    { id:5, title:"QA Intern — Automation Track", company:"CogniPie Academy", location:"Remote", type:"Internship", experience:"0-1 Year", skills:["Selenium Basics","SQL","Manual Testing"], salary:"₹8,000–15,000/mo", desc:"Learn by doing. Real automation projects under senior QA mentorship. Stipend + certificate + placement support.", posted:"3 days ago" }
  ],

  /* ─── BOOKS & COURSES ─── */
  books: [
    { id:1, title:"The Art of Software Testing", author:"Glenford J. Myers", category:"Books", desc:"The definitive classic on software testing philosophy. Every QA professional's essential first read.", img:"https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop", rating:4.8, link:"https://www.amazon.in/s?k=Art+of+Software+Testing", linkLabel:"Get Book on Amazon", badge:"Classic" },
    { id:2, title:"How Google Tests Software", author:"James Whittaker et al.", category:"Books", desc:"Inside Google's engineering culture and how one of the world's best QA teams ensures quality at scale.", img:"https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=400&auto=format&fit=crop", rating:4.9, link:"https://www.amazon.in/s?k=How+Google+Tests+Software", linkLabel:"Get Book on Amazon", badge:"Top Pick" },
    { id:3, title:"AI-Powered Testing", author:"Tariq King", category:"Books", desc:"Future-forward exploration of how AI and ML are transforming quality assurance practices entirely.", img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop", rating:4.7, link:"https://www.amazon.in/s?k=AI+Powered+Testing", linkLabel:"Get Book on Amazon", badge:"Trending" },
    { id:4, title:"Selenium WebDriver Recipes in Python", author:"Zhimin Zhan", category:"Books", desc:"Practical, recipe-based guide to solving common Selenium automation challenges using Python.", img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400&auto=format&fit=crop", rating:4.4, link:"https://www.amazon.in/s?k=Selenium+WebDriver+Recipes+Python", linkLabel:"Get Book on Amazon", badge:"Popular" },
    { id:5, title:"Software Testing: Principles & Practices", author:"Srinivasan Desikan", category:"Books", desc:"A comprehensive guide widely used in Indian engineering colleges. Covers manual, automation, and test management.", img:"https://images.unsplash.com/photo-1550592704-6c76defa9985?q=80&w=400&auto=format&fit=crop", rating:4.3, link:"https://www.amazon.in/s?k=Software+Testing+Desikan", linkLabel:"Get Book on Amazon", badge:"Recommended" },
    { id:6, title:"Selenium WebDriver with Java — Zero to Hero", author:"Rahul Shetty Academy", category:"Free Courses", desc:"Highly rated FREE course. Learn Selenium WebDriver with Java from scratch — automation framework, TestNG, POM.", img:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=400&auto=format&fit=crop", rating:4.6, link:"https://www.udemy.com/course/selenium-real-time-examplesinterview-questions/", linkLabel:"Free Course", badge:"Free" },
    { id:7, title:"Postman: Complete API Testing Guide", author:"Valentin Despa", category:"Free Courses", desc:"Learn API testing — collections, environments, Newman CI, and contract testing basics. Highly practical.", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop", rating:4.7, link:"https://www.udemy.com/course/postman-the-complete-guide/", linkLabel:"Access Course", badge:"Free / Paid" },
    { id:8, title:"Python for Beginners — Full Bootcamp", author:"Jose Portilla", category:"Free Courses", desc:"Master Python for test automation. Perfect for QA engineers switching to Python-based frameworks like Pytest and Robot Framework.", img:"https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=400&auto=format&fit=crop", rating:4.6, link:"https://www.udemy.com/course/complete-python-bootcamp/", linkLabel:"Free Course", badge:"Free" },
    { id:9, title:"Software Testing Masterclass — Cucumber + Appium", author:"Nikolay Advolodkin", category:"Free Courses", desc:"Free course covering BDD with Cucumber, Appium mobile testing, and cross-browser automation best practices.", img:"https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=400&auto=format&fit=crop", rating:4.5, link:"https://www.udemy.com/course/the-complete-selenium-course-beginner-to-framework/", linkLabel:"Free Course", badge:"Free" }
  ],

  /* ─── ACADEMY COURSES ─── */
  academy: [
    { id:1, title:"Complete Test Automation Bootcamp", level:"Beginner to Pro", duration:"12 Weeks", icon:"fa-robot", color:"#3b82f6", desc:"From zero to automation hero. Master Selenium, TestNG, Cucumber, and CI/CD pipelines with live mentoring.", topics:["Java for Testers","Selenium 4 Deep Dive","TestNG & Cucumber BDD","GitHub Actions CI/CD","Allure Reporting"], webinar:true },
    { id:2, title:"API Testing Masterclass", level:"Intermediate", duration:"6 Weeks", icon:"fa-plug", color:"#8b5cf6", desc:"Master Postman, REST Assured, contract testing, and GraphQL testing with real-world projects.", topics:["REST API Fundamentals","Postman Collections & Newman","REST Assured in Java","Contract Testing with Pact","GraphQL API Testing"], webinar:false },
    { id:3, title:"Performance Engineering", level:"Advanced", duration:"8 Weeks", icon:"fa-gauge-high", color:"#10b981", desc:"JMeter, k6, Grafana dashboards, and bottleneck analysis. Become the go-to performance engineer.", topics:["Load Modeling & Test Design","JMeter Advanced Scripting","k6 Modern Load Testing","InfluxDB & Grafana Dashboards","Performance Analysis & Reports"], webinar:false },
    { id:4, title:"AI in QA — The Future Course", level:"Intermediate", duration:"4 Weeks", icon:"fa-brain", color:"#ec4899", desc:"Use LLMs, visual AI, and self-healing test tools to supercharge your existing automation suite.", topics:["LLM-Powered Test Generation","Applitools Visual AI","Self-Healing with Healenium","AI Root Cause Analysis","Prompt Engineering for QA"], webinar:false }
  ],

  /* ─── OPEN SOURCE PROJECTS ─── */
  openSourceProjects: [
    { name:"Selenium", repo:"https://github.com/SeleniumHQ/selenium", stars:"29k+", lang:"Java/Python/JS", desc:"The industry-standard browser automation framework. Great for beginners — start with documentation fixes or writing Python/Java examples.", issue:"good first issue" },
    { name:"Playwright", repo:"https://github.com/microsoft/playwright", stars:"64k+", lang:"TypeScript", desc:"Microsoft's cross-browser automation library. Contribute test utilities, fix flaky tests, or improve CLI tooling.", issue:"good first issue" },
    { name:"k6", repo:"https://github.com/grafana/k6", stars:"24k+", lang:"Go/JS", desc:"Open-source performance testing tool by Grafana. Help with JavaScript API documentation, examples, or browser testing modules.", issue:"help wanted" },
    { name:"Appium", repo:"https://github.com/appium/appium", stars:"17k+", lang:"TypeScript", desc:"Mobile automation framework for iOS and Android. Contribute drivers, fix platform-specific bugs, or write documentation.", issue:"good first issue" },
    { name:"Robot Framework", repo:"https://github.com/robotframework/robotframework", stars:"9k+", lang:"Python", desc:"Generic test automation framework using keyword-driven approach. Contribute libraries, keywords, or documentation improvements.", issue:"good first issue" },
    { name:"Gatling", repo:"https://github.com/gatling/gatling", stars:"6k+", lang:"Scala", desc:"High-performance load testing tool. Contribute simulation examples, fix documentation, or help with Kotlin DSL support.", issue:"help wanted" }
  ],

  /* ─── LIVE PROJECTS ─── */
  projects: [
    { id:1, title:"E-Commerce QA Challenge", difficulty:"Beginner", color:"#10b981", tech:["Manual Testing","SQL","Postman"], desc:"Test a fully functional sample e-commerce app. Write 50+ test cases, execute them, and submit a structured bug report.", objectives:["Functional Test Case Design","Bug Report Writing","Regression Testing","API Validation"], participants:124, deadline:"Open" },
    { id:2, title:"Banking API Automation Suite", difficulty:"Intermediate", color:"#3b82f6", tech:["REST Assured","Java","TestNG","Maven"], desc:"Build an end-to-end API automation suite for a mock banking app. Implement data-driven tests, schema validation, and CI pipeline.", objectives:["API Framework Design","Data-Driven Testing","JSON Schema Validation","GitHub Actions CI"], participants:63, deadline:"April 30, 2026" },
    { id:3, title:"Performance Baseline — Social App", difficulty:"Advanced", color:"#f59e0b", tech:["k6","InfluxDB","Grafana","Docker"], desc:"Establish a performance baseline for a high-traffic social media API. Design workload models and present an optimization report.", objectives:["Workload Modeling","Bottleneck Analysis","Metrics Dashboard","Optimization Report"], participants:28, deadline:"May 15, 2026" }
  ],

  /* ─── TESTIMONIALS ─── */
  testimonials: [
    { name:"Priya Menon", role:"QA Lead @ Flipkart", text:"CogniPie transformed my career. The live projects gave me real portfolio pieces that impressed every interviewer. Placed in 3 months!", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop&crop=face", achievement:"Placed at ₹16 LPA" },
    { name:"Arjun Reddy", role:"SDET @ Razorpay", text:"The API Testing Masterclass was the best ₹499 I've ever spent. Industry-current content and unmatched community support.", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop&crop=face", achievement:"Promoted to SDET in 6 months" },
    { name:"Sneha Krishnan", role:"Performance Engineer @ Juspay", text:"As a career switcher with no IT background, CogniPie's structured blogs and mentorship gave me the confidence to land my first QA role.", img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop&crop=face", achievement:"Career switch in 4 months" }
  ],

  /* ─── NEWSLETTERS (grouped by month) ─── */
  newsletters: [
    {
      id:1, edition:"#12", month:"March", year:"2026", date:"March 28, 2026",
      subject:"AI in Testing Goes Mainstream — Tools, Trends & Top Jobs",
      preview:"AI-powered testing tools hit mainstream adoption this month. Here's what you need to know.",
      img:"https://images.unsplash.com/photo-1585079542156-2755d9c8a094?q=80&w=600&auto=format&fit=crop",
      content:[
        { type:"heading", text:"This Month in QA — March 2026" },
        { type:"paragraph", text:"Welcome to Edition #12 of The QA Pulse! March was an exciting month in the QA world. AI testing tools have officially crossed the mainstream adoption chasm, with enterprise teams everywhere integrating LLM-powered test generation into their workflows." },
        { type:"heading", text:"Top Stories This Month" },
        { type:"list", items:["Playwright 2.1 released with improved mobile emulation and native PDF testing support","Applitools reports 340% growth in AI visual testing adoption among Fortune 500 companies","k6 joins Grafana's open-source ecosystem with native cloud integration","ISTQB releases updated AI Testing certification syllabus for 2026"] },
        { type:"heading", text:"Community Highlights" },
        { type:"paragraph", text:"Over 180 members completed the API Testing Masterclass this month. Special congratulations to Priya, Arjun, and Sneha for their outstanding project submissions reviewed by our senior engineers." },
        { type:"heading", text:"Job Market Pulse" },
        { type:"paragraph", text:"SDET roles are up 28% YoY in Indian tech. AI testing skills command a 35-45% salary premium. Companies most actively hiring: Razorpay, Juspay, Swiggy, Zepto, and Groww." },
        { type:"heading", text:"Resource of the Month" },
        { type:"paragraph", text:"This month's must-read: 'Testing LLM Applications' — a practical guide by our very own editorial team covering prompt injection tests, hallucination detection, and output schema validation."}
      ]
    },
    {
      id:2, edition:"#11B", month:"March", year:"2026", date:"March 14, 2026",
      subject:"Mid-March Special: Performance Testing Deep Dive + k6 vs JMeter Updated",
      preview:"Our most-requested comparison is back — with 2026 benchmarks and real-world scenarios.",
      img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      content:[
        { type:"heading", text:"Mid-March Special Edition" },
        { type:"paragraph", text:"You asked for it! Following last month's performance testing blog, we deep-dive into the k6 vs JMeter debate with fresh 2026 benchmarks." },
        { type:"heading", text:"k6 vs JMeter — 2026 Benchmark Results" },
        { type:"list", items:["k6 handles 3x more concurrent users per CPU core than JMeter","JMeter's GUI still wins for non-programmers and quick test design","k6's JavaScript API makes it far easier to integrate into modern CI pipelines","JMeter has 50+ protocols; k6 focuses on HTTP/WebSocket brilliantly"] },
        { type:"heading", text:"Our Recommendation" },
        { type:"paragraph", text:"Use JMeter for legacy enterprise projects and cross-protocol testing. Use k6 for everything new — cloud native, microservices, and CI/CD-first architectures." },
        { type:"heading", text:"Upcoming Webinar Alert" },
        { type:"paragraph", text:"Join us on April 28 for the API Testing Masterclass. Limited seats at ₹499. Early bird discount expires March 31. Register at webinar.cognipie.com" }
      ]
    },
    {
      id:3, edition:"#11", month:"February", year:"2026", date:"February 28, 2026",
      subject:"February Wrap: Playwright 2.0 Deep-Dive & Top QA Resources of 2026",
      preview:"Playwright 2.0 is here. We tested every new feature so you don't have to.",
      img:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop",
      content:[
        { type:"heading", text:"February 2026 — The QA Pulse" },
        { type:"paragraph", text:"February brought us Playwright 2.0 — the biggest release in 2 years. We spent 3 weeks testing every feature and here's our honest take." },
        { type:"heading", text:"What's New in Playwright 2.0" },
        { type:"list", items:["Native PDF generation testing — test your PDF output directly in tests","Improved accessibility testing APIs built into the core library","New UI mode with timeline view for debugging parallel test runs","Component testing for React, Vue, and Angular reaches stable status"] },
        { type:"heading", text:"Top QA Resources of Early 2026" },
        { type:"list", items:["freecodecamp.org published a 12-hour Selenium course (free)","Test Automation University added 8 new courses on AI testing","Our own Performance Testing blog hit 50k views — thank you!"] },
        { type:"heading", text:"Community Growth" },
        { type:"paragraph", text:"We crossed 10,000 registered members this month! Thank you for being part of this journey. To celebrate, we're opening 50 free seats for the upcoming API Testing Masterclass." }
      ]
    },
    {
      id:4, edition:"#10", month:"January", year:"2026", date:"January 31, 2026",
      subject:"New Year, New Skills: Your 2026 QA Learning Roadmap",
      preview:"We mapped out the exact skills, tools, and certifications that will matter most in 2026.",
      img:"https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=600&auto=format&fit=crop",
      content:[
        { type:"heading", text:"January 2026 — New Year Edition" },
        { type:"paragraph", text:"Happy New Year from the CogniPie team! January is the time to plan, so we've built your complete 2026 QA skill roadmap based on job market analysis and community surveys." },
        { type:"heading", text:"Most In-Demand QA Skills — 2026" },
        { type:"list", items:["AI/ML Testing (HIGHEST demand — 45% salary premium)","Playwright E2E Automation","API Testing (Postman + REST Assured)","Performance Engineering (k6 + Grafana)","Mobile Testing (Appium 2.0)","Security Testing (OWASP)"] },
        { type:"heading", text:"Top Certifications to Pursue" },
        { type:"list", items:["ISTQB Foundation + Advanced (still the gold standard globally)","AWS Certified DevOps Engineer (QA-adjacent but highly valued)","Postman Student Expert certification (free, recognized by hiring managers)","CAST — Certified Agile Software Tester"] },
        { type:"heading", text:"CogniPie 2026 Plans" },
        { type:"paragraph", text:"We're launching 4 new courses this year, doubling our live project offerings, and hosting India's first dedicated QA Summit in Bengaluru. Stay tuned — 2026 is going to be big!" }
      ]
    }
  ]
};
