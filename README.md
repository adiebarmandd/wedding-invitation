# Website Undangan Pernikahan Digital — The Wedding of Furina & Aether

Website undangan pernikahan digital berbasis web single-page scrolling yang elegan, romantis, sinematik, responsif, dan bernuansa Islami. Dibangun menggunakan arsitektur modern **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, dan **Lucide React**.

---

## 📋 Daftar Sembilan Section Utama

1. **Home / Opening Cover** — Halaman pembuka fullscreen simetris, tipografi serif anggun, ornamen floral botanical, personalisasi nama tamu undangan dari parameter URL `?to=...`, dan tombol interaktif *Buka Undangan*.
2. **Intro / Cinematic Hero** — Tinggi minimum 100svh, video background layer dengan fallback sinematik elegan, efek melayang kupu-kupu SVG lembut (*pointer-events: none*), dan indikator *Scroll to Explore*.
3. **We Found Love** — Ayat suci Al-Qur'an (Surah Ar-Rum : 21) lengkap dengan teks Arab bertipografi Amiri dan terjemahan resmi dalam tata letak editorial yang khidmat.
4. **Couple / Profil Mempelai** — Pembuka Basmalah, salam silaturahmi, bingkai lengkung artistik untuk foto mempelai wanita (*Hamda*) dan mempelai pria (*Ridho*), keterangan orang tua, serta simbol ampersand emas.
5. **Event / Countdown dan Detail Acara** — Countdown waktu interaktif (otomatis menangani tanggal masa lalu dengan status *"Alhamdulillah, hari bahagia telah berlangsung"* tanpa angka negatif), tombol ekspor kalender `.ics` (*Simpan Tanggal*), jadwal Akad Nikah, jadwal Resepsi, dan tombol tautan Google Maps.
6. **Reserved Section / Optional Gallery** — Galeri foto modular dengan lightbox modal (dukungan navigasi panah & tombol Escape). Secara default nonaktif (`optionalGallery: false`) tanpa menyisakan ruang kosong atau celah layout.
7. **Wedding Gift** — Dua kartu rekening terpisah dengan tombol *Salin Nomor Rekening* menggunakan Clipboard API nyata serta feedback konfirmasi.
8. **RSVP / Ucapan dan Doa** — Formulir interaktif (Nama, Ucapan, Kehadiran) dengan validasi ketat, proteksi dobel submit, daftar buku tamu, dan arsitektur siap Supabase dengan status koneksi jujur (*Live Database* vs *Mode Demo Lokal*).
9. **Closing / Penutup** — Ucapan terima kasih, *Jazakumullah Khairan*, doa restu penutup, dan nama pasangan *HAMDA & RIDHO* sebagai elemen penutup yang menonjol.

---

## 🛠️ Menjalankan Proyek Secara Lokal

Pastikan Node.js (v18+) telah terpasang di komputer Anda.

1. **Buka terminal di folder proyek:**
   ```powershell
   cd "c:\Users\myuse\Documents\antigravity\wedding invitation"
   ```

2. **Jalankan development server:**
   ```powershell
   npm run dev
   ```
   Akses website melalui browser di: `http://localhost:5173`

3. **Format link personalisasi nama tamu:**
   ```
   http://localhost:5173/?to=Rekan-rekan+Kesantrian+Azhari#open
   ```
   Nilai parameter `to` akan langsung ditampilkan di bagian *"Kepada Yth. Bapak/Ibu/Saudara/i [Nama Tamu]"*.

4. **Membuat build produksi:**
   ```powershell
   npm run build
   ```
   Hasil file siap deploy berada di folder `dist/`.

---

## ⚙️ Pusat Konfigurasi Data Pernikahan (`src/config/wedding.ts`)

Semua data dapat disesuaikan hanya melalui satu file: [`src/config/wedding.ts`](file:///c:/Users/myuse/Documents/antigravity/wedding%20invitation/src/config/wedding.ts).

### Daftar Hal yang Perlu Anda Lengkapi / Ganti:

| Bagian | Properti di `wedding.ts` | Keterangan & Lokasi File |
|---|---|---|
| **Nama Lengkap Mempelai** | `brideFullName`, `groomFullName` | Lengkapi nama lengkap beserta gelar |
| **Nama Orang Tua** | `brideFather`, `brideMother`, `groomFather`, `groomMother` | Nama ayah & ibu kedua mempelai |
| **Foto Mempelai** | `bridePhoto`, `groomPhoto` | Letakkan file di `/public/images/` lalu isi path (misal: `/images/hamda.jpg`) |
| **Video Hero (Opsional)** | `heroVideo` | Letakkan video di `/public/videos/` (misal: `/videos/cinematic.mp4`). Jika kosong, otomatis memakai fallback elegan |
| **Google Maps** | `googleMapsUrl` | Masukkan tautan share lokasi Google Maps |
| **Rekening Bank** | `bankAccounts` | Masukkan nama bank, nomor rekening, dan nama pemilik rekening asli |
| **Galeri Foto (Opsional)** | `optionalGallery`, `galleryPhotos` | Ubah ke `true` jika ingin menampilkan galeri, dan isi array foto |
| **Musik Latar (Opsional)** | `optionalLiveMusic`, `musicUrl` | Ubah ke `true` dan letakkan lagu di `/public/audio/song.mp3` |

---

## 🗄️ Panduan Menghubungkan Supabase (RSVP Database)

Secara default, website berjalan dalam **Mode Demo / Pratinjau Lokal** yang jujur (ucapan ditampilkan di sesi browser tanpa mengklaim palsu tersimpan ke server).

Untuk mengaktifkan database online permanen menggunakan Supabase:

1. Buat proyek baru di [https://supabase.com](https://supabase.com).
2. Buka menu **SQL Editor**, lalu jalankan query berikut:

```sql
CREATE TABLE guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  attendance VARCHAR(30) NOT NULL CHECK (attendance IN ('Hadir', 'Tidak Hadir', 'Masih Belum Pasti')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Kebijakan siapa saja dapat membaca ucapan
CREATE POLICY "Public can view guestbook entries"
  ON guestbook FOR SELECT USING (true);

-- Kebijakan siapa saja dapat mengirim ucapan baru
CREATE POLICY "Public can insert guestbook entries"
  ON guestbook FOR INSERT WITH CHECK (
    char_length(guest_name) >= 2 AND 
    char_length(guest_name) <= 100 AND
    char_length(message) >= 3 AND 
    char_length(message) <= 1000
  );
```

3. Buat file `.env` di root direktori proyek:
```env
VITE_SUPABASE_URL=https://proyek-anda.supabase.co
VITE_SUPABASE_ANON_KEY=kunci-anon-publik-anda
```

Website akan secara otomatis mendeteksi konfigurasi tersebut dan beralih ke mode **Live Database**.
