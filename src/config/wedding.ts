import { WeddingConfig } from '../types/wedding'

/**
 * ============================================================================
 * KONFIGURASI UTAMA UNDANGAN PERNIKAHAN DIGITAL
 * The Wedding of Furina & Aether
 * ============================================================================
 * Semua data nama, tanggal, lokasi, rekening, media, dan fitur interaktif
 * diatur melalui satu file konfigurasi ini.
 */
export const weddingConfig: WeddingConfig = {
  // --- IDENTITAS MEMPELAI ---
  brideName: 'Furina',
  groomName: 'Aether',
  
  // Ganti dengan nama lengkap dan gelar mempelai wanita
  brideFullName: 'Furina Water Archon', // Ganti: [Nama Lengkap Mempelai Wanita]
  
  // Ganti dengan nama lengkap dan gelar mempelai pria
  groomFullName: 'Aether The Traveler', // Ganti: [Nama Lengkap Mempelai Pria]

  // Orang tua mempelai wanita
  brideFather: 'Neuvilette', // Ganti: Contoh: Bapak H. Ahmad
  brideMother: 'Ronnova',   // Ganti: Contoh: Ibu Hj. Fatimah

  // Orang tua mempelai pria
  groomFather: 'Diluc',   // Ganti: Contoh: Bapak H. Abdullah
  groomMother: 'Lumine',     // Ganti: Contoh: Ibu Hj. Aisyah

  // --- TANGGAL DAN WAKTU ACARA ---
  // Format ISO 8601 dengan zona waktu WIB (+07:00)
  // CATATAN: Tanggal 01 Juli 2026. Countdown otomatis mendeteksi jika tanggal telah berlalu
  weddingDate: '2027-03-03T09:00:00+07:00',
  eventDay: 'Rabu',
  eventDateLabel: '03 Maret 2027',
  akadTime: '09.00 WIB – Selesai',
  receptionTime: '10.00 WIB – Selesai',

  // --- LOKASI DAN PETA ---
  venueName: 'Kediaman Mempelai Wanita',
  venueAddress: 'Desa Fountaine, RT. 03/RW. 02, Kedung, Jepara, Jawa Tengah',

  /**
   * URL Google Maps
   * Masukkan link share Google Maps lokasi acara di sini.
   * Contoh: 'https://maps.app.goo.gl/...'
   * Jika dibiarkan string kosong, tombol Google Maps akan dinonaktifkan dengan status ramah.
   */
  googleMapsUrl: 'https://maps.app.goo.gl/DJK2WccxkrXNxqR36', // Ganti: Masukkan URL Google Maps di sini

  // --- FOTO MEMPELAI ---
  /**
   * Path foto mempelai (letakkan file di folder /public/images/ atau link web aman)
   * Contoh: '/images/hamda.jpg' atau '/images/ridho.jpg'
   * Jika dibiarkan string kosong (''), website menampilkan placeholder artistik bernuansa floral.
   */
  bridePhoto: '/images/furina.jpg', // Ganti: Masukkan path foto Hamda di sini, misal: '/images/bride.jpg'
  groomPhoto: '/images/aether.jpg', // Ganti: Masukkan path foto Ridho di sini, misal: '/images/groom.jpg'

  // --- HERO VIDEO ---
  /**
   * Background Video pada Hero Section (opsional)
   * Masukkan path video mp4 lokal (misal: '/videos/cinematic-bg.mp4') atau URL video.
   * Jika string kosong, sistem otomatis memakai fallback background krem elegan dan ornamen sinematik.
   */
  heroVideo: '/videos/background.mp4', // Ganti: Masukkan path file video di sini

  // --- FITUR & ANIMASI ---
  optionalButterflies: true, // Animasi partikel kupu-kupu melayang lembut
  optionalGallery: false,     // Galeri foto (modular, nonaktif secara default sesuai spesifikasi)
  optionalLiveMusic: true,   // Pemutar musik latar belakang (default nonaktif)
  
  /**
   * URL Audio Musik Latar (jika optionalLiveMusic: true)
   * Letakkan file audio di /public/audio/song.mp3
   */
  musicUrl: '/audio/backgroundmusic.mp3', // Ganti: Masukkan path audio di sini, misal: '/audio/background-music.mp3'

  enableRsvp: true,           // Formulir RSVP / Ucapan & Doa
  enableGuestbook: true,      // Daftar pesan & ucapan doa para tamu
  enableWeddingGift: true,    // Rekening amplop digital / wedding gift

  // --- REKENING WEDDING GIFT ---
  /**
   * Daftar rekening bank / e-wallet untuk kado pernikahan.
   * Tombol salin menggunakan Clipboard API asli dengan notifikasi feedback.
   */
  bankAccounts: [
    {
      bankName: 'BANK BRI (BRI)',
      accountNumber: '1234567890', // Ganti: Nomor rekening mempelai wanita
      accountHolder: 'Furina',       // Ganti: Atas nama pemilik rekening
    },
    {
      bankName: 'Bank Syariah Indonesia (BSI)',
      accountNumber: '0987654321', // Ganti: Nomor rekening mempelai pria
      accountHolder: 'Aether', // Ganti: Atas nama pemilik rekening
    },
  ],

  // --- GALERI FOTO (DIGUNAKAN JIKA optionalGallery: true) ---
  galleryPhotos: [
    // Contoh format:
    // { id: '1', src: '/images/gallery-1.jpg', alt: 'Momen Bahagia 1', caption: 'Kenangan Indah' },
    // { id: '2', src: '/images/gallery-2.jpg', alt: 'Momen Bahagia 2', caption: 'Kisah Kami' },
  ],

  // --- PESAN PENUTUP ---
  closingMessage:
    'Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan do’a restu kepada kami.',

  // Fallback nama tamu undangan jika parameter URL `?to=` tidak disertakan
  defaultGuestName: 'Bapak/Ibu/Saudara/i',
}
