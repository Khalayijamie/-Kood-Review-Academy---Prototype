import { academy } from "../data/reviewAcademy";
import { Button, Card, CardBody, CardHeader, Pill } from "../components/ui";
import { useNavigate } from "react-router-dom";
import GuidedOverlay from "../components/GuidedOverlay";
import { reviewAcademyContent } from "../data/reviewAcademyContent";

function MemeCard({ meme }) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 flex flex-col gap-3">
      <div className="w-full h-[480px] rounded-lg overflow-hidden bg-[#0f1720] flex items-center justify-center">
        <img
          src={meme.src}
          alt={meme.alt}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-gray-400 text-sm italic text-center">{meme.caption}</p>
    </div>
  );
}

function VideoEmbed({ video }) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 flex flex-col gap-3">
      <p className="text-sm font-semibold text-koodAccent uppercase tracking-widest">
        Keep it in mind
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

export default function CategoriesFramework() {
  const nav = useNavigate();
  const cats = academy.modules.filter((m) => m.type === "category");
  const { memes, video } = reviewAcademyContent.categoriesFunContent;

  return (
    <div className="max-w-6xl">
      <GuidedOverlay
        steps={reviewAcademyContent.guidedOverlays.categories}
        storageKey="overlay-categories"
      />
      <Card>
        <CardHeader
          title="Review categories framework"
          subtitle="Break any project into categories so reviews are consistent, fair, and test-driven — regardless of language or framework."
        />
        <CardBody>
          <div className="space-y-6">
            {/* Meme before the grid — keeps the energy light */}
            <MemeCard meme={memes[0]} />

            {/* Category cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cats.map((c) => (
                <button
                  key={c.id}
                  onClick={() => nav(`/academy/${c.id}`)}
                  className="text-left border border-gray-800 rounded-xl p-6 hover:bg-[#202b38] transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">{c.title}</h3>
                    <Pill tone={c.tag === "Advanced" ? "advanced" : "core"}>
                      {c.tag}
                    </Pill>
                  </div>
                  <p className="text-gray-300 mt-2">{c.definition}</p>
                  <div className="text-gray-500 text-sm mt-4">
                    Sub-categories: {c.subcategories.length} • {c.estimatedMins} min
                  </div>
                </button>
              ))}
            </div>

            {/* Second meme after the grid — reward for scrolling */}
            <MemeCard meme={memes[1]} />

            {/* Video to reinforce before they dive in */}
            <VideoEmbed video={video} />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Button onClick={() => nav(`/academy/${cats[0].id}`)}>
              Start first category
            </Button>
            <Button variant="secondary" onClick={() => nav("/academy/ground-rules")}>
              Next: Ground rules
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
