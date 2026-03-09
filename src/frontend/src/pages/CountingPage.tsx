import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  NUMBERS_PER_PAGE,
  TOTAL_NUMBERS,
  getCardColor,
  numberToWords,
} from "../data/counting";

const TOTAL_PAGES = Math.ceil(TOTAL_NUMBERS / NUMBERS_PER_PAGE);

export function CountingPage() {
  const [page, setPage] = useState(1);

  const startNum = (page - 1) * NUMBERS_PER_PAGE + 1;
  const endNum = Math.min(page * NUMBERS_PER_PAGE, TOTAL_NUMBERS);

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
      {/* Page indicator */}
      <div className="flex items-center justify-between mb-5">
        <div className="counting-gradient text-white px-4 py-2 rounded-2xl font-display font-bold text-sm">
          Page {page} / {TOTAL_PAGES}
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          {startNum} – {endNum}
        </p>
      </div>

      {/* Numbers grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
        {numbers.map((n) => (
          <div
            key={n}
            className={`relative bg-gradient-to-br ${getCardColor(n)} rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-card min-h-[80px] child-card`}
          >
            <span className="font-display font-extrabold text-3xl text-white leading-none drop-shadow-sm">
              {n}
            </span>
            <span className="text-white/85 text-[11px] font-semibold mt-1 leading-tight">
              {numberToWords(n)}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3">
        <Button
          data-ocid="counting.pagination_prev"
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
                  isActive ? "w-5 bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-label={`Page ${displayPage}`}
              />
            );
          })}
        </div>

        <Button
          data-ocid="counting.pagination_next"
          onClick={handleNext}
          disabled={page === TOTAL_PAGES}
          size="lg"
          className="flex-1 rounded-2xl font-bold text-base h-14 counting-gradient text-white border-0 disabled:opacity-40"
        >
          अगला →
        </Button>
      </div>

      <p className="text-center text-muted-foreground text-xs mt-3">
        कुल {TOTAL_NUMBERS} numbers • {TOTAL_PAGES} pages
      </p>
    </div>
  );
}
