import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { AttendanceStatus, GuestbookEntry } from '../types/wedding'
import { guestbookService } from '../services/guestbookService'

interface RSVPFormProps {
  onEntryAdded: (entry: GuestbookEntry) => void
  defaultGuestName?: string
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onEntryAdded, defaultGuestName = '' }) => {
  const [name, setName] = useState(defaultGuestName !== 'Bapak/Ibu/Saudara/i' ? defaultGuestName : '')
  const [message, setMessage] = useState('')
  const [attendance, setAttendance] = useState<AttendanceStatus>('Hadir')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ text: string; isLive: boolean } | null>(null)

  // Sinkronkan nama tamu default dari parameter URL jika berubah
  useEffect(() => {
    if (defaultGuestName && defaultGuestName !== 'Bapak/Ibu/Saudara/i' && !name) {
      setName(defaultGuestName)
    }
  }, [defaultGuestName])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setFeedback(null)

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName) {
      setErrorMessage('Mohon isi nama Anda.')
      return
    }
    if (trimmedName.length < 2) {
      setErrorMessage('Nama terlalu pendek (minimal 2 karakter).')
      return
    }
    if (!trimmedMessage) {
      setErrorMessage('Mohon tuliskan ucapan atau doa Anda.')
      return
    }
    if (trimmedMessage.length < 3) {
      setErrorMessage('Ucapan terlalu pendek (minimal 3 karakter).')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await guestbookService.submitEntry({
        guest_name: trimmedName,
        message: trimmedMessage,
        attendance,
      })

      if (result.success && result.entry) {
        onEntryAdded(result.entry)
        setMessage('')
        setFeedback({
          text: result.message,
          isLive: result.isLiveBackend,
        })

        // Auto dismiss feedback after 5s
        setTimeout(() => setFeedback(null), 5000)
      } else {
        setErrorMessage(result.message || 'Gagal mengirim ucapan.')
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat mengirim ucapan.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#B69A70]/35 shadow-soft-card text-left"
    >
      {/* INPUT NAMA */}
      <div className="mb-5">
        <label
          htmlFor="rsvp-name"
          className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#73765D] mb-2"
        >
          Nama <span className="text-rose-500">*</span>
        </label>
        <input
          id="rsvp-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama Anda"
          disabled={isSubmitting}
          maxLength={100}
          className="w-full px-4 py-3 rounded-xl border border-[#B69A70]/30 bg-[#F8F4ED]/60 text-[#41372F] placeholder-[#887869]/60 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#B69A70]/50 transition-all disabled:opacity-50"
        />
      </div>

      {/* INPUT UCAPAN & DOA */}
      <div className="mb-5">
        <label
          htmlFor="rsvp-message"
          className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#73765D] mb-2"
        >
          Ucapan dan Doa <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="rsvp-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..."
          disabled={isSubmitting}
          maxLength={1000}
          className="w-full px-4 py-3 rounded-xl border border-[#B69A70]/30 bg-[#F8F4ED]/60 text-[#41372F] placeholder-[#887869]/60 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#B69A70]/50 transition-all disabled:opacity-50 resize-y"
        />
      </div>

      {/* KONFIRMASI KEHADIRAN */}
      <div className="mb-6">
        <label
          htmlFor="rsvp-attendance"
          className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#73765D] mb-2"
        >
          Konfirmasi Kehadiran
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {(['Hadir', 'Tidak Hadir', 'Masih Belum Pasti'] as AttendanceStatus[]).map((status) => {
            const isSelected = attendance === status
            return (
              <button
                key={status}
                type="button"
                onClick={() => setAttendance(status)}
                disabled={isSubmitting}
                className={`py-2.5 px-2 rounded-xl text-xs font-sans font-medium text-center transition-all ${
                  isSelected
                    ? 'bg-[#B69A70] text-white shadow-sm'
                    : 'bg-[#F8F4ED] border border-[#B69A70]/25 text-[#63564A] hover:bg-[#EFE6D9]'
                }`}
              >
                {status}
              </button>
            )
          })}
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans mb-4"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {/* FEEDBACK STATUS */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans mb-4"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{feedback.text}</p>
            {!feedback.isLive && (
              <p className="text-[11px] text-emerald-700/80 mt-0.5">
                (Mode Demo: Terlihat di pratinjau browser ini)
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#B69A70] hover:bg-[#93784F] text-white font-sans text-xs sm:text-sm font-medium tracking-widest uppercase transition-all shadow-soft-gold active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Mengirim...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Kirim Ucapan</span>
          </>
        )}
      </button>
    </form>
  )
}
