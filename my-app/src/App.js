import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './HomePage';
import CreateCandidate from './BodyComponent/AdminComponent/CreateCandidate';
import SetStatus from './BodyComponent/AdminComponent/SetStatus';
import AddPosition from './BodyComponent/AdminComponent/AddPosition';
import PositionComponent from './BodyComponent/PositionComponent';
import NavBar from './HeaderComponent/NavBar';
import Footer from './FooterComponent/Footer';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route name="homepage" exact path="/homepage/" component={HomePage} />
          <Route name="createcandidate" exact path="/createcandidate/" component={CreateCandidate} />
          <Route name="setstatus" exact path="/setstatus/" component={SetStatus} />
          <Route name="addposition" exact path="/addposition/" component={AddPosition} />
          <Route name="positioncomponent" exact path="/positioncomponent/:positionName" component={PositionComponent} />
        </div>
      </Router>
    )
  }
}
export default App;