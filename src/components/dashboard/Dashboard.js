import React from 'react';
import Panel from '../../ui/panel/Panel';

import styles from './Dashboard.module.scss';
import WorkerList from '../workerList/WorkerList';

class Dashboard extends React.Component {
  render() {
    return (
      <div className={styles.Container}>
        <h1>Dashboard</h1>
        <div className={styles.Content}>
          <div className={styles.ContentLeft}>
            <Panel>
              <h2>Teams</h2>
              Je zit niet in een team
            </Panel>
            <WorkerList />
          </div>
          <div className={styles.ContentRight}>
            <Panel className={styles.InboxPanel}>
              <h2>Inbox</h2>
              <p>Geen nieuwe berichten</p>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
