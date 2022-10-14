import React from 'react';

import Icon from '../Icon/Icon';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './Wrapper.module.scss';
let cx = classNames.bind(styles);

/*
* ======================Wrapper component specs========================
* Props
*   children - rendered child node components (Example: Header).
*   className - contain styles class for flexiblity layout of wrapper.
* Component functionality - Parent element rendered the child elements.
* ====================================================================
*/ 
const Wrapper = ({ children, className }) => {
    const wrapperClasses = cx({
        wrapper: true,
        [className]: className
    });
    return (
        <div className={wrapperClasses}>{children}</div>
    )
}

Icon.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

export default Wrapper;