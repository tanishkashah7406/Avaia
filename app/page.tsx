import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Metrics } from "@/components/metrics"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Metrics />
      <Testimonials />
      <CTA />
      <Pricing />
      <Footer />
    </main>
  )
}
