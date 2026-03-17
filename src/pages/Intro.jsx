import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";
import { useNavigate } from "react-router-dom";
import GuidedOverlay from "../components/GuidedOverlay";
import { reviewAcademyContent } from "../data/reviewAcademyContent";

/* ─── small reusable bits ─── */

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

/* ─── main page ─── */

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
          <div className="space-y-8">

            {/* ── WHAT IS A REVIEW? ── */}
            {intro.content.map((c) => (
              <div key={c.heading} className="border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold">{c.heading}</h3>
                <p className="text-gray-300 mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}

            {/* ── MEME BREAK 1 ── */}
            <MemeBreak
              emoji="👀"
              caption='"LGTM" — Looks Good To Me'
              insight="The most dangerous words in a code review. Approving without reading defeats the entire purpose."
            />

            {/* ── VIDEO: What is a code review? ── */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-koodAccent font-semibold text-sm uppercase tracking-wider">Watch first 📺</span>
              </div>
              {/* Replace VIDEO_ID_1 with the actual YouTube video ID */}
              <YoutubeEmbed
                videoId="VIDEO_ID_1"
                caption="What is a code review? — Replace VIDEO_ID_1 with the actual YouTube video ID"
              />
            </div>

            {/* ── GOOD REVIEW vs BAD REVIEW ── */}
            <div>
              <h2 className="text-xl font-semibold mb-4">What does a good review look like? 🆚</h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Good */}
                <div className="border border-green-700/50 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-green-900/20 border-b border-green-700/40">
                    <span className="text-green-400 text-lg">✅</span>
                    <span className="text-green-300 font-semibold text-sm">Good review</span>
                  </div>
                  <div className="p-4 bg-[#0d1820]">
                    <p className="text-gray-400 text-xs mb-2 italic">Scenario: auth function crashes when email is empty</p>
                    <div className="bg-[#111922] border border-gray-800 rounded-lg p-3 text-sm text-gray-200 leading-relaxed">
                      "I tested getUserByEmail with an empty string — it throws a TypeError because user is undefined.
                      Suggest adding a guard: <code className="text-koodAccent">if (!email) return null</code> before the find.
                      This keeps the function safe for all callers."
                    </div>
                  </div>
                  <ul className="px-4 pb-4 space-y-1 text-xs text-green-300">
                    <li className="flex gap-2"><span>▸</span><span>Reproduces the issue with a specific test input</span></li>
                    <li className="flex gap-2"><span>▸</span><span>Points to the exact line that breaks</span></li>
                    <li className="flex gap-2"><span>▸</span><span>Proposes a concrete fix with example code</span></li>
                    <li className="flex gap-2"><span>▸</span><span>Explains why it matters for callers</span></li>
                  </ul>
                </div>

                {/* Bad */}
                <div className="border border-red-700/50 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-900/20 border-b border-red-700/40">
                    <span className="text-red-400 text-lg">❌</span>
                    <span className="text-red-300 font-semibold text-sm">Poor review</span>
                  </div>
                  <div className="p-4 bg-[#0d1820]">
                    <p className="text-gray-400 text-xs mb-2 italic">Same scenario</p>
                    <div className="bg-[#111922] border border-gray-800 rounded-lg p-3 text-sm text-gray-200 leading-relaxed">
                      "The error handling is bad. This needs to be fixed before approval."
                    </div>
                  </div>
                  <ul className="px-4 pb-4 space-y-1 text-xs text-red-300">
                    <li className="flex gap-2"><span>▸</span><span>No reproduction steps — how do we confirm it?</span></li>
                    <li className="flex gap-2"><span>▸</span><span>"Bad" is an opinion, not evidence</span></li>
                    <li className="flex gap-2"><span>▸</span><span>No guidance on what to fix or how</span></li>
                    <li className="flex gap-2"><span>▸</span><span>Leaves the developer stuck</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ── DOS AND DON'TS TABLE ── */}
            <div className="border border-gray-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 bg-[#111922] border-b border-gray-800">
                <Pill tone="core">Field guide</Pill>
                <span className="text-sm text-gray-400">The review contract</span>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-green-400 text-xl">✅</span>
                    <span className="font-semibold">Do this</span>
                  </div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-800/50">
                      {[
                        ["🔬", "Reproduce it first", "Verify the behavior before you comment on it."],
                        ["📋", "Reference the spec", "Tie claims to requirements, not preferences."],
                        ["💡", "Suggest, don't demand", "Propose a fix or alternative, not just a problem."],
                        ["🧪", "Show a test case", "Concrete input + expected output = strong evidence."],
                        ["🤝", "Separate code from person", "Critique the code. Respect the developer."],
                      ].map(([icon, action, detail]) => (
                        <tr key={action} className="align-top">
                          <td className="py-2 pr-2 text-base">{icon}</td>
                          <td className="py-2 pr-3 font-medium text-white whitespace-nowrap">{action}</td>
                          <td className="py-2 text-gray-400">{detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-red-400 text-xl">❌</span>
                    <span className="font-semibold">Avoid this</span>
                  </div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-800/50">
                      {[
                        ["👻", "Default approvals", '"LGTM" without testing. It damages trust and fails the team.'],
                        ["💬", "Opinion as fact", '"I don\'t like this" is not a review comment.'],
                        ["🌊", "Comment floods", "20 minor nitpicks bury the real issue."],
                        ["🔮", "Guessing", "If you haven't tested it, frame it as a question."],
                        ["🎭", "Personal attacks", "Never comment on the developer, only on the code."],
                      ].map(([icon, action, detail]) => (
                        <tr key={action} className="align-top">
                          <td className="py-2 pr-2 text-base">{icon}</td>
                          <td className="py-2 pr-3 font-medium text-white whitespace-nowrap">{action}</td>
                          <td className="py-2 text-gray-400">{detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ── MEME BREAK 2 ── */}
            <MemeBreak
              emoji="🧐"
              caption="One does not simply approve a PR"
              insight="Without running the code first. If you can't reproduce the behavior, you can't review it."
            />

            {/* ── VIDEO 2: How to give good feedback ── */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-koodAccent font-semibold text-sm uppercase tracking-wider">Also worth watching 📺</span>
              </div>
              <YoutubeEmbed
                videoId="dQw4w9WgXcQ"
                caption="How to give constructive code review feedback"
              />
            </div>

            {/* ── YOUR MINDSET ── */}
            <div className="border border-gray-800 rounded-xl p-6 bg-[#101823]">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Pill tone="core">Quick pre-brief</Pill>
                <Pill>Prepare like a pro</Pill>
                <Pill>Review with evidence</Pill>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-gray-800 rounded-xl p-4">
                  <div className="text-2xl mb-2">🎭</div>
                  <div className="text-sm font-semibold text-koodAccent uppercase tracking-widest mb-2">
                    Your roles
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    You'll switch hats: sometimes you submit, sometimes you review. Both require clarity and calm.
                  </p>
                </div>

                <div className="border border-gray-800 rounded-xl p-4">
                  <div className="text-2xl mb-2">🧪</div>
                  <div className="text-sm font-semibold text-koodAccent uppercase tracking-widest mb-2">
                    Your default
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Don't guess. Test. Ask. Point to evidence. If you can't justify it, frame it as a question.
                  </p>
                </div>

                <div className="border border-gray-800 rounded-xl p-4">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm font-semibold text-koodAccent uppercase tracking-widest mb-2">
                    Your outcome
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    The goal isn't "pass/fail". It's "understood and improved" — with fairness and respect.
                  </p>
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
