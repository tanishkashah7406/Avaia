import Link from "next/link"
import { ArrowRight } from "lucide-react"

const browseGroups = [
    {
        title: "Makeup",
        items: [
            { name: "Foundation", href: "/search?category=Foundation" },
            { name: "Concealer", href: "/search?category=Concealer" },
            { name: "Lipstick", href: "/search?category=Lipstick" },
            { name: "Blush", href: "/search?category=Blush%20%26%20Contour" },
            { name: "Eye", href: "/search?category=Eye" },
        ],
    },
    {
        title: "Skincare",
        items: [
            { name: "Cleanser", href: "/search?q=cleanser&category=Skincare" },
            { name: "Serum", href: "/search?q=serum&category=Skincare" },
            { name: "Moisturizer", href: "/search?q=moisturizer&category=Skincare" },
        ],
    },
    {
        title: "Fragrance",
        items: [
            { name: "Luxury Fragrance", href: "/search?q=creed|tom%20ford&category=Fragrance" },
            { name: "Designer Fragrance", href: "/search?q=dior|chanel|versace&category=Fragrance" },
            { name: "Dupe Matches", href: "/search?q=lattafa|ajmal&category=Fragrance" },
        ],
    },
]

export function BrowseCategories() {
    return (
        <div className="space-y-12 pb-10">
            {browseGroups.map((group) => (
                <section key={group.title}>
                    <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
                        {group.title}
                    </h2>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {group.items.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group flex flex-col justify-between rounded-[14px] border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-[4px] hover:border-border hover:shadow-card-hover-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-serif text-lg font-semibold text-foreground">
                                        {item.name}
                                    </h3>
                                    <div className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground opacity-0 transition-opacity group-hover:opacity-100">
                                        <ArrowRight className="size-4 -rotate-45 transition-transform group-hover:rotate-0" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}
