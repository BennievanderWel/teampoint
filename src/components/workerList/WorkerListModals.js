import React, { useState } from 'react';
import Modal from '../../ui/modal/Modal';
import Backendless from 'backendless';
import { createUser } from '../../api/user';

export function CreateWorkerModal({ isVisible, close, addWorker }) {
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerEmail, setNewWorkerEmail] = useState('');
  const [isSubmiting, setIsSubmitting] = useState(false);

  function onClose() {
    close();
    setNewWorkerName('');
    setNewWorkerEmail('');
  }

  function createWorker() {
    setIsSubmitting(true);

    const newUser = {
      name: newWorkerName,
      email: newWorkerEmail,
      password: 'pass'
    };

    createUser(newUser)
      .then(user => {
        addWorker(user);
        onClose();
        setIsSubmitting(false);
      })
      .catch(console.log);
  }

  return (
    <Modal
      show={isVisible}
      onClose={onClose}
      successBtnText="Maak aan"
      title="Nieuwe gebruiker aanmaken"
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
      <div className="field">
        <label className="label">E-mail</label>
        <div className="control">
          <input
            disabled={isSubmiting}
            className="input"
            type="text"
            value={newWorkerEmail}
            onChange={e => setNewWorkerEmail(e.target.value)}
            placeholder="E-mail"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Wachtwoord</label>
        <div className="control">
          <input
            className="input"
            disabled={true}
            type="password"
            value="pass"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Herhaal wachtwoord</label>
        <div className="control">
          <input
            className="input"
            disabled={true}
            type="password"
            value="pass"
          />
        </div>
      </div>
    </Modal>
  );
}

export function DeleteWorkerModal({ isVisible, close, worker, removeWorker }) {
  const [isSubmiting, setIsSubmitting] = useState(false);

  function onClose() {
    close();
  }

  function deleteWorker() {
    setIsSubmitting(true);

    Backendless.Data.of('Users')
      .remove(worker)
      .then(() => {
        removeWorker(worker);
        onClose();
        setIsSubmitting(false);
      })
      .catch(console.log);
  }

  return worker ? (
    <Modal
      show={isVisible}
      onClose={onClose}
      successBtnText="Verwijder"
      title="Gebruiker verwijderen"
      onSuccess={deleteWorker}
      isSubmitting={isSubmiting}
    >
      <p>
        Weet je zeker dat je het profiel van <b>{worker.name}</b> wilt
        verwijderen?
      </p>
    </Modal>
  ) : (
    ''
  );
}
