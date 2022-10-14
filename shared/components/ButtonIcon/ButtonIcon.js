import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

import classNames from 'classnames/bind';
import styles from './ButtonIcon.module.scss';
let cx = classNames.bind(styles);

/*
* ==================Button icon component specs=======================
* Props
*   icon - string value to get the corresponding icon.
*   label - used for HTML aria-label attribute
*   onClick - function that pass from parent component and the functionality is corresponding of the parent component.
*   className - contain style class for button design.
*   active - boolean, IF true --> Icon color turn to white.
* Component functionality - Rendered button icon and operate functionality base on props.
* ====================================================================
*/ 
const ButtonIcon = ({ icon, label, onClick, className, active }) => {
    const buttonClasses = cx({
        button: true,
        active: active,
        [className]: className
    });
    return (
        <button type="button" className={buttonClasses} aria-label={label} onClick={onClick}>
            <Icon icon={icon} className={styles.icon} />
        </button>
    )
}

ButtonIcon.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    active: PropTypes.bool
}

export default ButtonIcon;