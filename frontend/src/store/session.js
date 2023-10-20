import { csrfFetch } from "./csrf";

const SET_SESSION = 'session/setSessionUser';
const REMOVE_SESSION = 'session/removeSessionUser';

export const setSessionUser = (user) => {
    return {
        type: SET_SESSION,
        user
      };
}

export const removeSessionUser = () => {
    return {
        type: REMOVE_SESSION,
    }
}

export const signupThunk = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const res = await csrfFetch('/api/users', {
        method:'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
        })
    })
    const data = await res.json();
    dispatch(setSessionUser(data.user));
    return res
}

export const setSessionUserThunk = (user) => async (dispatch) => {
    const { credential, password } = user
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })

    if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch(setSessionUser(data.user))
        return res
    }
}

export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    dispatch(setSessionUser(data.user));
    return res;
}

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION:{
            const newState = {...state}
            newState.user = action.user
            return newState;
        }
        case REMOVE_SESSION:{
             const newState = {};
             newState.user = null;
            return newState
        }
        default:
            return state;
    }
}

export default sessionReducer;
