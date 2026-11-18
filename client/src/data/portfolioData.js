export const personalDetails = {
  name: "Rahul Chaurasiya",
  tagline: "Full-Stack Developer",
  subTagline: "Building scalable production web applications, REST APIs & AI/automation workflows",
  phone: "+91 9987312800",
  email: "rc420594@gmail.com",
  location: "Mumbai, India",
  college: "University of Mumbai | Prahladrai Dalmia Lions College",
  linkedin: "https://www.linkedin.com/in/rahul-chaurasiya-48290b281",
  github: "https://github.com/rahulchaurasiya722003",
  portfolioUrl: "https://rahul-chaurasiya-portfolio-opal.vercel.app",
  photo: "/images/rahul-chaurasiya.png",
  logo: "/images/logo.png",
  resumePdf: "/docs/Rahul_Chaurasiya_Resume.pdf",
  summary:
    "Full-Stack Developer with hands-on experience developing production web applications, REST APIs, and AI/automation workflows. Experienced in React.js, TypeScript, JavaScript, Python, Node.js, Express.js, PostgreSQL, Supabase, Redis, and Docker. Skilled in backend integration, authentication, RBAC, database security, API testing, deployment, and building scalable end-to-end web solutions.",
  highlights: [
    { number: "4+", label: "Production Platforms & Modules" },
    { number: "2+", label: "Full-Stack SaaS Apps Built" },
    { number: "10+", label: "Modern Web & Backend Tech" },
    { number: "100%", label: "End-to-End Delivery & Security" },
  ],
};

export const skillsData = {
  frontend: [
    { name: "React.js", level: 95, icon: "Code2" },
    { name: "JavaScript (ES6+)", level: 95, icon: "FileCode2" },
    { name: "TypeScript", level: 90, icon: "FileCode2" },
    { name: "HTML5 & CSS3", level: 95, icon: "Layout" },
    { name: "React Hooks", level: 92, icon: "Cpu" },
    { name: "React Router", level: 90, icon: "Network" },
    { name: "Responsive Design", level: 95, icon: "Smartphone" },
    { name: "Cross-browser Compatibility", level: 90, icon: "Globe" },
    { name: "Tailwind CSS", level: 94, icon: "Layout" },
  ],
  backend: [
    { name: "Node.js", level: 92, icon: "Server" },
    { name: "Express.js", level: 92, icon: "Zap" },
    { name: "RESTful APIs", level: 95, icon: "Layers" },
    { name: "JWT Authentication", level: 92, icon: "Lock" },
    { name: "Session Management", level: 88, icon: "KeyRound" },
    { name: "Python", level: 82, icon: "Code" },
    { name: "PHP", level: 75, icon: "Code" },
  ],
  databases: [
    { name: "PostgreSQL", level: 90, icon: "Database" },
    { name: "Supabase (Auth & RLS)", level: 90, icon: "Zap" },
    { name: "MongoDB (NoSQL)", level: 90, icon: "Database" },
    { name: "MongoDB Schema Design", level: 88, icon: "TableProperties" },
    { name: "MySQL / SQL", level: 85, icon: "DatabaseBackup" },
    { name: "Redis", level: 82, icon: "Binary" },
  ],
  tools: [
    { name: "Git & GitHub", level: 94, icon: "GitBranch" },
    { name: "Docker", level: 85, icon: "Boxes" },
    { name: "Vite", level: 92, icon: "Zap" },
    { name: "Vercel & Render", level: 90, icon: "Globe" },
    { name: "VS Code", level: 95, icon: "Terminal" },
    { name: "Postman", level: 92, icon: "Send" },
    { name: "Agile / Scrum", level: 88, icon: "Users" },
    { name: "Component Architecture & RBAC", level: 92, icon: "Boxes" },
  ],
  familiar: ["Python", "Redis", "Prisma", "TanStack Query", "ASP.NET", "Core Java"],
};

export const projectsData = [
  {
    id: "smart-cart",
    title: "SmartCart — Full-Stack E-Commerce Platform",
    category: "Full Stack & SaaS",
    date: "2026",
    description:
      "A complete full-stack e-commerce platform featuring a high-conversion customer storefront and an administrative console covering product catalog, cart, wishlist, checkout with coupon codes, and order management.",
    features: [
      "Built a full-stack e-commerce platform with customer storefront and admin console (catalog, cart, wishlist, checkout with coupons, and orders).",
      "Designed a PostgreSQL schema with 15 tables and Row-Level Security (RLS); implemented atomic SQL functions for checkout and coupon validation.",
      "Implemented JWT authentication and Role-Based Access Control (RBAC), plus input validation, rate limiting, and security headers across REST API.",
      "Deployed frontend on Vercel, REST API on Render, and PostgreSQL with Auth and RLS on Supabase.",
    ],
    techStack: ["React 19", "Vite", "Express 5", "Supabase", "PostgreSQL", "RLS", "Tailwind CSS", "Vercel", "Render"],
    githubUrl: "https://github.com/rahulchaurasiya722003",
    liveUrl: "https://smart-cart-fastfood.vercel.app",
    featured: true,
    imageBg: "from-blue-600/30 via-cyan-600/30 to-emerald-600/30",
  },
  {
    id: "nexa-crm",
    title: "NexaCRM — Full-Stack SaaS CRM",
    category: "Full Stack & SaaS",
    date: "2026",
    description:
      "A comprehensive SaaS CRM application engineered with an interactive Kanban deal pipeline, lead and contact management, dynamic activity feed, sales dashboards, and deep analytics.",
    features: [
      "Engineered SaaS CRM featuring Kanban deal pipeline, lead/contact management, real-time activity feed, and sales analytics dashboard.",
      "Configured React/TypeScript frontend deployed on Vercel and scalable Express backend hosted on Render.",
      "Implemented four-role RBAC (Role-Based Access Control) with secure JWT access tokens and rotating refresh tokens.",
      "Streamlined asynchronous server-state handling and data synchronization using TanStack Query and Prisma ORM with PostgreSQL.",
    ],
    techStack: ["React 19", "TypeScript", "Vite", "TanStack Query", "Express 5", "Prisma", "PostgreSQL", "Tailwind CSS", "JWT", "Vercel"],
    githubUrl: "https://github.com/rahulchaurasiya722003",
    liveUrl: "https://nexa-saas-crm.vercel.app/",
    featured: true,
    imageBg: "from-purple-600/30 via-indigo-600/30 to-blue-600/30",
  },
  {
    id: "float-chat",
    title: "Float Chat — AI & Automation Platform",
    category: "Work Experience",
    date: "Apr 2026 – Present",
    description:
      "A live production AI and chat automation platform. Engineered AI-powered automation workflows, frontend modules, and integrated backend services.",
    features: [
      "Worked on AI-powered automation workflows, frontend modules, and integrations with backend services.",
      "Improved application functionality, troubleshot complex issues, and performed rigorous feature testing.",
      "Collaborated on scalable architecture with Redis caching and Docker containerized services.",
    ],
    techStack: ["React.js", "AI Workflows", "REST APIs", "Redis", "Docker", "Tailwind CSS"],
    featured: true,
    liveUrl: "https://app.floatchat.com/",
    isLiveProduction: true,
    imageBg: "from-cyan-600/30 via-teal-600/30 to-blue-600/30",
  },
  {
    id: "unified-mcm",
    title: "Unified MCM — Admin & Management Platform",
    category: "Work Experience",
    date: "Apr 2026 – Present",
    description:
      "A centralized administrative and team management platform. Implemented RBAC, video-meeting functionality, license and seat management, and analytics.",
    features: [
      "Implemented RBAC and backend integrations, including role permissions and admin workflows.",
      "Developed video-meeting functionality and worked on license, seat, and subscription management, analytics, and reports.",
      "Enhanced responsive design, cross-browser compatibility, and dashboard usability.",
    ],
    techStack: ["React.js", "RBAC", "Video Meetings", "REST APIs", "Subscription Systems", "Docker"],
    featured: true,
    liveUrl: "https://unified.mycountrymobile.com/",
    isLiveProduction: true,
    imageBg: "from-indigo-600/30 via-blue-600/30 to-purple-600/30",
  },
  {
    id: "acepeak",
    title: "Acepeak — Cloud Communications Platform",
    category: "Work Experience",
    date: "Apr 2026 – Present",
    description:
      "Enterprise cloud communication platform. Developed billing modules, UI themes, reporting analytics, and admin-panel management.",
    features: [
      "Worked on the billing module, including billing workflows, UI enhancements, and functional validation.",
      "Handled theme updates, analytics, reporting, and admin-panel management with testing and defect resolution.",
    ],
    techStack: ["React.js", "Billing Workflows", "Reporting & Analytics", "Admin Panel", "UI Engineering"],
    featured: true,
    liveUrl: "https://ex.acepeak.com/",
    isLiveProduction: true,
    imageBg: "from-emerald-600/30 via-teal-600/30 to-cyan-600/30",
  },
  {
    id: "my-country-mobile",
    title: "My Country Mobile — Business Communication Platform",
    category: "Work Experience",
    date: "Apr 2026 – Present",
    description:
      "Global business communication platform landing application showcasing company information, features, solutions, pricing, and contact pipelines.",
    features: [
      "Developed a responsive SaaS landing page showcasing company information, features, pricing, solutions, and contact sections.",
      "Optimized load times, interactive animations, and responsive layout across mobile and desktop devices.",
    ],
    techStack: ["React.js", "Responsive Design", "SaaS Landing", "Performance Optimization"],
    featured: true,
    liveUrl: "https://www.mycountrymobile.com/",
    isLiveProduction: true,
    imageBg: "from-blue-600/30 via-purple-600/30 to-pink-600/30",
  },
];

export const experienceData = [
  {
    role: "Full Stack Developer",
    company: "MCM BPO Private Ltd",
    period: "Apr 2026 – Present",
    location: "Mumbai, India",
    projects: [
      {
        id: "float-chat-exp",
        title: "Float Chat — AI & Automation Platform",
        liveUrl: "https://app.floatchat.com/",
        bulletPoints: [
          "Worked on AI-powered automation workflows, frontend modules, and integrations with backend services.",
          "Improved application functionality, troubleshot issues, and performed feature testing.",
        ],
        techStack: ["React.js", "AI & Automation", "REST APIs", "Redis", "Docker", "Git/GitHub"],
      },
      {
        id: "unified-mcm-exp",
        title: "Unified MCM — Admin & Management Platform",
        liveUrl: "https://unified.mycountrymobile.com/",
        bulletPoints: [
          "Implemented RBAC and backend integrations, including role permissions and admin workflows.",
          "Developed video-meeting functionality and worked on licence, seat and subscription management, analytics, and reports.",
        ],
        techStack: ["React.js", "RBAC", "Video Meeting API", "Analytics", "REST APIs", "Docker"],
      },
      {
        id: "acepeak-exp",
        title: "Acepeak — Cloud Communications Platform",
        liveUrl: "https://ex.acepeak.com/",
        bulletPoints: [
          "Worked on the billing module, including billing workflows, UI enhancements, and functional validation.",
          "Handled theme updates, analytics, reporting, and admin-panel management, with testing and defect resolution.",
        ],
        techStack: ["React.js", "Billing Modules", "Admin Panel", "Reporting & Analytics", "Defect Resolution"],
      },
      {
        id: "mcm-landing-exp",
        title: "My Country Mobile — Business Communication Platform",
        liveUrl: "https://www.mycountrymobile.com/",
        bulletPoints: [
          "Developed a responsive SaaS landing page showcasing company information, features, pricing, solutions, and contact sections.",
        ],
        techStack: ["React.js", "Responsive Design", "Cross-browser Compatibility", "HTML5/CSS3"],
      },
    ],
  },
];

export const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "University of Mumbai",
    location: "Mumbai, India",
    period: "Currently Pursuing",
    description:
      "Advanced studies in software architecture, distributed computing, database engineering, and advanced web technologies.",
    status: "Currently Pursuing",
  },
  {
    degree: "B.Sc. in Information Technology",
    institution: "Prahladrai Dalmia Lions College",
    location: "Mumbai, India",
    period: "Sep 2022 – Apr 2025",
    description:
      "Core curriculum in Computer Science, Software Engineering, Database Systems (PostgreSQL, MySQL, MongoDB), Data Structures, and Web Development.",
    status: "Completed",
  },
  {
    degree: "Junior College",
    institution: "Abhinav Vidya Mandir",
    location: "Mumbai, India",
    period: "Aug 2020 – May 2022",
    description:
      "Higher Secondary Education with foundational coursework in Information Technology, Mathematics, and Computer Fundamentals.",
    status: "Completed",
  },
];

export const certificationsData = [
  {
    title: "Full Stack Developer",
    issuer: "SDAC Infotech",
    period: "Jul 2025",
    skills: ["React.js", "Node.js", "Express.js", "REST APIs", "Databases", "Full-Stack Development"],
    description:
      "Industry certification verifying hands-on competence in full-stack architecture, building RESTful APIs, modern database schema design, and deploying resilient web applications.",
    certificateUrl: "#",
  },
];
