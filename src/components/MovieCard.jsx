import { useState } from "react";
import StarRating from "./StarRating";

export default function MovieCard({ movie, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState(movie.note);
  const [rating, setRating] = useState(movie.rating);

  const saveEdit = () => {
    onUpdate({ ...movie, note, rating });
    setEditing(false);
  };

  const toggleWatched = () => onUpdate({ ...movie, watched: !movie.watched });

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all
      ${movie.watched ? "border-green-700/50 opacity-80" : "border-gray-700"}
      bg-gray-900 hover:border-gray-500`}>

      {/* Poster */}
      <div className="relative">
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} className="w-full h-52 object-cover" />
        ) : (
          <div className="w-full h-52 bg-gray-800 flex items-center justify-center text-4xl">🎬</div>
        )}
        {/* İzlendi badge */}
        {movie.watched && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
            ✓ İzlendi
          </span>
        )}
        <span className="absolute top-2 right-2 bg-black/60 text-gray-300 text-xs px-2 py-0.5 rounded-full">
          {movie.genre}
        </span>
      </div>

      {/* İçerik */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-white text-sm leading-tight">{movie.title}</h3>
          {movie.year && <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{movie.year}</span>}
        </div>

        <StarRating value={rating} onChange={setRating} readonly={!editing} />

        {editing ? (
          <div className="mt-2">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="w-full px-2 py-1 text-xs rounded-lg bg-gray-800 text-white border border-gray-600 resize-none focus:outline-none"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={saveEdit} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg">Kaydet</button>
              <button onClick={() => setEditing(false)} className="text-xs text-gray-400 hover:text-white">İptal</button>
            </div>
          </div>
        ) : (
          note && <p className="text-xs text-gray-400 mt-1 italic">"{note}"</p>
        )}

        {/* Aksiyonlar */}
        <div className="flex gap-1 mt-3">
          <button
            onClick={toggleWatched}
            className={`flex-1 text-xs py-1.5 rounded-lg transition-colors
              ${movie.watched ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-green-700/40 text-green-300 hover:bg-green-700/60"}`}
          >
            {movie.watched ? "İzlenmedi yap" : "İzlendi ✓"}
          </button>
          <button
            onClick={() => setEditing(true)}
            className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
          >✏️</button>
          <button
            onClick={() => onDelete(movie.id)}
            className="px-3 py-1.5 text-xs bg-red-900/40 hover:bg-red-900/70 text-red-400 rounded-lg transition-colors"
          >🗑️</button>
        </div>
      </div>
    </div>
  );
}