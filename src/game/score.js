export function nextScore(score, kind) {
  if (kind === "hit") return score + 1;
  return Math.max(0, score - 1);
}
