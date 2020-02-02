import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import styles from './TeamDetail.module.scss';

import AppContext from '../App.context';
import Panel from '../../ui/panel/Panel';
import Icon from '../../ui/icon/Icon';

function TeamDetail() {
  const { id } = useParams();
  const team = useContext(AppContext).teams.filter(t => t.objectId === id)[0];

  return (
    <div className={styles.Container}>
      <h1>Team: {team.name}</h1>
      <Panel>
        <h2>Leden</h2>
        <div className={styles.AddWorker}>
          <Icon icon="addUser" />
        </div>
      </Panel>
    </div>
  );
}

export default TeamDetail;
