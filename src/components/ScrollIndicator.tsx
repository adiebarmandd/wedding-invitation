import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

interface ScrollIndicatorProps {
  targetId?: string
  className?: string
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetId = 'we-found-love',
  className = '',
}) => {
  const handleScroll = () => {
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.button
      onClick={handleScroll}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className={`group relative flex items-center justify-center w-11 h-11 rounded-2xl border border-[#B69A70]/60 bg-white/80 hover:bg-white text-[#41372F] shadow-soft-card backdrop-blur-md cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B69A70]/50 ${className}`}
      aria-label="Scroll ke seksi berikutnya"
    >
      {/* Decorative inner hairline border */}
      <div className="absolute inset-1 rounded-xl border border-[#B69A70]/25 pointer-events-none group-hover:border-[#B69A70]/50 transition-colors" />

      {/* Animated Downward Arrow inside the Box */}
      <motion.div
        animate={{
          y: [-2, 3, -2],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex items-center justify-center text-[#B69A70] group-hover:text-[#93784F] transition-colors"
      >
        <ArrowDown className="w-4 h-4 stroke-[2.2]" />
      </motion.div>
    </motion.button>
  )
}
