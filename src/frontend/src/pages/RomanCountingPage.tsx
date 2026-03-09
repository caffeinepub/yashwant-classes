import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ROMAN_PER_PAGE,
  ROMAN_TOTAL,
  getRomanCardColor,
  toRoman,
} from "../data/roman";

const TOTAL_PAGES = Math.ceil(ROMAN_TOTAL / ROMAN_PER_PAGE);

export function RomanCountingPage() {
  const [page, setPage] = useState(1);

  const startNum = (page - 1) * ROMAN_PER_PAGE + 1;
  const endNum = Math.min(page * ROMAN_PER_PAGE, ROMAN_TOTAL);

  const numbers = Array.from(
    { length: endNum - startNum + 1 },
    (_, i) => startNum + i,
  );

  const handlePrev = () => {
    if (page > 1) {
      setPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (page < TOTAL_PAGES) {
      setPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      {/* Header info */}
      <div className="flex items-center justify-between mb-5">
        <div
          className="text-white px-4 py-2 rounded-2xl font-display font-bold text-sm"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.18 85), oklch(0.58 0.22 50))",
          }}
        >
          Page {page} / {TOTAL_PAGES}
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          {startNum} – {endNum}
        </p>
      </div>

      {/* Roman numeral info banner */}
      <div
        className="rounded-2xl p-3 mb-5 flex items-center gap-3"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.95 0.06 85), oklch(0.92 0.05 60))",
          border: "1px solid oklch(0.85 0.10 75)",
        }}
      >
        <span className="text-2xl">🏛️</span>
        <div>
          <p className="font-bold text-sm text-foreground">Roman Numerals</p>
          <p className="text-xs text-muted-foreground">
            I=1, V=5, X=10, L=50, C=100, D=500, M=1000
          </p>
        </div>
      </div>

      {/* Numbers grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
        {numbers.map((n) => (
          <div
            key={n}
            data-ocid={`roman.item.${((n - 1) % ROMAN_PER_PAGE) + 1}`}
            className={`relative bg-gradient-to-br ${getRomanCardColor(n)} rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-md min-h-[90px]`}
            style={{ boxShadow: "0 4px 12px -2px oklch(0.50 0.15 60 / 0.3)" }}
          >
            {/* Roman numeral */}
            <span
              className="font-display font-extrabold text-white leading-none drop-shadow-sm"
              style={{
                fontSize:
                  toRoman(n).length > 5
                    ? "14px"
                    : toRoman(n).length > 3
                      ? "18px"
                      : "22px",
              }}
            >
              {toRoman(n)}
            </span>
            {/* Arabic number */}
            <span className="text-white/90 text-base font-bold mt-1 leading-none">
              {n}
            </span>
            {/* Decorative corner */}
            <div
              className="absolute top-1.5 right-2 text-white/30 text-[10px] font-mono"
              aria-hidden="true"
            >
              ✦
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3">
        <Button
          data-ocid="roman.pagination_prev"
          onClick={handlePrev}
          disabled={page === 1}
          variant="outline"
          size="lg"
          className="flex-1 rounded-2xl font-bold text-base h-14 border-2 disabled:opacity-40"
        >
          ← पिछला
        </Button>

        {/* Page dots */}
        <div className="flex gap-1">
          {Array.from({ length: Math.min(TOTAL_PAGES, 7) }, (_, i) => {
            let displayPage: number;
            if (TOTAL_PAGES <= 7) {
              displayPage = i + 1;
            } else if (page <= 4) {
              displayPage = i + 1;
            } else if (page >= TOTAL_PAGES - 3) {
              displayPage = TOTAL_PAGES - 6 + i;
            } else {
              displayPage = page - 3 + i;
            }
            const isActive = displayPage === page;
            return (
              <button
                type="button"
                key={displayPage}
                onClick={() => {
                  setPage(displayPage);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive ? "w-5 bg-amber-500" : "bg-muted-foreground/30"
                }`}
                aria-label={`Page ${displayPage}`}
              />
            );
          })}
        </div>

        <Button
          data-ocid="roman.pagination_next"
          onClick={handleNext}
          disabled={page === TOTAL_PAGES}
          size="lg"
          className="flex-1 rounded-2xl font-bold text-base h-14 text-white border-0 disabled:opacity-40"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.18 85), oklch(0.58 0.22 50))",
          }}
        >
          अगला →
        </Button>
      </div>

      <p className="text-center text-muted-foreground text-xs mt-3">
        कुल {ROMAN_TOTAL} Roman Numbers • {TOTAL_PAGES} pages
      </p>
    </div>
  );
}
