import React from 'react';
import Icon from '../Icon/Icon';
import styles from './Logo.module.scss';

/*
* ======================Logo specs========================
* Component - rendered logo.
* ===============================================================
*/
const Logo = () => {
    return (
        <Icon className={styles.logo} icon="logo" />
    )
}

export default Logo;