import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, ExternalLink, CalendarDays, AlertCircle } from 'lucide-react'
import { Countdown } from './Countdown'
import { CalendarButton } from './CalendarButton'
import { FloralDivider } from './FloralOrnament'

interface EventSectionProps {
  weddingDate: string
  eventDay: string
  eventDateLabel: string
  akadTime: string
  receptionTime: string
  venueName: string
  venueAddress: string
  googleMapsUrl: string
  brideName: string
  groomName: string
}

export const EventSection: React.FC<EventSectionProps> = ({
  weddingDate,
  eventDay,
  eventDateLabel,
  akadTime,
  receptionTime,
  venueName,
  venueAddress,
  googleMapsUrl,
  brideName,
  groomName,
}) => {
  const [showMapsNotice, setShowMapsNotice] = useState(false)

  const isMapsAvailable = Boolean(
    googleMapsUrl &&
    googleMapsUrl.trim().length > 0 &&
    !googleMapsUrl.includes('placeholder')
  )

  const handleMapsClick = (e: React.MouseEvent) => {
    if (!isMapsAvailable) {
      e.preventDefault()
      setShowMapsNotice(true)
      setTimeout(() => setShowMapsNotice(false), 4000)
    }
  }

  return (
    <section
      id="event"
      className="relative py-20 px-6 sm:px-10 bg-[#F8F4ED] text-[#41372F] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto"
        >
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-[#73765D] font-medium mb-1">
            Waktu &amp; Tempat
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#41372F]">
            Menuju Hari Bahagia
          </h2>
          <FloralDivider className="my-4" />
        </motion.div>

        {/* COUNTDOWN TIMER */}
        <Countdown targetDate={weddingDate} />

        {/* CALENDAR ICS BUTTON */}
        <div className="mt-2 mb-12">
          <CalendarButton
            event={{
              title: `Pernikahan ${brideName} & ${groomName}`,
              description: `Akad Nikah: ${akadTime}\nResepsi: ${receptionTime}\nLokasi: ${venueName}, ${venueAddress}`,
              location: `${venueName}, ${venueAddress}`,
              startDate: weddingDate,
            }}
          />
        </div>

        {/* EVENT INVITATION TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto mb-10"
        >
          <p className="font-sans text-xs sm:text-sm text-[#63564A] leading-relaxed">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri acara pernikahan kami pada:
          </p>

          {/* PROMINENT DATE BADGE */}
          <div className="my-6 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 border border-[#B69A70]/40 shadow-soft-card">
            <CalendarDays className="w-5 h-5 text-[#B69A70]" />
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#41372F] tracking-wide">
              {eventDay}, {eventDateLabel}
            </span>
          </div>
        </motion.div>

        {/* AKAD & RESEPSI CARDS */}
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
          {/* AKAD NIKAH CARD */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 rounded-3xl bg-white/70 border border-[#B69A70]/30 shadow-soft-card flex flex-col items-center relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-full bg-[#EFE6D9] flex items-center justify-center mb-4 text-[#73765D]">
              <Clock className="w-5 h-5 text-[#B69A70]" />
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#41372F] mb-2 uppercase tracking-wide">
              Akad Nikah
            </h3>

            <div className="w-10 h-[1px] bg-[#B69A70]/40 my-2" />

            <p className="font-sans text-sm font-semibold text-[#73765D] mt-2">
              {akadTime}
            </p>
          </motion.div>

          {/* RESEPSI CARD */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 rounded-3xl bg-white/70 border border-[#B69A70]/30 shadow-soft-card flex flex-col items-center relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-full bg-[#EFE6D9] flex items-center justify-center mb-4 text-[#73765D]">
              <Clock className="w-5 h-5 text-[#B69A70]" />
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#41372F] mb-2 uppercase tracking-wide">
              Resepsi
            </h3>

            <div className="w-10 h-[1px] bg-[#B69A70]/40 my-2" />

            <p className="font-sans text-sm font-semibold text-[#73765D] mt-2">
              {receptionTime}
            </p>
          </motion.div>
        </div>

        {/* LOCATION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-3xl p-8 rounded-3xl bg-white/80 border border-[#B69A70]/35 shadow-soft-card flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#EFE6D9] flex items-center justify-center mb-4 text-[#73765D]">
            <MapPin className="w-5 h-5 text-[#B69A70]" />
          </div>

          <h3 className="font-serif text-2xl font-semibold text-[#41372F] mb-2 uppercase tracking-wide">
            Lokasi Acara
          </h3>

          <p className="font-serif text-lg sm:text-xl font-medium text-[#41372F] mb-2">
            {venueName}
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#63564A] leading-relaxed max-w-md mx-auto mb-6 px-2">
            {venueAddress}
          </p>

          {/* GOOGLE MAPS BUTTON */}
          <div className="flex flex-col items-center gap-2">
            {isMapsAvailable ? (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#73765D] hover:bg-[#585B45] text-white font-sans text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors shadow-sm active:scale-95"
              >
                <MapPin className="w-4 h-4" />
                <span>Lihat Lokasi di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            ) : (
              <button
                onClick={handleMapsClick}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#B69A70]/40 text-[#63564A] font-sans text-xs sm:text-sm font-medium tracking-wider uppercase cursor-not-allowed"
                title="Tautan Google Maps belum disematkan di konfigurasi"
              >
                <MapPin className="w-4 h-4 text-[#63564A]" />
                <span>Lihat Lokasi di Google Maps</span>
              </button>
            )}

            {showMapsNotice && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-xs text-[#887869] mt-2 italic"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#B69A70]" />
                <span>Tautan Google Maps belum dikonfigurasi di wedding.ts</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
