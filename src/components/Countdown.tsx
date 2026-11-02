import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface CountdownProps {
  targetDate: string
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  hasPassed: boolean
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeRemaining = (): TimeRemaining => {
    const target = new Date(targetDate).getTime()
    const now = new Date().getTime()
    const difference = target - now

    if (difference <= 0 || isNaN(difference)) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        hasPassed: true,
      }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return {
      days,
      hours,
      minutes,
      seconds,
      hasPassed: false,
    }
  }

  const [time, setTime] = useState<TimeRemaining>(calculateTimeRemaining)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (time.hasPassed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="my-6 px-6 py-5 rounded-2xl bg-[#EFE6D9]/70 border border-[#B69A70]/30 shadow-soft-card max-w-md mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-2 text-[#73765D] mb-1">
          <CheckCircle2 className="w-5 h-5 text-[#B69A70]" />
          <span className="font-serif text-lg sm:text-xl font-semibold text-[#41372F]">
            Alhamdulillah
          </span>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#63564A]">
          Hari bahagia telah berlangsung.
        </p>
      </motion.div>
    )
  }

  const units = [
    { label: 'Hari', value: time.days },
    { label: 'Jam', value: time.hours },
    { label: 'Menit', value: time.minutes },
    { label: 'Detik', value: time.seconds },
  ]

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 my-6">
      {units.map((unit, idx) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="flex flex-col items-center justify-center w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-white/70 border border-[#B69A70]/35 shadow-soft-card backdrop-blur-sm"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#41372F]">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="font-sans text-[10px] sm:text-xs tracking-wider uppercase text-[#73765D] font-medium mt-1">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
