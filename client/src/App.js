import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from './pages/Landing'; 
import Garden from './pages/Garden';
import Plant from './pages/Plant';

function App() {
  return (

  <Router>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/garden" component={Garden} />
        <Route exact path="/plant/:id" component={Plant} />

      </Switch>
    </React.Fragment>
  </Router>
  );
}

export default App;
