import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './index.css';
import FullPage from './App.js';
import List from './Page2/list.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router basename="">
      <div>
        <Switch>
          <Route exact path="/" component={FullPage} />
          <Route path="/list" component={List} />
        </Switch>
      </div>
    </Router>,
    document.getElementById("root"),
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
