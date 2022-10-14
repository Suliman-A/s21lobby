import {createSlice} from '@reduxjs/toolkit';

const authInitialState = {
    isAuthorized: null,
    token: null,
    valid_to: null
}

//TODO: Remove token from state?

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        login(state, actions) {
            state.isAuthorized = true;
            state.token =  actions.payload.token;
            state.valid_to = actions.payload.valid_to;

            sessionStorage.setItem('token', actions.payload.token);
            sessionStorage.setItem('token_exp', actions.payload.valid_to);
        },
        logout(state) {
            sessionStorage.clear();
            state.isAuthorized = false;
        },
        setAuthState(state, actions){
            state.isAuthorized = actions.payload;
        },
        resetState: state => authInitialState
    }
})


export const authActions = authSlice.actions;
export default authSlice;
