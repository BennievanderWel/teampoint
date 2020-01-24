import React from 'react';
import Backendless from 'backendless';

import AppContext from '../App.context';
import Panel from '../../ui/panel/Panel';

import styles from './Dashboard.module.scss';

class Dashboard extends React.Component {
  state = {
    colleagues: [],
    isGettingColleagues: true
  };

  static contextType = AppContext;

  componentDidMount() {
    const currentUser = this.context.currentUser;

    this.getColleagues(currentUser);
  }

  // Check if component is done getting the required data
  isLoading = () => {
    const { isGettingColleagues } = this.state;

    return isGettingColleagues;
  };

  getColleagues = currentUser => {
    const whereClause = `objectId != '${currentUser.objectId}'`;
    const q = Backendless.DataQueryBuilder.create().setWhereClause(whereClause);

    Backendless.Data.of('Users')
      .find(q)
      .then(users => {
        this.setState({ colleagues: users, isGettingColleagues: false });
      })
      .catch(console.log);
  };

  createTeam = () => {
    const { newTeamName, teams } = this.state;
    Backendless.Data.of('Team')
      .save({ name: newTeamName })
      .then(newTeam => {
        Backendless.Data.of('Team')
          .findFirst({ objectId: newTeam.objectId })
          .then(team => {
            this.setState({ teams: [...teams, team], newTeamName: '' });
          });
      })
      .catch(console.log);
  };

  createPosition = () => {
    const { newPositionName, selectedTeam } = this.state;
    Backendless.Data.of('Position')
      .save({ name: newPositionName, team: selectedTeam.objectId })
      .then(newPosition => {
        this.setState({
          selectedTeam: {
            ...selectedTeam,
            positions: [...selectedTeam.positions, newPosition]
          },
          newPositionName: ''
        });
      })
      .catch(console.log);
  };

  handleTeamNameChange = e => {
    this.setState({ newTeamName: e.target.value });
  };

  handlePositionNameChange = e => {
    this.setState({ newPositionName: e.target.value });
  };

  renderContent = () => {
    const { colleagues } = this.state;

    return (
      <>
        <h1>Dashboard</h1>
        <div className={styles.Content}>
          <div className={styles.ContentLeft}>
            <Panel>
              <h2>Teams</h2>
              Je zit niet in een team
            </Panel>
            <Panel>
              <h2>Collega's</h2>
              <ul>
                {colleagues.map(c => (
                  <li key={c.objectId}>{c.name}</li>
                ))}
              </ul>
            </Panel>
          </div>
          <div className={styles.ContentRight}>
            <Panel className={styles.InboxPanel}>
              <h2>Inbox</h2>
              <p>Geen nieuwe berichten</p>
            </Panel>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className={styles.Container}>
        {this.isLoading() ? 'loading' : this.renderContent()}
      </div>
    );
  }
}

export default Dashboard;
