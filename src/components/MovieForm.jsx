import { useState } from "react";
import { createMovie } from "../interfaces/movie";
import StarRating from "./StarRating";

const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;
const GENRES = ["Aksiyon", "Komedi", "Drama", "Korku", "Sci-Fi", "Animasyon", "Diğer"];

export default function MovieForm({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("Drama");
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");
  const [poster, setPoster] = useState("");
  const [imdbID, setImdbID] = useState("");
  const [searching, setSearching] = useState(false);
  const [omdbError, setOmdbError] = useState("");

  const searchPoster = async () => {
    if (!title.trim()) return;
    setSearching(true);
    setOmdbError("");
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${OMDB_KEY}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setPoster(data.Poster !== "N/A" ? data.Poster : "");
        setImdbID(data.imdbID || "");
        setYear(data.Year?.slice(0, 4) || year);
      } else {
        setOmdbError("Film bulunamadı, poster olmadan ekleyebilirsin.");
      }
    } catch {
      setOmdbError("Bağlantı hatası.");
    }
    setSearching(false);
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd(createMovie({ title, year, genre, poster, imdbID, rating, note }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-700">
        <h2 className="text-lg font-medium text-white mb-4">Film Ekle</h2>

        {/* Başlık + Poster arama */}
        <div className="flex gap-2 mb-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Film adı"
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={searchPoster}
            disabled={searching}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition-colors"
          >
            {searching ? "..." : "Ara"}
          </button>
        </div>

        {omdbError && <p className="text-xs text-red-400 mb-2">{omdbError}</p>}

        {/* Poster önizleme */}
        {poster && (
          <img src={poster} alt={title} className="w-24 rounded-lg mb-3 border border-gray-700" />
        )}

        {/* Yıl */}
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Yıl (opsiyonel)"
          className="w-full px-3 py-2 mb-3 rounded-lg bg-gray-800 text-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Tür */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full px-3 py-2 mb-3 rounded-lg bg-gray-800 text-sm text-white border border-gray-700 focus:outline-none"
        >
          {GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>

        {/* Puan */}
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">Puan</p>
          <StarRating value={rating} onChange={setRating} />
        </div>

        {/* Not */}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Notun (opsiyonel)"
          rows={2}
          className="w-full px-3 py-2 mb-4 rounded-lg bg-gray-800 text-sm text-white border border-gray-700 focus:outline-none resize-none"
        />

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">İptal</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition-colors">Ekle</button>
        </div>
      </div>
    </div>
  );
}