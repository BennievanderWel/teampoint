import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faTrashAlt,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

const icons = {
  logout: faSignInAlt,
  addUser: faUserPlus,
  delete: faTrashAlt
};

function Icon({ icon }) {
  return <FontAwesomeIcon icon={icons[icon]} />;
}

export default Icon;
