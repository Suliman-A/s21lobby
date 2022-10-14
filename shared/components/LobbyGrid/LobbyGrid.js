import React from 'react';

import PropTypes from 'prop-types';

import styles from './LobbyGrid.module.scss';

/*
* ==================Lobby grid specs=======================
* Props
*   children - lobby cards components.
* Component functionality - Display all lobby card components on layout grid.
* ======================================================
*/ 
const LobbyGrid = ({ children }) => {
    return (
        <div className={styles.grid}>
            {children}
        </div>
    )
}

LobbyGrid.propTypes = {
    children: PropTypes.node
}

export default LobbyGrid;