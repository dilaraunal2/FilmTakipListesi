# 🎬 Film Listem

React ve Tailwind CSS ile geliştirilmiş modern bir film takip uygulaması.

## 📸 Ekran Görüntüleri

### Ana Sayfa


### Film Ekle


## 🚀 Özellikler

- 🎥 Film ekleme, listeleme, güncelleme ve silme (CRUD)
- 🔍 Film adına göre arama
- 🎭 Türe göre filtreleme (Aksiyon, Komedi, Drama...)
- ⭐ 1-5 yıldız ile puanlama
- ✅ İzlendi / İzlenmedi takibi
- 🎞️ OMDB API ile otomatik film posteri çekme
- 🌙 Koyu / Açık tema desteği
- 💾 LocalStorage ile kalıcı veri saklama

## 🛠️ Kullanılan Teknolojiler

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OMDB API](https://www.omdbapi.com/)

## 📁 Proje Yapısı
```
src/
├── components/
│   ├── MovieCard.jsx
│   ├── MovieForm.jsx
│   ├── SearchBar.jsx
│   ├── FilterBar.jsx
│   └── StarRating.jsx
├── pages/
│   ├── HomePage.jsx
│   └── WatchedPage.jsx
├── interfaces/
│   └── movie.js
├── App.jsx
└── main.jsx
```

## ⚙️ Kurulum
```bash
# Projeyi klonla
git clone https://github.com/dilaraunal2/FilmTakipListesi.git

# Klasöre gir
cd FilmTakipListesi

# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
VITE_OMDB_KEY=api_keyini_buraya_yaz

# Projeyi başlat
npm run dev
```

## 🌐 Canlı Demo
https://69b55960500c6f6a0495784e--grand-lollipop-ef2cb0.netlify.app/
