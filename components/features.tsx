import { Palette, TrendingDown, Repeat2, Beaker, Sparkles, FlaskConical } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Shade Intelligence",
    description:
      "Automatic shade-matching across brands. Find your exact match in any formula — from foundation to concealer to powder.",
    tag: "AI-Powered",
  },
  {
    icon: TrendingDown,
    title: "Real-Time Price Comparison",
    description:
      "Track prices across 50+ verified retailers. Get alerts when your favorites drop, and never overpay again.",
    tag: "Live Data",
  },
  {
    icon: Repeat2,
    title: "Equivalent Product Finder",
    description:
      "Discover matching products across different brands. Same performance, different price points — all curated by data.",
    tag: "Cross-Brand",
  },
  {
    icon: Sparkles,
    title: "Fragrance & Dupe Match",
    description:
      "Our scent-note engine finds fragrances with similar profiles. Discover hidden gems and affordable alternatives.",
    tag: "Smart Match",
  },
  {
    icon: FlaskConical,
    title: "Ingredient Analysis",
    description:
      "Side-by-side skincare ingredient comparisons. Understand what you are putting on your skin before you buy.",
    tag: "Skincare",
  },
  {
    icon: Beaker,
    title: "Verified Sellers Only",
    description:
      "Every retailer in our network is vetted for authenticity. We flag grey-market sellers and counterfeit risks.",
    tag: "Trust",
  },
]

export function Features() {
  return (
    <section id="features" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Core Features
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            Intelligence behind every search
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty">
            AVAIA goes beyond price comparison. Our platform uses advanced
            matching algorithms to give you a complete picture of every beauty
            product.
          </p>
        </div>

        {/* Feature grid */}
        {/* Feature grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:-translate-y-[3px] hover:border-border hover:shadow-card-hover"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <f.icon className="size-5" />
                </div>
                <span className="rounded-full bg-accent px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                  {f.tag}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
