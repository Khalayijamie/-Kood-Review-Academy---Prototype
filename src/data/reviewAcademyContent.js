export const reviewAcademyContent = {
  scenariosByCategory: {
    "cat-perfsec": [
      {
        id: "ps-1",
        missionTitle: "Mission 1: Security Guardian",
        hook: {
          type: "dialogue",
          title: "Something feels off...",
          text: `Developer: "I just finished the weather stats feature."
Reviewer: "Nice. Mind if I take a closer look?"
Developer: "Sure — it works perfectly."`,
        },
        microLesson: [
          "Never expose API keys in source code.",
          "Avoid repeated expensive operations when one result can be reused.",
          "A good reviewer gives specific, evidence-based feedback.",
        ],
        context:
          "You are reviewing a weather statistics service. Check for performance and security issues.",
        code: {
          language: "js",
          snippet: `const API_KEY = "sk_live_123456789";

export async function getStats(days) {
  let result = [];

  for (let i = 0; i < days.length; i++) {
    const response = await fetch("https://api.weather.com/data?key=" + API_KEY);
    const data = await response.json();
    result.push({ day: days[i], avg: average(data.temps) });
  }

  return result;
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}`,
        },
        challenge: {
          type: "multi-select",
          prompt: "What should a good reviewer point out? Select all that apply.",
          options: [
            {
              id: "a",
              text: "The API key is hard-coded and should be moved to environment variables.",
              correct: true,
            },
            {
              id: "b",
              text: "The function should fetch the same endpoint repeatedly for better accuracy.",
              correct: false,
            },
            {
              id: "c",
              text: "The repeated fetch inside the loop may hurt performance and should be optimized.",
              correct: true,
            },
            {
              id: "d",
              text: "The code is perfect and can be approved immediately.",
              correct: false,
            },
          ],
        },
        feedback: {
          correctTitle: "You caught the real issues.",
          correctBody:
            "A strong reviewer should flag both the hard-coded secret and the repeated network call inside the loop. These are concrete, evidence-based concerns.",
          wrongTitle: "Not quite.",
          wrongBody:
            "Look for real risks in the code. Focus on security, efficiency, and whether the feedback is grounded in visible evidence.",
        },
        reward: {
          badge: "Security Guardian",
          xp: 20,
          message:
            "Great reviewer! You spotted a real-world security and performance problem.",
        },
        quiz: {
          id: "ps-1-quiz",
          prompt: "Select ALL comments that reflect a strong code review for this snippet.",
          options: [
            {
              id: "a",
              text: "The API key should be removed from source code and stored securely.",
              correct: true,
              explain: "Correct. Secrets should not be hard-coded.",
            },
            {
              id: "b",
              text: "Fetching the same endpoint inside the loop may be inefficient.",
              correct: true,
              explain: "Correct. Repeated network calls can be wasteful.",
            },
            {
              id: "c",
              text: "The code is good enough. Approve immediately.",
              correct: false,
              explain: "Not a strong review. It ignores visible issues.",
            },
            {
              id: "d",
              text: "A reviewer should mention possible error handling improvements too.",
              correct: true,
              explain: "Correct. Safe failure handling matters.",
            },
          ],
        },
      },
    ],

    "cat-readability": [
      {
        id: "read-1",
        title: "Confusing naming + duplication",
        context:
          "You’re reviewing a small utility library used by others in the cohort.",
        goal:
          "Assess readability: naming, duplication, and structure.",
        code: {
          language: "js",
          snippet: `// utils.js
export function doThing(a, b) {
  let x = 0;
  for (let i = 0; i < a.length; i++) x += a[i];
  return x / a.length + b;
}

export function doThing2(a, b) {
  let x = 0;
  for (let i = 0; i < a.length; i++) x += a[i];
  return x / a.length - b;
}`,
        },
        feedbackOptions: [
          {
            id: "poor",
            label: "Poor review",
            text: "Naming is bad. Fix it.",
            whyBad: [
              "Vague, not actionable.",
              "No examples or guidance.",
              "Misses duplication/refactor opportunity.",
            ],
          },
          {
            id: "good",
            label: "Good review",
            text:
              "Consider renaming doThing/doThing2 to describe intent (e.g., averagePlusOffset / averageMinusOffset). Also both functions duplicate the averaging loop; extract average(a) once to reduce repetition and improve readability.",
            whyGood: [
              "Specific suggestions with examples.",
              "Identifies duplication and offers a clean refactor.",
              "Focuses on maintainability.",
            ],
          },
        ],
        quiz: {
          id: "read-1-quiz",
          prompt:
            "You're reviewing helpers.js for readability. Select ALL review comments that are specific, actionable, and evidence-based.",
          options: [
            {
              id: "a",
              text: "fn1 and fn2 have names that reveal nothing about their purpose — rename them to describe what they compute (e.g., average, weightedAverage).",
              correct: true,
              explain:
                "Correct: function names should describe behavior so callers don't need to read the implementation.",
            },
            {
              id: "b",
              text: "fn1 and fn2 contain the same averaging loop — extract it into a shared helper (e.g., average(arr)) to eliminate duplication.",
              correct: true,
              explain:
                "Correct: duplicated logic is harder to change correctly — a shared helper removes the risk of one copy diverging.",
            },
            {
              id: "c",
              text: "The variable r is unclear — a name like sum or total would make the intent obvious at a glance.",
              correct: true,
              explain:
                "Correct: single-letter accumulator names require the reader to trace the loop to understand the value.",
            },
            {
              id: "d",
              text: "These functions are too short and should be merged into one larger function for efficiency.",
              correct: false,
              explain:
                "Merging them would reduce clarity, not improve it. Short, focused functions are a readability strength.",
            },
          ],
        },
      },
    ],
  },

  guidedOverlays: {
    intro: [
      {
        title: "Welcome to Reviewer Academy",
        body:
          "You’ve completed the selection sprint. Now you’ll learn the second pillar of //kood: reviewing.",
      },
      {
        title: "Reviews are a skill",
        body:
          "A good review checks correctness AND understanding. It is structured, fair, and evidence-based.",
      },
      {
        title: "You’ll learn in cycles",
        body:
          "Category → sub-categories → practice scenarios → MCQ tests → next category.",
      },
    ],
    categories: [
      {
        title: "A reusable framework",
        body:
          "We break any project into categories (functional, errors, readability, architecture, performance & security).",
      },
      {
        title: "Modular & extensible",
        body:
          "Small projects may use fewer categories. Bigger projects can add custom categories.",
      },
      {
        title: "Refresher training",
        body:
          "You can revisit any category before a real review. Low ratings can trigger mandatory retraining.",
      },
    ],
  },
  categoriesFunContent: {
    memes: [
      {
        src: "/memes/review1.jpg",
        alt: "Review meme 1",
        caption: "When your code review finds more bugs than the tests...",
      },
      {
        src: "/memes/review2.png",
        alt: "Review meme 2",
        caption: "Reviewer: 'This looks good.' Developer: 'Wait, really?'",
      },
    ],
    video: {
      title: "The Art of Code Review",
      description: "Learn why structured reviews make better code and happier teams.",
      youtubeId: "dQw4w9WgXcQ", // Placeholder, replace with actual ID
    },
  },
};