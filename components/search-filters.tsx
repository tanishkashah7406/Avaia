'use client'

import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const CATEGORIES = [
  'All',
  'Foundation',
  'Concealer',
  'Lipstick',
  'Skincare',
  'Fragrance',
  'Eye',
  'Blush & Contour',
  'Primer & Setting',
]

interface SearchFiltersProps {
  categories?: string[]
  brands: string[]
  currentCategory: string
  currentBrand: string
  currentQuery: string
}

export function SearchFilters({
  brands,
  currentCategory,
  currentBrand,
  currentQuery,
}: SearchFiltersProps) {
  const router = useRouter()

  function buildUrl(updates: Record<string, string>) {
    const params = new URLSearchParams()
    const merged: Record<string, string> = {
      q: currentQuery,
      category: currentCategory === 'All' ? '' : currentCategory,
      brand: currentBrand,
      ...updates,
    }
    for (const [key, value] of Object.entries(merged)) {
      if (value) {
        params.set(key, value)
      }
    }
    const qs = params.toString()
    return '/search' + (qs ? '?' + qs : '')
  }

  function handleCategoryChange(cat: string) {
    router.push(buildUrl({ category: cat === 'All' ? '' : cat }))
  }

  function handleBrandChange(brand: string) {
    router.push(buildUrl({ brand }))
  }

  function handleSearch(formData: FormData) {
    const q = formData.get('q') as string
    router.push(buildUrl({ q }))
  }

  return (
    <div className="space-y-6">
      {/* Search input */}
      <form action={handleSearch}>
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={currentQuery}
            placeholder="Search products..."
            className="pl-10"
          />
        </div>
      </form>

      {/* Categories */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-semibold tracking-wide uppercase text-foreground">
          Category
        </h3>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                (cat === 'All' && !currentCategory) || cat === currentCategory || (cat === 'All' && currentCategory === 'All')
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-semibold tracking-wide uppercase text-foreground">
          Brand
        </h3>
        <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
          <button
            onClick={() => handleBrandChange('')}
            className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
              !currentBrand
                ? 'bg-foreground text-background font-medium'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            All Brands
          </button>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => handleBrandChange(b)}
              className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                currentBrand === b
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      {(currentCategory !== 'All' || currentBrand || currentQuery) && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push('/search')}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )
}
