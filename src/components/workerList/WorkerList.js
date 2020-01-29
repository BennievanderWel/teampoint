import React, { useState, useContext, useEffect } from 'react';
import Backendless from 'backendless';
import { CreateWorkerModal, DeleteWorkerModal } from './WorkerListModals';

import Panel from '../../ui/panel/Panel';
import ButtonBar from '../../ui/buttonBar/ButtonBar';
import Button from '../../ui/button/Button';
import Icon from '../../ui/icon/Icon';

import AppContext from '../App.context';

import styles from './WorkerList.module.scss';
import Loader from '../../ui/loader/Loader';

function WorkerList() {
  const [isCreateWorkerModalVisible, setIsCreateWorkerModalVisible] = useState(
    false
  );
  const [isDeleteWorkerModalVisible, setIsDeleteWorkerModalVisible] = useState(
    false
  );
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useContext(AppContext).currentUser;

  // useEffect(() => {
  //   const userEventHandler = Backendless.Data.of('Users').rt();

  //   const onUserUpdate = user => {
  //     console.log(2);
  //     addColleague(user);
  //   };

  //   const onError = console.log;

  //   userEventHandler.addUpdateListener(onUserUpdate, onError);

  //   const channel = Backendless.Messaging.subscribe('userSetRelationUpdates');

  //   function onMessage(message) {
  //     console.log(message);
  //   }

  //   channel.addMessageListener(onMessage);

  //   return () => userEventHandler.removeUpdateListeners();
  // });

  useEffect(() => {
    function getWorkers() {
      const q = Backendless.DataQueryBuilder.create();
      q.setWhereClause(
        `objectId != '${currentUser.objectId}' and company = '${currentUser.company.objectId}'`
      );
      q.setPageSize(100);

      Backendless.Data.of('Users')
        .find(q)
        .then(workers => {
          setWorkers(workers);
          setIsLoading(false);
        })
        .catch(console.log);
    }

    getWorkers();
  }, [currentUser]);

  function addWorker(worker) {
    let userIndex;
    let updatedWorkers = workers.slice(); // Copy
    for (var i = workers.length - 1; i >= 0; --i) {
      if (workers[i].objectId === worker.objectId) {
        userIndex = i;
      }
    }
    if (userIndex === undefined) {
      updatedWorkers.unshift(worker);
    } else {
      updatedWorkers[userIndex] = worker;
    }

    setWorkers(updatedWorkers);
  }

  function removeWorker(worker) {
    const userIndex = workers.findIndex(c => c.objectId === worker.objectId);
    let updatedWorkers = workers.slice(); // Copy
    updatedWorkers.splice(userIndex, 1);
    setWorkers(updatedWorkers);
  }

  function closeAddModal() {
    setIsCreateWorkerModalVisible(false);
  }

  function closeDeleteModal() {
    setIsDeleteWorkerModalVisible(false);
  }

  return (
    <div className={styles.Container}>
      <CreateWorkerModal
        isVisible={isCreateWorkerModalVisible}
        close={closeAddModal}
        addWorker={addWorker}
      />
      <DeleteWorkerModal
        isVisible={isDeleteWorkerModalVisible}
        close={closeDeleteModal}
        removeWorker={removeWorker}
        worker={selectedWorker}
      />
      <Panel className={styles.Panel}>
        <h2>Collega's</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ButtonBar>
              <Button
                primary
                onClick={() =>
                  setIsCreateWorkerModalVisible(!isCreateWorkerModalVisible)
                }
              >
                <Icon icon="addUser" />
              </Button>
              <Button
                disabled={!selectedWorker}
                onClick={() => setIsDeleteWorkerModalVisible(true)}
              >
                <Icon icon="delete" />
              </Button>
            </ButtonBar>
            <table>
              <tbody>
                {workers.map(w => (
                  <tr
                    key={w.objectId}
                    onClick={() => setSelectedWorker(w)}
                    className={
                      selectedWorker && w.objectId === selectedWorker.objectId
                        ? styles.SelectedRow
                        : ''
                    }
                  >
                    <td>{w.name}</td>
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

export default WorkerList;
