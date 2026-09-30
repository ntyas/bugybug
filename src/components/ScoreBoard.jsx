export default function ScoreBoard({ score, timeLeft }) {
  return (
    <div className="grid w-full grid-cols-2 border border-white/10 text-sm">
      <p className="flex items-baseline justify-between gap-3 bg-white/5 px-4 py-3 text-neutral-400">
        <span className="tracking-wide">Skor</span>
        <span className="text-2xl font-semibold tabular-nums text-white">{score}</span>
      </p>
      <p className="flex items-baseline justify-between gap-3 border-l border-white/10 bg-white/5 px-4 py-3 text-neutral-400">
        <span className="tracking-wide">Waktu</span>
        <span className="text-2xl font-semibold tabular-nums text-white">{timeLeft}</span>
      </p>
    </div>
  );
}
