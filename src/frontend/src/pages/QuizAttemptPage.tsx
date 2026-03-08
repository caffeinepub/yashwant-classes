import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuizWithQuestions, useSubmitQuizAttempt } from "@/hooks/useQueries";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { QuizQuestion } from "../backend.d";

const OPTIONS = ["A", "B", "C", "D"] as const;
type OptionKey = (typeof OPTIONS)[number];

const OPTION_LABELS: Record<OptionKey, keyof QuizQuestion> = {
  A: "optionA",
  B: "optionB",
  C: "optionC",
  D: "optionD",
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

interface ResultData {
  score: number;
  total: number;
  answers: Record<string, string>;
  questions: QuizQuestion[];
}

interface QuizResultProps {
  result: ResultData;
  quizTitle: string;
  onRetry: () => void;
  onBack: () => void;
}

function QuizResult({ result, quizTitle, onRetry, onBack }: QuizResultProps) {
  const percentage =
    result.total > 0 ? Math.round((result.score / result.total) * 100) : 0;

  const getGrade = () => {
    if (percentage >= 90)
      return { label: "Outstanding!", color: "text-green-600", emoji: "🏆" };
    if (percentage >= 75)
      return { label: "Excellent!", color: "text-blue-600", emoji: "⭐" };
    if (percentage >= 60)
      return { label: "Good Job!", color: "text-yellow-600", emoji: "👍" };
    if (percentage >= 40)
      return {
        label: "Keep Practicing!",
        color: "text-orange-600",
        emoji: "📚",
      };
    return { label: "Keep Studying!", color: "text-red-600", emoji: "💪" };
  };

  const grade = getGrade();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        data-ocid="result.success_state"
      >
        <Card className="overflow-hidden shadow-card mb-8">
          <div className="h-3 bg-gradient-to-r from-brand-saffron to-brand-gold" />
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">{grade.emoji}</div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-1">
              {grade.label}
            </h2>
            <p className="text-muted-foreground mb-6">{quizTitle}</p>

            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <p className="font-display text-5xl font-bold text-foreground">
                  {percentage}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">Score</p>
              </div>
              <div className="w-px h-16 bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-green-600">
                  {result.score}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Correct</p>
              </div>
              <div className="w-px h-16 bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-red-500">
                  {result.total - result.score}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Wrong</p>
              </div>
            </div>

            <Progress value={percentage} className="h-3 rounded-full mb-6" />

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={onRetry}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retry Quiz
              </Button>
              <Button
                onClick={onBack}
                className="bg-primary text-primary-foreground flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Quizzes
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Review Section */}
      <h3 className="font-display text-xl font-bold text-foreground mb-4">
        Review Answers
      </h3>
      <div className="space-y-4">
        {result.questions.map((question, qi) => {
          const userAnswer = result.answers[question.id.toString()];
          const isCorrect = userAnswer === question.correctOption;

          return (
            <motion.div
              key={question.id.toString()}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qi * 0.08, duration: 0.3 }}
            >
              <Card
                className={`overflow-hidden border-2 ${isCorrect ? "border-green-200" : "border-red-200"}`}
              >
                <div
                  className={`h-1.5 ${isCorrect ? "bg-green-500" : "bg-red-500"}`}
                />
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="font-body text-sm font-medium text-foreground leading-relaxed">
                      <span className="font-display font-bold mr-2">
                        Q{qi + 1}.
                      </span>
                      {question.questionText}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {OPTIONS.map((opt) => {
                      const optionText = question[OPTION_LABELS[opt]] as string;
                      const isUserAnswer = userAnswer === opt;
                      const isCorrectAnswer = question.correctOption === opt;

                      let style =
                        "bg-muted/50 border-border text-muted-foreground";
                      if (isCorrectAnswer)
                        style =
                          "bg-green-50 border-green-400 text-green-800 font-semibold";
                      else if (isUserAnswer && !isCorrect)
                        style = "bg-red-50 border-red-400 text-red-800";

                      return (
                        <div
                          key={opt}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs ${style}`}
                        >
                          <span className="font-bold w-5 flex-shrink-0">
                            {opt}.
                          </span>
                          <span>{optionText}</span>
                          {isCorrectAnswer && (
                            <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-green-600 flex-shrink-0" />
                          )}
                          {isUserAnswer && !isCorrect && (
                            <XCircle className="w-3.5 h-3.5 ml-auto text-red-600 flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {question.explanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-700 leading-relaxed">
                        <span className="font-bold">💡 Explanation: </span>
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

interface QuizAttemptPageProps {
  quizId: bigint;
  onBack: () => void;
}

export function QuizAttemptPage({ quizId, onBack }: QuizAttemptPageProps) {
  const { data, isLoading, error } = useQuizWithQuestions(quizId);
  const submitMutation = useSubmitQuizAttempt();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [quizKey, setQuizKey] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const quiz = data?.quiz;
  const questions = data?.questions ?? [];

  // Initialize timer
  useEffect(() => {
    if (quiz && timeLeft === null && !quizSubmitted) {
      setTimeLeft(Number(quiz.timeLimitMinutes) * 60);
    }
  }, [quiz, timeLeft, quizSubmitted]);

  // Countdown
  useEffect(() => {
    if (timeLeft === null || quizSubmitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, quizSubmitted]);

  const handleAnswerSelect = useCallback(
    (questionId: string, option: string) => {
      setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (!quiz || questions.length === 0) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const answersArray: Array<[bigint, string]> = questions.map((q) => [
      q.id,
      selectedAnswers[q.id.toString()] ?? "",
    ]);

    try {
      await submitMutation.mutateAsync({
        quizId: quiz.id,
        answers: answersArray,
      });

      // Calculate score locally
      let score = 0;
      for (const q of questions) {
        const answer = selectedAnswers[q.id.toString()];
        if (answer === q.correctOption) score++;
      }

      setResultData({
        score,
        total: questions.length,
        answers: selectedAnswers,
        questions,
      });
      setQuizSubmitted(true);
      toast.success("Quiz submitted successfully!");
    } catch {
      toast.error("Failed to submit. Calculating score locally...");
      let score = 0;
      for (const q of questions) {
        const answer = selectedAnswers[q.id.toString()];
        if (answer === q.correctOption) score++;
      }
      setResultData({
        score,
        total: questions.length,
        answers: selectedAnswers,
        questions,
      });
      setQuizSubmitted(true);
    }
  }, [quiz, questions, selectedAnswers, submitMutation]);

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(null);
    setQuizSubmitted(false);
    setResultData(null);
    setQuizKey((k) => k + 1);
  };

  if (isLoading) {
    return (
      <main
        className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-8"
        data-ocid="quiz.loading_state"
      >
        <Skeleton className="h-8 w-48 mb-8" />
        <Skeleton className="h-64 rounded-2xl mb-4" />
        <Skeleton className="h-12 rounded-xl" />
      </main>
    );
  }

  if (error || !quiz) {
    return (
      <main
        className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-8"
        data-ocid="quiz.error_state"
      >
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load quiz. Please try again.
          </AlertDescription>
        </Alert>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>
      </main>
    );
  }

  if (quizSubmitted && resultData) {
    return (
      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          All Quizzes
        </Button>
        <QuizResult
          result={resultData}
          quizTitle={quiz.title}
          onRetry={handleRetry}
          onBack={onBack}
        />
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Alert>
          <AlertDescription>This quiz has no questions yet.</AlertDescription>
        </Alert>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </main>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestion.id.toString()];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allAnswered = answeredCount === questions.length;
  const isTimeLow = timeLeft !== null && timeLeft <= 60;

  return (
    <main key={quizKey} className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Timer */}
        {timeLeft !== null && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-display font-bold text-sm ${
              isTimeLow
                ? "bg-red-100 text-red-700 border-2 border-red-300 animate-pulse"
                : "bg-muted text-foreground"
            }`}
          >
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Quiz title + progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display text-xl font-bold text-foreground line-clamp-1">
            {quiz.title}
          </h1>
          <Badge variant="secondary" className="text-xs flex-shrink-0 ml-2">
            {currentQuestionIndex + 1} / {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2 rounded-full" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="shadow-card mb-6 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-brand-saffron to-brand-gold" />
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-6">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-display font-bold text-primary">
                  {currentQuestionIndex + 1}
                </span>
                <p className="font-body text-base font-medium text-foreground leading-relaxed">
                  {currentQuestion.questionText}
                </p>
              </div>

              <div className="space-y-3">
                {OPTIONS.map((opt) => {
                  const optionText = currentQuestion[
                    OPTION_LABELS[opt]
                  ] as string;
                  const isSelected = selectedAnswer === opt;

                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() =>
                        handleAnswerSelect(currentQuestion.id.toString(), opt)
                      }
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150 quiz-option-hover ${
                        isSelected
                          ? "bg-primary/10 border-primary text-foreground font-medium"
                          : "bg-card border-border text-foreground hover:border-primary/40 hover:bg-accent/40"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-display font-bold text-sm ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {opt}
                      </span>
                      <span className="text-sm leading-snug">{optionText}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 ml-auto text-primary flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {questions.map((q, qi) => {
            const isAnswered = !!selectedAnswers[q.id.toString()];
            const isCurrent = qi === currentQuestionIndex;
            return (
              <button
                type="button"
                key={q.id.toString()}
                onClick={() => setCurrentQuestionIndex(qi)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  isCurrent
                    ? "bg-primary w-4"
                    : isAnswered
                      ? "bg-primary/50"
                      : "bg-muted-foreground/30"
                }`}
              />
            );
          })}
        </div>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            data-ocid="quiz.submit_button"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            <Trophy className="w-4 h-4 mr-1" />
            {submitMutation.isPending
              ? "Submitting..."
              : allAnswered
                ? "Submit Quiz"
                : `Submit (${answeredCount}/${questions.length})`}
          </Button>
        ) : (
          <Button
            onClick={() =>
              setCurrentQuestionIndex((i) =>
                Math.min(questions.length - 1, i + 1),
              )
            }
            className="bg-primary text-primary-foreground"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>

      {/* Answered indicator */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        {answeredCount} of {questions.length} questions answered
      </p>
    </main>
  );
}
