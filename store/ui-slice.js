import {createSlice} from '@reduxjs/toolkit';

//NOTE: UI MESSAGE IS NOT nECESSARILY FOR ERRORS

const uiInitialState = {
    isLoading: false, //used for buttons/forms/modal
    uiMessage: '',
    redirectState: {
        isRedirect: false,
        path: ''
    },
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: uiInitialState,
    reducers: {
        setLoading(state, actions) {
            state.isLoading = actions.payload
        },

        setUiMessage(state, actions){
            state.uiMessage = actions.payload;
        },
        removeUiMessage(state, actions){
            state.uiMessage = '';
        },
        redirectUser(state, action){
            state.redirectState.isRedirect = action.payload.isRedirect;
            state.redirectState.path = action.payload.path;
        },
        resetState: state => uiInitialState
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice;
