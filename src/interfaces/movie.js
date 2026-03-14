// Movie nesnesinin yapısı (arayüz / şablon)
export const createMovie = (data) => ({
  id: Date.now(),
  title: data.title || "",
  year: data.year || "",
  genre: data.genre || "Diğer",
  poster: data.poster || "",
  imdbID: data.imdbID || "",
  rating: data.rating || 0,       // 1-5 yıldız
  watched: data.watched || false,
  note: data.note || "",
  addedAt: new Date().toISOString(),
});