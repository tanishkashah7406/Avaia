'use client'

import Link from 'next/link'
import type { Product } from '@/lib/types'
import { getLowestPrice, formatPrice } from '@/lib/catalog'
import { Store, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageFallback } from '@/components/ui/image-fallback'

interface Props {
  products: Product[]
}

export function EquivalentProducts({ products = [] }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const lowest = getLowestPrice(product)
        const inStockCount = product?.sellerListings?.filter?.(
          (s) => s.availability === 'In Stock'
        )?.length || 0

        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group block h-full"
          >
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-[3px] hover:border-border hover:shadow-card-hover">
              {/* Image / Initial */}
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

              <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                {product.brand}
              </p>
              <h3 className="mt-0.5 font-serif text-sm font-semibold text-foreground group-hover:underline">
                {product.productName}
              </h3>
              <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <div>
                  <p className="font-serif text-lg font-bold text-foreground">
                    {formatPrice(lowest)}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Store className="h-3 w-3" />
                    {inStockCount} seller{inStockCount !== 1 ? 's' : ''}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  tabIndex={-1}
                >
                  Compare
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
