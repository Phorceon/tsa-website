import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import LiquidGlass from '@/components/ui/LiquidGlass';

interface EventCardProps {
  name: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attending: number;
  capacity: number;
  image: string;
  rsvpUrl?: string;
  index?: number;
}

const categoryColors: Record<string, string> = {
  "Arts": "bg-purple-600",
  "Sports": "bg-orange-500",
  "Education": "bg-surface",
  "Health": "bg-success",
  "Family": "bg-canvas",
  "Senior": "bg-teal-500",
  "Youth": "bg-pink-500",
  "Food": "bg-amber-500",
  "Environment": "bg-green-600",
  "Culture": "bg-indigo-500",
};

export default function EventCard({
  name,
  category,
  date,
  time,
  location,
  description,
  attending,
  capacity,
  image,
  rsvpUrl,
  index = 0,
}: EventCardProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const isFull = capacity !== 999 && attending >= capacity;
  const percent = capacity === 999 ? 0 : Math.min((attending / capacity) * 100, 100);

  const formatDate = (d: string) => {
    const dateObj = new Date(d + 'T00:00:00');
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div ref={ref} className={`reveal reveal-delay-${Math.min(index + 1, 5)} ${isRevealed ? 'revealed' : ''}`}>
      <LiquidGlass
        intensity="subtle"
        className="overflow-hidden card-hover group"
      >
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3 left-3 text-ink text-xs font-semibold px-2.5 py-1  ${categoryColors[category] || 'bg-canvas'}`}>
          {category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-ink text-sm mb-2">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">{formatDate(date)} • {time}</span>
        </div>

        <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-ink transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-2 text-textsecondary text-sm mb-3">
          <MapPin className="w-4 h-4 shrink-0" />
          <span>{location}</span>
        </div>

        <p className="text-sm text-textsecondary mb-4 line-clamp-2">{description}</p>

        {capacity !== 999 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1 text-textsecondary">
                <Users className="w-3.5 h-3.5" />
                {attending} / {capacity} attending
              </span>
              <span className={percent > 80 ? 'text-warning font-medium' : 'text-success font-medium'}>
                {percent > 80 ? 'Almost Full' : 'Spaces Available'}
              </span>
            </div>
            <div className="w-full bg-lightgray h-2">
              <div
                className={`h-2  transition-all ${percent > 80 ? 'bg-warning' : 'bg-success'}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        {rsvpUrl ? (
          <a
            href={rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2  text-sm font-semibold transition-colors ${
              isFull
                ? 'bg-lightgray text-textsecondary cursor-not-allowed'
                : 'bg-success text-ink hover:bg-green-700'
            }`}
          >
            {isFull ? 'Event Full' : 'RSVP Now'}
            {!isFull && <ExternalLink className="w-3.5 h-3.5" />}
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-lightgray text-textsecondary">
            Open Attendance
          </span>
        )}
      </div>
    </LiquidGlass>
    </div>
  );
}
