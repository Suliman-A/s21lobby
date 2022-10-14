import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './LobbyThumb.module.scss';
import lobbyCardStyles from '../LobbyCard/LobbyCard.module.scss';

import { useHistory } from 'react-router';

let cx = classNames.bind(styles);
let timerStorage;

/*
* ==================Lobby thumb specs=======================
* Props
*   dealerName - display the dealer name of lobby.
*   roomName - display lobby name.
*   imageUrl - url image that used to rendered as thumbnail.
*   videoUrl - url video.
*   className - contain style class for lobbyThumb component. 
*   hoverButton - boolean, IF true --> show join button.
*   buttonText - display to innertext of button.
* Component functionality - Render thumbnail container of specific lobby.
* ======================================================
*/ 
const LobbyThumb = ({ dealerName, roomName, imageUrl, videoUrl, className, hoverButton , buttonText = "Join now" }) => {
    const [videoVisible, setVideoVisible] = useState(false);
    const history = useHistory();

    const thumbClasses = cx({
        thumb: true,
        [className]: className
    });

    /*
    * ==================handleMouseEnter=======================
    * Function - display video while mouse is hover.
    * =========================================================
    */ 
    const handleMouseEnter = event => {
        timerStorage = setTimeout(() => {
            setVideoVisible(true);
        }, 3000);
    }

    /*
    * ==================handleMouseLeave=======================
    * Function - hide video.
    * =========================================================
    */ 
    const handleMouseLeave = () => {
        clearTimeout(timerStorage);
        setVideoVisible(false);
    }

    useEffect( () => {
        clearTimeout(timerStorage);
    }, [history.location.pathname]);

    return (
        <div className={thumbClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className={styles.names}>
                <span className={styles.name}>{dealerName}</span>
                <span className={styles.name}>{roomName}</span>
            </div>

            {hoverButton &&
                <button type="button" className={lobbyCardStyles.button}>{buttonText}</button>
            }

            <img src={imageUrl} alt="test" className={styles.media} />

            {videoVisible &&
                <video className={styles.media} autoPlay muted playsInline>
                    <source src={videoUrl} type="video/mp4" />
                </video>
            }
        </div>
    )
}

LobbyThumb.propTypes = {
    dealerName: PropTypes.string,
    roomName: PropTypes.string,
    imageUrl: PropTypes.string,
    videoUrl: PropTypes.string,
    className: PropTypes.string,
    buttonText: PropTypes.string,
    hoverButton: PropTypes.bool
}

export default LobbyThumb;