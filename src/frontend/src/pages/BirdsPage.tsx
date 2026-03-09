import type { AppPage } from "../App";

interface BirdsPageProps {
  onNavigate: (page: AppPage) => void;
}

const birds = [
  { emoji: "🦅", hindi: "चील", english: "Eagle" },
  { emoji: "🦜", hindi: "तोता", english: "Parrot" },
  { emoji: "🦚", hindi: "मोर", english: "Peacock" },
  { emoji: "🦢", hindi: "हंस", english: "Swan" },
  { emoji: "🦩", hindi: "राजहंस", english: "Flamingo" },
  { emoji: "🦉", hindi: "उल्लू", english: "Owl" },
  { emoji: "🐧", hindi: "पेंगुइन", english: "Penguin" },
  { emoji: "🦆", hindi: "बत्तख", english: "Duck" },
  { emoji: "🐦", hindi: "कबूतर", english: "Pigeon" },
  { emoji: "🐓", hindi: "मुर्गी", english: "Hen" },
  { emoji: "🦃", hindi: "टर्की", english: "Turkey" },
  { emoji: "🦤", hindi: "डोडो", english: "Dodo" },
  { emoji: "🦜", hindi: "मैना", english: "Myna" },
  { emoji: "🐦‍⬛", hindi: "कौवा", english: "Crow" },
  { emoji: "🦅", hindi: "बाज", english: "Hawk" },
  { emoji: "🦋", hindi: "बुलबुल", english: "Nightingale" },
  { emoji: "🐤", hindi: "चूजा", english: "Chick" },
  { emoji: "🦚", hindi: "मुर्गा", english: "Rooster" },
  { emoji: "🦢", hindi: "बगुला", english: "Heron" },
  { emoji: "🦅", hindi: "गरुड़", english: "Vulture" },
];

const cardColors = [
  "bg-sky-50 border-sky-200",
  "bg-blue-50 border-blue-200",
  "bg-indigo-50 border-indigo-200",
  "bg-cyan-50 border-cyan-200",
];

export function BirdsPage({ onNavigate }: BirdsPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      {/* Back button */}
      <button
        type="button"
        data-ocid="birds.back_button"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 mb-5 px-4 py-2 rounded-2xl font-semibold text-white transition-all active:scale-95"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.58 0.20 240) 0%, oklch(0.50 0.22 260) 100%)",
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
              "linear-gradient(135deg, oklch(0.72 0.18 240) 0%, oklch(0.65 0.22 220) 100%)",
          }}
        >
          🦅
        </div>
        <h1 className="font-display font-extrabold text-2xl text-foreground mb-1">
          पक्षी
        </h1>
        <p className="text-muted-foreground font-semibold text-base">
          Birds • {birds.length} पक्षी
        </p>
      </div>

      {/* Birds grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {birds.map((bird, idx) => (
          <div
            key={`${bird.english}-${idx}`}
            data-ocid={`birds.item.${idx + 1}`}
            className={`child-card border-2 ${cardColors[idx % cardColors.length]} p-3 flex flex-col items-center text-center gap-1.5`}
          >
            <span className="text-4xl leading-none">{bird.emoji}</span>
            <div>
              <p className="font-display font-bold text-sm text-foreground leading-tight">
                {bird.hindi}
              </p>
              <p
                className="text-muted-foreground font-medium mt-0.5"
                style={{ fontSize: "0.75rem" }}
              >
                {bird.english}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
