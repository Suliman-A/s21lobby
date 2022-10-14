import {createSlice} from '@reduxjs/toolkit';

//NOTE: UI MESSAGE IS NOT nECESSARILY FOR ERRORS

const userInitialState = {
    balance: 0,
    currency: '',
    email: '',
    name: '',
    phone: '',
    id: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUser(state, actions) {
            state.balance = actions.payload.balance;
            state.currency = actions.payload.currency;
            state.email = actions.payload.email;
            state.name = actions.payload.name;
            state.phone = actions.payload.phone;
            state.id = actions.payload.id;
        },
        setBalance(state, actions){
            state.balance = actions.payload;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice;
