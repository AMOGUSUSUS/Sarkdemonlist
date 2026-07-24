'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Demonlist', href: '/' },
  { label: 'Leaderboard', href: '/stats' },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-primary"
          >
            POINTERCRATE
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  isActive && 'text-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <button
          type="button"
          aria-label="Open menu"
          className="text-muted-foreground transition-colors hover:text-foreground md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
