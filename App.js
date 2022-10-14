import React, { useEffect } from "react";
import Routes from "./shared/components/Routes/Routes";
import WindowResize from "./shared/hooks/WindowResize";

import './App.scss';

import TokenChecker from './shared/functional/tokenExpCheck';
import AsyncRouting from './shared/functional/asyncRedirecting';

const App = () => {

  const windowResize = WindowResize();

  useEffect(() => {

    // Get the viewport of device
    let vh = window.innerHeight * 0.01;
    
    // Set the a new root property
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    
    document.getElementsByTagName('body')[0].style.marginTop = '0px';

  }, [windowResize]);

  return (
    <TokenChecker>
      <AsyncRouting>
        <Routes />
      </AsyncRouting>
    </TokenChecker>
  );
}

export default App;