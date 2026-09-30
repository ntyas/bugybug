import { useCallback, useEffect, useState } from "react";
import GameArea from "./components/GameArea.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";

const ROUND_SECONDS = 30;

export default function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const id = window.setInterval(() => {
      setTimeLeft((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);

    return () => window.clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && timeLeft === 0) setIsPlaying(false);
  }, [isPlaying, timeLeft]);

  const onScore = useCallback((delta) => {
    setScore((current) => current + delta);
  }, []);

  function playAgain() {
    setScore(0);
    setTimeLeft(ROUND_SECONDS);
    setIsPlaying(true);
  }

  const gameOver = timeLeft === 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-950 px-4 py-8 text-neutral-100">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">The Bug Squasher</h1>
      <section className="flex w-[min(92vw,40rem)] flex-col gap-3">
        <ScoreBoard score={score} timeLeft={timeLeft} />
        <div className="relative">
          <GameArea isPlaying={isPlaying} onScore={onScore} />
          {!isPlaying && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white px-6 text-center text-neutral-950">
              {gameOver ? (
                <>
                  <p className="text-lg font-medium tracking-tight">Game Over</p>
                  <p className="text-sm text-neutral-600">
                    Skor akhir{" "}
                    <span className="text-2xl font-semibold tabular-nums text-neutral-950">{score}</span>
                  </p>
                  <button
                    type="button"
                    onClick={playAgain}
                    className="bg-neutral-950 px-5 py-2 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                  >
                    Main Lagi
                  </button>
                </>
              ) : (
                <>
                  <p className="max-w-xs text-sm leading-relaxed text-neutral-600">
                    Klik kotak merah untuk menambah 10 skor. Kalau kotak pindah sebelum kena, skor berkurang 5.
                  </p>
                  <button
                    type="button"
                    onClick={playAgain}
                    className="bg-neutral-950 px-5 py-2 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                  >
                    Mulai
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
