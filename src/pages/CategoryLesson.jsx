import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";

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
                  Tip: In the next iteration we’ll attach mini scenarios + MCQs to this sub-category.
                </div>
              </div>
            ))}
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