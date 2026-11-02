import React, { useState } from 'react'
import { Calendar, Check } from 'lucide-react'
import { downloadCalendarEvent, CalendarEventProps } from '../utils/ics'

interface CalendarButtonProps {
  event: CalendarEventProps
  className?: string
}

export const CalendarButton: React.FC<CalendarButtonProps> = ({ event, className = '' }) => {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    try {
      downloadCalendarEvent(event)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch (err) {
      console.error('Failed to download calendar event:', err)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#B69A70] bg-white/80 hover:bg-[#B69A70] text-[#41372F] hover:text-white transition-all duration-300 text-xs sm:text-sm font-sans tracking-wider uppercase font-medium shadow-sm hover:shadow-soft-gold active:scale-95 ${className}`}
      aria-label="Simpan Tanggal Pernikahan ke Kalender"
    >
      {downloaded ? (
        <>
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Tersimpan di Kalender</span>
        </>
      ) : (
        <>
          <Calendar className="w-4 h-4 text-[#B69A70] group-hover:text-white" />
          <span>Simpan Tanggal</span>
        </>
      )}
    </button>
  )
}
