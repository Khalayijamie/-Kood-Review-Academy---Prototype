import { useState, useEffect } from "react";
import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";
import { useNavigate } from "react-router-dom";
import { reviewRhythmByRole } from "../data/reviewRhythmData";

/* ─── shared small components ─── */

function MemeBreak({ emoji, caption, insight }) {
  return (
    <div className="border border-dashed border-gray-700 rounded-xl p-6 bg-[#0d1820] text-center">
      <div className="text-6xl mb-3">{emoji}</div>
      <div className="text-lg font-bold text-white mb-1">{caption}</div>
      <div className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">{insight}</div>
    </div>
  );
}

function YoutubeEmbed({ videoId, caption }) {
  if (!videoId) return null;
  return (
    <div className="rounded-xl overflow-hidden border border-gray-800">
      <div className="aspect-video bg-[#0d1820]">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={caption}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <div className="px-4 py-2 text-xs text-gray-500 bg-[#111922] border-t border-gray-800">
          {caption}
        </div>
      )}
    </div>
  );
}

/* ─── Role loadout cards ─── */

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

/* ─── Communication card ─── */

const COMMS_CARDS = [
  {
    icon: "📢",
    title: "Keep it public",
    tagline: "No DMs for review talk",
    body: "All review discussion goes in the designated Discord channel. DMs have no record and cannot be seen by the team lead or //kood.",
  },
  {
    icon: "📝",
    title: "Write it down",
    tagline: "Verbal doesn't count",
    body: "If you agree something in a call — post it in the channel. If it is not written, it did not happen.",
  },
  {
    icon: "🔔",
    title: "Someone's gone quiet?",
    tagline: "Don't wait until day 6",
    body: "Tag them in Discord. No reply in 24h — tell the team lead.",
  },
];

/* ─── Failing review rows ─── */

const FAILING_ROWS = [
  {
    failing: "Submitting lorem ipsum, dots, or 'LGTM' without testing.",
    instead: "Run the project. Write at least one specific observation per test point.",
  },
  {
    failing: "Accepting without actually running the project.",
    instead: "Clone it, run it, document what you see — even one line of evidence counts.",
  },
  {
    failing: "Disappearing after joining — no messages, missing the call.",
    instead: "If you cannot make it, communicate early in Discord. Silence is not neutral.",
  },
  {
    failing: "Deducting points with no explanation.",
    instead: "One sentence is enough. Silent deductions are not fair feedback.",
  },
];

/* ─── 7-day rhythm ─── */

const ROLES = ["Reviewer", "Submitter", "Team lead"];

function DayRow({ day, icon, title, body, isLast, accent }) {
  return (
    <div className="flex gap-3">
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
      <div className="pb-4">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Day {day}</div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{body}</p>
      </div>
    </div>
  );
}

/* ─── Main page ─── */

export default function GroundRules() {
  const nav = useNavigate();
  const lesson = academy.modules.find((m) => m.id === "ground-rules");
  const [activeRole, setActiveRole] = useState("Reviewer");
  const [completedModules, setCompletedModules] = useState(new Set());

  // Load completion state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("completedModules");
    if (saved) {
      try {
        setCompletedModules(new Set(JSON.parse(saved)));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  const rhythmDays = reviewRhythmByRole[activeRole] || [];

  // Calculate progress to determine if button should be enabled
  const steps = academy.modules.filter(
    (m) => m.id === "intro" || m.id === "categories" || m.type === "category" || m.id === "ground-rules"
  );
  const totalModules = steps.length;
  const completedCount = completedModules.size;
  const isSprintComplete = completedCount === totalModules;

  return (
    <div className="max-w-5xl">
      <Card>
        <CardHeader title={lesson.title} subtitle={lesson.subtitle} />
        <CardBody>
          <div className="space-y-6">

            {/* ── Intro banner ── */}
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

            {/* ── Role loadout ── */}
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

            {/* ── IMPROVEMENT 5: Communication card ── */}
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <h2 className="text-xl font-semibold">Communication runs on Discord</h2>
                <Pill>Channel rules</Pill>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {COMMS_CARDS.map((c) => (
                  <div key={c.title} className="border border-gray-800 rounded-xl p-4 bg-[#101823]">
                    <div className="text-3xl mb-3">{c.icon}</div>
                    <div className="text-sm font-semibold text-white mb-0.5">{c.title}</div>
                    <div className="text-xs text-gray-500 italic mb-3">{c.tagline}</div>
                    <p className="text-sm text-gray-300 leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
              <MemeBreak
                emoji="💬"
                caption="Just sent you a DM"
                insight="The review channel exists for a reason. Use it."
              />
            </div>

            {/* ── Golden rules + Review structure ── */}
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

            {/* ── IMPROVEMENT 3: Failing review section ── */}
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold">What a failing review looks like</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full border text-xs bg-red-900/20 border-red-700/40 text-red-400">
                  Know the line
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-5">
                A bad review wastes everyone's time. Here is what the community considers a failing review, and what to do instead.
              </p>

              <div className="space-y-3">
                {FAILING_ROWS.map((row, i) => (
                  <div key={i} className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-gray-800">
                    <div className="bg-red-900/10 border-b md:border-b-0 md:border-r border-red-900/30 p-4">
                      <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Failing</div>
                      <p className="text-sm text-gray-300 leading-relaxed">{row.failing}</p>
                    </div>
                    <div className="bg-green-900/10 p-4">
                      <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">Instead</div>
                      <p className="text-sm text-gray-300 leading-relaxed">{row.instead}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-600 mt-5 leading-relaxed">
                This section exists because good reviewers deserve to know the standard — and because students who experience a bad review should be able to name what happened.
              </p>

              <div className="mt-5 space-y-4">
                <MemeBreak
                  emoji="👻"
                  caption="The ghost reviewer"
                  insight="Joined the review. Never spoke. Accepted everything. Disappeared."
                />
                <YoutubeEmbed
                  videoId={null}
                  caption="What makes a code review actually useful"
                />
              </div>
            </div>

            {/* ── IMPROVEMENT 4: Role-toggled 7-day rhythm ── */}
            <div className="border border-gray-800 rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div>
                  <h2 className="text-xl font-semibold">The 7-day review rhythm</h2>
                  <p className="text-sm text-gray-400 mt-0.5">Consistency beats intensity — here's how to spread the work.</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">See the sprint from your role's perspective.</p>

              {/* Role toggle */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {ROLES.map((role) => (
                  <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                      activeRole === role
                        ? "bg-koodAccent text-black border-koodAccent"
                        : "bg-[#2a3645] text-white border-gray-700 hover:bg-[#324155]"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* Day rows — fade on role change */}
              <div
                key={activeRole}
                style={{ animation: "fadeIn 150ms ease-in" }}
                className="grid md:grid-cols-3 gap-4"
              >
                {/* Prepare: days 1-2 */}
                <div className="border border-gray-800 bg-[#0d1820] rounded-xl p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Prepare</div>
                  {rhythmDays.slice(0, 2).map((d, i) => (
                    <DayRow key={d.day} {...d} isLast={i === 1} accent={false} />
                  ))}
                </div>
                {/* Review: days 3-5 */}
                <div className="border border-gray-800 bg-[#0d1820] rounded-xl p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Review</div>
                  {rhythmDays.slice(2, 5).map((d, i) => (
                    <DayRow key={d.day} {...d} isLast={i === 2} accent={false} />
                  ))}
                </div>
                {/* Close: days 6-7 */}
                <div className="border border-koodAccent/30 bg-koodAccent/5 rounded-xl p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-koodAccent mb-4">Close</div>
                  {rhythmDays.slice(5, 7).map((d, i) => (
                    <DayRow key={d.day} {...d} isLast={i === 1} accent={true} />
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <MemeBreak
                  emoji="📅"
                  caption="Day 7, 11:58 PM"
                  insight="Three reviewers. Zero responses all week. Now everyone appears."
                />
                <YoutubeEmbed
                  videoId={null}
                  caption="How to run a productive code review session"
                />
              </div>
            </div>

          </div>

          <div className="mt-8 flex items-center gap-3">
            <Button onClick={() => nav("/academy/complete")} disabled={!isSprintComplete}>
              Complete sprint
            </Button>
            <Button variant="secondary" onClick={() => nav("/academy/categories")}>
              Review categories again
            </Button>
          </div>
        </CardBody>
      </Card>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
