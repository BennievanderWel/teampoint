import React from 'react';
import Backendless from 'backendless';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Header from './header/Header';

import styles from './App.module.scss';
import 'bulma/bulma.sass';
import AppContext from './App.context';
import { getCurrentUser, login, logout, getUsers } from '../api/user';
import TeamDetail from './teamDetail/TeamDetail';
import { getTeams } from '../api/team';

class App extends React.Component {
  state = {
    authenticated: false,
    currentUser: null,
    teams: null,
    loading: true,
    workers: null
  };

  constructor() {
    super();

    // TODO: Move to config file
    Backendless.initApp(
      'CC78D110-B842-C36D-FFB9-DB5E5BA42F00',
      '3AEAC9E2-9FE1-43CB-927B-C1AEEEA34E38'
    );
  }

  componentDidMount() {
    // Check for a logged in user
    getCurrentUser()
      .then(user => {
        if (user) {
          this.setState({ currentUser: user, authenticated: true });
          this.initData();
        }
      })
      .catch(console.log);
  }

  initData() {
    this.setState({ loading: true });
    getTeams()
      .then(teams => {
        this.setTeams(teams);
        this.setState({ loading: false });
      })
      .catch(console.log);

    getUsers()
      .then(users => {
        this.setWorkers(users);
      })
      .catch(console.log);
  }

  setTeams(teams) {
    this.setState({ teams });
  }

  setWorkers(workers) {
    this.setState({ workers });
  }

  // Log the user in
  login(email, password) {
    return login(email, password).then(user => {
      this.setState({ currentUser: user, authenticated: true });
      this.initData();
    });
  }

  // Log the user out
  logout() {
    logout()
      .then(() => this.setState({ authenticated: false, currentUser: null }))
      .catch(console.log);
  }

  render() {
    const { authenticated, currentUser, loading, teams, workers } = this.state;

    return (
      <div className={styles.Container}>
        {!authenticated && <Login onLogin={this.login.bind(this)} />}
        {authenticated && !loading && (
          <AppContext.Provider
            value={{
              setTeams: this.setTeams.bind(this),
              setWorkers: this.setWorkers.bind(this),
              workers,
              teams,
              currentUser
            }}
          >
            <BrowserRouter>
              <Header
                logout={this.logout.bind(this)}
                currentUser={currentUser}
              />
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/team/:id" component={TeamDetail} />
              </Switch>
            </BrowserRouter>
          </AppContext.Provider>
        )}
      </div>
    );
  }
}

export default App;
