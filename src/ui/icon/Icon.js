import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

const icons = {
    logout: faSignInAlt
}

function Icon({ icon }) {
    return (
        <FontAwesomeIcon icon={icons[icon]}/>
    )
}

export default Icon;
