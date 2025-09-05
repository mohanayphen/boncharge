'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Filter, SlidersHorizontal, Tag, Users, DollarSign, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterOptions {
  categories: string[];
  tags: string[];
  personas: string[];
  priceRange: [number, number];
  sort: string;
}

interface FiltersProps {
  activeFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  productCount: number;
}

const CATEGORIES = ['Sleep', 'Recovery', 'Beauty', 'Lighting', 'EMF', 'Glasses'];
const PERSONAS = ['For Him', 'For Her', 'For Kids'];
const PRICE_RANGES = [
  { label: 'All Prices', value: [0, 1000] },
  { label: 'Under $50', value: [0, 50] },
  { label: 'Under $100', value: [0, 100] },
  { label: 'Under $200', value: [0, 200] },
  { label: '$200+', value: [200, 1000] },
];
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Bestsellers', value: 'bestsellers' },
];

export default function Filters({ activeFilters, onFilterChange, onReset, productCount }: FiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleCategory = (category: string) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...activeFilters.categories, category];
    onFilterChange({ ...activeFilters, categories: newCategories });
  };

  const togglePersona = (persona: string) => {
    const newPersonas = activeFilters.personas.includes(persona)
      ? activeFilters.personas.filter(p => p !== persona)
      : [...activeFilters.personas, persona];
    onFilterChange({ ...activeFilters, personas: newPersonas });
  };

  const setPriceRange = (range: [number, number]) => {
    onFilterChange({ ...activeFilters, priceRange: range });
  };

  const setSort = (sort: string) => {
    onFilterChange({ ...activeFilters, sort });
  };

  const hasActiveFilters = 
    activeFilters.categories.length > 0 ||
    activeFilters.personas.length > 0 ||
    activeFilters.priceRange[1] < 1000;

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      {/* Desktop Horizontal Filters */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Sort & Count */}
          <div className="flex items-center gap-3 pr-4 border-r border-gray-300">
            <Select value={activeFilters.sort} onValueChange={setSort}>
              <SelectTrigger className="w-[140px] h-9 bg-white border-gray-300 text-sm">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500 whitespace-nowrap">{productCount} products</span>
          </div>

          {/* All Filters in Compact Groups */}
          <div className="flex items-center gap-6 flex-1">
            {/* Categories Group */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Category</span>
              <div className="flex gap-1">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={cn(
                      "px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200",
                      activeFilters.categories.includes(category)
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Shop For Group */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">For</span>
              <div className="flex gap-1">
                {PERSONAS.map(persona => (
                  <button
                    key={persona}
                    onClick={() => togglePersona(persona)}
                    className={cn(
                      "px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200",
                      activeFilters.personas.includes(persona)
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    {persona.replace('For ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Price Group */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Price</span>
              <Select 
                value={`${activeFilters.priceRange[0]}-${activeFilters.priceRange[1]}`}
                onValueChange={(value) => {
                  const range = PRICE_RANGES.find(r => `${r.value[0]}-${r.value[1]}` === value);
                  if (range) setPriceRange(range.value as [number, number]);
                }}
              >
                <SelectTrigger className="w-[110px] h-9 bg-white border-gray-300 text-sm">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_RANGES.map(range => (
                    <SelectItem key={range.label} value={`${range.value[0]}-${range.value[1]}`}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear All */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          variant="outline"
          className="w-full"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters {hasActiveFilters && `(Active)`}
        </Button>
      </div>

      {/* Mobile Filter Controls */}
      <div className={cn(
        "space-y-6 mt-4",
        "lg:hidden",
        showMobileFilters ? "block" : "hidden"
      )}>
        {/* Sort */}
        <div className="flex items-center justify-between">
          <Select value={activeFilters.sort} onValueChange={setSort}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <span className="text-sm text-gray-500">
            {productCount} products
          </span>
        </div>

        {/* Category Pills */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <Button
                key={category}
                variant={activeFilters.categories.includes(category) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleCategory(category)}
                className={cn(
                  "rounded-full",
                  activeFilters.categories.includes(category)
                    ? "bg-teal-600 hover:bg-teal-700"
                    : ""
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Persona Pills */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Shop For</h3>
          <div className="flex flex-wrap gap-2">
            {PERSONAS.map(persona => (
              <Button
                key={persona}
                variant={activeFilters.personas.includes(persona) ? 'default' : 'outline'}
                size="sm"
                onClick={() => togglePersona(persona)}
                className={cn(
                  "rounded-full",
                  activeFilters.personas.includes(persona)
                    ? "bg-teal-600 hover:bg-teal-700"
                    : ""
                )}
              >
                {persona}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              {PRICE_RANGES.map(range => (
                <Button
                  key={range.label}
                  variant={
                    activeFilters.priceRange[0] === range.value[0] && 
                    activeFilters.priceRange[1] === range.value[1] 
                      ? 'default' 
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => setPriceRange(range.value as [number, number])}
                  className={cn(
                    "text-xs",
                    activeFilters.priceRange[0] === range.value[0] && 
                    activeFilters.priceRange[1] === range.value[1]
                      ? "bg-teal-600 hover:bg-teal-700"
                      : ""
                  )}
                >
                  {range.label}
                </Button>
              ))}
            </div>
            
            <div className="px-2">
              <Slider
                value={[activeFilters.priceRange[1]]}
                onValueChange={([value]) => setPriceRange([0, value])}
                min={0}
                max={1000}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>$0</span>
                <span>${activeFilters.priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters & Reset */}
        {hasActiveFilters && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {activeFilters.categories.map(category => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="pl-2 pr-1 py-1"
                >
                  {category}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    aria-label={`Remove ${category} filter`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {activeFilters.personas.map(persona => (
                <Badge
                  key={persona}
                  variant="secondary"
                  className="pl-2 pr-1 py-1"
                >
                  {persona}
                  <button
                    onClick={() => togglePersona(persona)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    aria-label={`Remove ${persona} filter`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {activeFilters.priceRange[1] < 1000 && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1">
                  Under ${activeFilters.priceRange[1]}
                  <button
                    onClick={() => setPriceRange([0, 1000])}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    aria-label="Remove price filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
            
            <Button
              onClick={onReset}
              variant="ghost"
              size="sm"
              className="text-gray-600"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}