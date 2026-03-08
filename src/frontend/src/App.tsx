import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useActor } from "./hooks/useActor";
import { useIsAdmin } from "./hooks/useQueries";
import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";
import { QuestionsPage } from "./pages/QuestionsPage";
import { QuizAttemptPage } from "./pages/QuizAttemptPage";
import { QuizzesPage } from "./pages/QuizzesPage";
import { seedInitialData } from "./utils/seed";

type Page = "home" | "questions" | "quizzes" | "quiz-attempt" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [activeQuizId, setActiveQuizId] = useState<bigint | null>(null);
  const [seeded, setSeeded] = useState(false);

  const { actor } = useActor();
  const { data: isAdmin } = useIsAdmin();

  // Seed initial data once actor is ready
  useEffect(() => {
    if (actor && !seeded) {
      setSeeded(true);
      seedInitialData(actor).catch(console.error);
    }
  }, [actor, seeded]);

  const handleNavigate = (page: string) => {
    if (page === "admin" && !isAdmin) return;
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartQuiz = (quizId: bigint) => {
    setActiveQuizId(quizId);
    setCurrentPage("quiz-attempt");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromQuiz = () => {
    setActiveQuizId(null);
    setCurrentPage("quizzes");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Header
        currentPage={currentPage === "quiz-attempt" ? "quizzes" : currentPage}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 flex flex-col">
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "questions" && <QuestionsPage />}
        {currentPage === "quizzes" && (
          <QuizzesPage onStartQuiz={handleStartQuiz} />
        )}
        {currentPage === "quiz-attempt" && activeQuizId !== null && (
          <QuizAttemptPage quizId={activeQuizId} onBack={handleBackFromQuiz} />
        )}
        {currentPage === "admin" && isAdmin && <AdminPage />}
        {currentPage === "admin" && !isAdmin && (
          <main className="flex-1 flex items-center justify-center py-16 px-4">
            <div className="text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Access Restricted
              </h2>
              <p className="text-muted-foreground">
                Admin access required. Please login with an admin account.
              </p>
            </div>
          </main>
        )}
      </div>

      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}
