function SongList({ songs }) {
  return (
    <section className="flex-1 overflow-y-auto p-6">
      <h2 className="mb-4 text-xl font-semibold">All Songs</h2>
      <ul className="flex flex-col gap-1">
        {songs.map((song, index) => (
          <li
            key={song.id}
            className="flex cursor-pointer items-center gap-4 rounded-md p-3 transition hover:bg-neutral-800"
          >
            <span className="w-6 text-neutral-400">{index + 1}</span>
            <div className="flex-1">
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-neutral-400">{song.artist}</p>
            </div>
            <span className="text-sm text-neutral-400">{song.duration}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SongList;