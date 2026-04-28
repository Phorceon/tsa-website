import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Heart, Calendar, HandHeart, Star, Phone } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import LiquidGlass from '@/components/ui/LiquidGlass';

const cardData = [
  {
    icon: Building2,
    title: 'Community Resources',
    description: 'Housing, food, legal aid, and more',
    path: '/resources',
    color: 'bg-canvas',
  },
  {
    icon: Heart,
    title: 'Mental Health',
    description: 'Find therapists, crisis support, and self-care tools',
    path: '/mental-health',
    color: 'bg-success',
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Discover local events and RSVP',
    path: '/events',
    color: 'bg-surface',
  },
  {
    icon: HandHeart,
    title: 'Volunteer',
    description: 'Give back through volunteering and donations',
    path: '/volunteer',
    color: 'bg-warning',
  },
  {
    icon: Star,
    title: 'Programs',
    description: 'Register for classes, sports, and activities',
    path: '/programs',
    color: 'bg-purple-600',
  },
  {
    icon: Phone,
    title: 'Get Help',
    description: 'Emergency contacts and immediate assistance',
    path: '/mental-health',
    color: 'bg-error',
  },
];

export default function QuickAccessGrid() {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal ${isRevealed ? 'revealed' : ''} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
      {cardData.map((card, i) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.title}
            to={card.path}
            className={`reveal reveal-delay-${Math.min(i + 1, 5)} ${isRevealed ? 'revealed' : ''}`}
          >
            <LiquidGlass intensity="subtle" className="group p-6 card-hover flex items-start gap-4 h-full">
            <div className={`w-12 h-12  ${card.color} flex items-center justify-center shrink-0 group-hover:scale-100 transition-transform`}>
              <Icon className="w-5 h-5 text-ink" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-ink mb-1 group-hover:text-ink transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-textsecondary mb-2">{card.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-ink font-medium">
                Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            </LiquidGlass>
          </Link>
        );
      })}
    </div>
  );
}
