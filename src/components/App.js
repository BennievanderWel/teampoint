import React from "react";
import Backendless from "backendless";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from "./login/Login";
import Dashboard from './dashboard/Dashboard'
import Header from './header/Header'

import styles from "./App.module.scss";
import "bulma/bulma.sass";

class App extends React.Component {
  state = {
    authenticated: false,
    currentUser: null,
  };

  constructor() {
    super();

    // TODO: Move to config file
    Backendless.initApp(
      "CC78D110-B842-C36D-FFB9-DB5E5BA42F00",
      "3AEAC9E2-9FE1-43CB-927B-C1AEEEA34E38"
    );
  }

  componentDidMount() {
    // Check for a logged in user
    Backendless.UserService.getCurrentUser().then(user => {
      if (user) {
        this.setState({ currentUser: user, authenticated: true });
      }
    }).catch(console.log);
  }

  // Log the user in
  login(email, password) {
    return Backendless.UserService.login(email, password, true)
      .then(user => {
        this.setState({ currentUser: user, authenticated: true });
      })
      .catch(console.log);
  }

  // Log the user out
  logout() {
    Backendless.UserService.logout()
      .then(() =>
        this.setState({ authenticated: false, currentUser: null })
      )
      .catch(console.log);
  }

  render() {
    const { authenticated, currentUser } = this.state;
    
    return (
      <div className={styles.Container}>
        {!authenticated && (
          <Login onLogin={this.login.bind(this)}/>
        )}
        {authenticated && (
          <BrowserRouter>
          <Header logout={this.logout.bind(this)} currentUser={currentUser}/>
          <Switch>

          <Route exact path='/' component={Dashboard}/>
          </Switch>
          </BrowserRouter>
        )}
      </div>
        );
  }
}

export default App;
