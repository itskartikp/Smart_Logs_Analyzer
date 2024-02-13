import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Home from './views/home'
import Data from './views/data'
import NotFound from './views/not-found'
import Results from './views/results'
import Discover from './views/discover'
import Visualize from './views/visualize'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Data} exact path="/data" />
        <Route component={Results} exact path="/result" />
        <Route component={Discover} exact path="/discover" />
        <Route component={Visualize} exact path="/visualize" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
