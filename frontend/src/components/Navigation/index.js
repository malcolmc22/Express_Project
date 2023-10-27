import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

import { useDispatch } from "react-redux";
import Spots from '../Spots/index';
import { useHistory } from "react-router-dom";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <div onClick={() => history.push('/spots')}>
          Create a New Spot
        </div>
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div>

        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  return (
    <div id="header-container">
      <div>
        <NavLink exact to="/">
        <i className="fa-brands fa-airbnb fa-2xl">Airbnb</i>
        </NavLink>
      </div>
      {<div>{isLoaded && sessionLinks} </div>}
    </div>
  );
}

export default Navigation;
