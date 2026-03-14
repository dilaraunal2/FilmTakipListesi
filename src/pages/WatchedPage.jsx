import MovieCard from "../components/MovieCard";

export default function WatchedPage({ movies, onDelete, onUpdate }) {
  const watched = movies.filter((m) => m.watched);
  const avgRating = watched.length
    ? (watched.reduce((s, m) => s + m.rating, 0) / watched.length).toFixed(1)
    : 0;

  return (
    <div>
      {/* İstatistik */}
      <div className="flex gap-4 mb-6">
        <div className="bg-gray-800 rounded-xl px-5 py-3 text-center">
          <p className="text-2xl font-medium text-white">{watched.length}</p>
          <p className="text-xs text-gray-400">Film izlendi</p>
        </div>
        <div className="bg-gray-800 rounded-xl px-5 py-3 text-center">
          <p className="text-2xl font-medium text-yellow-400">{avgRating} ★</p>
          <p className="text-xs text-gray-400">Ortalama puan</p>
        </div>
      </div>

      {watched.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-16">Henüz izlenen film yok.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {watched.map((m) => (
            <MovieCard key={m.id} movie={m} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}