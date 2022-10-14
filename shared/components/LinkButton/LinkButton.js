import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './LinkButton.module.scss';
let cx = classNames.bind(styles);

/*
* =============================Link button specs===============================
* Props
*   classname - contain style class for link button style.
*   children - childs are icon and title that corresponding to functionality.
*   onClick - redirect to other page.
* Component - render links under the menu dropdown component.
* =============================================================================
*/
const LinkButton = ({ className, children, onClick }) => {
    const linkClasses = cx({
        link: true,
        [className]: className
    });
    return (
        <button type="button" onClick={onClick} className={linkClasses}>
            {children}
        </button>
    )
}

LinkButton.propTypes = {
    onClick: PropTypes.func,
    classNames: PropTypes.string,
    children: PropTypes.node
}

export default LinkButton;