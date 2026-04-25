import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showSearch?: boolean;
  label?: string;
}

export default function FilterBar({
  categories,
  activeFilters,
  onFilterChange,
  searchQuery,
  onSearchChange,
  showSearch = true,
  label = "Filter by:"
}: FilterBarProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 200);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const toggleFilter = useCallback((category: string) => {
    if (category === "All") {
      onFilterChange([]);
      return;
    }
    const newFilters = activeFilters.includes(category)
      ? activeFilters.filter(f => f !== category)
      : [...activeFilters, category];
    onFilterChange(newFilters);
  }, [activeFilters, onFilterChange]);

  const hasActiveFilters = activeFilters.length > 0 || searchQuery;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-textsecondary mr-1">{label}</span>
        {categories.map((cat) => {
          const isActive = cat === "All"
            ? activeFilters.length === 0
            : activeFilters.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => toggleFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-navy text-white'
                  : 'bg-lightgray text-textsecondary hover:bg-navy-light hover:text-navy'
              }`}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        {showSearch && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textsecondary" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search by keyword..."
              className="w-full pl-9 pr-4 py-2 bg-lightgray border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky"
            />
          </div>
        )}
        {hasActiveFilters && (
          <button
            onClick={() => {
              onFilterChange([]);
              setLocalSearch('');
              onSearchChange('');
            }}
            className="flex items-center gap-1 text-sm text-navy hover:text-sky transition-colors"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
