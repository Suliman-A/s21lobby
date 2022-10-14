import React from 'react';
import PropTypes from 'prop-types';

import styles from './History.module.scss';

/*
* ==================History component Specs=======================
* Props
*   children - rendered child node component (Example: historyBoard, historyNav).
* Component functionality - render history board game and it's corresponding props.
* ======================================================
*/ 
const History = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

History.propTypes = {
    children: PropTypes.node
}

export default History;