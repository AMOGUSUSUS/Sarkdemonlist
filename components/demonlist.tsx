'use client'

import { useMemo, useState } from 'react'
import {
  Award,
  CheckCircle2,
  ChevronDown,
  Trophy,
  User,
  Users,
  Wrench,
} from 'lucide-react'
import {
  demons as initialDemons,
  DIFFICULTY_POINTS,
  getYouTubeId,
  type Demon,
  type Victor,
} from '@/lib/demons'
import { cn } from '@/lib/utils'

export function Demonlist() {
  const [demons, setDemons] = useState<Demon[]>(initialDemons)
  const [selectedPosition, setSelectedPosition] = useState<number>(
    initialDemons[0].position,
  )

  const selected = useMemo(
    () => demons.find((d) => d.position === selectedPosition) ?? demons[0],
    [demons, selectedPosition],
  )

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[420px_1fr]">
      <DemonListPanel
        demons={demons}
        selected={selected}
        onSelect={(demon) => setSelectedPosition(demon.position)}
      />
      <DemonDetail demon={selected} />
    </div>
  )
}

function DemonListPanel({
  demons,
  selected,
  onSelect,
}: {
  demons: Demon[]
  selected: Demon
  onSelect: (demon: Demon) => void
}) {
  return (
    <aside className="h-fit overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-primary px-4 py-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-primary-foreground">
          The Demonlist
        </h2>
      </div>
      <ul className="divide-y divide-border">
        {demons.map((demon) => {
          const isActive = demon.position === selected.position
          
          let videoId = getYouTubeId(demon.video)
          if (demon.name === 'Bloodbath') videoId = 'twTw4fjT0ik'
          if (demon.name === 'Cataclysm') videoId = 'ubjzk15rqyU'

          const thumbnailUrl = videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : null
          const points = DIFFICULTY_POINTS[demon.difficulty]

          return (
            <li key={demon.position}>
              <button
                type="button"
                onClick={() => onSelect(demon)}
                className={cn(
                  'flex w-full items-center gap-3 p-3 text-left transition-colors',
                  isActive ? 'bg-accent/80' : 'hover:bg-secondary/60',
                )}
              >
                {thumbnailUrl ? (
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded border border-border shadow-sm">
                    <img
                      src={thumbnailUrl}
                      alt={demon.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded border border-border bg-muted text-xs text-muted-foreground">
                    No image
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-black text-foreground">
                    #{demon.position} – {demon.name}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground mt-0.5">
                    published by <span className="font-semibold text-foreground">{demon.publisher}</span>
                  </p>
                  <p className="mt-2 text-xs font-medium text-primary">
                    {points}.00 (100%) points
                  </p>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

function DemonDetail({ demon }: { demon: Demon }) {
  let videoId = getYouTubeId(demon.video)
  if (demon.name === 'Bloodbath') videoId = 'twTw4fjT0ik'
  if (demon.name === 'Cataclysm') videoId = 'ubjzk15rqyU'

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-border px-6 py-5">
        <Trophy className="h-6 w-6 text-primary" aria-hidden="true" />
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            #{demon.position} on the Demonlist
          </p>
          <h1 className="text-2xl font-bold leading-tight text-foreground text-balance">
            {demon.name}
          </h1>
        </div>
      </div>

      {videoId ? (
        <div className="aspect-video w-full bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`${demon.name} verification video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
          No video available
        </div>
      )}

      <dl className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={User} label="Publisher" value={demon.publisher} />
        <Stat icon={Wrench} label="Verifier" value={demon.verifier} />
        <Stat
          icon={CheckCircle2}
          label="Requirement"
          value={`${demon.requirement}%`}
        />
        <Stat
          icon={Award}
          label={`${demon.difficulty} demon`}
          value={`${DIFFICULTY_POINTS[demon.difficulty]} pts`}
        />
      </dl>

      <VictorsSection demon={demon} />
    </section>
  )
}

function VictorsSection({ demon }: { demon: Demon }) {
  const [open, setOpen] = useState(true)

  const totalRecords = demon.victors.length
  const fullRecords = demon.victors.filter((v) => v.progress === 100).length

  return (
    <div className="border-t border-border">
      <div className="border-b border-border bg-secondary px-6 py-5 text-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mx-auto flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
        >
          <Users className="h-5 w-5 text-primary" aria-hidden="true" />
          Records
          <ChevronDown
            className={cn(
              'h-5 w-5 text-muted-foreground transition-transform',
              open && 'rotate-180',
            )}
            aria-hidden="true"
          />
        </button>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{demon.requirement}%</span>{' '}
          or better required to qualify
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{totalRecords}</span>{' '}
          {totalRecords === 1 ? 'record' : 'records'} registered, out of which{' '}
          <span className="font-semibold text-foreground">{fullRecords}</span>{' '}
          {fullRecords === 1 ? 'is' : 'are'} 100%
        </p>
      </div>

      {open && (
        <div className="px-6 py-5">
          {demon.victors.length > 0 ? (
            <ol className="overflow-hidden rounded-md border border-border">
              {demon.victors.map((victor, index) => (
                <li
                  key={`${victor.username}-${index}`}
                  className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 last:border-b-0"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-medium text-muted-foreground w-5 shrink-0">
                      {index + 1}.
                    </span>
                    <span className="truncate font-medium text-foreground">
                      {victor.username}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-primary">
                    {victor.progress}%
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">
              No victors yet. Be the first to beat it!
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 bg-card px-6 py-4">
      <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <div className="min-w-0">
        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd className="truncate font-semibold text-foreground">{value}</dd>
      </div>
    </div>
  )
}