import type { AppPage } from "../App";

interface PaltuJanwarPageProps {
  onNavigate: (page: AppPage) => void;
}

const paltuAnimals = [
  { emoji: "🐕", hindi: "कुत्ता", english: "Dog" },
  { emoji: "🐈", hindi: "बिल्ली", english: "Cat" },
  { emoji: "🐄", hindi: "गाय", english: "Cow" },
  { emoji: "🐃", hindi: "भैंस", english: "Buffalo" },
  { emoji: "🐐", hindi: "बकरी", english: "Goat" },
  { emoji: "🐑", hindi: "भेड़", english: "Sheep" },
  { emoji: "🐎", hindi: "घोड़ा", english: "Horse" },
  { emoji: "🫏", hindi: "गधा", english: "Donkey" },
  { emoji: "🐇", hindi: "खरगोश", english: "Rabbit" },
  { emoji: "🐓", hindi: "मुर्गी", english: "Hen" },
  { emoji: "🦆", hindi: "बत्तख", english: "Duck" },
  { emoji: "🦜", hindi: "तोता", english: "Parrot" },
  { emoji: "🐦", hindi: "कबूतर", english: "Pigeon" },
  { emoji: "🐟", hindi: "मछली", english: "Fish" },
  { emoji: "🐖", hindi: "सूअर", english: "Pig" },
  { emoji: "🐪", hindi: "ऊँट", english: "Camel" },
  { emoji: "🐘", hindi: "हाथी", english: "Elephant" },
  { emoji: "🐂", hindi: "बैल", english: "Ox" },
];

const cardColors = [
  "bg-emerald-50 border-emerald-200",
  "bg-teal-50 border-teal-200",
  "bg-green-50 border-green-200",
  "bg-cyan-50 border-cyan-200",
];

export function PaltuJanwarPage({ onNavigate }: PaltuJanwarPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      {/* Back button */}
      <button
        type="button"
        data-ocid="paltu.back_button"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 mb-5 px-4 py-2 rounded-2xl font-semibold text-white transition-all active:scale-95"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.60 0.18 155) 0%, oklch(0.52 0.20 180) 100%)",
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
              "linear-gradient(135deg, oklch(0.68 0.18 155) 0%, oklch(0.72 0.14 170) 100%)",
          }}
        >
          🐄
        </div>
        <h1 className="font-display font-extrabold text-2xl text-foreground mb-1">
          पालतू जानवर
        </h1>
        <p className="text-muted-foreground font-semibold text-base">
          Pet Animals • {paltuAnimals.length} जानवर
        </p>
      </div>

      {/* Animals grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {paltuAnimals.map((animal, idx) => (
          <div
            key={animal.english}
            data-ocid={`paltu.item.${idx + 1}`}
            className={`child-card border-2 ${cardColors[idx % cardColors.length]} p-3 flex flex-col items-center text-center gap-1.5`}
          >
            <span className="text-4xl leading-none">{animal.emoji}</span>
            <div>
              <p className="font-display font-bold text-sm text-foreground leading-tight">
                {animal.hindi}
              </p>
              <p
                className="text-muted-foreground font-medium mt-0.5"
                style={{ fontSize: "0.75rem" }}
              >
                {animal.english}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
