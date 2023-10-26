import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/getSpots';
const GET_SPOT_BY_ID = '/spots/:spotId'
const CREATE_SPOT = '/spots/new'
const CREATE_SPOT_IMAGE ='/spots/image'
const GET_SPOTS_OWNED_BY_USER = 'spots/current';

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

export const getSpotById = (spot) => {
    return {
        type:GET_SPOT_BY_ID,
        spot
    }
}

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const createSpotImage = (image) => {
    return {
        type: CREATE_SPOT_IMAGE,
        image
    }
}

export const getSpotsOwnedByUser = (spots) => {
    return {
        type: GET_SPOTS_OWNED_BY_USER,
        spots
    }
}


export const getSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    const data = await res.json();
    // console.log('this is sptos', data)
    dispatch(getSpots(data));
    return res
}

export const getSpotByIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    const data = await res.json();
    // console.log('this is spot data', data)
    dispatch(getSpotById(data))
    return data
}

export const createSpotThunk = (payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    // console.log('create spot res', res)
    if (res.ok) {
        const data = await res.json();
        console.log(data, 'this is ok data')
        dispatch(createSpot(data))
        return data
    } else {
        const errors = await res.json();
        // console.log(errors, 'this is errors')
        return errors
    }
}

export const createSpotImageThunk = (payload) => async (disaptch) => {
    const res = await csrfFetch('/api/spot-images', {
        method: 'POST',
        body: JSON.stringify(payload)
    })

    console.log ('spot img res', res)
}

export const getSpotsOwnedByUserThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
    const data = await res.json();
    // console.log('all the spots', data);
    dispatch(getSpotsOwnedByUser(data))
    return data
}
const initialState = { }

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SPOTS: {
            const spotsState = {...state};
            // console.log(action.spots.Spots, 'this is action')
            action.spots.Spots.forEach(spot => {
                spotsState[spot.id] = spot
            });
            return spotsState;
        }
        case GET_SPOT_BY_ID: {
            return action.spot
        }
        case CREATE_SPOT: {
            const newState = {...state}
            console.log(newState, 'new state in create')
            newState[action.spot.id] = action.spot
            return newState
        }
        case GET_SPOTS_OWNED_BY_USER: {
            const newState = {}
            // console.log(action, 'action')
            action.spots.Spots.forEach(spot => {
                console.log('this is a spot', spot)
                newState[spot.id] = spot
            });
            return newState
        }
        default: {
            return state;
    }
    }
}

export default spotsReducer
