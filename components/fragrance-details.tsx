import type { FragranceProfile } from '@/lib/types'
import { Clock, Megaphone } from 'lucide-react'

interface Props {
  profile: FragranceProfile
}

export function FragranceDetails({ profile }: Props) {
  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 font-serif text-base font-semibold text-foreground">
        Fragrance Profile
      </h3>

      {/* Notes pyramid */}
      <div className="mb-5 space-y-3">
        <div>
          <p className="mb-1.5 text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            Top Notes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.notes.top.map((note) => (
              <span
                key={note}
                className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            Heart Notes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.notes.middle.map((note) => (
              <span
                key={note}
                className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold tracking-wide uppercase text-muted-foreground">
            Base Notes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.notes.base.map((note) => (
              <span
                key={note}
                className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Longevity & Projection */}
      <div className="flex gap-6 border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Longevity
            </p>
            <p className="text-sm font-medium text-foreground">
              {profile.longevity}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Projection
            </p>
            <p className="text-sm font-medium text-foreground">
              {profile.projection}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
