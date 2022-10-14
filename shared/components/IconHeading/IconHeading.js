import React from 'react';

import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import styles from './IconHeading.module.scss';

/*
* =============================Icon Heading specs===============================
* Props
*   icon - value of selected icon to render.
*   heading - display as heading title.
* Component - Rendered the corresponding icon and heading title, used as title on other component.
* ==============================================================================
*/
const IconHeading = ({ icon, heading }) => {
    return (
        <header className={styles.header}>
            <Icon icon={icon} className={styles.icon} />
            <h2 className={styles.heading}>{heading} </h2>
        </header>
    )
}

IconHeading.propTypes = {
    icon: PropTypes.string,
    heading: PropTypes.string
}

export default IconHeading;