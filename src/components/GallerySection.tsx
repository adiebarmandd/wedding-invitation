import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'
import { GalleryPhoto } from '../types/wedding'
import { FloralDivider } from './FloralOrnament'

interface GallerySectionProps {
  enabled: boolean
  photos: GalleryPhoto[]
}

export const GallerySection: React.FC<GallerySectionProps> = ({ enabled, photos }) => {
  // Jika nonaktif, return null tanpa meninggalkan whitespace
  if (!enabled) return null

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null)
      } else if (e.key === 'ArrowRight' && selectedIndex !== null) {
        setSelectedIndex((prev) => (prev! + 1) % photos.length)
      } else if (e.key === 'ArrowLeft' && selectedIndex !== null) {
        setSelectedIndex((prev) => (prev! - 1 + photos.length) % photos.length)
      }
    }

    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex, photos.length])

  return (
    <section
      id="gallery"
      className="py-20 px-6 sm:px-10 bg-[#EFE6D9]/40 text-[#41372F] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto mb-10"
        >
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-[#73765D] font-medium mb-1">
            Galeri Foto
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#41372F]">
            Our Moments
          </h2>
          <FloralDivider className="my-4" />
        </motion.div>

        {/* PHOTO GRID OR PLACEHOLDER */}
        {photos.length > 0 ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {photos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedIndex(idx)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-soft-card border border-[#B69A70]/30"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  {photo.caption && (
                    <p className="text-white text-xs font-sans tracking-wide">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty / Dev Placeholder */
          <div className="p-10 rounded-3xl bg-white/60 border border-dashed border-[#B69A70]/50 max-w-md mx-auto text-center">
            <ImageIcon className="w-10 h-10 text-[#B69A70] mx-auto mb-3 opacity-60" />
            <h4 className="font-serif text-xl font-medium text-[#41372F] mb-1">
              Galeri Masih Kosong
            </h4>
            <p className="font-sans text-xs text-[#887869] leading-relaxed">
              Tambahkan foto ke dalam array <code className="bg-[#EFE6D9] px-1 py-0.5 rounded">galleryPhotos</code> pada file <code className="bg-[#EFE6D9] px-1 py-0.5 rounded">wedding.ts</code>.
            </p>
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedIndex !== null && photos[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
              aria-label="Tutup Galeri"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIndex((prev) => (prev! - 1 + photos.length) % photos.length)
                }}
                className="absolute left-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                aria-label="Foto Sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIndex((prev) => (prev! + 1) % photos.length)
                }}
                className="absolute right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                aria-label="Foto Selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Lightbox Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
              />
              {photos[selectedIndex].caption && (
                <p className="text-white/90 text-sm font-sans tracking-wide mt-3 text-center">
                  {photos[selectedIndex].caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
