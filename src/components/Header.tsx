import React from 'react'

import { HexButton as Button } from '../components/Button'
import { SearchBar } from '../components/SearchBar'

const HeaderNav: React.FC<{ children?: any }> = ({ children }) => (
    <div className="lineNavWrapper">
        <div className="boldLineRack" />
        <div className="lineRackTitle">{children}</div>
        <Button className="navRightButton rackButton">
            <i className="fas fa-caret-right" />
            <div className="horizSpace" />
            SIGN IN
        </Button>
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

export const Header: React.FC<{ children: any }> = ({ children }) => (
    <section id="header">
        <div className="outerContainer">
            <div className="row1">
                <HeaderTitle title="VGChords" subtitle="Video Game Music Chord Compendium" />
                <div>
                    <SearchBar />
                </div>
                <div id="favoritesDisplay">
                    <div className="unauthWarning">
                        NOT SIGNED IN
                        <br />
                        FAVORITES WILL BE LOST ON EXIT
                    </div>
                    <Button className="favoritesButton" style={{ float: 'right' }}>
                        0
                        <div className="horizSpace" />
                        <i className="fas fa-heart" />
                    </Button>
                </div>
            </div>
            <HeaderNav>{children}</HeaderNav>
        </div>
    </section>
)
