import React from 'react'

import { Modal } from '@material-ui/core'

import fp from 'lodash/fp'
import moment from 'moment'

import { Dictionary } from '../models/common'
import { Game, GameR, Track, TrackR } from '../models/game'

import { HexButton } from '../components/Button'
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
        label: '',
        name: 'Album art',
        getField: (track: TrackR) => '',
        getDisplay: (track: TrackR) => <div className="albumArtPlaceholder" />,
        sortable: false,
        filterType: 'none',
        hideable: true,
        flex: '0 0 65px',
    },
    {
        label: 'Game',
        name: 'Game',
        getField: (track: TrackR) => track.game.name,
        getDisplay: (track: TrackR) => track.game.name,
        sortable: true,
        filterType: 'many',
        hideable: false,
        flex: '5 1 0',
    },
    {
        label: 'Track',
        name: 'Track name',
        getField: (track: TrackR) => track.name,
        getDisplay: (track: TrackR) => track.name,
        sortable: true,
        filterType: 'too many',
        hideable: false,
        flex: '7 1 0',
    },
    {
        label: 'Artist/Composer(s)',
        name: 'Artist(s)',
        getField: (track: TrackR) => track.artists || track.game.artists,
        getDisplay: (track: TrackR) => (track.artists ? track.artists.join(', ') : track.game.artists.join(', ')),
        sortable: false,
        filterType: 'many',
        hideable: true,
        flex: '4 1 0',
    },
    {
        label: 'Year',
        name: 'Release year',
        getField: (track: TrackR) => track.game.releaseYear,
        getDisplay: (track: TrackR) => track.game.releaseYear,
        sortable: true,
        filterType: 'range',
        hideable: true,
        flex: '0 0 84px',
    },
    {
        label: 'Upload date',
        name: 'Upload date',
        getField: (track: TrackR) => track.createdAt,
        getDisplay: (track: TrackR) => moment(track.createdAt).fromNow(),
        sortable: true,
        filterType: 'range',
        hideable: true,
        flex: '0 0 101px',
    },
    {
        label: '',
        name: 'Favorite',
        getField: (track: TrackR) => '',
        getDisplay: (track: TrackR) => (
            <div className="_favoriteButton">
                <i className="far fa-heart" />
            </div>
        ),
        sortable: false,
        filterType: 'none',
        hideable: true,
        flex: '1 1 0',
    },
]

// function

const SortButton: React.FC<{ labelName: string; status: 'asc' | 'desc' | null; handleClickSort: any }> = ({
    labelName,
    status,
    handleClickSort,
}) => {
    const handle = () => handleClickSort(labelName)

    if (status === null) {
        return (
            <div className="_sortButton" onClick={handle}>
                <i className="fas fa-arrow-down" />
            </div>
        )
    } else if (status === 'asc') {
        return (
            <div className="_sortButton _asc" onClick={handle}>
                <i className="fas fa-arrow-down" />
            </div>
        )
    } else {
        return (
            <div className="_sortButton _desc" onClick={handle}>
                <i className="fas fa-arrow-up" />
            </div>
        )
    }
}

const FilterButton: React.FC<{
    labelName: string
    filterStatus: string[]
    isModalOpen: boolean
    handleOpenModal: any
    handleCloseModal: any
    handleChangeFilter: any
}> = ({ labelName, filterStatus, isModalOpen, handleOpenModal, handleCloseModal, handleChangeFilter }) => {
    const handleOpen = () => handleOpenModal(labelName)
    return (
        <>
            <div className="_filterButton" onClick={handleOpen}>
                <i className="fas fa-filter" />
            </div>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="select filter modal"
                aria-describedby={`selects filter for ${labelName}`}
            >
                <div>hi</div>
            </Modal>
        </>
    )
}

type TableProps = {
    tracklist: TrackR[]
    // sorts: string[][]
    // filters: Dictionary<string, string[]>
    getSortStatus: any
    getFilterStatus: any

    handleClickSort: any
    handleChangeFilter: any
    handleOpenModal: any
    handleCloseModal: any

    openModal: string | null
}

class Table extends React.Component<TableProps> {
    render() {
        return (
            <div id="trackTable">
                <div className="_head">
                    <div className="_headRow unselectable">
                        {labels.map((cell, idx) => (
                            <div
                                key={idx}
                                className={`_headRowItem ${cell.sortable ? '_sortable' : ''} ${
                                    cell.filterType !== 'none' ? '_filterable' : ''
                                }`}
                                style={{ flex: cell.flex }}
                            >
                                {cell.label}

                                {cell.sortable && (
                                    <>
                                        <div className="horizSpace" />
                                        <SortButton
                                            labelName={cell.name}
                                            status={this.props.getSortStatus(cell.name)}
                                            handleClickSort={this.props.handleClickSort}
                                        />
                                    </>
                                )}

                                {cell.filterType !== 'none' && (
                                    <>
                                        <div className="horizSpace" />
                                        {/* <div className="_filterButton">
                                            <i className="fas fa-filter" />
                                        </div> */}
                                        <FilterButton
                                            labelName={cell.name}
                                            filterStatus={this.props.getFilterStatus(cell.name)}
                                            isModalOpen={this.props.openModal === cell.name}
                                            handleOpenModal={this.props.handleOpenModal}
                                            handleCloseModal={this.props.handleCloseModal}
                                            handleChangeFilter={this.props.handleChangeFilter}
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="_body">
                    {this.props.tracklist.map((track, idx) => (
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

type BrowseListState = {
    sorts: string[][]
    filters: Dictionary<string, string[]>
    openModal: string | null
}
export class BrowseList extends React.Component<{}, BrowseListState> {
    state: BrowseListState = {
        /** Ordered from highest to lowest priority. */
        sorts: [],
        filters: {},
        openModal: null,
    }

    getSortStatusForLabel = (labelName: string): 'asc' | 'desc' | null => {
        const currentSort = fp.find((val) => val[0] === labelName, this.state.sorts)
        if (currentSort === undefined) {
            return null
        } else if (currentSort[1] === 'asc') {
            return 'asc'
        } else {
            return 'desc'
        }
    }

    getFilterStatusForLabel = (labelName: string): string[] => {
        return this.state.filters[labelName] || []
    }

    handleClickSort = (labelName: string) => {
        this.setState((prevState) => {
            // Check if currentSorts has anything for the current labelName.
            const currentSortIdx = fp.findIndex((val) => val[0] === labelName, prevState.sorts)
            if (currentSortIdx === -1) {
                return {
                    sorts: [[labelName, 'asc']].concat(prevState.sorts),
                }
            } else if (prevState.sorts[currentSortIdx][1] === 'asc') {
                // Splice out currentSort, then add descending sort.
                prevState.sorts.splice(currentSortIdx, 1)
                return { sorts: [[labelName, 'desc']].concat(prevState.sorts) }
            } else {
                // Splice out currentSort.
                prevState.sorts.splice(currentSortIdx, 1)
                return { sorts: prevState.sorts }
            }
        })
    }

    handleChangeFilter = (labelName: string, selected: string[]) => {
        // TODO
    }

    handleOpenModal = (labelName: string) => {
        console.log('Opening modal for ' + labelName)
        this.setState({ openModal: labelName })
    }
    handleCloseModal = () => {
        this.setState({ openModal: null })
    }

    render() {
        // Sort and filter tracks.
        const tracklist = Array(...ALL_TRACKS)
        console.log({ sorts: this.state.sorts, filters: this.state.filters })

        for (const [labelName, sortDirection] of this.state.sorts.reverse()) {
            // Get `labels` item with corresponding name.
            const label = fp.find((val) => val.name === labelName, labels)
            console.log(label)
            if (label !== undefined && label.sortable) {
                tracklist.sort((a, b) => {
                    const aValue = label.getField(a)
                    const bValue = label.getField(b)
                    if (aValue > bValue) {
                        return sortDirection === 'asc' ? 1 : -1
                    } else if (aValue < bValue) {
                        return sortDirection === 'asc' ? -1 : 1
                    } else {
                        return 0
                    }
                })
            }
        }

        return (
            <Layout pageTitle="Browse Music">
                <div className="container">
                    <div style={{ height: '12.5px' }} />
                    <div style={{ display: 'flex' }}>
                        <HexButton>Filter: Kingdom Hearts</HexButton>
                        <HexButton>Filter: Yoko Shimomura</HexButton>
                    </div>
                    <div style={{ height: '12.5px' }} />
                    <Table
                        tracklist={tracklist}
                        getSortStatus={this.getSortStatusForLabel}
                        getFilterStatus={this.getFilterStatusForLabel}
                        // sorts={this.state.sorts}
                        // filters={this.state.filters}
                        handleClickSort={this.handleClickSort}
                        handleChangeFilter={this.handleChangeFilter}
                        handleOpenModal={this.handleOpenModal}
                        handleCloseModal={this.handleCloseModal}
                        openModal={this.state.openModal}
                    />
                </div>
            </Layout>
        )
    }
}
