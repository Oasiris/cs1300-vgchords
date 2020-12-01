import React from 'react'

import { MinorButton as LinkButton } from '../components/Button'
import { Layout } from '../components/Layout'

import '../styles/Home.scss'

export const Home: React.FC = () => {
    return (
        <Layout pageTitle="Browse Music">
            <div className="container">
                <div style={{ minHeight: '7.5vh' }} />
                <LinkButton children="See all" href="/search" />
                <div style={{ height: '7.5vh' }} />
            </div>
        </Layout>
    )
}
