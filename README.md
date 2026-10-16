# Madani Printing – Company Profile & Katalog
Website static untuk **PT. Madani Aksara Nusa** (brand **Madani Printing**). Teknologi: HTML, CSS, JavaScript vanilla (tanpa framework/build).

## Struktur
`index.html`, `pages/` (produk, layanan, portfolio, kegiatan, tentang, kontak), `css/`, `js/`, `assets/` (logo, products, activities, portfolio, icons).

## Menjalankan
Buka folder di VS Code → ekstensi *Live Server* → "Open with Live Server" (atau buka `index.html` langsung).

## Mengganti konten
- **Logo**: timpa `assets/logo/logo-madani.png`. Teks logo navbar ada di `.logo` pada setiap file HTML.
- **Gambar produk**: timpa file di `assets/products/` dengan nama yang sama (placeholder otomatis dibuat; ganti dengan foto asli tanpa watermark).
- **Tambah produk**: tambah objek di `PRODUCTS` pada `js/products.js` (isi `sizes`, `materials`, `finishing` hanya jika data pasti).
- **Tambah kegiatan**: edit `ACTIVITIES` di `js/activities.js`. **Portfolio**: `PORTFOLIO` di `js/portfolio.js`.
- **Tambah review**: edit `REVIEWS` di `js/reviews.js` – **gunakan ulasan asli**; screenshot Shopee lewat field `screenshot`.
- **Nomor WhatsApp**: ubah `WHATSAPP_NUMBER` di `js/main.js` (format `628xxxxxxxxxx`). Semua tombol memakai `openWhatsApp()`.
- **Placeholder** `[ALAMAT]`, `[EMAIL]`, `[RATING SHOPEE]`, `[DATA]`, dll. dicari dengan *Find in Files* `[` dan diganti data asli.

## Deploy GitHub Pages
1. Buat repository, push isi folder ini (`index.html` di root).
2. Settings → Pages → Source: branch `main`, folder `/ (root)` → Save.
3. Situs aktif di `https://username.github.io/nama-repo/`. Jangan simpan password/API key di repository.

## Pengembangan ke Laravel + MySQL
Data di `js/*.js` (produk, kegiatan, review) dapat dipindah ke tabel MySQL dan disajikan lewat Blade/API; CSS dan JS dapat dipakai ulang. Lanjutan: admin dashboard → akun customer → order → upload desain → kalkulator harga → checkout/pembayaran → tracking produksi. Keamanan (auth, validasi, pembayaran) harus ditangani di backend.
