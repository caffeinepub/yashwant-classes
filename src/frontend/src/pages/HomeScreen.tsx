import type { AppPage } from "../App";

interface HomeCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  gradient: string;
  page: AppPage;
  onNavigate: (page: AppPage) => void;
  ocid: string;
  delay: number;
}

function HomeCard({
  emoji,
  title,
  subtitle,
  gradient,
  page,
  onNavigate,
  ocid,
  delay,
}: HomeCardProps) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={() => onNavigate(page)}
      className="child-card w-full text-left relative overflow-hidden p-5"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      <div
        className={`absolute inset-0 ${gradient} opacity-90`}
        aria-hidden="true"
      />
      {/* Decorative circles */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/20"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full bg-white/15"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center gap-4">
        <span className="text-5xl leading-none drop-shadow-sm">{emoji}</span>
        <div>
          <p className="font-display font-bold text-white text-xl leading-tight drop-shadow-sm">
            {title}
          </p>
          <p className="text-white/80 text-sm font-medium mt-0.5">{subtitle}</p>
        </div>
        <span className="ml-auto text-white/70 text-2xl">→</span>
      </div>
    </button>
  );
}

const homeCards = [
  {
    emoji: "🔢",
    title: "Counting",
    subtitle: "1 से 1000 तक गिनना",
    gradient: "counting-gradient",
    page: "counting" as AppPage,
    ocid: "home.counting_button",
  },
  {
    emoji: "🏛️",
    title: "Roman Counting",
    subtitle: "I से M तक Roman अंक",
    gradient: "matching-gradient",
    page: "roman" as AppPage,
    ocid: "home.roman_button",
  },
  {
    emoji: "🟦",
    title: "Squares / वर्ग",
    subtitle: "1² से 100² तक वर्ग",
    gradient: "squares-gradient",
    page: "squares" as AppPage,
    ocid: "home.squares_button",
  },
  {
    emoji: "🧠",
    title: "Squares Quiz",
    subtitle: "वर्ग का Quiz लगाओ!",
    gradient: "squares-quiz-gradient",
    page: "squares-quiz" as AppPage,
    ocid: "home.squares_quiz_button",
  },
  {
    emoji: "🍎",
    title: "Fruits / फल",
    subtitle: "30+ फलों के नाम",
    gradient: "fruits-gradient",
    page: "fruits" as AppPage,
    ocid: "home.fruits_button",
  },
  {
    emoji: "🥕",
    title: "Vegetables / सब्जियां",
    subtitle: "30+ सब्जियों के नाम",
    gradient: "vegetables-gradient",
    page: "vegetables" as AppPage,
    ocid: "home.vegetables_button",
  },
  {
    emoji: "🐄",
    title: "पालतू जानवर",
    subtitle: "18+ पालतू जानवरों के नाम",
    gradient: "paltu-gradient",
    page: "paltu-janwar" as AppPage,
    ocid: "home.paltu_janwar_button",
  },
  {
    emoji: "🦁",
    title: "जंगली जानवर",
    subtitle: "20+ जंगली जानवरों के नाम",
    gradient: "jangli-gradient",
    page: "jangli-janwar" as AppPage,
    ocid: "home.jangli_janwar_button",
  },
  {
    emoji: "🦋",
    title: "कीड़े मकोड़े",
    subtitle: "20+ कीड़ों के नाम",
    gradient: "fruits-gradient",
    page: "insects" as AppPage,
    ocid: "home.insects_button",
  },
  {
    emoji: "🌍",
    title: "ऋतुएँ / मौसम",
    subtitle: "6 मौसम और उनकी जानकारी",
    gradient: "squares-quiz-gradient",
    page: "seasons" as AppPage,
    ocid: "home.seasons_button",
  },
  {
    emoji: "🦅",
    title: "पक्षी",
    subtitle: "20+ पक्षियों के नाम",
    gradient: "paltu-gradient",
    page: "birds" as AppPage,
    ocid: "home.birds_button",
  },
  {
    emoji: "🚗",
    title: "यातायात के साधन",
    subtitle: "32 transport के नाम",
    gradient: "jangli-gradient",
    page: "transport" as AppPage,
    ocid: "home.transport_button",
  },
  {
    emoji: "🎯",
    title: "Matching Game",
    subtitle: "मिलाओ और सीखो!",
    gradient: "matching-gradient",
    page: "matching" as AppPage,
    ocid: "home.matching_button",
  },
  {
    emoji: "✏️",
    title: "Fill in the Blanks",
    subtitle: "रिक्त स्थान भरो",
    gradient: "blanks-gradient",
    page: "blanks" as AppPage,
    ocid: "home.blanks_button",
  },
];

interface HomeScreenProps {
  onNavigate: (page: AppPage) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="home-gradient min-h-full">
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-4">
        {/* Hero section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center gap-2 mb-3">
            {["🌟", "📚", "🎨", "🌈", "🎉"].map((emoji) => (
              <span
                key={emoji}
                className="text-3xl animate-float"
                style={{
                  animationDelay: `${["🌟", "📚", "🎨", "🌈", "🎉"].indexOf(emoji) * 0.3}s`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
          <h2 className="font-display font-extrabold text-3xl text-foreground mb-1">
            नमस्ते! Hello! 👋
          </h2>
          <p className="text-muted-foreground font-medium text-base">
            आज क्या सीखना है? What to learn today?
          </p>
        </div>

        {/* Cards grid */}
        <div className="flex flex-col gap-4">
          {homeCards.map((card, idx) => (
            <HomeCard
              key={card.page}
              {...card}
              onNavigate={onNavigate}
              delay={idx * 80}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-muted-foreground pb-4">
          <p>
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
