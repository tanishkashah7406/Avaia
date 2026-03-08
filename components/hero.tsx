"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const suggestions = [
  "Estee Lauder Double Wear",
  "Charlotte Tilbury Flawless Filter",
  "NARS Radiant Creamy Concealer",
  "Tom Ford Lost Cherry",
  "MAC Matte Lipstick",
  "Fenty Beauty Pro Filtr",
]

export function Hero() {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const router = useRouter()

  function handleSearch() {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/search')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Subtle Image Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      {/* Ivory Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: 'rgba(250, 247, 242, 0.60)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Now tracking 12,000+ beauty products
          </span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl font-serif text-4xl font-bold tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl">
          The smartest way to
          <br />
          <span className="text-muted-foreground">shop beauty</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
          Compare prices, find shade matches, discover dupes, and shop
          smarter across makeup, skincare, and fragrances.
        </p>

        {/* Search Bar */}
        <div className="relative mx-auto mt-10 max-w-2xl">
          <div
            className={`flex items-center rounded-2xl border bg-card px-5 py-3 shadow-search transition-all ${focused
              ? "border-border ring-4 ring-foreground/5"
              : "border-border"
              }`}
          >
            <Search className="mr-3 size-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              onKeyDown={handleKeyDown}
              placeholder="Search any beauty product..."
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none md:text-lg"
            />
            <Button size="sm" className="ml-3 rounded-xl px-5" onClick={handleSearch}>
              Search
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>

          {/* Suggestions */}
          {focused && (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-xl border border-border bg-card p-2 shadow-xl">
              {suggestions.map((item) => (
                <button
                  key={item}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  onMouseDown={() => {
                    setQuery(item)
                    router.push(`/search?q=${encodeURIComponent(item)}`)
                  }}
                >
                  <Search className="size-4 shrink-0 opacity-50" />
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground">Popular:</span>
          {["Foundation", "Concealer", "Fragrance", "Skincare"].map((tag) => (
            <button
              key={tag}
              onClick={() => router.push(`/search?category=${encodeURIComponent(tag)}`)}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
