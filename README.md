# RealCommerce - Katalog Produk Responsif

> 🎓 **Tugas Kuliah**: Proyek pembuatan web Katalog Produk Responsif berbasis **Tailwind CSS v4** dan **Vanilla JavaScript (Vite)**.

---

## 📌 Deskripsi Proyek

**RealCommerce** adalah aplikasi web katalog belanja satu halaman (*single-page catalog*) yang menampilkan produk responsif dengan fitur:
- 📱 **Navigasi Responsif**: Hamburger menu mobile-friendly tanpa ketergantungan JavaScript library berat.
- 🌓 **Tema Fleksibel**: Mendukung preferensi mode **Light**, **Dark**, dan **System** dengan persistensi `localStorage`.
- 🎨 **Tailwind CSS v4**: Menggunakan token `@theme` semantik tanpa arbitrary class usang.
- 📄 **Pagination Otomatis**: Menampilkan produk per halaman dengan navigasi halaman interaktif.
- 💱 **Mata Uang Rupiah (IDR)**: Harga produk dikonversi otomatis dari USD ke IDR.
- 🌐 **Deskripsi Terjemahan**: Deskripsi produk diterjemahkan ke Bahasa Indonesia dengan tetap mempertahankan nama/merk produk asli.

---

## 📦 Sumber Data & Pipeline Preprocessing

Data produk yang digunakan pada website ini bukan hardcoded secara manual, melainkan melalui pipeline otomatis:

1. **Sumber Data**:
   - Produk diambil dari API publik [DummyJSON Products](https://dummyjson.com/products).
   - Kurs mata uang terkini diambil dari [Frankfurter API](https://api.frankfurter.dev/v2/rate/USD/IDR).
2. **Translasi**:
   - Menerjemahkan deskripsi produk ke Bahasa Indonesia menggunakan `@vitalets/google-translate-api` secara batch untuk menghindari rate limit.
   - Nama produk (*title*) dan kemunculannya di dalam deskripsi tetap dipertahankan (*masked*) agar tidak salah diterjemahkan.
3. **Konversi Harga**:
   - Menghitung harga IDR berdasarkan kurs live Frankfurter dan membulatkannya ke format Rupiah.

---

## ⚙️ Perintah Script (NPM / PNPM)

| Perintah | Deskripsi |
|---|---|
| `pnpm run dev` | Menjalankan server development lokal Vite |
| `pnpm run fetch:data` | Mengambil seluruh data mentah dari DummyJSON ke `data/products-raw.json` |
| `pnpm run process:data` | Menjalankan translasi deskripsi & konversi kurs USD $\rightarrow$ IDR |
| `pnpm run pipeline` | Menjalankan proses fetch dan processing data secara berurutan |
| `pnpm run build` | Melakukan build aplikasi ke folder `dist/` |
| `pnpm run build:full` | **Perintah All-in-One**: Menjalankan fetch data + processing + build Vite |

---

## 🚀 Panduan Deployment ke Cloudflare Pages

Karena proyek ini merupakan Static Site Generator (SSG) berbasis Vite dan folder `data/` diabaikan oleh `.gitignore`, Anda dapat langsung mendeploy ke Cloudflare Pages dengan konfigurasi berikut:

### Pengaturan Build di Cloudflare Pages Dashboard:

| Konfigurasi | Nilai yang Harus Diisi |
|---|---|
| **Framework preset** | `None` / `Vite` |
| **Build command** | `pnpm run build:full` *(atau `pnpm run build` jika data sudah di-commit)* |
| **Build output directory** | `dist` |
| **Root directory** | `/` |

> 💡 **Catatan**: 
> Menggunakan `pnpm run build:full` sebagai *Build command* memastikan Cloudflare Pages akan otomatis mengambil data terbaru dari DummyJSON, menerjemahkan deskripsi, mengonversi kurs IDR, dan mem-build asset web secara otomatis dalam satu kali proses deploy.

---

## 🛠️ Evaluasi Dependencies

Seluruh dependencies (`tailwindcss`, `@tailwindcss/vite`, `vite`, dan `@vitalets/google-translate-api`) telah dipindahkan ke **`devDependencies`**. Hal ini karena:
- Proyek ini adalah web statis yang di-bundle saat build time oleh Vite menjadi HTML, CSS, dan JS murni di folder `dist/`.
- Script scraping dan translate hanya dieksekusi saat proses build atau preprocessing di Node.js, tidak dijalankan di runtime browser klien.
