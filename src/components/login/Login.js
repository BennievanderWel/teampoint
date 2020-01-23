import React, { useState } from "react";

import Panel from "../../ui/panel/Panel";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";

import styles from "./Login.module.scss";

export default function Login({ onLogin, history }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail ] = useState('bennievanderwel@gmail.com')
  const [password, setPassword] = useState('pass')

  function handleLogin() {
    setLoading(true);
    onLogin(email, password);
  }

  return (
    <div className={styles.Container}>
      <h1>TeamPoint</h1>
      <Panel width="m" className={styles.LoginPanel}>
        <Input onChange={e => setEmail(e.target.value)} value={email} disabled={loading} fullWidth placeholder="E-mail" type="email" />
        <Input
        onChange={e => setPassword(e.target.value)}
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
          onClick={() => handleLogin(history)}
        >
          login
        </Button>
      </Panel>
    </div>
  );
}
