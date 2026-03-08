import { Shield, Zap, Eye } from "lucide-react"

const values = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We aggregate real-time data so you always know the true cost and availability.",
  },
  {
    icon: Zap,
    title: "Intelligence",
    description:
      "Our algorithms match shades, ingredients, and scent profiles across brands with precision.",
  },
  {
    icon: Shield,
    title: "Trust",
    description:
      "Every listed seller is verified. We flag authenticity risks so you never second-guess.",
  },
]

export function About() {
  return (
    <section id="about" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              About AVAIA
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
              Beauty shopping, <br className="hidden md:block" />
              decoded by data
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              AVAIA is a smart aggregator platform for makeup, skincare, and
              fragrances. We solve the problem of overpaying, checking multiple
              websites manually, and buying from unverified sellers — all in one
              intelligent search.
            </p>
          </div>

          {/* Right — value pillars */}
          <div className="flex flex-col gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <v.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
