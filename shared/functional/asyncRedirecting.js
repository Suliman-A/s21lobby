import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { useHistory } from "react-router";
import { uiActions } from "../../store/ui-slice";

/*================Component Wrapper Specs=======================
* Listens for a redirect state
* Listens for a change in url --> if the user exits the game - exit table + clear state
*/
const AsyncRouting = ({children}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const redirectState = useSelector ( (state) => state.ui.redirectState);
    const [isInGame, setisInGame] = useState(false);

    useEffect( () => {
        return history.listen((location) => { 
            if(location.pathname === '/' && !isInGame){
                setisInGame(true);
            }   
            if(location.pathname !== '/' && isInGame){
                setisInGame(false);

                //Change Back Body CSS
                document.getElementsByTagName('body')[0].classList.remove('gameHeight');
                console.log('remove body')
            }
         }) 
    }, [history, isInGame]);

    useEffect( ()=> {
        if(redirectState.isRedirect){
            history.replace(redirectState.path)
            dispatch(uiActions.redirectUser({
                isRedirect: false,
                path: ''
            }))
        }
    }, [redirectState, history, dispatch]);

    return children;
}

export default AsyncRouting;