import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import Exchanger from './Exchanger';
import History from './History';

const ExchangerRoute = "/";
const HistoryRoute = "/history";


function App() {
  return (
    <div className="App">
      <div id="picker">
        <Link to={ExchangerRoute}>
          Exchanger
        </Link>{"  "}
        <Link to={HistoryRoute}>
          History
        </Link>
      </div>
      <div id="main-content">
        <Route path={ExchangerRoute} exact={true}>
          <Exchanger />
        </Route>
        <Route path={HistoryRoute} exact={true}>
          <History/>
        </Route>
      </div>
    </div>
  );
}

export default App;
