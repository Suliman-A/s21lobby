import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './InfoTitle.module.scss';
let cx = classNames.bind(styles);

/*
* =============================Info Title specs===============================
* Props
*   label - display the type title of information.
*   value - amount of money, the value is corrensponding to the label information.
*   left - IF true --> element position to left.
*   right - IF true --> element position to right.
*   className - contain style class for info title component.
*   ref - reference from parent component to set the value of current balance of player.
* Component functionality - display information about player's total bet, baccarat bet range amount & player balance.
* ===============================================================================
*/ 
const InfoTitle = forwardRef(({ label, value, left, right, className }, ref) => {
    const titleClasses = cx({
        title: true,
        left: left,
        right: right,
        [className]: className
    });
    return (
        <h2 ref={ref} className={titleClasses}>{label} <strong>{value}</strong></h2>
    )
});

InfoTitle.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    left: PropTypes.bool,
    right: PropTypes.bool,
    className: PropTypes.string,
    tooltipText: PropTypes.string
}

export default InfoTitle;