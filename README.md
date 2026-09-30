# The Bug Squasher

A minimal browser game. Red squares dart across a white playfield. Click one before it vanishes to score. Click empty space and the score drops. Each round lasts 60 seconds.

The interface is in Indonesian. The title stays **The Bug Squasher**.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on `0.0.0.0:43123`. Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run build
npm run preview
```

## How to play

1. Press **Mulai**. The timer starts only after that.
2. Click a red square: **Skor** goes up by 1.
3. Click the white play area and miss: **Skor** goes down by 1, and never below 0.
4. When **Waktu** hits 0, the round ends with **Game selesai**.
5. Press **Main lagi** to play another round.
