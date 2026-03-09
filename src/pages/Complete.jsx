import { Button, Card, CardBody } from "../components/ui";
import { academy } from "../data/reviewAcademy";
import { useNavigate } from "react-router-dom";

export default function Complete() {
  const nav = useNavigate();

  return (
    <div className="max-w-4xl">
      <Card className="min-h-[520px] flex items-center justify-center">
        <CardBody>
          <div className="text-center">
            <h1 className="text-4xl font-bold">You’ve got this!</h1>
            <p className="text-gray-300 mt-3">
              {academy.learner.name}, you’ve completed the Reviewer Academy foundation.
              Next: practice scenarios + quizzes inside each category.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <Button onClick={() => nav("/academy/categories")}>Revisit categories</Button>
              <Button variant="secondary" onClick={() => nav("/")}>Back to intro</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}