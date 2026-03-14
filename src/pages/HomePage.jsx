import { useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

export default function HomePage({ movies, onDelete, onUpdate }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Tümü");
  const [tab, setTab] = useState("all"); // all | watching | watched

  const filtered = movies.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === "Tümü" || m.genre === genre;
    const matchTab =
      tab === "all" ? true : tab === "watched" ? m.watched : !m.watched;
    return matchSearch && matchGenre && matchTab;
  });

  return (
    <div>
      {/* Arama */}
      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Tür filtresi */}
      <div className="mb-4">
        <FilterBar active={genre} onChange={setGenre} />
      </div>

      {/* Tab: Tümü / İzlenecek / İzlendi */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "all", label: "Tümü" },
          { key: "watching", label: "İzlenecek" },
          { key: "watched", label: "İzlendi" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors
              ${tab === t.key ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Film grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 mt-16 text-sm">
          Hiç film yok. Hadi bir şeyler ekle 🎬
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((m) => (
            <MovieCard key={m.id} movie={m} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}