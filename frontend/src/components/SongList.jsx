function SongList({ songs, currentIndex, isPlaying, onSelect }) {
  return (
    <section className="flex-1 overflow-y-auto p-6">
      <h2 className="mb-4 text-xl font-semibold">All Songs</h2>
      <ul className="flex flex-col gap-1">
        {songs.map((song, index) => {
          const isCurrent = index === currentIndex;

          return (
            <li
              key={song.id}
              onClick={() => onSelect(index)}
              className="flex cursor-pointer items-center gap-4 rounded-md p-3 transition hover:bg-neutral-800"
            >
              <span className="w-6 text-neutral-400">
                {isCurrent && isPlaying ? "▶" : index + 1}
              </span>
              <div className="flex-1">
                <p className={`font-medium ${isCurrent ? "text-green-500" : ""}`}>
                  {song.title}
                </p>
                <p className="text-sm text-neutral-400">{song.artist}</p>
              </div>
              <span className="text-sm text-neutral-400">{song.duration}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default SongList;