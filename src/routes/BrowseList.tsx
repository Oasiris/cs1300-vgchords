import React from 'react'

import fp from 'lodash/fp'
import moment from 'moment'

import { Dictionary } from '../models/common'
import { Game, GameR, Track, TrackR } from '../models/game'

import { Layout } from '../components/Layout'
import data from '../data/games.json'

import '../styles/BrowseList.scss'

const ALL_GAMERS = data as GameR[]
// const ALL_GAMES = ALL_GAMERS.map(({ ...els }) => ({ ...els, tracks: null }))

const GAME_TO_TRACKS: Dictionary<string, TrackR[]> = {}
ALL_GAMERS.forEach(({ tracks, ...props }) => {
    const game = props
    const trackRs = tracks.map((track) => ({ ...track, game }))
    GAME_TO_TRACKS[props.name] = trackRs
})

const ALL_TRACKS: TrackR[] = fp.unnest(Object.values(GAME_TO_TRACKS)) as TrackR[]

const labels = [
    {
        name: '',
        getField: (track: TrackR) => '',
        getDisplay: (track: TrackR) => <div className="albumArtPlaceholder" />,
        sortable: false,
        isLocked: true,
        flex: '0 0 65px',
    },
    {
        name: 'Game',
        getField: (track: TrackR) => track.game.name,
        getDisplay: (track: TrackR) => track.game.name,
        sortable: true,
        isLocked: true,
        flex: '5 1 0',
    },
    {
        name: 'Track',
        getField: (track: TrackR) => track.name,
        getDisplay: (track: TrackR) => track.name,
        sortable: true,
        isLocked: true,
        flex: '7 1 0',
    },
    {
        name: 'Artist/Composer(s)',
        getField: (track: TrackR) => track.artists || track.game.artists,
        getDisplay: (track: TrackR) => (track.artists ? track.artists.join(', ') : track.game.artists.join(', ')),
        sortable: false,
        isLocked: true,
        flex: '4 1 0',
    },
    {
        name: 'Year',
        getField: (track: TrackR) => track.game.releaseYear,
        getDisplay: (track: TrackR) => track.game.releaseYear,
        sortable: true,
        isLocked: true,
        flex: '0 0 50px',
    },
    {
        name: 'Upload date',
        getField: (track: TrackR) => track.createdAt,
        getDisplay: (track: TrackR) => moment(track.createdAt).fromNow(),
        sortable: true,
        isLocked: true,
        flex: '2 1 0',
    },
    {
        name: '',
        getField: (track: TrackR) => '',
        getDisplay: (track: TrackR) => (
            <div className="_favoriteButton">
                <i className="far fa-heart" />
            </div>
        ),
        sortable: false,
        isLocked: true,
        flex: '1 1 0',
    },
]

class Table extends React.Component {
    render() {
        return (
            <div id="trackTable">
                <div className="_head">
                    <div className="_headRow unselectable">
                        {labels.map((cell, idx) => (
                            <div key={idx} className="_headRowItem" style={{ flex: cell.flex }}>
                                {cell.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="_body">
                    {ALL_TRACKS.map((track, idx) => (
                        <div className="_bodyRow" key={idx}>
                            {/* <div className="_bodyRowItem">
                                <div className="albumArtPlaceholder" />
                            </div>
                            <div className="_bodyRowItem">{track.game.name}</div>
                            <div className="_bodyRowItem">{track.name}</div>
                            <div className="_bodyRowItem">
                                {track.artists ? track.artists.join(', ') : track.game.artists.join(', ')}
                            </div>
                            <div className="_bodyRowItem">{track.game.releaseYear}</div>
                            <div className="_bodyRowItem">{moment(track.createdAt).fromNow()}</div>
                            <div className="_bodyRowItem _favoriteButton">
                                <i className="far fa-heart" />
                            </div> */}
                            {labels.map((cell, labelIdx) => (
                                <div
                                    key={labelIdx}
                                    className="_bodyRowItem"
                                    style={{ flex: cell.flex }}
                                    data-value={cell.getField(track)}
                                >
                                    {cell.getDisplay(track)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {/* {ALL_TRACKS.map((track, idx) => (
                    <li key="idx">
                        <div>{track.name}</div>
                        <div>{track.game.name}</div>
                    </li>
                ))}
                 */}
            </div>
        )
    }
}

export class BrowseList extends React.Component {
    render() {
        return (
            <Layout pageTitle="Browse Music">
                <div className="container">
                    <div style={{ height: '12.5px' }} />
                    <Table />
                </div>
            </Layout>
        )
    }
}
