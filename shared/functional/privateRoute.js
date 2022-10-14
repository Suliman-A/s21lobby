import React  from 'react';

import { Redirect, Route } from 'react-router';
import { useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { checkAuth } from "../../store/actions/auth-actions";
//import {authActions} from "store/auth-slice";

/* NOTES:
* props == the array of routes provided
*/


const PrivateRoute = ({ children, ...props }) => {
    const dispatch = useDispatch();
    const isAuthorized = useSelector( (state) => state.auth.isAuthorized);
    //const isLoadingApp = useSelector((state) => state.ui.isLoadingApp);

    useEffect( ()=> {
        if(isAuthorized === null){
            //dispatch(uiActions.setLoadingApp(true));
            dispatch(checkAuth());
        }
    }, [isAuthorized, dispatch])

    return( 
        <Route {...props} render={ _ => {
            if(isAuthorized){
                return children;
            }else if(isAuthorized === false){//!isLoadingApp && isAuthorized === false
                return <Redirect to='/login' />;
            }
        }} />
    );
}

export default PrivateRoute;