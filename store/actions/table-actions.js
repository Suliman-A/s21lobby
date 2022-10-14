import {tables} from "../../shared/functional/apiEndpoints";
import {errorActions}  from "../error-slice";
import { tablesActions } from "../tables-slice";

export const getTables = () => {

    const token = sessionStorage.getItem('token');

    return async (dispatch) => { 
        
        // dispatch(uiActions.setLoading(true));
        // dispatch(errorActions.clearError());
        const sendRequest = async () => {

            const response = await fetch(
                tables, 
                {method:'GET',headers:{'Authorization': `token ${token}`}}
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

            dispatch(tablesActions.setTables(data))

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