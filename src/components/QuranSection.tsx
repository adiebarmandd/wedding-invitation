import React from 'react'
import { motion } from 'framer-motion'
import { FloralDivider } from './FloralOrnament'

export const QuranSection: React.FC = () => {
  return (
    <section
      id="we-found-love"
      className="relative py-20 px-6 sm:px-12 bg-[#F8F4ED] text-[#41372F] flex flex-col items-center text-center overflow-hidden"
    >
      {/* Decorative background circle */}
      <div className="absolute w-72 h-72 rounded-full bg-[#EFE6D9]/60 blur-2xl pointer-events-none -top-10 -right-10" />
      <div className="absolute w-72 h-72 rounded-full bg-[#B69A70]/10 blur-2xl pointer-events-none -bottom-10 -left-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Title */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#41372F]">
          We Found Love
        </h2>

        <FloralDivider className="my-5" />

        {/* Arabic Calligraphy / Text */}
        <div className="my-4 px-2" dir="rtl">
          <p className="font-arabic text-xl sm:text-2xl md:text-3xl text-[#41372F] leading-loose sm:leading-loose">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </p>
        </div>

        {/* Translation Quote Box */}
        <div className="relative mt-4 p-6 sm:p-8 rounded-2xl bg-white/50 border border-[#B69A70]/25 shadow-soft-card">
          <span className="font-serif text-4xl sm:text-5xl text-[#B69A70]/40 absolute -top-4 left-6 select-none">
            “
          </span>
          <p className="font-sans text-sm sm:text-base text-[#63564A] leading-relaxed text-justify sm:text-center italic font-light pt-2">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
          </p>
          <p className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#B69A70] mt-5">
            QS. Ar-Rum Ayat 21
          </p>
        </div>
      </motion.div>
    </section>
  )
}
