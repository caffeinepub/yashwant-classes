// Squares data 1 to 100
export const SQUARES_TOTAL = 100;
export const SQUARES_PER_PAGE = 50;

export interface SquareEntry {
  n: number;
  square: number;
}

export function getSquares(from: number, to: number): SquareEntry[] {
  const result: SquareEntry[] = [];
  for (let i = from; i <= to; i++) {
    result.push({ n: i, square: i * i });
  }
  return result;
}

const squareColors = [
  "from-[oklch(0.65_0.22_200)] to-[oklch(0.70_0.18_220)]", // cyan-blue
  "from-[oklch(0.62_0.20_180)] to-[oklch(0.68_0.22_200)]", // teal
  "from-[oklch(0.68_0.22_250)] to-[oklch(0.62_0.20_270)]", // indigo
  "from-[oklch(0.60_0.22_310)] to-[oklch(0.65_0.20_290)]", // purple
  "from-[oklch(0.65_0.20_160)] to-[oklch(0.70_0.18_180)]", // green-teal
  "from-[oklch(0.70_0.20_230)] to-[oklch(0.65_0.22_250)]", // blue
  "from-[oklch(0.58_0.22_260)] to-[oklch(0.65_0.20_240)]", // violet-blue
  "from-[oklch(0.63_0.18_195)] to-[oklch(0.70_0.16_210)]", // sky
];

export function getSquareCardColor(n: number): string {
  return squareColors[(n - 1) % squareColors.length];
}
