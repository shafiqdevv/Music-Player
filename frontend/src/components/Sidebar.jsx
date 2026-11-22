function Sidebar() {
  const links = ["Home", "Search", "Your Library", "Favorites"];

  return (
    <aside className="hidden w-60 flex-col gap-6 bg-black p-6 md:flex">
      <h1 className="text-2xl font-bold text-green-500">Musify</h1>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-neutral-400 transition hover:text-white"
          >
            {link}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;