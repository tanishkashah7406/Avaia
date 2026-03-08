'use client'

import Link from 'next/link'
import type { Product } from '@/lib/types'
import { formatPrice, getLowestPrice } from '@/lib/catalog'

interface Props {
  shades: Product[]
  currentId: number
}

export function ShadeSelector({ shades = [], currentId }: Props) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 font-serif text-sm font-semibold tracking-wide uppercase text-foreground">
        Available Shades ({shades?.length || 0})
      </h3>
      <div className="flex flex-wrap gap-2">
        {shades.map((shade) => (
          <Link
            key={shade.id}
            href={`/product/${shade.id}`}
            className={`rounded-lg border px-3 py-2 text-xs transition-all ${shade.id === currentId
              ? 'border-foreground bg-foreground text-background font-semibold'
              : 'border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground'
              }`}
          >
            <span className="block">{shade.shade}</span>
            <span className="mt-0.5 block text-[10px] opacity-70">
              {formatPrice(getLowestPrice(shade))}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
