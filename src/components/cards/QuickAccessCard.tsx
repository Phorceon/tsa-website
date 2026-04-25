import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Heart, Calendar, HandHeart, Star, Phone } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const cardData = [
  {
    icon: Building2,
    title: 'Community Resources',
    description: 'Housing, food, legal aid, and more',
    path: '/resources',
    color: 'bg-navy',
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
    color: 'bg-sky',
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
            className={`reveal reveal-delay-${Math.min(i + 1, 5)} ${isRevealed ? 'revealed' : ''} group bg-white rounded-lg border border-border p-6 card-hover flex items-start gap-4`}
          >
            <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-navy mb-1 group-hover:text-sky transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-textsecondary mb-2">{card.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-sky font-medium">
                Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
