import { CSCourseModule } from '../types';

export interface CurriculumComparisonBridge {
  id: string;
  topicDomain: string;
  ethiopianCourses: string[];
  harvardCourses: string[];
  howToStudyTogether: string;
  recommendedAction: string;
}

export const harvardCSECourses: CSCourseModule[] = [
  {
    id: 'harvard-cs50x',
    code: 'CS50x',
    title: "CS50's Introduction to Computer Science",
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS & edX)',
    instructor: 'Prof. David J. Malan',
    recommendedYear: '1st Year',
    semester: 'Fall Semester / Open Course',
    creditHours: '4 Harvard College Credits',
    category: 'Fundamentals',
    courseUrl: 'https://cs50.harvard.edu/x',
    description: 'Harvard University’s legendary introduction to the intellectual enterprises of computer science and the art of programming. Covers algorithmic thinking, memory management in C, data structures, and transitions into Python, SQL, and Web.',
    keyTopics: [
      'Computational Thinking & Complexity',
      'C Programming & Syntax',
      'Memory, Pointers & Pointer Arithmetic',
      'Dynamic Memory Allocation (malloc, free)',
      'Data Structures (Linked Lists, Trees, Hash Tables, Tries)',
      'Python Programming',
      'SQL & Relational Databases',
      'HTML, CSS, JavaScript & Flask'
    ],
    problemSets: [
      'Pset 0: Scratch Interactive Game',
      'Pset 1: C - Mario (Pyramids) & Credit (Luhn Algorithm)',
      'Pset 2: C - Readability (Coleman-Liau index) & Caesar/Substitution Cipher',
      'Pset 3: C - Plurality, Runoff & Tideman (Ranked Choice Voting)',
      'Pset 4: Memory - Volume, Filter (Greyscale, Blur, Sobel Edges) & Recover (JPEG Carver)',
      'Pset 5: Data Structures - Speller (Dictionary spell checker with Hash Table / Trie)',
      'Pset 6: Python - Sentimental Mario, Credit, Readability & DNA profiling',
      'Pset 7: SQL - Songs, Movies & Fiftyville mystery mystery detective investigation',
      'Pset 8: Web - HTML/CSS/JS Homepage',
      'Pset 9: Flask - C$50 Finance (Virtual stock trading platform)',
      'CS50 Final Project'
    ],
    practicalExercises: [
      'Build memory-leak free hash table spell-checker in C (valgrind verified)',
      'Reverse-engineer raw disk image to recover deleted JPEGs byte by byte',
      'Develop complete Flask + SQLite stock portfolio management platform'
    ],
    ethiopianExamFocus: 'Directly reinforces Ethiopian CoSc 1011 (Intro to CS), CoSc 1012 (Programming I in C/C++), and CoSc 2031 (DSA foundations). Solves difficult C pointer & memory tracing questions on semester finals.',
    ethiopianEquivalent: 'Equivalent to Ethiopian CoSc 1011 + CoSc 1012 + CoSc 2031 Intro Module'
  },
  {
    id: 'harvard-cs50w',
    code: 'CS50W',
    title: "CS50's Web Programming with Python and JavaScript",
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS & edX)',
    instructor: 'Brian Yu & Prof. David J. Malan',
    recommendedYear: '2nd Year',
    semester: 'Spring Semester / Open Course',
    creditHours: '4 Harvard College Credits',
    category: 'Software Engineering',
    courseUrl: 'https://cs50.harvard.edu/web',
    description: 'Deep dive into the design and implementation of scalable web applications using Python (Django), JavaScript, React, SQL, and Git. Emphasizes clean architecture, API design, security, and test-driven development.',
    keyTopics: [
      'HTML5, CSS3, Flexbox & Responsive Grid',
      'Git Version Control & GitHub Collaborations',
      'Django Web Framework (MVT, ORM, Models, Migrations)',
      'SQL, PostgreSQL & Relational Modeling',
      'JavaScript ES6+, DOM Manipulation, Async/Await & Fetch',
      'React Components, State Management & SPA',
      'RESTful APIs & JSON Web Services',
      'Testing & CI/CD with GitHub Actions',
      'Web Scalability, Caching & Security (CSRF, XSS, SQLi)'
    ],
    problemSets: [
      'Project 0: Search (Google Search, Image Search, Advanced Search clone)',
      'Project 1: Wiki (Wikipedia-like encyclopedia with Markdown rendering)',
      'Project 2: Commerce (eBay-like online auction site with bidding & watchlist)',
      'Project 3: Mail (Single-page email client using vanilla JS and REST API)',
      'Project 4: Network (Twitter/X-like social network with follow, like & pagination)',
      'Capstone Project: Full-stack web application designed from scratch'
    ],
    practicalExercises: [
      'Build single-page asynchronous email inbox without reloading page',
      'Architect relational database with Django ORM for multi-user auction bidding',
      'Implement real-time social feed with infinite scrolling and async like toggling'
    ],
    ethiopianExamFocus: 'Aligns with Ethiopian university CoSc 3041 (Web Programming) and CoSc 3031 (Software Engineering). Provides production engineering skills required for Ethiopian tech startups and freelance contracts.',
    ethiopianEquivalent: 'Direct equivalent to Ethiopian CoSc 3041 (Web Programming & Internet Technologies)'
  },
  {
    id: 'harvard-cs50ai',
    code: 'CS50AI',
    title: "CS50's Introduction to Artificial Intelligence with Python",
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS & edX)',
    instructor: 'Brian Yu & Prof. David J. Malan',
    recommendedYear: '3rd Year',
    semester: 'Fall Semester / Open Course',
    creditHours: '4 Harvard College Credits',
    category: 'Advanced & AI',
    courseUrl: 'https://cs50.harvard.edu/ai',
    description: 'Explores the foundational algorithms and mathematical concepts that power modern artificial intelligence. Students implement search algorithms, adversarial search, probabilistic models, machine learning, neural networks, and NLP from scratch.',
    keyTopics: [
      'Search Algorithms (BFS, DFS, A*, Greedy Best-First)',
      'Adversarial Search (Minimax, Alpha-Beta Pruning)',
      'Knowledge Representation & Propositional Logic',
      'Constraint Satisfaction Problems (Backtracking & AC-3)',
      'Uncertainty & Probability (Bayesian Networks, Markov Models)',
      'Machine Learning (k-NN, Perceptrons, Support Vector Machines)',
      'Neural Networks & Deep Learning (TensorFlow, PyTorch)',
      'Natural Language Processing (Tokenization, TF-IDF, Word Embeddings, Transformers)'
    ],
    problemSets: [
      'Project 0: Degrees (Kevin Bacon pathfinder with BFS) & Tic-Tac-Toe (AI with Minimax)',
      'Project 1: Knights (Logic puzzle solver) & Minesweeper (Inference AI agent)',
      'Project 2: PageRank (Random Surfer & Iterative algorithm) & Heredity (Bayesian network)',
      'Project 3: Crossword (Constraint satisfaction problem solver)',
      'Project 4: Shopping (k-NN purchase predictor) & Nim (Q-learning reinforcement agent)',
      'Project 5: Traffic (Deep convolutional neural network for road signs in TensorFlow)',
      'Project 6: Parser (Context-free grammar analyzer) & Attention (BERT masked language model)'
    ],
    practicalExercises: [
      'Write unbreakable Minimax with Alpha-Beta pruning for adversarial board games',
      'Train CNN on German traffic sign dataset achieving >95% test accuracy',
      'Build Markov decision process for predicting gene inheritance probabilities'
    ],
    ethiopianExamFocus: 'Directly covers Ethiopian university CoSc 3102 (Artificial Intelligence) and CoSc 4011 (Machine Learning). Solves A* heuristics and Minimax evaluation questions in university exams.',
    ethiopianEquivalent: 'Equivalent to Ethiopian CoSc 3102 (AI) & CoSc 4011 (Machine Learning)'
  },
  {
    id: 'harvard-cs50p',
    code: 'CS50P',
    title: "CS50's Introduction to Programming with Python",
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS & edX)',
    instructor: 'Prof. David J. Malan',
    recommendedYear: '1st Year',
    semester: 'Fall/Spring / Open Course',
    creditHours: '3 Harvard College Credits',
    category: 'Fundamentals',
    courseUrl: 'https://cs50.harvard.edu/python',
    description: 'Rigorous introduction to software development in Python. Covers clean code, unit testing, regular expressions, file I/O, object-oriented programming, and API integration.',
    keyTopics: [
      'Functions, Variables & Types',
      'Conditionals & Boolean Logic',
      'Loops (while, for, list comprehensions)',
      'Exceptions, Try-Except & Defensive Programming',
      'Libraries, PIP & Virtual Environments',
      'Unit Testing with pytest',
      'File I/O (CSV, JSON, binary)',
      'Regular Expressions (re module)',
      'Object-Oriented Programming (Classes, Methods, Properties, Dunder Methods)'
    ],
    problemSets: [
      'Pset 0: Indoor Voice, Playback Speed, Faces, Einstein, Tip Calculator',
      'Pset 1: Deep Thought, Bank, File Extensions, Math Interpreter, Meal Time',
      'Pset 2: camelCase, Coke Machine, Just setting up my twttr, Vanity Plates, Nutrition Facts',
      'Pset 3: Fuel Gauge, Felipe’s Taqueria, Grocery List, Outdated',
      'Pset 4: Emojize, Frank, Ian and Glen’s Letters, Adieu, Guessing Game, Little Professor, Bitcoin Price Index',
      'Pset 5: Testing my twttr, Test plates, Test fuel, Re-requesting a Vanity Plate (pytest)',
      'Pset 6: Lines of Code, Pizza Py, Scourgify, CS50 P-Shirt',
      'Pset 7: NUMB3RS (IPv4 validator regex), Watch on YouTube, Working 9 to 5, Regular, Um, Response Validation',
      'Pset 8: Seasons of Love, Cookie Jar, CS50 Shirtificate (OOP)',
      'CS50P Final Project'
    ],
    practicalExercises: [
      'Validate international IPv4 network addresses using robust regex',
      'Write full suite of automated test fixtures with pytest',
      'Model an object-oriented bank ledger with encapsulation and property getters'
    ],
    ethiopianExamFocus: 'Supplements CoSc 1012 and CoSc 2072. Python is the dominant language for modern Ethiopian engineering projects, data science, and AI initiatives.',
    ethiopianEquivalent: 'Supplements Ethiopian CoSc 1012 (Programming I) & CoSc 2072 (Advanced Python)'
  },
  {
    id: 'harvard-cs61',
    code: 'CS 61',
    title: 'Systems Programming and Machine Organization',
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS)',
    instructor: 'Prof. Eddie Kohler',
    recommendedYear: '2nd Year',
    semester: 'Fall Semester',
    creditHours: '4 Harvard College Credits',
    category: 'Systems & Architecture',
    courseUrl: 'https://cs61.seas.harvard.edu',
    description: 'Hardware-software interface from a programmer’s perspective. Covers x86-64 machine representations, assembly language, memory caches, performance optimization, system calls, virtual memory, process concurrency, and network programming in C/C++.',
    keyTopics: [
      'Data Representations (Integers, IEEE 754 Floating Point)',
      'x86-64 Assembly Language & Calling Conventions',
      'Processor Microarchitecture & Caches (L1, L2, L3, Cache Misses)',
      'Memory Allocation & Custom Malloc Implementations',
      'Operating System Kernels & System Calls',
      'Process Management (fork, exec, waitpid, signals)',
      'Virtual Memory & Address Translation (Paging, Page Tables, TLBs)',
      'Concurrency, Multi-Threading & Synchronization (pthreads, race conditions)',
      'Socket Programming & HTTP Servers'
    ],
    problemSets: [
      'Pset 1: Debugging Memory Allocator (dmalloc with canaries & leak detection)',
      'Pset 2: Bomb Lab (Reverse-engineering x86-64 assembly binaries with GDB)',
      'Pset 3: WeensyOS (Writing kernel virtual memory & process isolation in C++)',
      'Pset 4: Caching & IO Accelerator (Block cache simulation & prefetching)',
      'Pset 5: Shell Lab (Writing a concurrent Unix shell with signal handling)',
      'Pset 6: Pong61 (Concurrent multi-threaded networked Pong game in C++)'
    ],
    practicalExercises: [
      'Implement memory address protection and page isolation in a mini OS kernel',
      'Defuse binary bombs by stepping through assembly instructions in GDB',
      'Build concurrent Unix command interpreter with background job control'
    ],
    ethiopianExamFocus: 'Directly mirrors Ethiopian university CoSc 2021 (Digital Logic & Architecture), CoSc 2052 (Assembly Language), and CoSc 2062 (Operating Systems). Crucial for mastering CPU pipelines and memory management.',
    ethiopianEquivalent: 'Direct equivalent to Ethiopian CoSc 2021 + CoSc 2052 (Assembly) + CoSc 2062 (Operating Systems)'
  },
  {
    id: 'harvard-cs124',
    code: 'CS 124',
    title: 'Data Structures and Algorithms',
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS)',
    instructor: 'Prof. Michael Mitzenmacher',
    recommendedYear: '2nd Year',
    semester: 'Spring Semester',
    creditHours: '4 Harvard College Credits',
    category: 'Core CS',
    courseUrl: 'https://sites.google.com/seas.harvard.edu/cs-124',
    description: 'Rigorous algorithmic foundation. Covers amortized analysis, randomized algorithms, hashing, advanced dynamic programming, greedy algorithms, network flow (Ford-Fulkerson), graph algorithms, and NP-completeness proofs.',
    keyTopics: [
      'Asymptotic Notations & Master Theorem',
      'Divide and Conquer (Strassen, Fast Fourier Transform)',
      'Amortized Analysis (Accounting & Potential Methods)',
      'Randomized Algorithms & Universal Hashing',
      'Dynamic Programming (Knapsack, Edit Distance, Bellman-Ford)',
      'Greedy Algorithms & Matroids',
      'Network Flow & Min-Cut / Max-Flow Theorem',
      'Linear Programming & Duality',
      'NP-Completeness (Reductions from 3-SAT, Vertex Cover, Clique, TSP)'
    ],
    problemSets: [
      'Pset 1: Master Theorem bounds & Median-of-Medians linear selection',
      'Pset 2: Universal hashing & Cuckoo hashing simulation',
      'Pset 3: Advanced DP - Longest Palindromic Subsequence & Matrix Chain Multiplication',
      'Pset 4: Network Flow - Edmonds-Karp & Bipartite Matching algorithms',
      'Pset 5: NP-Completeness proofs - Polynomial-time reduction chains',
      'Pset 6: Approximation algorithms for Vertex Cover and Metric TSP'
    ],
    practicalExercises: [
      'Implement Edmonds-Karp Max-Flow algorithm to solve university exam timetable scheduling',
      'Prove NP-completeness of custom combinatorial problems via reduction from 3-SAT',
      'Benchmark randomized Quicksort vs deterministic median pivot on adversarial datasets'
    ],
    ethiopianExamFocus: 'Aligns directly with Ethiopian university CoSc 2031 (DSA) and CoSc 3011 (Design & Analysis of Algorithms). Guaranteed to help score top marks on Big-O, recurrence relations, and MoE Exit Exam algorithms cluster.',
    ethiopianEquivalent: 'Direct equivalent to Ethiopian CoSc 2031 (DSA) & CoSc 3011 (Algorithm Analysis)'
  },
  {
    id: 'harvard-cs181',
    code: 'CS 181',
    title: 'Machine Learning',
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS)',
    instructor: 'Prof. Sasha Rush & Prof. Finale Doshi-Velez',
    recommendedYear: '3rd Year',
    semester: 'Spring Semester',
    creditHours: '4 Harvard College Credits',
    category: 'Advanced & AI',
    courseUrl: 'https://harvard-ml-courses.github.io/cs181-web',
    description: 'Comprehensive probabilistic and optimization foundations of machine learning. Covers regression, classification, generative vs discriminative models, deep neural networks, Bayesian methods, clustering, expectation-maximization, and reinforcement learning.',
    keyTopics: [
      'Probabilistic Modeling & Maximum Likelihood Estimation (MLE/MAP)',
      'Linear & Polynomial Regression with Ridge/Lasso Regularization',
      'Generative Classifiers (Naive Bayes, Linear Discriminant Analysis)',
      'Discriminative Classifiers (Logistic Regression, Perceptrons, SVMs)',
      'Neural Networks, Backpropagation & Automatic Differentiation',
      'Unsupervised Learning (k-Means, Gaussian Mixture Models, PCA)',
      'Expectation-Maximization (EM) Algorithm',
      'Markov Decision Processes & Reinforcement Learning (Q-Learning)'
    ],
    problemSets: [
      'Pset 1: Linear & Ridge regression derivation with gradient descent',
      'Pset 2: Logistic regression, SVM kernel tricks & sentiment classification',
      'Pset 3: Custom neural network implementation from scratch with NumPy autograd',
      'Pset 4: PCA dimensionality reduction & Gaussian Mixture Models with EM',
      'Pset 5: Markov Decision Processes & Q-learning for cart-pole control'
    ],
    practicalExercises: [
      'Derive closed-form OLS normal equations from calculus & linear algebra',
      'Build Multi-Layer Perceptron in raw NumPy without PyTorch or TensorFlow',
      'Implement Expectation-Maximization algorithm for cluster discovery in unlabeled data'
    ],
    ethiopianExamFocus: 'Directly covers Ethiopian university CoSc 4011 (Machine Learning & Data Science). Ideal for final year Ethiopian AI capstone research and senior projects.',
    ethiopianEquivalent: 'Direct equivalent to Ethiopian CoSc 4011 (Machine Learning & Data Science)'
  },
  {
    id: 'harvard-cs121',
    code: 'CS 121',
    title: 'Introduction to the Theory of Computation',
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS)',
    instructor: 'Prof. Boaz Barak & Prof. Harry Lewis',
    recommendedYear: '3rd Year',
    semester: 'Fall Semester',
    creditHours: '4 Harvard College Credits',
    category: 'Core CS',
    courseUrl: 'https://introtcs.org',
    description: 'Fundamental theoretical limits of computing. What can and cannot be computed by computers? Explores finite automata, regular expressions, context-free grammars, Turing machines, decidability, the Halting Problem, P vs NP, and computational complexity.',
    keyTopics: [
      'Deterministic & Non-Deterministic Finite Automata (DFA / NFA)',
      'Regular Expressions & Pumping Lemma for Regular Languages',
      'Context-Free Grammars (CFG) & Pushdown Automata (PDA)',
      'Pumping Lemma for Context-Free Languages',
      'Turing Machines & Church-Turing Thesis',
      'Decidability, Undecidability & The Halting Problem',
      'Reducibility & Rice’s Theorem',
      'Complexity Classes (P, NP, NP-Complete, co-NP, PSPACE)',
      'Cryptographic Foundations & One-Way Functions'
    ],
    problemSets: [
      'Pset 1: Constructing minimal DFAs & NFA to DFA subset construction',
      'Pset 2: Proving languages non-regular using the Pumping Lemma',
      'Pset 3: Context-Free Grammars, Chomsky Normal Form & PDA state machines',
      'Pset 4: Designing multi-tape Turing machines for arithmetic languages',
      'Pset 5: Proving undecidability via reduction from the Halting Problem',
      'Pset 6: 3-SAT to Hamiltonian Cycle polynomial reduction'
    ],
    practicalExercises: [
      'Construct a minimal DFA recognizer for valid Amharic transliteration sequences',
      'Formulate mathematical proof that the Post Correspondence Problem is undecidable',
      'Simulate Turing machine tape operations in Python'
    ],
    ethiopianExamFocus: 'Directly maps to Ethiopian university CoSc 3051 (Formal Language Theory and Automata). Pumping lemma proofs and DFA construction are guaranteed questions on Ethiopian finals.',
    ethiopianEquivalent: 'Direct equivalent to Ethiopian CoSc 3051 (Formal Language Theory and Automata)'
  },
  {
    id: 'harvard-cs152',
    code: 'CS 152',
    title: 'Programming Languages',
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS)',
    instructor: 'Prof. Stephen Chong',
    recommendedYear: '3rd Year',
    semester: 'Spring Semester',
    creditHours: '4 Harvard College Credits',
    category: 'Software Engineering',
    courseUrl: 'https://harvard-pl.github.io/cs152',
    description: 'Principles, paradigms, and formal semantics of programming languages. Covers operational semantics, lambda calculus, type systems, type soundness proofs, memory safety, functional programming in OCaml, and language safety guarantees.',
    keyTopics: [
      'Functional Programming (OCaml, Haskell)',
      'Small-Step & Big-Step Operational Semantics',
      'Untyped Lambda Calculus & Church Encodings',
      'Simply Typed Lambda Calculus (STLC)',
      'Type Soundness (Progress and Preservation Theorems)',
      'Subtyping & Parametric Polymorphism (System F)',
      'Memory Safety, Ownership & Rust Mechanics',
      'Concurrency Models (Actors, STM, Message Passing)'
    ],
    problemSets: [
      'Pset 1: Functional programming in OCaml with algebraic data types',
      'Pset 2: Evaluator for Arithmetic Expressions using Small-Step Semantics',
      'Pset 3: Lambda Calculus interpreter with Beta-reduction & Church numerals',
      'Pset 4: Type checker and inference engine for Simply Typed Lambda Calculus',
      'Pset 5: Proving Progress and Preservation for custom language extensions'
    ],
    practicalExercises: [
      'Write complete AST interpreter in OCaml/TypeScript for custom domain language',
      'Implement Hindley-Milner type inference algorithm',
      'Prove type safety theorem for language with references and mutable memory'
    ],
    ethiopianExamFocus: 'Supplements Ethiopian university CoSc 3082 (Compiler Design) and advanced software engineering paradigms.',
    ethiopianEquivalent: 'Supplements Ethiopian CoSc 3082 (Compiler Design & Implementation)'
  },
  {
    id: 'harvard-cs50s',
    code: 'CS50S',
    title: "CS50's Introduction to Cybersecurity",
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS & edX)',
    instructor: 'Prof. David J. Malan',
    recommendedYear: '4th Year',
    semester: 'Spring Semester / Open Course',
    creditHours: '3 Harvard College Credits',
    category: 'Software Engineering',
    courseUrl: 'https://cs50.harvard.edu/cybersecurity',
    description: 'Introduction to cybersecurity for both technical and non-technical audiences. Explores how to identify and protect against risks in digital environments, covering malware, social engineering, cryptography, network attacks, and incident response.',
    keyTopics: [
      'Threat Modeling & Defense-in-Depth',
      'Authentication, Passwords & Multi-Factor Auth (MFA)',
      'Social Engineering, Phishing & Spear-Phishing',
      'Malware (Ransomware, Trojans, Rootkits, Spyware)',
      'Symmetric & Asymmetric Encryption (AES, RSA)',
      'Web Attacks (SQLi, XSS, CSRF, Session Hijacking)',
      'Network Security (Port Scanning, Wi-Fi WPA3, VPNs)',
      'Incident Response, Digital Forensics & Privacy Regulations'
    ],
    problemSets: [
      'Pset 0: Threat assessment audit of a business network',
      'Pset 1: Password cracking simulation & entropy calculator',
      'Pset 2: Phishing email detector and header analyzer',
      'Pset 3: Cryptographic cipher implementation and key exchange simulation',
      'Pset 4: Web application vulnerability audit and remediation report'
    ],
    practicalExercises: [
      'Audit sample company infrastructure against OWASP Top 10 vulnerabilities',
      'Analyze network pcap capture file for suspicious beaconing and exfiltration',
      'Implement robust password hashing with bcrypt and salt in Node.js/Python'
    ],
    ethiopianExamFocus: 'Directly reinforces Ethiopian university CoSc 4031 (Information Assurance and Cybersecurity). Essential for securing Ethiopian banking, fintech, and national critical infrastructure.',
    ethiopianEquivalent: 'Direct equivalent to Ethiopian CoSc 4031 (Information Assurance & Cybersecurity)'
  },
  {
    id: 'harvard-cs171',
    code: 'CS 171',
    title: 'Visualization',
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS)',
    instructor: 'Prof. Hanspeter Pfister',
    recommendedYear: '3rd Year',
    semester: 'Fall Semester',
    creditHours: '4 Harvard College Credits',
    category: 'Advanced & AI',
    courseUrl: 'https://www.visualizing.org',
    description: 'Theory and practical application of data visualization. Covers graphical perception, visual encoding principles, interactive exploratory data analysis, D3.js, geospatial mapping, and multidimensional data communication.',
    keyTopics: [
      'Data Abstraction & Task Analysis',
      'Visual Encoding Channels & Graphical Perception',
      'D3.js (Data-Driven Documents) & SVG Manipulation',
      'Color Theory & Perceptually Uniform Palettes',
      'Interactive Filtering, Zooming & Brushing',
      'Geospatial Mapping & Projections (Choropleths, GeoJSON)',
      'Network & Tree Visualizations (Force-directed graphs, Treemaps)',
      'Storytelling with Data & Ethical Visualization'
    ],
    problemSets: [
      'Pset 1: HTML, CSS, SVG and D3.js basic bar & scatter charts',
      'Pset 2: Interactive multi-series line chart with dynamic tooltips',
      'Pset 3: Geospatial interactive map using D3 and GeoJSON coordinates',
      'Pset 4: Linked views with coordinated brushing and filtering',
      'Course Final Project: Full exploratory interactive visualization dashboard'
    ],
    practicalExercises: [
      'Design interactive choropleth map of Ethiopian regional demographics using GeoJSON',
      'Build dynamic force-directed network graph of Addis Ababa public transit connections',
      'Implement cross-filtering dashboard between multiple linked SVG charts'
    ],
    ethiopianExamFocus: 'Aligns with Ethiopian university CoSc 4072 (Human-Computer Interaction) and CoSc 4011 (Data Science Visualizations).',
    ethiopianEquivalent: 'Supplements Ethiopian CoSc 4072 (Human-Computer Interaction)'
  },
  {
    id: 'harvard-cs205',
    code: 'CS 205',
    title: 'High Performance Computing for Systems and Data Science',
    curriculumSource: 'harvard_university',
    institution: 'Harvard University (Harvard SEAS)',
    instructor: 'Prof. David Sondak',
    recommendedYear: '4th Year',
    semester: 'Spring Semester',
    creditHours: '4 Harvard College Credits',
    category: 'Systems & Architecture',
    courseUrl: 'https://harvard-iacs.github.io/2021-CS205',
    description: 'Modern high-performance computing (HPC) software paradigms. Covers parallel algorithms, CPU architectures (SIMD, AVX), shared memory parallelism (OpenMP), distributed memory parallelism (MPI), and GPU acceleration (CUDA).',
    keyTopics: [
      'Parallel Hardware Architectures (Multicore, Clusters, GPUs)',
      'Amdahl’s Law & Gustafson’s Law Scaling Analysis',
      'Vectorization & SIMD Instruction Sets',
      'Shared Memory Multithreading with OpenMP',
      'Distributed Memory Message Passing with MPI (Point-to-Point, Collective)',
      'GPU Architecture & CUDA Programming (Kernels, Threads, Blocks, Shared Memory)',
      'Parallel Algorithms (Matrix Multiplication, Reduction, Sorting)',
      'Performance Profiling & Bottleneck Identification'
    ],
    problemSets: [
      'Pset 1: Vectorization and cache tiling optimizations for matrix multiplication',
      'Pset 2: Parallel image processing and stencil computing using OpenMP',
      'Pset 3: Distributed N-body gravitational simulation across cluster nodes using MPI',
      'Pset 4: High-throughput neural network forward pass kernel written in CUDA'
    ],
    practicalExercises: [
      'Accelerate linear algebra operations 50x using CUDA GPU shared memory blocks',
      'Profile parallel CPU code using Valgrind Callgrind and Intel VTune',
      'Implement parallel bucket sort distributed across multiple compute nodes with MPI'
    ],
    ethiopianExamFocus: 'Deepens Ethiopian university CoSc 4021 (Distributed Systems & Cloud Computing) and computer architecture.',
    ethiopianEquivalent: 'Supplements Ethiopian CoSc 4021 (Distributed Systems & Cloud Computing)'
  }
];

export const allEthiopianCSECourses: CSCourseModule[] = [
  // ==========================================
  // YEAR 1 - FRESHMAN YEAR (MoE Harmonized)
  // ==========================================
  {
    id: 'ethio-cosc-1011',
    code: 'CoSc 1011',
    title: 'Introduction to Computer Science & Problem Solving',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '1st Year',
    semester: 'Year 1 - Semester 1 (Freshman Core)',
    creditHours: '3 Cr / 5 ECTS',
    category: 'Fundamentals',
    description: 'Foundations of computing, number systems, binary arithmetic, Boolean algebra, computer hardware architecture, Von Neumann model, algorithmic decomposition, flowcharts, and structured pseudocode.',
    keyTopics: [
      'History & Generations of Computers',
      'Number Systems (Binary, Octal, Decimal, Hexadecimal Conversions)',
      'Binary Arithmetic, 1s and 2s Complement, Sign-Magnitude',
      'Boolean Logic Gates (AND, OR, NOT, NAND, NOR, XOR) & Truth Tables',
      'Von Neumann Architecture (CPU, ALU, CU, Registers, Memory Hierarchy)',
      'Algorithmic Thinking, Flowcharts & Pseudocode Conventions',
      'Basic Operating System Roles & File Systems',
      'Problem Decomposition and Structured Design'
    ],
    practicalExercises: [
      'Convert fractional decimal numbers into IEEE 754 floating-point format',
      'Design logic gate circuit simplification using Boolean algebraic laws',
      'Construct complete flowchart and pseudocode for the Euclidean GCD algorithm'
    ],
    ethiopianExamFocus: 'Number conversions (especially 2s complement binary subtraction) and truth table simplification are guaranteed questions on 1st-year university midterms and semester finals across AAU, ASTU, and AASTU.',
    harvardEquivalent: 'Aligns with Harvard CS50x Lecture 0 & Lecture 1'
  },
  {
    id: 'ethio-math-1011',
    code: 'Math 1011',
    title: 'Mathematics for Natural Sciences (Calculus I)',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized Freshman)',
    recommendedYear: '1st Year',
    semester: 'Year 1 - Semester 1',
    creditHours: '4 Cr / 7 ECTS',
    category: 'Fundamentals',
    description: 'Essential mathematical calculus foundation for computer science engineers: limits, continuity, differential calculus, derivative rules, optimization problems, and integral calculus applications.',
    keyTopics: [
      'Functions, Domain and Range, Composition of Functions',
      'Limits, Epsilon-Delta Definition & Continuity Theorems',
      'Derivatives, Chain Rule, Implicit Differentiation',
      'Mean Value Theorem & L’Hopital’s Rule',
      'Applications of Derivatives (Optimization, Maxima/Minima, Rates of Change)',
      'Integrals: Indefinite & Definite Integrals, Fundamental Theorem of Calculus',
      'Techniques of Integration (Substitution, Integration by Parts)'
    ],
    practicalExercises: [
      'Solve engineering cost-optimization problem using first and second derivative tests',
      'Calculate area bounded between curves using definite integral approximations',
      'Apply L’Hopital’s rule to resolve indeterminate calculus forms'
    ],
    ethiopianExamFocus: 'Implicit differentiation and optimization word problems appear heavily on nationwide freshman common course exams.',
    harvardEquivalent: 'Aligns with Harvard Math 1a (Calculus I)'
  },
  {
    id: 'ethio-cosc-1012',
    code: 'CoSc 1012',
    title: 'Computer Programming I (Structured Programming in C/C++)',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '1st Year',
    semester: 'Year 1 - Semester 2',
    creditHours: '4 Cr / 7 ECTS (with Lab)',
    category: 'Fundamentals',
    description: 'First formal programming course for Ethiopian CSE undergraduates. Focuses on procedural programming in C and C++: syntax, variables, operators, control structures, functions, arrays, strings, pointers, dynamic memory, structs, and file streams.',
    keyTopics: [
      'C/C++ Program Structure & Compilation Workflow',
      'Data Types, Variables, Modifiers, Constants & Operators',
      'Control Flow: if-else, nested conditionals, switch-case',
      'Loops: for, while, do-while, break, continue',
      'User-Defined Functions, Return Types, Pass-by-Value vs Pass-by-Reference',
      'Arrays (1D & 2D Arrays, String Manipulation)',
      'Pointers, Address-of Operator, Dereferencing & Pointer Arithmetic',
      'Dynamic Memory Allocation (malloc, calloc, realloc, free / new, delete)',
      'Structures (struct), Typedefs & Array of Structs',
      'File Handling (reading/writing formatted text and binary files)'
    ],
    practicalExercises: [
      'Student grading and GPA calculation system utilizing structs and arrays',
      'Dynamic 2D matrix multiplication with pointer dereferencing',
      'Persistent banking ledger application with file stream serialization'
    ],
    ethiopianExamFocus: 'Output tracing questions featuring pointer arithmetic, nested loops, and recursion are infamous on university exams across Ethiopia. Understanding pointer manipulation is essential.',
    harvardEquivalent: 'Directly mirrors Harvard CS50x Weeks 1-4 (C, Arrays, Algorithms, Memory)'
  },
  {
    id: 'ethio-math-1021',
    code: 'Math 1021',
    title: 'Discrete Mathematics and Combinatorics',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '1st Year',
    semester: 'Year 1 - Semester 2',
    creditHours: '3 Cr / 5 ECTS',
    category: 'Fundamentals',
    description: 'Mathematical structures underpinning theoretical computer science: propositional logic, predicate calculus, proof methods, mathematical induction, set theory, relations, functions, combinatorics, and graph theory basics.',
    keyTopics: [
      'Propositional Logic, Logical Equivalences & Truth Tables',
      'Predicates & Quantifiers (Universal, Existential)',
      'Methods of Proof (Direct, Indirect, Contradiction, Contrapositive)',
      'Mathematical Induction (Weak & Strong Induction)',
      'Set Theory, Power Sets, Cartesian Products, Venn Diagrams',
      'Relations (Reflexive, Symmetric, Transitive, Equivalence Relations)',
      'Functions (Injective, Surjective, Bijective, Inverses)',
      'Combinatorics (Permutations, Combinations, Pigeonhole Principle)',
      'Introduction to Graph Theory (Degrees, Paths, Cycles, Trees)'
    ],
    practicalExercises: [
      'Prove formula for sum of cubes using mathematical induction',
      'Verify whether relation R on integer set is an equivalence relation and determine partitions',
      'Calculate network routing configurations using Pigeonhole Principle and Combinatorics'
    ],
    ethiopianExamFocus: 'Induction proofs, equivalence relation verification, and Pigeonhole Principle problems appear on every Ethiopian university semester exam and form the core of the MoE Exit Exam discrete math domain.',
    harvardEquivalent: 'Aligns with Harvard CS 20 (Discrete Mathematics for Computer Science)'
  },
  {
    id: 'ethio-emte-1012',
    code: 'EmTe 1012',
    title: 'Emerging Technologies',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized Freshman Core)',
    recommendedYear: '1st Year',
    semester: 'Year 1 - Semester 2',
    creditHours: '3 Cr / 5 ECTS',
    category: 'Fundamentals',
    description: 'National freshman curriculum introduction to Industry 4.0: Artificial Intelligence, Internet of Things (IoT), Blockchain technology, Cybersecurity fundamentals, Cloud Computing, and Big Data analytics in the Ethiopian national development context.',
    keyTopics: [
      'Industry 4.0 & Digital Transformation in Ethiopia',
      'Artificial Intelligence & Machine Learning Paradigms',
      'Internet of Things (IoT) Architecture, Sensors & Smart Cities',
      'Blockchain Technology, Smart Contracts & Cryptocurrencies',
      'Cybersecurity Principles, Threats & Information Assurance',
      'Cloud Computing (IaaS, PaaS, SaaS) & Edge Computing',
      'Big Data Analytics (Volume, Velocity, Variety, Veracity, Value)'
    ],
    practicalExercises: [
      'Propose an IoT and sensor architecture for Ethiopian agricultural frost monitoring',
      'Analyze smart contract verification in Ethereum for land title registration',
      'Design cloud deployment architecture for public woreda administrative services'
    ],
    ethiopianExamFocus: 'Commonly tested through definition-heavy conceptual questions and Ethiopian socio-economic use cases in freshman exams.',
    harvardEquivalent: 'Complements Harvard CS50x Overview & Technology lectures'
  },

  // ==========================================
  // YEAR 2 - SOPHOMORE YEAR (Core Foundations)
  // ==========================================
  {
    id: 'ethio-cosc-2011',
    code: 'CoSc 2011',
    title: 'Object-Oriented Programming (OOP with Java & C++)',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '2nd Year',
    semester: 'Year 2 - Semester 1',
    creditHours: '4 Cr / 6 ECTS (with Lab)',
    category: 'Core CS',
    description: 'Comprehensive study of object-oriented paradigm. Encapsulation, abstraction, inheritance (single, multiple, multilevel), polymorphism (compile-time overloading, runtime overriding), abstract classes, interfaces, generic templates, and exception handling.',
    keyTopics: [
      'Object-Oriented Philosophy vs Procedural Paradigm',
      'Classes, Objects, Constructors (Default, Parameterized, Copy) & Destructors',
      'Encapsulation, Access Specifiers (private, protected, public)',
      'Inheritance Hierarchies & Virtual Base Classes in C++',
      'Polymorphism, Virtual Functions, Pure Virtual Functions & VTables',
      'Java Class Lifecycle, JVM, Garbage Collection & Classpath',
      'Interfaces, Abstract Classes & Multiple Inheritance via Interfaces',
      'Exception Handling (try, catch, throw, throws, finally)',
      'Generics & Collections Framework in Java (ArrayList, HashMap, HashSet)',
      'GUI Foundations (Java Swing / JavaFX) & Event Handling'
    ],
    practicalExercises: [
      'Design an Ethiopian Telebirr wallet payment system using polymorphism and interfaces',
      'Implement custom generic LinkedList and Stack template class in C++',
      'Build desktop hospital management GUI with Java Swing and custom exception classes'
    ],
    ethiopianExamFocus: 'Inheritance access specifiers tracing, constructor invocation ordering in multilevel inheritance, and pure virtual function implementations are heavily tested on 2nd-year semester exams.',
    harvardEquivalent: 'Aligns with Harvard CS50x (OOP modules) and advanced CS50P'
  },
  {
    id: 'ethio-cosc-2021',
    code: 'CoSc 2021',
    title: 'Digital Logic Design & Computer Architecture',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '2nd Year',
    semester: 'Year 2 - Semester 1',
    creditHours: '4 Cr / 7 ECTS (with Lab)',
    category: 'Systems & Architecture',
    description: 'Hardware foundations of computing systems. Boolean algebra minimization, Karnaugh maps (K-maps), combinational logic (adders, multiplexers, decoders), sequential logic (flip-flops, registers, counters), ALU design, and CPU instruction execution cycles.',
    keyTopics: [
      'Karnaugh Maps (K-Maps) 2, 3, 4, 5-variable minimization',
      'Combinational Circuits: Half Adder, Full Adder, Ripple Carry Adder, Subtractor',
      'Multiplexers (MUX), Demultiplexers (DEMUX), Encoders, Decoders',
      'Sequential Circuits: Latches (SR), Flip-Flops (D, JK, T, Master-Slave)',
      'State Diagrams, State Tables & Sequential Circuit Synthesis',
      'Registers (Shift Registers, PIPO, SIPO) and Synchronous/Asynchronous Counters',
      'Arithmetic Logic Unit (ALU) Architecture',
      'Instruction Cycle (Fetch, Decode, Execute, Store) & Bus Structures'
    ],
    practicalExercises: [
      'Simplify 4-variable logic expressions with K-Maps and implement in Logisim simulator',
      'Construct a 4-bit synchronous modulo-10 decade counter using JK flip-flops',
      'Design an 8-to-1 multiplexer using only 2-to-1 multiplexers'
    ],
    ethiopianExamFocus: 'K-Map simplification and designing sequential state machines with flip-flops are mandatory questions on university midterms and MoE exit exam systems cluster.',
    harvardEquivalent: 'Aligns with Harvard CS61 (Systems & Architecture) & CS50 Hardware'
  },
  {
    id: 'ethio-cosc-2031',
    code: 'CoSc 2031',
    title: 'Data Structures and Algorithms (DSA)',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '2nd Year',
    semester: 'Year 2 - Semester 1',
    creditHours: '4 Cr / 7 ECTS (with Lab)',
    category: 'Core CS',
    description: 'The single most vital course for computer science undergraduates. Asymptotic complexity analysis, abstract data types (stacks, queues, linked lists, hash tables, binary trees, heaps, graphs) and searching/sorting algorithms.',
    keyTopics: [
      'Asymptotic Notations (Big-O, Big-Theta, Big-Omega) & Time/Space Complexity',
      'Arrays & Dynamic Array Resizing',
      'Linked Lists: Singly Linked, Doubly Linked, Circular Linked Lists',
      'Stacks: Array/List implementation, Infix-to-Postfix conversion, Balanced Parentheses',
      'Queues: Linear Queue, Circular Queue, Double-Ended Queue (Deque), Priority Queue',
      'Trees: Binary Trees, Binary Search Trees (BST), Traversals (Inorder, Preorder, Postorder)',
      'Balanced Search Trees: AVL Trees (Rotations: LL, RR, LR, RL), Red-Black Trees',
      'Heaps & Priority Queues: Max Heap, Min Heap, HeapSort',
      'Hashing: Hash Functions, Direct Addressing, Collision Resolution (Chaining, Open Addressing)',
      'Sorting: InsertionSort, SelectionSort, MergeSort, QuickSort, RadixSort',
      'Graph Representations (Adjacency Matrix, Adjacency List) & Traversals (BFS, DFS)'
    ],
    practicalExercises: [
      'Implement an AVL tree with automatic rebalancing rotations in C++/Java',
      'Convert and evaluate complex infix arithmetic expressions using stack ADT',
      'Implement Dijkstra’s shortest path algorithm for Ethiopian highway networks'
    ],
    ethiopianExamFocus: 'AVL tree rotation step-by-step drawings, binary search tree deletion cases, QuickSort partitioning traces, and Big-O derivations make up over 40% of 2nd-year exam marks and are high-yield on the MoE Exit Exam.',
    harvardEquivalent: 'Direct equivalent to Harvard CS124 (Data Structures & Algorithms) & CS50x Weeks 3-5'
  },
  {
    id: 'ethio-stat-2011',
    code: 'Stat 2011',
    title: 'Probability and Statistics for Engineers',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '2nd Year',
    semester: 'Year 2 - Semester 1',
    creditHours: '3 Cr / 5 ECTS',
    category: 'Fundamentals',
    description: 'Probability models, random variables, probability density functions, statistical distributions, hypothesis testing, confidence intervals, regression, and variance analysis relevant to data analysis and computing systems.',
    keyTopics: [
      'Sample Spaces, Events, Conditional Probability & Bayes’ Theorem',
      'Discrete Random Variables (Bernoulli, Binomial, Poisson, Geometric)',
      'Continuous Random Variables (Uniform, Exponential, Normal / Gaussian)',
      'Expectation, Variance, Standard Deviation & Moments',
      'Joint Distributions, Covariance & Correlation Coefficient',
      'Central Limit Theorem & Sampling Distributions',
      'Statistical Hypothesis Testing (z-test, t-test, Chi-Square test)',
      'Linear Regression & Least Squares Estimation'
    ],
    practicalExercises: [
      'Calculate network packet drop rates using Poisson distribution models',
      'Apply Bayes’ Theorem to calculate spam filter email classifications',
      'Run t-test on benchmark latency measurements between two sorting algorithms'
    ],
    ethiopianExamFocus: 'Bayes’ Theorem calculations and Normal distribution probability lookups are regular exam fixtures.',
    harvardEquivalent: 'Aligns with Harvard Stat 110 (Introduction to Probability)'
  },
  {
    id: 'ethio-cosc-2042',
    code: 'CoSc 2042',
    title: 'Database Management Systems (DBMS & Relational SQL)',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '2nd Year',
    semester: 'Year 2 - Semester 2',
    creditHours: '4 Cr / 7 ECTS (with Lab)',
    category: 'Core CS',
    description: 'Relational data model, Entity-Relationship (ER) & Enhanced ER modeling, Relational Algebra, SQL DDL/DML, Functional Dependencies, Normalization (1NF, 2NF, 3NF, BCNF), indexing, and transaction management (ACID properties).',
    keyTopics: [
      'Database Architecture (ANSI-SPARC 3-schema architecture)',
      'Entity-Relationship (ER) Modeling: Entities, Attributes, Cardinalities, Keys',
      'Relational Model: Schemas, Tuples, Domains, Integrity Constraints (PK, FK, Unique)',
      'Relational Algebra: Select, Project, Join, Set Operations, Division',
      'SQL: DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE), DQL (SELECT, JOINs)',
      'Advanced SQL: Subqueries, Group By, Having, Aggregate Functions, Views, Triggers',
      'Functional Dependencies & Closure of Attribute Sets',
      'Database Normalization: 1NF, 2NF, 3NF, Boyce-Codd Normal Form (BCNF)',
      'Transaction Processing: ACID properties (Atomicity, Consistency, Isolation, Durability)',
      'Concurrency Control: Locks (Shared, Exclusive), 2-Phase Locking (2PL), Deadlocks'
    ],
    practicalExercises: [
      'Design ER diagram and normalize schema to 3NF for Ethiopian Commercial Bank banking core',
      'Write complex multi-table SQL queries with inner/outer joins, grouping, and subqueries',
      'Build stored procedures and audit triggers in PostgreSQL'
    ],
    ethiopianExamFocus: 'Functional dependency closures, decomposing tables into 3NF and BCNF, and writing complex SQL SELECT queries are 100% guaranteed on both university exams and the MoE Exit Exam DBMS cluster.',
    harvardEquivalent: 'Aligns with Harvard CS50x Week 7 (SQL) and CS50W Databases'
  },
  {
    id: 'ethio-cosc-2052',
    code: 'CoSc 2052',
    title: 'Computer Organization and Assembly Language',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '2nd Year',
    semester: 'Year 2 - Semester 2',
    creditHours: '3 Cr / 5 ECTS (with Lab)',
    category: 'Systems & Architecture',
    description: 'Internal organization of computer systems, memory hierarchy, cache memory mapping, I/O interfacing, bus protocols, assembly language programming (x86 or MIPS), instruction encoding, and addressing modes.',
    keyTopics: [
      'Von Neumann vs Harvard Computer Architectures',
      'CPU Internal Bus & Register Organization (Program Counter, Instruction Register, Accumulator)',
      'Instruction Set Architecture (ISA): RISC vs CISC principles',
      'Addressing Modes (Immediate, Direct, Indirect, Register, Indexed)',
      'Assembly Language Syntax, Directives, Labels & Instruction OpCodes',
      'Data Movement, Arithmetic & Logical Assembly Instructions',
      'Branching, Conditional Jumps & Implementing Loops in Assembly',
      'Stack Operations (PUSH, POP), Subroutines & Procedure Calling Conventions',
      'Memory Hierarchy & Cache Memory (Direct-Mapped, Set-Associative, Fully Associative)',
      'Interrupt Handling, DMA (Direct Memory Access) & I/O Mapped vs Memory Mapped I/O'
    ],
    practicalExercises: [
      'Write an assembly routine to reverse a string and calculate array median',
      'Simulate cache hit/miss rates on direct-mapped and 4-way set associative caches',
      'Implement recursive factorial subroutine in x86/MIPS assembly using stack frames'
    ],
    ethiopianExamFocus: 'Cache hit/miss address tag-index-offset calculations and tracing assembly branching code are standard exam problems.',
    harvardEquivalent: 'Directly mirrors Harvard CS61 (Machine Organization & x86 Assembly)'
  },
  {
    id: 'ethio-cosc-2062',
    code: 'CoSc 2062',
    title: 'Operating Systems (OS)',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '2nd Year',
    semester: 'Year 2 - Semester 2',
    creditHours: '4 Cr / 7 ECTS (with Lab)',
    category: 'Systems & Architecture',
    description: 'Fundamental principles of operating systems: process management, context switching, CPU scheduling algorithms, process synchronization (mutexes, semaphores, monitors), deadlocks, memory management (paging, segmentation, virtual memory), and file systems.',
    keyTopics: [
      'OS Architectures: Monolithic, Microkernel, Layered, Hybrid',
      'Process Concepts: Process Control Block (PCB), States, Context Switching',
      'Threads: User-Level vs Kernel-Level Threads, Multithreading Models',
      'CPU Scheduling Algorithms: FCFS, SJF (Preemptive/Non-preemptive), Priority, Round Robin (RR)',
      'Process Synchronization: Race Conditions, Critical Section Problem, Peterson’s Solution',
      'Semaphores (Counting, Binary), Mutexes, Producer-Consumer, Readers-Writers Problem',
      'Deadlocks: 4 Coffman Conditions, Resource Allocation Graphs, Banker’s Algorithm',
      'Memory Management: Contiguous Allocation, Fragmentation (Internal vs External)',
      'Paging, Page Tables, Translation Lookaside Buffer (TLB), Multi-level Paging',
      'Virtual Memory: Demand Paging, Page Faults, Page Replacement (FIFO, LRU, Optimal)',
      'File System Implementation, Directory Structures, Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN)'
    ],
    practicalExercises: [
      'Simulate Round Robin, FCFS and SJF scheduling algorithms to compute average turnaround and waiting times',
      'Implement multithreaded producer-consumer queue in C using POSIX semaphores and mutexes',
      'Run Banker’s Algorithm in C/Python to verify safe system state and grant resource requests'
    ],
    ethiopianExamFocus: 'Turnaround/waiting time calculation tables for CPU scheduling, Banker’s algorithm matrices, and LRU page fault calculations appear on 100% of Ethiopian university OS exams and the MoE Exit Exam.',
    harvardEquivalent: 'Aligns directly with Harvard CS61 (Systems & Kernels)'
  },
  {
    id: 'ethio-cosc-2072',
    code: 'CoSc 2072',
    title: 'Advanced Programming in Python & Go',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '2nd Year',
    semester: 'Year 2 - Semester 2',
    creditHours: '3 Cr / 5 ECTS (with Lab)',
    category: 'Fundamentals',
    description: 'Modern scripting, automation, concurrent programming, and API integration using Python and Go (Golang). Covers generators, decorators, asynchronous I/O, goroutines, channels, and building performant microservices.',
    keyTopics: [
      'Pythonic Idioms, List/Dict Comprehensions, Lambda Functions',
      'Generators, Iterators, and Decorators',
      'Asynchronous Programming (asyncio, Coroutines, Event Loop)',
      'Networking with Python (Sockets, Requests, HTTP Clients)',
      'Introduction to Go: Syntax, Types, Structs, and Interfaces',
      'Go Concurrency: Goroutines, Channels, Select Statements, WaitGroups',
      'Go Standard Library: net/http, encoding/json, sync package',
      'Building REST APIs with Go and Gin framework'
    ],
    practicalExercises: [
      'Build concurrent web scraper in Go utilizing worker pools and channels',
      'Write custom Python decorators for caching function results and performance timing',
      'Create high-throughput microservice in Go responding to JSON RPC calls'
    ],
    ethiopianExamFocus: 'Practical programming tests and lab exams evaluate code readability, concurrency mechanics, and error handling.',
    harvardEquivalent: 'Aligns with Harvard CS50P & modern backend modules'
  },

  // ==========================================
  // YEAR 3 - JUNIOR YEAR (Advanced Systems & Engineering)
  // ==========================================
  {
    id: 'ethio-cosc-3011',
    code: 'CoSc 3011',
    title: 'Design and Analysis of Algorithms',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '3rd Year',
    semester: 'Year 3 - Semester 1',
    creditHours: '3 Cr / 6 ECTS',
    category: 'Core CS',
    description: 'Advanced algorithm design paradigms: Divide and Conquer, Greedy Algorithms, Dynamic Programming, Backtracking, Branch and Bound, Graph Algorithms, String Matching, and Introduction to NP-Completeness.',
    keyTopics: [
      'Recurrence Relations & Solving Recurrences (Master Method, Recursion Tree, Substitution)',
      'Divide and Conquer: Strassen’s Matrix Multiplication, Closest Pair of Points',
      'Greedy Strategy: Activity Selection, Fractional Knapsack, Huffman Coding, Kruskal & Prim MST',
      'Dynamic Programming: 0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication, Bellman-Ford',
      'Backtracking: N-Queens Problem, Subset Sum, Graph Coloring',
      'Branch and Bound: Traveling Salesperson Problem (TSP)',
      'String Matching: Naive, Rabin-Karp, Knuth-Morris-Pratt (KMP) Algorithm',
      'Computational Complexity: Classes P, NP, NP-Complete, Polynomial-Time Reductions'
    ],
    practicalExercises: [
      'Solve Longest Common Subsequence problem with dynamic programming memoization table',
      'Implement Huffman encoding tree to compress Amharic text documents',
      'Write KMP string search algorithm with computed prefix failure function'
    ],
    ethiopianExamFocus: 'Solving recurrences using the Master Theorem, drawing DP tables (0/1 Knapsack & LCS), and tracing Huffman coding trees are guaranteed high-mark exam questions.',
    harvardEquivalent: 'Directly mirrors Harvard CS124 (Algorithms)'
  },
  {
    id: 'ethio-cosc-3021',
    code: 'CoSc 3021',
    title: 'Computer Networks and Data Communication',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '3rd Year',
    semester: 'Year 3 - Semester 1',
    creditHours: '4 Cr / 7 ECTS (with Lab)',
    category: 'Systems & Architecture',
    description: 'Architectures and protocols of computer networks. OSI 7-Layer and TCP/IP 4-Layer models, data link framing and error detection (CRC), MAC protocols, IPv4/IPv6 addressing, VLSM subnetting, routing protocols (RIP, OSPF, BGP), TCP/UDP transport, and DNS/HTTP application protocols.',
    keyTopics: [
      'OSI 7-Layer Reference Model vs TCP/IP Protocol Suite',
      'Physical Layer: Transmission Media, Multiplexing (TDM, FDM), Modulation',
      'Data Link Layer: Framing, Flow Control (Stop-and-Wait, Sliding Window), Error Detection (Parity, Checksum, CRC)',
      'Medium Access Control (MAC): ALOHA, CSMA/CD, CSMA/CA, Ethernet Standards (IEEE 802.3)',
      'Network Layer: IPv4 Addressing, Classful Addressing, Classless Inter-Domain Routing (CIDR)',
      'Variable Length Subnet Masking (VLSM) & Route Summarization',
      'Routing Algorithms: Distance-Vector (Bellman-Ford, RIP), Link-State (Dijkstra, OSPF), BGP',
      'Transport Layer: UDP vs TCP, TCP 3-Way Handshake, TCP Flow Control & Congestion Control (Slow Start)',
      'Application Layer Protocols: DNS, DHCP, HTTP/1.1 vs HTTP/2, FTP, SMTP, SSH'
    ],
    practicalExercises: [
      'Subnet a Class B / C network block using VLSM for an Ethiopian university multi-campus layout',
      'Capture and inspect TCP 3-way handshakes and DNS queries using Wireshark',
      'Configure Cisco routers with OSPF routing and NAT in Cisco Packet Tracer'
    ],
    ethiopianExamFocus: 'Subnetting calculations (finding network ID, broadcast address, valid host range, custom subnet mask) and CRC polynomial division are tested on every semester exam and nationwide MoE Exit Exam.',
    harvardEquivalent: 'Aligns with Harvard CS61 (Networking) and internet protocol foundations'
  },
  {
    id: 'ethio-cosc-3031',
    code: 'CoSc 3031',
    title: 'Object-Oriented Software Engineering (OOSE)',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '3rd Year',
    semester: 'Year 3 - Semester 1',
    creditHours: '3 Cr / 5 ECTS',
    category: 'Software Engineering',
    description: 'Methodologies, processes, and tools for engineering large-scale reliable software. Software Development Life Cycle (SDLC) models, Agile, Scrum, Requirements Engineering, UML 2.0 modeling, software architecture, design patterns, testing techniques, and software quality assurance.',
    keyTopics: [
      'Software Engineering Fundamentals & Software Crises',
      'SDLC Models: Waterfall, Prototyping, Spiral, Rational Unified Process (RUP)',
      'Agile Methodologies: Scrum (Sprints, Product Backlog, Daily Standup), Kanban, Extreme Programming',
      'Requirements Engineering: Functional vs Non-Functional Requirements, User Stories, SRS (IEEE 830)',
      'UML Structural Diagrams: Class Diagrams (Associations, Multiplicities, Composition, Aggregation)',
      'UML Behavioral Diagrams: Use Case Diagrams, Sequence Diagrams, Activity Diagrams, State Machine Diagrams',
      'Software Design Patterns: Creational (Singleton, Factory), Structural (Adapter, Facade), Behavioral (Observer, Strategy)',
      'Software Testing: White-Box (Basis Path, Cyclomatic Complexity), Black-Box (Equivalence Partitioning, BVA)',
      'Software Metrics & Maintenance (Coupling, Cohesion, Code Smells)'
    ],
    practicalExercises: [
      'Author formal Software Requirements Specification (SRS) for Ethiopian National Digital ID integration',
      'Draw comprehensive UML Class and Sequence Diagrams for e-commerce shopping checkout',
      'Calculate Cyclomatic Complexity V(G) from flow graph and write basis path test cases'
    ],
    ethiopianExamFocus: 'Drawing UML Use Case & Sequence diagrams, calculating Cyclomatic Complexity, and distinguishing Agile Scrum roles are tested on university exams and the MoE exit exam software engineering domain.',
    harvardEquivalent: 'Aligns with Harvard CS50W & software development methodologies'
  },
  {
    id: 'ethio-cosc-3041',
    code: 'CoSc 3041',
    title: 'Web Programming and Internet Applications',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '3rd Year',
    semester: 'Year 3 - Semester 1',
    creditHours: '3 Cr / 5 ECTS (with Lab)',
    category: 'Software Engineering',
    description: 'Frontend and backend web technologies. HTML5 semantic elements, CSS3 layouts (Flexbox, Grid), JavaScript DOM scripting, asynchronous AJAX/Fetch, Node.js / PHP server development, RESTful APIs, session management, and web application security.',
    keyTopics: [
      'Web Architecture: Client-Server, HTTP Request/Response Cycle, RESTful Constraints',
      'Semantic HTML5 & Accessible Markup',
      'CSS3 Styling, Responsive Design, CSS Flexbox & Grid Systems',
      'Client-Side JavaScript: DOM Selection, Event Handling, Closures, Promises, Async/Await',
      'AJAX & Asynchronous Data Fetching with Fetch API',
      'Server-Side Development: PHP / Node.js Express framework',
      'Session Management: Cookies, Sessions, JWT (JSON Web Tokens)',
      'Database Integration (PHP PDO / Mongoose / PostgreSQL)',
      'Web Security Fundamentals: Cross-Site Scripting (XSS), SQL Injection, CSRF protection'
    ],
    practicalExercises: [
      'Build responsive responsive student result portal with HTML, CSS Grid, and vanilla JS',
      'Develop REST API with Express.js supporting CRUD operations with JWT authentication',
      'Implement real-time interactive chat or noticeboard using WebSockets'
    ],
    ethiopianExamFocus: 'Writing PHP/Node database connectivity scripts and explaining HTTP methods/status codes are regular exam components.',
    harvardEquivalent: 'Direct equivalent to Harvard CS50W (Web Programming with Python and JavaScript)'
  },
  {
    id: 'ethio-cosc-3051',
    code: 'CoSc 3051',
    title: 'Formal Language Theory and Automata',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '3rd Year',
    semester: 'Year 3 - Semester 1',
    creditHours: '3 Cr / 5 ECTS',
    category: 'Core CS',
    description: 'Theoretical computational models: alphabets, strings, languages, Deterministic Finite Automata (DFA), Non-deterministic Finite Automata (NFA), Regular Expressions, Pumping Lemma for Regular Languages, Context-Free Grammars (CFG), Pushdown Automata (PDA), Turing Machines, and the Chomsky Hierarchy.',
    keyTopics: [
      'Formal Mathematical Concepts: Alphabets, Strings, Languages, Operations on Languages',
      'Deterministic Finite Automata (DFA): Transition Tables, State Diagrams, Formal Definition',
      'Non-Deterministic Finite Automata (NFA) & NFA with Epsilon Transitions',
      'Equivalence of DFA and NFA: Subset Construction Algorithm',
      'Regular Expressions & Conversion between Regex and Finite Automata',
      'Minimization of DFAs (Table-Filling Algorithm)',
      'Pumping Lemma for Regular Languages & Proving Non-Regularity',
      'Context-Free Grammars (CFG), Derivations (Leftmost, Rightmost), Parse Trees, Ambiguity',
      'Chomsky Normal Form (CNF) & Greibach Normal Form (GNF)',
      'Pushdown Automata (PDA): Acceptance by Final State vs Empty Stack',
      'Turing Machines (TM): Formal Definition, Computable Functions, Halting Problem',
      'Chomsky Hierarchy of Languages (Type 0, Type 1, Type 2, Type 3)'
    ],
    practicalExercises: [
      'Convert NFA with epsilon transitions into an equivalent minimized DFA',
      'Prove that language L = {a^n b^n | n >= 0} is not regular using the Pumping Lemma',
      'Eliminate left recursion and construct Chomsky Normal Form for context-free grammar'
    ],
    ethiopianExamFocus: 'Designing DFAs for specific string conditions, converting NFA to DFA via subset construction, and applying the Pumping Lemma are the most standard exam questions on Ethiopian university tests.',
    harvardEquivalent: 'Directly equivalent to Harvard CS 121 (Theory of Computation)'
  },
  {
    id: 'ethio-cosc-3062',
    code: 'CoSc 3062',
    title: 'Advanced Database Systems',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '3rd Year',
    semester: 'Year 3 - Semester 2',
    creditHours: '3 Cr / 5 ECTS (with Lab)',
    category: 'Core CS',
    description: 'Beyond relational fundamentals: Query processing and optimization, B-Tree and B+ Tree indexing, distributed databases, concurrency algorithms, recovery systems, NoSQL architectures (Document, Key-Value, Columnar, Graph), and data warehousing.',
    keyTopics: [
      'Physical Database Design, Storage Structures & Buffer Management',
      'Indexing Structures: Dense/Sparse Indexes, B-Trees & B+ Trees (Insertion, Deletion, Search)',
      'Query Processing & Query Optimization: Relational Algebra Equivalence, Cost Estimation, Heuristics',
      'Transaction Recovery Techniques: Log-Based Recovery (WAL), Checkpointing, Shadow Paging',
      'Distributed Databases: Fragmentation (Horizontal, Vertical, Mixed), Replication, 2-Phase Commit (2PC)',
      'NoSQL Databases: CAP Theorem, BASE properties, Document Stores (MongoDB), Key-Value (Redis)',
      'Data Warehousing, ETL Processes, Star & Snowflake Schemas, OLAP vs OLTP'
    ],
    practicalExercises: [
      'Draw step-by-step B+ Tree insertions and split operations for arbitrary key sequences',
      'Construct heuristic query optimization trees to minimize intermediate relation sizes',
      'Set up MongoDB replica set with sharding for distributed document storage'
    ],
    ethiopianExamFocus: 'B+ Tree insertion splits and 2-Phase Commit (2PC) sequence protocol are prominent exam topics.',
    harvardEquivalent: 'Aligns with advanced database modules in Harvard CS50W & distributed systems'
  },
  {
    id: 'ethio-cosc-3072',
    code: 'CoSc 3072',
    title: 'Mobile Application Development',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '3rd Year',
    semester: 'Year 3 - Semester 2',
    creditHours: '3 Cr / 5 ECTS (with Lab)',
    category: 'Software Engineering',
    description: 'Design and implementation of mobile applications for smartphones and tablets. Android SDK architecture, activities, fragments, intents, mobile UI design, local storage (SQLite/Room), background services, REST API consumption, and cross-platform Flutter/React Native.',
    keyTopics: [
      'Mobile Ecosystems & Constraints (Battery, CPU, Screen Dimensions, Offline connectivity)',
      'Android Architecture: Linux Kernel, HAL, ART/Dalvik, Application Framework',
      'Activity Lifecycle (onCreate, onStart, onResume, onPause, onStop, onDestroy)',
      'Intents (Explicit vs Implicit) & Intent Filters',
      'Mobile UI Design: Layouts (ConstraintLayout, LinearLayout), Views, Adapters, RecyclerView',
      'Fragments & Navigation Components',
      'Data Persistence on Mobile: SharedPreferences, SQLite, Room Database',
      'Asynchronous Networking on Mobile: Retrofit / HTTP, Background Workers',
      'Introduction to Cross-Platform Development with Flutter (Dart, Widgets, State)'
    ],
    practicalExercises: [
      'Create an Android emergency hotline directory with SQLite and search filtering',
      'Build a Flutter mobile weather app consuming RESTful API with offline caching',
      'Implement multi-screen navigation flow with passing intent extras and camera capture'
    ],
    ethiopianExamFocus: 'Activity lifecycle diagram transitions and explaining SQLite/Room database setup are common exam items.',
    harvardEquivalent: 'Aligns with Harvard CS50 Mobile / CS50W mobile design patterns'
  },
  {
    id: 'ethio-cosc-3082',
    code: 'CoSc 3082',
    title: 'Compiler Design and Implementation',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '3rd Year',
    semester: 'Year 3 - Semester 2',
    creditHours: '3 Cr / 5 ECTS (with Lab)',
    category: 'Core CS',
    description: 'Structure and phases of a compiler: lexical analysis (scanning, Lex/Flex), syntax analysis (LL and LR parsing, Yacc/Bison), semantic analysis, syntax-directed translation, symbol tables, intermediate code generation (three-address code), code optimization, and target machine code generation.',
    keyTopics: [
      'Compiler Architecture: Front-End (Analysis) vs Back-End (Synthesis) Phases',
      'Lexical Analysis: Tokens, Patterns, Lexemes, Regular Expressions to DFA, Lex/Flex',
      'Syntax Analysis: Context-Free Grammars, First and Follow Sets computation',
      'Top-Down Parsing: Recursive Descent Parsing, LL(1) Parsing Tables & Conflicts',
      'Bottom-Up Parsing: Shift-Reduce Parsing, LR(0), SLR(1), LR(1), LALR(1) Parsing Tables',
      'Syntax-Directed Translation (SDT): Synthesized vs Inherited Attributes, Annotated Parse Trees',
      'Symbol Table Management: Hash Tables, Scope Resolution, Type Checking',
      'Intermediate Code Generation: Three-Address Code (TAC), Quadruples, Triples',
      'Code Optimization: Common Subexpression Elimination, Dead Code Elimination, Loop Invariant Motion',
      'Code Generation: Register Allocation, Basic Blocks and Flow Graphs'
    ],
    practicalExercises: [
      'Compute FIRST and FOLLOW sets for given programming grammar and construct LL(1) parse table',
      'Generate canonical collection of LR(0) items and build SLR(1) parsing table',
      'Write Lex/Yacc specification to parse and evaluate mathematical expressions'
    ],
    ethiopianExamFocus: 'Computing FIRST and FOLLOW sets, building LL(1) or SLR(1) tables, and translating expressions into Three-Address Code (TAC) are guaranteed high-weight exam questions.',
    harvardEquivalent: 'Aligns with Harvard CS 153 (Compilers) and CS 152 (Programming Languages)'
  },
  {
    id: 'ethio-cosc-3092',
    code: 'CoSc 3092',
    title: 'System and Network Administration',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '3rd Year',
    semester: 'Year 3 - Semester 2',
    creditHours: '3 Cr / 5 ECTS (with Lab)',
    category: 'Systems & Architecture',
    description: 'Practical administration of Linux/Unix and Windows servers in enterprise environments. User and group management, permissions, file systems, DNS/DHCP server configuration, Web servers (Apache/Nginx), mail servers, SSH security, firewall policies (iptables, UFW), and backup strategies.',
    keyTopics: [
      'Role & Responsibilities of a Systems Administrator in Ethiopian Organizations',
      'Linux Server Administration: Bash Shell Scripting, Cron Automation, Systemd Services',
      'User, Group & File Permissions (chmod, chown, SUID, SGID, Sticky Bit)',
      'Disk Management: Partitioning (fdisk, parted), LVM (Logical Volume Management), RAID levels',
      'Network Service Configuration: DHCP Server setup, DNS (BIND) Zones & Records',
      'Web Server Administration: Apache HTTPD, Nginx Virtual Hosts & Reverse Proxying',
      'Secure Remote Access: OpenSSH Key Authentication, Port Forwarding, Fail2Ban',
      'Network Security Administration: Netfilter / iptables, UFW, Network Address Translation (NAT)',
      'Backup, Disaster Recovery, System Monitoring (Nagios, Prometheus, htop, logrotate)'
    ],
    practicalExercises: [
      'Configure an authoritative BIND DNS server for university intranet domain',
      'Set up an Nginx reverse proxy with SSL certificate and rate-limiting rules',
      'Write automated Bash backup script with rsync, cron scheduling, and email alerts'
    ],
    ethiopianExamFocus: 'Linux file permission octal calculations, RAID level comparisons, and DNS record type questions frequently appear on university tests.',
    harvardEquivalent: 'Aligns with practical systems modules in Harvard CS61 and IT operations'
  },
  {
    id: 'ethio-cosc-3102',
    code: 'CoSc 3102',
    title: 'Artificial Intelligence (AI)',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '3rd Year',
    semester: 'Year 3 - Semester 2',
    creditHours: '3 Cr / 5 ECTS',
    category: 'Advanced & AI',
    description: 'Foundations of intelligent agents: search algorithms (uninformed & heuristic), adversarial search, constraint satisfaction, propositional and first-order logic, knowledge representation, expert systems, and probabilistic reasoning.',
    keyTopics: [
      'Intelligent Agents: PEAS description (Performance, Environment, Actuators, Sensors)',
      'Uninformed Search: Breadth-First Search (BFS), Depth-First Search (DFS), Uniform Cost Search',
      'Informed (Heuristic) Search: Greedy Best-First Search, A* Search, Admissible & Consistent Heuristics',
      'Adversarial Search: Game Playing, Minimax Algorithm, Alpha-Beta Pruning',
      'Constraint Satisfaction Problems (CSP): Backtracking Search, Forward Checking, Arc Consistency (AC-3)',
      'Knowledge Representation: Propositional Logic, Resolution Inference, First-Order Logic (FOL)',
      'Expert Systems: Forward Chaining vs Backward Chaining inference engines',
      'Uncertainty & Probabilistic Reasoning: Bayesian Networks, Conditional Independence'
    ],
    practicalExercises: [
      'Simulate A* search algorithm on Romanian/Ethiopian road map to find shortest path',
      'Trace Alpha-Beta pruning on game tree to eliminate redundant node evaluations',
      'Implement forward chaining diagnostic inference engine in Python for medical symptom checking'
    ],
    ethiopianExamFocus: 'A* search step-by-step heuristic evaluations, tracing Minimax with Alpha-Beta pruning, and converting English sentences into First-Order Logic (FOL) are regular exam features.',
    harvardEquivalent: 'Directly mirrors Harvard CS50AI (Introduction to AI with Python)'
  },

  // ==========================================
  // YEAR 4 - SENIOR YEAR (Specialization & Capstone)
  // ==========================================
  {
    id: 'ethio-cosc-4011',
    code: 'CoSc 4011',
    title: 'Machine Learning and Data Science',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '4th Year',
    semester: 'Year 4 - Semester 1',
    creditHours: '3 Cr / 6 ECTS (with Lab)',
    category: 'Advanced & AI',
    description: 'Supervised and unsupervised learning algorithms: Linear regression, Logistic regression, Decision Trees, Random Forests, Support Vector Machines (SVM), k-Nearest Neighbors (k-NN), k-Means clustering, PCA, Neural Networks, and deep learning basics.',
    keyTopics: [
      'Data Preprocessing: Handling Missing Values, Scaling, Normalization, One-Hot Encoding',
      'Supervised Learning: Linear Regression, Cost Function, Gradient Descent Optimization',
      'Classification: Logistic Regression, Decision Boundaries, Multiclass Classification',
      'Decision Trees & Ensemble Methods: Information Gain, Entropy, Gini Index, Random Forests',
      'Support Vector Machines (SVM): Hyperplanes, Margin Maximization, Kernel Trick',
      'Model Evaluation: Confusion Matrix, Accuracy, Precision, Recall, F1-Score, ROC-AUC curve',
      'Unsupervised Learning: k-Means Clustering, Elbow Method, Principal Component Analysis (PCA)',
      'Artificial Neural Networks: Perceptron, Multilayer Perceptron (MLP), Activation Functions, Backpropagation',
      'Deep Learning & NLP Intro: Convolutional Neural Networks (CNNs), Word2Vec, LLM concepts'
    ],
    practicalExercises: [
      'Train customer churn prediction classifier using scikit-learn and evaluate F1-score',
      'Implement Gradient Descent algorithm from scratch in Python for multivariate regression',
      'Build convolutional neural network to classify handwritten Ethiopic Ge’ez digits'
    ],
    ethiopianExamFocus: 'Calculating Entropy and Information Gain for Decision Tree splits and computing confusion matrix metrics (precision/recall) are guaranteed exam problems.',
    harvardEquivalent: 'Direct equivalent to Harvard CS181 (Machine Learning) & CS50AI Machine Learning modules'
  },
  {
    id: 'ethio-cosc-4021',
    code: 'CoSc 4021',
    title: 'Distributed Systems and Cloud Computing',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '4th Year',
    semester: 'Year 4 - Semester 1',
    creditHours: '3 Cr / 6 ECTS',
    category: 'Systems & Architecture',
    description: 'Principles and architectures of distributed systems: Remote Procedure Calls (RPC), communication, logical clocks (Lamport, Vector), distributed mutual exclusion, consensus algorithms (Paxos, Raft), fault tolerance, CAP theorem, Docker containerization, and cloud infrastructure.',
    keyTopics: [
      'Characteristics & Goals of Distributed Systems (Resource Sharing, Openness, Scalability)',
      'Distributed Architectures: Client-Server, Peer-to-Peer, Microservices, Event-Driven',
      'Interprocess Communication: RPC (Remote Procedure Calls), RMI, Message-Oriented Middleware',
      'Synchronization in Distributed Systems: Physical Clocks (NTP), Lamport Logical Clocks, Vector Clocks',
      'Distributed Mutual Exclusion: Centralized, Ricart-Agrawala, Token Ring Algorithms',
      'Election Algorithms: Bully Algorithm, Ring Algorithm',
      'Consensus & Fault Tolerance: Byzantine Generals Problem, Raft Consensus Protocol',
      'CAP Theorem (Consistency, Availability, Partition Tolerance) & PACELC',
      'Cloud Computing Models: IaaS, PaaS, SaaS, Public/Private/Hybrid Cloud',
      'Containerization: Docker, Dockerfile, Container Networking, Kubernetes basics'
    ],
    practicalExercises: [
      'Simulate the Bully Leader Election algorithm in Python with node failure detection',
      'Calculate Lamport logical timestamps for concurrent events across 3 processes',
      'Containerize a multi-service web application using Docker Compose with Redis and PostgreSQL'
    ],
    ethiopianExamFocus: 'Lamport clock timeline calculations, Bully election message exchanges, and CAP theorem trade-off scenarios appear on exams.',
    harvardEquivalent: 'Aligns with Harvard CS205 (HPC & Systems) & distributed systems'
  },
  {
    id: 'ethio-cosc-4031',
    code: 'CoSc 4031',
    title: 'Information Assurance, Cryptography and Cybersecurity',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '4th Year',
    semester: 'Year 4 - Semester 1',
    creditHours: '3 Cr / 5 ECTS',
    category: 'Software Engineering',
    description: 'Protecting information systems and critical assets. Symmetric encryption (DES, AES), asymmetric encryption (RSA, Diffie-Hellman), cryptographic hash functions (SHA-256), digital signatures, Public Key Infrastructure (PKI), OWASP web vulnerabilities, and network security defenses.',
    keyTopics: [
      'Security Goals (CIA Triad: Confidentiality, Integrity, Availability)',
      'Classical Cryptography: Substitution & Transposition Ciphers, Caesar, Vigenère',
      'Symmetric Key Cryptography: Feistel Ciphers, DES, AES (Rounds, SubBytes, ShiftRows, MixColumns)',
      'Block Cipher Modes: ECB, CBC, CFB, OFB, CTR',
      'Asymmetric Cryptography: Number Theory, Modular Arithmetic, Euler’s Totient Function, RSA Algorithm',
      'Key Exchange: Diffie-Hellman Key Exchange Protocol & Man-in-the-Middle Attacks',
      'Cryptographic Hash Functions: Properties of Hashes, MD5, SHA-256, HMAC',
      'Digital Signatures, Digital Certificates (X.509) & Public Key Infrastructure (PKI)',
      'Web & Application Vulnerabilities: OWASP Top 10 (SQLi, XSS, CSRF, Broken Auth)',
      'Network Security: Firewalls, Intrusion Detection Systems (IDS/IPS), Denial of Service (DoS/DDoS)'
    ],
    practicalExercises: [
      'Compute RSA encryption and decryption manually for given prime numbers p, q, and public exponent e',
      'Perform Diffie-Hellman secret key exchange calculation with primitive roots',
      'Audit sample web server against SQL injection and remediate with parameterized queries'
    ],
    ethiopianExamFocus: 'RSA encryption/decryption numerical steps, Diffie-Hellman calculations, and AES block cipher modes are guaranteed high-mark exam questions on both university finals and the MoE Exit Exam.',
    harvardEquivalent: 'Directly mirrors Harvard CS50S (Cybersecurity)'
  },
  {
    id: 'ethio-cosc-4041',
    code: 'CoSc 4041',
    title: 'Software Architecture, Quality Assurance and Testing',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '4th Year',
    semester: 'Year 4 - Semester 1',
    creditHours: '3 Cr / 5 ECTS',
    category: 'Software Engineering',
    description: 'High-level software architectural styles (Layered, Microservices, Event-Driven, Hexagonal), software quality models (ISO/IEC 25010), formal software verification, test-driven development (TDD), automated integration testing, and CI/CD automation.',
    keyTopics: [
      'Software Architecture vs Detailed Design',
      'Architectural Styles: Monolithic, Layered (N-Tier), Microservices, Event-Driven, MVC, Clean Architecture',
      'Architecture Trade-Off Analysis Method (ATAM)',
      'Software Quality Models: ISO/IEC 25010 Quality in Use and Product Quality Characteristics',
      'Verification vs Validation, Code Reviews & Static Code Analysis',
      'Test Levels: Unit Testing, Integration Testing, System Testing, Acceptance Testing (UAT)',
      'Test Automation: Test-Driven Development (TDD) cycle (Red-Green-Refactor)',
      'Continuous Integration & Continuous Delivery (CI/CD) Pipelines (GitHub Actions, Jenkins)'
    ],
    practicalExercises: [
      'Architect a resilient microservice system for an Ethiopian government portal using Event-Driven patterns',
      'Write comprehensive unit tests following TDD principles with Jest / JUnit',
      'Configure automated CI/CD pipeline on GitHub to run linters, build checks, and test suites'
    ],
    ethiopianExamFocus: 'Architectural style trade-offs and ISO quality characteristics are regular exam fixtures.',
    harvardEquivalent: 'Complements Harvard CS50W & modern software engineering'
  },
  {
    id: 'ethio-cosc-4051',
    code: 'CoSc 4051',
    title: 'CSE Capstone Senior Project I',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '4th Year',
    semester: 'Year 4 - Semester 1',
    creditHours: '3 Cr / 6 ECTS',
    category: 'Software Engineering',
    description: 'First phase of the mandatory undergraduate senior engineering thesis. Students form teams, identify a significant real-world engineering or societal problem in Ethiopia, perform literature reviews, formulate requirement specifications (SRS), design architectural blueprints, and deliver oral proposal defenses.',
    keyTopics: [
      'Problem Identification & Feasibility Study (Technical, Operational, Economic)',
      'Literature Review & Comparative Analysis of Existing Solutions',
      'Stakeholder Interviews & Requirements Elicitation',
      'Authoring Comprehensive IEEE-Standard Software Requirements Specification (SRS)',
      'Architectural & Detailed Design Documentation (UML, Database ERD, Data Flow Diagrams)',
      'UI/UX Prototyping & Wireframing (Figma)',
      'Oral Proposal Defense before University Faculty Examination Panel'
    ],
    practicalExercises: [
      'Formulate proposal for automated crop disease detection system for Ethiopian agriculture',
      'Design complete database schema and interactive Figma prototype for capstone idea',
      'Deliver 15-minute formal presentation and defend design decisions before academic jury'
    ],
    ethiopianExamFocus: 'Graded by department academic committee based on proposal quality, SRS completeness, and defense presentation.',
    harvardEquivalent: 'Equivalent to Harvard SEAS Senior Design Project / CS50 Final Project'
  },
  {
    id: 'ethio-cosc-4062',
    code: 'CoSc 4062',
    title: 'Microprocessors and Embedded Systems',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '4th Year',
    semester: 'Year 4 - Semester 2',
    creditHours: '3 Cr / 5 ECTS (with Lab)',
    category: 'Systems & Architecture',
    description: 'Microcontroller hardware architecture, pin configurations, register manipulation, hardware timers, interrupt service routines (ISR), Analog-to-Digital Converters (ADC), serial communication protocols (UART, SPI, I2C), and IoT sensor interfacing with Arduino and STM32.',
    keyTopics: [
      'Microprocessor vs Microcontroller Architectures (Von Neumann vs Harvard)',
      'Microcontroller Architectures (ATmega328P, ARM Cortex-M)',
      'GPIO (General Purpose Input/Output) Programming & Bitwise Register Operations',
      'Hardware Timers, Counters & Pulse Width Modulation (PWM)',
      'Interrupts: External Hardware Interrupts, Timer Interrupts, Interrupt Service Routines (ISRs)',
      'Analog-to-Digital Conversion (ADC) & Sensor Interfacing (Temperature, Humidity, Ultrasonic)',
      'Serial Communication Protocols: UART, SPI, I2C bus wiring and protocol packet structure',
      'Embedded C Programming, Memory Constraints, and Power Management',
      'Internet of Things (IoT) Node Integration with ESP32 / Wi-Fi modules'
    ],
    practicalExercises: [
      'Interface temperature sensor with Arduino and transmit readings over I2C to LCD display',
      'Write embedded C timer interrupt routine to generate precise PWM motor speed control',
      'Build an automated IoT plant irrigation controller with soil moisture sensor and relay switch'
    ],
    ethiopianExamFocus: 'Calculating timer prescaler values for specific interrupt frequencies and drawing I2C / SPI timing diagrams are typical exam questions.',
    harvardEquivalent: 'Aligns with Harvard SEAS Embedded Systems & hardware interfacing'
  },
  {
    id: 'ethio-cosc-4072',
    code: 'CoSc 4072',
    title: 'Human-Computer Interaction (HCI & UI/UX Design)',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '4th Year',
    semester: 'Year 4 - Semester 2',
    creditHours: '3 Cr / 5 ECTS',
    category: 'Software Engineering',
    description: 'Principles of user-centered design, cognitive psychology, mental models, Nielsen’s 10 usability heuristics, interaction paradigms, wireframing, high-fidelity prototyping, accessibility standards (WCAG), and empirical usability testing methods.',
    keyTopics: [
      'Foundations of HCI: Human Perception, Memory, Motor Skills, Mental Models',
      'User-Centered Design (UCD) Process & Design Thinking (Empathize, Define, Ideate, Prototype, Test)',
      'Nielsen’s 10 Usability Heuristics for User Interface Design',
      'Information Architecture, Navigation Patterns, and Visual Hierarchy',
      'Accessibility Standards: WCAG 2.1 Guidelines (Perceivable, Operable, Understandable, Robust)',
      'Prototyping Fidelity: Paper Prototypes, Wireframes, Interactive Prototypes in Figma',
      'Usability Evaluation Methods: Heuristic Evaluation, Cognitive Walkthrough, A/B Testing, System Usability Scale (SUS)'
    ],
    practicalExercises: [
      'Conduct formal heuristic evaluation of an Ethiopian mobile banking application (e.g. Telebirr, CBE Birr)',
      'Design accessible bilingual (Amharic & English) mobile user interface in Figma',
      'Calculate System Usability Scale (SUS) score from user test survey data'
    ],
    ethiopianExamFocus: 'Applying Nielsen’s heuristics to identify UI defects and outlining user testing methodologies are regular exam questions.',
    harvardEquivalent: 'Aligns with Harvard CS 179 (Design of Useful and Usable Interactive Systems) & CS 171'
  },
  {
    id: 'ethio-cosc-4082',
    code: 'CoSc 4082',
    title: 'Industrial Internship / Practical Attachment',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '4th Year',
    semester: 'Year 4 - Semester 2',
    creditHours: '4 Cr / 8 ECTS',
    category: 'Software Engineering',
    description: 'Mandatory professional practicum in the Ethiopian tech industry, government agencies (e.g., INSA, Ethio Telecom, Artificial Intelligence Institute), financial institutions, or technology startups. Students gain real-world engineering experience, workplace ethics, and professional collaboration.',
    keyTopics: [
      'Professional Workplace Ethics & Engineering Conduct',
      'Industrial Software Development Environments & Agile Standups',
      'Enterprise Tooling: JIRA, GitLab/GitHub Enterprise, Docker, CI/CD',
      'Client Collaboration, Technical Documentation & Problem Solving',
      'Internship Logbook Maintenance & Supervisor Evaluations',
      'Final Industrial Practicum Report Preparation and Public Defense'
    ],
    practicalExercises: [
      'Maintain weekly engineering activity log verified by enterprise industry supervisor',
      'Contribute production pull requests to commercial company codebase',
      'Compile comprehensive internship thesis analyzing business impact and technical challenges'
    ],
    ethiopianExamFocus: 'Evaluated by university faculty jury and company mentor based on project logbook, technical output, and final defense.',
    harvardEquivalent: 'Equivalent to Harvard SEAS Industry Practicum / Cooperative Experience'
  },
  {
    id: 'ethio-cosc-4092',
    code: 'CoSc 4092',
    title: 'CSE Capstone Senior Project II',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '4th Year',
    semester: 'Year 4 - Semester 2',
    creditHours: '4 Cr / 8 ECTS',
    category: 'Software Engineering',
    description: 'Final execution and implementation phase of the senior engineering capstone. Complete software construction, rigorous testing (unit, integration, user acceptance), deployment, comprehensive documentation, and public defense before the external examination board.',
    keyTopics: [
      'Full Software Implementation & Source Code Management',
      'Database Schema Migration & Seed Data Preparation',
      'API Integration, Third-Party SDKs & Payment Gateway Hookup',
      'Comprehensive Testing & Bug Remediation (Unit, Security, Performance)',
      'Production Deployment (Cloud hosting, Docker, Domain & SSL configuration)',
      'Final Capstone Thesis Writing (Chapters 1-6 following university template)',
      'Public Project Demonstration & Defense before Academic Examination Board'
    ],
    practicalExercises: [
      'Deploy full-stack production application accessible on live domain with HTTPS',
      'Execute load testing benchmarks to evaluate system response times under concurrent users',
      'Conduct final thesis presentation and live demonstration for bachelor degree clearance'
    ],
    ethiopianExamFocus: 'Major graduation requirement; determines honors and final bachelor degree qualification.',
    harvardEquivalent: 'Directly equivalent to Harvard College Senior Thesis / Capstone'
  },
  {
    id: 'ethio-cosc-4102',
    code: 'CoSc 4102',
    title: 'MoE National Exit Exam Preparation & Comprehensive Synthesis',
    curriculumSource: 'ethiopian_university',
    institution: 'Ethiopian Universities (MoE Harmonized BSc CSE Curriculum)',
    recommendedYear: '4th Year',
    semester: 'Year 4 - Semester 2 (Graduation Requirement)',
    creditHours: '2 Cr / 4 ECTS',
    category: 'Core CS',
    description: 'Rigorous national exit exam synthesis covering the 16 core competencies formulated by the Ministry of Education (MoE) across all 5 official clusters: Programming & DSA, Database Systems, Computer Systems & Architecture, Software Engineering, and Networks & Security.',
    keyTopics: [
      'Cluster 1: Programming & Data Structures (C++, Java, OOP, Big-O, Lists, Trees, Graphs, Sorting)',
      'Cluster 2: Database Systems (ER Modeling, Relational Algebra, SQL, Normalization 1NF-BCNF, ACID)',
      'Cluster 3: Operating Systems & Architecture (Scheduling, Semaphores, Deadlocks, Paging, Assembly)',
      'Cluster 4: Computer Networks & Security (OSI, Subnetting, TCP/UDP, Routing, Cryptography, OWASP)',
      'Cluster 5: Software Engineering & Automata (SDLC, Agile, UML, Testing, DFA/NFA, Grammars)',
      'Test-Taking Strategies for Computer-Based Testing (CBT) under MoE Exit Exam constraints'
    ],
    practicalExercises: [
      'Complete 100-question timed mock exit exam simulation under 180-minute countdown',
      'Review previous cohort exit exam trap questions and analyze error patterns',
      'Synthesize personal diagnostic scorecard across all 5 competency domains'
    ],
    ethiopianExamFocus: 'Direct prerequisite for obtaining official university degree certificate and graduation clearance across Ethiopia.',
    harvardEquivalent: 'Aligns with comprehensive CS curriculum mastery across all Harvard CS courses'
  }
];

export const curriculumComparisonBridges: CurriculumComparisonBridge[] = [
  {
    id: 'bridge-1',
    topicDomain: 'Intro to CS, C Programming & Memory',
    ethiopianCourses: ['CoSc 1011 (Intro to CS)', 'CoSc 1012 (Programming I in C/C++)'],
    harvardCourses: ['CS50x (Weeks 0-5: C, Memory, Pointers, Algorithms)'],
    howToStudyTogether: 'Follow Ethiopian university lectures for syllabus pacing and exams, then watch Prof. David J. Malan’s CS50x lectures for deep mental models on pointers, memory allocation, and Valgrind debugging. Solve CS50 Pset 4 (Recover & Filter) to master Ethiopian pointer exam questions effortlessly.',
    recommendedAction: 'Start CS50x Week 4 Memory alongside your Ethiopian CoSc 1012 course.'
  },
  {
    id: 'bridge-2',
    topicDomain: 'Data Structures and Algorithms (DSA)',
    ethiopianCourses: ['CoSc 2031 (Data Structures and Algorithms)', 'CoSc 3011 (Design and Analysis of Algorithms)'],
    harvardCourses: ['CS124 (Data Structures & Algorithms - Prof. Mitzenmacher)', 'CS50x Week 5 (Data Structures)'],
    howToStudyTogether: 'Harvard CS124 provides elite mathematical rigor (Amortized analysis, Master Theorem, Randomized algorithms, Dynamic Programming). Pair this with your Ethiopian CoSc 2031 lab exercises to excel in both your university finals and the MoE Exit Exam.',
    recommendedAction: 'Study Harvard CS124 lecture notes on Dynamic Programming when preparing for CoSc 3011.'
  },
  {
    id: 'bridge-3',
    topicDomain: 'Computer Systems, Architecture & Operating Systems',
    ethiopianCourses: ['CoSc 2021 (Digital Logic)', 'CoSc 2052 (Assembly)', 'CoSc 2062 (Operating Systems)'],
    harvardCourses: ['CS61 (Systems Programming & Machine Organization - Prof. Eddie Kohler)'],
    howToStudyTogether: 'Harvard CS61 is one of the most celebrated systems courses in the world. It directly connects assembly language (CoSc 2052) with OS process scheduling, virtual memory, and caching (CoSc 2062). Working through CS61 WeensyOS lab makes operating systems crystal clear.',
    recommendedAction: 'Review CS61 assembly and virtual memory slides before your Ethiopian OS midterm.'
  },
  {
    id: 'bridge-4',
    topicDomain: 'Full-Stack Web Development & Modern Software',
    ethiopianCourses: ['CoSc 3041 (Web Programming)', 'CoSc 3031 (Software Engineering)'],
    harvardCourses: ['CS50W (Web Programming with Python and JavaScript - Brian Yu)'],
    howToStudyTogether: 'Ethiopian university syllabi teach fundamental web architecture; Harvard CS50W takes you to modern industry production standards with Django, React, single-page applications, and Git CI/CD. This bridge prepares you for top local Ethiopian tech jobs and international freelance work.',
    recommendedAction: 'Build your CoSc 3041 semester project using the architecture taught in Harvard CS50W.'
  },
  {
    id: 'bridge-5',
    topicDomain: 'Artificial Intelligence & Machine Learning',
    ethiopianCourses: ['CoSc 3102 (Artificial Intelligence)', 'CoSc 4011 (Machine Learning)'],
    harvardCourses: ['CS50AI (Intro to AI with Python)', 'CS181 (Machine Learning)'],
    howToStudyTogether: 'Harvard CS50AI covers A* search, Minimax, and Bayesian networks with interactive Python projects, exactly matching Ethiopian CoSc 3102. For senior-year ML (CoSc 4011), Harvard CS181 provides the mathematical probability derivations and neural network theory.',
    recommendedAction: 'Implement Harvard CS50AI Tic-Tac-Toe Minimax to ace your CoSc 3102 search exam.'
  },
  {
    id: 'bridge-6',
    topicDomain: 'Theory of Computation & Automata',
    ethiopianCourses: ['CoSc 3051 (Formal Language Theory & Automata)'],
    harvardCourses: ['CS121 (Introduction to the Theory of Computation - Prof. Boaz Barak)'],
    howToStudyTogether: 'Both courses follow the canonical Sipser textbook model. Use Harvard CS121’s interactive online textbook (introtcs.org) to master DFAs, NFAs, Pumping Lemma proofs, and Turing machines for your Ethiopian university exams.',
    recommendedAction: 'Read the Harvard CS121 chapter on Pumping Lemma before your CoSc 3051 final.'
  },
  {
    id: 'bridge-7',
    topicDomain: 'Cybersecurity & Information Assurance',
    ethiopianCourses: ['CoSc 4031 (Information Assurance & Cybersecurity)'],
    harvardCourses: ['CS50S (Introduction to Cybersecurity)'],
    howToStudyTogether: 'Combine Ethiopian theoretical mathematical cryptography (RSA, AES, Diffie-Hellman) with Harvard CS50S practical security mindset, threat modeling, and defensive engineering.',
    recommendedAction: 'Review Harvard CS50S OWASP top 10 breakdown during your CoSc 4031 course.'
  }
];
