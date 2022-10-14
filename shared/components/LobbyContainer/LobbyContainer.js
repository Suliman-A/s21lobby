import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './LobbyContainer.module.scss';
let cx = classNames.bind(styles);

/*
* ==================Lobby Container specs=======================
* Props
*   children - Lobby history board component.
*   className - Contain style class for lobby container.
* Component functionality - Parent element and rendered the lobby history board.
* ==============================================================
*/ 
const LobbyContainer = ({ children, className }) => {
    const containerClasses = cx({
        container: true,
        [className]: className
    });
    return (
        <div className={containerClasses}>
            {children}
        </div>
    )
}

LobbyContainer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

export default LobbyContainer;