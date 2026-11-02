import React from 'react'
import { motion } from 'framer-motion'
import { ArchFrame, FloralDivider } from './FloralOrnament'

interface CoupleSectionProps {
  brideFullName: string
  groomFullName: string
  brideFather: string
  brideMother: string
  groomFather: string
  groomMother: string
  bridePhoto?: string
  groomPhoto?: string
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({
  brideFullName,
  groomFullName,
  brideFather,
  brideMother,
  groomFather,
  groomMother,
  bridePhoto = '',
  groomPhoto = '',
}) => {
  return (
    <section
      id="couple"
      className="relative py-20 px-6 sm:px-10 bg-[#EFE6D9]/40 text-[#41372F] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* BASMALAH & SALAM */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto mb-14"
        >
          <p className="font-arabic text-2xl sm:text-3xl text-[#41372F] mb-4" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#41372F] mb-3">
            Assalamu'alaikum Warahmatullahi Wabarakatuh
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#63564A] leading-relaxed max-w-lg mx-auto">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri acara pernikahan kami:
          </p>
        </motion.div>

        {/* BRIDE & GROOM PROFILES */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">
          {/* MEMPELAI WANITA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex-1 max-w-sm flex flex-col items-center"
          >
            {/* Foto / Placeholder Arch */}
            <ArchFrame className="w-56 sm:w-64 aspect-[3/4] flex items-center justify-center overflow-hidden mb-6 bg-gradient-to-b from-[#F8F4ED] to-[#EFE6D9]">
              {bridePhoto && bridePhoto.trim() !== '' ? (
                <img
                  src={bridePhoto}
                  alt={brideFullName}
                  loading="lazy"
                  className="w-full h-full object-cover object-top rounded-t-[110px] rounded-b-xl"
                />
              ) : (
                /* Elegant Editorial Placeholder */
                <div className="flex flex-col items-center justify-center p-6 text-center text-[#B69A70]">
                  <div className="w-20 h-20 rounded-full border border-[#B69A70]/40 flex items-center justify-center mb-3 bg-white/40">
                    <span className="font-serif text-3xl font-light italic">H</span>
                  </div>
                  <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#73765D] font-medium">
                    The Bride
                  </span>
                  <p className="text-[10px] text-[#887869] mt-1 font-light italic">
                    (Foto dapat dimasukkan di wedding.ts)
                  </p>
                </div>
              )}
            </ArchFrame>

            {/* Nama & Orang Tua */}
            <h3 className="font-montecarlo text-4xl sm:text-5xl font-normal text-[#41372F] tracking-wide mb-1">
              {brideFullName}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#73765D] leading-relaxed max-w-xs font-normal">
              Putri dari Bapak {brideFather} dan Ibu {brideMother}
            </p>
          </motion.div>

          {/* PEMISAH PASANGAN: Simbol & */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center my-2 md:my-0"
          >
            <div className="hidden md:block w-[1px] h-12 bg-gradient-to-b from-transparent to-[#B69A70]/60 mb-2" />
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#B69A70] italic font-light drop-shadow-sm">
              &amp;
            </span>
            <div className="hidden md:block w-[1px] h-12 bg-gradient-to-t from-transparent to-[#B69A70]/60 mt-2" />
          </motion.div>

          {/* MEMPELAI PRIA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex-1 max-w-sm flex flex-col items-center"
          >
            {/* Foto / Placeholder Arch */}
            <ArchFrame className="w-56 sm:w-64 aspect-[3/4] flex items-center justify-center overflow-hidden mb-6 bg-gradient-to-b from-[#F8F4ED] to-[#EFE6D9]">
              {groomPhoto && groomPhoto.trim() !== '' ? (
                <img
                  src={groomPhoto}
                  alt={groomFullName}
                  loading="lazy"
                  className="w-full h-full object-cover object-top rounded-t-[110px] rounded-b-xl"
                />
              ) : (
                /* Elegant Editorial Placeholder */
                <div className="flex flex-col items-center justify-center p-6 text-center text-[#B69A70]">
                  <div className="w-20 h-20 rounded-full border border-[#B69A70]/40 flex items-center justify-center mb-3 bg-white/40">
                    <span className="font-serif text-3xl font-light italic">R</span>
                  </div>
                  <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#73765D] font-medium">
                    The Groom
                  </span>
                  <p className="text-[10px] text-[#887869] mt-1 font-light italic">
                    (Foto dapat dimasukkan di wedding.ts)
                  </p>
                </div>
              )}
            </ArchFrame>

            {/* Nama & Orang Tua */}
            <h3 className="font-montecarlo text-4xl sm:text-5xl font-normal text-[#41372F] tracking-wide mb-1">
              {groomFullName}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#73765D] leading-relaxed max-w-xs font-normal">
              Putra dari Bapak {groomFather} dan Ibu {groomMother}
            </p>
          </motion.div>
        </div>

        <FloralDivider className="mt-14" />
      </div>
    </section>
  )
}
