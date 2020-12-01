import React, { useState } from 'react'

import { Modal } from '@material-ui/core'

import { Dictionary } from '../models/common'
import { TrackR } from '../models/game'
import { getMinSec } from '../utils/util'

import { HexButton as Button } from '../components/Button'
import { ALL_THUMBS, ALL_TRACKS } from '../data/games'

import '../styles/Favorites.scss'
// import { SearchBar } from '../components/SearchBar'

const HeaderNav: React.FC<{ children?: any }> = ({ children }) => (
    <div className="lineNavWrapper">
        <div className="boldLineRack" />
        <div className="lineRackTitle">{children}</div>
        {/* <Button className="navRightButton rackButton">
            <i className="fas fa-caret-right" />
            <div className="horizSpace" />
            SIGN IN
        </Button> */}
    </div>
)

const HeaderTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div id="headerTitle">
        <div id="headerTitleRectangle" />
        <span className="_subtitle">
            {subtitle}
            {/* Shadow */}
            <div className="_shadow">{subtitle}</div>
        </span>
        <h1 className="_title">
            <a href="/">
                {title}
                {/* Shadow */}
                <div className="_shadow">{title}</div>
            </a>
        </h1>
    </div>
)

type HeaderProps = {
    /** Indices of favorite elements. */
    favoriteIds?: Dictionary<string, boolean>
    children: any
}

export const Header: React.FC<HeaderProps> = ({ favoriteIds, children }) => {
    const favoriteIdCount = favoriteIds ? Object.values(favoriteIds).filter((val) => val === true).length : 0
    const faveIds = favoriteIds ? Object.entries(favoriteIds).filter(([_, bool]) => bool === true) : []
    const faveEntries = faveIds.map(([faveId, _]) => ALL_TRACKS.find((track) => track.id === faveId)!)
    const totalLength = faveEntries.reduce((acc, cur) => acc + cur.lengthSec, 0)

    const [faveModal, setFaveModal] = useState(false)
    const handleOpenFaves = () => setFaveModal(true)
    const handleCloseFaves = () => setFaveModal(false)

    return (
        <section id="header">
            <header>
                <div className="outerContainer">
                    <div className="row1">
                        <HeaderTitle title="VGChords" subtitle="Video Game Music Chord Compendium" />
                        <div>{/* <SearchBar /> */}</div>
                        <div id="favoritesDisplay">
                            <div className="unauthWarning">
                                NOT SIGNED IN
                                <br />
                                FAVORITES WILL BE LOST ON EXIT
                            </div>
                            <Button className="favoritesButton" style={{ float: 'right' }} onClick={handleOpenFaves}>
                                {favoriteIdCount}
                                <div className="horizSpace" />
                                <i className="fas fa-heart" />
                            </Button>
                        </div>
                    </div>

                    <Modal
                        open={faveModal}
                        onClose={handleCloseFaves}
                        aria-labelledby="list of favorites"
                        className="_favesModalWrapper"
                    >
                        <div className="_modalBase">
                            <div className="unauthWarning">
                                NOT SIGNED IN
                                <br />
                                FAVORITES WILL BE LOST ON EXIT
                            </div>
                            <div className="backButton" onClick={handleCloseFaves}>
                                <div /> {/* First line */}
                                <div /> {/* Second line */}
                                <div /> {/* Rect */}
                                <div /> {/* Triangle */}
                            </div>
                            <div className="_title">YOUR FAVORITES</div>
                            <div className="boldLineRack" />

                            <div className="_faveItems">
                                {faveIds.map(([id, bool]) => {
                                    const entry = ALL_TRACKS.find((track) => track.id === id)
                                    const thumbEntry = ALL_THUMBS.find((track) => track.name === entry!.game.name)

                                    // console.log('thumbEntry:', thumbEntry)
                                    return (
                                        <div key={id}>
                                            <div className="thumbWrapper">
                                                <img src={thumbEntry!.thumb} />
                                            </div>
                                            <div>
                                                <div className="trackName">{entry!.name}</div>
                                                <div className="time">{getMinSec(entry!.lengthSec)}</div>
                                                <div className="gameName">{entry!.game.name}</div>
                                                <div className="artists">
                                                    {entry!.artists
                                                        ? entry!.artists.join(', ')
                                                        : entry!.game.artists.join(', ')}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="_totalLength">
                                <div>TOTAL LENGTH:</div>
                                <div className="horizSpace" />
                                <div>{getMinSec(totalLength)}</div>
                            </div>
                        </div>
                    </Modal>
                    <HeaderNav>{children}</HeaderNav>
                </div>
            </header>
        </section>
    )
}
