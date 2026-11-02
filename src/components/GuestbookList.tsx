import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquareQuote, CheckCircle, XCircle, HelpCircle, Database, Info } from 'lucide-react'
import { GuestbookEntry, AttendanceStatus } from '../types/wedding'

interface GuestbookListProps {
  entries: GuestbookEntry[]
  isLiveBackend: boolean
  isLoading?: boolean
}

export const GuestbookList: React.FC<GuestbookListProps> = ({
  entries,
  isLiveBackend,
  isLoading = false,
}) => {
  const getAttendanceBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'Hadir':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3" /> Hadir
          </span>
        )
      case 'Tidak Hadir':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" /> Tidak Hadir
          </span>
        )
      case 'Masih Belum Pasti':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <HelpCircle className="w-3 h-3" /> Masih Ragu
          </span>
        )
    }
  }

  const formatTimestamp = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return ''
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-10">
      {/* BACKEND STATUS NOTICE (HONEST REPORTING REQUIREMENT) */}
      <div className="mb-6 p-3.5 rounded-2xl bg-[#EFE6D9]/70 border border-[#B69A70]/25 text-left flex items-start gap-2.5">
        {isLiveBackend ? (
          <>
            <Database className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="font-sans text-[11px] text-[#63564A] leading-relaxed">
              <strong className="text-emerald-700">Terhubung ke Database:</strong> Ucapan dan doa tersimpan di Supabase secara live.
            </p>
          </>
        ) : (
          <>
            <Info className="w-4 h-4 text-[#B69A70] flex-shrink-0 mt-0.5" />
            <p className="font-sans text-[11px] text-[#63564A] leading-relaxed">
              <strong className="text-[#41372F]">Mode Demo / Pratinjau Lokal:</strong> Database Supabase belum dikonfigurasi. Ucapan baru ditampilkan pada sesi browser ini.
            </p>
          </>
        )}
      </div>

      {/* LIST OF WISHES */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#41372F]">
          Doa &amp; Ucapan ({entries.length})
        </h4>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-[#887869] text-xs font-sans">
          Memuat ucapan...
        </div>
      ) : entries.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-white/50 border border-[#B69A70]/20 text-[#887869] text-xs font-sans">
          Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
        </div>
      ) : (
        <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
          {entries.map((entry, idx) => (
            <motion.div
              key={entry.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
              className="p-5 rounded-2xl bg-white/85 border border-[#B69A70]/25 shadow-sm text-left hover:border-[#B69A70]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#EFE6D9] border border-[#B69A70]/30 flex items-center justify-center text-[#73765D] font-serif font-bold text-xs">
                    {entry.guest_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-serif font-semibold text-sm sm:text-base text-[#41372F]">
                      {entry.guest_name}
                    </h5>
                    <span className="font-sans text-[10px] text-[#887869]">
                      {formatTimestamp(entry.created_at)}
                    </span>
                  </div>
                </div>

                {getAttendanceBadge(entry.attendance)}
              </div>

              <div className="relative pl-6 pt-1">
                <MessageSquareQuote className="w-3.5 h-3.5 text-[#B69A70]/50 absolute left-0 top-1.5" />
                <p className="font-sans text-xs sm:text-sm text-[#63564A] leading-relaxed whitespace-pre-wrap break-words">
                  {entry.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
