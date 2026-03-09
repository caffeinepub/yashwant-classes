import type { AppPage } from "../App";

interface SeasonsPageProps {
  onNavigate: (page: AppPage) => void;
}

const seasons = [
  {
    emoji: "☀️",
    hindi: "गर्मी",
    english: "Summer",
    desc: "गर्म मौसम • Hot Weather",
    color: "bg-orange-50 border-orange-300",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    emoji: "🌧️",
    hindi: "बरसात",
    english: "Monsoon / Rainy",
    desc: "बारिश का मौसम • Rainy Season",
    color: "bg-blue-50 border-blue-300",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    emoji: "🍂",
    hindi: "पतझड़",
    english: "Autumn / Fall",
    desc: "पत्ते झड़ने का मौसम • Falling Leaves",
    color: "bg-amber-50 border-amber-300",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    emoji: "❄️",
    hindi: "सर्दी",
    english: "Winter",
    desc: "ठंड का मौसम • Cold Weather",
    color: "bg-sky-50 border-sky-300",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    emoji: "🌸",
    hindi: "बसंत",
    english: "Spring",
    desc: "फूलों का मौसम • Flowers Bloom",
    color: "bg-pink-50 border-pink-300",
    badge: "bg-pink-100 text-pink-700",
  },
  {
    emoji: "🌤️",
    hindi: "शरद",
    english: "Early Winter",
    desc: "हल्की ठंड • Mild Cold",
    color: "bg-teal-50 border-teal-300",
    badge: "bg-teal-100 text-teal-700",
  },
];

const seasonDetails: Record<string, { items: string[]; icon: string }> = {
  Summer: {
    icon: "☀️",
    items: [
      "☀️ तेज धूप",
      "🌡️ गर्म हवा",
      "🍉 आम, तरबूज",
      "💧 पसीना आता है",
      "🧊 ठंडा पानी पीते हैं",
    ],
  },
  "Monsoon / Rainy": {
    icon: "🌧️",
    items: [
      "🌧️ बारिश होती है",
      "⛈️ बादल गरजते हैं",
      "🌈 इंद्रधनुष दिखता है",
      "☂️ छाता लेते हैं",
      "🐸 मेंढक बोलते हैं",
    ],
  },
  "Autumn / Fall": {
    icon: "🍂",
    items: [
      "🍂 पत्ते गिरते हैं",
      "🌬️ हवा चलती है",
      "🌾 फसल काटते हैं",
      "🍁 रंग-बिरंगे पत्ते",
      "🕯️ दिवाली आती है",
    ],
  },
  Winter: {
    icon: "❄️",
    items: [
      "❄️ ठंड लगती है",
      "🧥 गर्म कपड़े पहनते हैं",
      "🌫️ कोहरा होता है",
      "🔥 अलाव जलाते हैं",
      "☃️ बर्फ गिरती है",
    ],
  },
  Spring: {
    icon: "🌸",
    items: [
      "🌸 फूल खिलते हैं",
      "🦋 तितलियां आती हैं",
      "🌿 हरियाली होती है",
      "🐦 पक्षी गाते हैं",
      "🎨 रंगों का त्योहार होली",
    ],
  },
  "Early Winter": {
    icon: "🌤️",
    items: [
      "🌤️ हल्की धूप",
      "🍃 हल्की ठंड",
      "🌾 खेत लहलहाते हैं",
      "🎑 शरद पूर्णिमा",
      "🍏 फल पकते हैं",
    ],
  },
};

export function SeasonsPage({ onNavigate }: SeasonsPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      {/* Back button */}
      <button
        type="button"
        data-ocid="seasons.back_button"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 mb-5 px-4 py-2 rounded-2xl font-semibold text-white transition-all active:scale-95"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.60 0.20 30) 0%, oklch(0.52 0.22 50) 100%)",
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
              "linear-gradient(135deg, oklch(0.80 0.18 60) 0%, oklch(0.70 0.22 40) 100%)",
          }}
        >
          🌍
        </div>
        <h1 className="font-display font-extrabold text-2xl text-foreground mb-1">
          ऋतुएँ / मौसम
        </h1>
        <p className="text-muted-foreground font-semibold text-base">
          Seasons • {seasons.length} मौसम
        </p>
      </div>

      {/* Seasons cards */}
      <div className="flex flex-col gap-4">
        {seasons.map((season, idx) => {
          const details = seasonDetails[season.english];
          return (
            <div
              key={season.english}
              data-ocid={`seasons.item.${idx + 1}`}
              className={`child-card border-2 ${season.color} p-4`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-5xl leading-none">{season.emoji}</span>
                <div>
                  <h2 className="font-display font-extrabold text-xl text-foreground leading-tight">
                    {season.hindi}
                  </h2>
                  <span
                    className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-1 ${season.badge}`}
                  >
                    {season.english}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm font-medium mb-3">
                {season.desc}
              </p>
              {details && (
                <ul className="flex flex-col gap-1">
                  {details.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-foreground font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
