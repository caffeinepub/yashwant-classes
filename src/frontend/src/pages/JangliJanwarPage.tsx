import type { AppPage } from "../App";

interface JangliJanwarPageProps {
  onNavigate: (page: AppPage) => void;
}

const jangliAnimals = [
  { emoji: "🦁", hindi: "शेर", english: "Lion" },
  { emoji: "🐯", hindi: "बाघ", english: "Tiger" },
  { emoji: "🐘", hindi: "हाथी", english: "Elephant" },
  { emoji: "🐻", hindi: "भालू", english: "Bear" },
  { emoji: "🐺", hindi: "भेड़िया", english: "Wolf" },
  { emoji: "🦊", hindi: "लोमड़ी", english: "Fox" },
  { emoji: "🦌", hindi: "हिरण", english: "Deer" },
  { emoji: "🐒", hindi: "बंदर", english: "Monkey" },
  { emoji: "🦒", hindi: "जिराफ", english: "Giraffe" },
  { emoji: "🦓", hindi: "ज़ेबरा", english: "Zebra" },
  { emoji: "🦏", hindi: "गैंडा", english: "Rhino" },
  { emoji: "🦛", hindi: "दरियाई घोड़ा", english: "Hippo" },
  { emoji: "🐆", hindi: "चीता", english: "Cheetah" },
  { emoji: "🐅", hindi: "तेंदुआ", english: "Leopard" },
  { emoji: "🐍", hindi: "साँप", english: "Snake" },
  { emoji: "🐊", hindi: "मगरमच्छ", english: "Crocodile" },
  { emoji: "🦚", hindi: "मोर", english: "Peacock" },
  { emoji: "🦅", hindi: "बाज", english: "Eagle" },
  { emoji: "🦉", hindi: "उल्लू", english: "Owl" },
  { emoji: "🦋", hindi: "तितली", english: "Butterfly" },
];

const cardColors = [
  "bg-orange-50 border-orange-200",
  "bg-amber-50 border-amber-200",
  "bg-yellow-50 border-yellow-200",
  "bg-orange-50 border-orange-300",
];

export function JangliJanwarPage({ onNavigate }: JangliJanwarPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      {/* Back button */}
      <button
        type="button"
        data-ocid="jangli.back_button"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 mb-5 px-4 py-2 rounded-2xl font-semibold text-white transition-all active:scale-95"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.62 0.18 55) 0%, oklch(0.58 0.20 35) 100%)",
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
              "linear-gradient(135deg, oklch(0.72 0.20 55) 0%, oklch(0.68 0.22 35) 100%)",
          }}
        >
          🦁
        </div>
        <h1 className="font-display font-extrabold text-2xl text-foreground mb-1">
          जंगली जानवर
        </h1>
        <p className="text-muted-foreground font-semibold text-base">
          Wild Animals • {jangliAnimals.length} जानवर
        </p>
      </div>

      {/* Animals grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {jangliAnimals.map((animal, idx) => (
          <div
            key={animal.english}
            data-ocid={`jangli.item.${idx + 1}`}
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
