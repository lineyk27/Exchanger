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
    <div className="App row justify-content-center">
      <div className="col-md-7">
        <div className="">
          <Link to={ExchangerRoute}>
            <div className="btn btn-link" >Exchanger</div>
          </Link>{"  "}
          <Link to={HistoryRoute}>
          <div className="btn btn-link" >History</div>
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
    </div>
  );
}

export default App;
