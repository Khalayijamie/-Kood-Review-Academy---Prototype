import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";

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

const UNKNOWN_TECH_RULES = [
  {
    icon: "🗂️",
    title: "Lean on the category",
    detail: "The 5 review categories apply to every language. You don't need to know React to spot a missing null check.",
  },
  {
    icon: "💬",
    title: "Ask, don't assume",
    detail: "If you don't understand a pattern, asking the submitter to explain it in the review call is a valid review comment.",
  },
  {
    icon: "🔬",
    title: "Focus on what you can run",
    detail: "Clone it, run it, describe what you observe. A behavioural finding is a real finding.",
  },
  {
    icon: "🙋",
    title: "Flag uncertainty honestly",
    detail: "Writing 'I'm not familiar with this pattern, can you walk me through it?' is better than silence or a fake approval.",
  },
];

function UnknownTechCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-[#111922] hover:bg-[#1a2535] transition text-left"
      >
        <div className="flex items-center gap-3">
          <Pill tone="neutral">Common situation</Pill>
          <span className="text-sm font-semibold text-white">What if you don't know the tech?</span>
        </div>
        <span
          className="text-gray-400 text-xs transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="bg-[#0d1820] px-5 pb-5 pt-4 space-y-5">
          <div className="space-y-3">
            {UNKNOWN_TECH_RULES.map((r) => (
              <div key={r.title} className="flex gap-3 items-start">
                <span className="text-xl shrink-0 mt-0.5">{r.icon}</span>
                <div>
                  <span className="text-sm font-semibold text-white">{r.title}</span>
                  <span className="text-sm text-gray-400"> — {r.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <MemeBreak
            emoji="🤷"
            caption="Don't know the stack?"
            insight="Neither did the person who wrote it — at first."
          />

          <YoutubeEmbed
            videoId={null}
            caption="Reviewing code you didn't write"
          />
        </div>
      )}
    </div>
  );
}

export default function CategoryLesson() {
  const { id } = useParams();
  const nav = useNavigate();

  const categories = academy.modules.filter((m) => m.type === "category");
  const currentIndex = categories.findIndex((c) => c.id === id);
  const current = categories[currentIndex];

  const next = useMemo(() => {
    if (currentIndex < 0) return null;
    return categories[currentIndex + 1] || null;
  }, [currentIndex, categories]);

  if (!current) {
    return (
      <div className="text-gray-300">
        Category not found. Go back to <button className="underline" onClick={() => nav("/academy/categories")}>framework</button>.
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <Card>
        <CardHeader
          title={current.title}
          subtitle={current.definition}
          right={
            <Pill tone={current.tag === "Advanced" ? "advanced" : "core"}>
              {current.tag}
            </Pill>
          }
        />
        <CardBody>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {current.subcategories.map((s) => (
              <div key={s.id} className="border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <ul className="mt-3 space-y-2 text-gray-300 list-disc list-inside">
                  {s.guidance.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>

                <div className="mt-4 text-xs text-gray-500">
                  Tip: In the next iteration we'll attach mini scenarios + MCQs to this sub-category.
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <UnknownTechCard />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={() => nav("/academy/categories")}>
              Back to framework
            </Button>

           <Button onClick={() => nav(`/academy/${id}/practice`)}>
              Try a practice scenario
              </Button>
            {next ? (
              <Button onClick={() => nav(`/academy/${next.id}`)}>
                Next category → {next.title}
              </Button>
            ) : (
              <Button onClick={() => nav("/academy/ground-rules")}>
                Finish categories → Ground rules
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
