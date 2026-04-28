import React from 'react';

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  border?: boolean;
}

const intensityMap = {
  subtle: {
    bg: 'bg-white/[0.18]',
    border: 'border-white/[0.10]',
    highlight: 'from-white/[0.30]',
    shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.24)]',
  },
  medium: {
    bg: 'bg-white/[0.28]',
    border: 'border-white/[0.14]',
    highlight: 'from-white/[0.40]',
    shadow: 'shadow-[0_12px_40px_rgba(0,0,0,0.32)]',
  },
  strong: {
    bg: 'bg-white/[0.38]',
    border: 'border-white/[0.18]',
    highlight: 'from-white/[0.50]',
    shadow: 'shadow-[0_16px_48px_rgba(0,0,0,0.40)]',
  },
};

export default function LiquidGlass({
  children,
  className = '',
  intensity = 'medium',
  border = true,
}: LiquidGlassProps) {
  const i = intensityMap[intensity];

  return (
    <div
      className={[
        'relative overflow-hidden',
        i.bg,
        border ? `border ${i.border}` : '',
        i.shadow,
        'backdrop-blur-xl saturate-[1.6]',
        'rounded-2xl',
        className,
      ].join(' ')}
      style={{
        backgroundBlendMode: 'luminosity',
      }}
    >
      {/* Specular highlight — top edge */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r ${i.highlight} via-white/40 to-transparent`}
        aria-hidden
      />

      {/* Inner glow — top-left caustic */}
      <div
        className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/[0.15] blur-[40px]"
        aria-hidden
      />

      {/* Inner glow — bottom-right caustic */}
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/[0.10] blur-[32px]"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
