import React from 'react';

import AuthLayout from '../../../shared/components/AuthLayout/AuthLayout';
import Logo from '../../../shared/components/Logo/Logo';
import Button from '../../../shared/components/Button/Button';
import Terms from '../../../shared/components/Terms/Terms';
import Icon from '../../../shared/components/Icon/Icon';

import formStyles from '../../../shared/styles/form.module.scss';
import styles from './RegisterSuccess.module.scss';

import { useHistory } from 'react-router';

const RegisterSuccess = () => {
    const history = useHistory();
    
    return (
        <AuthLayout>
            <form action="" method="" className={formStyles.form}>
                <Logo />
                <div className={formStyles.wrapper}>
                    <div className={styles.success}>
                        <Icon icon="check" className={styles.successIcon} />
                        <p className={formStyles.message}>Congratulations!<br />Registration has been accepted!<br />Please continue to your profile!</p>
                    </div>
                    <Button text="Continue" type="button" onClick={() => { history.replace('/lobby') }} />
                </div>
            </form>
            <Terms />
        </AuthLayout>
    );
}

export default RegisterSuccess;