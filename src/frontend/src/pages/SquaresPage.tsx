import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  SQUARES_PER_PAGE,
  SQUARES_TOTAL,
  getSquareCardColor,
  getSquares,
} from "../data/squares";

const TOTAL_PAGES = Math.ceil(SQUARES_TOTAL / SQUARES_PER_PAGE);

export function SquaresPage() {
  const [page, setPage] = useState(1);

  const startNum = (page - 1) * SQUARES_PER_PAGE + 1;
  const endNum = Math.min(page * SQUARES_PER_PAGE, SQUARES_TOTAL);
  const entries = getSquares(startNum, endNum);

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
              "linear-gradient(135deg, oklch(0.65 0.22 200), oklch(0.58 0.22 260))",
          }}
        >
          Page {page} / {TOTAL_PAGES}
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          {startNum} – {endNum}
        </p>
      </div>

      {/* Info banner */}
      <div
        className="rounded-2xl p-3 mb-5 flex items-center gap-3"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.93 0.06 210), oklch(0.91 0.07 250))",
          border: "1px solid oklch(0.82 0.10 220)",
        }}
      >
        <span className="text-2xl">🟦</span>
        <div>
          <p className="font-bold text-sm text-foreground">Squares / वर्ग</p>
          <p className="text-xs text-muted-foreground">
            किसी संख्या को खुद से गुणा करने पर वर्ग मिलता है • n × n = n²
          </p>
        </div>
      </div>

      {/* Squares grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
        {entries.map(({ n, square }) => (
          <div
            key={n}
            data-ocid={`squares.item.${((n - 1) % SQUARES_PER_PAGE) + 1}`}
            className={`relative bg-gradient-to-br ${getSquareCardColor(n)} rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-md min-h-[90px]`}
            style={{ boxShadow: "0 4px 12px -2px oklch(0.50 0.18 220 / 0.35)" }}
          >
            {/* Square symbol top-right */}
            <div
              className="absolute top-1.5 right-2 text-white/30 text-[10px] font-mono"
              aria-hidden="true"
            >
              ²
            </div>

            {/* n² equation */}
            <span className="font-display font-extrabold text-white text-lg leading-none drop-shadow-sm">
              {n}²
            </span>

            {/* Equals */}
            <span className="text-white/70 text-[10px] font-bold leading-none mt-0.5">
              =
            </span>

            {/* Result */}
            <span className="text-white font-extrabold text-base leading-none mt-0.5 drop-shadow-sm">
              {square}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3">
        <Button
          data-ocid="squares.pagination_prev"
          onClick={handlePrev}
          disabled={page === 1}
          variant="outline"
          size="lg"
          className="flex-1 rounded-2xl font-bold text-base h-14 border-2 disabled:opacity-40"
        >
          ← पिछला
        </Button>

        {/* Page dots */}
        <div className="flex gap-2">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => {
            const pg = i + 1;
            const isActive = pg === page;
            return (
              <button
                type="button"
                key={pg}
                onClick={() => {
                  setPage(pg);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`transition-all rounded-full ${
                  isActive
                    ? "w-6 h-3 bg-cyan-500"
                    : "w-3 h-3 bg-muted-foreground/30"
                }`}
                aria-label={`Page ${pg}`}
              />
            );
          })}
        </div>

        <Button
          data-ocid="squares.pagination_next"
          onClick={handleNext}
          disabled={page === TOTAL_PAGES}
          size="lg"
          className="flex-1 rounded-2xl font-bold text-base h-14 text-white border-0 disabled:opacity-40"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.22 200), oklch(0.58 0.22 260))",
          }}
        >
          अगला →
        </Button>
      </div>

      <p className="text-center text-muted-foreground text-xs mt-3">
        कुल {SQUARES_TOTAL} वर्ग • {TOTAL_PAGES} pages
      </p>
    </div>
  );
}
