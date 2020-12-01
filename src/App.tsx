import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { BrowseList } from './routes/BrowseList'
import { Home } from './routes/Home'

import { NotFound } from './components/NotFound'

const Routes: React.FC = () => {
    return (
        <>
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/search" component={BrowseList} />
                <Route path="/" component={NotFound} />
            </Switch>
        </>
    )
}

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes />
            </Router>
        </>
    )
}

export default App
