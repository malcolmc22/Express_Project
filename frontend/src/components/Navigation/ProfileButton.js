import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutThunk());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='profile-button' onClick={openMenu}>
        <i className="fas fa-user-ninja" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        <div className="profile-greeting">Hello, {user.firstName}</div>
        <div className="profile-email">{user.email}</div>
        <div className='profile-manage-spots' onClick={() => history.push('/spots/current')}>Manage Spots</div>
        <div className="profile-logout-container">
          <button className='profile-logout' onClick={logout}>Log Out</button>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
