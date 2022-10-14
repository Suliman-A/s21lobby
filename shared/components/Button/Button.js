import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';
let cx = classNames.bind(styles);

/*
* =============================Button specs===============================
* Props
*   type - value is html type (Example: submit or button)
*   text - display on button innerText
*   onClick - functionality is corresponding to the parent component purpose (Example: Login page).
*   className - contain style class for button design.
* Component functionality - Rendered button and corresponding props.
* ========================================================================
*/ 
const Button = ({ type, text, onClick, className }) => {
    const buttonClasses = cx({
        button: true,
        [className]: className
    });
    return (
        <button type={type} className={buttonClasses} onClick={onClick}>{text}</button>
    )
}

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
}

export default Button;