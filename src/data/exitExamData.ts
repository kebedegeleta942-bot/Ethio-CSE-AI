import {
  PastExitExamPaper,
  ExitExamQuestion,
  ExitExamDomain,
  ExitExamDomainBlueprint,
} from '../types';

export const moeExitExamBlueprints: ExitExamDomainBlueprint[] = [
  {
    domain: 'Programming & Data Structures',
    weightPercentage: 25,
    officialCourses: [
      { code: 'CoSc 1011', name: 'Fundamentals of Programming (C++)', weight: 8 },
      { code: 'CoSc 2022', name: 'Object Oriented Programming (Java/C++)', weight: 8 },
      { code: 'CoSc 2031', name: 'Data Structures and Algorithms', weight: 9 },
    ],
    keyTopics: [
      'Asymptotic notation (Big-O, Omega, Theta) & best/average/worst case complexities',
      'Pointers, Dynamic memory allocation, and references in C++',
      'Arrays, Singly & Doubly Linked Lists (node insertions, pointer updates, cycle detection)',
      'Stacks and Queues (Infix to Postfix, balanced brackets, recursion call stack)',
      'Trees (Binary Trees, BST properties, AVL rotations, Heap and Priority Queues)',
      'Graphs (BFS vs DFS, adjacency list vs matrix, Dijkstra, Kruskal/Prim MST)',
      'OOP principles: Encapsulation, Inheritance, Polymorphism (method overriding vs overloading), Abstract classes vs Interfaces',
    ],
    recommendedStrategy:
      'Practice manual pointer tracing and loop invariant counting. Do not just memorize code—MoE tests exact output of nested loops and pointer reassignments.',
    commonPitfalls: [
      'Confusing time complexity of QuickSort in the worst case (O(n²)) with average case (O(n log n)).',
      'Assuming in-order traversal of a regular binary tree is sorted (it is only sorted for a Binary Search Tree).',
      'Mistaking method overloading (compile-time) for method overriding (run-time polymorphism).',
    ],
  },
  {
    domain: 'Database Systems',
    weightPercentage: 20,
    officialCourses: [
      { code: 'CoSc 2042', name: 'Database Management Systems', weight: 12 },
      { code: 'CoSc 3051', name: 'Advanced Database Systems', weight: 8 },
    ],
    keyTopics: [
      'Entity-Relationship (ER) modeling, cardinalities, weak entities, and relational mapping',
      'Relational Algebra operators: Selection (σ), Projection (π), Cartesian Product (×), Natural Join (⨝)',
      'SQL DDL & DML: GROUP BY, HAVING, Subqueries, Aggregate functions with NULL values, Outer Joins',
      'Functional Dependencies, Super keys, Candidate keys, and Prime attributes',
      'Normalization: 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF (determinant must be superkey)',
      'Transaction Processing: ACID properties, Serializability, Concurrency anomalies (Dirty read, Non-repeatable read, Phantom read)',
      'Concurrency control: Two-Phase Locking (2PL), Deadlocks, and Write-Ahead Logging (WAL)',
    ],
    recommendedStrategy:
      'Master the step-by-step test for 2NF and 3NF. In past exams, at least 4-5 questions tested whether a given relation is in 2NF, 3NF, or BCNF.',
    commonPitfalls: [
      'Applying 2NF checks when the candidate key is only a single attribute (any relation with a single-attribute candidate key is automatically in 2NF).',
      'Confusing WHERE (filters individual rows before aggregation) with HAVING (filters groups after aggregation).',
      'Forgetting that NULL in SQL behaves as unknown: NULL = NULL evaluates to UNKNOWN/false, not true.',
    ],
  },
  {
    domain: 'Operating Systems & Architecture',
    weightPercentage: 20,
    officialCourses: [
      { code: 'CoSc 2062', name: 'Operating Systems', weight: 12 },
      { code: 'CoSc 2012', name: 'Computer Organization and Architecture', weight: 8 },
    ],
    keyTopics: [
      'Process states, Process Control Block (PCB), Context switching, Threads vs Processes',
      'CPU Scheduling: FCFS, SJF (optimal waiting time), Round Robin (time quantum trade-offs), Priority scheduling, calculation of Turnaround & Waiting times',
      'Process Synchronization: Race conditions, Critical section rules, Peterson’s solution, Semaphores (wait/signal), Mutex locks',
      'Deadlocks: 4 necessary conditions (Mutual exclusion, Hold & wait, No preemption, Circular wait), Resource Allocation Graphs, Banker’s Algorithm',
      'Memory Management: Logical vs Physical address, Paging, Page Table, TLB, Segmentation, Page faults, Page replacement (FIFO, LRU, Optimal - Belady’s anomaly)',
      'Computer Architecture: Instruction cycle (Fetch-Decode-Execute), Von Neumann bottleneck, Cache memory mapping (Direct, Associative, Set-Associative), RISC vs CISC',
    ],
    recommendedStrategy:
      'Practice calculation problems: Gantt chart for CPU scheduling (turnaround time = finish - arrival), and page fault counting for FIFO vs LRU.',
    commonPitfalls: [
      'Calculating Turnaround Time as Finish Time alone without subtracting Arrival Time.',
      'Assuming increasing physical frames in FIFO always reduces page faults (Belady’s Anomaly causes page faults to increase in certain page traces).',
      'Confusing deadlock prevention (eliminating one of the 4 conditions) with deadlock avoidance (Banker’s algorithm safe state check).',
    ],
  },
  {
    domain: 'Computer Networks & Security',
    weightPercentage: 20,
    officialCourses: [
      { code: 'CoSc 3071', name: 'Computer Networks and Data Communication', weight: 10 },
      { code: 'CoSc 4091', name: 'Network Design and Management / Wireless', weight: 5 },
      { code: 'CoSc 4111', name: 'Computer and Network Security', weight: 5 },
    ],
    keyTopics: [
      'OSI 7-Layer model vs TCP/IP 4-Layer model: Encapsulation, PDU names (Data, Segment, Packet, Frame, Bit), protocol mappings',
      'Physical & Data Link Layers: Transmission media, Framing, MAC addressing, CSMA/CD, CSMA/CA, Error detection (CRC, Parity)',
      'Network Layer: IPv4 addressing, Subnetting, CIDR, Network ID, Broadcast IP, Usable host count (2^(32-prefix) - 2), ARP, ICMP',
      'Routing: Distance Vector (Bellman-Ford, count-to-infinity) vs Link State (OSPF, Dijkstra shortest path)',
      'Transport Layer: TCP (connection-oriented, reliable, flow/congestion control, 3-way handshake) vs UDP (connectionless, low latency)',
      'Application Layer: DNS, HTTP/HTTPS, DHCP, SMTP, FTP',
      'Security: Symmetric (AES, DES) vs Asymmetric (RSA, ECC), Digital signatures, Hash functions (SHA-256), Firewalls, MITM attacks',
    ],
    recommendedStrategy:
      'Subnetting is guaranteed on every MoE exam! Memorize powers of 2 (2, 4, 8, 16, 32, 64, 128, 256) and understand how prefix lengths (/25 through /30) divide subnets.',
    commonPitfalls: [
      'Forgetting to subtract 2 for the usable hosts (one address is reserved for Network ID, one for Broadcast).',
      'Placing Routers at the Data Link Layer (Routers operate at Layer 3 Network layer; Switches operate at Layer 2).',
      'Thinking asymmetric encryption is faster than symmetric (asymmetric is computationally much slower, usually used only for key exchange).',
    ],
  },
  {
    domain: 'Software Engineering & Design',
    weightPercentage: 15,
    officialCourses: [
      { code: 'CoSc 3082', name: 'Software Engineering & Agile Methodologies', weight: 8 },
      { code: 'CoSc 3092', name: 'Object-Oriented Analysis and Design (OOAD)', weight: 7 },
    ],
    keyTopics: [
      'Software Development Life Cycle (SDLC) models: Waterfall, Spiral (risk-driven), Prototyping, Agile (Scrum, Sprint, Backlog, Daily Standup)',
      'Requirements Engineering: Functional vs Non-functional requirements, User stories, Feasibility study',
      'UML Diagrams: Structural (Class diagrams, Object, Component, Deployment) vs Behavioral (Use Case, Sequence, Activity, State Machine)',
      'Software Architecture: Monolithic, Client-Server, MVC, Microservices, Layered architecture',
      'Design Principles: High Cohesion and Low Coupling, SOLID principles',
      'Design Patterns: Singleton, Factory Method, Adapter, Observer, Strategy',
      'Software Testing: White Box (Cyclomatic complexity V(G) = E - N + 2P, statement/branch coverage) vs Black Box (Equivalence partitioning, Boundary value analysis)',
      'Software Quality & Maintenance: Corrective, Adaptive, Perfective, Preventive maintenance',
    ],
    recommendedStrategy:
      'Learn the difference between structural vs behavioral UML diagrams, and practice calculating Cyclomatic Complexity.',
    commonPitfalls: [
      'Categorizing Sequence Diagram as a structural diagram (it is behavioral/interaction).',
      'Thinking high coupling is good (the golden rule is High Cohesion, Low Coupling).',
      'Confusing Verification ("Are we building the product right?") with Validation ("Are we building the right product?").',
    ],
  },
];

export const pastExitExamQuestions: ExitExamQuestion[] = [
  // ==========================================
  // CLUSTER 1: Programming & Data Structures
  // ==========================================
  {
    id: 'moe-q1',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Programming & Data Structures',
    courseCode: 'CoSc 2031',
    courseName: 'Data Structures and Algorithms',
    difficulty: 'High Frequency',
    prompt:
      'Which of the following traversals on a Binary Search Tree (BST) visits the nodes in strictly non-decreasing ascending sorted order?',
    options: [
      'A) Pre-order traversal (Root -> Left -> Right)',
      'B) In-order traversal (Left -> Root -> Right)',
      'C) Post-order traversal (Left -> Right -> Root)',
      'D) Level-order traversal (Breadth-First Search)',
    ],
    correctAnswer: 'B) In-order traversal (Left -> Root -> Right)',
    explanation:
      'By definition of a Binary Search Tree, for any node with key K, all values in its left subtree are < K, and all values in its right subtree are > K. Performing an in-order traversal (visiting Left subtree, then current Node, then Right subtree) recursively guarantees that elements are processed in strictly ascending order.',
    trapAnalysis:
      'Students frequently confuse pre-order (which starts at root) with in-order. Remember: "In-order" = "In order of values" for a BST.',
    tags: ['BST', 'Tree Traversal', 'DSA', 'CoSc 2031'],
  },
  {
    id: 'moe-q2',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Programming & Data Structures',
    courseCode: 'CoSc 2031',
    courseName: 'Data Structures and Algorithms',
    difficulty: 'Tricky',
    prompt:
      'Consider the following C++ code snippet. What will be printed to standard output?',
    codeSnippet: `#include <iostream>
using namespace std;

void mystery(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 25;
    mystery(&x, &y);
    cout << x - y << endl;
    return 0;
}`,
    options: ['A) -15', 'B) 15', 'C) 35', 'D) 0'],
    correctAnswer: 'B) 15',
    explanation:
      'The function mystery receives pointers to x and y and performs a classic swap by dereferencing (*a and *b). Initially x = 10 and y = 25. After mystery(&x, &y), x becomes 25 and y becomes 10. Thus, x - y = 25 - 10 = 15.',
    trapAnalysis:
      'Many students compute 10 - 25 = -15 because they forget the values were swapped in-place via pointer dereferencing.',
    tags: ['Pointers', 'C++', 'Parameter Passing', 'CoSc 1011'],
  },
  {
    id: 'moe-q3',
    examPaperId: 'moe-2015-ec',
    yearEC: '2015 E.C. (2023 G.C.)',
    domain: 'Programming & Data Structures',
    courseCode: 'CoSc 2031',
    courseName: 'Data Structures and Algorithms',
    difficulty: 'High Frequency',
    prompt:
      'What is the worst-case time complexity of standard QuickSort with the first element chosen as pivot, and when does this worst case occur?',
    options: [
      'A) O(n log n), when the array is randomly shuffled',
      'B) O(n²), when the array is already sorted or reverse sorted',
      'C) O(n log n), when the array contains all identical elements',
      'D) O(n), when the array is sorted in ascending order',
    ],
    correctAnswer: 'B) O(n²), when the array is already sorted or reverse sorted',
    explanation:
      'When the first element is selected as pivot on an already sorted or reverse sorted array, the partition algorithm produces extremely unbalanced partitions of size 0 and n - 1 at each recursion level. The recurrence relation becomes T(n) = T(n-1) + O(n), which resolves to O(n²).',
    trapAnalysis:
      'Students assume sorting an already sorted array is fast (O(n)), but for naive QuickSort with fixed pivot, already sorted input is the absolute worst-case scenario!',
    tags: ['QuickSort', 'Time Complexity', 'Big-O', 'Algorithms'],
  },
  {
    id: 'moe-q4',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Programming & Data Structures',
    courseCode: 'CoSc 2022',
    courseName: 'Object Oriented Programming',
    difficulty: 'Standard',
    prompt:
      'In Object-Oriented Programming (OOP), what mechanism allows a subclass to provide a specific implementation of a method that is already defined in its superclass, resolved at runtime?',
    options: [
      'A) Method Overloading (Static Polymorphism)',
      'B) Method Overriding (Dynamic Polymorphism / Dynamic Binding)',
      'C) Data Encapsulation',
      'D) Multiple Inheritance',
    ],
    correctAnswer: 'B) Method Overriding (Dynamic Polymorphism / Dynamic Binding)',
    explanation:
      'Method Overriding occurs when a child class provides a new implementation for a method with the exact same signature (name, parameter list, return type) as in the parent class. It is resolved dynamically at runtime using the virtual method table (vtable).',
    trapAnalysis:
      'Overloading happens in the SAME class with DIFFERENT parameters and is resolved at compile time. Overriding happens across inheritance hierarchy with the SAME signature at runtime.',
    tags: ['OOP', 'Polymorphism', 'Java', 'C++', 'CoSc 2022'],
  },
  {
    id: 'moe-q5',
    examPaperId: 'moe-model-2017',
    yearEC: '2017 E.C. Model',
    domain: 'Programming & Data Structures',
    courseCode: 'CoSc 2031',
    courseName: 'Data Structures and Algorithms',
    difficulty: 'Tricky',
    prompt:
      'Given an arithmetic expression in infix notation: "A + B * C - D / E", what is its corresponding postfix (Reverse Polish) notation representation?',
    options: [
      'A) A B C * + D E / -',
      'B) + A * B C - / D E',
      'C) A B + C * D - E /',
      'D) A B C + * D E - /',
    ],
    correctAnswer: 'A) A B C * + D E / -',
    explanation:
      'According to operator precedence: 1. B * C becomes (B C *). 2. A + (B C *) becomes (A B C * +). 3. D / E becomes (D E /). 4. Finally, (A B C * +) - (D E /) becomes A B C * + D E / -.',
    trapAnalysis:
      'Students who evaluate left-to-right without respecting operator precedence choose option C. Multiplication and division have higher precedence than addition and subtraction.',
    tags: ['Stack', 'Postfix', 'Infix Expression', 'CoSc 2031'],
  },

  // ==========================================
  // CLUSTER 2: Database Systems
  // ==========================================
  {
    id: 'moe-q6',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Database Systems',
    courseCode: 'CoSc 2042',
    courseName: 'Database Management Systems',
    difficulty: 'High Frequency',
    prompt:
      'A relation R(A, B, C, D) has primary key (A, B). Functional dependencies are: { (A, B) -> C, A -> D }. In which normal form is relation R?',
    options: [
      'A) 1NF only (Not in 2NF)',
      'B) 2NF but not 3NF',
      'C) 3NF but not BCNF',
      'D) BCNF',
    ],
    correctAnswer: 'A) 1NF only (Not in 2NF)',
    explanation:
      'Second Normal Form (2NF) requires that the relation is in 1NF and contains NO partial functional dependencies. A partial dependency occurs when a non-prime attribute depends on a proper subset of a composite candidate key. Here, candidate key is (A, B), and non-prime attribute D depends solely on A (a subset of the key). Because A -> D is a partial dependency, R violates 2NF and is only in 1NF.',
    trapAnalysis:
      'One of the most frequently asked questions on the MoE exit exam. Whenever a relation has a composite key and an attribute depends on only ONE part of the composite key, it immediately fails 2NF!',
    tags: ['Normalization', '2NF', 'Functional Dependency', 'DBMS'],
  },
  {
    id: 'moe-q7',
    examPaperId: 'moe-2015-ec',
    yearEC: '2015 E.C. (2023 G.C.)',
    domain: 'Database Systems',
    courseCode: 'CoSc 2042',
    courseName: 'Database Management Systems',
    difficulty: 'Standard',
    prompt:
      'Which ACID transaction property ensures that if a system crashes during a money transfer from account A to account B, neither account is partially debited or credited, and the transaction is completely rolled back?',
    options: [
      'A) Consistency',
      'B) Isolation',
      'C) Atomicity',
      'D) Durability',
    ],
    correctAnswer: 'C) Atomicity',
    explanation:
      'Atomicity is the "all-or-nothing" rule: either all operations of a transaction execute to completion and are committed, or if an error/failure occurs midway, all preceding operations are completely aborted and rolled back, leaving the database in its prior state.',
    trapAnalysis:
      'Students frequently mix up Atomicity (all-or-nothing execution) with Consistency (ensuring business rules and constraints like non-negative balance are preserved).',
    tags: ['ACID', 'Transactions', 'Atomicity', 'CoSc 2042'],
  },
  {
    id: 'moe-q8',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Database Systems',
    courseCode: 'CoSc 2042',
    courseName: 'Database Management Systems',
    difficulty: 'Tricky',
    prompt:
      'In SQL, what is the fundamental difference between the WHERE clause and the HAVING clause?',
    options: [
      'A) WHERE can only be used with numeric data types, whereas HAVING works with strings',
      'B) WHERE filters rows before aggregate functions are calculated; HAVING filters grouped rows after aggregation',
      'C) WHERE can only be used with SELECT; HAVING can only be used with UPDATE and DELETE',
      'D) There is no functional difference; they are aliases',
    ],
    correctAnswer:
      'B) WHERE filters rows before aggregate functions are calculated; HAVING filters grouped rows after aggregation',
    explanation:
      'The SQL evaluation order is: FROM -> WHERE (row filtering) -> GROUP BY (grouping) -> HAVING (filtering grouped results based on aggregate expressions like COUNT(), SUM(), AVG()) -> SELECT -> ORDER BY. Aggregate functions cannot appear in the WHERE clause.',
    trapAnalysis:
      'MoE exams often present invalid SQL queries like "SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept" and ask what is wrong: aggregate conditions must be in HAVING, not WHERE.',
    tags: ['SQL', 'GROUP BY', 'HAVING', 'Aggregate Functions'],
  },
  {
    id: 'moe-q9',
    examPaperId: 'moe-model-2017',
    yearEC: '2017 E.C. Model',
    domain: 'Database Systems',
    courseCode: 'CoSc 3051',
    courseName: 'Advanced Database Systems',
    difficulty: 'Standard',
    prompt:
      'In relational algebra, which operator corresponds to filtering columns (attributes) of a relation, as opposed to filtering rows (tuples)?',
    options: [
      'A) Selection (σ)',
      'B) Projection (π)',
      'C) Cartesian Product (×)',
      'D) Intersection (∩)',
    ],
    correctAnswer: 'B) Projection (π)',
    explanation:
      'Projection (denoted by Greek letter π) selects specified columns/attributes and discards the rest (also removing duplicate tuples). Selection (denoted by Greek letter σ) filters rows/tuples that satisfy a given conditional predicate.',
    trapAnalysis:
      'Remember: "σ (sigma) selects tuples (rows), π (pi) projects columns (attributes)".',
    tags: ['Relational Algebra', 'Projection', 'Selection', 'CoSc 2042'],
  },

  // ==========================================
  // CLUSTER 3: Operating Systems & Architecture
  // ==========================================
  {
    id: 'moe-q10',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Operating Systems & Architecture',
    courseCode: 'CoSc 2062',
    courseName: 'Operating Systems',
    difficulty: 'High Frequency',
    prompt:
      'Which of the following is NOT one of the four Coffman conditions necessary for a Deadlock to occur in an operating system?',
    options: [
      'A) Mutual Exclusion',
      'B) Hold and Wait',
      'C) Preemption allowed by the kernel',
      'D) Circular Wait',
    ],
    correctAnswer: 'C) Preemption allowed by the kernel',
    explanation:
      'The four necessary conditions for deadlock are: 1. Mutual Exclusion, 2. Hold and Wait, 3. NO Preemption (resources cannot be forcibly taken away from a process holding them), and 4. Circular Wait. If preemption IS allowed, deadlock CANNOT occur because the OS can forcibly preempt a held resource to break the cycle.',
    trapAnalysis:
      'Notice the wording: the deadlock condition is "NO Preemption". Allowing preemption is actually a deadlock prevention technique!',
    tags: ['Deadlock', 'Coffman Conditions', 'Operating Systems', 'CoSc 2062'],
  },
  {
    id: 'moe-q11',
    examPaperId: 'moe-2015-ec',
    yearEC: '2015 E.C. (2023 G.C.)',
    domain: 'Operating Systems & Architecture',
    courseCode: 'CoSc 2062',
    courseName: 'Operating Systems',
    difficulty: 'Tricky',
    prompt:
      'Three processes P1, P2, and P3 arrive at time t = 0 with burst times of 8 ms, 4 ms, and 2 ms respectively. If Non-Preemptive Shortest Job First (SJF) scheduling is used, what is the average waiting time?',
    options: ['A) 2.0 ms', 'B) 2.67 ms', 'C) 4.67 ms', 'D) 7.0 ms'],
    correctAnswer: 'B) 2.67 ms',
    explanation:
      'Under SJF, the shortest burst runs first:\n1. P3 (burst 2) runs from t = 0 to 2. Waiting time = 0.\n2. P2 (burst 4) runs from t = 2 to 6. Waiting time = 2.\n3. P1 (burst 8) runs from t = 6 to 14. Waiting time = 6.\nAverage Waiting Time = (0 + 2 + 6) / 3 = 8 / 3 = 2.67 ms.',
    trapAnalysis:
      'If calculated using FCFS order (P1 -> P2 -> P3), waiting times are 0, 8, 12, giving average 20/3 = 6.67 ms. Be sure to order processes by burst time first!',
    tags: ['CPU Scheduling', 'SJF', 'Gantt Chart', 'Operating Systems'],
  },
  {
    id: 'moe-q12',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Operating Systems & Architecture',
    courseCode: 'CoSc 2062',
    courseName: 'Operating Systems',
    difficulty: 'Standard',
    prompt:
      'What phenomenon occurs in the First-In First-Out (FIFO) page replacement algorithm where increasing the number of physical memory page frames unexpectedly causes an INCREASE in the total number of page faults?',
    options: [
      'A) Thrashing',
      'B) Belady’s Anomaly',
      'C) Convoy Effect',
      'D) Starvation',
    ],
    correctAnswer: 'B) Belady’s Anomaly',
    explanation:
      'Belady’s Anomaly is a counter-intuitive phenomenon where allocating more physical page frames results in more page faults for certain reference strings under FIFO page replacement. Stack-based algorithms like LRU (Least Recently Used) and Optimal replacement never suffer from Belady’s Anomaly.',
    trapAnalysis:
      'Do not confuse Belady’s Anomaly with Thrashing (when the CPU spends more time swapping pages than executing instructions) or Convoy Effect (short processes queued behind long processes in FCFS CPU scheduling).',
    tags: ['Paging', 'Beladys Anomaly', 'Virtual Memory', 'Operating Systems'],
  },
  {
    id: 'moe-q13',
    examPaperId: 'moe-model-2017',
    yearEC: '2017 E.C. Model',
    domain: 'Operating Systems & Architecture',
    courseCode: 'CoSc 2012',
    courseName: 'Computer Organization & Architecture',
    difficulty: 'Standard',
    prompt:
      'Which component of the Central Processing Unit (CPU) holds the memory address of the next instruction to be fetched and executed?',
    options: [
      'A) Memory Data Register (MDR)',
      'B) Instruction Register (IR)',
      'C) Program Counter (PC)',
      'D) Accumulator (AC)',
    ],
    correctAnswer: 'C) Program Counter (PC)',
    explanation:
      'The Program Counter (PC) contains the address of the next instruction to be fetched from memory. Once fetched, the instruction itself is placed into the Instruction Register (IR), and the PC is incremented automatically.',
    trapAnalysis:
      'IR holds the CURRENT instruction being decoded/executed, while PC holds the ADDRESS of the NEXT instruction.',
    tags: ['CPU Architecture', 'Program Counter', 'Instruction Cycle', 'CoSc 2012'],
  },

  // ==========================================
  // CLUSTER 4: Computer Networks & Security
  // ==========================================
  {
    id: 'moe-q14',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Computer Networks & Security',
    courseCode: 'CoSc 3071',
    courseName: 'Computer Networks',
    difficulty: 'High Frequency',
    prompt:
      'Given the IPv4 address block 192.168.10.0/26, how many subnets can be created from this block, how many total IP addresses are in each subnet, and how many are USABLE for assigning to host machines?',
    options: [
      'A) 4 subnets, 64 total IPs, 62 usable hosts per subnet',
      'B) 2 subnets, 128 total IPs, 126 usable hosts per subnet',
      'C) 8 subnets, 32 total IPs, 30 usable hosts per subnet',
      'D) 1 subnet, 256 total IPs, 254 usable hosts per subnet',
    ],
    correctAnswer: 'A) 4 subnets, 64 total IPs, 62 usable hosts per subnet',
    explanation:
      'A /26 subnet mask has 26 network bits and 32 - 26 = 6 host bits. Total IPs per subnet = 2^6 = 64. In IPv4, 2 addresses are reserved per subnet (the first is Network ID, the last is Directed Broadcast). Thus, usable host count = 64 - 2 = 62. In a standard Class C (/24), splitting into /26 yields 2^(26-24) = 4 subnets.',
    trapAnalysis:
      'Subnetting is tested on every single Ethiopian exit exam! Always remember to subtract 2 for usable hosts (Network ID and Broadcast).',
    tags: ['Subnetting', 'CIDR', 'IPv4', 'Computer Networks'],
  },
  {
    id: 'moe-q15',
    examPaperId: 'moe-2015-ec',
    yearEC: '2015 E.C. (2023 G.C.)',
    domain: 'Computer Networks & Security',
    courseCode: 'CoSc 3071',
    courseName: 'Computer Networks',
    difficulty: 'Standard',
    prompt:
      'At which layer of the OSI 7-Layer reference model do traditional network Routers operate to determine the best path for packet forwarding?',
    options: [
      'A) Physical Layer (Layer 1)',
      'B) Data Link Layer (Layer 2)',
      'C) Network Layer (Layer 3)',
      'D) Transport Layer (Layer 4)',
    ],
    correctAnswer: 'C) Network Layer (Layer 3)',
    explanation:
      'Routers examine IP packets and routing tables to make forwarding decisions based on logical destination IP addresses, which operate exclusively at Layer 3 (Network Layer). In contrast, Layer 2 Switches use MAC addresses at the Data Link Layer, and Repeaters/Hubs operate at Layer 1.',
    trapAnalysis:
      'A classic MoE question. Remember: Hubs/Repeaters = Layer 1; Switches/Bridges = Layer 2; Routers = Layer 3; Gateways/Firewalls = Layer 4-7.',
    tags: ['OSI Model', 'Routers', 'Network Layer', 'CoSc 3071'],
  },
  {
    id: 'moe-q16',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Computer Networks & Security',
    courseCode: 'CoSc 3071',
    courseName: 'Computer Networks',
    difficulty: 'High Frequency',
    prompt:
      'What is the correct sequence of TCP control flag packets exchanged during the standard 3-Way Handshake to establish a reliable connection?',
    options: [
      'A) ACK -> SYN -> SYN-ACK',
      'B) SYN -> SYN-ACK -> ACK',
      'C) SYN -> ACK -> FIN',
      'D) FIN -> FIN-ACK -> ACK',
    ],
    correctAnswer: 'B) SYN -> SYN-ACK -> ACK',
    explanation:
      '1. Client sends a SYN (Synchronize sequence number) packet to server.\n2. Server replies with SYN-ACK (Synchronize-Acknowledgment) confirming receipt and sending its own sequence number.\n3. Client sends an ACK (Acknowledgment) packet. Connection is now ESTABLISHED.',
    trapAnalysis:
      'FIN -> ACK is used for connection termination (teardown), not establishment. SYN initiates the connection.',
    tags: ['TCP', 'Handshake', 'Transport Layer', 'CoSc 3071'],
  },
  {
    id: 'moe-q17',
    examPaperId: 'moe-model-2017',
    yearEC: '2017 E.C. Model',
    domain: 'Computer Networks & Security',
    courseCode: 'CoSc 4111',
    courseName: 'Computer & Network Security',
    difficulty: 'Standard',
    prompt:
      'In asymmetric (public-key) cryptography, if Alice wants to send an encrypted confidential message to Bob that ONLY Bob can decrypt and read, which key must Alice use to encrypt the message?',
    options: [
      'A) Alice’s private key',
      'B) Alice’s public key',
      'C) Bob’s public key',
      'D) Bob’s private key',
    ],
    correctAnswer: 'C) Bob’s public key',
    explanation:
      'In asymmetric encryption for confidentiality, the sender encrypts with the RECIPIENT’S PUBLIC KEY. Because only the recipient possesses the corresponding PRIVATE KEY, only Bob can decrypt the ciphertext. (If Alice encrypted with her own private key, anyone with Alice’s public key could decrypt it, which provides authentication/digital signature, not confidentiality).',
    trapAnalysis:
      'Very common confusion between Confidentiality (encrypt with recipient’s public key) vs Digital Signature / Non-repudiation (encrypt/sign with sender’s private key).',
    tags: ['Cryptography', 'Public Key', 'Security', 'CoSc 4111'],
  },

  // ==========================================
  // CLUSTER 5: Software Engineering & Design
  // ==========================================
  {
    id: 'moe-q18',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Software Engineering & Design',
    courseCode: 'CoSc 3082',
    courseName: 'Software Engineering',
    difficulty: 'High Frequency',
    prompt:
      'In software architecture and object-oriented design, what is the ideal relationship between Module Cohesion and Module Coupling?',
    options: [
      'A) High Coupling and High Cohesion',
      'B) Low Coupling and Low Cohesion',
      'C) High Cohesion and Low Coupling',
      'D) Low Cohesion and High Coupling',
    ],
    correctAnswer: 'C) High Cohesion and Low Coupling',
    explanation:
      'High Cohesion means all elements within a module work closely together toward a single, well-defined purpose (Single Responsibility). Low Coupling means modules have minimal dependencies on one another, making the system modular, maintainable, testable, and reusable.',
    trapAnalysis:
      'The single most frequently quoted software engineering design guideline: "High Cohesion, Low Coupling".',
    tags: ['Cohesion', 'Coupling', 'Software Engineering', 'CoSc 3082'],
  },
  {
    id: 'moe-q19',
    examPaperId: 'moe-2015-ec',
    yearEC: '2015 E.C. (2023 G.C.)',
    domain: 'Software Engineering & Design',
    courseCode: 'CoSc 3092',
    courseName: 'Object-Oriented Analysis and Design',
    difficulty: 'Standard',
    prompt:
      'Which of the following Unified Modeling Language (UML) diagrams is classified as a STRUCTURAL diagram rather than a BEHAVIORAL diagram?',
    options: [
      'A) Sequence Diagram',
      'B) Use Case Diagram',
      'C) Class Diagram',
      'D) Activity Diagram',
    ],
    correctAnswer: 'C) Class Diagram',
    explanation:
      'UML diagrams are divided into two main categories:\n- Structural diagrams: Class, Object, Component, Deployment, Package, Composite Structure.\n- Behavioral diagrams: Use Case, Activity, State Machine, Sequence, Communication, Interaction Overview, Timing.',
    trapAnalysis:
      'Sequence diagrams show message flow over time between objects and are behavioral/interaction diagrams, NOT structural.',
    tags: ['UML', 'Class Diagram', 'OOAD', 'CoSc 3092'],
  },
  {
    id: 'moe-q20',
    examPaperId: 'moe-model-2017',
    yearEC: '2017 E.C. Model',
    domain: 'Software Engineering & Design',
    courseCode: 'CoSc 3082',
    courseName: 'Software Engineering',
    difficulty: 'Tricky',
    prompt:
      'What is the Cyclomatic Complexity V(G) of a program control flow graph G having 11 edges (E), 8 nodes (N), and 1 connected component (P)?',
    options: ['A) 3', 'B) 5', 'C) 8', 'D) 19'],
    correctAnswer: 'B) 5',
    explanation:
      'McCabe’s Cyclomatic Complexity formula is V(G) = E - N + 2P.\nHere: E = 11 edges, N = 8 nodes, P = 1 component.\nV(G) = 11 - 8 + 2(1) = 3 + 2 = 5.',
    trapAnalysis:
      'Students often forget the "+ 2P" term and simply compute E - N = 3. Always apply the complete formula V(G) = E - N + 2P.',
    tags: ['Software Testing', 'Cyclomatic Complexity', 'Metrics', 'CoSc 3082'],
  },
  {
    id: 'moe-q21',
    examPaperId: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    domain: 'Software Engineering & Design',
    courseCode: 'CoSc 3082',
    courseName: 'Software Engineering',
    difficulty: 'Standard',
    prompt:
      'Which software development life cycle (SDLC) model is explicitly characterized as "Risk-Driven" and combines iterative prototyping with the systematic control of the waterfall model in concentric loops?',
    options: [
      'A) Waterfall Model',
      'B) Spiral Model (Boehm)',
      'C) V-Model',
      'D) Extreme Programming (XP)',
    ],
    correctAnswer: 'B) Spiral Model (Boehm)',
    explanation:
      'Barry Boehm’s Spiral Model is fundamentally risk-driven. Each cycle/spiral consists of four quadrants: Objective setting, Risk assessment & reduction, Development & validation, and Review/planning next phase.',
    trapAnalysis:
      'Whenever the phrase "Risk-driven" appears in an SDLC question on the Ethiopian exit exam, the answer is always the Spiral Model.',
    tags: ['SDLC', 'Spiral Model', 'Boehm', 'Risk Management'],
  },
];

export const pastExitExamPapers: PastExitExamPaper[] = [
  {
    id: 'moe-2016-ec',
    yearEC: '2016 E.C. (2024 G.C.)',
    title: 'MoE Nationwide Computer Science Exit Exam — 2016 E.C.',
    administeredBy:
      'Ministry of Education (MoE), Federal Democratic Republic of Ethiopia',
    totalQuestions: pastExitExamQuestions.filter(
      (q) => q.examPaperId === 'moe-2016-ec'
    ).length,
    timeLimitMinutes: 60,
    passingScorePercent: 50,
    description:
      'Official examination paper delivered across Ethiopian public and private universities. Strong emphasis on BST traversals, 2NF/3NF database decomposition, CPU scheduling, /26 subnetting, and modular cohesion.',
    domainsCovered: [
      'Programming & Data Structures',
      'Database Systems',
      'Operating Systems & Architecture',
      'Computer Networks & Security',
      'Software Engineering & Design',
    ],
    questions: pastExitExamQuestions.filter(
      (q) => q.examPaperId === 'moe-2016-ec'
    ),
  },
  {
    id: 'moe-2015-ec',
    yearEC: '2015 E.C. (2023 G.C.)',
    title: 'MoE Nationwide Computer Science Exit Exam — 2015 E.C.',
    administeredBy:
      'Ministry of Education (MoE), Federal Democratic Republic of Ethiopia',
    totalQuestions: pastExitExamQuestions.filter(
      (q) => q.examPaperId === 'moe-2015-ec'
    ).length,
    timeLimitMinutes: 45,
    passingScorePercent: 50,
    description:
      'Inaugural nationwide exit examination testing core undergraduate CS competence. Covers QuickSort worst cases, ACID transactions, SJF scheduling formulas, and OSI layer router assignments.',
    domainsCovered: [
      'Programming & Data Structures',
      'Database Systems',
      'Operating Systems & Architecture',
      'Computer Networks & Security',
      'Software Engineering & Design',
    ],
    questions: pastExitExamQuestions.filter(
      (q) => q.examPaperId === 'moe-2015-ec'
    ),
  },
  {
    id: 'moe-model-2017',
    yearEC: '2017 E.C. Model',
    title: 'MoE Official Model & High-Yield Practice Exam — 2017 E.C.',
    administeredBy: 'Ethiopian University CS Deans Committee & MoE Taskforce',
    totalQuestions: pastExitExamQuestions.filter(
      (q) => q.examPaperId === 'moe-model-2017'
    ).length,
    timeLimitMinutes: 45,
    passingScorePercent: 50,
    description:
      'Curated diagnostic model paper based on previous exam item banks. Covers postfix notation, relational projection, Belady’s anomaly, asymmetric encryption keys, and cyclomatic complexity.',
    domainsCovered: [
      'Programming & Data Structures',
      'Database Systems',
      'Operating Systems & Architecture',
      'Computer Networks & Security',
      'Software Engineering & Design',
    ],
    questions: pastExitExamQuestions.filter(
      (q) => q.examPaperId === 'moe-model-2017'
    ),
  },
];

export const exitExamCheatSheets = [
  {
    title: 'IPv4 Subnetting & CIDR Lookup Matrix',
    domain: 'Computer Networks',
    points: [
      '/24 = 255.255.255.0 -> 256 Total IPs, 254 Usable Hosts',
      '/25 = 255.255.255.128 -> 128 Total IPs, 126 Usable Hosts',
      '/26 = 255.255.255.192 -> 64 Total IPs, 62 Usable Hosts',
      '/27 = 255.255.255.224 -> 32 Total IPs, 30 Usable Hosts',
      '/28 = 255.255.255.240 -> 16 Total IPs, 14 Usable Hosts',
      '/29 = 255.255.255.248 -> 8 Total IPs, 6 Usable Hosts',
      '/30 = 255.255.255.252 -> 4 Total IPs, 2 Usable Hosts (Point-to-Point links)',
      'Formula: Usable Hosts = 2^(32 - prefix) - 2',
    ],
  },
  {
    title: 'Database Normalization Quick Rules',
    domain: 'Database Systems',
    points: [
      '1NF: All attribute values must be atomic (no repeating groups, no comma-separated lists).',
      '2NF: Must be in 1NF AND have NO partial dependency. If candidate key is single-column, it is automatically in 2NF.',
      '3NF: Must be in 2NF AND have NO transitive dependency (Non-prime attribute -> Non-prime attribute is forbidden).',
      'BCNF: Strictly stronger than 3NF. For every non-trivial X -> Y, X MUST be a Superkey.',
    ],
  },
  {
    title: 'Operating Systems CPU Scheduling & Gantt Formulas',
    domain: 'Operating Systems',
    points: [
      'Turnaround Time (TAT) = Completion Time - Arrival Time',
      'Waiting Time (WT) = Turnaround Time - Burst Time',
      'Response Time = First CPU Allocation Time - Arrival Time',
      'Non-Preemptive SJF gives the minimum average waiting time among all scheduling algorithms.',
      'Round Robin performance is heavily dependent on time quantum q: large q -> FCFS; very small q -> high context-switching overhead.',
    ],
  },
  {
    title: 'Sorting Algorithms Complexity Reference',
    domain: 'Programming & Data Structures',
    points: [
      'Bubble / Insertion / Selection Sort: Best = O(n) [Insertion], Worst = O(n²), Space = O(1)',
      'MergeSort: Best = O(n log n), Worst = O(n log n), Space = O(n) [Stable]',
      'QuickSort: Best = O(n log n), Average = O(n log n), Worst = O(n²) [Unstable, Space O(log n)]',
      'HeapSort: Best = O(n log n), Worst = O(n log n), Space = O(1) [In-place, Unstable]',
      'Binary Search: O(log n) time, requires sorted random-access array.',
    ],
  },
];
