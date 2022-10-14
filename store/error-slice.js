import {createSlice} from '@reduxjs/toolkit';

/*Expects a payload in the format:
{
    errorMessage: message from backent,
    errorCode: error code from backend
}
*/

const errorInitialState = {
    isError: false,
    errorCode: null,
    frontendErrorMSG: '',
    backendErrorMSG: '',
    isProtected: false
}

const errorSlice = createSlice({
    name: 'error',
    initialState: errorInitialState,
    reducers: {
        errorHandler(state, actions) {
            state.isError = true;
            state.backendErrorMSG = actions.payload.errorMessage;
            state.errorCode = actions.payload.errorCode;

            switch(actions.payload.errorCode){

                case 401: //if not logged in this is the error code for wrong credentials 
                    if(actions.payload.protected){
                        state.isError = false;
                        state.isProtected = true;
                        state.frontendErrorMSG = 'Token Expired';
                    }else{
                        state.frontendErrorMSG = 'Invalid email or password.';
                    }
                    break;
                case 403:
                    state.frontendErrorMSG = 'Invalid verification code.';
                    break;
                case 409:
                    state.frontendErrorMSG = 'Email or phone number already exist.';
                    break;
                case 400:
                    state.frontendErrorMSG = actions.payload.frontendErrorMSG;
                    break;
                case 500:
                    state.frontendErrorMSG = 'Something went wrong.';
                    break;
                case 404:
                    state.frontendErrorMSG = 'Wrong email or password';
                    break;
                default:
                    state.frontendErrorMSG = 'Unhandeled error type: ' + actions.payload.errorCode;
                    break;
            }
        },
        clearError(state) {
            state.isError = false;
            state.errorCode= null;
            state.frontendErrorMSG = '';
            state.backendErrorMSG = '';
        },
        setCustomErrorMSG(state, actions){ //not a backend error - accepts only message
            state.isError = true;
            state.backendErrorMSG = '';
            state.errorCode = null;
            state.frontendErrorMSG = actions.payload
        },
        resetState: state => errorInitialState
    }
})

export const errorActions = errorSlice.actions;
export default errorSlice;
