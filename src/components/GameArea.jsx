import { useEffect, useRef, useState } from "react";
import { BUG_SIZE, HIT_SIZE } from "../game/bugs.js";

const MOVE_INTERVAL_MS = 800;
const HIT_POINTS = 10;
const MISS_POINTS = 5;

export default function GameArea({ isPlaying, onScore }) {
  const fieldRef = useRef(null);
  const placeBugRef = useRef(() => {});
  const moveTimerRef = useRef(0);
  const scheduleMoveRef = useRef(() => {});
  const awaitingHitRef = useRef(false);
  const onScoreRef = useRef(onScore);
  const popTimerRef = useRef(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [glide, setGlide] = useState(false);
  const [popped, setPopped] = useState(false);

  onScoreRef.current = onScore;

  placeBugRef.current = () => {
    const rect = fieldRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 0;
    const height = rect?.height ?? 0;
    const maxX = Math.max(0, width - HIT_SIZE);
    const maxY = Math.max(0, height - HIT_SIZE);
    setX(Math.random() * maxX);
    setY(Math.random() * maxY);
  };

  scheduleMoveRef.current = () => {
    window.clearInterval(moveTimerRef.current);
    moveTimerRef.current = window.setInterval(() => {
      if (awaitingHitRef.current) onScoreRef.current(-MISS_POINTS);
      placeBugRef.current();
      awaitingHitRef.current = true;
    }, MOVE_INTERVAL_MS);
  };

  useEffect(() => {
    if (!isPlaying) {
      setX(0);
      setY(0);
      setGlide(false);
      setPopped(false);
      return undefined;
    }

    placeBugRef.current();
    awaitingHitRef.current = true;
    scheduleMoveRef.current();
    const frame = requestAnimationFrame(() => setGlide(true));

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(moveTimerRef.current);
    };
  }, [isPlaying]);

  useEffect(() => () => window.clearTimeout(popTimerRef.current), []);

  function handleBugClick() {
    if (!isPlaying) return;
    awaitingHitRef.current = false;
    onScoreRef.current(HIT_POINTS);
    setPopped(true);
    window.clearTimeout(popTimerRef.current);
    popTimerRef.current = window.setTimeout(() => setPopped(false), 180);
    placeBugRef.current();
    awaitingHitRef.current = true;
    scheduleMoveRef.current();
  }

  return (
    <div
      ref={fieldRef}
      className="relative h-[min(68vh,26rem)] w-full cursor-crosshair touch-none overflow-hidden bg-white"
    >
      {isPlaying && (
        <button
          type="button"
          aria-label="Serangga"
          className={`${glide ? "bug-glide " : ""}absolute flex cursor-crosshair items-center justify-center border-0 bg-transparent p-0`}
          style={{
            width: HIT_SIZE,
            height: HIT_SIZE,
            transform: `translate(${x}px, ${y}px)`,
          }}
          onClick={handleBugClick}
        >
          <span
            className="bug-glide pointer-events-none bg-red-600"
            style={{
              width: BUG_SIZE,
              height: BUG_SIZE,
              transform: popped ? "scale(1.4)" : "scale(1)",
              backgroundColor: popped ? "#fda4af" : undefined,
            }}
          />
        </button>
      )}
    </div>
  );
}
