import React from 'react'

interface FloralCornerProps {
  className?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export const FloralCorner: React.FC<FloralCornerProps> = ({
  className = '',
  position = 'top-left',
}) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scale-x-[-1]'
      case 'bottom-left':
        return 'scale-y-[-1]'
      case 'bottom-right':
        return 'scale-[-1]'
      default:
        return ''
    }
  }

  return (
    <div className={`pointer-events-none select-none ${getTransform()} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-20 md:w-28 md:h-28 opacity-70"
      >
        {/* Soft Olive Leaves */}
        <path
          d="M12 12C28 24 38 48 40 70C30 58 20 42 12 12Z"
          fill="#73765D"
          fillOpacity="0.45"
        />
        <path
          d="M12 12C24 28 48 38 70 40C58 30 42 20 12 12Z"
          fill="#73765D"
          fillOpacity="0.35"
        />
        {/* Delicate Gold Stems and Tendrils */}
        <path
          d="M12 12C35 35 60 45 95 48"
          stroke="#B69A70"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M12 12C35 35 45 60 48 95"
          stroke="#B69A70"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M45 45C55 52 68 56 80 54M45 45C52 55 56 68 54 80"
          stroke="#B69A70"
          strokeWidth="0.9"
          strokeDasharray="2 2"
        />
        {/* Soft Floral Buds */}
        <circle cx="95" cy="48" r="3.5" fill="#B69A70" fillOpacity="0.8" />
        <circle cx="48" cy="95" r="3.5" fill="#B69A70" fillOpacity="0.8" />
        <circle cx="80" cy="54" r="2.5" fill="#D4C09E" />
        <circle cx="54" cy="80" r="2.5" fill="#D4C09E" />
        {/* Central petal accent */}
        <path
          d="M26 26C38 32 44 42 46 52C40 44 32 38 26 26Z"
          fill="#B69A70"
          fillOpacity="0.4"
        />
      </svg>
    </div>
  )
}

export const FloralDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center my-6 select-none ${className}`}>
      <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-[#B69A70]/60" />
      <svg
        viewBox="0 0 48 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-5 mx-2 text-[#B69A70]"
      >
        {/* Center bloom */}
        <circle cx="24" cy="12" r="2.5" fill="#B69A70" />
        {/* Petals */}
        <ellipse cx="18" cy="12" rx="4" ry="2" fill="#73765D" fillOpacity="0.6" transform="rotate(-15 18 12)" />
        <ellipse cx="30" cy="12" rx="4" ry="2" fill="#73765D" fillOpacity="0.6" transform="rotate(15 30 12)" />
        <ellipse cx="24" cy="7" rx="2" ry="3.5" fill="#B69A70" fillOpacity="0.7" />
        <ellipse cx="24" cy="17" rx="2" ry="3.5" fill="#B69A70" fillOpacity="0.7" />
      </svg>
      <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-[#B69A70]/60" />
    </div>
  )
}

export const ArchFrame: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <div className={`relative p-3 rounded-t-[120px] rounded-b-2xl border border-[#B69A70]/40 bg-white/70 shadow-soft-card backdrop-blur-sm ${className}`}>
      <div className="absolute inset-1 rounded-t-[116px] rounded-b-xl border border-[#B69A70]/20 pointer-events-none" />
      {children}
    </div>
  )
}
