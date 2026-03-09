import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";
import { academy } from "../data/reviewAcademy";
import { reviewAcademyContent } from "../data/reviewAcademyContent";

function CodeBlock({ language, snippet }) {
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111922] border-b border-gray-800">
        <div className="text-gray-400 text-xs uppercase tracking-wider">
          Code • {language}
        </div>
        <button
          className="text-xs text-gray-400 hover:text-white"
          onClick={() => navigator.clipboard?.writeText(snippet)}
        >
          Copy
        </button>
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

  const cat = academy.modules.find((m) => m.id === id);
  const scenarios = reviewAcademyContent.scenariosByCategory[id] || [];

  const [picked, setPicked] = useState(null);

  const scenario = scenarios[0];

  const tone = cat?.tag === "Advanced" ? "advanced" : "core";

  const canProceed = picked !== null;

  const chosen = useMemo(() => {
    if (!scenario || !picked) return null;
    return scenario.feedbackOptions.find((x) => x.id === picked);
  }, [scenario, picked]);

  if (!cat) {
    return <div className="text-gray-300">Category not found.</div>;
  }

  if (!scenario) {
    return (
      <div className="max-w-5xl">
        <Card>
          <CardHeader
            title="Practice scenarios"
            subtitle="No scenarios are attached to this category yet in the prototype."
            right={<Pill tone={tone}>{cat.tag}</Pill>}
          />
          <CardBody>
            <p className="text-gray-300">
              For the demo, we attached scenarios to:
              <span className="text-white"> Readability </span> and
              <span className="text-white"> Performance & Security</span>.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" onClick={() => nav(`/academy/${id}`)}>
                Back to lesson
              </Button>
              <Button onClick={() => nav("/academy/categories")}>
                Go to framework
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <Card>
        <CardHeader
          title={`Practice: ${scenario.title}`}
          subtitle={scenario.context}
          right={<Pill tone={tone}>{cat.tag}</Pill>}
        />
        <CardBody>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div className="border border-gray-800 rounded-xl p-6">
                <div className="text-gray-400 text-sm">Goal</div>
                <div className="mt-2 text-gray-200">{scenario.goal}</div>
              </div>

              <CodeBlock
                language={scenario.code.language}
                snippet={scenario.code.snippet}
              />
            </div>

            <div className="space-y-4">
              <div className="border border-gray-800 rounded-xl p-6">
                <div className="text-gray-400 text-sm mb-3">
                  Choose the better review feedback
                </div>

                <div className="space-y-3">
                  {scenario.feedbackOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPicked(opt.id)}
                      className={[
                        "w-full text-left border rounded-xl p-4 transition",
                        picked === opt.id
                          ? "border-koodAccent bg-[#202b38]"
                          : "border-gray-800 hover:bg-[#202b38]",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold">{opt.label}</div>
                        <div className="text-xs text-gray-500">
                          {opt.id === "good" ? "Evidence-based" : "Vague / unsafe"}
                        </div>
                      </div>
                      <p className="text-gray-300 mt-2 leading-relaxed">
                        {opt.text}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {chosen ? (
                <div className="border border-gray-800 rounded-xl p-6">
                  <div className="text-gray-400 text-sm">
                    Why this is {chosen.id === "good" ? "good" : "poor"}
                  </div>
                  <ul className="mt-3 space-y-2 list-disc list-inside text-gray-300">
                    {(chosen.id === "good" ? chosen.whyGood : chosen.whyBad).map(
                      (x, i) => (
                        <li key={i}>{x}</li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                <div className="border border-gray-800 rounded-xl p-6 text-gray-500">
                  Pick one option to see the explanation.
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={() => nav(`/academy/${id}`)}>
              Back to lesson
            </Button>

            <Button
              onClick={() => nav(`/academy/${id}/quiz/${scenario.quiz.id}`)}
              className={!canProceed ? "opacity-50 pointer-events-none" : ""}
            >
              Continue to quiz
            </Button>

            <Button variant="secondary" onClick={() => nav("/academy/categories")}>
              Framework
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}