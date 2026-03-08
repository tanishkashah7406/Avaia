'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ImageFallbackProps {
    src: string | null
    fallbackSrc: string
    alt: string
    className?: string
    width?: number
    height?: number
    fill?: boolean
    sizes?: string
    brandName?: string
    category?: string
}

export function ImageFallback({
    src,
    fallbackSrc,
    alt,
    className = '',
    width,
    height,
    fill,
    sizes,
    brandName,
    category,
}: ImageFallbackProps) {
    const [error, setError] = useState<boolean | string>(false)
    const currentSrc = error || !src ? fallbackSrc : src

    // If even the fallback fails or is missing, show a beautiful text-based placeholder
    if (!currentSrc || error === 'fallback_failed') {
        return (
            <div
                className={`flex items-center justify-center rounded-lg bg-muted/40 text-center ${className}`}
                style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
            >
                <div className="flex flex-col items-center justify-center p-4">
                    <span className="font-serif text-3xl font-bold text-foreground/20">
                        {brandName ? brandName.charAt(0).toUpperCase() : '?'}
                    </span>
                    {category && (
                        <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                            {category}
                        </span>
                    )}
                </div>
            </div>
        )
    }

    return (
        <Image
            src={currentSrc}
            alt={alt}
            className={`object-cover ${className}`}
            width={width}
            height={height}
            fill={fill}
            sizes={sizes}
            onError={() => {
                if (!error) {
                    setError(true) // Try fallback Image next render
                } else {
                    setError('fallback_failed') // Both failed -> render text block
                }
            }}
        />
    )
}
