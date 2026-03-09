import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader } from "../components/ui";
import { useNavigate } from "react-router-dom";

export default function GroundRules() {
  const nav = useNavigate();
  const lesson = academy.modules.find((m) => m.id === "ground-rules");

  return (
    <div className="max-w-5xl">
      <Card>
        <CardHeader title={lesson.title} subtitle={lesson.subtitle} />
        <CardBody>
          <div className="space-y-6">
            {lesson.content.map((c) => (
              <div key={c.heading} className="border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold">{c.heading}</h3>
                <p className="text-gray-300 mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}
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