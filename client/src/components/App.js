import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Countries from './Countries';
import Parallel from './Parallel'
import Simple from './Simple'
import PlayGround from './PlayGround'
import AddCountry from './AddCountry';
import Secret from './Secret';
import Login from './Login';
import Signup from './Signup';
import Todo from './Todo'
import api from '../api';
import logo from '../logo.svg';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {                
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Countries</h1>
          <Link to="/">Home</Link> 
          {/* <Link to="/countries">Countries</Link>  */}
          <Link to="/parallel">Parallel</Link> 
          <Link to="/simple">Simple</Link> 
          <Link to="/playground">PlayGround</Link> 
          <Link to="/todo">Todo</Link> 
          {/* <Link to="/add-country">Add country</Link>  */}
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link> }
          {!api.isLoggedIn() && <Link to="/login">Login</Link> }
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link> }
          <Link to="/secret">Secret</Link> 
        </header>
        <Switch>
          <Route path="/" exact component={PlayGround} />
          <Route path="/countries" component={Countries} />
          <Route path="/parallel" component={Parallel} />          
          <Route path="/simple" component={Simple} />          
          <Route path="/playground" component={PlayGround} />          
          <Route path="/todo" component={Todo} />          
          <Route path="/add-country" component={AddCountry} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>        
      </div>
    );
  }
}

export default App;
