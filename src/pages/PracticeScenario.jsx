import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { academy } from "../data/reviewAcademy";
import { reviewAcademyContent } from "../data/reviewAcademyContent";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";

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

function MemeBreak({ emoji, caption, insight }) {
  return (
    <div className="border border-dashed border-gray-700 rounded-xl p-6 bg-[#0d1820] text-center">
      <div className="text-6xl mb-3">{emoji}</div>
      <div className="text-lg font-bold text-white mb-1">{caption}</div>
      <div className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">{insight}</div>
    </div>
  );
}

function CollapsibleCode({ language, snippet }) {
  const [expanded, setExpanded] = useState(false);
  const lines = snippet.split("\n");
  const preview = lines.slice(0, 8).join("\n");
  const hasMore = lines.length > 8;

  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111922] border-b border-gray-800">
        <div className="text-gray-400 text-xs uppercase tracking-wider">Code • {language} (read-only)</div>
        {hasMore && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs text-koodAccent hover:underline"
          >
            {expanded ? "show less" : "show full code"}
          </button>
        )}
      </div>
      <pre className="p-4 text-sm text-gray-200 overflow-auto leading-relaxed">
        <code>{expanded || !hasMore ? snippet : preview + "\n..."}</code>
      </pre>
    </div>
  );
}

export default function PracticeScenario() {
  const { id } = useParams();
  const nav = useNavigate();

  const category = academy.modules.find((m) => m.id === id);
  const scenarios = reviewAcademyContent.scenariosByCategory[id] || [];
  const scenario = scenarios[0];

  const [stage, setStage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Agenda Builder state
  const [agendaText, setAgendaText] = useState("");
  const [agendaSubmitted, setAgendaSubmitted] = useState(false);
  const [examplesOpen, setExamplesOpen] = useState(false);

  if (!category || !scenario) {
    return (
      <div className="max-w-5xl">
        <Card>
          <CardHeader
            title="Practice scenario"
            subtitle="No scenario found for this category yet."
          />
          <CardBody>
            <Button onClick={() => nav("/academy/categories")}>
              Back to framework
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  const toggleOption = (optionId) => {
    if (submitted) return;
    setSelected((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const correctIds = scenario.challenge.options
    .filter((opt) => opt.correct)
    .map((opt) => opt.id);

  const isAnswerCorrect =
    selected.length === correctIds.length &&
    correctIds.every((id) => selected.includes(id));

  const nextStage = () => setStage((prev) => prev + 1);
  const prevStage = () => setStage((prev) => Math.max(0, prev - 1));

  // 7 stages: 0=hook 1=microLesson 2=code 3=challenge 4=feedback 5=agendaBuilder 6=reward
  const TOTAL_STAGES = 7;

  return (
    <div className="max-w-6xl">
      <Card>
        <CardHeader
          title={scenario.missionTitle}
          subtitle={scenario.context}
          right={<Pill tone="advanced">{category.tag}</Pill>}
        />
        <CardBody>
          {/* Progress bar — 7 segments */}
          <div className="mb-6 flex items-center gap-2">
            {Array.from({ length: TOTAL_STAGES }).map((_, s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= stage ? "bg-koodAccent" : "bg-[#243241]"
                }`}
              />
            ))}
          </div>

          {/* Stage 0 — Hook */}
          {stage === 0 && (
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="text-koodAccent text-sm font-semibold uppercase tracking-widest mb-3">
                Hook
              </div>
              <h3 className="text-2xl font-bold mb-4">{scenario.hook.title}</h3>
              <div className="bg-[#111922] border border-gray-800 rounded-xl p-4 whitespace-pre-line text-gray-300">
                {scenario.hook.text}
              </div>
            </div>
          )}

          {/* Stage 1 — Micro Lesson */}
          {stage === 1 && (
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="text-koodAccent text-sm font-semibold uppercase tracking-widest mb-3">
                Micro Lesson
              </div>
              <h3 className="text-2xl font-bold mb-4">What to watch for</h3>
              <ul className="space-y-3 text-gray-300 list-disc list-inside">
                {scenario.microLesson.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Stage 2 — Code Example */}
          {stage === 2 && (
            <div className="space-y-4">
              <div className="border border-gray-800 rounded-xl p-6">
                <div className="text-koodAccent text-sm font-semibold uppercase tracking-widest mb-3">
                  Code Example
                </div>
                <h3 className="text-2xl font-bold mb-4">Review this code</h3>
                <p className="text-gray-300 mb-4">{scenario.context}</p>
                <CodeBlock
                  language={scenario.code.language}
                  snippet={scenario.code.snippet}
                />
              </div>
            </div>
          )}

          {/* Stage 3 — Challenge */}
          {stage === 3 && (
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="text-koodAccent text-sm font-semibold uppercase tracking-widest mb-3">
                Challenge
              </div>
              <h3 className="text-2xl font-bold mb-4">{scenario.challenge.prompt}</h3>

              {submitted && (
                <div className="mb-5 flex items-center gap-3">
                  {isAnswerCorrect ? (
                    <div className="flex items-center gap-2 text-green-400 font-semibold text-lg">
                      <span>🎯</span><span>All correct — you nailed it!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-400 font-semibold text-lg">
                      <span>💡</span><span>Good try — review the breakdown below.</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4">
                {scenario.challenge.options.map((option) => {
                  const picked = selected.includes(option.id);
                  const correct = option.correct;

                  let borderClass = "border-gray-800";
                  let bgClass = "";
                  let badge = null;

                  if (submitted) {
                    if (picked && correct) {
                      borderClass = "border-green-500";
                      bgClass = "bg-green-900/10";
                      badge = <span className="shrink-0 text-xs font-bold text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">✓ Correct</span>;
                    } else if (picked && !correct) {
                      borderClass = "border-red-500";
                      bgClass = "bg-red-900/10";
                      badge = <span className="shrink-0 text-xs font-bold text-red-400 bg-red-900/30 px-2 py-0.5 rounded-full">✗ Not this one</span>;
                    } else if (!picked && correct) {
                      borderClass = "border-yellow-500";
                      bgClass = "bg-yellow-900/10";
                      badge = <span className="shrink-0 text-xs font-bold text-yellow-400 bg-yellow-900/30 px-2 py-0.5 rounded-full">⚠ Missed this</span>;
                    } else {
                      badge = <span className="shrink-0 text-xs text-gray-600">✓ Correctly skipped</span>;
                    }
                  }

                  return (
                    <div
                      key={option.id}
                      className={`border rounded-xl transition ${borderClass} ${bgClass}`}
                    >
                      <div
                        className={`p-4 ${!submitted ? "cursor-pointer select-none" : ""}`}
                        onClick={!submitted ? () => toggleOption(option.id) : undefined}
                      >
                        <div className="flex items-start gap-3">
                          {!submitted && (
                            <div className={`h-5 w-5 rounded border flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                              picked ? "border-koodAccent bg-koodAccent text-black" : "border-gray-600"
                            }`}>
                              {picked ? "✓" : ""}
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <span className={submitted ? "font-medium" : ""}>{option.text}</span>
                              {submitted && badge}
                            </div>
                            {submitted && option.explain && (
                              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{option.explain}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {submitted && correct && option.goodReview && (
                        <div className="px-4 pb-4">
                          <div className="grid sm:grid-cols-2 gap-2">
                            <div className="bg-green-900/15 border border-green-700/40 rounded-xl p-3">
                              <div className="text-xs font-semibold text-green-400 mb-2">✅ Strong review comment</div>
                              <p className="text-xs text-gray-300 leading-relaxed italic">"{option.goodReview}"</p>
                            </div>
                            <div className="bg-red-900/15 border border-red-700/40 rounded-xl p-3">
                              <div className="text-xs font-semibold text-red-400 mb-2">❌ Weak review comment</div>
                              <p className="text-xs text-gray-300 leading-relaxed italic">"{option.badReview}"</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!submitted && (
                <div className="mt-6">
                  <Button
                    onClick={() => setSubmitted(true)}
                    className={selected.length === 0 ? "opacity-50 pointer-events-none" : ""}
                  >
                    Submit Answer
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Stage 4 — Feedback */}
          {stage === 4 && (
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="text-koodAccent text-sm font-semibold uppercase tracking-widest mb-3">
                Feedback
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {isAnswerCorrect
                  ? scenario.feedback.correctTitle
                  : scenario.feedback.wrongTitle}
              </h3>
              <p className="text-gray-300">
                {isAnswerCorrect
                  ? scenario.feedback.correctBody
                  : scenario.feedback.wrongBody}
              </p>
            </div>
          )}

          {/* Stage 5 — Agenda Builder */}
          {stage === 5 && (
            <div className="space-y-5">
              <MemeBreak
                emoji="📋"
                caption="The AI agenda"
                insight="Hallucinating test points since 2023. Write your own."
              />

              <div className="border border-gray-800 rounded-xl p-6">
                <div className="text-koodAccent text-sm font-semibold uppercase tracking-widest mb-3">
                  Agenda Builder
                </div>
                <h3 className="text-2xl font-bold mb-2">Write your own question</h3>
                <p className="text-gray-400 text-sm mb-5">
                  You have spotted the issues. Now write one question you would bring to the review call.
                </p>

                <CollapsibleCode
                  language={scenario.code.language}
                  snippet={scenario.code.snippet}
                />

                <div className="mt-5">
                  {!agendaSubmitted ? (
                    <>
                      <textarea
                        className="w-full bg-[#111922] border border-gray-700 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-600 resize-none focus:outline-none focus:border-koodAccent transition"
                        rows={4}
                        placeholder="e.g. Why is the API key stored directly in the component rather than in an environment variable?"
                        value={agendaText}
                        onChange={(e) => setAgendaText(e.target.value)}
                      />
                      <div className="mt-3 flex items-center gap-4">
                        <Button
                          onClick={() => setAgendaSubmitted(true)}
                          className={agendaText.trim().length < 20 ? "opacity-50 pointer-events-none" : ""}
                        >
                          Submit my question
                        </Button>
                        <span className="text-xs text-gray-600">
                          {agendaText.trim().length < 20
                            ? `${20 - agendaText.trim().length} more characters needed`
                            : ""}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      {/* Student's submitted question */}
                      <div className="border-l-4 border-koodAccent bg-[#111922] rounded-r-xl p-4">
                        <div className="text-xs font-semibold text-koodAccent mb-1 uppercase tracking-wider">Your question</div>
                        <p className="text-sm text-gray-200 leading-relaxed italic">"{agendaText}"</p>
                      </div>

                      <p className="text-sm text-gray-400">
                        Good agenda questions come from the code, not from a template.
                      </p>

                      {/* Collapsible examples */}
                      {scenario.agendaExamples && (
                        <div className="border border-gray-800 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setExamplesOpen((v) => !v)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-[#111922] hover:bg-[#1a2535] transition text-left text-sm text-gray-400"
                          >
                            <span>See example questions</span>
                            <span
                              className="text-xs transition-transform duration-150"
                              style={{ transform: examplesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                            >
                              ▼
                            </span>
                          </button>
                          {examplesOpen && (
                            <div className="px-4 pb-4 pt-3 bg-[#0d1820] space-y-2">
                              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Strong agenda questions for this code
                              </div>
                              {scenario.agendaExamples.map((q, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                  <span className="text-koodAccent text-xs mt-1 shrink-0">▸</span>
                                  <p className="text-sm text-gray-300 leading-relaxed">{q}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stage 6 — Reward */}
          {stage === 6 && (
            <div className="border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-5xl mb-4">🏅</div>
              <h3 className="text-2xl font-bold mb-2">{scenario.reward.badge}</h3>
              <p className="text-koodAccent font-semibold mb-2">
                +{scenario.reward.xp} XP
              </p>
              <p className="text-gray-300">{scenario.reward.message}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={prevStage}>
              Back
            </Button>

            {stage < 3 && <Button onClick={nextStage}>Next</Button>}

            {stage === 3 && submitted && (
              <Button onClick={nextStage}>See Feedback</Button>
            )}

            {stage === 4 && <Button onClick={nextStage}>Agenda Builder</Button>}

            {stage === 5 && agendaSubmitted && (
              <Button onClick={nextStage}>Claim Reward</Button>
            )}

            {stage === 5 && !agendaSubmitted && (
              <span className="text-xs text-gray-600">Submit your question to continue</span>
            )}

            {stage === 6 && (
              <>
                <Button onClick={() => nav(`/academy/${id}`)}>
                  Back to lesson
                </Button>
                <Button variant="secondary" onClick={() => nav("/academy/categories")}>
                  All categories
                </Button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
