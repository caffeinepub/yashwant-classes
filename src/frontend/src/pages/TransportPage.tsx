import type { AppPage } from "../App";

interface TransportPageProps {
  onNavigate: (page: AppPage) => void;
}

const transports = [
  { emoji: "🚗", hindi: "कार", english: "Car" },
  { emoji: "🚕", hindi: "टैक्सी", english: "Taxi" },
  { emoji: "🚙", hindi: "जीप", english: "Jeep" },
  { emoji: "🚌", hindi: "बस", english: "Bus" },
  { emoji: "🚎", hindi: "ट्रॉली बस", english: "Trolley Bus" },
  { emoji: "🚐", hindi: "मिनी बस", english: "Mini Bus" },
  { emoji: "🚑", hindi: "एम्बुलेंस", english: "Ambulance" },
  { emoji: "🚒", hindi: "दमकल गाड़ी", english: "Fire Truck" },
  { emoji: "🚓", hindi: "पुलिस गाड़ी", english: "Police Car" },
  { emoji: "🚚", hindi: "ट्रक", english: "Truck" },
  { emoji: "🚛", hindi: "ट्रेलर ट्रक", english: "Trailer Truck" },
  { emoji: "🚜", hindi: "ट्रैक्टर", english: "Tractor" },
  { emoji: "🏎️", hindi: "रेस कार", english: "Race Car" },
  { emoji: "🏍️", hindi: "मोटरसाइकिल", english: "Motorcycle" },
  { emoji: "🛵", hindi: "स्कूटर", english: "Scooter" },
  { emoji: "🚲", hindi: "साइकिल", english: "Bicycle" },
  { emoji: "🛺", hindi: "ऑटो रिक्शा", english: "Auto Rickshaw" },
  { emoji: "🚃", hindi: "ट्रेन", english: "Train" },
  { emoji: "🚆", hindi: "एक्सप्रेस ट्रेन", english: "Express Train" },
  { emoji: "🚇", hindi: "मेट्रो", english: "Metro" },
  { emoji: "🚈", hindi: "लाइट रेल", english: "Light Rail" },
  { emoji: "🚂", hindi: "भाप इंजन", english: "Steam Engine" },
  { emoji: "✈️", hindi: "हवाई जहाज", english: "Aeroplane" },
  { emoji: "🚀", hindi: "रॉकेट", english: "Rocket" },
  { emoji: "🛸", hindi: "अंतरिक्ष यान", english: "Spacecraft" },
  { emoji: "🚁", hindi: "हेलीकॉप्टर", english: "Helicopter" },
  { emoji: "⛵", hindi: "नाव", english: "Sailboat" },
  { emoji: "🚢", hindi: "जहाज", english: "Ship" },
  { emoji: "🛥️", hindi: "मोटर बोट", english: "Motor Boat" },
  { emoji: "⛴️", hindi: "फेरी", english: "Ferry" },
  { emoji: "🚤", hindi: "स्पीडबोट", english: "Speedboat" },
  { emoji: "🛶", hindi: "डोंगी", english: "Canoe" },
];

const cardColors = [
  "bg-orange-50 border-orange-200",
  "bg-yellow-50 border-yellow-200",
  "bg-red-50 border-red-200",
  "bg-amber-50 border-amber-200",
];

export function TransportPage({ onNavigate }: TransportPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      {/* Back button */}
      <button
        type="button"
        data-ocid="transport.back_button"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 mb-5 px-4 py-2 rounded-2xl font-semibold text-white transition-all active:scale-95"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.60 0.22 45) 0%, oklch(0.52 0.25 30) 100%)",
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
              "linear-gradient(135deg, oklch(0.72 0.20 45) 0%, oklch(0.62 0.24 30) 100%)",
          }}
        >
          🚗
        </div>
        <h1 className="font-display font-extrabold text-2xl text-foreground mb-1">
          यातायात के साधन
        </h1>
        <p className="text-muted-foreground font-semibold text-base">
          Transport • {transports.length} साधन
        </p>
      </div>

      {/* Transport grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {transports.map((item, idx) => (
          <div
            key={`${item.english}-${idx}`}
            data-ocid={`transport.item.${idx + 1}`}
            className={`child-card border-2 ${cardColors[idx % cardColors.length]} p-3 flex flex-col items-center text-center gap-1.5`}
          >
            <span className="text-4xl leading-none">{item.emoji}</span>
            <div>
              <p className="font-display font-bold text-sm text-foreground leading-tight">
                {item.hindi}
              </p>
              <p
                className="text-muted-foreground font-medium mt-0.5"
                style={{ fontSize: "0.75rem" }}
              >
                {item.english}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
