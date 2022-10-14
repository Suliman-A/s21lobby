import React from 'react';

import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import LinkButton from '../LinkButton/LinkButton';

import classNames from 'classnames/bind';
import styles from './LobbyInfo.module.scss';
let cx = classNames.bind(styles);

/*
* ==================Lobby Info specs=======================
* Props
*   limit - display the range amount of bets.
*   users - display value numbers of player that in lobby game.
*   className - contain addtional styles class for info element.
*   lobbyView - boolean, IF true --> display join button.
* Component functionality - Render lobby informations like number of players and range of bet.
* ======================================================
*/ 
const LobbyInfo = ({ limit, users, className, lobbyView }) => {
    const infoClasses = cx({
        info: true,
        [className]: className
    });

    const containerClasses = cx({
        container: true,
        lobbyView: lobbyView
    });
    return (
        <div className={containerClasses}>
            <div className={infoClasses}>
                <span className={styles.text}>{limit}</span>
                <div className={styles.users}>
                    <Icon icon="users" className={styles.icon} />
                    <span className={styles.text}>{users}</span>
                </div>
            </div>
            {lobbyView &&
                <LinkButton className={styles.button}>Join</LinkButton>
            }
        </div>
    )
}

LobbyInfo.propTypes = {
    limit: PropTypes.string.isRequired,
    users: PropTypes.string.isRequired,
    className: PropTypes.string,
    lobbyView: PropTypes.bool
}

export default LobbyInfo;