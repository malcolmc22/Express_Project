import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import SpotbyId from "./components/Spots/SpotById";
import Spots from "./components/Spots";
import * as spotActions from './store/spots'
import * as reviewActions from './store/reviews'
import CreateSpot from "./components/Spots/CreateSpot";
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
        <Route exact path='/' isLoaded={isLoaded} component={Spots} />
        <Route exact path="/spots/:spotId" isLoaded={isLoaded} component={SpotbyId}/ >
        <Route  path='/spots' component={CreateSpot} />
      </Switch>}
    </>
  );
}

export default App;
