export const personalDetails = {
  name: "Rahul Chaurasiya",
  tagline: "Full Stack Developer (MERN Stack)",
  subTagline: "Architecting responsive, high-performance web applications & AI solutions",
  phone: "9987312800",
  email: "rahul.chaurasiya.dev@gmail.com",
  location: "Mumbai, Maharashtra, India",
  college: "Prahladrai Dalmia Lions College of Commerce & Economics, Mumbai",
  linkedin: "https://www.linkedin.com/in/rahul-chaurasiya48290b281",
  github: "https://github.com/rahulchaurasiya-dev",
  photo: "/images/rahul-chaurasiya.png",
  logo: "/images/logo.png",
  resumePdf: "/docs/Rahul_Chaurasiya_Resume.pdf",
  summary:
    "Full Stack Developer with hands-on experience in React.js, Node.js, Express.js, and MongoDB (MERN Stack). Contributed to MCM live production projects — Float Chat (automation workflows with React/TanStack, Redis, Docker) and the Unified MCM Portal (React-based Admin Panel). Built AI-powered full stack applications, including an AI Study Assistant using the OpenAI API and an AI Resume Analyzer, featuring PDF upload, text extraction, and responsive user interfaces.",
  highlights: [
    { number: "2", label: "MCM Live Production Projects" },
    { number: "2+", label: "AI-Powered Applications Built" },
    { number: "5+", label: "Full Stack Projects Delivered" },
    { number: "100%", label: "MERN & RESTful Stack Mastery" },
  ],
};

export const skillsData = {
  frontend: [
    { name: "React.js", level: 95, icon: "Code2" },
    { name: "JavaScript (ES6+)", level: 92, icon: "FileCode2" },
    { name: "HTML5 & CSS3", level: 95, icon: "Layout" },
    { name: "React Hooks & Context", level: 90, icon: "Cpu" },
    { name: "React Router", level: 88, icon: "Network" },
    { name: "TanStack (Query / Table)", level: 85, icon: "Boxes" },
    { name: "Responsive Web Design", level: 95, icon: "Smartphone" },
    { name: "Cross-browser Compatibility", level: 90, icon: "Globe" },
  ],
  backend: [
    { name: "Node.js", level: 90, icon: "Server" },
    { name: "Express.js", level: 92, icon: "Zap" },
    { name: "RESTful APIs", level: 95, icon: "Layers" },
    { name: "JWT Authentication", level: 90, icon: "Lock" },
    { name: "Session Management", level: 85, icon: "KeyRound" },
    { name: "PHP", level: 75, icon: "Code" },
  ],
  databases: [
    { name: "MongoDB (NoSQL)", level: 90, icon: "Database" },
    { name: "Redis (Caching)", level: 80, icon: "Zap" },
    { name: "MongoDB Schema Design", level: 88, icon: "TableProperties" },
    { name: "MySQL", level: 82, icon: "DatabaseBackup" },
    { name: "SQL Queries", level: 85, icon: "Binary" },
  ],
  tools: [
    { name: "Git & GitHub", level: 92, icon: "GitBranch" },
    { name: "Docker", level: 80, icon: "Boxes" },
    { name: "Ubuntu / Linux", level: 78, icon: "Terminal" },
    { name: "Visual Studio Code", level: 95, icon: "Terminal" },
    { name: "Postman", level: 90, icon: "Send" },
    { name: "Agile / Scrum", level: 85, icon: "Users" },
    { name: "Component-based Architecture", level: 92, icon: "Boxes" },
  ],
  familiar: ["ASP.NET", "Core Java"],
};

export const projectsData = [
  {
    id: "float-chat",
    title: "Float Chat",
    category: "MCM Live Projects",
    date: "2025 – Present",
    description:
      "A live production chat and automation platform. Worked on the Automation module, building and improving automation workflows and features end to end.",
    features: [
      "Developed and enhanced React/TanStack components and integrated backend REST APIs.",
      "Built and improved automation workflows and features for the Automation module.",
      "Worked with Redis, Docker, and Ubuntu for application development and workflow management.",
      "Performed functional, integration, and UI testing to identify and resolve issues.",
    ],
    techStack: ["React.js", "TanStack", "Redis", "Docker", "Ubuntu", "REST APIs", "AI/Automation"],
    featured: true,
    imageBg: "from-cyan-600/30 via-teal-600/30 to-blue-600/30",
  },
  {
    id: "unified-mcm-portal",
    title: "Unified MCM Portal",
    category: "MCM Live Projects",
    date: "2025 – Present",
    description:
      "A live production management portal. Developed and enhanced the React-based Admin Panel and core management modules with dynamic UI components.",
    features: [
      "Developed and enhanced React-based Admin Panel and management modules.",
      "Built core application modules with dynamic UI components and seamless user interactions.",
      "Improved responsive design, UI consistency, and overall application usability.",
      "Performed functional testing, bug fixing, and UI optimization across the platform.",
    ],
    techStack: ["React.js", "JavaScript", "REST APIs", "Docker", "Git/GitHub"],
    featured: true,
    imageBg: "from-indigo-600/30 via-blue-600/30 to-purple-600/30",
  },
  {
    id: "cold-email-generator",
    title: "B2B Cold Email Generator",
    category: "AI & Full Stack",
    date: "August 2026",
    description:
      "A premium, C-suite targeted copywriting AI SaaS that engineers micro-personalized cold email variants conforming to strict deliverability rules.",
    features: [
      "Integrated Google Gemini AI for highly-relevant prospect hook and pain-point identification.",
      "Engineered clean output models for 3 standard conversion angles: Observation, Problem-Solution, and Permission-based hooks.",
      "Built interactive word counters and real-time spam auditing algorithms to avoid junk folders.",
      "Implemented quick-load B2B industry presets and one-click mail client integrations.",
    ],
    techStack: ["Next.js", "React.js", "Gemini API", "Tailwind CSS", "Framer Motion", "Server Actions"],
    githubUrl: "https://github.com/rahulchaurasiya-dev/b2b-cold-email-ai",
    liveUrl: "/cold-email",
    featured: true,
    imageBg: "from-blue-600/30 via-cyan-600/30 to-purple-600/30",
  },
  {
    id: "ai-study-assistant",
    title: "AI Study Assistant",
    category: "AI & Full Stack",
    date: "January 2026 – March 2026",
    description:
      "An intelligent AI-powered study companion designed to empower students with instant question answering, document summarization, and interactive concept explanations.",
    features: [
      "Integrated OpenAI API for instant Q&A, automatic summarization, and deep concept breakdowns.",
      "Implemented PDF document upload and automated text extraction workflows.",
      "Built a highly responsive user interface with real-time streaming feedback using React.js.",
      "Utilized Node.js, Express.js, and MongoDB for secure data persistence.",
      "Managed codebase versioning and deployment using Git, GitHub, and VS Code.",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "OpenAI API", "PDF Parsing"],
    githubUrl: "https://github.com/rahulchaurasiya-dev/ai-study-assistant",
    liveUrl: "/ai-study-assistant",
    featured: true,
    imageBg: "from-blue-600/30 via-indigo-600/30 to-purple-600/30",
  },
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    category: "AI & Full Stack",
    date: "April 2025 – May 2025",
    description:
      "An automated ATS (Applicant Tracking System) resume optimization tool that evaluates resumes against job descriptions and provides AI-driven feedback.",
    features: [
      "Developed end-to-end full stack AI tool with React.js frontend and Node.js/Express backend.",
      "Integrated AI engine to analyze resumes, calculate ATS compatibility scores, and suggest targeted improvements.",
      "Supported PDF resume uploads with instant text parsing and key skill extraction.",
      "Persisted analysis history and candidate profiles in MongoDB.",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "OpenAI API", "ATS Engine"],
    githubUrl: "https://github.com/rahulchaurasiya-dev/ai-resume-analyzer",
    liveUrl: "/ai-resume-analyzer",
    featured: true,
    imageBg: "from-purple-600/30 via-cyan-600/30 to-blue-600/30",
  },
];

export const experienceData = [
  {
    role: "Full Stack Developer",
    type: "MCM Live Projects",
    company: "MCM — Live Production Environment",
    location: "Mumbai, India",
    period: "2025 – Present",
    responsibilities: [
      "Worked on the Float Chat Automation module — developing and improving automation workflows and features.",
      "Developed and enhanced React/TanStack components and integrated backend REST APIs.",
      "Built and enhanced the React-based Admin Panel and management modules of the Unified MCM Portal.",
      "Worked with Redis, Docker, and Ubuntu for application development and workflow management.",
      "Performed functional, integration, and UI testing; improved responsive design and UI consistency across platforms.",
    ],
    achievements: [
      { icon: "Globe", label: "Live Production Apps", value: "Float Chat & MCM Portal" },
      { icon: "ShieldCheck", label: "Automation Module", value: "Workflows & Features" },
      { icon: "Users", label: "DevOps Exposure", value: "Redis · Docker · Ubuntu" },
    ],
  },
];

export const educationData = [
  {
    degree: "B.Sc. in Information Technology",
    institution: "Prahladrai Dalmia Lions College of Commerce & Economics",
    location: "Mumbai, Maharashtra",
    period: "Sep 2022 – Apr 2025",
    description:
      "Focused on Web Engineering, Database Management Systems (SQL & MongoDB), Data Structures, Computer Networks, and Software Engineering principles.",
    status: "Completed",
  },
  {
    degree: "Junior College (HSC Science / IT)",
    institution: "Abhinav Vidya Mandir",
    location: "Mumbai, Maharashtra",
    period: "Aug 2020 – May 2022",
    description:
      "Completed Higher Secondary Education with focus on Information Technology, Mathematics, and Computer Fundamentals.",
    status: "Completed",
  },
];

export const certificationsData = [
  {
    title: "Full Stack Developer Certification",
    issuer: "SDAC Infotech",
    period: "July 2025 – Present",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Full Stack Development"],
    description:
      "Comprehensive certification covering advanced MERN stack web development, backend microservices architecture, MongoDB database design, and real-time app deployment.",
  },
];
