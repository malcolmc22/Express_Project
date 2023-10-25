import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/getSpots';
const GET_SPOT_BY_ID = '/spots/:spotId'
const CREATE_SPOT = '/spots/new'

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

    console.log('create spot res', res)
    if (res.ok) {
        const data = await res.json();
        console.log(data, 'this is ok data')
        return data
    } else {
        const errors = await res.json();
        console.log(errors, 'this is errors')
        return errors
    }
}

const initialState = { spots: null}

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SPOTS: {
            const spotsState = {};
            // console.log(action.spots.Spots, 'this is action')
            action.spots.Spots.forEach(spot => {
                spotsState[spot.id] = spot
            });
            return spotsState;
        }
        case GET_SPOT_BY_ID: {
            return action.spot
        }

        default: {
        return state;
    }
    }
}

export default spotsReducer
