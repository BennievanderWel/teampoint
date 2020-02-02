import React, { useState, useEffect, useContext } from 'react';
import { CreateWorkerModal, DeleteWorkerModal } from './WorkerListModals';

import Panel from '../../ui/panel/Panel';
import ButtonBar from '../../ui/buttonBar/ButtonBar';
import Button from '../../ui/button/Button';
import Icon from '../../ui/icon/Icon';

import styles from './WorkerList.module.scss';
import Loader from '../../ui/loader/Loader';
import AppContext from '../App.context';

function WorkerList() {
  const [isCreateWorkerModalVisible, setIsCreateWorkerModalVisible] = useState(
    false
  );
  const [isDeleteWorkerModalVisible, setIsDeleteWorkerModalVisible] = useState(
    false
  );

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { workers, setWorkers } = useContext(AppContext);

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
    if (workers != null) {
      setIsLoading(false);
    }
  }, [workers]);

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

  function closeCreateModal() {
    setIsCreateWorkerModalVisible(false);
  }

  function closeDeleteModal() {
    setIsDeleteWorkerModalVisible(false);
  }

  return (
    <div className={styles.Container}>
      <CreateWorkerModal
        isVisible={isCreateWorkerModalVisible}
        close={closeCreateModal}
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
                <Icon icon="add" />
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
