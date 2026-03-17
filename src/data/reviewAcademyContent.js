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
              explain: "Correct: once committed, a key is permanent in git history even if deleted later. It must move to env vars before merge.",
              goodReview: "API_KEY on line 1 is committed to source — this key is now in git history permanently, even if deleted. Move to process.env.WEATHER_API_KEY, add a .env.example entry, and ensure .env is in .gitignore. The current key may also need to be rotated.",
              badReview: "Don't hardcode the API key.",
            },
            {
              id: "b",
              text: "The function should fetch the same endpoint repeatedly for better accuracy.",
              correct: false,
              explain: "Not valid: fetching the same URL multiple times doesn't improve data accuracy — it just wastes network resources.",
            },
            {
              id: "c",
              text: "The repeated fetch inside the loop may hurt performance and should be optimized.",
              correct: true,
              explain: "Correct: the endpoint URL is identical on every iteration. Fetching once before the loop reduces N round-trips to 1.",
              goodReview: "fetch() is called once per day inside the loop (line 8), but the endpoint URL is the same every time. If the API returns all available data, fetch once before the loop: const data = await fetch(...).json() and reuse it inside. This reduces N network calls to 1.",
              badReview: "The fetch is inside a loop — move it outside.",
            },
            {
              id: "d",
              text: "The code is perfect and can be approved immediately.",
              correct: false,
              explain: "Not valid: a hardcoded secret and a repeated network call are visible issues. Approving without flagging them is a default approval — not a review.",
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
      },
    ],

    "cat-readability": [
      {
        id: "read-1",
        missionTitle: "Mission: Code Whisperer 📖",
        hook: {
          type: "dialogue",
          title: "What does doThing do?",
          text: `Reviewer: "What does doThing do?"
Developer: "It... calculates the average."
Reviewer: "Then why isn’t it called average?"
Developer: "I didn’t really think about the name."`,
        },
        microLesson: [
          "Names are the first documentation a reader sees — make them say what the code does. 🏷️",
          "Duplicated logic creates two places to fix every bug. 🪲🪲",
          "A 5-second rename today pays back hours of confusion later. ⏱️",
        ],
        context:
          "You’re reviewing a small utility library used by others in the cohort.",
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
        challenge: {
          type: "multi-select",
          prompt: "Which of these belong in a quality readability review? Select all that apply.",
          options: [
            {
              id: "a",
              text: "Rename doThing and doThing2 to describe what they compute (e.g. averagePlusOffset / averageMinusOffset).",
              correct: true,
              explain: "Correct: function names are the first thing a caller reads. They should describe the contract, not require reading the body.",
              goodReview: "doThing computes average(a) + b and doThing2 computes average(a) - b, but neither name communicates that. Suggest renaming to averagePlusOffset(values, offset) and averageMinusOffset(values, offset) — callers won't need to open the file to understand what they do.",
              badReview: "The function names are confusing. Rename them.",
            },
            {
              id: "b",
              text: "Both functions duplicate the averaging loop — extract it into a shared helper to remove repetition.",
              correct: true,
              explain: "Correct: identical logic in two places means any future bug fix or change must be made twice — and both copies must stay in sync.",
              goodReview: "Lines 2–4 of doThing and lines 8–10 of doThing2 are identical. Extract to: function average(arr) { let s = 0; for (let i = 0; i < arr.length; i++) s += arr[i]; return s / arr.length; } — removes 4 lines of duplication and gives the concept a name.",
              badReview: "There's a lot of repetition here. Clean it up.",
            },
            {
              id: "c",
              text: "This code is fine as-is — it works correctly, so approve it.",
              correct: false,
              explain: "Not valid: code that works can still be unreadable and hard to maintain. Functional correctness is one concern — readability is a separate, equally important one.",
            },
            {
              id: "d",
              text: "The variable x is unclear — a name like sum would make the intent obvious at a glance.",
              correct: true,
              explain: "Correct: x accumulates a running total but its name reveals nothing. A reader must trace the loop to understand what it holds.",
              goodReview: "In both functions, x is used as a running sum but named x. Renaming to sum makes the intent clear without reading the loop body. The change is trivial and costs nothing.",
              badReview: "Variable x is a bad name.",
            },
          ],
        },
        feedback: {
          correctTitle: "Sharp eye, Code Whisperer! 📖",
          correctBody:
            "Renaming doThing, extracting the shared loop, and clarifying x are all specific, evidence-based improvements. They make future changes safer and faster for the whole team.",
          wrongTitle: "Think about what the next developer will see.",
          wrongBody:
            "Code that ‘works’ isn’t necessarily readable. Focus on names and duplication — the two most common blockers for anyone who has to change this code later.",
        },
        reward: {
          badge: "📖 Code Whisperer",
          xp: 20,
          message:
            "You spotted naming and duplication issues — the two most common readability blockers in any codebase.",
        },
      },
    ],

    "cat-functional": [
      {
        id: "func-1",
        missionTitle: "Mission: Bug Detective 🐛",
        hook: {
          type: "dialogue",
          title: "Something’s wrong at checkout...",
          text: `QA Tester: "I tested the cart and got charged $0 for a $250 order."
Developer: "Impossible — I tested it with a $20 cart."
Reviewer: "Let me check the discount logic..."`,
        },
        microLesson: [
          "Compare every code path against the spec — even if it ‘works’ locally. 📋",
          "Test boundary values: exactly at the limit, just below, just above. 🎯",
          "One wrong multiplier can break the entire feature silently. 💥",
        ],
        context:
          "You’re reviewing a checkout function. Spec says: 20% off when total > 200, 10% off when total > 100.",
        code: {
          language: "js",
          snippet: `// checkout.js
// Spec: 20% off when total > 200, 10% off when total > 100

export function applyDiscount(total) {
  if (total > 200) return total * 0.9;  // applying 10% off
  if (total > 100) return total * 0.8;  // applying 20% off
  return total;
}`,
        },
        challenge: {
          type: "multi-select",
          prompt: "What should the reviewer flag? Select all that apply.",
          options: [
            {
              id: "a",
              text: "The percentages are swapped — total > 200 gives 10% off but the spec says 20% off.",
              correct: true,
              explain: "Correct: total * 0.9 = 90% of total = 10% off. But the spec says 20% off for totals > 200. The multipliers are swapped between both branches.",
              goodReview: "applyDiscount(250) returns 225, but the spec says 20% off should give 200. Line 4 uses * 0.9 (10% off) where it should be * 0.8 (20% off). The multipliers appear swapped: line 4 should be * 0.8 and line 5 should be * 0.9.",
              badReview: "The discount percentages are wrong. Fix them.",
            },
            {
              id: "b",
              text: "Testing with values like 50, 150, and 250 would expose this bug immediately.",
              correct: true,
              explain: "Correct: testing one value per branch (below 100, between 100–200, above 200) is the minimum to verify all paths against the spec.",
              goodReview: "Before approval, verify these three inputs match the spec: total=50 → expected 50 (no discount); total=150 → expected 135 (10% off); total=250 → expected 200 (20% off). Currently total=250 returns 225 — which confirms the swapped multipliers.",
              badReview: "This needs more testing.",
            },
            {
              id: "c",
              text: "The function works correctly — multiplying by 0.9 is an efficient approach.",
              correct: false,
              explain: "Not valid: multiplication is a fine approach — the problem is which value is used in which branch. Efficiency is not the concern here.",
            },
            {
              id: "d",
              text: "The variable name ‘total’ is ambiguous and should be renamed.",
              correct: false,
              explain: "Not valid: ‘total’ clearly describes a monetary sum. Renaming it is a style preference with no evidence of confusion.",
            },
          ],
        },
        feedback: {
          correctTitle: "Bug caught, detective! 🐛",
          correctBody:
            "You spotted the swapped multipliers and knew to suggest boundary testing. This is exactly how a functional correctness review works — compare the code to the spec line by line.",
          wrongTitle: "Look closer at the spec.",
          wrongBody:
            "The bug is subtle — the discount percentages are swapped between the two branches. A reviewer should always test with values above, at, and below each threshold.",
        },
        reward: {
          badge: "🐛 Bug Detective",
          xp: 20,
          message:
            "You can spot a functional correctness bug — the foundation of a good code review.",
        },
      },
    ],

    "cat-errors": [
      {
        id: "err-1",
        missionTitle: "Mission: Edge Case Explorer 🔍",
        hook: {
          type: "dialogue",
          title: "But it works on my machine...",
          text: `Developer: "The login function works perfectly."
Reviewer: "What happens if someone leaves the email field blank?"
Developer: "...I didn’t test that."
Reviewer: "Let’s look."`,
        },
        microLesson: [
          "Edge cases are not rare — they’re the conditions real users hit when things go wrong. 🌩️",
          "Null, undefined, and empty inputs are the most common crash triggers. 💣",
          "A review that only tests the happy path misses half the job. 😅",
        ],
        context:
          "You’re reviewing an authentication helper that looks up a user by email address.",
        code: {
          language: "js",
          snippet: `// auth.js
export function getUserByEmail(users, email) {
  const user = users.find(u => u.email === email);
  return {
    name: user.name,
    role: user.role,
    active: user.active,
  };
}`,
        },
        challenge: {
          type: "multi-select",
          prompt: "What edge cases should the reviewer flag? Select all that apply.",
          options: [
            {
              id: "a",
              text: "If no user matches, user is undefined — accessing user.name will throw a TypeError.",
              correct: true,
              explain: "Correct: Array.find() returns undefined when no match is found. The function then tries to read user.name on undefined, which crashes.",
              goodReview: "I tested getUserByEmail([], ‘test@x.com’) — it throws: TypeError: Cannot read properties of undefined (reading ‘name’). Add a guard after line 2: if (!user) return null — this makes the failure explicit and safe for all callers.",
              badReview: "Error handling is missing. This will crash.",
            },
            {
              id: "b",
              text: "There’s no validation for an empty or null email argument.",
              correct: true,
              explain: "Correct: calling with null, undefined, or ‘’ means no user will ever match, which silently returns bad data — or could throw in strict environments.",
              goodReview: "getUserByEmail(users, null) and getUserByEmail(users, ‘’) both silently return no match with no signal to the caller. Suggest adding at the top: if (!email) throw new Error(‘email is required’) — this makes the contract explicit.",
              badReview: "There’s no input validation. Add some.",
            },
            {
              id: "c",
              text: "The function should always return null instead of an object.",
              correct: false,
              explain: "Not valid: the function should return the user when found. Returning null always would break all correct usage.",
            },
            {
              id: "d",
              text: "The function name getUserByEmail is too long and should be shortened.",
              correct: false,
              explain: "Not a valid edge-case concern: getUserByEmail is descriptive and standard. Naming is a readability concern — not relevant to error handling.",
            },
          ],
        },
        feedback: {
          correctTitle: "Edge cases found! 🔍",
          correctBody:
            "You identified that a missing user causes a crash and that an empty email is never validated. Both are real bugs waiting to happen on the first user mistake.",
          wrongTitle: "Test the unhappy paths.",
          wrongBody:
            "What happens when there’s no match? What if email is null or empty? A good reviewer always asks: what could go wrong with the input?",
        },
        reward: {
          badge: "🔍 Edge Case Explorer",
          xp: 20,
          message:
            "You protected users from crashes that only happen when things go wrong — which is exactly when they matter most.",
        },
      },
    ],

    "cat-architecture": [
      {
        id: "arch-1",
        missionTitle: "Mission: Concern Separator ⚙️",
        hook: {
          type: "dialogue",
          title: "Can I test the total without a database?",
          text: `Reviewer: "I want to write a unit test for the order total calculation."
Developer: "Sure — just spin up the test database first."
Reviewer: "...why does calculating a total need a database?"`,
        },
        microLesson: [
          "Mixing IO with logic makes code hard to test and painful to change. 🧩",
          "Each function should have one job: either compute OR store, not both. 🎯",
          "Separation isn’t about clean code style — it’s about avoiding fragility. 🛡️",
        ],
        context:
          "You’re reviewing an order processing module that calculates totals and saves orders to a database.",
        code: {
          language: "js",
          snippet: `// orders.js
export async function processOrder(items) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );
  const tax = subtotal * 0.2;
  const total = subtotal + tax;

  await db.insert("orders", { subtotal, tax, total });
  await emailService.sendConfirmation(total);
  console.log("Order processed:", total);

  return total;
}`,
        },
        challenge: {
          type: "multi-select",
          prompt: "What architectural concerns should the reviewer flag? Select all that apply.",
          options: [
            {
              id: "a",
              text: "The function mixes computation and persistence — they’re hard to test independently.",
              correct: true,
              explain: "Correct: to unit-test the order total calculation, you’d need a real database connection. Pure logic and IO should be separated.",
              goodReview: "processOrder handles both total calculation and DB writes in one function — to test just the math, you need a live database. Suggest splitting into calculateOrder(items) → { subtotal, tax, total } (pure, testable without DB) and saveOrder(data) (handles persistence). Each can then be tested and changed independently.",
              badReview: "This function does too much. Separate the concerns.",
            },
            {
              id: "b",
              text: "console.log in production code should be replaced with structured logging or removed.",
              correct: true,
              explain: "Correct: console.log writes financial data to server output with no log level, no filtering, and no way to disable it per environment.",
              goodReview: "Line 9 logs the order total with console.log. In production this exposes financial data in plain server logs with no log level or filtering. Suggest removing, or replacing with logger.info({ event: ‘order_processed’, total }) using the project’s structured logger.",
              badReview: "Remove the console.log from production.",
            },
            {
              id: "c",
              text: "Using async/await here adds unnecessary complexity.",
              correct: false,
              explain: "Not valid: async/await is appropriate and more readable than callbacks for sequential DB and email operations. The complexity comes from the mixed concerns, not from async/await itself.",
            },
            {
              id: "d",
              text: "The 20% tax rate is hardcoded — extracting it to a config value is a valid architectural concern.",
              correct: true,
              explain: "Correct: a business rule embedded inside a function is invisible to the caller and hard to update safely when tax rates change.",
              goodReview: "The 0.2 tax rate on line 4 is a business rule buried in logic. Extract to: const TAX_RATE = 0.2 at the module top (or load from config). This signals it’s a business value, makes it easy to find and update, and avoids magic numbers inside functions.",
              badReview: "The tax rate is hardcoded. Make it a constant.",
            },
          ],
        },
        feedback: {
          correctTitle: "Concerns separated! ⚙️",
          correctBody:
            "You identified mixed responsibilities, a debug log in production, and a hardcoded business rule. These are classic architecture concerns that make code fragile over time.",
          wrongTitle: "Think about what changes together.",
          wrongBody:
            "This function does calculation, database writes, emails, and logging. That’s four reasons to change it — which means four ways it can break independently.",
        },
        reward: {
          badge: "⚙️ Concern Separator",
          xp: 20,
          message:
            "You recognized that when one function does too much, tests get harder and bugs find places to hide.",
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