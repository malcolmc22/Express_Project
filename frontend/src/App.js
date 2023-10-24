import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import SpotbyId from "./components/Spots/SpotById";
import Spots from "./components/Spots";
import * as spotActions from './store/spots'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotActions.getSpotsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path='/' component={Spots} />
        <Route exact path="/spots/:spotId" component={SpotbyId}/ >
      </Switch>}
    </>
  );
}

export default App;
