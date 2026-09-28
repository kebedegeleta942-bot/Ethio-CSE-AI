import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const ETHIO_CSE_AI_SYSTEM_INSTRUCTION = `
You are **Ethio CSE AI Assistant**, the dedicated AI-powered academic and career companion for Ethiopian Computer Science and computing students.
Brand: "Ethio CSE AI"
Tagline: "Learn. Build. Innovate."
Philosophy: "From student to builder. Your code can solve real problems."

CRITICAL ADAPTABILITY RULE:
You serve students across ALL academic levels:
- 1st Year: Fundamentals of programming (C/C++, Python), discrete math, problem-solving, basic web, study habits.
- 2nd Year: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Databases (SQL), Computer Organization, Operating Systems fundamentals.
- 3rd Year: Computer Networks, Advanced Databases, Software Engineering principles, Mobile/Web development, Systems programming, Intro AI/ML.
- 4th Year: Advanced specializations, Graduation/Capstone project, Internship prep, Cloud, Cybersecurity, Employment readiness, Freelancing, Remote work.
- 5th Year / Extended: Capstone completion, Research, Advanced systems, Entrepreneurship, Portfolio polish, Job readiness.
- Recent Graduate: Full-time job search, Technical interviews, Portfolio refinement, Freelancing, Remote contracts.
- Self-Learner: Personalized, non-traditional curriculum tailored to their specific career aspiration.

NEVER assume every user is a 4th-year student. Tailor your tone, complexity, and examples to their selected level, but NEVER artificially restrict curiosity—if a 1st year asks about distributed vector search, explain it clearly from first principles. If a 4th year asks for a refresh on Big-O, teach it thoroughly without judgment.

ETHIOPIAN REALITIES GROUNDING:
- Universities: AAU (AAiT / 4 Kilo), ASTU, AASTU, Jimma, Hawassa, Bahir Dar, Haramaya, Dilla, Mekelle, Arba Minch, Gondar, Wollo, Dire Dawa, Debre Berhan, etc.
- Infrastructure: Power interruptions & fluctuating bandwidth (advise offline-first architectures, SQLite/PostgreSQL local dev, Docker local images, service workers).
- Payments & Ecosystem: Telebirr, Chapa, CBE Birr, SantimPay.
- Local Employers: Ethio Telecom, Safaricom Ethiopia, Commercial Bank of Ethiopia (CBE), Awash, Dashen, Chapa, Gebeya, ALX Ethiopia, EagleLion, Minab IT.
- When discussing job openings or current market data, distinguish **CURRENT VERIFIED OPENING** vs **GENERAL CAREER INFORMATION**. Never invent jobs or salaries.
- Zero Plagiarism & Anti-AI-Dependence: Teach how code works step-by-step; do not encourage blind copy-pasting.

LEARNING MODES SUPPORT:
- "explain": Plain-English breakdown, intuitive real-world analogies, concise code snippets.
- "teach": Step-by-step tutoring. Give guided hints before revealing the full answer.
- "practice": Generate progressive problem prompts with test cases.
- "quiz": Formulate conceptual and multiple-choice questions with answer analysis.
- "debug": Pinpoint bugs, explain why the error occurred, and provide clean fixes.
- "codereview": Provide an Anti-AI-Dependence review (What it does, Why it works, Edge cases, Security, Test plan, Interview defense questions).
- "project": Help architect projects (UI -> API -> Database -> Testing -> Deployment).
- "examprep": Focus on Ethiopian university semester finals and the nationwide Ministry of Education (MoE) Computer Science & Software Engineering Exit Exam.
  * Master the 5 official MoE Exit Exam Competency Clusters:
    1. Programming & Data Structures & Algorithms (25% weight)
    2. Database Management Systems & Advanced Databases (20% weight)
    3. Operating Systems & Computer Architecture (20% weight)
    4. Computer Networks, Data Communication & Security (20% weight)
    5. Software Engineering, OOAD & System Design (15% weight)
  * Understand official passing criteria: strictly ≥ 50% across the computerized examination.
  * Address classic recurring traps: naive QuickSort worst-case O(n²) on sorted arrays, /26 subnetting usable hosts = 62, 2NF partial dependencies with composite keys, Belady's anomaly in FIFO page replacement, Banker's algorithm safe states, and Cyclomatic complexity V(G) = E - N + 2P.
  * When asked "Pre help me for exit exam", give high-leverage diagnostic guidance: test student understanding, pinpoint weak clusters, provide step-by-step calculations, and recommend prioritized 30-day revision timelines.
- "career": Tailor guidance to Ethiopian tech firms and international remote standards.
- "planner": Realistic daily/weekly scheduling respecting class timetable and energy levels.
- "research": Break down computer science research topics, distributed systems papers, and AI advancements.
`;

// Helper: build student context string
function formatStudentContext(profile: any, mode?: string): string {
  if (!profile) return mode ? `CURRENT MODE: ${mode}` : '';
  return `
STUDENT PROFILE:
- Name: ${profile.name || 'Student'}
- Academic Level: ${profile.academicLevel || 'Computer Science Student'}
- University: ${profile.university || 'Ethiopian University'} (${profile.campus || 'Main Campus'})
- Current Technical Level: ${profile.currentTechLevel || 'Intermediate'}
- Career Goal: ${profile.primaryCareer || 'Software Engineer'} (Backup: ${profile.secondaryCareer || 'Full-Stack Developer'})
- Preferred Languages: ${(profile.preferredLanguages || []).join(', ') || 'Python, JavaScript, C++'}
- Available Study Time: ${profile.weeklyStudyHours || 20} hours/week
- Learning Style: ${profile.preferredLearningStyle || 'Hands-on Projects'}
- Main Challenges: ${(profile.mainChallenges || []).join(', ') || 'Balancing coursework'}
- Active Learning Mode: ${mode || 'General Mentor'}
`;
}

// Endpoint: Main AI Assistant & Copilot Chat
app.post('/api/copilot/chat', async (req: Request, res: Response) => {
  try {
    const { messages, studentProfile, triggerContext, mode } = req.body;

    const dynamicContext = `${formatStudentContext(studentProfile, mode)}\n${
      triggerContext ? `TRIGGER CONTEXT: ${triggerContext}\n` : ''
    }`;

    const conversationContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: conversationContents,
      config: {
        systemInstruction: `${ETHIO_CSE_AI_SYSTEM_INSTRUCTION}\n${dynamicContext}`,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const reply = response.text || 'I am ready to help you learn, build, and innovate.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message || 'Failed to process AI request' });
  }
});

// Endpoint: Exam & Topic Quiz Generator
app.post('/api/copilot/quiz-generate', async (req: Request, res: Response) => {
  try {
    const { courseTitle, topic, difficulty, academicLevel, count } = req.body;

    const prompt = `
Generate ${count || 4} high-yield exam practice questions for an Ethiopian Computer Science student.
Course: ${courseTitle || 'Data Structures & Algorithms'}
Topic: ${topic || 'Binary Search Trees & Hash Maps'}
Difficulty: ${difficulty || 'Exam Ready'}
Student Academic Level: ${academicLevel || '2nd Year'}

Return a valid JSON array of objects with the exact structure:
[
  {
    "id": "q1",
    "type": "mcq", // or "true_false" or "short_answer" or "coding"
    "prompt": "Question text here",
    "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
    "correctAnswer": "A) Option 1",
    "explanation": "Detailed explanation of why this answer is correct and why other choices are wrong."
  }
]

Do NOT wrap the response in markdown blocks if possible, just return raw JSON or standard JSON.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.4,
      },
    });

    const rawText = response.text || '[]';
    // Clean potential markdown quotes
    const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    let questions = [];
    try {
      questions = JSON.parse(cleaned);
    } catch {
      questions = [
        {
          id: 'q1',
          type: 'mcq',
          prompt: `In ${topic || 'Computer Science'}, what is the primary computational trade-off?`,
          options: ['A) Time complexity vs Space complexity', 'B) Voltage vs Current', 'C) RAM speed vs Monitor refresh', 'D) None of the above'],
          correctAnswer: 'A) Time complexity vs Space complexity',
          explanation: 'Algorithm efficiency is fundamentally evaluated by balancing time (CPU cycles) and space (memory consumption).',
        },
      ];
    }

    res.json({ questions });
  } catch (error: any) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate quiz questions' });
  }
});

// Endpoint: Live Job Search grounded with Google Search
app.post('/api/copilot/search-jobs', async (req: Request, res: Response) => {
  try {
    const { query, category } = req.body;

    const promptText = `
Perform a search for current software engineering, tech internship, or developer opportunities for Ethiopian Computer Science students and graduates.
Search target: ${query || 'Ethiopian tech software developer jobs, junior engineer, fintech CBE Telebirr Chapa, remote developer internships'}
Category: ${category || 'All'}

CRITICAL INSTRUCTION:
Clearly separate your findings into two distinct sections:
1. **CURRENT VERIFIED OPENING**: Verified current active listings, internships, or open applications (include company, role requirements, location or remote status, application link or source if known).
2. **GENERAL CAREER INFORMATION**: Ongoing hiring patterns, typical requirements, tech stack demands in Ethiopian banks/telecoms/startups (e.g., CBE, Ethio Telecom, Safaricom Ethiopia, Chapa, Gebeya) and remote junior developer standards.

Do not invent salaries or make up job openings. Be completely transparent.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const reply = response.text || 'No job records could be retrieved.';
    res.json({ result: reply });
  } catch (error: any) {
    console.error('Job search error:', error);
    res.status(500).json({ error: error.message || 'Failed to search job opportunities' });
  }
});

// Endpoint: 13-Point Ethiopian Problem -> Tech -> Business Analyzer ("Build for Ethiopia 🇪🇹")
app.post('/api/copilot/analyze-idea', async (req: Request, res: Response) => {
  try {
    const { idea, context, academicLevel } = req.body;

    const prompt = `
Analyze the following project/business idea for an Ethiopian Computer Science student (${academicLevel || 'University Student'}):
Idea: "${idea}"
Context: "${context || 'Ethiopian tech market, local payment integrations, student project or startup'}"

Provide a thorough, practical 13-point analysis:
1. Problem: Real pain point in Ethiopia
2. Target Users: Who specifically has this problem
3. Existing Alternatives: How they currently cope (manual, informal, competitors)
4. Why the Problem Matters: Impact on livelihoods or business efficiency
5. Proposed Solution: Architectural approach
6. Technical Difficulty: Real rating (Low / Medium / High / Very High) with breakdown
7. Cost: Infrastructure, SMS/gateway fees, hosting, offline resilience
8. Monetization Possibilities: Transaction fees, subscription, B2B licensing (Telebirr/Chapa/CBE Birr)
9. Competition: Local startups or manual habits
10. Risks: Internet reliability, government regulations, adoption friction
11. MVP: Exactly what to build in 3-4 weeks to validate
12. Future Expansion: Scaling to regional cities (Hawassa, Adama, Bahir Dar, Jimma, Mekelle)
13. Skills Learned: Practical engineering skills acquired (e.g., PostgreSQL, Docker, Redis, Auth, Webhooks)

Conclude with a clear verdict: "RECOMMENDED TO BUILD", "BUILD AS EXPERIMENT", or "DE-PRIORITIZE".
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.6,
      },
    });

    res.json({ analysis: response.text || '' });
  } catch (error: any) {
    console.error('Idea analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze idea' });
  }
});

// Endpoint: Task Deconstruction ("I'm stuck")
app.post('/api/copilot/breakdown-task', async (req: Request, res: Response) => {
  try {
    const { task, obstacle, academicLevel } = req.body;

    const prompt = `
An Ethiopian Computer Science student (${academicLevel || 'Student'}) is procrastinating or feeling overwhelmed by this task:
Task: "${task}"
Obstacle / Feeling: "${obstacle || 'Overwhelmed and unsure where to start'}"

Do NOT give a generic motivational speech.
Apply the Anti-Procrastination Protocol:
1. Identify the exact hidden friction (e.g. ambiguity, fear of bug, lack of scaffold, energy slump).
2. Reduce the task into 4 immediate, concrete micro-steps that take under 10 minutes total to start momentum.
3. Define the exact definition of "Done for right now".
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ breakdown: response.text || '' });
  } catch (error: any) {
    console.error('Breakdown error:', error);
    res.status(500).json({ error: error.message || 'Failed to break down task' });
  }
});

// Endpoint: Code Review & Anti-AI-Dependence Check
app.post('/api/copilot/code-review', async (req: Request, res: Response) => {
  try {
    const { code, language, intent, academicLevel } = req.body;

    const prompt = `
Review this code written/generated for an Ethiopian CSE student (${academicLevel || 'Student'}):
Language: ${language || 'TypeScript/JavaScript'}
Intent: ${intent || 'Project feature or assignment'}
Code:
\`\`\`${language || 'text'}
${code}
\`\`\`

Perform an Anti-AI-Dependence Review:
1. Plain-English Architecture: What does this code actually do step-by-step?
2. Why it works: Underlying computer science and framework mechanisms
3. Potential bugs & edge cases: (null checks, network dropouts, race conditions, memory leaks)
4. Security vulnerabilities: (SQL injection, XSS, token leakage, validation)
5. Testing requirements: 2-3 unit or integration tests to verify this
6. Code Comprehension Check: 3 quick conceptual questions the student must be able to answer if a technical interviewer or university professor asks them about this code.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ review: response.text || '' });
  } catch (error: any) {
    console.error('Code review error:', error);
    res.status(500).json({ error: error.message || 'Failed to review code' });
  }
});

// Endpoint: Daily Study Plan Generator
app.post('/api/copilot/study-plan', async (req: Request, res: Response) => {
  try {
    const { studentProfile, availableHours, upcomingDeadlines } = req.body;

    const prompt = `
Generate a balanced, realistic Daily Study Plan for an Ethiopian Computer Science student.
Level: ${studentProfile?.academicLevel || '2nd Year'}
University: ${studentProfile?.university || 'Ethiopian University'}
Available Focus Hours Today: ${availableHours || 3} hours
Upcoming Deadlines/Exams: ${upcomingDeadlines || 'Regular semester coursework & assignments'}
Career Goal: ${studentProfile?.primaryCareer || 'Software Engineer'}

Structure the plan realistically across:
1. 📚 Academic Focus (Course theory or lab work)
2. 💻 Coding & Technical Practice (Hands-on programming)
3. 🧠 Problem Solving / DSA (Algorithm logic)
4. 🚀 Project Milestone (Concrete micro-feature)
5. 🎯 Career / Reflection (GitHub commit, resume bullet, or review)

Ensure the schedule is not overwhelming and accounts for realistic energy cycles.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ plan: response.text || '' });
  } catch (error: any) {
    console.error('Study plan error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate study plan' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ethio CSE AI server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
