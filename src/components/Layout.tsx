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

type LayoutType = {
    pageTitle: PageTitle

    /** Page content. Goes in section#content. */
    children?: any
}

/** @param children Page content. Goes in section#content. */
export const Layout: React.FC<LayoutType> = ({ pageTitle, children }) => {
    return (
        <div id="layout">
            <GlobalDecoration />
            <Header>{pageTitle === 'Browse Music' ? <BrowseMusicTitle /> : <WipTitle />}</Header>
            <section id="content">{children}</section>
            <Footer />
        </div>
    )
}
