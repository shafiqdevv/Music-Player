import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import PlayerBar from "./components/PlayerBar";
import { songs } from "./data/songs";

function App() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = currentIndex !== null ? songs[currentIndex] : null;

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

  function handleNext() {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % songs.length);
    setIsPlaying(true);
  }

  function handlePrev() {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
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
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}

export default App;