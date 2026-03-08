import { searchProducts, getAllCategories, getAllBrands } from '@/lib/catalog'
import { SearchResults } from '@/components/search-results'
import { SearchFilters } from '@/components/search-filters'
import { BrowseCategories } from '@/components/browse-categories'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Search Products - AVAIA',
  description: 'Search and compare beauty products across brands and sellers.',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; brand?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''
  const category = params.category || 'All'
  const brand = params.brand || ''

  const results = searchProducts(query, category, brand)
  const categories = getAllCategories()
  const brands = getAllBrands()

  const isDefaultState = !query && category === 'All' && !brand

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {query ? (
              <>
                {'Results for '}
                <span className="text-muted-foreground">
                  {'"'}
                  {query}
                  {'"'}
                </span>
              </>
            ) : isDefaultState ? (
              'Browse Categories'
            ) : (
              'Browse Products'
            )}
          </h1>
          {!isDefaultState && (
            <p className="mt-2 text-muted-foreground">
              {results?.length || 0} product{(results?.length || 0) !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <SearchFilters
              categories={categories}
              brands={brands}
              currentCategory={category}
              currentBrand={brand}
              currentQuery={query}
            />
          </aside>

          <section className="flex-1">
            {isDefaultState ? (
              <BrowseCategories />
            ) : (
              <SearchResults products={results} />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
