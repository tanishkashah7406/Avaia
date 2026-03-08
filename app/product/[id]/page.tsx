import { notFound } from 'next/navigation'
import {
  getProductById,
  getProductShades,
  formatPrice,
  getLowestPrice,
  getSmartEquivalents,
  getEquivalentSectionInfo,
  catalog,
} from '@/lib/catalog'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SellerComparisonTable } from '@/components/seller-comparison-table'
import { EquivalentProducts } from '@/components/equivalent-products'
import { ShadeSelector } from '@/components/shade-selector'
import { FragranceDetails } from '@/components/fragrance-details'
import { ProductBreadcrumb } from '@/components/product-breadcrumb'
import {
  BadgeCheck,
  ArrowUpDown,
  Package,
} from 'lucide-react'
import { ImageFallback } from '@/components/ui/image-fallback'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(Number(id))
  if (!product)
    return { title: 'Product Not Found - AVAIA' }
  return {
    title: `${product.brand} ${product.productName} - AVAIA`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(Number(id))

  if (!product) {
    notFound()
  }

  const shades = getProductShades(product.brand, product.productName)
  const hasShades = (shades?.length || 0) > 1
  const lowest = getLowestPrice(product)
  const inStockCount = product?.sellerListings?.filter?.(
    (s) => s.availability === 'In Stock'
  )?.length || 0

  // Get smart equivalent products based on category-specific matching
  const equivalents = getSmartEquivalents(product)
  const sectionInfo = getEquivalentSectionInfo(product.category)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <ProductBreadcrumb product={product} />

        <div className="mt-8 grid gap-10 lg:grid-cols-5">
          {/* Left column: Product info */}
          <div className="lg:col-span-2">
            {/* Product Image */}
            <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <ImageFallback
                src={product.image}
                fallbackSrc={product.fallbackCategoryImage}
                alt={product.productName}
                brandName={product.brand}
                category={product.category}
                fill
              />
            </div>

            {hasShades && (
              <ShadeSelector
                shades={shades}
                currentId={product.id}
              />
            )}
          </div>

          {/* Right column: Details */}
          <div className="lg:col-span-3">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {product.category}
              </span>
              {product.sellerListings.some((s) => s.verified) && (
                <span className="flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                  <BadgeCheck className="h-3 w-3" />
                  Verified Sellers
                </span>
              )}
            </div>

            <p className="mt-3 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              {product.brand}
            </p>
            <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {product.productName}
            </h1>
            {product.shade && (
              <p className="mt-2 text-base text-muted-foreground">
                Shade: <span className="font-medium text-foreground">{product.shade}</span>
              </p>
            )}

            <p className="mt-4 leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Price highlight */}
            <div className="mt-6 rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Best Price
                  </p>
                  <p className="mt-1 font-serif text-3xl font-bold text-foreground">
                    {formatPrice(lowest)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    {inStockCount} seller{inStockCount !== 1 ? 's' : ''} in stock
                  </span>
                  {equivalents.length > 0 && (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <ArrowUpDown className="h-4 w-4" />
                      {equivalents.length} {equivalents.length !== 1
                        ? (product.category === 'Fragrance' ? 'matches' : 'alternatives')
                        : (product.category === 'Fragrance' ? 'match' : 'alternative')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Fragrance profile */}
            {product.fragranceProfile && (
              <FragranceDetails profile={product.fragranceProfile} />
            )}
          </div>
        </div>

        {/* Seller comparison table */}
        <section className="mt-14">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
            Price Comparison Across Sellers
          </h2>
          <SellerComparisonTable listings={product.sellerListings} />
        </section>

        {/* Equivalent products */}
        {(equivalents?.length || 0) > 0 && (
          <section className="mt-14">
            <h2 className="mb-2 font-serif text-2xl font-bold text-foreground">
              {sectionInfo.title}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              {sectionInfo.description}
            </p>
            <EquivalentProducts products={equivalents as any} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
