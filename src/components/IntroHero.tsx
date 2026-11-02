import React from 'react'
import { motion } from 'framer-motion'
import { FloralDivider } from './FloralOrnament'
import { ScrollIndicator } from './ScrollIndicator'

interface IntroHeroProps {
  brideName: string
  groomName: string
  weddingDateLabel: string
  heroVideo?: string
}

export const IntroHero: React.FC<IntroHeroProps> = ({
  brideName,
  groomName,
  weddingDateLabel,
  heroVideo = '',
}) => {
  const hasVideo = Boolean(heroVideo && heroVideo.trim().length > 0)

  return (
    <section
      id="intro-hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center text-center px-4 py-12 overflow-hidden bg-[#F8F4ED]"
    >
      {/* BACKGROUND LAYER */}
      {hasVideo ? (
        /* Video background if provided in config */
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src={heroVideo}
          />
          {/* Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
        </div>
      ) : (
        /* Fallback background: Elegant subtle gradient & editorial botanical backdrop */
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-[#F8F4ED] via-[#EFE6D9]/50 to-[#F8F4ED]">
          {/* Subtle radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl h-[60vh] bg-[#B69A70]/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Architectural arch silhouette */}
          <div className="absolute inset-6 sm:inset-10 border border-[#B69A70]/25 rounded-t-[180px] rounded-b-3xl pointer-events-none" />
        </div>
      )}

      {/* TOP SPACER */}
      <div className="pt-2" />

      {/* CENTER NAMES & DATE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 my-auto py-4 max-w-xl px-4 flex flex-col items-center"
      >
        {/* The Wedding Of (Moved down, snug right above bride's name) */}
        <p
          className={`font-sans text-xs sm:text-sm tracking-[0.4em] uppercase font-medium mb-1.5 ${
            hasVideo ? 'text-white/80' : 'text-[#73765D]'
          }`}
        >
          The Wedding Of
        </p>

        <h2
          className={`font-montecarlo text-6xl sm:text-8xl md:text-9xl font-normal drop-shadow-md leading-none ${
            hasVideo ? 'text-white' : 'text-[#41372F]'
          }`}
        >
          {brideName}
        </h2>

        {/* Ampersand with pleasant breathing space */}
        <div className="flex items-center justify-center my-2 sm:my-3">
          <span className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#B69A70] italic font-light drop-shadow-sm select-none">
            &amp;
          </span>
        </div>

        <h2
          className={`font-montecarlo text-6xl sm:text-8xl md:text-9xl font-normal drop-shadow-md leading-none ${
            hasVideo ? 'text-white' : 'text-[#41372F]'
          }`}
        >
          {groomName}
        </h2>

        <FloralDivider className="my-3" />

        <p
          className={`font-sans text-xs sm:text-sm tracking-[0.3em] font-semibold uppercase mt-1 ${
            hasVideo ? 'text-white/90' : 'text-[#73765D]'
          }`}
        >
          {weddingDateLabel}
        </p>
      </motion.div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="relative z-10 pb-4">
        <ScrollIndicator targetId="we-found-love" />
      </div>
    </section>
  )
}
