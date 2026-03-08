'use client'

import type { SellerListing } from '@/lib/types'
import { formatPrice } from '@/lib/catalog'
import { BadgeCheck, Truck, Tag, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  listings: SellerListing[]
}

export function SellerComparisonTable({ listings = [] }: Props) {
  const sorted = [...listings].sort((a, b) => {
    if (a.availability === 'In Stock' && b.availability !== 'In Stock') return -1
    if (a.availability !== 'In Stock' && b.availability === 'In Stock') return 1
    return a.price - b.price
  })

  const inStockPrices = sorted
    .filter((s) => s.availability === 'In Stock')
    .map((s) => s.price)
  const lowestPrice = (inStockPrices?.length || 0) > 0 ? Math.min(...inStockPrices) : 0

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Desktop table */}
      <div className="hidden sm:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-5 py-3.5 text-left text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                Seller
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                Price
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                Delivery
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                Status
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                Offer
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((listing, i) => {
              const isBest =
                listing.availability === 'In Stock' &&
                listing.price === lowestPrice
              return (
                <tr
                  key={i}
                  className={`transition-colors ${listing.availability !== 'In Stock'
                    ? 'opacity-50'
                    : 'hover:bg-muted/30'
                    } ${isBest ? 'bg-muted/40' : ''}`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {listing.sellerName}
                      </span>
                      {listing.verified && (
                        <BadgeCheck className="h-4 w-4 text-foreground" />
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-bold text-foreground">
                        {formatPrice(listing.price)}
                      </span>
                      {isBest && (
                        <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold uppercase text-background">
                          Best
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Truck className="h-3.5 w-3.5" />
                      {listing.deliveryEstimate}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${listing.availability === 'In Stock'
                        ? 'bg-muted text-foreground'
                        : 'bg-destructive/10 text-destructive'
                        }`}
                    >
                      {listing.availability}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {listing.offerBadge ? (
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Tag className="h-3.5 w-3.5" />
                        {listing.offerBadge}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground/50">
                        --
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      size="sm"
                      variant={isBest ? 'default' : 'outline'}
                      disabled={listing.availability !== 'In Stock'}
                      className="gap-1.5"
                    >
                      Visit
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-border sm:hidden">
        {sorted.map((listing, i) => {
          const isBest =
            listing.availability === 'In Stock' &&
            listing.price === lowestPrice
          return (
            <div
              key={i}
              className={`p-4 ${listing.availability !== 'In Stock' ? 'opacity-50' : ''
                } ${isBest ? 'bg-muted/40' : ''}`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {listing.sellerName}
                  </span>
                  {listing.verified && (
                    <BadgeCheck className="h-4 w-4 text-foreground" />
                  )}
                  {isBest && (
                    <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold uppercase text-background">
                      Best
                    </span>
                  )}
                </div>
                <span className="font-serif text-lg font-bold text-foreground">
                  {formatPrice(listing.price)}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  {listing.deliveryEstimate}
                </span>
                <span
                  className={
                    listing.availability === 'In Stock'
                      ? 'text-foreground'
                      : 'text-destructive'
                  }
                >
                  {listing.availability}
                </span>
                {listing.offerBadge && (
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {listing.offerBadge}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                variant={isBest ? 'default' : 'outline'}
                disabled={listing.availability !== 'In Stock'}
                className="mt-3 w-full gap-1.5"
              >
                Visit {listing.sellerName}
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
