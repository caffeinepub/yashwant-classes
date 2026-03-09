// Number names in English 1-1000
const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

export function numberToWords(n: number): string {
  if (n === 1000) return "One Thousand";
  if (n === 100) return "One Hundred";
  if (n >= 100) {
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;
    if (remainder === 0) return `${ones[hundred]} Hundred`;
    return `${ones[hundred]} Hundred ${numberToWords(remainder)}`;
  }
  if (n >= 20) {
    const ten = Math.floor(n / 10);
    const one = n % 10;
    return one === 0 ? tens[ten] : `${tens[ten]} ${ones[one]}`;
  }
  return ones[n];
}

// Card colors cycling through vibrant palette
const cardColors = [
  "from-[oklch(0.70_0.22_250)] to-[oklch(0.65_0.20_270)]", // blue-violet
  "from-[oklch(0.68_0.22_30)]  to-[oklch(0.72_0.20_55)]", // orange
  "from-[oklch(0.65_0.22_145)] to-[oklch(0.70_0.18_160)]", // green
  "from-[oklch(0.60_0.22_310)] to-[oklch(0.65_0.20_340)]", // pink-purple
  "from-[oklch(0.68_0.22_200)] to-[oklch(0.70_0.20_220)]", // teal
  "from-[oklch(0.72_0.18_85)]  to-[oklch(0.75_0.16_95)]", // yellow
  "from-[oklch(0.62_0.22_25)]  to-[oklch(0.68_0.20_45)]", // red-orange
  "from-[oklch(0.65_0.20_290)] to-[oklch(0.70_0.18_310)]", // violet
];

export function getCardColor(n: number): string {
  return cardColors[(n - 1) % cardColors.length];
}

export const NUMBERS_PER_PAGE = 50;
export const TOTAL_NUMBERS = 1000;
