import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Home } from './routes/Home'

import { LoremIpsum } from './components/LoremIpsum'
import { NotFound } from './components/NotFound'

const Routes: React.FC = () => {
    return (
        <>
            <Switch>
                <Route path="/" exact={true} component={Home} />
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
