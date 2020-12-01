import React from 'react'

type SearchType = {
    placeholder?: string
}

export class Search extends React.Component<SearchType> {
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
