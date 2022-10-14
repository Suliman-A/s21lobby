import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon/Icon';
import classNames from 'classnames/bind';

import styles from './HistoryBoard.module.scss';
let cx = classNames.bind(styles);

/*
* ==================History board specs=======================
* Props
*   items - array of objects outcome that render icon corresponding to the winner board.
*   padded - IF true --> add padding inside each cell of grid.
*   rows - number of grid rows, DEFAULT 6.
*   cols - required number of grid columns.
*   paddedOutside - IF true --> add padding outside the board.
* Component functionality - display grid layout of history board which render icon corresponding to the winner board each round.
* ============================================================
*/ 
const HistoryBoard = ({ items, padded, rows = 6, cols, paddedOutside }) => {
    let currentCols = cols;
    const [useCharacter, setUseCharacter] = useState(false);

    const maxCol = Math.max.apply(Math, items.map((item) => { return item.x; }))

    let colsDifference = 0;

    if (maxCol > currentCols) {
        colsDifference = maxCol - currentCols;
        currentCols = maxCol;
    }

    const grid = [];
    const gridRows = [];
    for (let y = 1; y <= rows; y++) {
        const gridItem = [];
        for (let x = 1; x <= currentCols; x++) {

            const content = items.filter(item => item.x === x && item.y === y);

            let hidden = x <= colsDifference ? true : false;

            const itemClasses = cx({
                item: true,
                hidden: hidden,
                padded: padded
            });

            gridItem.push(
                <div key={`item-${x}-${y}`} className={itemClasses}>
                    {content.length > 0 && content[0].icon &&
                        <Icon icon={content[0].icon} className={styles.icon} />
                    }
                    {content.length > 0 && content[0].text !== '' && !useCharacter ?
                        <span className={styles.text}>{content[0].text}</span>
                        :
                        content.length > 0 && content[0].character !== '' && useCharacter ?
                        <span className={styles.text}>{content[0].character}</span>
                        : null
                    }
                </div>
            )
        }
        let gridRow = React.createElement("div", {
            className: styles.row,
            style: { gridTemplateColumns: `repeat(${cols}, 1fr)` },
            key: `row-${y}`
        }, gridItem);
        gridRows.push(gridRow);
    }
    grid.push(gridRows);

    const containerClasses = cx({
        container: true,
        paddedOutside: paddedOutside
    });

    return (
        <div className={containerClasses} onClick = { () => { setUseCharacter( (prevState) => !prevState)}}>
            <div className={styles.grid}>
                {grid}
            </div>
        </div>
    )
}

HistoryBoard.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        icon: PropTypes.string.isRequired,
        text: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
    })),
    padded: PropTypes.bool,
    rows: PropTypes.number,
    cols: PropTypes.number.isRequired,
    paddedOutside: PropTypes.bool
}

export default HistoryBoard;