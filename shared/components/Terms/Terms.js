import React from 'react';
import PropTypes from 'prop-types';

import styles from './Terms.module.scss';

/*
* ======================Terms component specs=========================
* Props
*   text - copy rights of company.
* Component functionality - rendered corresponding props displaying the copy rights.
* ====================================================
*/ 
const Terms = ({ text = "© 2021. All rights rederved" }) => {
    return (
        <div className={styles.terms}>{text}</div>
    )
}

Terms.propTypes = {
    text: PropTypes.string
}

export default Terms;