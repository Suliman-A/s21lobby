import {user} from "../../shared/functional/apiEndpoints";
// import { loginUser } from "./auth-actions";
import {errorActions}  from "../error-slice";
import { uiActions } from "../ui-slice";
import { authActions } from "../auth-slice";
import {userActions} from "../user-slice";

export const registerUser = (credentials) => {
    return async (dispatch) => { 
        
        // dispatch(uiActions.setLoading(true));
        // dispatch(errorActions.clearError());
        console.log(credentials)
        const sendRequest = async () => {

            const response = await fetch(
                user, 
                {method:'POST', headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
            });
        
            console.log(response)
            console.log(response.status)
            
            if(!response.ok){
                throw response;
            }
            const data = await response.json();
            return data;
        }

        try{
            const data = await sendRequest();

            console.log(data)
            
            dispatch(authActions.login({//store token in local storage
                token: data.token.uuid,
                valid_to: data.token.valid_to
            }));
            dispatch(uiActions.redirectUser({
                isRedirect: true,
                path: '/register-success'
            }));
            sessionStorage.setItem('is_new_user', true);
            // dispatch(getUser(true));

        }catch (err){
            console.log(err)
            console.log(err.status + ' ' + err.statusText);
      
            dispatch(errorActions.errorHandler({
                errorCode: err.status,
                errorMessage: err.statusText,
                frontendErrorMSG: 'Email or phone already existz`'
            }));
        }

        //dispatch(uiActions.setLoading(false));
    };
}

export const getUser = () => {

    const token = sessionStorage.getItem('token');

    return async (dispatch) => { 
        
        // dispatch(uiActions.setLoading(true));
        // dispatch(errorActions.clearError());
        const sendRequest = async () => {

            const response = await fetch(
                user, 
                {method:'GET', headers:{'Authorization': `token ${token}`}}
            );
        
            console.log(response)
            console.log(response.status)
            
            if(!response.ok){
                throw response;
            }
            const data = await response.json();
            return data;
        }

        try{
            const data = await sendRequest();

            console.log(data)
            dispatch(userActions.setUser(data))

        }catch (err){
            console.log(err)
            console.log(err.status + ' ' + err.statusText);
      
            dispatch(errorActions.errorHandler({
                errorCode: err.status,
                errorMessage: err.statusText
            }));
        }

        //dispatch(uiActions.setLoading(false));
    };
}