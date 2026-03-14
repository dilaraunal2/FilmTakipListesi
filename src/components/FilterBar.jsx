const GENRES = ["Tümü", "Aksiyon", "Komedi", "Drama", "Korku", "Sci-Fi", "Animasyon", "Diğer"];

export default function FilterBar({ active, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {GENRES.map((g) => (
        <button
          key={g}
          onClick={() => onChange(g)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
            ${active === g
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          {g}
        </button>
      ))}
    </div>
  );
}