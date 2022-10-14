import React, {useState, useEffect} from 'react';

import TextField from '@material-ui/core/TextField';
import AuthLayout from '../../shared/components/AuthLayout/AuthLayout';
import Logo from '../../shared/components/Logo/Logo';
import Button from '../../shared/components/Button/Button';
import Terms from '../../shared/components/Terms/Terms';
import Checkbox from '../../shared/components/Checkbox/Checkbox';

import formStyles from '../../shared/styles/form.module.scss';
import styles from './Register.module.scss';

import {useDispatch, useSelector} from "react-redux";
import { errorActions } from '../../store/error-slice';
import validator from 'validator';
import { registerUser } from "../../store/actions/user-actions";

const Register = () => {
    const dispatch = useDispatch();

    const errorState = useSelector( state => state.error);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [termsCheck, setTermsCheck] = useState(true);
    const [termsCheckMessage, setTermsCheckMessage] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, seteValidPassword] = useState(true);

    useEffect( () => {
        dispatch(errorActions.clearError());
    }, [dispatch]);
    
    const nameChangeHandler = (value) => {
        errorState.isError && dispatch(errorActions.clearError());
        setName(value);
    }

    const emailChangeHandler = (value) => {
        errorState.isError && dispatch(errorActions.clearError());
        if ( !validEmail && !validator.isEmail(value)){
            setValidEmail(true)
        }
        setEmail(value)
    }

    const phoneChangeHandler = (value) => {
        const re = /^\+?\d*$/; 
        errorState.isError && dispatch(errorActions.clearError());

        if(re.test(value) || !value.length){
            setPhone(value);
        }
    }

    const passwordChangeHandler = (value) => {
        errorState.isError && dispatch(errorActions.clearError());
        if ( !validPassword && value.length >= 8){
            seteValidPassword(true)
        }
        setPassword(value)
    }

    const focusEmailCheck = () => {
        if(email.length){
            setValidEmail(validator.isEmail(email))
        }
    }

    const focusPasswordCheck = () => {
        if(password.length){
            seteValidPassword(!(password.length < 8))
        }
    }

    const checkHandler = () => {
        let isChecked = termsCheck;
        setTermsCheck(!isChecked);
        setTermsCheckMessage('');
    }

    const registerHandler = (event) => {

        event.preventDefault();

        if(!name.length || !email.length || !phone.length || !password.length){
            dispatch(errorActions.setCustomErrorMSG('Please enter valid user credentials.'));
            return;
        }
        if(!validEmail || !validPassword){
            return;
        }

        if(!termsCheck){
            setTermsCheckMessage('You have to agree to the terms.');
            return;
        }

        let userCredentials = {
            name: name,
            phone: phone,
            email: email,
            password: password
        }
        //console.log(userCredentials)
        dispatch(registerUser(userCredentials))
    }

    return (
        <AuthLayout>
            <form action="" method="" className={formStyles.form}>
                <Logo />
                <div className={formStyles.wrapper}>
                    <div className={formStyles.inputs}>
                        <div className={formStyles.input}>
                            <TextField 
                                id="name" 
                                label="Name" 
                                type="text" 
                                fullWidth 
                                onChange = {(event) =>nameChangeHandler(event.target.value)} 
                                value = {name}
                            />
                        </div>
                        <div className={formStyles.input}>
                            <TextField 
                                id="email" 
                                label="Email" 
                                type="email" 
                                fullWidth 
                                onChange = {(event) =>emailChangeHandler(event.target.value)} 
                                value = {email}
                                onBlur = {focusEmailCheck}
                            />
                            {!validEmail && <span className={formStyles.error}>Please enter a valid email.</span>}
                        </div>
                        <div className={formStyles.input}>
                            <TextField 
                                id="phone" 
                                label="Mobile" 
                                type="tel" 
                                fullWidth 
                                onChange = {(event) => phoneChangeHandler(event.target.value)}  
                                value = {phone}
                            />
                        </div>
                        <div className={formStyles.input}>
                            <TextField 
                                id="password" 
                                label="Password" 
                                type="password" 
                                fullWidth 
                                onChange =  {(event) =>passwordChangeHandler(event.target.value)}
                                onBlur = {focusPasswordCheck}
                            />
                            {!validPassword && <span className={formStyles.error}>Password must be more than 8 characters.</span>}
                        </div>
                    </div>
                    <div className={styles.footer}>
                        {errorState.isError && <span className={formStyles.error}>{errorState.frontendErrorMSG}</span>}
                        {termsCheckMessage.length ? <span className={formStyles.error}>{termsCheckMessage}</span>: null}
                        <Checkbox 
                            id="terms" 
                            label="Terms" 
                            checked={termsCheck}
                            handleChange={checkHandler}
                        />
                        <Button text="Create account" onClick={(event) => { registerHandler(event); }}  />
                    </div>
                </div>
            </form>
            <Terms />
        </AuthLayout>
    );
}

export default Register;