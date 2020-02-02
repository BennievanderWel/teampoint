import React from 'react';

import styles from './Header.module.scss';
import Button from '../../ui/button/Button';
import Icon from '../../ui/icon/Icon';
import { Link } from 'react-router-dom';

export default function Header({ logout, currentUser }) {
  return (
    <div className={styles.Container}>
      <ul className={styles.Menu}>
        <li>
          <Link to="/">
            <h1>TeamPoint</h1>
          </Link>
        </li>
        {/* <li>
          <Button outlined>
            <Link to="/">dashboad</Link>
          </Button>
        </li>
        <li>
          <Button outlined>
            <Link to="profile">profile</Link>
          </Button>
        </li> */}
        <li>
          <span>{currentUser.name}</span>
          <Button onClick={logout} outlined inverted primary>
            <Icon icon="logout" />
          </Button>
        </li>
      </ul>
    </div>
  );
}
