import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";
import { reviewAcademyContent } from "../data/reviewAcademyContent";
import { academy } from "../data/reviewAcademy";

function CodeBlock({ language, snippet }) {
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111922] border-b border-gray-800">
        <div className="text-gray-400 text-xs uppercase tracking-wider">
          Code • {language}
        </div>
      </div>
      <pre className="p-4 text-sm text-gray-200 overflow-auto leading-relaxed">
        <code>{snippet}</code>
      </pre>
    </div>
  );
}

export default function Quiz() {
  const { id, quizId } = useParams();
  const nav = useNavigate();

  const category = academy.modules.find((m) => m.id === id);

  const scenario = useMemo(() => {
    const scenarios = reviewAcademyContent.scenariosByCategory[id] || [];
    return scenarios.find((s) => s.quiz?.id === quizId) || null;
  }, [id, quizId]);

  const quiz = scenario?.quiz || null;

  const [selected, setSelected] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  if (!category || !scenario || !quiz) {
    return <div className="text-gray-300">Quiz not found.</div>;
  }

  const toggleOption = (optionId) => {
    if (submitted) return;

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(optionId)) next.delete(optionId);
      else next.add(optionId);
      return next;
    });
  };

  const score = () => {
    let correct = 0;
    for (const option of quiz.options) {
      const picked = selected.has(option.id);
      if (picked === option.correct) correct += 1;
    }
    return { correct, total: quiz.options.length };
  };

  const result = score();
  const perfect = result.correct === result.total;

  return (
    <div className="max-w-6xl">
      <Card>
        <CardHeader
          title={`Knowledge Check: ${category.title}`}
          subtitle="Review the code like a real reviewer and select all answers that apply."
          right={
            <Pill tone={category.tag === "Advanced" ? "advanced" : "core"}>
              {category.tag}
            </Pill>
          }
        />

        <CardBody>
          <div className="space-y-6">
            <div className="border border-gray-800 rounded-xl p-6 bg-[#111922]">
              <div className="text-koodAccent text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                Learning points
              </div>

              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                {scenario.microLesson.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="border border-gray-800 rounded-xl p-6">
              <div className="text-koodAccent text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                Quiz code
              </div>

              <p className="text-gray-300 mb-4">
                Imagine this code is part of a pull request you are reviewing.
              </p>

              <CodeBlock
                language={scenario.code.language}
                snippet={scenario.code.snippet}
              />
            </div>

            <div className="border border-gray-800 rounded-2xl p-6">
              <div className="text-gray-400 text-sm mb-3">Question</div>

              <h2 className="text-2xl font-semibold leading-relaxed mb-6">
                {quiz.prompt}
              </h2>

              <div className="space-y-4">
                {quiz.options.map((option) => {
                  const picked = selected.has(option.id);
                  const isCorrect = option.correct;

                  let cardClasses =
                    "border-gray-800 bg-transparent hover:bg-[#1a232e]";
                  let explanationTone = "text-gray-400";

                  if (submitted) {
                    if (picked && isCorrect) {
                      cardClasses = "border-green-500 bg-green-900/15";
                      explanationTone = "text-green-300";
                    } else if (picked && !isCorrect) {
                      cardClasses = "border-red-500 bg-red-900/15";
                      explanationTone = "text-red-300";
                    } else if (!picked && isCorrect) {
                      cardClasses = "border-yellow-500 bg-yellow-900/15";
                      explanationTone = "text-yellow-300";
                    } else {
                      cardClasses = "border-gray-800 bg-transparent";
                      explanationTone = "text-gray-500";
                    }
                  } else if (picked) {
                    cardClasses = "border-koodAccent bg-[#202b38]";
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`w-full text-left border rounded-2xl p-6 transition ${cardClasses}`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={[
                            "mt-1 h-7 w-7 rounded-md border flex items-center justify-center text-sm shrink-0",
                            picked
                              ? "border-koodAccent bg-koodAccent text-black"
                              : "border-gray-600 text-transparent",
                          ].join(" ")}
                        >
                          ✓
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-100 text-lg leading-relaxed">
                            {option.text}
                          </p>

                          {submitted && (
                            <p className={`mt-3 text-sm leading-relaxed ${explanationTone}`}>
                              {option.explain}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {!submitted ? (
                  <Button onClick={() => setSubmitted(true)}>Submit Quiz</Button>
                ) : (
                  <>
                    <div className="text-gray-200">
                      Score:{" "}
                      <span className="font-semibold text-white">
                        {result.correct}/{result.total}
                      </span>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-sm border ${
                        perfect
                          ? "border-green-500 bg-green-900/15 text-green-300"
                          : "border-yellow-500 bg-yellow-900/15 text-yellow-300"
                      }`}
                    >
                      {perfect
                        ? "Excellent review thinking"
                        : "Good attempt — learn from the highlights"}
                    </div>
                  </>
                )}
              </div>
            </div>

            {submitted && (
              <>
                <div className="border border-gray-800 rounded-xl p-6 bg-[#111922]">
                  <div className="text-koodAccent text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                    Takeaway
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    Strong review comments are specific, actionable, and grounded
                    in visible evidence. A good reviewer explains what the issue
                    is, why it matters, and what improvement could be made.
                  </p>
                </div>

                <div className="border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🏅</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {perfect ? "Insight Unlocked" : "Reviewer Growth"}
                  </h3>
                  <p className="text-koodAccent font-semibold mb-2">
                    {perfect ? "+20 XP" : "+10 XP"}
                  </p>
                  <p className="text-gray-300">
                    {perfect
                      ? "You reviewed this like a thoughtful teammate."
                      : "You’re building real review instincts. Keep going."}
                  </p>
                </div>
              </>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => nav(`/academy/${id}/practice`)}
              >
                Back to practice
              </Button>

              <Button variant="secondary" onClick={() => nav(`/academy/${id}`)}>
                Back to lesson
              </Button>

              <Button onClick={() => nav("/academy/categories")}>
                Back to framework
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}