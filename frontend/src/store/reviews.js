import { csrfFetch } from "./csrf";
const GET_REVIEWS_BY_SPOT_ID = "/reviews/getReviews";

export const getReviewsBySpotId = (reviews) => {
    return {
        type:GET_REVIEWS_BY_SPOT_ID,
        reviews
    }
}

export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();
    console.log('this is spot reviews', data)
    dispatch(getReviewsBySpotId(data))
    return data
}

const initalState = { reviews: null };

const reviewsReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_SPOT_ID: {
      const reviewsState = {};
      console.log(Object.values(action.reviews)[0], "this is reviews action");
      Object.values(action.reviews)[0].forEach((review) => {
        reviewsState[review.id] = review;
      });
      return reviewsState;
    }
    default: {
      return state;
    }
  }
};

export default reviewsReducer;
