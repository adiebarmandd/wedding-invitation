import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MailOpen } from 'lucide-react'
import { FloralCorner, FloralDivider } from './FloralOrnament'

interface OpeningCoverProps {
  isOpen: boolean
  guestName: string
  onOpen: () => void
  weddingDateLabel: string
  brideName: string
  groomName: string
}

export const OpeningCover: React.FC<OpeningCoverProps> = ({
  isOpen,
  guestName,
  onOpen,
  weddingDateLabel,
  brideName,
  groomName,
}) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-cover"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-[#F8F4ED] text-[#41372F] overflow-hidden select-none"
        >
          {/* Decorative Corner Ornaments */}
          <FloralCorner position="top-left" className="absolute top-2 left-2" />
          <FloralCorner position="top-right" className="absolute top-2 right-2" />
          <FloralCorner position="bottom-left" className="absolute bottom-2 left-2" />
          <FloralCorner position="bottom-right" className="absolute bottom-2 right-2" />

          {/* Top spacer */}
          <div className="pt-2" />

          {/* Central Names & Date Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col items-center text-center my-auto max-w-lg px-4 py-2"
          >
            {/* The Wedding of (Moved down, snug right above the bride's name) */}
            <p className="font-sans text-xs sm:text-sm tracking-[0.35em] uppercase text-[#73765D] font-medium mb-1.5">
              The Wedding of
            </p>

            {/* Bride Name */}
            <h1 className="font-montecarlo text-6xl sm:text-7xl md:text-8xl font-normal text-[#41372F] leading-none">
              {brideName}
            </h1>

            {/* Ampersand with comfortable breathing space */}
            <div className="my-2 sm:my-3">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#B69A70] italic font-light drop-shadow-sm select-none">
                &amp;
              </span>
            </div>

            {/* Groom Name */}
            <h1 className="font-montecarlo text-6xl sm:text-7xl md:text-8xl font-normal text-[#41372F] leading-none">
              {groomName}
            </h1>

            <FloralDivider className="my-3" />

            {/* Date */}
            <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-[#73765D] font-medium uppercase">
              {weddingDateLabel}
            </p>

            {/* Guest Personalization Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-white/60 border border-[#B69A70]/30 shadow-soft-card backdrop-blur-sm w-full max-w-sm"
            >
              <p className="font-sans text-[11px] text-[#73765D] uppercase tracking-wider mb-0.5">
                Kepada Yth.
              </p>
              <p className="font-sans text-[11px] text-[#63564A] mb-1 font-normal">
                Bapak/Ibu/Saudara/i
              </p>
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#41372F] px-2 py-0.5 border-b border-[#B69A70]/25 inline-block max-w-full break-words">
                {guestName}
              </h2>
            </motion.div>
          </motion.div>

          {/* Open Invitation Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pb-4 w-full flex justify-center"
          >
            <motion.button
              onClick={onOpen}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#B69A70] text-white font-sans text-sm tracking-widest uppercase font-medium shadow-soft-gold hover:bg-[#93784F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B69A70] focus:ring-offset-2"
              aria-label="Buka Undangan Pernikahan"
            >
              <MailOpen className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span>Buka Undangan</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
