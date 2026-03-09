import type { AppPage } from "../App";

const pageTitles: Record<AppPage, string> = {
  home: "Nitya Learning App",
  counting: "🔢 Counting 1-1000",
  roman: "🏛️ Roman Counting 1-1000",
  squares: "🟦 Squares / वर्ग 1-100",
  "squares-quiz": "🧠 Squares Quiz",
  fruits: "🍎 Fruits / फल",
  vegetables: "🥕 Vegetables / सब्जियां",
  matching: "🎯 Matching Game",
  blanks: "✏️ Fill in the Blanks",
  "paltu-janwar": "🐄 पालतू जानवर",
  "jangli-janwar": "🦁 जंगली जानवर",
  insects: "🦋 कीड़े मकोड़े",
  seasons: "🌍 ऋतुएँ / मौसम",
  birds: "🦅 पक्षी",
  transport: "🚗 यातायात के साधन",
};

interface AppHeaderProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export function AppHeader({ currentPage, onNavigate }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
        {currentPage !== "home" && (
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="p-2 rounded-xl hover:bg-muted active:scale-95 transition-all text-lg"
            aria-label="Back to home"
          >
            ←
          </button>
        )}
        <h1
          className="font-display font-bold text-lg text-foreground flex-1"
          style={{ letterSpacing: "-0.02em" }}
        >
          {pageTitles[currentPage]}
        </h1>
        {currentPage === "home" && (
          <span className="text-2xl animate-bounce-gentle">🌟</span>
        )}
      </div>
    </header>
  );
}
