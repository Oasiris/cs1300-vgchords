export type Game = {
    type: 'game'

    name: string
    subtitle?: string
    altNames?: string[]

    artists: string[]
    releaseYear: number
    franchises: string[]
}

export type GameR = Game & { tracks: Track[] }

export type Track = {
    name: string
    subtitle?: string
    altNames?: string[]

    artists?: []

    lengthSec: number
    createdAt: string
}

export type TrackR = Track & { game: Game }
