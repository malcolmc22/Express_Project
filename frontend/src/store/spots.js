import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/getSpots';

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
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

const initialState = { spots: null}

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SPOTS: {
            const Spots = {};
            // console.log(action.spots.Spots, 'this is action')
            action.spots.Spots.forEach(spot => {
                Spots[spot.id] = spot
            });
            return Spots;
        }
    default: {
        return state;
    }
    }
}

export default spotsReducer
