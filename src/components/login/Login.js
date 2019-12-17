import React, { useState } from "react";

import Panel from "../../ui/panel/Panel";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";

import styles from "./Login.module.scss";

export default function Login({ onLogin, history }) {
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    setLoading(true);
    onLogin().catch(() => setLoading(false));
  }

  return (
    <div className={styles.Container}>
      <h1>TeamPoint</h1>
      <Panel width="m" className={styles.LoginPanel}>
        <Input disabled={loading} fullWidth placeholder="E-mail" type="email" />
        <Input
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
