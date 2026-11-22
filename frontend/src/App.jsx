import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import PlayerBar from "./components/PlayerBar";
import { songs } from "./data/songs";

function App() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // "off" | "all" | "one"

  const currentSong = currentIndex !== null ? songs[currentIndex] : null;

  function getRandomIndex() {
    if (songs.length === 1) return 0;

    let random;
    do {
      random = Math.floor(Math.random() * songs.length);
    } while (random === currentIndex);

    return random;
  }

  function handleSelect(index) {
    if (index === currentIndex) {
      setIsPlaying((prev) => !prev);
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  }

  function handleTogglePlay() {
    if (currentIndex === null) {
      setCurrentIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }

  // next button: always goes to another song
  function handleNext() {
    if (currentIndex === null) return;

    if (isShuffle) {
      setCurrentIndex(getRandomIndex());
    } else {
      setCurrentIndex((currentIndex + 1) % songs.length);
    }
    setIsPlaying(true);
  }

  function handlePrev() {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  }

  // when a song finishes by itself
  function handleEnded() {
    const isLastSong = currentIndex === songs.length - 1;

    if (!isShuffle && isLastSong && repeatMode !== "all") {
      setIsPlaying(false); // end of the list, stop
      return;
    }

    handleNext();
  }

  function handleToggleShuffle() {
    setIsShuffle((prev) => !prev);
  }

  function handleToggleRepeat() {
    setRepeatMode((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <SongList
          songs={songs}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          onSelect={handleSelect}
        />
      </div>
      <PlayerBar
        song={currentSong}
        isPlaying={isPlaying}
        isShuffle={isShuffle}
        repeatMode={repeatMode}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        onEnded={handleEnded}
        onToggleShuffle={handleToggleShuffle}
        onToggleRepeat={handleToggleRepeat}
      />
    </div>
  );
}

export default App;