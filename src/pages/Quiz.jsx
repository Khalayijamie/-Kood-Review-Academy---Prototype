import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardHeader } from "../components/ui";
import { reviewAcademyContent } from "../data/reviewAcademyContent";
import { academy } from "../data/reviewAcademy";

export default function Quiz() {
  const { id, quizId } = useParams();
  const nav = useNavigate();

  const cat = academy.modules.find((m) => m.id === id);

  const quiz = useMemo(() => {
    const scenarios = reviewAcademyContent.scenariosByCategory[id] || [];
    for (const s of scenarios) {
      if (s.quiz?.id === quizId) return s.quiz;
    }
    return null;
  }, [id, quizId]);

  const [selected, setSelected] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  if (!cat || !quiz) {
    return <div className="text-gray-300">Quiz not found.</div>;
  }

  const toggle = (optId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(optId)) next.delete(optId);
      else next.add(optId);
      return next;
    });
  };

  const correctSet = new Set(quiz.options.filter((o) => o.correct).map((o) => o.id));

  const score = () => {
    let correct = 0;
    for (const o of quiz.options) {
      const picked = selected.has(o.id);
      if (picked === o.correct) correct += 1;
    }
    return { correct, total: quiz.options.length };
  };

  const s = score();

  return (
    <div className="max-w-5xl">
      <Card>
        <CardHeader
          title={`Quiz: ${cat.title}`}
          subtitle="Select all answers that apply. Then submit to see explanations."
        />
        <CardBody>
          <div className="border border-gray-800 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-3">Question</div>
            <div className="text-gray-200">{quiz.prompt}</div>

            <div className="mt-6 space-y-3">
              {quiz.options.map((o) => {
                const picked = selected.has(o.id);
                const isCorrect = o.correct;

                let border = "border-gray-800";
                let bg = "";

                if (submitted) {
                  if (picked && isCorrect) {
                    border = "border-green-600";
                    bg = "bg-[#17261e]";
                  } else if (picked && !isCorrect) {
                    border = "border-red-600";
                    bg = "bg-[#2a1515]";
                  } else if (!picked && isCorrect) {
                    border = "border-yellow-600";
                    bg = "bg-[#252314]";
                  }
                } else if (picked) {
                  border = "border-koodAccent";
                  bg = "bg-[#202b38]";
                }

                return (
                  <button
                    key={o.id}
                    onClick={() => toggle(o.id)}
                    className={`w-full text-left border rounded-xl p-4 transition ${border} ${bg}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={[
                          "mt-0.5 h-5 w-5 rounded border flex items-center justify-center text-xs",
                          picked ? "border-koodAccent bg-koodAccent text-black" : "border-gray-600",
                        ].join(" ")}
                      >
                        {picked ? "✓" : ""}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-200">{o.text}</div>
                        {submitted ? (
                          <div className="text-gray-400 text-sm mt-2">
                            {o.explain}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {!submitted ? (
              <Button onClick={() => setSubmitted(true)}>Submit</Button>
            ) : (
              <div className="text-gray-300">
                Score (strict): <span className="text-white font-semibold">{s.correct}</span> /{" "}
                <span className="text-white font-semibold">{s.total}</span>
                <div className="text-gray-500 text-sm mt-1">
                  Yellow options are correct answers you missed.
                </div>
              </div>
            )}

            <Button variant="secondary" onClick={() => nav(`/academy/${id}/practice`)}>
              Back to practice
            </Button>

            <Button variant="secondary" onClick={() => nav(`/academy/${id}`)}>
              Back to lesson
            </Button>

            <Button onClick={() => nav("/academy/categories")}>Framework</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}