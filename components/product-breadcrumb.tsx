import Link from 'next/link'
import type { Product } from '@/lib/types'
import { ChevronRight } from 'lucide-react'

interface Props {
  product: Product
}

export function ProductBreadcrumb({ product }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-muted-foreground"
    >
      <Link href="/" className="transition-colors hover:text-foreground">
        Home
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link
        href={`/search?category=${encodeURIComponent(product.category)}`}
        className="transition-colors hover:text-foreground"
      >
        {product.category}
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link
        href={`/search?q=${encodeURIComponent(product.brand)}`}
        className="transition-colors hover:text-foreground"
      >
        {product.brand}
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="font-medium text-foreground">
        {product.productName}
      </span>
    </nav>
  )
}
