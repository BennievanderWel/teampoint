import React, { useState, useEffect, useContext } from 'react';
import { CreateTeamModal, DeleteTeamModal } from './TeamListModals';
import { Link } from 'react-router-dom';

import Panel from '../../ui/panel/Panel';
import ButtonBar from '../../ui/buttonBar/ButtonBar';
import Button from '../../ui/button/Button';
import Icon from '../../ui/icon/Icon';

import styles from './TeamList.module.scss';
import Loader from '../../ui/loader/Loader';
import AppContext from '../App.context';

function TeamList() {
  const [isCreateTeamModalVisible, setIsCreateTeamModalVisible] = useState(
    false
  );
  const [isDeleteTeamModalVisible, setIsDeleteTeamModalVisible] = useState(
    false
  );
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { teams, setTeams } = useContext(AppContext);

  useEffect(() => {
    if (teams != null) {
      setIsLoading(false);
    }
  }, [teams]);

  function addTeam(team) {
    let userIndex;
    let updatedTeams = teams.slice(); // Copy
    for (var i = teams.length - 1; i >= 0; --i) {
      if (teams[i].objectId === team.objectId) {
        userIndex = i;
      }
    }
    if (userIndex === undefined) {
      updatedTeams.unshift(team);
    } else {
      updatedTeams[userIndex] = team;
    }

    setTeams(updatedTeams);
  }

  // function removeWorker(worker) {
  //   const userIndex = workers.findIndex(c => c.objectId === worker.objectId);
  //   let updatedWorkers = workers.slice(); // Copy
  //   updatedWorkers.splice(userIndex, 1);
  //   setWorkers(updatedWorkers);
  // }

  function closeCreateModal() {
    setIsCreateTeamModalVisible(false);
  }

  // function closeDeleteModal() {
  //   setIsDeleteWorkerModalVisible(false);
  // }

  return (
    <div className={styles.Container}>
      <CreateTeamModal
        isVisible={isCreateTeamModalVisible}
        close={closeCreateModal}
        addWorker={addTeam}
      />
      {/* <DeleteWorkerModal
        isVisible={isDeleteWorkerModalVisible}
        close={closeDeleteModal}
        removeWorker={removeWorker}
        worker={selectedWorker}
      /> */}
      <Panel className={styles.Panel}>
        <h2>Teams</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ButtonBar>
              <Button
                primary
                onClick={() =>
                  setIsCreateTeamModalVisible(!isCreateTeamModalVisible)
                }
              >
                <Icon icon="add" />
              </Button>
              <Button
                disabled={!selectedTeam}
                // onClick={() => setIsDeleteWorkerModalVisible(true)}
              >
                <Icon icon="delete" />
              </Button>
            </ButtonBar>
            <table>
              <tbody>
                <tr>
                  <td className={styles.TitleRow}>Mijn teams</td>
                </tr>
                {teams
                  .filter(t => t.isMember)
                  .map(t => (
                    <tr
                      key={t.objectId}
                      onClick={() => setSelectedTeam(t)}
                      className={
                        selectedTeam && t.objectId === selectedTeam.objectId
                          ? styles.SelectedRow
                          : ''
                      }
                    >
                      <td>
                        <Link to={`/team/${t.objectId}`}>{t.name}</Link>
                      </td>
                    </tr>
                  ))}

                <tr>
                  <td className={styles.TitleRow}>Overige teams</td>
                </tr>
                {teams
                  .filter(t => !t.isMember)
                  .map(t => (
                    <tr
                      key={t.objectId}
                      onClick={() => setSelectedTeam(t)}
                      className={
                        selectedTeam && t.objectId === selectedTeam.objectId
                          ? styles.SelectedRow
                          : ''
                      }
                    >
                      <td>
                        <Link to={`/team/${t.objectId}`}>{t.name}</Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </Panel>
    </div>
  );
}

export default TeamList;
