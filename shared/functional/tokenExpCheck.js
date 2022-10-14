import {useSelector, useDispatch} from 'react-redux';
import {useCallback, useEffect} from 'react';


// import {useHistory, useLocation } from "react-router-dom";

import {extendValidTo} from '../../store/actions/auth-actions';

//Extends token timeout 30 seconds before expiration
const TokenChecker = ({children}) => {
    const dispatch = useDispatch();
    
    const token_expiration_time = useSelector( (state) => state.auth.valid_to);
    const token = useSelector( (state) => state.auth.token);

    useEffect( () => {

        if(token_expiration_time){
            const now = new Date();
            const timer = Date.parse(token_expiration_time) - now.getTime() - 30000;

            //CALL EXTEND TOKEN HERE
            setTimeout(() => { 
                dispatch(extendValidTo({
                    uuid: token,
                    valid_to: token_expiration_time
                }))
            }, timer);
        }

    }, [token_expiration_time]);
    

    return children;
}

export default TokenChecker