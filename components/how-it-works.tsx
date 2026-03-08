import { Search, BarChart3, ShoppingBag } from "lucide-react"

const steps = [
  {
    num: "01",
    icon: Search,
    image: "/step1.png",
    title: "Search any product",
    description:
      "Type in a brand, product name, shade, or category. Our engine understands natural queries.",
  },
  {
    num: "02",
    icon: BarChart3,
    image: "/step2.png",
    title: "Compare instantly",
    description:
      "See real-time prices, delivery times, availability, and authentication status across verified sellers.",
  },
  {
    num: "03",
    icon: ShoppingBag,
    image: "/step3.png",
    title: "Shop with confidence",
    description:
      "Choose the best deal and buy directly from the retailer. We never handle your payment.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How It Works
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            Three steps to smarter beauty shopping
          </h2>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.num} className="group relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-8 translate-x-full bg-border md:block" />
              )}

              <div className="flex h-full flex-col items-start rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:-translate-y-[3px] hover:border-border hover:shadow-card-hover">
                <img
                  src={step.image}
                  alt={step.title}
                  className="mb-[18px] h-[150px] w-full rounded-[12px] object-cover"
                />
                <span className="font-serif text-4xl font-bold text-border">
                  {step.num}
                </span>
                <div className="mt-4 flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <step.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
