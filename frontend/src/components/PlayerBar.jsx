import { useEffect, useRef } from "react";

function PlayerBar({ song, isPlaying, onTogglePlay, onNext, onPrev }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, song]);

  return (
    <footer className="flex items-center justify-between border-t border-neutral-800 bg-neutral-900 px-6 py-4">
      <audio ref={audioRef} src={song?.src} onEnded={onNext} />

      <div className="w-1/3">
        <p className="font-medium">{song ? song.title : "No song selected"}</p>
        <p className="text-sm text-neutral-400">{song ? song.artist : "-"}</p>
      </div>

      <div className="flex w-1/3 flex-col items-center gap-2">
        <div className="flex items-center gap-6 text-xl">
          <button onClick={onPrev}>⏮</button>
          <button
            onClick={onTogglePlay}
            className="rounded-full bg-white px-4 py-2 text-black"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button onClick={onNext}>⏭</button>
        </div>
        <div className="h-1 w-full rounded bg-neutral-700" />
      </div>

      <div className="w-1/3 text-right text-neutral-400">🔊</div>
    </footer>
  );
}

export default PlayerBar;