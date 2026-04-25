import { useScrollReveal } from '@/hooks/useScrollReveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  light?: boolean;
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', light = false }: SectionHeaderProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${isRevealed ? 'revealed' : ''} ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <span className={`inline-block text-xs font-medium uppercase tracking-widest mb-3 ${light ? 'text-sky' : 'text-sky'}`}>
        {eyebrow}
      </span>
      <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-textsecondary'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
