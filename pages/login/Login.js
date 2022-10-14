import React, {useState} from 'react';

import TextField from '@material-ui/core/TextField';
import AuthLayout from '../../shared/components/AuthLayout/AuthLayout';
import Logo from '../../shared/components/Logo/Logo';
import Button from '../../shared/components/Button/Button';
import Terms from '../../shared/components/Terms/Terms';
import LinkButton from '../../shared/components/LinkButton/LinkButton';

import formStyles from '../../shared/styles/form.module.scss';
import styles from './Login.module.scss';

import {useDispatch, useSelector} from "react-redux";
import { errorActions } from '../../store/error-slice';
import { loginUser } from "../../store/actions/auth-actions";
import { useHistory } from 'react-router';

const CHAR_LIMIT = 35;
const forbidden_characters = /[¥¢£$%^*()|~=`{}[\]:";'<>?,/\\]/;

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const errorState = useSelector( state => state.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChangeHandler = (value) => {
        errorState.isError && dispatch(errorActions.clearError());
        if(value.length <= CHAR_LIMIT && !forbidden_characters.test(value)){
            setEmail(value)
        }
    }

    const passwordChangeHandler = (value) => {
        errorState.isError && dispatch(errorActions.clearError());
        if(value.length <= CHAR_LIMIT){
            setPassword(value)
        }
    }

    const loginHandler = (event) => {
        event.preventDefault()

        if(!email.length || !password.length){
            dispatch(errorActions.setCustomErrorMSG('Please enter your email and password.'));
        }else{
            let credentials = {
                email: email,
                password: password
            }
            dispatch(loginUser(credentials));
        }
    }

    return (
        <AuthLayout>
            <form action="" method="" className={formStyles.form}>
                <Logo />
                <div className={formStyles.wrapper}>
                    <div className={formStyles.inputs}>
                        <div className={formStyles.input}>
                            <TextField 
                                id="email" 
                                label="Email" 
                                type="email"
                                fullWidth 
                                onChange = { (event) => {emailChangeHandler(event.target.value)}}
                                value={email}
                            />
                        </div>
                        <div className={formStyles.input}>
                            <TextField 
                                id="password" 
                                label="Password"
                                type="password" 
                                fullWidth
                                value = {password}
                                onChange = { (event) => {passwordChangeHandler(event.target.value)}} 
                            />
                        </div>
                        {errorState.isError && <span className={formStyles.error}>{errorState.frontendErrorMSG}</span>}
                    </div>
                    <div className={styles.footer}>
                        <Button text="Login" type="submit" onClick={(event) => { loginHandler(event) }}  />
                        {/* <LinkButton onClick={() => { history.push('/register') }} className={styles.link}>Join for free</LinkButton> */}
                    </div>
                </div>
            </form>
            <Terms />
        </AuthLayout>
    );
}

export default Login;