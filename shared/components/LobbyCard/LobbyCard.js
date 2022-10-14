import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './LobbyCard.module.scss';
let cx = classNames.bind(styles);

/*
* ==================Lobby Card specs=======================
* Props
*   children - child node components may contain ( Lobby thubms, Lobby Container ).
*   className - containa addtional style class for lobby card element.
*   onClick - on click user join to lobby.
* Component functionality - Parent element of each lobby game and render the corresponding props.
* =====================================================
*/ 
const LobbyCard = ({ children, className, onClick }) => {
    const cardClasses = cx({
        card: true,
        [className]: className
    });
    return (
        <div className={cardClasses} onClick={onClick}>
            {children}
        </div>
    )
}

LobbyCard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default LobbyCard;