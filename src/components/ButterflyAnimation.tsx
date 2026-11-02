import React from 'react'
import { motion } from 'framer-motion'

interface ButterflyProps {
  enabled?: boolean
}

export const ButterflyAnimation: React.FC<ButterflyProps> = ({ enabled = true }) => {
  if (!enabled) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {/* Butterfly 1: Drifts top-left to middle-right */}
      <motion.div
        className="absolute w-8 h-8 md:w-10 md:h-10 opacity-75"
        initial={{ x: '-10vw', y: '20vh', rotate: 15 }}
        animate={{
          x: ['0vw', '45vw', '95vw', '110vw'],
          y: ['25vh', '15vh', '35vh', '20vh'],
          rotate: [15, 35, 5, 25],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ButterflySvg delay={0} />
      </motion.div>

      {/* Butterfly 2: Drifts middle-right to lower-left */}
      <motion.div
        className="absolute w-6 h-6 md:w-8 md:h-8 opacity-65"
        initial={{ x: '105vw', y: '60vh', rotate: -25 }}
        animate={{
          x: ['100vw', '60vw', '25vw', '-10vw'],
          y: ['55vh', '70vh', '50vh', '65vh'],
          rotate: [-25, -5, -35, -15],
        }}
        transition={{
          duration: 26,
          delay: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ButterflySvg delay={0.2} color="#D4C09E" />
      </motion.div>

      {/* Butterfly 3: Drifts bottom-left upwards */}
      <motion.div
        className="absolute w-7 h-7 md:w-9 md:h-9 opacity-70"
        initial={{ x: '-5vw', y: '85vh', rotate: 45 }}
        animate={{
          x: ['-5vw', '35vw', '70vw', '105vw'],
          y: ['80vh', '65vh', '40vh', '15vh'],
          rotate: [30, 50, 20, 40],
        }}
        transition={{
          duration: 30,
          delay: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ButterflySvg delay={0.4} color="#73765D" />
      </motion.div>
    </div>
  )
}

const ButterflySvg: React.FC<{ delay?: number; color?: string }> = ({
  delay = 0,
  color = '#B69A70',
}) => {
  return (
    <div className="relative w-full h-full">
      {/* Left Wing */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute left-0 top-0 w-1/2 h-full origin-right"
        animate={{ scaleX: [1, 0.25, 1] }}
        transition={{
          duration: 0.35,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
      >
        <path
          d="M12 12C9 6 3 4 1 8C-1 12 4 16 12 14C12 14 5 18 3 21C2 23 6 24 9 20C11 17 12 13 12 12Z"
          fill={color}
          fillOpacity="0.85"
        />
        <path
          d="M10 11C8 7 5 6 3 9C2 12 6 14 10 12Z"
          fill="#FFFFFF"
          fillOpacity="0.4"
        />
      </motion.svg>

      {/* Right Wing */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute right-0 top-0 w-1/2 h-full origin-left"
        animate={{ scaleX: [1, 0.25, 1] }}
        transition={{
          duration: 0.35,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
      >
        <path
          d="M12 12C15 6 21 4 23 8C25 12 20 16 12 14C12 14 19 18 21 21C22 23 18 24 15 20C13 17 12 13 12 12Z"
          fill={color}
          fillOpacity="0.85"
        />
        <path
          d="M14 11C16 7 19 6 21 9C22 12 18 14 14 12Z"
          fill="#FFFFFF"
          fillOpacity="0.4"
        />
      </motion.svg>

      {/* Butterfly Body */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-4 bg-[#41372F] rounded-full opacity-60" />
    </div>
  )
}
