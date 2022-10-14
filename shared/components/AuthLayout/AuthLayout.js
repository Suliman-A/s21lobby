import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';
import BgImage from '../../../media/temp/temp-bg.jpg';

import styles from './AuthLayout.module.scss';

/*
* =============================Auth layout specs===============================
* Props
*   children - html form element.
* Component functionality - Rendered auth layout component and display corresponding props.
* ==============================================================================
*/ 
const AuthLayout = ({ children }) => {
    return (
        <Wrapper className={styles.wrapper}>
            <div className={styles.background}>
                <img src={BgImage} alt="bg" className={styles.image} />
            </div>
            {children}
        </Wrapper>
    )
}

AuthLayout.propTypes = {
    children: PropTypes.node
}

export default AuthLayout;