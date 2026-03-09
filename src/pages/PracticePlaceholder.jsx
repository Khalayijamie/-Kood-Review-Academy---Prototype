import { Button, Card, CardBody, CardHeader } from "../components/ui";
import { useNavigate } from "react-router-dom";

export default function PracticePlaceholder() {
  const nav = useNavigate();

  return (
    <div className="max-w-5xl">
      <Card>
        <CardHeader
          title="Practice scenarios"
          subtitle="Next we’ll build the fun part: code snippets + good vs poor reviews + why, then MCQs."
        />
        <CardBody>
          <div className="border border-gray-800 rounded-xl p-6 text-gray-300">
            <p>
              Placeholder screen. In the next step, you’ll get:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Scenario card (context + goal)</li>
              <li>Code snippet viewer (like //kood)</li>
              <li>Two reviewer feedback options (good vs poor)</li>
              <li>Explanation panel: why each is good/bad</li>
              <li>Quiz: select-all-that-apply + instant rationale</li>
            </ul>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Button onClick={() => nav(-1)}>Back</Button>
            <Button variant="secondary" onClick={() => nav("/academy/categories")}>
              Go to framework
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}