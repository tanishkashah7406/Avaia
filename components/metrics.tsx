const stats = [
  { value: "200+", label: "Beauty Products Indexed" },
  { value: "5", label: "Verified Retailers Integrated" },
  { value: "94%", label: "Shade Match Accuracy" },
  { value: "2K+", label: "Price Comparisons Analyzed" },
]

export function Metrics() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            By the Numbers
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            Powering smarter beauty comparisons
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-card md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center bg-card py-12 px-6 text-center">
              <span className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {s.value}
              </span>
              <span className="mt-2 text-sm text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
