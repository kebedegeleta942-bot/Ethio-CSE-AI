import {
  StudentProfile,
  CSCourseModule,
  SkillItem,
  ProjectLabItem,
  CareerPathDetail,
  KnowledgeNote,
  GamificationBadge,
  StudyCalendarEvent,
  DailyFocusTask,
  QuizQuestion,
} from '../types';
import {
  allEthiopianCSECourses,
  harvardCSECourses,
  curriculumComparisonBridges,
} from './curriculumData';

export { allEthiopianCSECourses, harvardCSECourses, curriculumComparisonBridges };

export const initialProfile: StudentProfile = {
  name: 'Dawit Mengistu',
  university: 'Addis Ababa Institute of Technology (AAiT)',
  campus: '5 Kilo Campus, Addis Ababa',
  academicLevel: '2nd Year',
  gpa: '3.68 / 4.00',
  graduationYear: '2028',
  primaryCareer: 'Full-Stack Software Engineer',
  secondaryCareer: 'Backend & Cloud Infrastructure',
  interests: [
    'Web Development',
    'Data Structures & Algorithms',
    'Artificial Intelligence',
    'FinTech & Payment Systems',
  ],
  preferredLanguages: ['Python', 'JavaScript', 'TypeScript', 'C++'],
  currentTechLevel: 'Intermediate',
  weeklyStudyHours: 22,
  mainChallenges: [
    'Balancing university exams with practical engineering projects',
    'Frequent power fluctuations and intermittent mobile data',
    'Finding real-world Ethiopian project mentorship',
  ],
  preferredLearningStyle: 'Hands-on Projects',
  helpGoals: [
    'Academic help',
    'Programming help',
    'Project help',
    'Career guidance',
    'AI learning',
    'Job preparation',
  ],
  skills: {
    'Python': 4,
    'C / C++': 3,
    'JavaScript': 4,
    'TypeScript': 3,
    'React': 3,
    'Node.js': 3,
    'PostgreSQL & SQL': 3,
    'Git & GitHub': 4,
    'Data Structures & Algorithms': 3,
    'Linux & Bash': 3,
    'Docker': 2,
    'AI & Prompting': 3,
  },
  onboardingCompleted: true,
  theme: 'dark',
  streakDays: 6,
  completedTasksCount: 24,
  solvedProblemsCount: 47,
  notes: 'Building solid practical competence for both Ethiopian tech leaders (Chapa, Ethio Telecom, CBE) and remote international contracts.',
};

export const defaultDailyTasks: DailyFocusTask[] = [
  {
    id: 'dt-1',
    title: 'Study Data Structures: Binary Trees & Tree Traversals (Inorder/Preorder)',
    category: 'academic',
    durationMinutes: 45,
    completed: true,
    targetLevel: '2nd Year',
  },
  {
    id: 'dt-2',
    title: 'Solve 2 DSA Problems: Invert Binary Tree & Two Sum on LeetCode/HackerRank',
    category: 'coding',
    durationMinutes: 45,
    completed: false,
    targetLevel: '2nd Year',
  },
  {
    id: 'dt-3',
    title: 'Work on Project: Build Express REST API endpoint with PostgreSQL connection',
    category: 'project',
    durationMinutes: 60,
    completed: false,
    targetLevel: '2nd Year',
  },
  {
    id: 'dt-4',
    title: 'Review Git branching & conventional commit messages (feat, fix, refactor)',
    category: 'review',
    durationMinutes: 20,
    completed: false,
    targetLevel: '1st Year',
  },
  {
    id: 'dt-5',
    title: 'Ask Ethio CSE AI: "Explain database normalization (1NF to 3NF) with an Ethiopian store example"',
    category: 'ai',
    durationMinutes: 15,
    completed: false,
    targetLevel: '2nd Year',
  },
];

export const csCourseModules: CSCourseModule[] = [
  ...allEthiopianCSECourses,
  ...harvardCSECourses,
];

export const skillRoadmapItems: SkillItem[] = [
  // Programming
  { id: 'sk-1', name: 'Python', category: 'programming', status: 'comfortable', recommendedFor: ['1st Year', '2nd Year', '3rd Year', '4th Year'], description: 'Primary language for algorithms, scripting, automation, backend, and AI.' },
  { id: 'sk-2', name: 'C / C++', category: 'programming', status: 'comfortable', recommendedFor: ['1st Year', '2nd Year'], description: 'Low-level systems language, memory management, and university exam foundation.' },
  { id: 'sk-3', name: 'JavaScript & TypeScript', category: 'programming', status: 'practicing', recommendedFor: ['2nd Year', '3rd Year', '4th Year'], description: 'Essential for modern frontend, Node.js backend, and type-safe scalable systems.' },
  { id: 'sk-4', name: 'Java / OOP', category: 'programming', status: 'practicing', recommendedFor: ['1st Year', '2nd Year'], description: 'Enterprise computing, OOP design patterns, Android, and banking systems.' },
  { id: 'sk-5', name: 'Go (Golang)', category: 'programming', status: 'learning', recommendedFor: ['3rd Year', '4th Year'], description: 'High-performance concurrent backend language popular in telecom & cloud.' },

  // Web
  { id: 'sk-6', name: 'HTML5 & CSS3', category: 'web', status: 'comfortable', recommendedFor: ['1st Year', '2nd Year'], description: 'Semantic markup, accessibility, responsive design, and CSS Grid/Flexbox.' },
  { id: 'sk-7', name: 'React', category: 'web', status: 'practicing', recommendedFor: ['2nd Year', '3rd Year', '4th Year'], description: 'Component-driven UI, state management, hooks, and single-page apps.' },
  { id: 'sk-8', name: 'Tailwind CSS', category: 'web', status: 'comfortable', recommendedFor: ['2nd Year', '3rd Year', '4th Year'], description: 'Utility-first modern styling for rapid responsive web development.' },
  { id: 'sk-9', name: 'Next.js', category: 'web', status: 'learning', recommendedFor: ['3rd Year', '4th Year'], description: 'Production React framework with SSR, SSG, and edge API routes.' },

  // Backend
  { id: 'sk-10', name: 'Node.js & Express', category: 'backend', status: 'practicing', recommendedFor: ['2nd Year', '3rd Year', '4th Year'], description: 'Asynchronous event-driven server runtime for REST APIs.' },
  { id: 'sk-11', name: 'PostgreSQL & SQL', category: 'backend', status: 'practicing', recommendedFor: ['2nd Year', '3rd Year', '4th Year'], description: 'Relational data modeling, ACID transactions, indexes, and complex queries.' },
  { id: 'sk-12', name: 'REST API & Webhooks', category: 'backend', status: 'comfortable', recommendedFor: ['2nd Year', '3rd Year', '4th Year'], description: 'HTTP verbs, status codes, JWT authentication, and webhook signatures.' },
  { id: 'sk-13', name: 'Redis Caching', category: 'backend', status: 'learning', recommendedFor: ['3rd Year', '4th Year'], description: 'In-memory data store for caching, rate limiting, and session queues.' },

  // DevOps
  { id: 'sk-14', name: 'Git & GitHub', category: 'devops', status: 'comfortable', recommendedFor: ['1st Year', '2nd Year', '3rd Year', '4th Year'], description: 'Version control, branch management, pull requests, and collaborative coding.' },
  { id: 'sk-15', name: 'Linux & Terminal', category: 'devops', status: 'practicing', recommendedFor: ['1st Year', '2nd Year', '3rd Year', '4th Year'], description: 'Bash commands, file permissions, SSH keys, process management, and grep/curl.' },
  { id: 'sk-16', name: 'Docker Containers', category: 'devops', status: 'learning', recommendedFor: ['3rd Year', '4th Year'], description: 'Packaging software into reproducible container images with Dockerfiles.' },
  { id: 'sk-17', name: 'CI/CD GitHub Actions', category: 'devops', status: 'learning', recommendedFor: ['3rd Year', '4th Year'], description: 'Automating build checks, linting, and automated test runners on push.' },

  // AI & Data
  { id: 'sk-18', name: 'AI APIs (@google/genai)', category: 'ai', status: 'practicing', recommendedFor: ['2nd Year', '3rd Year', '4th Year'], description: 'Integrating modern Gemini models server-side with structured JSON output.' },
  { id: 'sk-19', name: 'Prompt Engineering', category: 'ai', status: 'comfortable', recommendedFor: ['1st Year', '2nd Year', '3rd Year', '4th Year'], description: 'System instructions, few-shot examples, structured formats, and anti-hallucination.' },
  { id: 'sk-20', name: 'RAG & Vector Embeddings', category: 'ai', status: 'learning', recommendedFor: ['3rd Year', '4th Year'], description: 'Semantic search using embeddings, pgvector, and chunking documents.' },
];

export const projectLabItems: ProjectLabItem[] = [
  {
    id: 'proj-1',
    title: 'Offline-First Student Grade & Course Portal',
    tagline: 'Local-first academic tracker with IndexedDB synchronization for intermittent campus internet',
    category: 'Beginner',
    techStack: ['HTML5', 'TypeScript', 'Tailwind CSS', 'IndexedDB'],
    problemStatement: 'University students frequently lose course notes and grade calculations when dorm or campus Wi-Fi drops.',
    targetUsers: '1st and 2nd year university students.',
    features: ['Semester GPA simulator', 'Offline course checklist', 'JSON export/backup', 'Automatic local sync'],
    dbArchitecture: 'Client-side IndexedDB with Dexie.js schema, zero cloud dependency.',
    ethiopianContext: 'Designed specifically for Ethiopian campus dorm conditions with frequent power outages.',
    status: 'completed',
  },
  {
    id: 'proj-2',
    title: 'Merkato Merchant Invoicing & Payment Reconciliation',
    tagline: 'Lightweight web billing application with Telebirr & Chapa webhook signature verification',
    category: 'Build for Ethiopia 🇪🇹',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Chapa API'],
    problemStatement: 'Traders in Merkato and Piazza struggle to reconcile incoming bank SMS alerts against paper receipts, causing disputes.',
    targetUsers: 'Boutique owners, electronics wholesalers, and local service providers in Addis Ababa.',
    features: ['Bilingual UI (Amharic & English)', 'PDF receipt generation', 'Cryptographic webhook verification', 'Offline sale queue'],
    dbArchitecture: 'PostgreSQL with tables for merchants, orders, transactions, and audit logs with idempotency keys.',
    ethiopianContext: 'Integrates local Ethiopian payment methods (Telebirr, CBE Birr, Chapa) with offline caching.',
    status: 'building',
  },
  {
    id: 'proj-3',
    title: 'Habesha TaskSync: Real-Time Team Board',
    tagline: 'Collaborative Kanban workspace with optimistic UI updates and conflict resolution',
    category: 'Intermediate',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    problemStatement: 'Student engineering squads and local startup teams need simple, fast task coordination without bloated corporate tools.',
    targetUsers: 'University student project teams, hackathon squads, local tech startups.',
    features: ['Drag-and-drop Kanban columns', 'JWT refresh token rotation', 'Anti-multitasking WIP limits', 'Activity audit logs'],
    dbArchitecture: 'Normalized relational schema with foreign key cascades and composite indexes for fast filtering.',
    status: 'building',
  },
  {
    id: 'proj-4',
    title: 'EthioDoc NLP: Bilingual Legal & Proclamation Q&A',
    tagline: 'Intelligent document interrogation agent supporting Amharic and English proclamations using Gemini',
    category: 'Advanced',
    techStack: ['TypeScript', 'Express', '@google/genai', 'PostgreSQL pgvector', 'React'],
    problemStatement: 'Official proclamations, tax directives, and university bylaws are lengthy and difficult for ordinary citizens to interpret.',
    targetUsers: 'Students, small business owners, administrative assistants, legal interns.',
    features: ['Document chunking & vector search', 'Bilingual question answering', 'Verifiable source citations', 'Anti-hallucination guardrails'],
    dbArchitecture: 'PostgreSQL with pgvector extension storing text embeddings and cosine similarity index.',
    ethiopianContext: 'Processes Ethiopian Ministry of Justice proclamations and university student handbooks.',
    status: 'idea',
  },
  {
    id: 'proj-5',
    title: 'National MoE Exit Exam Preparation Platform',
    tagline: 'Institutional web platform for Computer Science exit exam simulations and active recall mastery',
    category: 'Graduation Project',
    techStack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Redis', 'Docker Compose'],
    problemStatement: 'Thousands of Ethiopian graduating seniors need structured, data-driven preparation for the Ministry of Education CS Exit Exam.',
    targetUsers: 'Graduating seniors, university professors, department heads across 40+ Ethiopian universities.',
    features: ['16 core competency modules', 'Timed exam simulation engine', 'Instant diagnostic mistake breakdown', 'Spaced repetition flashcards'],
    dbArchitecture: 'PostgreSQL with tables for questions, attempts, user competencies, and historical national benchmarks.',
    ethiopianContext: 'Directly addresses the national requirement for university graduation and degree certification.',
    status: 'planning',
  },
  {
    id: 'proj-6',
    title: 'Kebele Resident Digital Service Request Portal',
    tagline: 'Streamlined local administration system for resident ID renewals and vital certificate requests',
    category: 'Build for Ethiopia 🇪🇹',
    techStack: ['React', 'Express', 'PostgreSQL', 'Tailwind CSS', 'SMS Gateway'],
    problemStatement: 'Citizens wait in long physical lines at Kebele and Woreda offices for simple document renewals and verification.',
    targetUsers: 'Kebele administrators and local residents in Ethiopian cities.',
    features: ['Digital queue ticket generation', 'Document upload & status tracking', 'SMS notification on completion', 'Role-based access control'],
    dbArchitecture: 'PostgreSQL schema with citizen registry, service requests, status transitions, and audit logs.',
    ethiopianContext: 'Solves widespread local governance friction in Addis Ababa, Hawassa, Adama, and Bahir Dar.',
    status: 'idea',
  },
];

export const careerPaths: CareerPathDetail[] = [
  {
    id: 'car-1',
    title: 'Full-Stack Software Engineer',
    tagline: 'Build end-to-end web applications, interactive user interfaces, scalable APIs, and robust databases.',
    demandInEthiopia: 'Very High',
    typicalEmployers: ['Chapa', 'Safaricom Ethiopia', 'Ethio Telecom', 'Commercial Bank of Ethiopia', 'Gebeya', 'EagleLion', 'Remote Startups'],
    requiredSkills: ['JavaScript/TypeScript', 'React', 'Node.js/Express', 'PostgreSQL', 'Git', 'REST APIs', 'Docker'],
    beginnerRoadmap: ['Master HTML, CSS, JavaScript', 'Learn Git & GitHub workflows', 'Build 3 responsive interactive websites', 'Understand basic SQL queries'],
    intermediateRoadmap: ['Build full-stack React + Express + PostgreSQL apps', 'Implement JWT auth & HTTP-only cookies', 'Deploy to cloud/VPS with custom domain', 'Write unit & integration tests'],
    advancedRoadmap: ['Containerize with Docker & configure CI/CD', 'Optimize database queries with indexing', 'Implement Redis caching and offline sync', 'Architect microservices or clean monoliths'],
    portfolioMilestones: ['Polished developer tool', 'Full-stack collaborative SaaS', 'Ethiopian payment integration project'],
    interviewPrepFocus: ['Two-pointer algorithms', 'SQL JOIN and transaction isolation', 'Full-stack architecture explanation'],
  },
  {
    id: 'car-2',
    title: 'Backend & Cloud Infrastructure Engineer',
    tagline: 'Design resilient APIs, database schemas, microservice architectures, and high-availability servers.',
    demandInEthiopia: 'Very High',
    typicalEmployers: ['Commercial Bank of Ethiopia', 'Ethio Telecom (Telebirr)', 'Awash Bank', 'SantimPay', 'Chapa', 'International Tech Firms'],
    requiredSkills: ['Python / Go / Java', 'PostgreSQL', 'Redis', 'Docker', 'Linux', 'Distributed Systems', 'Security'],
    beginnerRoadmap: ['Deepen understanding of HTTP and REST conventions', 'Master relational database modeling and SQL', 'Build CRUD API in Node.js, Go, or Python'],
    intermediateRoadmap: ['Handle authentication, rate limiting, and input sanitization', 'Implement background workers and message queues', 'Work with Docker Compose for local environments'],
    advancedRoadmap: ['Design high-throughput distributed systems', 'Study consensus algorithms (Raft) and CAP theorem', 'Implement database sharding and zero-downtime migrations'],
    portfolioMilestones: ['High-throughput webhook processing engine', 'Resilient microservice architecture with message queue', 'Custom Linux mini-server'],
    interviewPrepFocus: ['Database indexing and execution plans', 'Concurrency and race condition management', 'System design of a high-load payment switch'],
  },
  {
    id: 'car-3',
    title: 'AI / Machine Learning Engineer',
    tagline: 'Apply predictive models, neural networks, natural language processing, and generative AI systems.',
    demandInEthiopia: 'Growing',
    typicalEmployers: ['iCog Labs', 'ALX Ethiopia', 'Gebeya', 'Fintech Risk Divisions', 'Agriculture Tech Startups', 'Remote Global Companies'],
    requiredSkills: ['Python', 'NumPy & Pandas', 'PyTorch / Scikit-Learn', 'LLMs & Prompting', 'Vector Databases (pgvector)', 'FastAPI'],
    beginnerRoadmap: ['Master Python data structures and linear algebra', 'Learn Pandas, Matplotlib, and data cleaning', 'Understand supervised regression and classification'],
    intermediateRoadmap: ['Train deep neural networks with PyTorch', 'Build NLP pipelines for local languages (Amharic/Afaan Oromo)', 'Integrate Gemini API with structured outputs'],
    advancedRoadmap: ['Build RAG pipelines with chunking and reranking', 'Fine-tune small open models for specific domain tasks', 'Deploy models with FastAPI and optimize inference latency'],
    portfolioMilestones: ['Bilingual document Q&A assistant', 'Local agriculture crop disease image classifier', 'Credit risk scoring model based on transaction trends'],
    interviewPrepFocus: ['Bias-variance trade-off', 'Transformer architecture and attention mechanism', 'Vector search retrieval metrics (Precision@K, NDCG)'],
  },
  {
    id: 'car-4',
    title: 'Cybersecurity & Information Security Engineer',
    tagline: 'Protect critical banking infrastructure, cloud assets, and web applications from cyber threats.',
    demandInEthiopia: 'Very High',
    typicalEmployers: ['Commercial Bank of Ethiopia', 'Information Network Security Administration (INSA)', 'Ethio Telecom', 'Private Commercial Banks', 'Auditing Firms'],
    requiredSkills: ['Linux Internals', 'Networking Protocols (TCP/IP)', 'Cryptography', 'OWASP Top 10', 'Penetration Testing', 'SIEM Tools'],
    beginnerRoadmap: ['Learn networking, subnetting, and Wireshark packet capture', 'Master Linux terminal navigation and user permissions', 'Understand symmetric vs asymmetric cryptography'],
    intermediateRoadmap: ['Conduct OWASP Top 10 vulnerability audits on web apps', 'Practice on TryHackMe / HackTheBox junior paths', 'Understand PKI, SSL/TLS, and digital certificates'],
    advancedRoadmap: ['Learn reverse engineering and memory exploits', 'Implement automated security scanning in CI/CD pipelines', 'Prepare for certifications like CompTIA Security+ or CEH'],
    portfolioMilestones: ['Documented vulnerability assessment report on demo app', 'Custom intrusion detection log parser in Python', 'Automated security header scanner CLI'],
    interviewPrepFocus: ['Explain how cross-site scripting (XSS) and SQL injection work', 'Describe how TLS handshake secures communication', 'Incident response steps during a data breach'],
  },
  {
    id: 'car-5',
    title: 'Mobile Application Developer (Flutter / React Native)',
    tagline: 'Craft responsive, offline-resilient mobile applications for Android and iOS devices.',
    demandInEthiopia: 'Very High',
    typicalEmployers: ['SantimPay', 'Delivery Startups', 'Microfinance Institutions', 'Telebirr SuperApp Ecosystem', 'Freelance Clients'],
    requiredSkills: ['Flutter / Dart or React Native', 'Offline SQLite/Hive Storage', 'REST API Integration', 'State Management (Bloc/Zustand)', 'UI/UX Polish'],
    beginnerRoadmap: ['Learn Dart or modern JavaScript/TypeScript', 'Understand mobile layout widgets and component trees', 'Build a multi-screen mobile portfolio app'],
    intermediateRoadmap: ['Integrate device camera, GPS, and push notifications', 'Implement local offline caching with SQLite/Hive', 'Connect to REST backend with secure token storage'],
    advancedRoadmap: ['Publish apps to Google Play Store', 'Optimize app bundle size and frame rate performance', 'Integrate biometric authentication and QR code scanners'],
    portfolioMilestones: ['Offline-capable merchant inventory mobile app', 'Student campus ride-share or shuttle tracking app', 'Ethiopian recipe or cultural heritage guide with audio'],
    interviewPrepFocus: ['Mobile state management lifecycle', 'Offline data sync and conflict resolution strategies', 'Optimizing memory usage on budget Android devices'],
  },
  {
    id: 'car-6',
    title: 'Technology Entrepreneur / Startup Builder',
    tagline: 'Identify systemic problems in Ethiopia, architect software solutions, and build sustainable tech ventures.',
    demandInEthiopia: 'Emerging',
    typicalEmployers: ['Founder / Co-Founder', 'Incubators (blueMoon, Iceaddis, Orbit Innovation Hub)', 'FinTech Accelerators'],
    requiredSkills: ['Full-Stack Rapid Prototyping', 'Product Design (UI/UX)', 'Customer Discovery', 'Unit Economics', 'Payment Integration', 'Pitching'],
    beginnerRoadmap: ['Learn to build fast MVPs using modern full-stack tools', 'Interview 20 potential users before writing code', 'Validate problem severity and willingness to use'],
    intermediateRoadmap: ['Launch a functional MVP with Telebirr / Chapa integration', 'Track user onboarding funnel and churn rate', 'Iterate weekly based on direct qualitative feedback'],
    advancedRoadmap: ['Incorporate legal business entity in Ethiopia', 'Scale infrastructure while keeping server costs minimal', 'Pitch to angel investors, local venture funds, or grant competitions'],
    portfolioMilestones: ['Live revenue-generating SaaS or marketplace', 'Documented 13-point business case study', 'Recorded user testimonial video'],
    interviewPrepFocus: ['Explain your customer acquisition cost (CAC) vs lifetime value (LTV)', 'Describe how your tech architecture handles low bandwidth', 'Articulate your unfair distribution advantage in Ethiopia'],
  },
];

export const gamificationBadges: GamificationBadge[] = [
  { id: 'b-1', title: 'First Project Shipped', icon: '🏆', description: 'Built, tested, and published your first working software application.', unlocked: true, progress: 1, maxProgress: 1, category: 'Projects' },
  { id: 'b-2', title: '100 Coding Problems', icon: '💻', description: 'Solved 100 algorithm and data structure problems with active recall.', unlocked: false, progress: 47, maxProgress: 100, category: 'Problems' },
  { id: 'b-3', title: '7-Day Learning Streak', icon: '🔥', description: 'Studied, practiced, or built code for 7 consecutive days without skipping.', unlocked: false, progress: 6, maxProgress: 7, category: 'Streak' },
  { id: 'b-4', title: 'First Deployed App', icon: '🚀', description: 'Deployed a full-stack project live to a cloud server or public URL.', unlocked: true, progress: 1, maxProgress: 1, category: 'Projects' },
  { id: 'b-5', title: 'AI Explorer', icon: '🧠', description: 'Used modern AI strategically to analyze, refactor, and review code with anti-dependence.', unlocked: true, progress: 5, maxProgress: 5, category: 'AI' },
  { id: 'b-6', title: 'Build for Ethiopia Champion', icon: '🇪🇹', description: 'Architected a technical solution targeting a real Ethiopian societal problem.', unlocked: true, progress: 1, maxProgress: 1, category: 'Community' },
  { id: 'b-7', title: 'Open Source Contributor', icon: '🌍', description: 'Submitted a meaningful pull request or public documentation improvement.', unlocked: false, progress: 0, maxProgress: 1, category: 'Community' },
];

export const initialKnowledgeNotes: KnowledgeNote[] = [
  {
    id: 'note-1',
    title: 'Idempotency Keys in Payment Gateways (Telebirr & Chapa)',
    category: 'Code Snippet',
    content: 'When a mobile payment request is sent over intermittent 3G/4G, network timeouts can cause duplicate transaction attempts. The client must generate a UUID idempotency key and store it with a UNIQUE constraint in PostgreSQL. If the server receives the same key again, it returns the cached transaction response without double-charging.',
    codeSnippet: `// Example Express handler with Idempotency check
app.post('/api/charge', async (req, res) => {
  const { idempotencyKey, amount, phone } = req.body;
  const existing = await db.query(
    'SELECT * FROM payments WHERE idempotency_key = $1',
    [idempotencyKey]
  );
  if (existing.rows.length > 0) {
    return res.status(200).json(existing.rows[0]);
  }
  // Proceed with safe single charge
});`,
    tags: ['FinTech', 'PostgreSQL', 'Architecture', 'Security'],
    dateCreated: '2026-09-22',
  },
  {
    id: 'note-2',
    title: 'Big-O Cheat Sheet for Common Data Structures',
    category: 'Concept Explanation',
    content: 'Array: Access O(1), Search O(n), Insertion/Deletion O(n). Linked List: Access O(n), Search O(n), Insertion/Deletion at head O(1). Hash Table: Average Access/Search/Insert O(1), Worst O(n). Binary Search Tree: Average O(log n), Worst O(n) if unbalanced.',
    tags: ['Algorithms', 'DSA', 'Exam Prep'],
    dateCreated: '2026-09-24',
  },
  {
    id: 'note-3',
    title: 'Offline-First Web Architecture for Intermittent Networks',
    category: 'Project Architecture',
    content: 'Use Cache-First or Stale-While-Revalidate service workers for static assets, and IndexedDB to persist user drafts and database records locally. Outgoing actions are placed into a pending sync queue. When window.addEventListener("online", ...) fires, the client flushes queued operations with exponential backoff.',
    tags: ['Web', 'Offline', 'Ethiopia', 'Architecture'],
    dateCreated: '2026-09-25',
  },
];

export const initialStudyCalendar: StudyCalendarEvent[] = [
  { id: 'cal-1', title: 'Data Structures Midterm Examination', type: 'exam', course: 'CoSc 2031 (DSA)', dueDate: '2026-10-14', priority: 'critical', completed: false, notes: 'Focus on binary search trees, AVL trees, and recursion analysis.' },
  { id: 'cal-2', title: 'Database Relational Normalization Lab Submission', type: 'assignment', course: 'CoSc 2042 (DBMS)', dueDate: '2026-10-08', priority: 'high', completed: false, notes: 'Submit ER diagram and 3NF decomposition proofs.' },
  { id: 'cal-3', title: 'Deploy Project 2 API to Railway with PostgreSQL', type: 'project_milestone', course: 'Personal Portfolio', dueDate: '2026-10-18', priority: 'high', completed: false, notes: 'Ensure environment variables and health check endpoint are configured.' },
  { id: 'cal-4', title: 'Weekly 90-Minute LeetCode Timed Problem Solving', type: 'study_session', course: 'Coding Practice', dueDate: '2026-10-03', priority: 'medium', completed: false, notes: 'Two Pointers and Sliding Window categories.' },
];

export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 'sq-1',
    type: 'mcq',
    prompt: 'In a relational database, what does Third Normal Form (3NF) strictly require that Second Normal Form (2NF) does not?',
    options: [
      'A) Every non-key attribute must be non-transitively dependent on the primary key',
      'B) The table must not contain repeating groups',
      'C) Every non-key attribute must depend on part of a composite primary key',
      'D) Foreign keys must point to auto-incrementing integers',
    ],
    correctAnswer: 'A) Every non-key attribute must be non-transitively dependent on the primary key',
    explanation: '2NF eliminates partial dependencies on a composite primary key. 3NF goes further by eliminating transitive dependencies (i.e. non-key attributes determining other non-key attributes).',
    courseCode: 'CoSc 2042',
    difficulty: 'Exam Ready',
  },
  {
    id: 'sq-2',
    type: 'mcq',
    prompt: 'What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST) with N elements?',
    options: ['A) O(1)', 'B) O(log N)', 'C) O(N)', 'D) O(N log N)'],
    correctAnswer: 'C) O(N)',
    explanation: 'If elements are inserted in sorted order, an unbalanced BST degenerates into a linear linked list where height is N, resulting in O(N) search time. Balanced trees (AVL, Red-Black) guarantee O(log N).',
    courseCode: 'CoSc 2031',
    difficulty: 'Intermediate',
  },
  {
    id: 'sq-3',
    type: 'true_false',
    prompt: 'True or False: In TCP, the initial 3-way handshake sequence is SYN -> SYN-ACK -> ACK.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Client sends SYN to initiate, server responds with SYN-ACK to acknowledge and synchronize its own sequence number, and client finishes with ACK.',
    courseCode: 'CoSc 3071',
    difficulty: 'Beginner',
  },
  {
    id: 'sq-4',
    type: 'mcq',
    prompt: 'Why should a backend service in Ethiopia never process a payment webhook without verifying the cryptographic signature header?',
    options: [
      'A) To save bandwidth and CPU processing',
      'B) Because malicious attackers could forge fake HTTP POST requests to mark unpaid orders as paid',
      'C) Because telecommunications providers block unencrypted JSON packets',
      'D) To comply with CSS styling standards',
    ],
    correctAnswer: 'B) Because malicious attackers could forge fake HTTP POST requests to mark unpaid orders as paid',
    explanation: 'Without HMAC signature verification, any external actor who discovers your webhook endpoint could send spoofed {"status": "success"} payloads and gain free goods or digital credits.',
    courseCode: 'CoSc 4122',
    difficulty: 'Exam Ready',
  },
];

export interface FlashcardItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  codeSnippet?: string;
}

export const defaultFlashcards: FlashcardItem[] = [
  {
    id: 'fc-1',
    category: 'Data Structures & Algorithms',
    question: 'How do you detect a cycle in a singly linked list in O(n) time and O(1) space?',
    answer: "Use Floyd's Cycle-Finding Algorithm (Tortoise and Hare). Maintain two pointers: a slow pointer moving 1 step at a time, and a fast pointer moving 2 steps. If there is a cycle, the fast pointer will eventually catch up and meet the slow pointer.",
    codeSnippet: `function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
  },
  {
    id: 'fc-2',
    category: 'System Design & Databases',
    question: 'What is database idempotency and why is it crucial for financial webhooks (e.g. Telebirr/Chapa)?',
    answer: 'An idempotent operation produces the exact same result whether executed once or multiple times. In Ethiopian payment gateways, mobile network dropped connections can cause the gateway to retry webhook delivery. Without idempotency keys stored in PostgreSQL, the customer could be credited or charged multiple times.',
    codeSnippet: `// Deduplication with idempotency key
INSERT INTO processed_webhooks (webhook_id, order_id, processed_at)
VALUES ($1, $2, NOW())
ON CONFLICT (webhook_id) DO NOTHING;`,
  },
  {
    id: 'fc-3',
    category: 'Operating Systems',
    question: 'What is the critical difference between a Process and a Thread?',
    answer: 'A Process is an executing instance of a program with its own independent virtual address space, memory heap, and file descriptors. A Thread is the smallest unit of CPU execution within a process; multiple threads in the same process share the same heap, address space, and global state, requiring synchronization (mutex/semaphore) to prevent race conditions.',
  },
  {
    id: 'fc-4',
    category: 'Computer Networks',
    question: 'Explain what happens when you type "https://chapa.co" into a browser and press Enter.',
    answer: '1. DNS Lookup: Browser checks local cache, then queries DNS resolver to translate chapa.co into an IP address.\n2. TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK establishes TCP socket.\n3. TLS Handshake: Cipher suites negotiated, certificate validated, symmetric session keys generated.\n4. HTTP Request: Browser sends GET / HTTP/2 request.\n5. Server Response & DOM Rendering: Server returns HTML, CSS, JS; browser parses DOM, constructs CSSOM, and paints pixels.',
  },
  {
    id: 'fc-5',
    category: 'Web Engineering & React',
    question: 'Why should you avoid using array index as the "key" prop in React lists with dynamic items?',
    answer: 'React uses the "key" prop to identify which items have changed, been added, or been removed during reconciliation. If you reorder, filter, or insert items, an index-based key causes React to misunderstand which DOM nodes to update, leading to state corruption in input fields, unwanted rerenders, and animation glitches. Always use stable unique IDs.',
  },
  {
    id: 'fc-6',
    category: 'Ethiopian Tech & Architecture',
    question: 'How do you design an offline-first mobile or web application for areas with intermittent power or mobile data?',
    answer: '1. Local Storage First: Save user actions immediately to SQLite (mobile) or IndexedDB (web).\n2. Sync Queue: Add mutations to an outbox queue with timestamps and UUIDs.\n3. Background Sync: When connectivity returns (navigator.onLine or NetInfo), flush pending items in FIFO order with retry backoff.\n4. Conflict Resolution: Use Last-Write-Wins (LWW) or operational CRDTs.',
  },
];

