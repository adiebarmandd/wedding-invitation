import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Calendar, Gift, MessageSquareHeart } from 'lucide-react'

interface FloatingNavProps {
  isOpen: boolean
  hasGift: boolean
  hasRsvp: boolean
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ isOpen, hasGift, hasRsvp }) => {
  const [activeSection, setActiveSection] = useState('couple')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      // Tampilkan navigasi mengambang hanya setelah menggulir sedikit dari hero
      const scrollY = window.scrollY
      if (scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Deteksi seksi aktif
      const sections = ['couple', 'event', 'wedding-gift', 'rsvp']
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 250 && rect.bottom >= 200) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  if (!isOpen) return null

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'couple', label: 'Mempelai', icon: Users },
    { id: 'event', label: 'Acara', icon: Calendar },
    ...(hasGift ? [{ id: 'wedding-gift', label: 'Kado', icon: Gift }] : []),
    ...(hasRsvp ? [{ id: 'rsvp', label: 'Doa', icon: MessageSquareHeart }] : []),
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#B69A70]/30 shadow-soft-gold flex items-center gap-1 sm:gap-2"
          aria-label="Navigasi Undangan"
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans transition-all ${
                  isActive
                    ? 'bg-[#B69A70] text-white shadow-sm font-medium'
                    : 'text-[#63564A] hover:text-[#41372F] hover:bg-[#EFE6D9]/50'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
