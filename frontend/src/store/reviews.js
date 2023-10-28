
import { csrfFetch } from "./csrf";
const GET_REVIEWS_BY_SPOT_ID = "/reviews/getReviews";
const MAKE_REVIEW = "/reviews/makeReview"
const DELETE_REVIEW ='/reviews/deleteReview'

export const getReviewsBySpotId = (reviews) => {
    return {
        type:GET_REVIEWS_BY_SPOT_ID,
        reviews
    }
}

export const makeReview = (review) => {
  return {
    type: MAKE_REVIEW,
    review
  }
}

export const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

export const makeReviewThunk = (payload,spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const data = await res.json();
    console.log('this is new review data', data)
    return data
  } else {
    const errors = await res.json();
    console.log('this is new review errors', errors)
    return errors
  }
}

export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();
    // console.log('this is spot reviews', data)
    dispatch(getReviewsBySpotId(data))
    return data
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteReview(reviewId))
    return data
  } else {
    const errors = await res.json();
    return errors
  }
}

const initalState = { reviews: {} };

const reviewsReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_SPOT_ID: {
      const reviewsState = {};
      // console.log(Object.values(action.reviews)[0], "this is reviews action");
      Object.values(action.reviews)[0].forEach((review) => {
        reviewsState[review.id] = review;
      });
      return reviewsState;
    }
    case MAKE_REVIEW: {
      return  {...state, reviews:{...state.reviews, ...action.review}}
    }
    case DELETE_REVIEW: {
      const newState = {...state, reviews: {...state.reviews}}
      delete newState.reviews[action.reviewId]
      return newState
    }
    default: {
      return state;
    }
  }
};

export default reviewsReducer;
