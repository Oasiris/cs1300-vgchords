import React from 'react'

import { HexButton as Button } from '../components/Button'

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
        <span className="_subtitle">{subtitle}</span>
        <h1 className="_title">
            <a href="/">{title}</a>
        </h1>
        <div className="_shadow unselectable">
            <span className="_subtitle">{subtitle}</span>
            <h1 className="_title">{title}</h1>
        </div>
    </div>
)

export const Header: React.FC<{ children: any }> = ({ children }) => (
    <section id="header">
        <div className="outerContainer">
            <div className="row1">
                <HeaderTitle title="VGChords" subtitle="Video Game Music Chord Compendium" />
                <div>Search</div>
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
