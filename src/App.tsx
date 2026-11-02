import React, { useState, useEffect } from 'react'
import { weddingConfig } from './config/wedding'
import { OpeningCover } from './components/OpeningCover'
import { IntroHero } from './components/IntroHero'
import { QuranSection } from './components/QuranSection'
import { CoupleSection } from './components/CoupleSection'
import { EventSection } from './components/EventSection'
import { GallerySection } from './components/GallerySection'
import { WeddingGift } from './components/WeddingGift'
import { RSVPSection } from './components/RSVPSection'
import { ClosingSection } from './components/ClosingSection'
import { ButterflyAnimation } from './components/ButterflyAnimation'
import { MusicControl } from './components/MusicControl'
import { FloatingNav } from './components/FloatingNav'

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [guestName, setGuestName] = useState(weddingConfig.defaultGuestName)
  const [startMusic, setStartMusic] = useState(false)

  // Sinkronkan judul tab browser dengan nama mempelai dari konfigurasi
  useEffect(() => {
    document.title = `The Wedding of ${weddingConfig.brideName} & ${weddingConfig.groomName}`
  }, [])

  // Ekstraksi parameter tamu undangan dari URL secara aman
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const toParam = urlParams.get('to')

      if (toParam && toParam.trim().length > 0) {
        // Ganti karakter separator yang umum dan bersihkan spasi
        const cleanName = toParam.replace(/_/g, ' ').trim()
        setGuestName(cleanName)
      }

      // Dukungan hash #open jika tamu langsung membuka undangan yang sudah terbuka
      if (window.location.hash === '#open') {
        setIsOpen(true)
      }
    } catch (err) {
      console.warn('Gagal membaca parameter URL:', err)
    }
  }, [])

  // Handler Buka Undangan
  const handleOpenInvitation = () => {
    setIsOpen(true)
    setStartMusic(true)

    // Perbarui URL hash secara halus tanpa reload halaman
    try {
      window.history.replaceState(null, '', '#open')
    } catch {
      // Abaikan jika tidak diizinkan oleh sandbox
    }

    // Scroll halus ke intro hero
    setTimeout(() => {
      const introEl = document.getElementById('intro-hero')
      if (introEl) {
        introEl.scrollIntoView({ behavior: 'smooth' })
      }
    }, 150)
  }

  return (
    <div className="relative min-h-screen bg-[#F8F4ED] text-[#41372F] font-sans selection:bg-[#B69A70]/20 selection:text-[#41372F]">
      {/* 1. OPENING COVER (SECTION 1) */}
      <OpeningCover
        isOpen={isOpen}
        guestName={guestName}
        onOpen={handleOpenInvitation}
        weddingDateLabel={weddingConfig.eventDateLabel}
        brideName={weddingConfig.brideName}
        groomName={weddingConfig.groomName}
      />

      {/* BACKGROUND BUTTERFLIES (SECTION 2 / OPTIONAL) */}
      <ButterflyAnimation enabled={weddingConfig.optionalButterflies} />

      {/* FLOATING MUSIC PLAYER (OPTIONAL) */}
      <MusicControl
        enabled={weddingConfig.optionalLiveMusic}
        audioUrl={weddingConfig.musicUrl}
        shouldPlay={startMusic}
      />

      {/* FLOATING QUICK NAVIGATION */}
      <FloatingNav
        isOpen={isOpen}
        hasGift={weddingConfig.enableWeddingGift}
        hasRsvp={weddingConfig.enableRsvp}
      />

      {/* MAIN SINGLE-PAGE SCROLLING CONTENT */}
      <main className="w-full">
        {/* 2. INTRO / CINEMATIC HERO (SECTION 2) */}
        <IntroHero
          brideName={weddingConfig.brideName}
          groomName={weddingConfig.groomName}
          weddingDateLabel={weddingConfig.eventDateLabel}
          heroVideo={weddingConfig.heroVideo}
        />

        {/* 3. WE FOUND LOVE / QURANIC VERSE (SECTION 3) */}
        <QuranSection />

        {/* 4. COUPLE / PROFIL MEMPELAI (SECTION 4) */}
        <CoupleSection
          brideFullName={weddingConfig.brideFullName}
          groomFullName={weddingConfig.groomFullName}
          brideFather={weddingConfig.brideFather}
          brideMother={weddingConfig.brideMother}
          groomFather={weddingConfig.groomFather}
          groomMother={weddingConfig.groomMother}
          bridePhoto={weddingConfig.bridePhoto}
          groomPhoto={weddingConfig.groomPhoto}
        />

        {/* 5. EVENT / COUNTDOWN & DETAIL ACARA (SECTION 5) */}
        <EventSection
          weddingDate={weddingConfig.weddingDate}
          eventDay={weddingConfig.eventDay}
          eventDateLabel={weddingConfig.eventDateLabel}
          akadTime={weddingConfig.akadTime}
          receptionTime={weddingConfig.receptionTime}
          venueName={weddingConfig.venueName}
          venueAddress={weddingConfig.venueAddress}
          googleMapsUrl={weddingConfig.googleMapsUrl}
          brideName={weddingConfig.brideName}
          groomName={weddingConfig.groomName}
        />

        {/* 6. OPTIONAL GALLERY (SECTION 6) */}
        <GallerySection
          enabled={weddingConfig.optionalGallery}
          photos={weddingConfig.galleryPhotos}
        />

        {/* 7. WEDDING GIFT (SECTION 7) */}
        <WeddingGift
          enabled={weddingConfig.enableWeddingGift}
          bankAccounts={weddingConfig.bankAccounts}
        />

        {/* 8. RSVP / UCAPAN DAN DOA (SECTION 8) */}
        <RSVPSection
          enabled={weddingConfig.enableRsvp}
          enableGuestbook={weddingConfig.enableGuestbook}
          defaultGuestName={guestName}
        />

        {/* 9. CLOSING / PENUTUP (SECTION 9) */}
        <ClosingSection
          brideName={weddingConfig.brideName}
          groomName={weddingConfig.groomName}
          closingMessage={weddingConfig.closingMessage}
        />
      </main>
    </div>
  )
}

export default App
