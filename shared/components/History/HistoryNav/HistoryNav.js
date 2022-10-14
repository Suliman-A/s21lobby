import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon/Icon';

import styles from './HistoryNav.module.scss';

/*
* ==================History nav component Specs=======================
* Props
*   hands - number of round elapsed.
*   player -  render value number IF player win the round.
*   banker - render value number IF banker win the round.
*   tie - render value number IF tie win the round.
*   playerPairs - render value number IF playerPairs win the round.
*   bankerPairs - render value number IF bankerPairs win the round.
* Component functionality - Render the number of rounds elapsed and increment the winning board (Example: tie = 1).
* ===================================================================
*/ 
const HistoryNav = ({ hands = 0, player = '#', banker = '#', tie = '#', playerPairs = '#', bankerPairs = '#' }) => {
    return (
        <nav className={styles.nav}>

            <div className={styles.itemWrapper}>
                
                <div className={styles.item}>
                    <span className={styles.text}>#</span>
                    <span className={styles.text}>{hands}</span>
                </div>
                <div className={styles.item}>
                    <Icon icon="nav-player" className={styles.icon} />
                    <span className={styles.text}>{player}</span>
                </div>
                <div className={styles.item}>
                    <Icon icon="nav-banker" className={styles.icon} />
                    <span className={styles.text}>{banker}</span>
                </div>
                <div className={styles.item}>
                    <Icon icon="nav-tie" className={styles.icon} />
                    <span className={styles.text}>{tie}</span>
                </div>
            </div>

            <div className={styles.itemPair}>

                {/* Player nav pair */}
                <div className={styles.pairNavPlayer}>
                    <p className={styles.pairPlayer}>P</p>

                    <div className={styles.signs}>
                        <Icon icon="circle-2-7" className={styles.pairIcon} />
                    </div>

                    <div className={styles.signs}>
                        <div className={styles.pairCirclePlayer}></div>
                    </div>

                    <div className={styles.signs}>
                        <p className={styles.pairLinePlayer}> / </p>
                        <span>{playerPairs}</span>
                    </div>
                </div>

                {/* Banker nav pair */}
                <div className={styles.pairNavBanker}>
                    <p className={styles.pairBanker}>B</p>

                    <div className={styles.signs}>
                        <Icon icon="circle-1-7" className={styles.pairIcon} />
                    </div>

                    <div className={styles.signs}>
                        <div className={styles.pairCircleBanker}></div>
                    </div>

                    <div className={styles.signs}>
                        <p className={styles.pairLineBanker}> / </p>
                        <span>{bankerPairs}</span>
                    </div>
                    
                </div>

            </div>
        </nav>
    )
}


HistoryNav.propTypes = {
    hands: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    player: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    banker: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    tie: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    playerPairs: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    bankerPairs: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

export default HistoryNav;