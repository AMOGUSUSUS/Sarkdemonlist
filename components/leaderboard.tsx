import { Award, Crown, Medal } from 'lucide-react'
import { computeLeaderboard, type Demon } from '@/lib/demons'
import { cn } from '@/lib/utils'

export function Leaderboard({ demons }: { demons: Demon[] }) {
  const entries = computeLeaderboard(demons)

  const rankStyles = [
    { icon: Crown, className: 'text-amber-500' },
    { icon: Medal, className: 'text-slate-400' },
    { icon: Medal, className: 'text-amber-700' },
  ]

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-primary px-5 py-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary-foreground">
          <Award className="h-5 w-5" aria-hidden="true" />
          Stats Viewer — Player Leaderboard
        </h2>
        <span className="hidden text-xs font-medium text-primary-foreground/80 sm:inline">
          Extreme = 10 · Insane = 5 · Hard = 2
        </span>
      </div>

      {entries.length > 0 ? (
        <ol className="divide-y divide-border">
          {entries.map((entry, index) => {
            const rank = rankStyles[index]
            return (
              <li key={entry.username} className="flex items-center gap-4 px-5 py-3">
                <span className="flex w-8 shrink-0 items-center justify-center">
                  {rank ? (
                    <rank.icon
                      className={cn('h-5 w-5', rank.className)}
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-muted-foreground">
                      {index + 1}
                    </span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-foreground">
                    {entry.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {entry.completions}{' '}
                    {entry.completions === 1 ? 'completion' : 'completions'}
                  </p>
                </div>
                <span className="shrink-0 text-right">
                  <span className="text-lg font-bold text-primary">{entry.points}</span>
                  <span className="ml-1 text-xs text-muted-foreground">pts</span>
                </span>
              </li>
            )
          })}
        </ol>
      ) : (
        <p className="px-5 py-6 text-sm text-muted-foreground">
          No records yet. Submit a completion to appear on the leaderboard.
        </p>
      )}
    </section>
  )
}
