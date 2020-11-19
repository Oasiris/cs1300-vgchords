import React from 'react'

import logo from '../icons/logo.svg'

import '../styles/Home.scss'

const Header: React.FC = () => (
    <section id="header">
        <div className="miniContainer">
            <div id="headerTitle">
                <div id="headerTitleRectangle" />
                <span>Video Game Music Chord Compendium</span>
                <h1>VGChords</h1>
            </div>
        </div>
    </section>
)

const Footer: React.FC = () => (
    <section id="footer">
        <div className="miniContainer">Footer</div>
        <i className="fas fa-acorn" />
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
