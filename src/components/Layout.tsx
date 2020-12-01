import React from 'react'

import { HexButton as Button } from '../components/Button'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export type PageTitle = 'Browse Music' | 'WIP'

/* Page Titles */

const BrowseMusicTitle: React.FC = () => (
    <>
        <i className="fas fa-disc-drive" />
        <div className="horizSpace" style={{ width: '12px' }} />
        BROWSE MUSIC
    </>
)
const WipTitle: React.FC = () => (
    <>
        <i className="fas fa-question-circle" />
        <div className="horizSpace" style={{ width: '12px' }} />
        WIP
    </>
)

/* ——————————— */

const GlobalDecoration: React.FC = () => (
    <div id="globalDecoration">
        <div id="flourishLeft">
            <div />
            <div />
        </div>
        <div id="flourishRight">
            <div />
            <div />
        </div>
    </div>
)

export const Layout: React.FC<{ pageTitle: PageTitle; children: any }> = ({ pageTitle, children }) => {
    return (
        <div id="global">
            <GlobalDecoration />
            <Header>{pageTitle === 'Browse Music' ? <BrowseMusicTitle /> : <WipTitle />}</Header>
            <section id="content">
                <div className="container">Hi</div>
            </section>
            <Footer />
        </div>
    )
}
