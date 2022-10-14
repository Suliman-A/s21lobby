import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';
let cx = classNames.bind(styles);

/*
* =============================Checkbox specs===============================
* Props
*   label - display information corresponding of checkbox purpose (Example: accept terms and condition)
*   id - html id value.
*   check - boolean, IF true --> component check.
*   className - contain style class for checkbox.
* Component functionality - Render checkbox and corresponding props.
* ===========================================================================
*/ 
const Checkbox = ({ label, id, checked = false, className }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const labelClasses = cx({
        label: true,
        [className]: className
    });

    /*
    * =============================handleChange===============================
    * Functionality - Toogle isChecked
    * ========================================================================
    */ 
    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className={labelClasses} htmlFor={id}>
            <input type="checkbox" className={styles.input} checked={isChecked} onChange={handleChange} id={id} />
            <span className={styles.checkmark}>
            </span>
            {label}
        </label>
    )
}

Checkbox.propTypes = {
    label: PropTypes.node,
    id: PropTypes.string,
    checked: PropTypes.bool,
    className: PropTypes.string
}

export default Checkbox;