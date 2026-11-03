import React, { useState } from 'react'
import { Calendar, CalendarPlus, Check } from 'lucide-react'
import {
  downloadCalendarEvent,
  buildGoogleCalendarUrl,
  CalendarEventProps,
} from '../utils/ics'

interface CalendarButtonProps {
  event: CalendarEventProps
  className?: string
}

const buttonClass =
  'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#B69A70] bg-white/80 hover:bg-[#B69A70] text-[#41372F] hover:text-white transition-all duration-300 text-xs sm:text-sm font-sans tracking-wider uppercase font-medium shadow-sm hover:shadow-soft-gold active:scale-95'

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
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${className}`}>
      <a
        href={buildGoogleCalendarUrl(event)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Simpan Tanggal Pernikahan ke Google Calendar"
      >
        <CalendarPlus className="w-4 h-4" />
        <span>Google Calendar</span>
      </a>

      <button
        type="button"
        onClick={handleDownload}
        className={buttonClass}
        aria-label="Unduh file kalender untuk Apple Calendar atau aplikasi lain"
      >
        {downloaded ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span>File Diunduh</span>
          </>
        ) : (
          <>
            <Calendar className="w-4 h-4" />
            <span>Apple / Lainnya</span>
          </>
        )}
      </button>
    </div>
  )
}
