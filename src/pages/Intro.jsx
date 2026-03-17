import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";
import { useNavigate } from "react-router-dom";
import GuidedOverlay from "../components/GuidedOverlay";
import { reviewAcademyContent } from "../data/reviewAcademyContent";

export default function Intro() {
  const nav = useNavigate();
  const intro = academy.modules.find((m) => m.id === "intro");

  return (
    <div className="max-w-5xl">
      <GuidedOverlay
        steps={reviewAcademyContent.guidedOverlays.intro}
        storageKey="overlay-intro"
      />
      <Card>
        <CardHeader
          title={intro.title}
          subtitle={`Welcome ${academy.learner.name}. At //kood you are not only a learner — you are also a reviewer.`}
        />
        <CardBody>
          <div className="space-y-6">
            {/* Core lesson content */}
            {intro.content.map((c) => (
              <div key={c.heading} className="border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold">{c.heading}</h3>
                <p className="text-gray-300 mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}

            <div className="border border-gray-800 rounded-xl p-6 bg-[#101823]">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="core">Quick pre-brief</Pill>
                <Pill>Prepare like a pro</Pill>
                <Pill>Review with evidence</Pill>
              </div>

              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="border border-gray-800 rounded-xl p-4">
                  <div className="text-sm font-semibold text-koodAccent uppercase tracking-widest">
                    Your roles
                  </div>
                  <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                    You’ll switch hats: sometimes you submit, sometimes you review. Both require clarity and calm.
                  </p>
                </div>

                <div className="border border-gray-800 rounded-xl p-4">
                  <div className="text-sm font-semibold text-koodAccent uppercase tracking-widest">
                    Your default
                  </div>
                  <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                    Don’t guess. Test. Ask. Point to evidence. If you can’t justify it, frame it as a question.
                  </p>
                </div>

                <div className="border border-gray-800 rounded-xl p-4">
                  <div className="text-sm font-semibold text-koodAccent uppercase tracking-widest">
                    Your outcome
                  </div>
                  <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                    The goal isn’t “pass/fail”. It’s “understood and improved” — with fairness and respect.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <div className="border border-gray-800 rounded-xl p-4">
                  <div className="text-sm font-semibold">Do</div>
                  <ul className="mt-2 text-sm text-gray-300 space-y-2">
                    <li className="flex gap-2"><span className="text-koodAccent">•</span><span>Reproduce the issue (or verify the behavior) before commenting.</span></li>
                    <li className="flex gap-2"><span className="text-koodAccent">•</span><span>Give one clear reason + one actionable suggestion.</span></li>
                    <li className="flex gap-2"><span className="text-koodAccent">•</span><span>Keep the review structured (categories, steps, outcomes).</span></li>
                  </ul>
                </div>

                <div className="border border-gray-800 rounded-xl p-4">
                  <div className="text-sm font-semibold">Don’t</div>
                  <ul className="mt-2 text-sm text-gray-300 space-y-2">
                    <li className="flex gap-2"><span className="text-koodAccent">•</span><span>Approve by default to “be nice”.</span></li>
                    <li className="flex gap-2"><span className="text-koodAccent">•</span><span>Argue opinions as facts (“I don’t like this”).</span></li>
                    <li className="flex gap-2"><span className="text-koodAccent">•</span><span>Forget the human — critique code, not people.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Button onClick={() => nav("/academy/ground-rules")}>Ground rules (quick read)</Button>
            <Button variant="secondary" onClick={() => nav("/academy/categories")}>
              Jump into categories
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
