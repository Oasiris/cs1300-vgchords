import React from 'react'

import { HexButton as Button } from '../components/Button'

import logo from '../icons/logo.svg'

import '../styles/Home.scss'

const HeaderNav: React.FC<{ children?: any }> = ({ children }) => (
    <div className="lineNavWrapper">
        <div className="boldLineRack" />
        <div className="lineRackTitle">{children}</div>
        <Button className="navRightButton">
            <i className="fas fa-caret-right" />
            <div className="horizSpace" />
            SIGN IN
        </Button>
    </div>
)

const FooterNav: React.FC = () => (
    <div className="lineNavWrapper">
        <div className="boldLineRack" />
    </div>
)

const Header: React.FC = () => (
    <section id="header">
        <div className="outerContainer">
            <div className="row1">
                <div id="headerTitle">
                    <div id="headerTitleRectangle" />
                    <span>Video Game Music Chord Compendium</span>
                    <h1>VGChords</h1>
                </div>
                <div>Search</div>
                <div id="favoritesDisplay">
                    <div className="unauthWarning">
                        NOT SIGNED IN
                        <br />
                        FAVORITES WILL BE LOST UPON EXIT
                    </div>
                    <Button className="favoritesButton" style={{ float: 'right' }}>
                        0
                        <div className="horizSpace" />
                        <i className="fas fa-heart" />
                    </Button>
                </div>
            </div>
            <HeaderNav>
                <i className="fas fa-disc-drive" />
                <div className="horizSpace" />
                BROWSE MUSIC
            </HeaderNav>
        </div>
    </section>
)

const Footer: React.FC = () => (
    <section id="footer">
        <div className="outerContainer">
            <FooterNav />
            <div className="footerNavBar">
                <a>About</a>
                <a>Help</a>
                <a>Legal</a>
            </div>
        </div>
    </section>
)

export const Home: React.FC = () => {
    return (
        <div id="global">
            <Header />
            <Footer />
        </div>
    )
}
