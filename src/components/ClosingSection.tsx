import React from 'react'
import { motion } from 'framer-motion'
import { FloralCorner, FloralDivider } from './FloralOrnament'

interface ClosingSectionProps {
  brideName: string
  groomName: string
  closingMessage?: string
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  brideName,
  groomName,
  closingMessage = 'Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do’a restu kepada kami.',
}) => {
  return (
    <footer
      id="closing"
      className="relative py-24 px-6 sm:px-10 bg-[#F8F4ED] text-[#41372F] overflow-hidden text-center flex flex-col items-center justify-center min-h-[70vh]"
    >
      {/* Decorative Ornaments */}
      <FloralCorner position="bottom-left" className="absolute bottom-2 left-2" />
      <FloralCorner position="bottom-right" className="absolute bottom-2 right-2" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-xl mx-auto flex flex-col items-center relative z-10"
      >
        <p className="font-sans text-xs tracking-[0.35em] uppercase text-[#73765D] font-medium mb-1">
          Ungkapan Terima Kasih
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#41372F] mb-2">
          Terima Kasih
        </h2>

        {/* JAZAKUMULLAH KHAIRAN */}
        <p className="font-serif text-xl sm:text-2xl text-[#B69A70] italic font-medium my-2">
          Jazakumullah Khairan
        </p>

        <FloralDivider className="my-5" />

        {/* CLOSING PARAGRAPH */}
        <p className="font-sans text-xs sm:text-sm text-[#63564A] leading-relaxed max-w-md mx-auto mb-10 px-4">
          {closingMessage}
        </p>

        <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#73765D] font-medium mb-3">
          Kami Yang Berbahagia,
        </p>

        {/* PROMINENT COUPLE NAMES */}
        <h3 className="font-montecarlo text-5xl sm:text-6xl md:text-7xl font-normal text-[#41372F] my-2 leading-tight">
          {brideName} &amp; {groomName}
        </h3>

        {/* Decorative Seal / Monogram */}
        <div className="w-14 h-14 rounded-full border border-[#B69A70]/40 flex items-center justify-center mt-10 bg-white/60 shadow-soft-card">
          <span className="font-serif text-sm font-semibold tracking-widest text-[#B69A70]">
            {brideName.charAt(0)}&amp;{groomName.charAt(0)}
          </span>
        </div>

        <p className="text-[10px] text-[#887869] mt-8 tracking-widest uppercase">
          The Wedding of {brideName} &amp; {groomName}
        </p>
      </motion.div>
    </footer>
  )
}
