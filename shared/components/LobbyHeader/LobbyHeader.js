import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import LinkButton from '../LinkButton/LinkButton';
import Wrapper from '../Wrapper/Wrapper';

import styles from './LobbyHeader.module.scss';

/*
* ==================Lobby header specs=======================
* Component functionality - Display the page name "Lobby" and the exit icon to close the page.
* ======================================================
*/ 
const LobbyHeader = () => {
    return (
        <Wrapper className={styles.wrapper}>
            <h1 className={styles.heading}>
                <Icon icon="lobby" className={styles.headingIcon} />
                Lobby
            </h1>
            <LinkButton onClick={() => { console.log('button clicked') }} className={styles.closeButton}>
                <Icon icon="cross" className={styles.closeButtonIcon} />
            </LinkButton>
        </Wrapper>
    )
}

LobbyHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

export default LobbyHeader;