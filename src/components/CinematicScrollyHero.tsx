import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import type React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowDown } from 'lucide-react';

interface CinematicChapter {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
  content?: React.ReactNode;
  align?: 'left' | 'right';
  positionClassName?: string;
}

interface CinematicScrollyHeroProps {
  tone: 'events' | 'resources' | 'programs' | 'mental' | 'volunteer' | 'references';
  accent: string;
  secondary: string;
  background: string;
  icon: LucideIcon;
  chapters: CinematicChapter[];
  images?: {
    url: string;
    label: string;
  }[];
}

const tonePatterns: Record<CinematicScrollyHeroProps['tone'], string> = {
  events: 'radial-gradient(circle at 20% 30%, rgba(217,119,6,0.2) 0 2px, transparent 3px), radial-gradient(circle at 80% 70%, rgba(244,63,94,0.16) 0 2px, transparent 3px)',
  resources: 'linear-gradient(90deg, rgba(34,211,238,0.16) 1px, transparent 1px), linear-gradient(rgba(34,211,238,0.14) 1px, transparent 1px)',
  programs: 'radial-gradient(circle, rgba(255,255,255,0.2) 0 1px, transparent 2px)',
  mental: 'radial-gradient(circle at center, rgba(45,212,191,0.16) 0 1px, transparent 2px)',
  volunteer: 'linear-gradient(120deg, rgba(251,146,60,0.14) 0 1px, transparent 1px), linear-gradient(60deg, rgba(244,63,94,0.12) 0 1px, transparent 1px)',
  references: 'linear-gradient(90deg, rgba(251,191,36,0.13) 1px, transparent 1px), linear-gradient(rgba(129,140,248,0.1) 1px, transparent 1px)',
};

function ScrollyChapter({
  chapter,
  index,
  progress,
  accent,
}: {
  chapter: CinematicChapter;
  index: number;
  progress: MotionValue<number>;
  accent: string;
  secondary: string;
}) {
  const start = index * 0.28;
  const hold = start + 0.17;
  const end = Math.min(start + 0.36, 1);
  const opacity = useTransform(progress, [Math.max(0, start - 0.07), start, hold, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [Math.max(0, start - 0.07), start, hold, end], ['18%', '0%', '0%', '-16%']);
  const scale = useTransform(progress, [Math.max(0, start - 0.07), start, end], [0.96, 1, 1.03]);
  const titleX = useTransform(progress, [Math.max(0, start - 0.08), start, end], ['-7%', '0%', '4%']);
  const isRight = chapter.align === 'right';

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`absolute inset-x-0 top-[20%] px-5 sm:px-6 lg:px-8 ${
        isRight ? 'lg:flex lg:justify-end' : ''
      } ${chapter.positionClassName ?? ''}`}
    >
      <div className={`max-w-7xl mx-auto w-full ${isRight ? 'lg:flex lg:justify-end' : ''}`}>
        <div className="max-w-3xl">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
            style={{ borderColor: `${accent}66`, background: `${accent}24` }}
          >
            <span className="h-1.5 w-1.5" style={{ background: accent, boxShadow: `0 0 18px ${accent}` }} />
            {chapter.eyebrow}
          </span>
          <motion.h1
            style={{ x: titleX }}
            className="mt-4 font-black tracking-tighter uppercase text-5xl font-bold leading-[0.92] text-ink drop- sm:text-6xl md:text-7xl"
          >
            {chapter.title}
            <br />
            <span style={{ color: accent }}>{chapter.accent}</span>
          </motion.h1>
          {chapter.description && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink md:text-xl">
              {chapter.description}
            </p>
          )}
          {index === 0 && (
            <div className="mt-8 flex items-center gap-3 text-ink">
              <ArrowDown className="h-5 w-5 animate-bounce" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em]">Scroll to explore</span>
            </div>
          )}
          {chapter.content && (
            <div
              className={`mt-5 max-w-2xl border border-outline bg-surface p-6 sm:p-8 ${
                isRight ? 'border-r-0' : ''
              }`}
              style={{
                boxShadow: 'none',
              }}
            >
              {chapter.content}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function FloatingDot({
  dot,
  progress,
  accent,
  secondary,
}: {
  dot: number;
  progress: MotionValue<number>;
  accent: string;
  secondary: string;
}) {
  const y = useTransform(progress, [0, 1], [`${dot * 6}px`, `${-80 - dot * 14}px`]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.15, 0.75, 0.75, 0.2]);
  const color = dot % 2 ? secondary : accent;

  return (
    <motion.span
      aria-hidden
      className="absolute h-2 w-2"
      style={{
        left: `${10 + dot * 16}%`,
        top: `${18 + (dot % 3) * 22}%`,
        background: color,
        boxShadow: `0 0 22px ${color}`,
        y,
        opacity,
      }}
    />
  );
}

function PhotoLayer({
  image,
  index,
  total,
  progress,
}: {
  image: { url: string; label: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const mid = start + segment * 0.5;
  const end = start + segment;
  const opacity = useTransform(progress, [
    Math.max(0, start - segment * 0.45),
    start,
    mid,
    Math.min(1, end + segment * 0.25),
  ], total === 1 ? [1, 1, 1, 1] : [0, 1, 1, 0]);
  const scale = useTransform(progress, [Math.max(0, start - segment), Math.min(1, end + segment)], [1.08, 1.18]);
  const x = useTransform(progress, [Math.max(0, start - segment), Math.min(1, end + segment)], [`${index % 2 ? 3 : -3}%`, `${index % 2 ? -4 : 4}%`]);

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url("${image.url}")`,
        opacity,
        scale,
        x,
      }}
    />
  );
}

export default function CinematicScrollyHero({
  tone,
  accent,
  secondary,
  background,
  icon: Icon,
  chapters,
  images,
}: CinematicScrollyHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ start: 0, end: 1 });
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useLayoutEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(ref.current.offsetHeight - window.innerHeight, 1);
      setBounds({ start: top, end: top + travel });
    };

    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener('resize', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const progress = useTransform(scrollY, [bounds.start, bounds.end], [0, 1], { clamp: true });
  const railPath = useTransform(progress, [0, 1], [0.08, 1]);
  const driftX = useTransform(progress, [0, 1], ['-7%', '7%']);
  const driftY = useTransform(progress, [0, 1], ['5%', '-6%']);
  const rotate = useTransform(progress, [0, 1], ['-8deg', '12deg']);
  const sweep = useTransform(progress, [0, 1], ['-35%', '55%']);
  const iconScale = useTransform(progress, [0, 1], [0.9, 1.16]);

  if (reduceMotion) {
    return (
      <section className="relative overflow-hidden px-5 py-24 sm:px-6 lg:px-8" style={{ background }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: tonePatterns[tone], backgroundSize: '64px 64px' }} />
        <div className="absolute inset-0 bg-surface" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8">
          {chapters.map((chapter) => (
            <article key={`${chapter.eyebrow}-${chapter.title}`} className="max-w-4xl rounded-[1.5rem] border border-outline bg-surface p-6 text-ink">
              <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>{chapter.eyebrow}</span>
              <h1 className="mt-4 font-black tracking-tighter uppercase text-4xl font-bold leading-tight sm:text-5xl">
                {chapter.title} <span style={{ color: accent }}>{chapter.accent}</span>
              </h1>
              {chapter.description && <p className="mt-4 max-w-2xl text-lg text-ink">{chapter.description}</p>}
              {chapter.content && <div className="mt-5">{chapter.content}</div>}
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative h-[360vh] md:h-[430vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
      <div className="absolute inset-0" style={{ background }} />
      <div className="absolute inset-0">
        {images?.map((image, index) => (
          <PhotoLayer
            key={`${image.url}-${index}`}
            image={image}
            index={index}
            total={images.length}
            progress={progress}
          />
        ))}
          <motion.div
            aria-hidden
            className="absolute inset-[-12%] opacity-35 mix-blend-screen"
            style={{
              x: driftX,
              y: driftY,
              backgroundImage: tonePatterns[tone],
              backgroundSize: tone === 'programs' || tone === 'mental' ? '34px 34px' : '62px 62px',
            }}
          />
        </div>
        <motion.div
          aria-hidden
          className="absolute -left-32 top-10 h-[42rem] w-[42rem]"
          style={{ background: `radial-gradient(circle, ${accent}30, transparent 68%)`, x: driftX, y: driftY }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-32 bottom-[-9rem] h-[38rem] w-[38rem]"
          style={{ background: `radial-gradient(circle, ${secondary}30, transparent 70%)`, x: driftY, y: driftX }}
        />
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 hidden h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 border md:block"
          style={{ borderColor: `${accent}1f`, rotate }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[7%] top-[12%] text-ink/[0.055]"
          style={{ rotate, scale: iconScale }}
        >
          <Icon className="h-56 w-56 md:h-80 md:w-80" />
        </motion.div>

      {images && images.length > 0 && (
        <motion.div
          aria-hidden
          className="absolute bottom-8 right-5 hidden w-[31rem] gap-3 md:grid md:grid-cols-3"
          style={{ opacity: railPath }}
        >
          {images.slice(0, 3).map((image, index) => (
            <div
              key={`${image.label}-${index}`}
              className="h-28 overflow-hidden border border-outline bg-cover bg-center"
              style={{ backgroundImage: `url("${image.url}")` }}
            >
              <div className="flex h-full items-end bg-canvas/60 p-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink">{image.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      )}

        {[0, 1, 2, 3, 4, 5].map((dot) => (
          <FloatingDot key={dot} dot={dot} progress={progress} accent={accent} secondary={secondary} />
        ))}

      <motion.div
      aria-hidden
      className="absolute inset-y-0 w-1/2 skew-x-[-18deg] bg-white/[0.03]"
      style={{ x: sweep }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.15)_0%,rgba(2,6,23,0.4)_72%,rgba(2,6,23,0.75)_100%)]" />

        <div className="absolute inset-0 z-10">
          {chapters.map((chapter, index) => (
            <ScrollyChapter
              key={`${chapter.eyebrow}-${chapter.title}`}
              chapter={chapter}
              index={index}
              progress={progress}
              accent={accent}
              secondary={secondary}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
