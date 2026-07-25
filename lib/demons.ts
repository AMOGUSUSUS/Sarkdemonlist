export type Victor = {
  /** Geometry Dash username */
  username: string
  /** Completion percentage (usually 100) */
  progress: number
}

export type Difficulty = 'Extreme' | 'Insane' | 'Hard'

/** Point value awarded for a full (100%) completion of a demon of each difficulty. */
export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  Extreme: 10,
  Insane: 5,
  Hard: 2,
}

export type Demon = {
  position: number
  name: string
  publisher: string
  verifier: string
  video: string
  /** Difficulty tier — determines how many points a completion is worth */
  difficulty: Difficulty
  /** Percentage required to qualify for the list */
  requirement: number
  /** Players who have beaten this demon */
  victors: Victor[]
}

/**
 * The custom Demonlist.
 * Positions are ordered sequentially (1 to 7).
 */
export const demons: Demon[] = [
  {
    position: 1,
    name: 'Athanatos',
    publisher: 'Exenity',
    verifier: 'XavierS',
    video: 'https://www.youtube.com/watch?v=2aWY6IjU15g',
    difficulty: 'Extreme',
    requirement: 100,
    victors: [
      { username: 'skillleznoob', progress: 100 },
    ],
  },
  {
    position: 2,
    name: 'Azurite',
    publisher: 'royen',
    verifier: 'royen',
    video: 'https://www.youtube.com/watch?v=y2u5k8wkRPE',
    difficulty: 'Extreme',
    requirement: 100,
    victors: [
      { username: 'skillleznoob', progress: 100 },
    ],
  },
  {
    position: 3,
    name: 'Bloodbath',
    publisher: 'Riot',
    verifier: 'Riot',
    video: 'https://www.youtube.com/watch?v=1dIByv8v-W4',
    difficulty: 'Extreme',
    requirement: 100,
    victors: [
      { username: 'skillleznoob', progress: 100 },
    ],
  },
  {
    position: 4,
    name: 'Cataclysm',
    publisher: 'GGBoy',
    verifier: 'Riot',
    video: 'https://www.youtube.com/watch?v=A8vPClH12fU',
    difficulty: 'Extreme',
    requirement: 100,
    victors: [
      { username: 'skillleznoob', progress: 100 },
      { username: 'astrogddd', progress: 100 },
    ],
  },
  {
    position: 5,
    name: 'ACU',
    publisher: 'neigefeu',
    verifier: 'neigefeu',
    video: 'https://www.youtube.com/watch?v=z6l74Mkoxm8',
    difficulty: 'Extreme',
    requirement: 100,
    victors: [
      { username: 'Sarka0', progress: 100 },
    ],
  },
  {
    position: 6,
    name: 'Poltergeist',
    publisher: 'Andromeda',
    verifier: 'Andromeda',
    video: 'https://www.youtube.com/watch?v=C49y01a8xgE',
    difficulty: 'Insane',
    requirement: 100,
    victors: [
      { username: 'SumLikeDat', progress: 100 },
    ],
  },
  {
    position: 7,
    name: 'Jawbreaker',
    publisher: 'ZenthicAlpha',
    verifier: 'ZenthicAlpha',
    video: 'https://www.youtube.com/watch?v=GyBDEqrp21o',
    difficulty: 'Hard',
    requirement: 100,
    victors: [
      { username: 'SumLikeDat', progress: 100 },
    ],
  },
  {
    position: 8,
    name: 'Nine Circles',
    publisher: 'Zobros',
    verifier: 'Zobros',
    video: 'https://www.youtube.com/watch?v=4WCgpSYz-ug',
    difficulty: 'Hard',
    requirement: 100,
    victors: [
      { username: 'astrogddd', progress: 100 },
      { username: 'Sarka0', progress: 100 },
      { username: 'skillleznoob', progress: 100 },
  }
]

export type LeaderboardEntry = {
  username: string
  points: number
  /** Number of demons fully completed */
  completions: number
}

/**
 * Builds the player leaderboard. A player earns a demon's difficulty points
 * for each 100% completion. Ties are broken alphabetically.
 */
export function computeLeaderboard(list: Demon[]): LeaderboardEntry[] {
  const totals = new Map<string, LeaderboardEntry>()

  for (const demon of list) {
    const value = DIFFICULTY_POINTS[demon.difficulty]
    for (const victor of demon.victors) {
      if (victor.progress < 100) continue
      const existing = totals.get(victor.username)
      if (existing) {
        existing.points += value
        existing.completions += 1
      } else {
        totals.set(victor.username, {
          username: victor.username,
          points: value,
          completions: 1,
        })
      }
    }
  }

  return Array.from(totals.values()).sort(
    (a, b) => b.points - a.points || a.username.localeCompare(b.username),
  )
}

/** Extracts the YouTube video id from a variety of URL formats. */
export function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([A-Za-z0-9_-]{11})/,
    /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}