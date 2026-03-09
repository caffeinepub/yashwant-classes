import type { AppPage } from "../App";

interface InsectsPageProps {
  onNavigate: (page: AppPage) => void;
}

const insects = [
  { emoji: "🐝", hindi: "मधुमक्खी", english: "Bee" },
  { emoji: "🦋", hindi: "तितली", english: "Butterfly" },
  { emoji: "🐛", hindi: "कैटरपिलर", english: "Caterpillar" },
  { emoji: "🐜", hindi: "चींटी", english: "Ant" },
  { emoji: "🦗", hindi: "झींगुर", english: "Cricket" },
  { emoji: "🦟", hindi: "मच्छर", english: "Mosquito" },
  { emoji: "🪲", hindi: "भृंग", english: "Beetle" },
  { emoji: "🪳", hindi: "तिलचट्टा", english: "Cockroach" },
  { emoji: "🕷️", hindi: "मकड़ी", english: "Spider" },
  { emoji: "🦂", hindi: "बिच्छू", english: "Scorpion" },
  { emoji: "🐞", hindi: "लेडीबग", english: "Ladybug" },
  { emoji: "🦎", hindi: "छिपकली", english: "Lizard" },
  { emoji: "🪰", hindi: "मक्खी", english: "Fly" },
  { emoji: "🦋", hindi: "पतंगा", english: "Moth" },
  { emoji: "🐢", hindi: "कछुआ", english: "Turtle" },
  { emoji: "🐸", hindi: "मेंढक", english: "Frog" },
  { emoji: "🪱", hindi: "केंचुआ", english: "Earthworm" },
  { emoji: "🦗", hindi: "टिड्डी", english: "Grasshopper" },
  { emoji: "🐝", hindi: "ततैया", english: "Wasp" },
  { emoji: "🕸️", hindi: "मकड़ी का जाल", english: "Spider Web" },
];

const cardColors = [
  "bg-yellow-50 border-yellow-200",
  "bg-orange-50 border-orange-200",
  "bg-amber-50 border-amber-200",
  "bg-lime-50 border-lime-200",
];

export function InsectsPage({ onNavigate }: InsectsPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      {/* Back button */}
      <button
        type="button"
        data-ocid="insects.back_button"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 mb-5 px-4 py-2 rounded-2xl font-semibold text-white transition-all active:scale-95"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.18 75) 0%, oklch(0.58 0.22 55) 100%)",
        }}
      >
        <span className="text-lg">←</span>
        <span>Home</span>
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-3 text-5xl shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.16 80) 0%, oklch(0.70 0.20 60) 100%)",
          }}
        >
          🦋
        </div>
        <h1 className="font-display font-extrabold text-2xl text-foreground mb-1">
          कीड़े मकोड़े
        </h1>
        <p className="text-muted-foreground font-semibold text-base">
          Insects &amp; Bugs • {insects.length} कीड़े
        </p>
      </div>

      {/* Insects grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {insects.map((insect, idx) => (
          <div
            key={`${insect.english}-${idx}`}
            data-ocid={`insects.item.${idx + 1}`}
            className={`child-card border-2 ${cardColors[idx % cardColors.length]} p-3 flex flex-col items-center text-center gap-1.5`}
          >
            <span className="text-4xl leading-none">{insect.emoji}</span>
            <div>
              <p className="font-display font-bold text-sm text-foreground leading-tight">
                {insect.hindi}
              </p>
              <p
                className="text-muted-foreground font-medium mt-0.5"
                style={{ fontSize: "0.75rem" }}
              >
                {insect.english}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
