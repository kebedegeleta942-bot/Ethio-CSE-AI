import { StudentProfile, AILearningMode, QuizQuestion } from '../types';

export interface ChatMessagePayload {
  role: 'user' | 'model';
  content: string;
}

export async function sendCopilotChat(
  messages: ChatMessagePayload[],
  studentProfile?: StudentProfile,
  triggerContext?: string,
  mode?: AILearningMode
): Promise<string> {
  try {
    const res = await fetch('/api/copilot/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, studentProfile, triggerContext, mode }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data.reply;
  } catch (error: any) {
    console.error('Error in sendCopilotChat:', error);
    throw error;
  }
}

export async function generateQuizWithAI(
  courseTitle: string,
  topic: string,
  difficulty: string,
  academicLevel: string,
  count: number = 4
): Promise<QuizQuestion[]> {
  try {
    const res = await fetch('/api/copilot/quiz-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseTitle, topic, difficulty, academicLevel, count }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data.questions || [];
  } catch (error: any) {
    console.error('Error generating quiz:', error);
    throw error;
  }
}

export async function generateStudyPlanWithAI(
  studentProfile: StudentProfile,
  availableHours: number,
  upcomingDeadlines?: string
): Promise<string> {
  try {
    const res = await fetch('/api/copilot/study-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentProfile, availableHours, upcomingDeadlines }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data.plan;
  } catch (error: any) {
    console.error('Error generating study plan:', error);
    throw error;
  }
}

export async function searchJobsWithAI(query: string, category: string): Promise<string> {
  try {
    const res = await fetch('/api/copilot/search-jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, category }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data.result;
  } catch (error: any) {
    console.error('Error searching jobs:', error);
    throw error;
  }
}

export async function searchEthiopianJobs(
  query: string,
  academicLevel?: string
): Promise<any[]> {
  try {
    const res = await fetch('/api/copilot/search-jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, category: 'ethiopian', academicLevel }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    if (Array.isArray(data.jobs)) {
      return data.jobs;
    }
    if (data.result) {
      return [
        {
          title: query,
          company: 'Ethiopian Tech Opportunities & Portal Listings',
          location: 'Addis Ababa / Regional Hubs / Remote',
          description: data.result,
          requirements: 'Computing / CSE Foundations & Practical Portfolio',
        },
      ];
    }
    return [];
  } catch (error: any) {
    console.error('Error in searchEthiopianJobs:', error);
    throw error;
  }
}

export async function analyzeEthiopianIdea(
  idea: string,
  context?: string,
  academicLevel?: string
): Promise<string> {
  try {
    const res = await fetch('/api/copilot/analyze-idea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea, context, academicLevel }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data.analysis;
  } catch (error: any) {
    console.error('Error analyzing idea:', error);
    throw error;
  }
}

export async function breakDownStuckTask(
  task: string,
  obstacle?: string,
  academicLevel?: string
): Promise<string> {
  try {
    const res = await fetch('/api/copilot/breakdown-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, obstacle, academicLevel }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data.breakdown;
  } catch (error: any) {
    console.error('Error breaking down task:', error);
    throw error;
  }
}

export async function reviewCodeAntiDependence(
  code: string,
  language: string,
  intent: string,
  academicLevel?: string
): Promise<string> {
  try {
    const res = await fetch('/api/copilot/code-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language, intent, academicLevel }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data.review;
  } catch (error: any) {
    console.error('Error in code review:', error);
    throw error;
  }
}
