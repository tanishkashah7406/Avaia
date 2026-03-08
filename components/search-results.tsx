'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/types'
import { getLowestPrice, getHighestPrice, formatPrice } from '@/lib/catalog'
import {
  ArrowUpDown,
  Store,
  ChevronDown,
  BadgeCheck,
  LayoutGrid,
  List,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageFallback } from '@/components/ui/image-fallback'

type SortKey = 'relevance' | 'price-low' | 'price-high' | 'brand'

export function SearchResults({ products = [] }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>('relevance')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const sorted = [...products].sort((a, b) => {
    switch (sort) {
      case 'price-low':
        return getLowestPrice(a) - getLowestPrice(b)
      case 'price-high':
        return getLowestPrice(b) - getLowestPrice(a)
      case 'brand':
        return a.brand.localeCompare(b.brand)
      default:
        return 0
    }
  })

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Store className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground">
          No products found
        </h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Try adjusting your search or filters to find what you are looking for.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Sort bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={`rounded-md p-1.5 transition-colors ${view === 'grid'
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:bg-muted'
              }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`rounded-md p-1.5 transition-colors ${view === 'list'
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:bg-muted'
              }`}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="appearance-none rounded-md border border-border bg-card py-1.5 pr-8 pl-3 text-sm text-foreground transition-colors focus:ring-2 focus:ring-ring focus:outline-none"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="brand">Brand A-Z</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Results */}
      {view === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const lowest = getLowestPrice(product)
  const highest = getHighestPrice(product)
  const inStockSellers = product.sellerListings.filter(
    (s) => s.availability === 'In Stock'
  )
  const hasBadge = product.sellerListings.some((s) => s.offerBadge)
  const bestBadge = product.sellerListings.find((s) => s.offerBadge)?.offerBadge

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-[3px] hover:border-border hover:shadow-card-hover">
        {/* Category & Badge */}
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {product.category}
          </span>
          {hasBadge && bestBadge && (
            <span className="rounded-full bg-foreground px-2.5 py-0.5 text-xs font-medium text-background">
              {bestBadge}
            </span>
          )}
        </div>

        {/* Image / Fallback Container */}
        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg bg-muted/20">
          <ImageFallback
            src={product.image}
            fallbackSrc={product.fallbackCategoryImage}
            alt={product.productName}
            brandName={product.brand}
            category={product.category}
            fill
          />
        </div>

        {/* Product Info */}
        <div className="mb-3">
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            {product.brand}
          </p>
          <h3 className="mt-0.5 font-serif text-sm font-semibold leading-snug text-foreground group-hover:underline">
            {product.productName}
          </h3>
          {product.shade && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {product.shade}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="mb-3 flex items-baseline gap-2">
          <span className="font-serif text-lg font-bold text-foreground">
            {formatPrice(lowest)}
          </span>
          {highest > lowest && (
            <span className="text-xs text-muted-foreground">
              {'- '}
              {formatPrice(highest)}
            </span>
          )}
        </div>

        {/* Sellers & Equivalents (Pushed to bottom) */}
        <div className="mt-auto pt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Store className="h-3 w-3" />
            {inStockSellers?.length || 0} seller{(inStockSellers?.length || 0) !== 1 ? 's' : ''}
          </span>
          {(product.equivalentProducts?.length || 0) > 0 && (
            <span className="flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" />
              {product.equivalentProducts.length} equivalent
              {product.equivalentProducts.length !== 1 ? 's' : ''}
            </span>
          )}
          {product.sellerListings.some((s) => s.verified) && (
            <span className="flex items-center gap-1">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </span>
          )}
        </div>
      </article>
    </Link>
  )
}

function ProductRow({ product }: { product: Product }) {
  const lowest = getLowestPrice(product)
  const highest = getHighestPrice(product)
  const inStockSellers = product.sellerListings.filter(
    (s) => s.availability === 'In Stock'
  )

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <article className="flex items-center gap-5 rounded-xl border border-border bg-card px-5 py-4 shadow-card transition-all duration-300 hover:-translate-y-[3px] hover:border-border hover:shadow-card-hover">
        {/* Image / Initial */}
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted/20">
          <ImageFallback
            src={product.image}
            fallbackSrc={product.fallbackCategoryImage}
            alt={product.productName}
            brandName={product.brand}
            fill
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            {product.brand}
          </p>
          <h3 className="font-serif text-sm font-semibold text-foreground group-hover:underline">
            {product.productName}
          </h3>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {product.description}
          </p>
        </div>

        {/* Category */}
        <span className="hidden rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground sm:inline-block">
          {product.category}
        </span>

        {/* Sellers */}
        <span className="hidden text-xs text-muted-foreground md:flex md:items-center md:gap-1">
          <Store className="h-3 w-3" />
          {inStockSellers?.length || 0}
        </span>

        {/* Price */}
        <div className="shrink-0 text-right">
          <span className="font-serif text-base font-bold text-foreground">
            {formatPrice(lowest)}
          </span>
          {highest > lowest && (
            <p className="text-xs text-muted-foreground">
              {'to '}
              {formatPrice(highest)}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}
