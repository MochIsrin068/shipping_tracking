import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from '../components/Home'
import Tracking from '../components/Tracking'
import Menu from '../components/Menu'
import '../styles/main.scss'
import Header from '../components/Header'
import AboutUs from '../components/AboutUs'

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="app__container">
          <div className="app__container__menu">
            <Header/>
            <Menu />
          </div>
          <div className="app__container__content">
            <Switch>
              <Route path="/about"><AboutUs/></Route>
              <Route path="/tracker"><Tracking/></Route>
              <Route path="/"><Home/></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App