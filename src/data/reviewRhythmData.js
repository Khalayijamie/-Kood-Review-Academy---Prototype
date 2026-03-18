export const reviewRhythmByRole = {
  Reviewer: [
    { day: 1, icon: "📥", title: "Clone & run", body: "Clone the repo, follow the README, and get the project running locally." },
    { day: 2, icon: "👁️", title: "First pass", body: "Read through all test points. Note anything unclear or risky — don't wait until day 5." },
    { day: 3, icon: "💬", title: "Raise questions", body: "Post anything unclear in the Discord channel. Tag the submitter. Do not use DMs." },
    { day: 4, icon: "🔍", title: "Deep dive", body: "Test edge cases, check error handling, and verify each test point against the spec." },
    { day: 5, icon: "✍️", title: "Write feedback", body: "Write specific, evidence-based feedback for each test point. One claim, one proof, one suggestion." },
    { day: 6, icon: "🧪", title: "Verify fixes", body: "Check that fixes the submitter pushed actually resolve the issues you raised." },
    { day: 7, icon: "🎯", title: "Submit scores", body: "Submit final scores before the deadline. Justify every deduction in writing." },
  ],
  Submitter: [
    { day: 1, icon: "🚀", title: "Clean & document", body: "Ensure the repo is clean, the README is accurate, and all tests run locally before reviewers start." },
    { day: 2, icon: "📡", title: "Check in", body: "Check whether reviewers have started. If not, reach out in the Discord channel — not DMs." },
    { day: 3, icon: "💬", title: "Respond publicly", body: "Answer reviewer questions in the Discord channel. Written responses create a record for the team lead." },
    { day: 4, icon: "🔧", title: "Push fixes", body: "Push agreed fixes and post in Discord what changed and why — so reviewers know what to re-check." },
    { day: 5, icon: "📋", title: "Prep for the call", body: "Attend the review call prepared. Know your code, know the test points, know your trade-offs." },
    { day: 6, icon: "🔁", title: "Respond to feedback", body: "Review written feedback and reply to any unresolved comments. Do not leave things hanging." },
    { day: 7, icon: "✅", title: "Confirm completion", body: "Confirm the review is complete with the team lead. Make sure nothing is left open." },
  ],
  "Team lead": [
    { day: 1, icon: "🔑", title: "Confirm access", body: "Verify all 3 parties have repo access and are in the designated Discord channel before work starts." },
    { day: 2, icon: "📊", title: "Chase stragglers", body: "Check both reviewers have started. If anyone has not, chase them now — not on day 6." },
    { day: 3, icon: "🧭", title: "Moderate Discord", body: "Make sure questions from reviewers are getting answered. Step in if the submitter is silent." },
    { day: 4, icon: "🚨", title: "Flag blockers", body: "If a reviewer has gone silent or is stuck, escalate to kood support. Do not wait." },
    { day: 5, icon: "🎙️", title: "Facilitate the call", body: "Run the review call. Ensure every participant contributes. Document decisions in Discord after." },
    { day: 6, icon: "✔️", title: "Verify grading", body: "Confirm all test points are graded and every deduction has a written justification." },
    { day: 7, icon: "📝", title: "Close the review", body: "Submit the final summary. Confirm with all parties that the review is closed." },
  ],
};
