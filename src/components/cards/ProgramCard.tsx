import { Clock, Calendar, Users } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
  "Kids": "bg-sky text-white",
  "Teen": "bg-purple-600 text-white",
  "Adult": "bg-navy text-white",
  "Senior": "bg-teal-500 text-white",
  "All Ages": "bg-success text-white",
};

const categoryColors: Record<string, string> = {
  "Sports": "bg-orange-500",
  "Arts": "bg-purple-600",
  "STEM": "bg-sky",
  "Fitness": "bg-success",
  "Social": "bg-pink-500",
  "Education": "bg-navy",
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
    <div
      ref={ref}
      className={`reveal reveal-delay-${Math.min(index + 1, 5)} ${isRevealed ? 'revealed' : ''} bg-white rounded-lg border border-border overflow-hidden card-hover group`}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${ageGroupColors[ageGroup] || 'bg-navy text-white'}`}>
          {ageGroup}
        </span>
        <span className={`absolute top-3 left-3 text-white text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[category] || 'bg-navy'}`}>
          {category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-sky transition-colors">
          {name}
        </h3>

        <div className="space-y-1.5 text-sm mb-3">
          <div className="flex items-center gap-2 text-textsecondary">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{schedule}</span>
          </div>
          <div className="flex items-center gap-2 text-sky font-medium">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{startDate === 'Ongoing' ? 'Ongoing enrollment' : `Begins ${new Date(startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cost === 'Free' ? 'bg-success/10 text-success' : 'bg-navy-light text-navy'}`}>
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
            className={`inline-flex items-center justify-center w-full px-4 py-2.5 rounded-md text-sm font-semibold transition-colors ${
              isFull
                ? 'bg-lightgray text-textsecondary cursor-not-allowed'
                : 'bg-success text-white hover:bg-green-700'
            }`}
          >
            {isFull ? 'Join Waitlist' : 'Register Now'}
          </a>
        ) : (
          <span className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-md text-sm font-semibold bg-lightgray text-textsecondary">
            Registration Closed
          </span>
        )}
      </div>
    </div>
  );
}
