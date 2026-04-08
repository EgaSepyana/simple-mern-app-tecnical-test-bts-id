# Aplikasi Frontend TecticalTest

Proyek ini adalah aplikasi web frontend yang dibangun menggunakan **React**, **TypeScript**, dan **Vite**.

## Memulai Proyek

Karena proyek ini dikonfigurasikan agar berjalan lancar di lingkungan modern, Anda dapat menjalankan aplikasi ini menggunakan dua cara: memanfaatkan skrip otomatis yang telah disediakan (menjalankan aplikasi di dalam Docker) atau secara manual menggunakan environment Node.js lokal di perangkat Anda.

---

### Opsi 1: Pengaturan Otomatis (Cepat menggunakan `init.sh`)

Kami telah menyediakan file skrip shell (`init.sh`) yang memudahkan dan mengotomatiskan seluruh proses setup. Skrip ini akan menginstal dependencies lokal (guna menjaga agar fitur intellisense di IDE Anda tetap berfungsi), melakukan build Docker image untuk aplikasi, dan langsung menjalankannya dalam wadah (container) Docker.

**Prasyarat:**
- [Docker](https://docs.docker.com/get-docker/) telah terinstal dan berjalan di sistem Anda.

**Cara Penggunaan:**
1. Buka terminal Anda di direktori utama (root) proyek ini.
2. Jika skrip belum bisa dieksekusi, berikan izin eksekusi dengan menjalankan:
   ```bash
   chmod +x init.sh
   ```
3. Jalankan skrip inisialisasi:
   ```bash
   ./init.sh
   ```
4. Tunggu beberapa saat sampai *image* selesai di-build. Setelah berhasil, aplikasi dapat diakses di browser melalui **[http://localhost:8080](http://localhost:8080)**.

Untuk menghentikan *container* Docker secara manual kapan saja, jalankan:
```bash
docker stop tectical-test-app-container
```
---

### Opsi 2: Pengaturan Manual (Untuk Development Lokal)

Jika Anda lebih memilih untuk menjalankan aplikasi ini secara manual, misalnya saat sedang dalam tahap pengembangan (development) aktif, Anda dapat menggunakan Node.js secara langsung tanpa Docker.

**Prasyarat:**
- [Node.js](https://nodejs.org/) (Direkomendasikan menggunakan versi **22.x** atau minimal **20.19+** sebagai syarat lingkungan Vite yang versi baru).

**Cara Penggunaan:**
1. Buka terminal Anda di direktori utama (root) proyek ini.
2. Instal semua dependencies (ketergantungan) yang dibutuhkan menggunakan npm:
   ```bash
   npm install
   ```
3. Mulai server *development* Vite:
   ```bash
   npm run dev
   ```
4. CLI nantinya akan menampilkan URL lokal (biasanya **http://localhost:5173**) di mana Anda bisa melihat tampilan aplikasi secara langsung lengkap dengan fitur Hot Module Replacement (HMR).

## Build untuk Production

Jika sewaktu-waktu Anda perlu melakukan *build* aset aplikasi ini secara statis tanpa menggunakan Docker:
```bash
npm run build
```
File hasil keluaran *build* tersebut nantinya akan berada di dalam folder `/dist`.
