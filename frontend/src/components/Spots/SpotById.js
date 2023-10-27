import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useEffect, useState } from "react";
import * as reviewActions from "../../store/reviews"
import OpenModalButton from "../OpenModalButton";
import CreateReview from "../Reviews/CreateReview";
const SpotbyId = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [reviewsLoaded, setReviewsLoaded] = useState(false)
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => Object.values(state.spots)[0]);
  const reviews = useSelector((state) => Object.values(state.reviews));
  // console.log('spots', spots[0])
  // console.log()
  const currUserId = useSelector((state) => state.session.user)
  // console.log('spots', spots)
  // const hasReview = reviews? reviews.find((review) => review.User.id === currUserId) : []
  console.log('reviews', reviews)

  useEffect(() => {
    dispatch(spotActions.getSpotByIdThunk(spotId)).then(() => setIsLoaded(true))
    dispatch(reviewActions.getReviewsBySpotIdThunk(spotId)).then(() => setReviewsLoaded(true))
  }, [dispatch])
  // if (spots) console.log(spots[0].numReviews, 'spots in component')
  // console.log(spotId, 'id')
  // const getSpot = () => {
  //   if (spots) {
  //     const currentSpot = spots.find((spot) => spot.id === Number(spotId));
  //     // console.log(spots[0].id, 'id test')
  //     // console.log(spotId, 'spot id test'
  //     console.log(currentSpot, "curr spot");
  //     return currentSpot;
  //   }
  // };
  // const {id, name} = spots;
  if (isLoaded === false) return null;
  if (!reviews[0] === null ) return null;
  return (
    <div>
      {isLoaded && reviewsLoaded && spots[0] && (
        <div>
          <h1>{spots[0].name}</h1>
          <h3>{spots[0].city},{spots[0].state},{spots[0].country} </h3>
          <div className="image-container">
            {spots[0].SpotImages && spots[0].SpotImages.map(({url}) => (
              // {console.log(image.url, 'img')}
              <img key={url} src={url} />
            ))}
          </div>
          <div className="info-container">
              <h2>Hosted by { isLoaded && spots[0].Owner.firstName} { isLoaded && spots[0].Owner.lastName}</h2>
              <div>{spots[0].description}</div>
              <div className="reserve-container">
                <div>${spots[0].price}night</div>
                <div> <i className="fa-solid fa-star"></i>{spots[0].avgRating?.toFixed(1)}</div>
                <div>{ spots[0].numReviews > 1 ? `· ${spots[0].numReviews} Reviews` : spots[0].numReviews === 1 ? `· ${spots[0].numReviews} Review` : 'New'}</div>
                <button onClick={() => alert('Feature Coming Soon...')}> Reserve </button>
              </div>
          </div>
          <div className="reviews-container">
            {currUserId && !(reviews.find((review) => review.User.id === currUserId.id)) && spots[0].ownerId !== currUserId.id && <OpenModalButton spotId={spotId} buttonText='Post Your Review' modalComponent={<CreateReview />}/>}
            <h3> <i className="fa-solid fa-star"></i>{spots[0].avgRating?.toFixed(1)} { spots[0].numReviews > 1 ? `· ${spots[0].numReviews} Reviews` : spots[0].numReviews === 1 ? `· ${spots[0].numReviews} Review` : 'New'}</h3>
              {reviewsLoaded && reviews[0] && reviews?.map((review) => (

                <div key={review?.id} className="review-container">
                 <div>{review.User.firstName} </div>
                 <div>{new Date(review.createdAt).toDateString()}</div>
                 <div>{review.review}</div>
                </div>
              ))}
              {!reviews[0] && spots[0].ownerId !== currUserId?.id && <div>Be the first to post a review!</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotbyId;
