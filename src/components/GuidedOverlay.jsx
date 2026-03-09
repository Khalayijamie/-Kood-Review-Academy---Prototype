import { useEffect, useMemo, useState } from "react";
import { Button, Card } from "./ui";

export default function GuidedOverlay({ steps = [], storageKey, onDone }) {
  const [open, setOpen] = useState(true);
  const [idx, setIdx] = useState(0);

  const key = useMemo(() => storageKey || "overlay-default", [storageKey]);

 useEffect(() => {
  setOpen(true);
}, [key]);

  if (!open || !steps.length) return null;

  const step = steps[idx];

  const close = () => {
    localStorage.setItem(key, "1");
    setOpen(false);
    onDone?.();
  };

  const next = () => {
    if (idx < steps.length - 1) setIdx((v) => v + 1);
    else close();
  };

  const back = () => setIdx((v) => Math.max(0, v - 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* dim */}
      <div className="absolute inset-0 bg-black/60" />

      {/* overlay card */}
      <div className="relative w-[min(820px,92vw)]">
        <Card className="p-0">
          <div className="flex">
            {/* left dots */}
            <div className="w-14 border-r border-gray-800 bg-[#111922] rounded-l-xl flex flex-col items-center py-6 gap-3">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={[
                    "h-2.5 w-2.5 rounded-full",
                    i === idx ? "bg-koodAccent" : "bg-gray-700",
                  ].join(" ")}
                />
              ))}
            </div>

            {/* content */}
            <div className="flex-1 p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-gray-400 text-sm mb-2">Tutorial</div>
                  <h2 className="text-2xl font-bold">{step.title}</h2>
                  <p className="text-gray-300 mt-3 leading-relaxed">
                    {step.body}
                  </p>
                </div>

                <button
                  onClick={close}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="text-gray-500 text-sm">
                  Step {idx + 1} / {steps.length}
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="secondary" onClick={back} className={idx === 0 ? "opacity-50 pointer-events-none" : ""}>
                    Back
                  </Button>
                  <Button onClick={next}>
                    {idx === steps.length - 1 ? "Start" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}