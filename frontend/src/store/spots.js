import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/getSpots';
const GET_SPOT_BY_ID = '/spots/:spotId'

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
