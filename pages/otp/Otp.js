import React from 'react';

import TextField from '@material-ui/core/TextField';
import AuthLayout from '../../shared/components/AuthLayout/AuthLayout';
import Logo from '../../shared/components/Logo/Logo';
import Button from '../../shared/components/Button/Button';
import Terms from '../../shared/components/Terms/Terms';
import Icon from '../../shared/components/Icon/Icon';
import Loader from '../../shared/components/Loader/Loader';

import formStyles from '../../shared/styles/form.module.scss';
import styles from './Otp.module.scss';

const Otp = () => {
    return (
        <AuthLayout>
            <form action="" method="" className={formStyles.form}>
                <Logo />
                <div className={formStyles.wrapper}>
                    <p className={formStyles.message}>A text message with verification code was sent to **************</p>
                    <div className={styles.otp}>
                        <label id="otp-digits" className={formStyles.label}>OTP:</label>
                        <div className={styles.inline}>
                            <div className={styles.input}>
                                <TextField id="otp-digit-1" type="tel" fullWidth aria-labelledby="otp-digits" />
                            </div>
                            <div className={styles.input}>
                                <TextField id="otp-digit-2" type="tel" fullWidth aria-labelledby="otp-digits" />
                            </div>
                            <div className={styles.input}>
                                <TextField id="otp-digit-3" type="tel" fullWidth aria-labelledby="otp-digits" />
                            </div>
                            <div className={styles.input}>
                                <TextField id="otp-digit-4" type="tel" fullWidth aria-labelledby="otp-digits" />
                            </div>
                            <div className={styles.input}>
                                <TextField id="otp-digit-5" type="tel" fullWidth aria-labelledby="otp-digits" />
                            </div>
                            <div className={styles.input}>
                                <TextField id="otp-digit-6" type="tel" fullWidth aria-labelledby="otp-digits" />
                            </div>
                        </div>
                        <button type="button" className={styles.refreshButton}>
                            <Icon icon="refresh" className={styles.refreshIcon} />
                        </button>
                    </div>
                    <Button text="Verify" type="submit" onClick={() => { console.log('submit button clicked'); }} />
                </div>
            </form>
            <Terms />
            <Loader />
        </AuthLayout>
    );
}

export default Otp;