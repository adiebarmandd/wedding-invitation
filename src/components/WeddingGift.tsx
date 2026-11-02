import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Copy, Check, CreditCard } from 'lucide-react'
import { BankAccount } from '../types/wedding'
import { FloralDivider } from './FloralOrnament'

interface WeddingGiftProps {
  enabled: boolean
  bankAccounts: BankAccount[]
}

export const WeddingGift: React.FC<WeddingGiftProps> = ({ enabled, bankAccounts }) => {
  if (!enabled) return null

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copyError, setCopyError] = useState<string | null>(null)

  const handleCopy = async (accountNumber: string, index: number) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(accountNumber)
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = accountNumber
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        if (!successful) throw new Error('Salin otomatis tidak didukung')
      }

      setCopiedIndex(index)
      setCopyError(null)
      setTimeout(() => {
        setCopiedIndex(null)
      }, 3000)
    } catch (err: any) {
      console.error('Clipboard copy error:', err)
      setCopyError('Gagal menyalin nomor rekening secara otomatis.')
      setTimeout(() => setCopyError(null), 3500)
    }
  }

  return (
    <section
      id="wedding-gift"
      className="relative py-20 px-6 sm:px-10 bg-[#F8F4ED] text-[#41372F] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto mb-10"
        >
          <div className="w-12 h-12 rounded-full bg-[#EFE6D9] flex items-center justify-center mx-auto mb-4 text-[#73765D]">
            <Gift className="w-5 h-5 text-[#B69A70]" />
          </div>

          <p className="font-sans text-xs tracking-[0.35em] uppercase text-[#73765D] font-medium mb-1">
            Tanda Kasih
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#41372F]">
            Hadiah Pernikahan
          </h2>
          <FloralDivider className="my-4" />

          {/* EXACT TEXT FROM PROMPT */}
          <p className="font-sans text-xs sm:text-sm text-[#63564A] leading-relaxed max-w-lg mx-auto">
            Do'a yang Bapak/Ibu/Saudara/i panjatkan kepada Allah pada waktu yang khusus untuk keberkahan rumah tangga kami tentu sangat kami harapkan. Namun jika Bapak/Ibu/Saudara/i ingin menambah hadiah lainnya kami persilakan.
          </p>
        </motion.div>

        {/* BANK ACCOUNTS CARDS */}
        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {bankAccounts.map((account, idx) => {
            const isCopied = copiedIndex === idx
            return (
              <motion.div
                key={account.bankName + idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="relative p-7 rounded-3xl bg-white/80 border border-[#B69A70]/35 shadow-soft-card flex flex-col items-center text-center overflow-hidden"
              >
                {/* Decorative Top Accent */}
                <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#B69A70]/60 to-transparent" />

                <div className="flex items-center gap-2 mb-3 text-[#73765D]">
                  <CreditCard className="w-4 h-4 text-[#B69A70]" />
                  <span className="font-sans text-xs tracking-wider uppercase font-semibold">
                    {account.bankName}
                  </span>
                </div>

                {/* Account Number */}
                <div className="my-3 py-2 px-4 rounded-xl bg-[#F8F4ED] border border-[#B69A70]/20 w-full">
                  <p className="font-mono text-lg sm:text-xl font-bold tracking-wider text-[#41372F]">
                    {account.accountNumber}
                  </p>
                </div>

                {/* Account Holder */}
                <p className="font-sans text-xs text-[#73765D] uppercase tracking-wider mb-5">
                  a.n. <span className="font-semibold text-[#41372F]">{account.accountHolder}</span>
                </p>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(account.accountNumber, idx)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase font-medium transition-all duration-300 ${
                    isCopied
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'border border-[#B69A70] text-[#41372F] hover:bg-[#B69A70] hover:text-white'
                  }`}
                  aria-label={`Salin nomor rekening ${account.bankName}`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Nomor rekening berhasil disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </motion.div>
            )
          })}
        </div>

        {copyError && (
          <p className="text-xs text-rose-600 mt-4 italic font-sans">
            {copyError}
          </p>
        )}
      </div>
    </section>
  )
}
