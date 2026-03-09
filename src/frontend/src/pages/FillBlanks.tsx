import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { fruits } from "../data/fruits";
import type { LearnItem } from "../data/fruits";
import { vegetables } from "../data/vegetables";

const ALL_ITEMS = [...fruits, ...vegetables];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface BlankQuestion {
  item: LearnItem;
  word: string;
  blankIndex: number;
  displayWord: string;
  correctLetter: string;
  options: string[];
}

function generateQuestion(item: LearnItem): BlankQuestion {
  const word = item.english
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Z]/g, "");
  // Pick a blank position (avoid first letter for easier difficulty)
  const minIdx = word.length > 3 ? 1 : 0;
  const blankIndex =
    Math.floor(Math.random() * (word.length - minIdx)) + minIdx;
  const correctLetter = word[blankIndex];
  const displayWord = word
    .split("")
    .map((ch, i) => (i === blankIndex ? "_" : ch))
    .join("");

  // Generate wrong letter options
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const wrongLetters = new Set<string>();
  while (wrongLetters.size < 3) {
    const randLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (randLetter !== correctLetter) wrongLetters.add(randLetter);
  }

  const options = shuffle([correctLetter, ...Array.from(wrongLetters)]);
  return { item, word, blankIndex, displayWord, correctLetter, options };
}

const OPTION_COLORS = [
  "bg-blue-100 border-blue-400 hover:bg-blue-200 active:scale-90 text-blue-800",
  "bg-green-100 border-green-400 hover:bg-green-200 active:scale-90 text-green-800",
  "bg-orange-100 border-orange-400 hover:bg-orange-200 active:scale-90 text-orange-800",
  "bg-purple-100 border-purple-400 hover:bg-purple-200 active:scale-90 text-purple-800",
];

const WRONG_COLOR = "bg-red-100 border-red-500 text-red-800";
const CORRECT_COLOR = "bg-green-200 border-green-600 text-green-900";

type AnswerState = "idle" | "correct" | "wrong";

interface OptionState {
  letter: string;
  state: AnswerState;
}

function pickNextItem(exclude: Set<number>): { item: LearnItem; idx: number } {
  const available = ALL_ITEMS.map((_, i) => i).filter((i) => !exclude.has(i));
  const pool = available.length > 0 ? available : ALL_ITEMS.map((_, i) => i);
  const chosenIdx = pool[Math.floor(Math.random() * pool.length)];
  return { item: ALL_ITEMS[chosenIdx], idx: chosenIdx };
}

export function FillBlanks() {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [question, setQuestion] = useState<BlankQuestion>(() => {
    const idx = Math.floor(Math.random() * ALL_ITEMS.length);
    return generateQuestion(ALL_ITEMS[idx]);
  });
  const [filledWord, setFilledWord] = useState<string | null>(null);
  const [optionStates, setOptionStates] = useState<OptionState[]>(() =>
    question.options.map((l) => ({ letter: l, state: "idle" as AnswerState })),
  );
  const [celebrating, setCelebrating] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const nextQuestion = useCallback(() => {
    const currentIdx = ALL_ITEMS.indexOf(question.item);
    const next = new Set(usedIndices);
    next.add(currentIdx);
    if (next.size >= ALL_ITEMS.length) next.clear();

    const { item } = pickNextItem(next);
    const newQ = generateQuestion(item);

    setUsedIndices(next);
    setQuestion(newQ);
    setFilledWord(null);
    setOptionStates(
      newQ.options.map((l) => ({ letter: l, state: "idle" as AnswerState })),
    );
    setCelebrating(false);
    setShowNext(false);
  }, [question.item, usedIndices]);

  const handleOptionClick = (optionIdx: number) => {
    if (showNext) return;
    const letter = question.options[optionIdx];
    setTotal((t) => t + 1);

    if (letter === question.correctLetter) {
      // Correct!
      setFilledWord(question.word);
      setOptionStates((prev) =>
        prev.map((o, i) => (i === optionIdx ? { ...o, state: "correct" } : o)),
      );
      setScore((s) => s + 1);
      setCelebrating(true);
      setShowNext(true);
    } else {
      // Wrong
      setOptionStates((prev) =>
        prev.map((o, i) => (i === optionIdx ? { ...o, state: "wrong" } : o)),
      );
      setTimeout(() => {
        setOptionStates((prev) =>
          prev.map((o, i) => (i === optionIdx ? { ...o, state: "idle" } : o)),
        );
      }, 600);
    }
  };

  // Build display letters for the word
  const displayLetters = question.displayWord.split("");

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      {/* Score header */}
      <div className="flex items-center justify-between mb-6">
        <div className="blanks-gradient text-white px-4 py-2 rounded-2xl font-display font-bold text-sm shadow-card">
          ✅ Score: {score}
        </div>
        <div className="bg-muted text-muted-foreground px-4 py-2 rounded-2xl font-bold text-sm">
          {total > 0 ? `${accuracy}% सही` : "शुरू करो!"}
        </div>
      </div>

      {/* Question card */}
      <div
        className={`bg-card rounded-3xl p-6 mb-6 text-center shadow-card border-2 border-border relative overflow-hidden ${
          celebrating ? "animate-bounce-in" : ""
        }`}
      >
        {/* Decorative bg */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.60 0.22 310) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        {/* Emoji */}
        <div
          className={`text-8xl mb-4 leading-none ${celebrating ? "animate-float" : ""}`}
        >
          {question.item.emoji}
        </div>

        {/* Hindi name hint */}
        <p className="text-muted-foreground font-bold text-base mb-4">
          {question.item.hindi}
        </p>

        {/* Word display */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {displayLetters.map((ch, i) => (
            <div
              key={`letter-${question.word}-${i}`}
              className={`
                flex items-center justify-center font-display font-extrabold text-2xl
                w-12 h-12 rounded-xl border-2 transition-all
                ${
                  ch === "_"
                    ? filledWord
                      ? "border-green-400 bg-green-100 text-green-700 scale-110"
                      : "border-primary bg-primary/10 text-primary animate-pulse-glow"
                    : "border-border bg-muted text-foreground"
                }
              `}
            >
              {ch === "_" && filledWord ? question.correctLetter : ch}
            </div>
          ))}
        </div>

        {/* Celebration text */}
        {celebrating && (
          <div className="mt-4 animate-scale-in">
            <p className="font-display font-bold text-xl text-green-600">
              🌟 शाबाश! Correct!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {question.item.english}
            </p>
          </div>
        )}

        {/* Stars animation */}
        {celebrating && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {(
              ["⭐a", "✨b", "💫c", "🌟d", "⭐e", "✨f", "💫g", "🌟h"] as const
            ).map((star, i) => (
              <span
                key={star}
                className="absolute text-2xl"
                style={{
                  top: `${15 + ((i * 9) % 70)}%`,
                  left: `${5 + ((i * 12) % 90)}%`,
                  animation: `star-burst 0.7s ease-out ${i * 0.08}s forwards`,
                }}
              >
                {star.slice(0, -1)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      {!showNext && (
        <p className="text-center text-muted-foreground text-sm mb-4 font-medium">
          👇 सही अक्षर चुनो! Pick the correct letter!
        </p>
      )}

      {/* Option buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {optionStates.map((opt, idx) => {
          const ocid = `blanks.option.${idx + 1}` as const;
          const isWrong = opt.state === "wrong";
          const isCorrect = opt.state === "correct";
          const baseColor = OPTION_COLORS[idx];

          return (
            <button
              type="button"
              key={`option-${opt.letter}-${idx}`}
              data-ocid={ocid}
              onClick={() => handleOptionClick(idx)}
              disabled={showNext || isWrong}
              className={`
                rounded-2xl border-2 min-h-[72px] font-display font-extrabold text-3xl
                transition-all shadow-card
                ${isCorrect ? `${CORRECT_COLOR} scale-105 shadow-glow-green` : ""}
                ${isWrong ? `${WRONG_COLOR} animate-shake opacity-60` : ""}
                ${!isCorrect && !isWrong ? baseColor : ""}
                ${showNext && !isCorrect ? "opacity-40 cursor-not-allowed" : ""}
              `}
            >
              {opt.letter}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      {showNext && (
        <div className="text-center animate-slide-up">
          <Button
            data-ocid="blanks.next_button"
            onClick={nextQuestion}
            size="lg"
            className="blanks-gradient text-white border-0 rounded-2xl h-14 px-8 font-bold text-lg w-full"
          >
            अगला सवाल → Next Question
          </Button>
        </div>
      )}

      {/* Progress */}
      <p className="text-center text-muted-foreground text-xs mt-4">
        {score} correct out of {total} attempts
      </p>
    </div>
  );
}
