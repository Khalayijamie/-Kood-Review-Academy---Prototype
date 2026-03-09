import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader } from "../components/ui";
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
            {intro.content.map((c) => (
              <div key={c.heading} className="border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold">{c.heading}</h3>
                <p className="text-gray-300 mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Button onClick={() => nav("/academy/categories")}>Continue</Button>
            <Button variant="secondary" onClick={() => nav("/academy/ground-rules")}>
              Skip to ground rules
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}