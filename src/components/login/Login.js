import React, { useState } from "react";

import Panel from "../../ui/panel/Panel";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";

import styles from "./Login.module.scss";

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail ] = useState('')
  const [password, setPassword] = useState('')

  // Trigger login flow
  function handleLogin() {
    setLoading(true);
    onLogin(email, password).catch(() => setLoading(false));
  }

  // Listen to the enter key
  function onKeyPress(e) {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className={styles.Container}>
      <h1>TeamPoint</h1>
      <Panel width="m" className={styles.LoginPanel}>
        <Input onChange={e => setEmail(e.target.value)} onKeyPress={onKeyPress} value={email} disabled={loading} fullWidth placeholder="E-mail" type="email" />
        <Input
        onChange={e => setPassword(e.target.value)}
        onKeyPress={onKeyPress}
        value={password}
          disabled={loading}
          fullWidth
          placeholder="Wachtwoord"
          type="password"
        />
        <Button
          primary
          loading={loading}
          className={styles.LoginBtn}
          onClick={handleLogin}
        >
          login
        </Button>
      </Panel>
    </div>
  );
}
