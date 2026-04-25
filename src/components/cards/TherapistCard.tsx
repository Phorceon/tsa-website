import { Phone, Globe, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TherapistCardProps {
  name: string;
  credentials: string;
  specialties: string[];
  insurance: string[];
  languages: string[];
  format: string[];
  acceptingNew: boolean;
  phone?: string;
  website?: string;
  address?: string;
  index?: number;
}

export default function TherapistCard({
  name,
  credentials,
  specialties,
  insurance,
  languages,
  format,
  acceptingNew,
  phone,
  website,
  address,
  index = 0,
}: TherapistCardProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${Math.min(index + 1, 5)} ${isRevealed ? 'revealed' : ''} bg-white rounded-lg border border-border p-5 card-hover`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-navy-light flex items-center justify-center shrink-0">
          <span className="text-navy font-bold text-lg">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-navy truncate">{name}</h3>
          <p className="text-sm text-textsecondary">{credentials}</p>
          <div className="flex items-center gap-1.5 mt-1">
            {acceptingNew ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-success" />
                <span className="text-xs font-medium text-success">Accepting new patients</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-warning" />
                <span className="text-xs font-medium text-warning">Waitlist</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <span className="text-xs font-medium text-textsecondary uppercase tracking-wider">Specialties</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {specialties.map((s) => (
              <span key={s} className="text-xs bg-navy-light text-navy px-2 py-0.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-medium text-textsecondary uppercase tracking-wider">Insurance</span>
          <p className="text-sm text-textprimary mt-0.5">{insurance.join(', ')}</p>
        </div>

        <div className="flex gap-6">
          <div>
            <span className="text-xs font-medium text-textsecondary uppercase tracking-wider">Languages</span>
            <p className="text-sm text-textprimary mt-0.5">{languages.join(', ')}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-textsecondary uppercase tracking-wider">Format</span>
            <p className="text-sm text-textprimary mt-0.5">{format.join(' & ')}</p>
          </div>
        </div>

        {address && (
          <div className="flex items-center gap-1.5 text-sm text-textsecondary">
            <MapPin className="w-3.5 h-3.5" />
            <span>{address}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            Contact
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            Website
          </a>
        )}
      </div>
    </div>
  );
}
