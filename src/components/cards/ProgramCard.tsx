import { Clock, Calendar, Users } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import LiquidGlass from '@/components/ui/LiquidGlass';

interface ProgramCardProps {
  name: string;
  ageGroup: string;
  category: string;
  schedule: string;
  startDate: string;
  cost: string;
  spotsLeft: number;
  totalSpots: number;
  description: string;
  image: string;
  registerUrl?: string;
  index?: number;
}

const ageGroupColors: Record<string, string> = {
  "Kids": "bg-surface text-ink",
  "Teen": "bg-purple-600 text-ink",
  "Adult": "bg-canvas text-ink",
  "Senior": "bg-teal-500 text-ink",
  "All Ages": "bg-success text-ink",
};

const categoryColors: Record<string, string> = {
  "Sports": "bg-orange-500",
  "Arts": "bg-purple-600",
  "STEM": "bg-surface",
  "Fitness": "bg-success",
  "Social": "bg-pink-500",
  "Education": "bg-canvas",
};

export default function ProgramCard({
  name,
  ageGroup,
  category,
  schedule,
  startDate,
  cost,
  spotsLeft,
  totalSpots,
  description,
  image,
  registerUrl,
  index = 0,
}: ProgramCardProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const isOpen = totalSpots === 999;
  const isLow = !isOpen && spotsLeft <= 5 && spotsLeft > 0;
  const isFull = !isOpen && spotsLeft === 0;

  return (
    <div ref={ref} className={`reveal reveal-delay-${Math.min(index + 1, 5)} ${isRevealed ? 'revealed' : ''}`}>
      <LiquidGlass intensity="subtle" className="overflow-hidden card-hover group">
      <div className="relative h-36 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1  ${ageGroupColors[ageGroup] || 'bg-canvas text-ink'}`}>
          {ageGroup}
        </span>
        <span className={`absolute top-3 left-3 text-ink text-xs font-semibold px-2 py-0.5  ${categoryColors[category] || 'bg-canvas'}`}>
          {category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-ink transition-colors">
          {name}
        </h3>

        <div className="space-y-1.5 text-sm mb-3">
          <div className="flex items-center gap-2 text-textsecondary">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{schedule}</span>
          </div>
          <div className="flex items-center gap-2 text-ink font-medium">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{startDate === 'Ongoing' ? 'Ongoing enrollment' : `Begins ${new Date(startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1  ${cost === 'Free' ? 'bg-success/10 text-success' : 'bg-canvas text-ink'}`}>
            {cost}
          </span>
          {!isOpen && (
            <span className={`text-xs font-medium flex items-center gap-1 ${isFull ? 'text-error' : isLow ? 'text-warning' : 'text-success'}`}>
              <Users className="w-3.5 h-3.5" />
              {isFull ? 'Waitlist Only' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
            </span>
          )}
          {isOpen && (
            <span className="text-xs font-medium text-success">Open enrollment</span>
          )}
        </div>

        <p className="text-sm text-textsecondary mb-4 line-clamp-2">{description}</p>

        {registerUrl ? (
          <a
            href={registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center w-full px-4 py-2.5  text-sm font-semibold transition-colors ${
              isFull
                ? 'bg-lightgray text-textsecondary cursor-not-allowed'
                : 'bg-success text-ink hover:bg-green-700'
            }`}
          >
            {isFull ? 'Join Waitlist' : 'Register Now'}
          </a>
        ) : (
          <span className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold bg-lightgray text-textsecondary">
            Registration Closed
          </span>
        )}
      </div>
      </LiquidGlass>
    </div>
  );
}
