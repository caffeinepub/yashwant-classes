import type { AppPage } from "../App";

interface NavItem {
  page: AppPage;
  emoji: string;
  label: string;
  ocid: string;
}

const navItems: NavItem[] = [
  { page: "home", emoji: "🏠", label: "Home", ocid: "nav.home_link" },
  { page: "counting", emoji: "🔢", label: "Count", ocid: "nav.counting_link" },
  { page: "roman", emoji: "🏛️", label: "Roman", ocid: "nav.roman_link" },
  { page: "fruits", emoji: "🍎", label: "Fruits", ocid: "nav.fruits_link" },
  {
    page: "vegetables",
    emoji: "🥕",
    label: "Veggies",
    ocid: "nav.vegetables_link",
  },
  { page: "matching", emoji: "🎯", label: "Match", ocid: "nav.matching_link" },
  { page: "blanks", emoji: "✏️", label: "Blanks", ocid: "nav.blanks_link" },
];

interface BottomNavProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="max-w-2xl mx-auto flex items-stretch">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          return (
            <button
              type="button"
              key={item.page}
              data-ocid={item.ocid}
              onClick={() => onNavigate(item.page)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-all active:scale-90 min-h-[64px] ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className={`text-xl leading-none transition-transform ${isActive ? "scale-125" : ""}`}
              >
                {item.emoji}
              </span>
              <span
                className={`text-[10px] font-semibold leading-none mt-0.5 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-[calc(env(safe-area-inset-bottom)+56px)] w-6 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
