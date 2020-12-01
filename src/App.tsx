import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { BrowseList } from './routes/BrowseList'
import { Home } from './routes/Home'

import { Layout } from './components/Layout'
import { LoremIpsum } from './components/LoremIpsum'
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

// const PrimaryLayout: React.FC = () => {
//     return (
//         <Layout pageTitle="Browse Music">
//             <Switch>
//                 <Route path="/" exact={true} component={Home} />
//                 <Route path="/search" component={BrowseList} />
//                 <Route path="/" component={NotFound} />
//             </Switch>
//         </Layout>
//     )
// }

// const App: React.FC = () => {
//     return (
//         <>
//             <Router>
//                 <PrimaryLayout />
//             </Router>
//         </>
//     )
// }

export default App
