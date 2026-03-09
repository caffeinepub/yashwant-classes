import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { BottomNav } from "./components/BottomNav";
import { BirdsPage } from "./pages/BirdsPage";
import { CountingPage } from "./pages/CountingPage";
import { FillBlanks } from "./pages/FillBlanks";
import { FruitsPage } from "./pages/FruitsPage";
import { HomeScreen } from "./pages/HomeScreen";
import { InsectsPage } from "./pages/InsectsPage";
import { JangliJanwarPage } from "./pages/JangliJanwarPage";
import { MatchingGame } from "./pages/MatchingGame";
import { PaltuJanwarPage } from "./pages/PaltuJanwarPage";
import { RomanCountingPage } from "./pages/RomanCountingPage";
import { SeasonsPage } from "./pages/SeasonsPage";
import { SquaresPage } from "./pages/SquaresPage";
import { SquaresQuizPage } from "./pages/SquaresQuizPage";
import { TransportPage } from "./pages/TransportPage";
import { VegetablesPage } from "./pages/VegetablesPage";

export type AppPage =
  | "home"
  | "counting"
  | "roman"
  | "squares"
  | "squares-quiz"
  | "fruits"
  | "vegetables"
  | "matching"
  | "blanks"
  | "paltu-janwar"
  | "jangli-janwar"
  | "insects"
  | "seasons"
  | "birds"
  | "transport";

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("home");

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <AppHeader currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1 pb-safe">
        {currentPage === "home" && <HomeScreen onNavigate={handleNavigate} />}
        {currentPage === "counting" && <CountingPage />}
        {currentPage === "roman" && <RomanCountingPage />}
        {currentPage === "squares" && <SquaresPage />}
        {currentPage === "squares-quiz" && <SquaresQuizPage />}
        {currentPage === "fruits" && <FruitsPage />}
        {currentPage === "vegetables" && <VegetablesPage />}
        {currentPage === "matching" && <MatchingGame />}
        {currentPage === "blanks" && <FillBlanks />}
        {currentPage === "paltu-janwar" && (
          <PaltuJanwarPage onNavigate={handleNavigate} />
        )}
        {currentPage === "jangli-janwar" && (
          <JangliJanwarPage onNavigate={handleNavigate} />
        )}
        {currentPage === "insects" && (
          <InsectsPage onNavigate={handleNavigate} />
        )}
        {currentPage === "seasons" && (
          <SeasonsPage onNavigate={handleNavigate} />
        )}
        {currentPage === "birds" && <BirdsPage onNavigate={handleNavigate} />}
        {currentPage === "transport" && (
          <TransportPage onNavigate={handleNavigate} />
        )}
      </main>

      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
      <Toaster position="top-center" richColors />
    </div>
  );
}
