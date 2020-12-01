import fp from 'lodash/fp'

import { Dictionary } from '../models/common'
import { Game, GameR, Thumb, Track, TrackR } from '../models/game'

import data from '../data/games.json'
import thumbData from '../data/thumbs.json'

const ALL_GAMERS = data as GameR[]

const GAME_TO_TRACKS: Dictionary<string, TrackR[]> = {}
ALL_GAMERS.forEach(({ tracks, ...props }) => {
    const game = props
    const trackRs = tracks.map((track) => ({ ...track, game }))
    GAME_TO_TRACKS[props.name] = trackRs
})

/** Master data for the website. */
export const ALL_TRACKS: TrackR[] = fp.unnest(Object.values(GAME_TO_TRACKS)) as TrackR[]

// Add thumbnail data.
export const ALL_THUMBS = thumbData as ({ name: string } & Thumb)[]
export const GAME_TO_THUMB: Dictionary<string, { thumb: string }> = {}
ALL_THUMBS.forEach(({ name, thumb }) => {
    GAME_TO_THUMB[name] = { thumb }
})
