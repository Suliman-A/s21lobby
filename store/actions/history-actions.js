import {history} from "../../shared/functional/apiEndpoints";
import {errorActions}  from "../error-slice";
import { tablesActions } from "../tables-slice";

export const getHistory = (table_id) => {

    const token = sessionStorage.getItem('token');

    return async (dispatch) => { 
        
        const sendRequest = async () => {

            const response = await fetch(
                history, 
                {
                method:'POST', 
                headers:{'Authorization': `token ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',    
                      }, 
                body: JSON.stringify({table_id})
                }
            );
        
            // console.log(response)
            // console.log(response.status)
            
            if(!response.ok){
                throw response;
            }
            const data = await response.json();
            return data;
        }

        try{
            const data = await sendRequest();
            console.log(data)
            dispatch(tablesActions.setHistory(data))

        } catch (err){
            console.log(err)
            console.log(err.status + ' ' + err.statusText);
      
            dispatch(errorActions.errorHandler({
                errorCode: err.status,
                errorMessage: err.statusText
            }));
        }
    };
}

