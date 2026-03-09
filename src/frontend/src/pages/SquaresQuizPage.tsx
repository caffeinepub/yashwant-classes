import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

const TOTAL_QUESTIONS = 10;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface Question {
  n: number;
  correct: number;
  options: number[];
}

function generateQuestions(): Question[] {
  const nums = shuffle(Array.from({ length: 100 }, (_, i) => i + 1)).slice(
    0,
    TOTAL_QUESTIONS,
  );
  return nums.map((n) => {
    const correct = n * n;
    // Generate 3 wrong options nearby
    const wrongs = new Set<number>();
    while (wrongs.size < 3) {
      const offset = Math.floor(Math.random() * 20) - 10;
      const candidate = correct + offset * (n > 10 ? n : 1);
      if (candidate !== correct && candidate > 0) {
        wrongs.add(candidate);
      }
    }
    return {
      n,
      correct,
      options: shuffle([correct, ...Array.from(wrongs)]),
    };
  });
}

type QuizState = "playing" | "answered" | "finished";

export function SquaresQuizPage() {
  const [questions, setQuestions] = useState<Question[]>(() =>
    generateQuestions(),
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<QuizState>("playing");

  const current = questions[currentIdx];

  const handleAnswer = (option: number) => {
    if (quizState !== "playing") return;
    setSelected(option);
    setQuizState("answered");
    if (option === current.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= TOTAL_QUESTIONS) {
      setQuizState("finished");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setQuizState("playing");
    }
  }, [currentIdx]);

  const handleRestart = () => {
    setQuestions(generateQuestions());
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setQuizState("playing");
  };

  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

  if (quizState === "finished") {
    const emoji =
      percentage === 100
        ? "🏆"
        : percentage >= 80
          ? "🌟"
          : percentage >= 60
            ? "😊"
            : percentage >= 40
              ? "💪"
              : "📚";
    return (
      <div className="max-w-md mx-auto px-4 py-10 flex flex-col items-center text-center">
        <span className="text-8xl mb-4 animate-bounce-in">{emoji}</span>
        <h2 className="font-display font-extrabold text-3xl text-foreground mb-2">
          Quiz खत्म!
        </h2>
        <p className="text-muted-foreground text-base mb-6">
          आपने {score}/{TOTAL_QUESTIONS} सवाल सही किए
        </p>

        {/* Score ring */}
        <div
          className="w-36 h-36 rounded-full flex flex-col items-center justify-center mb-8 shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.22 200), oklch(0.58 0.22 260))",
          }}
        >
          <span className="font-display font-extrabold text-white text-4xl leading-none">
            {percentage}%
          </span>
          <span className="text-white/80 text-sm font-medium mt-1">Score</span>
        </div>

        <p className="font-bold text-lg text-foreground mb-6">
          {percentage === 100
            ? "शाबाश! बिल्कुल सही! 🎉"
            : percentage >= 80
              ? "बहुत बढ़िया! Keep it up!"
              : percentage >= 60
                ? "अच्छा किया! थोड़ा और practice करो"
                : "हार मत मानो! दोबारा try करो!"}
        </p>

        <Button
          data-ocid="squares-quiz.restart_button"
          onClick={handleRestart}
          size="lg"
          className="rounded-2xl h-14 px-10 font-bold text-lg text-white border-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.22 200), oklch(0.58 0.22 260))",
          }}
        >
          फिर से खेलो 🔄
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-5">
      {/* Progress header */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="text-white px-4 py-2 rounded-2xl font-display font-bold text-sm"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.22 200), oklch(0.58 0.22 260))",
          }}
        >
          ⭐ Score: {score}
        </div>
        <div className="bg-muted text-muted-foreground px-4 py-2 rounded-2xl font-bold text-sm">
          {currentIdx + 1} / {TOTAL_QUESTIONS}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 bg-muted rounded-full mb-6 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(currentIdx / TOTAL_QUESTIONS) * 100}%`,
            background:
              "linear-gradient(90deg, oklch(0.65 0.22 200), oklch(0.58 0.22 260))",
          }}
        />
      </div>

      {/* Question card */}
      <div
        className="rounded-3xl p-6 mb-6 text-center shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.93 0.06 210), oklch(0.91 0.07 250))",
          border: "1px solid oklch(0.82 0.10 220)",
        }}
      >
        <p className="text-muted-foreground text-sm font-medium mb-3">
          इसका वर्ग (square) क्या है?
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="font-display font-extrabold text-6xl text-foreground leading-none">
            {current.n}
          </span>
          <span
            className="font-display font-extrabold text-3xl leading-none"
            style={{ color: "oklch(0.58 0.22 260)" }}
          >
            ²
          </span>
        </div>
        <p className="text-muted-foreground text-xs mt-2">
          {current.n} × {current.n} = ?
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {current.options.map((option, i) => {
          const isCorrect = option === current.correct;
          const isSelected = selected === option;
          const showResult = quizState === "answered";

          let btnClass =
            "rounded-2xl h-16 font-display font-bold text-xl transition-all border-2";
          let btnStyle: React.CSSProperties = {};

          if (showResult) {
            if (isCorrect) {
              btnClass += " text-white border-0 animate-bounce-in";
              btnStyle = {
                background:
                  "linear-gradient(135deg, oklch(0.65 0.18 155), oklch(0.58 0.20 145))",
              };
            } else if (isSelected) {
              btnClass += " text-white border-0 animate-shake";
              btnStyle = {
                background:
                  "linear-gradient(135deg, oklch(0.577 0.245 27), oklch(0.52 0.22 20))",
              };
            } else {
              btnClass +=
                " opacity-40 border-border bg-card text-muted-foreground";
            }
          } else {
            btnClass +=
              " bg-card border-border text-foreground hover:border-primary/60 hover:scale-105 active:scale-95";
          }

          return (
            <button
              type="button"
              key={`opt-${i}-${option}`}
              data-ocid={`squares-quiz.option.${i + 1}`}
              onClick={() => handleAnswer(option)}
              disabled={quizState === "answered"}
              className={btnClass}
              style={btnStyle}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {quizState === "answered" && (
        <div className="text-center animate-bounce-in">
          <p className="font-bold text-lg text-foreground mb-4">
            {selected === current.correct
              ? "✅ शाबाश! बिल्कुल सही!"
              : `❌ गलत! सही जवाब: ${current.correct}`}
          </p>
          <Button
            data-ocid="squares-quiz.next_button"
            onClick={handleNext}
            size="lg"
            className="rounded-2xl h-14 px-8 font-bold text-lg text-white border-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.22 200), oklch(0.58 0.22 260))",
            }}
          >
            {currentIdx + 1 >= TOTAL_QUESTIONS
              ? "Result देखो 🏆"
              : "अगला सवाल →"}
          </Button>
        </div>
      )}
    </div>
  );
}
