import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router'

const _NotFound: React.FC<RouteComponentProps> = ({ history }) => {
    return (
        <div id="notFound">
            <h3>Not Found</h3>
            <p>We couldn't find that page.</p>

            <button children="Back" onClick={() => history.goBack()} />
        </div>
    )
}

export const NotFound = withRouter(_NotFound)
