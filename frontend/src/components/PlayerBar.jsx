function PlayerBar() {
  return (
    <footer className="flex items-center justify-between border-t border-neutral-800 bg-neutral-900 px-6 py-4">
      <div className="w-1/3">
        <p className="font-medium">No song selected</p>
        <p className="text-sm text-neutral-400">-</p>
      </div>

      <div className="flex w-1/3 flex-col items-center gap-2">
        <div className="flex items-center gap-6 text-xl">
          <button>⏮</button>
          <button className="rounded-full bg-white px-4 py-2 text-black">▶</button>
          <button>⏭</button>
        </div>
        <div className="h-1 w-full rounded bg-neutral-700" />
      </div>

      <div className="w-1/3 text-right text-neutral-400">🔊</div>
    </footer>
  );
}

export default PlayerBar;