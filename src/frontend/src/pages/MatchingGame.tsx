import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { fruits } from "../data/fruits";
import type { LearnItem } from "../data/fruits";
import { vegetables } from "../data/vegetables";

const ALL_ITEMS = [...fruits, ...vegetables];
const ROUND_SIZE = 6;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRound(exclude: Set<number>): {
  items: LearnItem[];
  indices: number[];
} {
  const available = ALL_ITEMS.map((_, i) => i).filter((i) => !exclude.has(i));
  const pool =
    available.length >= ROUND_SIZE ? available : ALL_ITEMS.map((_, i) => i);
  const shuffledPool = shuffle(pool);
  const chosen = shuffledPool.slice(0, ROUND_SIZE);
  return {
    items: chosen.map((i) => ALL_ITEMS[i]),
    indices: chosen,
  };
}

type MatchStatus = "idle" | "selected-icon" | "correct" | "wrong";

interface CardState {
  item: LearnItem;
  originalIndex: number;
  matched: boolean;
  selected: boolean;
  shaking: boolean;
  celebrating: boolean;
}

export function MatchingGame() {
  const [score, setScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [roundComplete, setRoundComplete] = useState(false);
  const [selectedIconIdx, setSelectedIconIdx] = useState<number | null>(null);
  const [selectedNameIdx, setSelectedNameIdx] = useState<number | null>(null);
  const [matchStatus, setMatchStatus] = useState<MatchStatus>("idle");
  const [celebrating, setCelebrating] = useState(false);

  const [iconCards, setIconCards] = useState<CardState[]>([]);
  const [nameCards, setNameCards] = useState<CardState[]>([]);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());

  // Use ref to avoid stale closure in useEffect
  const startRoundRef = useRef<(() => void) | null>(null);

  const startRound = useCallback(
    (exclude?: Set<number>) => {
      const ex = exclude ?? usedIndices;
      const { items, indices } = pickRound(ex);
      const cards: CardState[] = items.map((item, i) => ({
        item,
        originalIndex: indices[i],
        matched: false,
        selected: false,
        shaking: false,
        celebrating: false,
      }));
      setIconCards(shuffle([...cards]));
      setNameCards(shuffle([...cards]));
      setSelectedIconIdx(null);
      setSelectedNameIdx(null);
      setMatchStatus("idle");
      setRoundComplete(false);
      setCelebrating(false);
    },
    [usedIndices],
  );

  startRoundRef.current = () => startRound();

  useEffect(() => {
    startRoundRef.current?.();
  }, []);

  const handleIconClick = (idx: number) => {
    if (iconCards[idx].matched || matchStatus === "correct") return;
    setSelectedIconIdx(idx);
    setMatchStatus("selected-icon");
  };

  const handleNameClick = (idx: number) => {
    if (nameCards[idx].matched || selectedIconIdx === null) return;

    const iconCard = iconCards[selectedIconIdx];
    const nameCard = nameCards[idx];

    if (iconCard.originalIndex === nameCard.originalIndex) {
      // Correct match!
      const updatedIcons = iconCards.map((c, i) =>
        i === selectedIconIdx ? { ...c, matched: true, celebrating: true } : c,
      );
      const updatedNames = nameCards.map((c, i) =>
        i === idx ? { ...c, matched: true, celebrating: true } : c,
      );
      setIconCards(updatedIcons);
      setNameCards(updatedNames);
      setScore((s) => s + 1);
      setMatchStatus("correct");

      setTimeout(() => {
        setIconCards((prev) =>
          prev.map((c, i) =>
            i === selectedIconIdx ? { ...c, celebrating: false } : c,
          ),
        );
        setNameCards((prev) =>
          prev.map((c, i) => (i === idx ? { ...c, celebrating: false } : c)),
        );
        setSelectedIconIdx(null);
        setSelectedNameIdx(null);
        setMatchStatus("idle");

        // Check if round complete
        const allMatched = updatedIcons.every((c) => c.matched);
        if (allMatched) {
          setCelebrating(true);
          setRoundComplete(true);
          setTotalRounds((r) => r + 1);
        }
      }, 800);
    } else {
      // Wrong match
      setSelectedNameIdx(idx);
      setMatchStatus("wrong");

      setIconCards((prev) =>
        prev.map((c, i) =>
          i === selectedIconIdx ? { ...c, shaking: true } : c,
        ),
      );
      setNameCards((prev) =>
        prev.map((c, i) => (i === idx ? { ...c, shaking: true } : c)),
      );

      setTimeout(() => {
        setIconCards((prev) =>
          prev.map((c, i) =>
            i === selectedIconIdx ? { ...c, shaking: false } : c,
          ),
        );
        setNameCards((prev) =>
          prev.map((c, i) => (i === idx ? { ...c, shaking: false } : c)),
        );
        setSelectedIconIdx(null);
        setSelectedNameIdx(null);
        setMatchStatus("idle");
      }, 500);
    }
  };

  const handleNextRound = () => {
    const next = new Set(usedIndices);
    for (const c of iconCards) {
      next.add(c.originalIndex);
    }
    if (next.size >= ALL_ITEMS.length - ROUND_SIZE) {
      next.clear();
    }
    setUsedIndices(next);
    startRound(next);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      {/* Score header */}
      <div className="flex items-center justify-between mb-5">
        <div className="matching-gradient text-white px-4 py-2 rounded-2xl font-display font-bold text-sm shadow-card">
          ⭐ Score: {score}
        </div>
        <div className="bg-muted text-muted-foreground px-4 py-2 rounded-2xl font-bold text-sm">
          Round {totalRounds + 1}
        </div>
      </div>

      {/* Celebration overlay */}
      {celebrating && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="text-8xl animate-bounce-in">🎉</div>
          {(
            [
              "⭐a",
              "🌟b",
              "✨c",
              "💫d",
              "🎊e",
              "⭐f",
              "🌟g",
              "✨h",
              "💫i",
              "🎊j",
              "⭐k",
              "🌟l",
            ] as const
          ).map((star, i) => (
            <span
              key={star}
              className="absolute text-3xl"
              style={{
                top: `${((i * 7 + 15) % 80) + 10}%`,
                left: `${((i * 13 + 5) % 80) + 10}%`,
                animation: `star-burst 0.8s ease-out ${i * 0.06}s forwards`,
              }}
            >
              {star.slice(0, -1)}
            </span>
          ))}
        </div>
      )}

      {/* Instructions */}
      <p className="text-center text-muted-foreground text-sm mb-4 font-medium">
        {selectedIconIdx !== null
          ? "अब नाम पर tap करो! 👆"
          : "पहले emoji पर tap करो! 👇"}
      </p>

      {/* Matching columns */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Icons column */}
        <div className="flex flex-col gap-2">
          <p className="text-center font-bold text-sm text-muted-foreground mb-1">
            🖼️ Icon
          </p>
          {iconCards.map((card, idx) => {
            const isSelected = selectedIconIdx === idx;
            const ocid = `matching.item.${idx + 1}` as const;
            return (
              <button
                type="button"
                key={`icon-${card.originalIndex}-${idx}`}
                data-ocid={ocid}
                onClick={() => handleIconClick(idx)}
                disabled={card.matched}
                className={`
                  rounded-2xl p-4 flex items-center justify-center text-4xl
                  min-h-[72px] font-body transition-all border-2 relative
                  ${
                    card.matched
                      ? "bg-green-100 border-green-400 opacity-80 cursor-default"
                      : isSelected
                        ? "bg-primary/10 border-primary scale-105 shadow-glow"
                        : "bg-card border-border hover:border-primary/50 hover:scale-105 active:scale-95 shadow-card"
                  }
                  ${card.shaking ? "animate-shake border-red-400 bg-red-50" : ""}
                  ${card.celebrating ? "animate-bounce-in" : ""}
                `}
              >
                {card.matched && (
                  <span className="absolute top-1 right-1 text-green-500 text-xs font-bold">
                    ✓
                  </span>
                )}
                <span>{card.item.emoji}</span>
              </button>
            );
          })}
        </div>

        {/* Names column */}
        <div className="flex flex-col gap-2">
          <p className="text-center font-bold text-sm text-muted-foreground mb-1">
            📝 Name
          </p>
          {nameCards.map((card, idx) => {
            const isSelected = selectedNameIdx === idx;
            return (
              <button
                type="button"
                key={`name-${card.originalIndex}-${idx}`}
                onClick={() => handleNameClick(idx)}
                disabled={card.matched || selectedIconIdx === null}
                className={`
                  rounded-2xl p-3 flex flex-col items-center justify-center text-center
                  min-h-[72px] transition-all border-2 relative
                  ${
                    card.matched
                      ? "bg-green-100 border-green-400 opacity-80 cursor-default"
                      : selectedIconIdx !== null
                        ? "bg-card border-border hover:border-primary/50 hover:scale-105 active:scale-95 shadow-card cursor-pointer"
                        : "bg-card border-border opacity-50 cursor-not-allowed"
                  }
                  ${isSelected && matchStatus === "wrong" ? "animate-shake border-red-400 bg-red-50" : ""}
                  ${card.celebrating ? "animate-bounce-in" : ""}
                  ${card.shaking ? "animate-shake border-red-400 bg-red-50" : ""}
                `}
              >
                {card.matched && (
                  <span className="absolute top-1 right-1 text-green-500 text-xs font-bold">
                    ✓
                  </span>
                )}
                <span className="font-bold text-sm text-foreground leading-tight">
                  {card.item.english}
                </span>
                <span className="text-muted-foreground text-xs mt-0.5">
                  {card.item.hindi}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Next round button */}
      {roundComplete && (
        <div className="text-center animate-scale-in">
          <p className="font-display font-bold text-xl text-foreground mb-4">
            🎉 शाबाश! Well Done!
          </p>
          <Button
            data-ocid="matching.next_round_button"
            onClick={handleNextRound}
            size="lg"
            className="matching-gradient text-white border-0 rounded-2xl h-14 px-8 font-bold text-lg shadow-glow-orange"
          >
            अगला Round → Next
          </Button>
        </div>
      )}
    </div>
  );
}
