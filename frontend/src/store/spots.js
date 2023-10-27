import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/getSpots';
const GET_SPOT_BY_ID = '/spots/:spotId'
const CREATE_SPOT = '/spots/new'
const CREATE_SPOT_IMAGE ='/spots/image'
const GET_SPOTS_OWNED_BY_USER = 'spots/current';
const ADD_SPOT_IMAGE ='/spot/images'
const UPDATE_SPOT = '/spots/:spotId'
const DELETE_SPOT = '/spots/:spotId/delete'

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

export const addSpotImage = (image) => {
    return {
        type: ADD_SPOT_IMAGE,
        image
    }
}

export const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

export const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
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
        console.log(errors, 'this is errors')
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

export const addSpotImageThunk = ({id, url, preview}) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        body: JSON.stringify({
            url,
            preview
        })
    })

    if (res.ok) {
        const data = await res.json();
        console.log('new img data', data)
        return data
    } else {
        const errors = await res.json();
        console.log('new spot img err' , errors)
        return errors
    }
}

export const updateSpotThunk = (payload, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const data = await res.json();
        // console.log('this is updated data', data)
        dispatch(updateSpot(payload))
        return data
    } else {
        const errors = await res.json();
        console.log('this is errors from update', errors);
        return errors
    }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json();
        // console.log('delete data', data)
        dispatch(deleteSpot(spotId))
    } else {
        const errors = await res.json();
        // console.log('delete errors', errors)
        return errors
    }
}
const initialState = { spots: {}}

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SPOTS: {
            // const spotsState = {...state};
            // console.log(spotsState.spots, 'state')
            // console.log(action.spots.Spots, 'this is action')
            // action.spots.Spots.forEach(spot => {
            //     spotsState.spots[spot.id] = spot
            // });
            return {...state, spots: {...action.spots.Spots}}
        }
        case GET_SPOT_BY_ID: {
            // console.log('action spot', ...action.spot.Spots)
            return {...state, spots: {...action.spot.Spots}}
        }
        case CREATE_SPOT: {
            const newState = {...state, spots: {...state.spots}}
            // console.log(newState, 'new state in create')
            // newState[action.spot.id] = action.spot
            console.log(action.spot, 'action spot')
            return {...state, spots: {...state.spots.spots, ...action.spot}}
        }
        // case UPDATE_SPOT: {
        //     const newState = {...state, spots: {...state.spots.spots}}
        //     console.log('state', state.spots.spots)
        //     console.log('action', )
        //     newState[action.spot.id] = action.spot
        //     return newState
        // }
        case GET_SPOTS_OWNED_BY_USER: {
            // const newState = {}
            // // console.log(action, 'action')
            // action.spots.Spots.forEach(spot => {
            //     // console.log('this is a spot', spot)
            //     newState[spot.id] = spot
            // });
            return {...state, spots: {...action.spots.Spots}}
        }
        default: {
            return state;
    }
    }
}

export default spotsReducer
