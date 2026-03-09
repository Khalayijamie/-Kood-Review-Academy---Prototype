export const academy = {
  sprintTitle: "Reviewer Academy",
  learner: { name: "Sandra" },
  modules: [
    {
      id: "intro",
      type: "lesson",
      title: "Introduction to reviews",
      subtitle: "What a review is, why it matters, and how to do it well.",
      estimatedMins: 8,
      content: [
        {
          heading: "What is a review?",
          body:
            "A review is a structured evaluation of a project to verify correctness, quality, and understanding — while helping the submitter improve.",
        },
        {
          heading: "What makes a review valuable?",
          body:
            "A good review validates outcomes AND understanding. It is fair, specific, test-driven, and respectful.",
        },
        {
          heading: "What makes a review poor?",
          body:
            "Approving by default, vague feedback, skipping testing, or focusing on personal opinions instead of evidence.",
        },
      ],
    },

    {
      id: "categories",
      type: "categories",
      title: "Review categories framework",
      subtitle:
        "A reusable, agnostic framework to break down a project into reviewable parts.",
      estimatedMins: 6,
    },

    // Category deep-dives (each can later have scenarios + quizzes)
    {
      id: "cat-functional",
      type: "category",
      title: "Functional correctness",
      tag: "Core",
      estimatedMins: 10,
      definition:
        "Does the project behave according to the specification for typical and expected inputs?",
      subcategories: [
        {
          id: "func-reqs",
          title: "Meets requirements",
          guidance: [
            "Cross-check outputs against requirements.",
            "Verify key workflows end-to-end.",
            "Test at least 3 realistic user paths.",
          ],
        },
        {
          id: "func-consistency",
          title: "Consistency",
          guidance: [
            "Same input → same output.",
            "No random behavior unless specified.",
            "No hidden 'magic' states.",
          ],
        },
      ],
    },

    {
      id: "cat-errors",
      type: "category",
      title: "Error handling & edge cases",
      tag: "Core",
      estimatedMins: 12,
      definition:
        "Does the project handle invalid inputs, failures, and boundary conditions safely and predictably?",
      subcategories: [
        {
          id: "err-input",
          title: "Input validation",
          guidance: [
            "Check null/empty inputs where applicable.",
            "Validate format/ranges.",
            "Reject bad inputs with clear feedback or safe defaults.",
          ],
        },
        {
          id: "err-boundary",
          title: "Boundary cases",
          guidance: [
            "Test smallest/largest values.",
            "Test empty collections, single-element cases.",
            "Test unexpected user sequences.",
          ],
        },
      ],
    },

    {
      id: "cat-readability",
      type: "category",
      title: "Code readability & maintainability",
      tag: "Core",
      estimatedMins: 10,
      definition:
        "Is the code easy to understand, change, and extend without introducing bugs?",
      subcategories: [
        {
          id: "read-naming",
          title: "Naming & clarity",
          guidance: [
            "Functions describe actions; variables describe meaning.",
            "Avoid ambiguous names like temp, data, thing.",
            "Prefer small focused functions.",
          ],
        },
        {
          id: "read-structure",
          title: "Structure & duplication",
          guidance: [
            "Avoid repeated logic (DRY).",
            "Group related functions and files logically.",
            "Keep files focused on one purpose.",
          ],
        },
      ],
    },

    {
      id: "cat-architecture",
      type: "category",
      title: "Separation of concerns",
      tag: "Core",
      estimatedMins: 12,
      definition:
        "Is the codebase organized into clear responsibilities (UI vs logic, IO vs domain logic, etc.)?",
      subcategories: [
        {
          id: "arch-layers",
          title: "Clear boundaries",
          guidance: [
            "Avoid mixing IO with core logic.",
            "Keep modules responsible for one layer.",
            "Use interfaces/adapters where helpful (language-agnostic idea).",
          ],
        },
        {
          id: "arch-coupling",
          title: "Low coupling",
          guidance: [
            "Changes in one part shouldn’t break everything.",
            "Reduce global shared state when possible.",
            "Prefer passing dependencies explicitly.",
          ],
        },
      ],
    },

    {
      id: "cat-perfsec",
      type: "category",
      title: "Performance & security",
      tag: "Advanced",
      estimatedMins: 14,
      definition:
        "Does the project avoid obvious inefficiencies and protect sensitive data / dangerous operations?",
      subcategories: [
        {
          id: "ps-efficiency",
          title: "Efficiency",
          guidance: [
            "Avoid unnecessary loops or repeated heavy computations.",
            "Be mindful of data structures and algorithmic complexity.",
            "Measure before optimizing when possible.",
          ],
        },
        {
          id: "ps-secrets",
          title: "Secret handling",
          guidance: [
            "Never commit API keys or credentials.",
            "Use environment variables / config patterns.",
            "Avoid logging sensitive data.",
          ],
        },
        {
          id: "ps-safety",
          title: "Safe defaults",
          guidance: [
            "Validate user inputs used in file paths/queries/requests.",
            "Fail safely and avoid exposing internals.",
            "Minimize permissions/privileges where applicable.",
          ],
        },
      ],
    },

    {
      id: "ground-rules",
      type: "lesson",
      title: "Ground rules & roles",
      subtitle: "Responsibilities, tone, fairness, and the 7-day review rhythm.",
      estimatedMins: 8,
      content: [
        {
          heading: "Roles",
          body:
            "Reviewer: verify, test, explain, guide. Submitter: be prepared to explain and improve. Team lead: coordinate, ensure fairness and timeline.",
        },
        {
          heading: "Tone & communication",
          body:
            "Be specific and respectful. Critique the code, not the person. If you cannot justify a claim with evidence, don’t state it as fact.",
        },
        {
          heading: "Defaulting reviews",
          body:
            "Skipping reviews harms the community. It delays progress, reduces learning, and damages trust. Repeated issues should trigger retraining and reduced reviewer privileges.",
        },
      ],
    },
  ],
};