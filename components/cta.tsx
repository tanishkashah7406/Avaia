import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EarlyAccessModal } from "@/components/early-access-modal"

export function CTA() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-center md:px-16 md:py-24">
          {/* Decorative dots */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold tracking-tight text-background text-balance md:text-5xl">
              Stop overpaying for beauty products
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-background/60 text-pretty">
              Join thousands of smart beauty shoppers who use AVAIA to compare,
              discover, and save every day.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <EarlyAccessModal>
                <Button
                  size="lg"
                  className="rounded-full bg-background px-8 text-foreground hover:bg-background/90"
                >
                  Get Early Access
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </EarlyAccessModal>
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full text-background/70 hover:text-background hover:bg-background/10"
              >
                Learn More
              </Button>
            </div>

            <p className="mt-6 text-xs text-background/40">
              Free to use. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
