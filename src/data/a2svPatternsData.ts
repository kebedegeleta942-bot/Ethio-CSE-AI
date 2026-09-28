export interface A2SVPatternItem {
  id: string;
  name: string;
  category: 'Arrays & Strings' | 'Linked Lists' | 'Trees & Graphs' | 'Dynamic Programming' | 'Heaps & Searching';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  frequency: 'High - Very Common' | 'Essential' | 'Advanced';
  leetCodeEquivalent: string;
  moeExitExamRelevance: string;
  whenToUse: string;
  timeComplexity: string;
  spaceComplexity: string;
  ethiopianRealWorldScenario: string;
  languages: {
    python: string;
    cpp: string;
    typescript: string;
  };
  sampleInput: string;
  expectedOutput: string;
}

export const a2svTopPatterns: A2SVPatternItem[] = [
  {
    id: 'pat-1',
    name: 'Two Pointers (Opposite Direction)',
    category: 'Arrays & Strings',
    difficulty: 'Easy',
    frequency: 'Essential',
    leetCodeEquivalent: 'LeetCode 167 (Two Sum II), LeetCode 11 (Container With Most Water), LeetCode 125 (Valid Palindrome)',
    moeExitExamRelevance: 'CoSc 2031 (DSA) array search efficiency & time complexity optimization.',
    whenToUse: 'When given a SORTED array/string or when searching for pairs without O(N²) quadratic nested loops.',
    timeComplexity: 'O(N) Time',
    spaceComplexity: 'O(1) Auxiliary Space',
    ethiopianRealWorldScenario: 'Finding two items in a sorted price catalog at an Addis Ababa electronics market whose combined cost exactly matches a fixed buyer budget.',
    sampleInput: 'nums = [2, 7, 11, 15], target = 9',
    expectedOutput: '[0, 1] (Indices of values 2 + 7 = 9)',
    languages: {
      python: `def two_sum_sorted(nums: list[int], target: int) -> list[int]:
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need a larger number
        else:
            right -= 1 # Need a smaller number
    return []`,
      cpp: `#include <vector>

std::vector<int> twoSumSorted(const std::vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return {left, right};
        else if (sum < target) left++;
        else right--;
    }
    return {};
}`,
      typescript: `function twoSumSorted(nums: number[], target: number): [number, number] | null {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}`,
    },
  },
  {
    id: 'pat-2',
    name: 'Sliding Window (Dynamic Length)',
    category: 'Arrays & Strings',
    difficulty: 'Medium',
    frequency: 'High - Very Common',
    leetCodeEquivalent: 'LeetCode 3 (Longest Substring Without Repeating Characters), LeetCode 209 (Minimum Size Subarray Sum)',
    moeExitExamRelevance: 'Tested under string algorithms, time optimization, and hash set applications.',
    whenToUse: 'When calculating subarray/substring metrics (longest, shortest, exact sum) without recalculating the overlapping window.',
    timeComplexity: 'O(N) Time',
    spaceComplexity: 'O(K) Space where K is character set size',
    ethiopianRealWorldScenario: 'Telebirr fraud engine analyzing a rolling window of recent transactions within 60 seconds to detect burst velocity spam without re-scanning full history.',
    sampleInput: 's = "abcabcbb"',
    expectedOutput: '3 (Substrings "abc", "bca", or "cab")',
    languages: {
      python: `def length_of_longest_substring(s: str) -> int:
    char_index_map = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in char_index_map and char_index_map[char] >= left:
            left = char_index_map[char] + 1
        char_index_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>

int lengthOfLongestSubstring(const std::string& s) {
    std::unordered_map<char, int> seen;
    int left = 0, maxLen = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        if (seen.count(s[right]) && seen[s[right]] >= left) {
            left = seen[s[right]] + 1;
        }
        seen[s[right]] = right;
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      typescript: `function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (seen.has(char) && (seen.get(char) as number) >= left) {
      left = (seen.get(char) as number) + 1;
    }
    seen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    },
  },
  {
    id: 'pat-3',
    name: "Fast & Slow Pointers (Floyd's Cycle Finding)",
    category: 'Linked Lists',
    difficulty: 'Easy',
    frequency: 'Essential',
    leetCodeEquivalent: 'LeetCode 141 (Linked List Cycle), LeetCode 142 (Cycle II), LeetCode 876 (Middle of the Linked List)',
    moeExitExamRelevance: 'CoSc 2031 (DSA) Linked lists pointer manipulation and detecting corrupted cyclical nodes.',
    whenToUse: 'When detecting loops in linked lists or directed graphs with O(1) space, or finding middle nodes in a single pass.',
    timeComplexity: 'O(N) Time',
    spaceComplexity: 'O(1) Constant Auxiliary Space',
    ethiopianRealWorldScenario: 'Detecting infinite redirect loops or circular message dispatching in university campus intranet proxies without storing visited IP hashes in RAM.',
    sampleInput: 'head -> [3] -> [2] -> [0] -> [-4] -> connects back to [2]',
    expectedOutput: 'true (Cycle detected at node with value 2)',
    languages: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head: ListNode | None) -> bool:
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      cpp: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function hasCycle(head: ListNode | null): boolean {
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
  },
  {
    id: 'pat-4',
    name: 'Monotonic Stack (Decreasing / Increasing)',
    category: 'Arrays & Strings',
    difficulty: 'Medium',
    frequency: 'High - Very Common',
    leetCodeEquivalent: 'LeetCode 739 (Daily Temperatures), LeetCode 496 (Next Greater Element), LeetCode 84 (Largest Rectangle in Histogram)',
    moeExitExamRelevance: 'CoSc 2031 (DSA) Stack applications and optimizing brute-force O(N²) lookahead algorithms.',
    whenToUse: 'When you need to find the NEXT greater/smaller element for every element in an array in linear O(N) time.',
    timeComplexity: 'O(N) Time (each element pushed and popped at most once)',
    spaceComplexity: 'O(N) Auxiliary Space',
    ethiopianRealWorldScenario: 'Predicting how many days until the next rainfall temperature spike or foreign currency rate increase for Ethiopian commodity export forecasts.',
    sampleInput: 'temperatures = [73, 74, 75, 71, 69, 72, 76, 73]',
    expectedOutput: '[1, 1, 4, 2, 1, 1, 0, 0] (Days to wait for a warmer temperature)',
    languages: {
      python: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    n = len(temperatures)
    ans = [0] * n
    stack = []  # Stores indices
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            prev_idx = stack.pop()
            ans[prev_idx] = i - prev_idx
        stack.append(i)
    return ans`,
      cpp: `#include <vector>
#include <stack>

std::vector<int> dailyTemperatures(const std::vector<int>& temperatures) {
    int n = temperatures.size();
    std::vector<int> ans(n, 0);
    std::stack<int> s; // Indices
    for (int i = 0; i < n; i++) {
        while (!s.empty() && temperatures[s.top()] < temperatures[i]) {
            int prevIdx = s.top();
            s.pop();
            ans[prevIdx] = i - prevIdx;
        }
        s.push(i);
    }
    return ans;
}`,
      typescript: `function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  const stack: number[] = []; // Stores indices
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const prevIdx = stack.pop()!;
      ans[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return ans;
}`,
    },
  },
  {
    id: 'pat-5',
    name: 'Tree Level-Order Traversal (Breadth-First Search)',
    category: 'Trees & Graphs',
    difficulty: 'Medium',
    frequency: 'Essential',
    leetCodeEquivalent: 'LeetCode 102 (Binary Tree Level Order Traversal), LeetCode 103 (Zigzag Traversal), LeetCode 199 (Right Side View)',
    moeExitExamRelevance: 'CoSc 2031 (DSA) and MoE Exit Exam Cluster 1: Trees and Queue ADT applications.',
    whenToUse: 'When traversing a tree level-by-level, finding the shortest distance in an unweighted tree, or printing hierarchical organizational charts.',
    timeComplexity: 'O(N) Time (visiting each node once)',
    spaceComplexity: 'O(W) Space where W is the maximum width of the tree',
    ethiopianRealWorldScenario: 'Rendering the administrative hierarchy of the Ethiopian Ministry of Innovation & Technology (Minister -> Directorates -> Department Heads -> Officers) level-by-level.',
    sampleInput: 'root = [3, 9, 20, null, null, 15, 7]',
    expectedOutput: '[[3], [9, 20], [15, 7]]',
    languages: {
      python: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root: TreeNode | None) -> list[list[int]]:
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level_size = len(queue)
        current_level = []
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(current_level)
    return result`,
      cpp: `#include <vector>
#include <queue>

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

std::vector<std::vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    std::vector<std::vector<int>> result;
    std::queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int levelSize = q.size();
        std::vector<int> currentLevel;
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            currentLevel.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(currentLevel);
    }
    return result;
}`,
      typescript: `class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}`,
    },
  },
  {
    id: 'pat-6',
    name: "Graph Topological Sort (Kahn's Algorithm)",
    category: 'Trees & Graphs',
    difficulty: 'Medium',
    frequency: 'Essential',
    leetCodeEquivalent: 'LeetCode 207 (Course Schedule), LeetCode 210 (Course Schedule II), LeetCode 269 (Alien Dictionary)',
    moeExitExamRelevance: 'CoSc 3011 (Algorithm Analysis) & MoE Exit Exam: Directed Acyclic Graph (DAG) ordering and cycle detection.',
    whenToUse: 'When given dependencies (Prerequisite courses, build systems, task pipelines) and you must determine a valid execution order or detect cyclic deadlock.',
    timeComplexity: 'O(V + E) Time',
    spaceComplexity: 'O(V + E) Space',
    ethiopianRealWorldScenario: 'Generating a legal 4-year graduation course schedule for an AAU AAiT or ASTU Computer Science student ensuring CoSc 1012 is taken before CoSc 2031, which is taken before CoSc 3011.',
    sampleInput: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
    expectedOutput: '[0, 1, 2, 3] or [0, 2, 1, 3] (A valid course sequence)',
    languages: {
      python: `from collections import deque, defaultdict

def find_order(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    adj = defaultdict(list)
    in_degree = [0] * num_courses
    for dest, src in prerequisites:
        adj[src].append(dest)
        in_degree[dest] += 1
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return order if len(order) == num_courses else []`,
      cpp: `#include <vector>
#include <queue>

std::vector<int> findOrder(int numCourses, const std::vector<std::vector<int>>& prerequisites) {
    std::vector<std::vector<int>> adj(numCourses);
    std::vector<int> inDegree(numCourses, 0);
    for (const auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }
    std::queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    std::vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    return order.size() == (size_t)numCourses ? order : std::vector<int>();
}`,
      typescript: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const adj = Array.from({ length: numCourses }, () => [] as number[]);
  const inDegree = new Array(numCourses).fill(0);
  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
    inDegree[dest]++;
  }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  const order: number[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    for (const neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return order.length === numCourses ? order : [];
}`,
    },
  },
  {
    id: 'pat-7',
    name: 'Dynamic Programming: 0/1 Knapsack & Coin Change',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    frequency: 'High - Very Common',
    leetCodeEquivalent: 'LeetCode 322 (Coin Change), LeetCode 416 (Partition Equal Subset Sum), LeetCode 300 (Longest Increasing Subsequence)',
    moeExitExamRelevance: 'Guaranteed question on CoSc 3011 semester exams and MoE Exit Exam algorithms cluster.',
    whenToUse: 'When problems have overlapping subproblems and optimal substructure (Making choices to maximize or minimize a value).',
    timeComplexity: 'O(Amount * N) Time',
    spaceComplexity: 'O(Amount) Space with 1D array optimization',
    ethiopianRealWorldScenario: 'Finding the minimum number of Ethiopian Birr banknotes (10, 50, 100, 200 ETB) to dispense a withdrawal amount from an ATM without running out of cash.',
    sampleInput: 'coins = [10, 50, 100, 200], amount = 360',
    expectedOutput: '4 notes (200 + 100 + 50 + 10 = 360 ETB)',
    languages: {
      python: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      cpp: `#include <vector>
#include <algorithm>

int coinChange(const std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int coin : coins) {
        for (int x = coin; x <= amount; x++) {
            dp[x] = std::min(dp[x], dp[x - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      typescript: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins) {
    for (let x = coin; x <= amount; x++) {
      dp[x] = Math.min(dp[x], dp[x - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    },
  },
  {
    id: 'pat-8',
    name: 'Binary Search on Solution Space',
    category: 'Heaps & Searching',
    difficulty: 'Medium',
    frequency: 'Advanced',
    leetCodeEquivalent: 'LeetCode 875 (Koko Eating Bananas), LeetCode 1011 (Capacity To Ship Packages Within D Days)',
    moeExitExamRelevance: 'CoSc 2031 (DSA) and algorithm design: Monotonic predicate functions and O(log N) boundaries.',
    whenToUse: 'When the answer exists within a bounded range [low, high] and there is a monotonic truth condition: if answer X works, all values > X work.',
    timeComplexity: 'O(N * log(Range)) Time',
    spaceComplexity: 'O(1) Space',
    ethiopianRealWorldScenario: 'Finding the minimum bandwidth bandwidth speed (Mbps) an Ethio Telecom university dorm hotspot needs to ensure all student downloads complete before curfew.',
    sampleInput: 'piles = [3, 6, 7, 11], h = 8',
    expectedOutput: '4 (Minimum hourly rate needed to finish within 8 hours)',
    languages: {
      python: `import math

def min_eating_speed(piles: list[int], h: int) -> int:
    left, right = 1, max(piles)
    def can_finish(speed: int) -> bool:
        return sum(math.ceil(p / speed) for p in piles) <= h

    ans = right
    while left <= right:
        mid = (left + right) // 2
        if can_finish(mid):
            ans = mid
            right = mid - 1  # Try a slower speed
        else:
            left = mid + 1   # Need faster speed
    return ans`,
      cpp: `#include <vector>
#include <algorithm>
#include <cmath>

int minEatingSpeed(const std::vector<int>& piles, int h) {
    int left = 1, right = *std::max_element(piles.begin(), piles.end());
    int ans = right;
    auto canFinish = [&](int speed) {
        long long hours = 0;
        for (int p : piles) hours += (p + speed - 1) / speed;
        return hours <= h;
    };
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (canFinish(mid)) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}`,
      typescript: `function minEatingSpeed(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);
  let ans = right;
  const canFinish = (speed: number) => {
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / speed);
    return hours <= h;
  };
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canFinish(mid)) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return ans;
}`,
    },
  },
];
