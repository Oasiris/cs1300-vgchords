import React from 'react'

import { HexButton as Button } from '../components/Button'
import { Layout } from '../components/Layout'

import logo from '../icons/logo.svg'

import '../styles/Home.scss'

type SearchType = {
    placeholder?: string
}
class Search extends React.Component<SearchType> {
    render() {
        return (
            <div id="primarySearchContainer">
                {/* <input
                    type="text"
                    placeholder={this.props.placeholder !== 'undefined' ? this.props.placeholder : 'Find game music...'}
                /> */}
                <input type="text" placeholder="Find game music..." />
                <div className="_leftFlourish">
                    <div />
                    <div />
                </div>
                <div className="_extraBox" />

                <div className="_searchButton">
                    <i className="fas fa-search" />
                </div>
            </div>
        )
    }
}

export const Home: React.FC = () => {
    return (
        <Layout pageTitle="Browse Music">
            <div className="container">
                <div id="firstPrompt">To get started, search or pick a category.</div>

                <Search />
            </div>
        </Layout>
    )
}
