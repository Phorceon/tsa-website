import { Phone, MapPin, ExternalLink, Clock } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import LiquidGlass from '@/components/ui/LiquidGlass';

interface ResourceCardProps {
  name: string;
  categories: string[];
  description: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  hours?: string;
  index?: number;
}

const categoryColors: Record<string, string> = {
  "Housing": "bg-canvas text-ink",
  "Food & Basic Needs": "bg-success text-ink",
  "Education": "bg-surface text-ink",
  "Employment": "bg-warning text-ink",
  "Legal Aid": "bg-error text-ink",
  "Health": "bg-canvas text-ink",
  "Seniors": "bg-surface text-ink",
  "Youth": "bg-success/20 text-success",
  "Environment": "bg-green-600 text-ink",
  "Community": "bg-purple-600 text-ink",
  "Fitness": "bg-orange-500 text-ink",
  "Clothing": "bg-pink-500 text-ink",
  "Family": "bg-indigo-500 text-ink",
  "Sports": "bg-teal-500 text-ink",
};

export default function ResourceCard({
  name,
  categories,
  description,
  phone,
  website,
  address,
  hours,
  index = 0,
}: ResourceCardProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal reveal-delay-${Math.min(index + 1, 5)} ${isRevealed ? 'revealed' : ''}`}>
      <LiquidGlass intensity="subtle" className="p-5 card-hover group">
      <div className="flex flex-wrap gap-2 mb-3">
        {categories.map((cat) => (
          <span
            key={cat}
            className={`text-xs font-medium px-2 py-0.5  ${categoryColors[cat] || 'bg-gray-200 text-gray-700'}`}
          >
            {cat}
          </span>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-ink transition-colors">
        {name}
      </h3>

      <p className="text-sm text-textsecondary mb-4 line-clamp-3">{description}</p>

      <div className="space-y-1.5 text-sm">
        {phone && (
          <div className="flex items-center gap-2 text-textsecondary">
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <a href={`tel:${phone}`} className="hover:text-ink transition-colors">{phone}</a>
          </div>
        )}
        {address && (
          <div className="flex items-center gap-2 text-textsecondary">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{address}</span>
          </div>
        )}
        {hours && (
          <div className="flex items-center gap-2 text-textsecondary">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{hours}</span>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-ink" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:underline"
            >
              Visit Website
            </a>
          </div>
        )}
      </div>
      </LiquidGlass>
    </div>
  );
}
