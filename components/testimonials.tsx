import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Kylie Aujla",
    role: "Makeup Artist",
    image: "/t1.png",
    content:
      "AVAIA found me the exact shade match across three brands I never would have compared myself. Saved me over ₹3,300 on a single foundation.",
    rating: 5,
  },
  {
    name: "Priya K.",
    role: "Skincare Enthusiast",
    image: "/t2.png",
    content:
      "The ingredient comparison tool is incredible. I finally understand what I am putting on my skin, and I found a better product for half the price.",
    rating: 5,
  },
  {
    name: "Karan Jenner",
    role: "Fragrance Collector",
    image: "/t3.png",
    content:
      "I was spending hours browsing fragrance sites. AVAIA showed me three similar scents at completely different price points in seconds.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Testimonials
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            What our users are saying
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card"
            >
              {/* Author Profile */}
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-foreground text-foreground"
                  />
                ))}
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {`"${t.content}"`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
