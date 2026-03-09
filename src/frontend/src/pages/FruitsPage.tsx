import { fruits } from "../data/fruits";

export function FruitsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <div className="text-center mb-5">
        <p className="font-display font-bold text-xl text-foreground">
          🍎 Fruits के नाम सीखो!
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          {fruits.length} fruits to learn
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {fruits.map((fruit) => (
          <div
            key={`${fruit.english}-${fruit.hindi}`}
            className={`child-card border-2 ${fruit.color} p-4 flex flex-col items-center text-center gap-2`}
          >
            <span className="text-5xl leading-none">{fruit.emoji}</span>
            <div>
              <p className="font-display font-bold text-base text-foreground leading-tight">
                {fruit.english}
              </p>
              <p
                className="text-muted-foreground font-semibold mt-0.5"
                style={{ fontSize: "0.85rem" }}
              >
                {fruit.hindi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
