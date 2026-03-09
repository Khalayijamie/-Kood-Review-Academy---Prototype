export const reviewAcademyContent = {
  scenariosByCategory: {
    "cat-perfsec": [
      {
        id: "ps-1",
        title: "Leaky API key + repeated heavy loop",
        context:
          "You’re reviewing a small service that fetches weather data and computes daily stats.",
        goal:
          "Assess performance & security: secrets handling, efficiency, and safe defaults.",
        code: {
          language: "js",
          snippet: `// weatherService.js
const API_KEY = "sk_live_1234567890"; // TODO: move later

export async function getStats(days) {
  let result = [];
  for (let i = 0; i < days.length; i++) {
    // expensive: fetch same endpoint repeatedly even if day repeats
    const r = await fetch("https://api.weather.com/data?key=" + API_KEY);
    const data = await r.json();
    result.push({ day: days[i], avg: average(data.temps) });
  }
  return result;
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}`,
        },
        feedbackOptions: [
          {
            id: "poor",
            label: "Poor review",
            text:
              "Looks fine. Code works and seems clean. Approved.",
            whyBad: [
              "No evidence of testing or checks.",
              "Ignores hard-coded secret in code.",
              "Misses performance issue: repeated identical fetch.",
              "No suggestions for safer patterns.",
            ],
          },
          {
            id: "good",
            label: "Good review",
            text:
              "Two critical issues: (1) API key is hard-coded — move it to env/config and ensure it’s not committed. (2) getStats fetches the same endpoint for every day; consider caching the response once per run or batching requests. Also handle fetch failures (non-200) to fail safely.",
            whyGood: [
              "Identifies security risk (secret leakage) with a concrete fix.",
              "Identifies inefficiency with a concrete optimization path.",
              "Adds safe-failure recommendation.",
              "Grounded in evidence from code.",
            ],
          },
        ],
        quiz: {
          id: "ps-1-quiz",
          prompt:
            "Select ALL statements that are valid and evidence-based review feedback for this code.",
          options: [
            {
              id: "a",
              text:
                "Hard-coding an API key in the repository is unsafe; use environment variables or configuration instead.",
              correct: true,
              explain:
                "Correct: secrets should not be committed; env/config is safer.",
            },
            {
              id: "b",
              text:
                "The loop is inefficient because it fetches the same endpoint repeatedly; cache or reuse the fetched data where possible.",
              correct: true,
              explain:
                "Correct: repeated identical fetches are avoidable overhead.",
            },
            {
              id: "c",
              text:
                "This is insecure because JavaScript is insecure by nature; rewrite in Rust.",
              correct: false,
              explain:
                "Not evidence-based and not actionable for this code review.",
            },
            {
              id: "d",
              text:
                "Add handling for failed network calls (non-200, timeout) to avoid crashing or returning misleading results.",
              correct: true,
              explain:
                "Correct: safe defaults and error handling are relevant here.",
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
            "Select ALL review comments that improve maintainability without changing behavior.",
          options: [
            {
              id: "a",
              text: "Rename functions to reflect intent instead of doThing/doThing2.",
              correct: true,
              explain: "Clear naming improves readability and maintenance.",
            },
            {
              id: "b",
              text: "Extract the averaging logic to a helper to avoid duplication.",
              correct: true,
              explain: "DRY refactor improves maintainability.",
            },
            {
              id: "c",
              text: "This code is ugly; decline it.",
              correct: false,
              explain: "Not specific or actionable.",
            },
            {
              id: "d",
              text: "Rewrite everything using a new framework.",
              correct: false,
              explain: "Unnecessary and not evidence-based for this scope.",
            },
          ],
        },
      },
    ],
  },

  // Quick “guided overlay” steps (like the //kood tutorial cards)
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
};