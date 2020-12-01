import React from 'react'

import { Dictionary } from '../models/common'
import { TrackR } from '../models/game'

import { HexButton as Button } from '../components/Button'
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
                            <Button className="favoritesButton" style={{ float: 'right' }}>
                                {favoriteIdCount}
                                <div className="horizSpace" />
                                <i className="fas fa-heart" />
                            </Button>
                        </div>
                    </div>
                    <HeaderNav>{children}</HeaderNav>
                </div>
            </header>
        </section>
    )
}
