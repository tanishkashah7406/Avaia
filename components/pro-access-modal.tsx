"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProAccessModal({ children }: { children: React.ReactNode }) {
    const [submitted, setSubmitted] = useState(false)

    return (
        <Dialog onOpenChange={(open) => !open && setTimeout(() => setSubmitted(false), 200)}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-md bg-white border-border sm:rounded-2xl">
                {submitted ? (
                    <div className="py-12 text-center">
                        <h3 className="mb-2 font-serif text-2xl font-bold tracking-tight text-foreground">
                            Thanks for your interest in AVAIA Pro.
                        </h3>
                        <p className="text-muted-foreground">
                            We’ll reach out with early access details.
                        </p>
                    </div>
                ) : (
                    <>
                        <DialogHeader className="mb-2 text-left sm:text-left">
                            <DialogTitle className="font-serif text-2xl font-bold tracking-tight text-foreground">
                                Upgrade to AVAIA Pro
                            </DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-muted-foreground">
                                Unlock advanced shade matching, fragrance similarity tools, AI-powered product recommendations, deal alerts, and Pro Mode for makeup artists.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                setSubmitted(true)
                            }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="pro-name" className="text-sm font-medium text-foreground">Name</Label>
                                <Input
                                    id="pro-name"
                                    required
                                    placeholder="Your Name"
                                    className="rounded-lg bg-card"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pro-email" className="text-sm font-medium text-foreground">Email</Label>
                                <Input
                                    id="pro-email"
                                    type="email"
                                    required
                                    placeholder="hello@example.com"
                                    className="rounded-lg bg-card"
                                />
                            </div>
                            <div className="space-y-2 bg-card">
                                <Label htmlFor="profession" className="text-sm font-medium text-foreground">Profession / Use case</Label>
                                <div className="relative mt-1">
                                    <select
                                        id="profession"
                                        required
                                        defaultValue=""
                                        className="flex h-10 w-full appearance-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="" disabled hidden>Select an option</option>
                                        <option value="beauty-shopper">Beauty Shopper</option>
                                        <option value="makeup-artist">Makeup Artist</option>
                                        <option value="freelancer">Freelancer</option>
                                        <option value="salon-owner">Salon / Studio Owner</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" size="lg" className="mt-2 w-full rounded-full">
                                Request Pro Access
                            </Button>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
