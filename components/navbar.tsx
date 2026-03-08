"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EarlyAccessModal } from "@/components/early-access-modal"

const navLinks = [
  { label: "Browse", href: "/search" },
  { label: "About", href: "/#about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl font-bold tracking-tight text-foreground">
          AVAIA
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-foreground ${pathname === link.href
                ? "text-foreground font-medium"
                : "text-muted-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/search">
            <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </Link>
          <EarlyAccessModal>
            <Button size="sm" className="rounded-full px-5 text-sm">
              Get Early Access
            </Button>
          </EarlyAccessModal>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors hover:text-foreground ${pathname === link.href ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/search" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-1.5 text-sm text-muted-foreground">
                  <Search className="h-4 w-4" />
                  Search Products
                </Button>
              </Link>
              <EarlyAccessModal>
                <Button size="sm" className="rounded-full text-sm">
                  Get Early Access
                </Button>
              </EarlyAccessModal>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
