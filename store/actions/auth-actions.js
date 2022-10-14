import {login, logout, extendToken} from "../../shared/functional/apiEndpoints"
import {errorActions}  from "../error-slice"
import {authActions} from "../auth-slice"
import { uiActions } from "../ui-slice"

export const loginUser = (credentials) => {
    return async (dispatch) => { 
        
        // dispatch(uiActions.setLoading(true));
        // dispatch(errorActions.clearError());
        //console.log(credentials)
        const sendRequest = async () => {

            const response = await fetch(
                login, 
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
                token: data.uuid,
                valid_to: data.valid_to
            }));
            dispatch(uiActions.redirectUser({
                isRedirect: true,
                path: '/lobby'
            }));
            // dispatch(getUser(true));

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

/* 
Token = {
    uuid: **************,
    valid_to: date_time
}
*/
export const logoutUser = (token) => {
    return async (dispatch) => { 

        // dispatch(uiActions.setLoading(true));
        dispatch(errorActions.clearError());

        const sendRequest = async () => {

            const response = await fetch(
                logout, 
                {method:'POST', headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(token),
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

            //logout and redirect user here

            // dispatch(authActions.login({//store token in local storage
            //     token: data.token
            // }));
            
            // dispatch(getUser(true));

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

/* 
Token = {
    uuid: **************,
    valid_to: date_time
}
*/
export const extendValidTo = (token_info) => {
    return async (dispatch) => { 

        // dispatch(uiActions.setLoading(true));
        // dispatch(errorActions.clearError());

        console.log('EXTENDING TOKEN! ' + token_info);

        const sendRequest = async () => {

            const response = await fetch(
                extendToken, 
                {method:'POST', headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(token_info),
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
            dispatch(authActions.login({//store new token information
                token: data.uuid,
                valid_to: data.valid_to
            }));
        }catch (err){
            console.log(err)
            console.log(err.status + ' ' + err.statusText);
      
            // dispatch(errorActions.errorHandler({
            //     errorCode: err.status,
            //     errorMessage: err.statusText
            // }));
        }

        //dispatch(uiActions.setLoading(false));
    };
}

export const checkAuth = () => {
    return (dispatch) => { 

        const token = sessionStorage.getItem('token');
        const token_exp = sessionStorage.getItem('token_exp');

        if(token){
            dispatch(authActions.login({
                token: token,
                valid_to: token_exp
            }));
        }else{
            dispatch(authActions.setAuthState(false));
        }
    };
}

//TEST ACTION TO START THE GAME
// export const startGame = () => {
//     return async (dispatch) => { 

//         let table_info = JSON.parse(sessionStorage.getItem('current_table'));

//         const sendRequest = async () => {

//             const response = await fetch(
//                 'https://yijkvsw4cb.execute-api.eu-central-1.amazonaws.com/dev/api/admin/conductor/start-game', 
//                 {method:'POST', headers:{'table-id': table_info.id}
//             });
        
//             console.log(response)
//             console.log(response.status)
//             console.log('HERE = ' + response.ok)

//             if(!response.ok){
//                 throw response;
//             }
//             return response;
//         }

//         try{
//             await sendRequest();
//         }catch (err){
//             console.log(err)
//             console.log(err.status + ' ' + err.statusText);
//         }
//     };
// }

export const startGame = () => {
    return async (dispatch) => { 

        let table_info = JSON.parse(sessionStorage.getItem('current_table'));

        console.log(table_info)
        const sendRequestStartGAme = async () => {

            const response = await fetch(
                'https://yijkvsw4cb.execute-api.eu-central-1.amazonaws.com/dev/api/admin/conductor/start-game?table-id=' + table_info.id, 
                {method:'GET'
            });
        
            console.log(response)
            console.log(response.status)
            
            if(!response.ok){
                throw response;
            }
            return response;
        }

        const sendRequestBots = async () => {

            const response = await fetch(
                'https://yijkvsw4cb.execute-api.eu-central-1.amazonaws.com/dev/api/admin/sim-players/start?table-id=' + table_info.id + '&offset=0&limit=10', 
                {method:'GET'
            });
        
            console.log(response)
            console.log(response.status)
            
            if(!response.ok){
                throw response;
            }
            return response;
        }

        try{
            await sendRequestStartGAme();
        }catch (err){
            console.log(err)
            console.log(err.status + ' ' + err.statusText);
        }

        try{
            await sendRequestBots();
        }catch (err){
            console.log(err)
            console.log(err.status + ' ' + err.statusText);
        }
    };
}