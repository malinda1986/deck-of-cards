import React, {useState} from 'react';
import './App.css';
import './components/Cards.css';
import './components/Loading.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Auth from './pages/Auth/Auth';

import Game from './pages/Game/Game';

const App = () => {
  return (
    <div>
      <Router>
        <>
            <NavBar />
            <main >
              <Switch>
                <Route path="/login" component={Auth} />
                <Route path="/game" component={Game} />
              </Switch>
            </main>
        </>
      </Router>
    </div>
  );
}

export default App;
