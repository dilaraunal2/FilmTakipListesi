export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Film ara..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-transparent
                 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                 placeholder-gray-500"
    />
  );
}