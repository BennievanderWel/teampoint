import React from "react";

import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import Button from "../../ui/button/Button";

export default function Header({ logout, currentUser }) {
  return (
    <div className={styles.Container}>
      <ul className={styles.Menu}>
        <li>
          <h1>TeamPoint</h1>
        </li>
        <li>
          <Button outlined>
            <Link to="/">dashboad</Link>
          </Button>
        </li>
        <li>
          <Button outlined>
            <Link to="profile">profile</Link>
          </Button>
        </li>
        <li>
          <span>{currentUser.name}</span>
          <Button onClick={logout}>logout</Button>
        </li>
      </ul>
    </div>
  );
}
