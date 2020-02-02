import React, { useState, useContext } from 'react';
import Modal from '../../ui/modal/Modal';
import Backendless from 'backendless';
import AppContext from '../App.context';

export function CreateTeamModal({ isVisible, close, addWorker }) {
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerEmail, setNewWorkerEmail] = useState('');
  const [isSubmiting, setIsSubmitting] = useState(false);

  const currentUser = useContext(AppContext).currentUser;

  function onClose() {
    close();
    setNewWorkerName('');
    setNewWorkerEmail('');
  }

  function createWorker() {
    setIsSubmitting(true);

    const newUser = new Backendless.User();
    newUser.name = newWorkerName;
    newUser.email = newWorkerEmail;
    newUser.password = 'pass';

    Backendless.UserService.register(newUser)
      .then(user => {
        Backendless.Data.of('Users')
          .setRelation(user, 'company', [currentUser.company])
          .then(() => {
            addWorker(user);
            onClose();
            setIsSubmitting(false);
          })
          .catch(console.log);
      })
      .catch(console.log);
  }

  return (
    <Modal
      show={isVisible}
      onClose={onClose}
      successBtnText="Maak aan"
      title="Nieuw team aanmaken"
      onSuccess={createWorker}
      isSubmitting={isSubmiting}
    >
      <div className="field">
        <label className="label">Naam</label>
        <div className="control">
          <input
            disabled={isSubmiting}
            className="input"
            type="text"
            value={newWorkerName}
            onChange={e => setNewWorkerName(e.target.value)}
            placeholder="Naam"
          />
        </div>
      </div>
    </Modal>
  );
}

export function DeleteTeamModal({ isVisible, close, team, removeTeam }) {
  const [isSubmiting, setIsSubmitting] = useState(false);

  function onClose() {
    close();
  }

  function deleteTeam() {
    // setIsSubmitting(true);
    // Backendless.Data.of('Users')
    //   .remove(worker)
    //   .then(() => {
    //     removeWorker(worker);
    //     onClose();
    //     setIsSubmitting(false);
    //   })
    //   .catch(console.log);
  }

  return team ? (
    <Modal
      show={isVisible}
      onClose={onClose}
      successBtnText="Verwijder"
      title="Team verwijderen"
      onSuccess={deleteTeam}
      isSubmitting={isSubmiting}
    >
      <p>
        Weet je zeker dat je het profiel van <b>{team.name}</b> wilt
        verwijderen?
      </p>
    </Modal>
  ) : (
    ''
  );
}
