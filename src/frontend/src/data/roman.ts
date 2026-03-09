// Roman numeral conversion 1-1000
export function toRoman(n: number): string {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  let result = "";
  let num = n;
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }
  return result;
}

// Roman numeral card colors -- gold/imperial theme
const romanColors = [
  "from-[oklch(0.72_0.18_85)]  to-[oklch(0.65_0.22_60)]", // gold-amber
  "from-[oklch(0.60_0.20_30)]  to-[oklch(0.65_0.22_50)]", // deep orange-gold
  "from-[oklch(0.55_0.18_310)] to-[oklch(0.62_0.22_290)]", // royal purple
  "from-[oklch(0.58_0.20_200)] to-[oklch(0.65_0.18_220)]", // teal-blue
  "from-[oklch(0.62_0.22_145)] to-[oklch(0.68_0.18_160)]", // emerald
  "from-[oklch(0.65_0.22_25)]  to-[oklch(0.60_0.20_45)]", // crimson-orange
  "from-[oklch(0.68_0.20_250)] to-[oklch(0.62_0.22_270)]", // indigo
  "from-[oklch(0.63_0.18_170)] to-[oklch(0.70_0.16_190)]", // cyan-green
];

export function getRomanCardColor(n: number): string {
  return romanColors[(n - 1) % romanColors.length];
}

export const ROMAN_PER_PAGE = 50;
export const ROMAN_TOTAL = 1000;
