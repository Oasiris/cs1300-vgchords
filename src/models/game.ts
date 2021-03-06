/** Models games, which each contain tracks. */
export type Game = {
    type: 'game'

    name: string
    subtitle?: string
    altNames?: string[]

    artists: string[]
    releaseYear: number
    franchise?: string
}

export type GameR = Game & { tracks: Track[] }

/** Models tracks, which each belong to a game. */
export type Track = {
    id: string
    name: string
    subtitle?: string
    altNames?: string[]

    artists?: []

    lengthSec: number
    createdAt: string
}

export type TrackR = Track & { game: Game }

export type Thumb = { thumb: string }
