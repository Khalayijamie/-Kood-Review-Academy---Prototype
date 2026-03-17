import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";
import { useNavigate } from "react-router-dom";

function RoleCard({ title, tagline, bullets, tone = "neutral" }) {
  return (
    <div className="border border-gray-800 rounded-xl p-5 bg-[#101823]">
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone={tone}>{title}</Pill>
        <span className="text-sm text-gray-300">{tagline}</span>
      </div>
      <ul className="mt-4 text-sm text-gray-300 space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-koodAccent">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RhythmStep({ day, title, body }) {
  return (
    <div className="border border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between gap-3">
        <Pill>Day {day}</Pill>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <p className="text-sm text-gray-300 mt-2 leading-relaxed">{body}</p>
    </div>
  );
}

export default function GroundRules() {
  const nav = useNavigate();
  const lesson = academy.modules.find((m) => m.id === "ground-rules");

  return (
    <div className="max-w-5xl">
      <Card>
        <CardHeader title={lesson.title} subtitle={lesson.subtitle} />
        <CardBody>
          <div className="space-y-6">
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="core">Field guide</Pill>
                <Pill>Fairness</Pill>
                <Pill>Evidence</Pill>
                <Pill>Momentum</Pill>
              </div>
              <p className="text-gray-300 mt-3 leading-relaxed">
                Think of reviews as a shared safety system. Your job is to keep quality high, learning honest, and the
                community moving — without turning it into a courtroom.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <h2 className="text-xl font-semibold">Role loadout</h2>
                <span className="text-sm text-gray-400">What “good” looks like</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <RoleCard
                  title="Submitter"
                  tone="neutral"
                  tagline="Make reviewing easy."
                  bullets={[
                    "Be ready to explain choices and trade-offs.",
                    "Provide clear run steps + known limitations.",
                    "Treat feedback as fuel: iterate quickly.",
                  ]}
                />
                <RoleCard
                  title="Reviewer"
                  tone="core"
                  tagline="Verify, test, guide."
                  bullets={[
                    "Reproduce before asserting.",
                    "Use evidence: steps, logs, screenshots, spec lines.",
                    "Suggest improvements, not just problems.",
                  ]}
                />
                <RoleCard
                  title="Team lead"
                  tone="advanced"
                  tagline="Protect fairness + time."
                  bullets={[
                    "Ensure reviews are distributed fairly.",
                    "Keep the cadence: no silent stalls.",
                    "Escalate patterns (not single mistakes).",
                  ]}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold">The golden rules</h2>
                <ul className="mt-4 text-sm text-gray-300 space-y-2">
                  <li className="flex gap-2"><span className="text-koodAccent">•</span><span>Critique code, not people. Keep tone calm and specific.</span></li>
                  <li className="flex gap-2"><span className="text-koodAccent">•</span><span>If you can’t justify it with evidence, ask it as a question.</span></li>
                  <li className="flex gap-2"><span className="text-koodAccent">•</span><span>One claim → one proof → one suggestion. Repeat.</span></li>
                  <li className="flex gap-2"><span className="text-koodAccent">•</span><span>Default approvals damage trust. Reviews are mandatory work.</span></li>
                </ul>
              </div>

              <div className="border border-gray-800 rounded-xl p-6 bg-[#101823]">
                <h2 className="text-xl font-semibold">A review that doesn’t suck</h2>
                <div className="mt-4 grid gap-3">
                  <div className="border border-gray-800 rounded-xl p-4">
                    <div className="text-sm font-semibold">1) Set the scope</div>
                    <p className="text-sm text-gray-300 mt-1">
                      “I tested these flows, checked these files, and focused on these categories.”
                    </p>
                  </div>
                  <div className="border border-gray-800 rounded-xl p-4">
                    <div className="text-sm font-semibold">2) Prove what you claim</div>
                    <p className="text-sm text-gray-300 mt-1">
                      Steps to reproduce, spec references, console output, or a tiny test case.
                    </p>
                  </div>
                  <div className="border border-gray-800 rounded-xl p-4">
                    <div className="text-sm font-semibold">3) Leave an upgrade path</div>
                    <p className="text-sm text-gray-300 mt-1">
                      Suggest a refactor, edge-case test, or safer default — not just “fix this”.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-800 rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">The 7-day rhythm (example)</h2>
                <span className="text-sm text-gray-400">Consistency beats intensity</span>
              </div>
              <div className="mt-4 grid md:grid-cols-3 gap-3">
                <RhythmStep day="1" title="Kickoff" body="Agree on scope, requirements, and what “done” means." />
                <RhythmStep day="2" title="First pass" body="Reviewer checks core flows + notes risks early." />
                <RhythmStep day="3" title="Fix window" body="Submitter iterates; reviewer stays available for quick checks." />
                <RhythmStep day="4" title="Deep dive" body="Edge cases, error handling, readability, structure." />
                <RhythmStep day="5" title="Polish" body="Tighten naming, logs, docs, and test coverage where relevant." />
                <RhythmStep day="6" title="Final verification" body="Re-test critical flows; confirm issues resolved." />
                <RhythmStep day="7" title="Close out" body="Summarize: what was tested, what improved, what remains." />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Button onClick={() => nav("/academy/complete")}>Complete sprint</Button>
            <Button variant="secondary" onClick={() => nav("/academy/categories")}>
              Review categories again
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}