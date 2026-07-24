import { Demonlist } from '@/components/demonlist'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="border-b border-border bg-primary">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            The POINTERCRATE Demonlist
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-pretty text-sm text-primary-foreground/80">
            A custom ranking of the hardest demons of the gc, By SARK.
          </p>
        </div>
      </section>
      <Demonlist />
    </main>
  )
}
