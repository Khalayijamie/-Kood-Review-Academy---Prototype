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

export default function PracticeScenario() {
  const { id } = useParams();
  const nav = useNavigate();

  const category = academy.modules.find((m) => m.id === id);
  const scenarios = reviewAcademyContent.scenariosByCategory[id] || [];
  const scenario = scenarios[0];

  const [stage, setStage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);

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

  return (
    <div className="max-w-6xl">
      <Card>
        <CardHeader
          title={scenario.missionTitle}
          subtitle={scenario.context}
          right={<Pill tone="advanced">{category.tag}</Pill>}
        />
        <CardBody>
          <div className="mb-6 flex items-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= stage ? "bg-koodAccent" : "bg-[#243241]"
                }`}
              />
            ))}
          </div>

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

          {stage === 3 && (
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="text-koodAccent text-sm font-semibold uppercase tracking-widest mb-3">
                Challenge
              </div>
              <h3 className="text-2xl font-bold mb-4">{scenario.challenge.prompt}</h3>

              <div className="space-y-3">
                {scenario.challenge.options.map((option) => {
                  const checked = selected.includes(option.id);

                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`w-full text-left border rounded-xl p-4 transition ${
                        checked
                          ? "border-koodAccent bg-[#202b38]"
                          : "border-gray-800 hover:bg-[#1a232e]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-5 w-5 rounded border flex items-center justify-center text-xs ${
                            checked
                              ? "border-koodAccent bg-koodAccent text-black"
                              : "border-gray-600"
                          }`}
                        >
                          {checked ? "✓" : ""}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <Button onClick={() => setSubmitted(true)}>Submit Answer</Button>
              </div>
            </div>
          )}

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

          {stage === 5 && (
            <div className="border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-5xl mb-4">🏅</div>
              <h3 className="text-2xl font-bold mb-2">{scenario.reward.badge}</h3>
              <p className="text-koodAccent font-semibold mb-2">
                +{scenario.reward.xp} XP
              </p>
              <p className="text-gray-300">{scenario.reward.message}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={prevStage}>
              Back
            </Button>

            {stage < 3 && <Button onClick={nextStage}>Next</Button>}

            {stage === 3 && submitted && (
              <Button onClick={nextStage}>See Feedback</Button>
            )}

            {stage === 4 && <Button onClick={nextStage}>Claim Reward</Button>}

            {stage === 5 && (
              <>
                <Button onClick={() => nav(`/academy/${id}/quiz/ps-1-quiz`)}>
                  Continue to Quiz
                </Button>
                <Button variant="secondary" onClick={() => nav(`/academy/${id}`)}>
                  Back to Lesson
                </Button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}