import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProAccessModal } from "@/components/pro-access-modal"

export function Pricing() {
    return (
        <section id="pricing" className="bg-secondary py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        AVAIA Pricing
                    </p>
                    <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
                        Start free. Upgrade when you need smarter beauty tools.
                    </h2>
                </div>

                <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
                    {/* Card 1 - Free */}
                    <div className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:-translate-y-[3px] hover:border-border hover:shadow-card-hover">
                        <div className="mb-8 border-b border-border pb-8">
                            <h3 className="font-serif text-3xl font-bold text-foreground">Free</h3>
                            <p className="mt-3 text-sm text-muted-foreground">Price: Free</p>
                        </div>

                        <ul className="mb-10 flex flex-1 flex-col gap-4 text-sm">
                            {[
                                "Product price comparison across platforms",
                                "Basic product recommendations",
                                "Verified user reviews",
                                "Access to the beauty product catalog",
                            ].map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                                    <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                                    <span className="leading-relaxed">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 2 - Pro */}
                    <div className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:-translate-y-[3px] hover:border-border hover:shadow-card-hover">
                        <div className="mb-8 border-b border-border pb-8">
                            <h3 className="font-serif text-3xl font-bold text-foreground">AVAIA Pro</h3>
                            <p className="mt-3 text-sm font-medium text-foreground">Price: Premium Subscription</p>
                        </div>

                        <ul className="mb-10 flex flex-1 flex-col gap-4 text-sm">
                            {[
                                "Advanced shade matching tools",
                                "Fragrance similarity finder",
                                "AI powered product recommendations",
                                "Deal alerts and price drop notifications",
                                "Pro Mode for Makeup Artists with bulk price comparison tools",
                            ].map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                                    <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                                    <span className="leading-relaxed">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <ProAccessModal>
                            <Button className="mt-auto w-full rounded-full">
                                Upgrade to AVAIA Pro
                            </Button>
                        </ProAccessModal>
                    </div>
                </div>
            </div>
        </section>
    )
}
