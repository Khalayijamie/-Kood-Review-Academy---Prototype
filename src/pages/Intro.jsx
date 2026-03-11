import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader } from "../components/ui";
import { useNavigate } from "react-router-dom";
import GuidedOverlay from "../components/GuidedOverlay";
import { reviewAcademyContent } from "../data/reviewAcademyContent";

function MemeCard({ meme }) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 flex flex-col items-center gap-3">
      <img
        src={meme.src}
        alt={meme.alt}
        className="max-w-sm w-full rounded-lg"
      />

      <p className="text-gray-400 text-sm italic text-center">
        {meme.caption}
      </p>
    </div>
  );
}

function VideoEmbed({ video }) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 flex flex-col gap-3">
      <p className="text-sm font-semibold text-koodAccent uppercase tracking-widest">
        Watch First
      </p>
      <h3 className="text-lg font-semibold">{video.title}</h3>
      <p className="text-gray-400 text-sm">{video.description}</p>
      <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

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
            {/* Core lesson content */}
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
