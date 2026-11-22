import { useEffect, useRef, useState } from "react";
import { formatTime } from "../utils/formatTime";

function PlayerBar({
  song,
  isPlaying,
  isShuffle,
  repeatMode,
  onTogglePlay,
  onNext,
  onPrev,
  onEnded,
  onToggleShuffle,
  onToggleRepeat,
}) {
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // play / pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, song]);

  // volume / mute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  function handleSeek(e) {
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  function handleVolumeChange(e) {
    const value = Number(e.target.value);
    setVolume(value);
    setIsMuted(value === 0);
  }

  return (
    <footer className="flex items-center justify-between border-t border-neutral-800 bg-neutral-900 px-6 py-4">
      <audio
        ref={audioRef}
        src={song?.src}
        loop={repeatMode === "one"}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={onEnded}
      />

      {/* left: song info */}
      <div className="w-1/3">
        <p className="font-medium">{song ? song.title : "No song selected"}</p>
        <p className="text-sm text-neutral-400">{song ? song.artist : "-"}</p>
      </div>

      {/* center: controls + progress */}
      <div className="flex w-1/3 flex-col items-center gap-2">
        <div className="flex items-center gap-6 text-xl">
          <button
            onClick={onToggleShuffle}
            className={isShuffle ? "border-b-2 border-green-500" : "opacity-40"}
          >
            🔀
          </button>
          <button onClick={onPrev}>⏮</button>
          <button
            onClick={onTogglePlay}
            className="rounded-full bg-white px-4 py-2 text-black"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button onClick={onNext}>⏭</button>
          <button
            onClick={onToggleRepeat}
            className={
              repeatMode === "off"
                ? "opacity-40"
                : "border-b-2 border-green-500"
            }
          >
            {repeatMode === "one" ? "🔂" : "🔁"}
          </button>
        </div>

        <div className="flex w-full items-center gap-2 text-xs text-neutral-400">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            disabled={!song}
            className="w-full accent-green-500"
          />
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* right: volume */}
      <div className="flex w-1/3 items-center justify-end gap-2">
        <button onClick={() => setIsMuted((prev) => !prev)}>
          {isMuted || volume === 0 ? "🔇" : "🔊"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 accent-green-500"
        />
      </div>
    </footer>
  );
}

export default PlayerBar;
