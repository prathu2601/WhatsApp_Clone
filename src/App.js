import React, {useState, useEffect} from 'react'
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat'
import Login from './components/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useStateValue } from './components/StateProvider';

function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      { !user?(
        <Login />
      ):(
        <div className="app__body">
          <Router>
            <Sidebar/>
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>
              <Route path="/">
                <Chat/>
              </Route>              
            </Switch>            
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
