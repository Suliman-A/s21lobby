import React, { Fragment } from 'react';
import Icon from '../Icon/Icon';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';

import styles from './LobbyDynamicGrid.module.scss';

/*
* ==================Lobby dynamic grid specs=======================
* Props
*   heading - display the heading title of component.
*   children - lobby card components.
* Component functionality - Render the grid layout of lobby.
* ======================================================
*/ 
const LobbyDynamicGrid = ({ heading, children }) => {

    return (
        <Fragment>
            <Wrapper className={styles.navWrapper}>
                <h2 className={styles.heading}>
                    <Icon icon="lobby" className={styles.headingIcon} />
                    {heading}
                </h2>
            </Wrapper>
            <Wrapper className={styles.gridWrapper}>
                <div className={styles.grid}>
                    {children}
                </div>
            </Wrapper>
        </Fragment>
    )
}

LobbyDynamicGrid.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node
}

export default LobbyDynamicGrid;