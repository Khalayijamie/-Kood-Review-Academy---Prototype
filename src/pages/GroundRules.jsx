import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";
import { useNavigate } from "react-router-dom";

function RoleCard({ title, tagline, bullets, tone = "neutral", icon, accent }) {
  return (
    <div className={`border rounded-xl p-5 bg-[#101823] ${accent ?? "border-gray-800"}`}>
      <div className="text-4xl mb-3">{icon}</div>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <Pill tone={tone}>{title}</Pill>
      </div>
      <p className="text-sm text-gray-400 mb-4 italic">{tagline}</p>
      <ul className="text-sm text-gray-300 space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-koodAccent mt-0.5">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


function DayRow({ day, icon, title, body, isLast, accent }) {
  return (
    <div className="flex gap-3">
      {/* left: icon + line */}
      <div className="flex flex-col items-center">
        <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-base shrink-0 ${
          accent
            ? "bg-koodAccent border-koodAccent text-black"
            : "bg-[#111922] border-gray-700"
        }`}>
          {icon}
        </div>
        {!isLast && <div className="w-px flex-1 bg-gray-800 mt-1" />}
      </div>
      {/* right: content */}
      <div className={`pb-4 ${isLast ? "" : ""}`}>
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Day {day}</div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{body}</p>
      </div>
    </div>
  );
}

function PhaseCard({ label, days }) {
  const isClose = label === "Close";
  return (
    <div className={`border rounded-xl p-5 ${isClose ? "border-koodAccent/30 bg-koodAccent/5" : "border-gray-800 bg-[#0d1820]"}`}>
      <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${isClose ? "text-koodAccent" : "text-gray-400"}`}>
        {label}
      </div>
      <div>
        {days.map((d, i) => (
          <DayRow key={d.day} {...d} isLast={i === days.length - 1} accent={isClose} />
        ))}
      </div>
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
                <span className="text-sm text-gray-400">What "good" looks like</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <RoleCard
                  title="Submitter"
                  tone="neutral"
                  icon="📝"
                  accent="border-gray-700"
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
                  icon="🔍"
                  accent="border-koodAccent/40"
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
                  icon="⚖️"
                  accent="border-purple-500/40"
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
                  <li className="flex gap-2"><span className="text-koodAccent">•</span><span>If you can't justify it with evidence, ask it as a question.</span></li>
                  <li className="flex gap-2"><span className="text-koodAccent">•</span><span>One claim → one proof → one suggestion. Repeat.</span></li>
                  <li className="flex gap-2"><span className="text-koodAccent">•</span><span>Default approvals damage trust. Reviews are mandatory work.</span></li>
                </ul>
              </div>

              <div className="border border-gray-800 rounded-xl p-6 bg-[#101823]">
                <h2 className="text-xl font-semibold">A review that doesn't suck</h2>
                <div className="mt-4 grid gap-3">
                  <div className="border border-gray-800 rounded-xl p-4">
                    <div className="text-sm font-semibold">1) Set the scope</div>
                    <p className="text-sm text-gray-300 mt-1">
                      "I tested these flows, checked these files, and focused on these categories."
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
                      Suggest a refactor, edge-case test, or safer default — not just "fix this".
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-800 rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-semibold">The 7-day review rhythm</h2>
                  <p className="text-sm text-gray-400 mt-0.5">Consistency beats intensity — here's how to spread the work.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <PhaseCard label="Prepare" days={[
                  { day: 1, icon: "🚀", title: "Kickoff", body: "Agree on scope, requirements, and what 'done' means." },
                  { day: 2, icon: "👁️", title: "First pass", body: "Reviewer checks core flows and notes risks early." },
                ]} />
                <PhaseCard label="Review" days={[
                  { day: 3, icon: "🔧", title: "Fix window", body: "Submitter iterates; reviewer stays available for quick checks." },
                  { day: 4, icon: "🔍", title: "Deep dive", body: "Edge cases, error handling, readability, structure." },
                  { day: 5, icon: "✨", title: "Polish", body: "Tighten naming, logs, docs, and test coverage." },
                ]} />
                <PhaseCard label="Close" days={[
                  { day: 6, icon: "🧪", title: "Verify", body: "Re-test critical flows. Confirm all issues resolved." },
                  { day: 7, icon: "🎯", title: "Close out", body: "Summarise: what was tested, what improved, what remains." },
                ]} />
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