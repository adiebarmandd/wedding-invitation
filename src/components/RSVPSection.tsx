import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageSquareHeart } from 'lucide-react'
import { FloralDivider } from './FloralOrnament'
import { RSVPForm } from './RSVPForm'
import { GuestbookList } from './GuestbookList'
import { guestbookService } from '../services/guestbookService'
import { GuestbookEntry } from '../types/wedding'

interface RSVPSectionProps {
  enabled: boolean
  enableGuestbook: boolean
  defaultGuestName?: string
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({
  enabled,
  enableGuestbook,
  defaultGuestName = '',
}) => {
  if (!enabled) return null

  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [isLiveBackend, setIsLiveBackend] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadEntries = async () => {
      try {
        const result = await guestbookService.getEntries()
        if (isMounted) {
          setEntries(result.entries)
          setIsLiveBackend(result.isLiveBackend)
        }
      } catch (err) {
        console.error('Failed to load guestbook entries:', err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadEntries()

    return () => {
      isMounted = false
    }
  }, [])

  const handleEntryAdded = (newEntry: GuestbookEntry) => {
    setEntries((prev) => [newEntry, ...prev])
  }

  return (
    <section
      id="rsvp"
      className="relative py-20 px-6 sm:px-10 bg-[#EFE6D9]/40 text-[#41372F] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto mb-10"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-4 text-[#73765D] shadow-sm">
            <MessageSquareHeart className="w-5 h-5 text-[#B69A70]" />
          </div>

          <p className="font-sans text-xs tracking-[0.35em] uppercase text-[#73765D] font-medium mb-1">
            Buku Tamu &amp; Kehadiran
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#41372F]">
            Ucapan dan Doa
          </h2>
          <FloralDivider className="my-4" />

          <p className="font-sans text-xs sm:text-sm text-[#63564A] leading-relaxed max-w-lg mx-auto">
            Untaian doa dan ucapan selamat dari Bapak/Ibu/Saudara/i sangat berarti bagi kami dalam mengawali lembaran baru ini.
          </p>
        </motion.div>

        {/* RSVP FORM */}
        <RSVPForm
          onEntryAdded={handleEntryAdded}
          defaultGuestName={defaultGuestName}
        />

        {/* GUESTBOOK LIST */}
        {enableGuestbook && (
          <GuestbookList
            entries={entries}
            isLiveBackend={isLiveBackend}
            isLoading={isLoading}
          />
        )}
      </div>
    </section>
  )
}
