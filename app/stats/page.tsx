import { Leaderboard } from '@/components/leaderboard'
import { SiteHeader } from '@/components/site-header'
import { demons } from '@/lib/demons'

export default function StatsPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="border-b border-border bg-primary">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Leaderboard
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-pretty text-sm text-primary-foreground/80">
            Player rankings by points earned. Extreme demons are worth 10 points,
            Insane 5, and Hard 2.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Leaderboard demons={demons} />
      </div>
    </main>
  )
}
