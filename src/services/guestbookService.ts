import { GuestbookEntry, AttendanceStatus } from '../types/wedding'

/**
 * ============================================================================
 * GUESTBOOK & RSVP SERVICE (SUPABASE-READY ARCHITECTURE)
 * ============================================================================
 * 
 * Untuk menghubungkan ke database Supabase:
 * 1. Buat project di https://supabase.com
 * 2. Jalankan query SQL berikut di SQL Editor Supabase:
 * 
 * ----------------------------------------------------------------------------
 * CREATE TABLE guestbook (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   guest_name VARCHAR(100) NOT NULL,
 *   message TEXT NOT NULL,
 *   attendance VARCHAR(30) NOT NULL CHECK (attendance IN ('Hadir', 'Tidak Hadir', 'Masih Belum Pasti')),
 *   created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
 * );
 * 
 * -- Aktifkan Row Level Security (RLS)
 * ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;
 * 
 * -- Kebijakan izinkan siapa saja membaca ucapan
 * CREATE POLICY "Public can view guestbook entries"
 *   ON guestbook FOR SELECT USING (true);
 * 
 * -- Kebijakan izinkan publik mengirim ucapan (insert)
 * CREATE POLICY "Public can insert guestbook entries"
 *   ON guestbook FOR INSERT WITH CHECK (
 *     char_length(guest_name) >= 2 AND 
 *     char_length(guest_name) <= 100 AND
 *     char_length(message) >= 3 AND 
 *     char_length(message) <= 1000
 *   );
 * ----------------------------------------------------------------------------
 * 
 * 3. Tambahkan environment variables di file `.env` (atau di hosting provider):
 *    VITE_SUPABASE_URL=https://your-project.supabase.co
 *    VITE_SUPABASE_ANON_KEY=your-anon-key
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('your-project')
)

// Data demo awal untuk preview lokal yang jujur dan elegan
const INITIAL_DEMO_ENTRIES: GuestbookEntry[] = [
  {
    id: 'demo-1',
    guest_name: 'Ust. Ahmad & Keluarga',
    message: 'Barakallahu laka wa baraka \'alaika wa jama\'a bainakuma fii khoir. Semoga Allah limpahkan sakinah, mawaddah, wa rahmah untuk Hamda dan Ridho.',
    attendance: 'Hadir',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: 'demo-2',
    guest_name: 'Fatimah Az-Zahra',
    message: 'Selamat menempuh hidup baru Hamda dan Ridho! Semoga senantiasa dalam lindungan dan keberkahan Allah SWT hingga ke jannah-Nya.',
    attendance: 'Hadir',
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
  {
    id: 'demo-3',
    guest_name: 'Dimas Kurniawan',
    message: 'Selamat saudaraku Ridho & Hamda. Mohon maaf belum bisa hadir secara langsung karena dinas luar kota, tapi doa terbaik senantiasa menyertai kalian.',
    attendance: 'Tidak Hadir',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
]

// In-memory store untuk sesi lokal (tidak disimpan permanen di localStorage sesuai spesifikasi)
let memoryStore: GuestbookEntry[] = [...INITIAL_DEMO_ENTRIES]

export interface FetchEntriesResult {
  entries: GuestbookEntry[]
  isLiveBackend: boolean
  error?: string
}

export interface SubmitEntryResult {
  success: boolean
  entry?: GuestbookEntry
  isLiveBackend: boolean
  message: string
}

export const guestbookService = {
  /**
   * Mengambil daftar ucapan dan doa
   */
  async getEntries(): Promise<FetchEntriesResult> {
    if (!isSupabaseConfigured) {
      return {
        entries: [...memoryStore].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
        isLiveBackend: false,
      }
    }

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/guestbook?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Gagal memuat ucapan dari server (${response.status})`)
      }

      const data: GuestbookEntry[] = await response.json()
      return {
        entries: data,
        isLiveBackend: true,
      }
    } catch (err: any) {
      console.warn('Supabase fetch failed, falling back to local memory store:', err)
      return {
        entries: [...memoryStore],
        isLiveBackend: false,
        error: err.message || 'Gagal tersambung ke database',
      }
    }
  },

  /**
   * Mengirim ucapan baru
   */
  async submitEntry(input: {
    guest_name: string
    message: string
    attendance: AttendanceStatus
  }): Promise<SubmitEntryResult> {
    const trimmedName = input.guest_name.trim()
    const trimmedMessage = input.message.trim()

    // Validasi dasar
    if (!trimmedName) {
      return { success: false, isLiveBackend: false, message: 'Mohon isi nama Anda.' }
    }
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return { success: false, isLiveBackend: false, message: 'Nama harus antara 2 hingga 100 karakter.' }
    }
    if (!trimmedMessage) {
      return { success: false, isLiveBackend: false, message: 'Mohon tuliskan ucapan atau doa Anda.' }
    }
    if (trimmedMessage.length < 3 || trimmedMessage.length > 1000) {
      return { success: false, isLiveBackend: false, message: 'Ucapan harus antara 3 hingga 1000 karakter.' }
    }

    // Jika Supabase terkonfigurasi, simpan ke database
    if (isSupabaseConfigured) {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/guestbook`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
          body: JSON.stringify({
            guest_name: trimmedName,
            message: trimmedMessage,
            attendance: input.attendance,
          }),
        })

        if (!response.ok) {
          throw new Error(`Server menolak data (${response.status})`)
        }

        const [created] = await response.json()
        return {
          success: true,
          entry: created,
          isLiveBackend: true,
          message: 'Ucapan dan doa Anda berhasil disimpan ke database.',
        }
      } catch (err: any) {
        return {
          success: false,
          isLiveBackend: true,
          message: err.message || 'Terjadi kesalahan saat menyimpan ke database.',
        }
      }
    }

    // Mode Demo / Local Memory
    const newEntry: GuestbookEntry = {
      id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      guest_name: trimmedName,
      message: trimmedMessage,
      attendance: input.attendance,
      created_at: new Date().toISOString(),
    }
    memoryStore = [newEntry, ...memoryStore]

    return {
      success: true,
      entry: newEntry,
      isLiveBackend: false,
      message: 'Ucapan berhasil ditambahkan ke sesi pratinjau lokal ini.',
    }
  },
}
