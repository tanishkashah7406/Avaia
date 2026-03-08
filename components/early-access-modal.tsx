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

export function EarlyAccessModal({ children }: { children: React.ReactNode }) {
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
                            You're on the list!
                        </h3>
                        <p className="text-muted-foreground">
                            We'll notify you when AVAIA launches.
                        </p>
                    </div>
                ) : (
                    <>
                        <DialogHeader className="mb-4 text-left sm:text-left">
                            <DialogTitle className="font-serif text-2xl font-bold tracking-tight text-foreground">
                                Join the AVAIA Early Access List
                            </DialogTitle>
                            <DialogDescription className="mt-2 text-base text-muted-foreground">
                                Be among the first to try AVAIA and get early access to smarter beauty shopping.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                setSubmitted(true)
                            }}
                            className="space-y-5"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-foreground">Name (optional)</Label>
                                <Input
                                    id="name"
                                    placeholder="Your Name"
                                    autoComplete="name"
                                    className="rounded-lg bg-card"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email address (required)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="hello@example.com"
                                    autoComplete="email"
                                    className="rounded-lg bg-card"
                                />
                            </div>
                            <Button type="submit" size="lg" className="mt-2 w-full rounded-full">
                                Request Early Access
                            </Button>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
