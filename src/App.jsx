import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import WatchedPage from "./pages/WatchedPage";
import MovieForm from "./components/MovieForm";

export default function App() {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    return saved ? JSON.parse(saved) : [];
  });
  const [page, setPage] = useState("home");
  const [showForm, setShowForm] = useState(false);
  const [dark, setDark] = useState(true);

  // localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const addMovie = (movie) => setMovies((prev) => [movie, ...prev]);
  const deleteMovie = (id) => setMovies((prev) => prev.filter((m) => m.id !== id));
  const updateMovie = (updated) =>
    setMovies((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));

  return (
    <div className={`min-h-screen transition-colors ${dark ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-40 border-b px-6 py-3 flex items-center justify-between
        ${dark ? "bg-gray-950/90 border-gray-800" : "bg-white/90 border-gray-200"} backdrop-blur`}>
        <div className="flex items-center gap-6">
          <span className="font-medium text-lg">🎬 Film Listem</span>
          <div className="flex gap-1">
            {[
              { key: "home", label: "Tümü" },
              { key: "watched", label: "İzlendi" },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setPage(p.key)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors
                  ${page === p.key
                    ? "bg-indigo-600 text-white"
                    : dark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded-lg text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition-colors"
          >
            + Film Ekle
          </button>
        </div>
      </nav>

      {/* İçerik */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {page === "home" ? (
          <HomePage movies={movies} onDelete={deleteMovie} onUpdate={updateMovie} />
        ) : (
          <WatchedPage movies={movies} onDelete={deleteMovie} onUpdate={updateMovie} />
        )}
      </main>

      {/* Modal */}
      {showForm && <MovieForm onAdd={addMovie} onClose={() => setShowForm(false)} />}
    </div>
  );
}