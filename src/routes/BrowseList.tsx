import React, { useState, SyntheticEvent } from 'react'

import { Modal } from '@material-ui/core'

import fp from 'lodash/fp'

import { Dictionary } from '../models/common'
import { Game, GameR, Thumb, Track, TrackR } from '../models/game'
import { getMinSec } from '../utils/util'

import { HexButton } from '../components/Button'
import { Layout } from '../components/Layout'
import { ALL_TRACKS, GAME_TO_THUMB } from '../data/games'

import '../styles/BrowseList.scss'
// import moment from 'moment'

// const ALL_GAMERS = data as GameR[]

// const GAME_TO_TRACKS: Dictionary<string, TrackR[]> = {}
// ALL_GAMERS.forEach(({ tracks, ...props }) => {
//     const game = props
//     const trackRs = tracks.map((track) => ({ ...track, game }))
//     GAME_TO_TRACKS[props.name] = trackRs
// })

// /** Master data for the website. */
// const ALL_TRACKS: TrackR[] = fp.unnest(Object.values(GAME_TO_TRACKS)) as TrackR[]

// // Add thumbnail data.
// const ALL_THUMBS = thumbData as ({ name: string } & Thumb)[]
// const GAME_TO_THUMB: Dictionary<string, { thumb: string }> = {}
// ALL_THUMBS.forEach(({ name, thumb }) => {
//     GAME_TO_THUMB[name] = { thumb }
// })

/** Table item thumbnail. Enlarges image on mouseover. */
const TableThumb: React.FC<{ track: TrackR }> = ({ track }) => {
    const handleMouseMove = (e: SyntheticEvent) => {
        const x: number = (e.nativeEvent as any).clientX
        const y: number = (e.nativeEvent as any).clientY
        setMouseX(x)
        setMouseY(y)
    }

    const handleMouseLeave = (e: SyntheticEvent) => {
        setMouseOver(false)
    }
    const handleMouseEnter = (e: SyntheticEvent) => {
        setMouseOver(true)
    }

    const [mouseOver, setMouseOver] = useState(false)
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)

    return (
        <>
            <div
                className="_albumArt unselectable"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={GAME_TO_THUMB[track.game.name] ? GAME_TO_THUMB[track.game.name]!.thumb : ''}
                    alt={`Cover art for ${track.game.name}`}
                />
            </div>
            {mouseOver && (
                <div id="_cursorAlbumArt" style={{ left: `${mouseX + 20}px`, top: `${mouseY - 280}px` }}>
                    <img
                        src={GAME_TO_THUMB[track.game.name] ? GAME_TO_THUMB[track.game.name]!.thumb : ''}
                        alt={`Cover art for ${track.game.name}`}
                    />
                </div>
            )}
        </>
    )
}

/** Info about the table columns and how to parse, sort, and filter using them. */
const labels = [
    {
        label: '',
        name: 'Album art',
        getField: (track: TrackR) => '',
        getDisplay: (track: TrackR) => <TableThumb track={track} />,
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
        filterType: 'many-to-one',
        filterOptions: fp.uniq(ALL_TRACKS.map((track) => track.game.name)),
        hideable: false,
        flex: '5 1 0',
    },
    {
        label: 'Track',
        name: 'Track name',
        getField: (track: TrackR) => track.name,
        getDisplay: (track: TrackR) => track.name,
        sortable: true,
        filterType: 'none',
        hideable: false,
        flex: '7 1 0',
    },
    {
        label: 'Artist/Composer(s)',
        name: 'Artist(s)',
        getField: (track: TrackR) => track.artists || track.game.artists,
        getDisplay: (track: TrackR) => (track.artists ? track.artists.join(', ') : track.game.artists.join(', ')),
        sortable: false,
        filterType: 'many-to-many',
        filterOptions: fp.uniq(
            ALL_TRACKS.map((track) => track.artists || track.game.artists).reduce((acc, cur) => acc.concat(cur)),
        ),
        hideable: true,
        flex: '4 1 0',
    },
    {
        label: 'Year',
        name: 'Release year',
        getField: (track: TrackR) => track.game.releaseYear,
        getDisplay: (track: TrackR) => track.game.releaseYear,
        sortable: true,
        filterType: 'none',
        hideable: true,
        flex: '0 0 84px',
    },
    // {
    //     label: 'Upload date',
    //     name: 'Upload date',
    //     getField: (track: TrackR) => track.createdAt,
    //     getDisplay: (track: TrackR) => moment(track.createdAt).fromNow(),
    //     sortable: true,
    //     filterType: 'none',
    //     hideable: true,
    //     flex: '0 0 101px',
    // },
    {
        label: 'Length',
        name: 'Track length',
        getField: (track: TrackR) => track.lengthSec,
        getDisplay: (track: TrackR) => getMinSec(track.lengthSec),
        sortable: true,
        filterType: 'none',
        hideable: true,
        flex: '0 0 71px',
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
    activeItems: string[]
    isModalOpen: boolean
    handleOpenModal: any
    handleCloseModal: any
    handleChangeFilter: any
}> = ({ labelName, activeItems, isModalOpen, handleOpenModal, handleCloseModal, handleChangeFilter }) => {
    const handleOpen = () => handleOpenModal(labelName)

    const labelEntry = fp.find((val) => val.name === labelName, labels)
    const isActive = activeItems.length > 0
    const enabledFilters = activeItems
    const disabledFilters = fp.difference(labelEntry!.filterOptions!, activeItems)

    return (
        <>
            <div className={`_filterButton ${isActive ? '_filtering' : ''}`} onClick={handleOpen}>
                <i className="fas fa-filter" />
            </div>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="select filter modal"
                aria-describedby={`selects filter for ${labelName}`}
                className="modalWrapper"
            >
                <div className="modalBase">
                    <span className="_category">Active</span>
                    <div className="_tagList">
                        {enabledFilters.map((filterItem) => (
                            <div
                                className="_filterTag"
                                key={filterItem}
                                onClick={() => handleChangeFilter(labelName, filterItem, false)}
                            >
                                {filterItem}
                            </div>
                        ))}
                    </div>
                    <div style={{ height: '27.5px' }} />
                    <span className="_category">Inactive</span>
                    <div className="_tagList">
                        {disabledFilters.map((filterItem) => (
                            <div
                                className="_filterTag"
                                key={filterItem}
                                onClick={() => handleChangeFilter(labelName, filterItem, true)}
                            >
                                {filterItem}
                            </div>
                        ))}
                    </div>
                    <div />
                </div>
            </Modal>
        </>
    )
}

type TableProps = {
    tracklist: TrackR[]
    getSortStatus: any
    getActiveFilterItems: any
    getIsFavorite: any

    handleClickSort: any
    handleChangeFilter: any
    handleOpenModal: any
    handleCloseModal: any
    handleToggleFavorite: any

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
                                            activeItems={this.props.getActiveFilterItems(cell.name)}
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
                            {labels.map((cell, labelIdx) =>
                                cell.name !== 'Favorite' ? (
                                    <div
                                        key={labelIdx}
                                        className="_bodyRowItem"
                                        style={{ flex: cell.flex }}
                                        data-value={cell.getField(track)}
                                    >
                                        {cell.getDisplay(track)}
                                    </div>
                                ) : (
                                    <div
                                        key={labelIdx}
                                        className="_bodyRowItem"
                                        style={{ flex: cell.flex }}
                                        data-value={cell.getField(track)}
                                        onClick={() => this.props.handleToggleFavorite(track.id)}
                                    >
                                        <div className="_favoriteButton">
                                            {this.props.getIsFavorite(track.id) ? (
                                                <i className="fas fa-heart" />
                                            ) : (
                                                <i className="far fa-heart" />
                                            )}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

type BrowseListState = {
    sorts: string[][]
    filters: Dictionary<string, string[]>
    openModal: string | null

    /** T001: false, T002: true, and so on. */
    favoriteIds: Dictionary<string, boolean>
}

export class BrowseList extends React.Component<{}, BrowseListState> {
    state: BrowseListState = {
        /** Ordered from highest to lowest priority. */
        sorts: [],
        filters: {},
        openModal: null,
        favoriteIds: {},
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

    getActiveFilterItemsForLabel = (labelName: string): string[] => {
        return this.state.filters[labelName] || []
    }

    getIsFavorite = (trackId: string): boolean => {
        return Boolean(this.state.favoriteIds[trackId])
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

    handleChangeFilter = (labelName: string, filterItem: string, toggle: boolean) => {
        // TODO
        this.setState((prevState) => {
            // Prepare.
            if (prevState.filters[labelName] === undefined) {
                prevState.filters[labelName] = []
            }
            if (toggle === true) {
                prevState.filters[labelName]!.push(filterItem)
                prevState.filters[labelName] = fp.uniq(prevState.filters[labelName])
            } else {
                const itemIdx = prevState.filters[labelName]!.findIndex((val) => val === filterItem)
                if (itemIdx !== -1) {
                    prevState.filters[labelName]!.splice(itemIdx, 1)
                }
            }

            return {
                filters: prevState.filters,
            }
        })
    }

    handleToggleFavorite = (trackId: string) => {
        this.setState((prevState) => {
            prevState.favoriteIds[trackId] = !prevState.favoriteIds[trackId]
            return {
                favoriteIds: prevState.favoriteIds,
            }
        })
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
        let tracklist = Array(...ALL_TRACKS)
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

        for (const [labelName, filterItems] of Object.entries(this.state.filters)) {
            if (filterItems === undefined || filterItems.length === 0) {
                continue
            }

            const labelEntry = fp.find((val) => val.name === labelName, labels)
            if (labelEntry!.filterType === 'many-to-many') {
                // Many-to-many tag filtering.
                tracklist = tracklist.filter((track) => {
                    const many = (labelEntry!.getField(track) as unknown) as string[]
                    return many.some((field) => filterItems.includes(field))
                })
            } else {
                // Many-to-one tag filtering.
                tracklist = tracklist.filter((track) => filterItems.includes(labelEntry!.getField(track) as string))
            }
        }

        return (
            <Layout pageTitle="Browse Music" favoriteIds={this.state.favoriteIds}>
                <div className="container">
                    <div style={{ height: '12.5px' }} />
                    <span>To filter or sort, hover over the table heading.</span>
                    <div style={{ height: '12.5px' }} />
                    <Table
                        tracklist={tracklist}
                        getSortStatus={this.getSortStatusForLabel}
                        getActiveFilterItems={this.getActiveFilterItemsForLabel}
                        getIsFavorite={this.getIsFavorite}
                        // sorts={this.state.sorts}
                        // filters={this.state.filters}
                        handleClickSort={this.handleClickSort}
                        handleChangeFilter={this.handleChangeFilter}
                        handleToggleFavorite={this.handleToggleFavorite}
                        handleOpenModal={this.handleOpenModal}
                        handleCloseModal={this.handleCloseModal}
                        openModal={this.state.openModal}
                    />
                </div>
            </Layout>
        )
    }
}
