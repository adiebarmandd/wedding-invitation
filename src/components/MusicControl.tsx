import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'

interface MusicControlProps {
  enabled: boolean
  audioUrl?: string
  shouldPlay?: boolean
}

export const MusicControl: React.FC<MusicControlProps> = ({
  enabled,
  audioUrl = '',
  shouldPlay = false,
}) => {
  // Hanya tampil jika live music diaktifkan dan ada path file audio
  if (!enabled || !audioUrl || audioUrl.trim().length === 0) {
    return null
  }

  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (shouldPlay && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Autoplay prevented by browser policy:', err)
        })
    }
  }, [shouldPlay])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Play error:', err))
    }
  }

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      <motion.button
        onClick={toggleMusic}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white/90 border border-[#B69A70]/40 text-[#41372F] shadow-soft-gold flex items-center justify-center focus:outline-none transition-all"
        aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Music className="w-5 h-5 text-[#B69A70] animate-spin" style={{ animationDuration: '4s' }} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B69A70] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B69A70]"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-[#887869]" />
        )}
      </motion.button>
    </>
  )
}
