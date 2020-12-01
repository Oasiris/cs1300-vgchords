import React from 'react'

import { HexButton as MajorButton, MinorButton as LinkButton } from '../components/Button'
import { Layout } from '../components/Layout'
import { SearchBar as Search } from '../components/SearchBar'

import logo from '../icons/logo.svg'

import '../styles/Home.scss'

// NOTE: Width of a
export const Home: React.FC = () => {
    return (
        <Layout pageTitle="Browse Music">
            <div className="container">
                <div style={{ minHeight: '7.5vh' }} />
                {/* <div id="firstPrompt">To get started, search or pick a category.</div> */}
                {/* <Search /> */}
                {/* <div style={{ height: '20px' }} /> */}
                <LinkButton children="See all" href="/search" />
                {/* <div style={{ minHeight: '7.5vh' }} /> */}
                {/* <div id="pickCategoryGrid">
                    <div>
                        Order by
                        <div style={{ height: '15px' }} />
                        <LinkButton children="Latest uploads" />
                        <LinkButton children="Newest games" />
                    </div>
                    <div />
                    <div>
                        Popular categories
                        <div style={{ height: '15px' }} />
                        <LinkButton children="Pokemon" />
                        <LinkButton children="Kingdom Hearts" />
                        <LinkButton children="Final Fantasy" />
                    </div>
                </div> */}
                <div style={{ height: '7.5vh' }} />
            </div>
        </Layout>
    )
}
