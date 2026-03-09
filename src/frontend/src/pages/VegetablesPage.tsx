import { vegetables } from "../data/vegetables";

export function VegetablesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <div className="text-center mb-5">
        <p className="font-display font-bold text-xl text-foreground">
          🥕 Vegetables के नाम सीखो!
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          {vegetables.length} vegetables to learn
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {vegetables.map((veg) => (
          <div
            key={`${veg.english}-${veg.hindi}`}
            className={`child-card border-2 ${veg.color} p-4 flex flex-col items-center text-center gap-2`}
          >
            <span className="text-5xl leading-none">{veg.emoji}</span>
            <div>
              <p className="font-display font-bold text-base text-foreground leading-tight">
                {veg.english}
              </p>
              <p
                className="text-muted-foreground font-semibold mt-0.5"
                style={{ fontSize: "0.85rem" }}
              >
                {veg.hindi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
