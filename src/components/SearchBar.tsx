import React from 'react'

type SearchBarType = {
    // placeholder?: string
    [t: string]: any
}

export class SearchBar extends React.Component<SearchBarType> {
    render() {
        const props = { ...this.props }
        return (
            <div id="primarySearchContainer" {...props}>
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
