import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useEffect, useState } from "react";
import * as reviewActions from "../../store/reviews"
import OpenModalButton from "../OpenModalButton";
import CreateReview from "../Reviews/CreateReview";
import { useHistory } from "react-router-dom";
import './SpotById.css'
const SpotbyId = () => {
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false)
  const [reviewsLoaded, setReviewsLoaded] = useState(false)
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => Object.values(state.spots)[0]);
  const reviews = useSelector((state) => Object.values(state.reviews));
  const sortedReviews = reviews?.sort(function(a,b) {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
  // console.log(sortedReviews, 'test')
  // console.log('spots', spots[0])
  // console.log()
  const currUserId = useSelector((state) => state.session.user)
  // console.log('spots', spots)
  // const hasReview = reviews? reviews.find((review) => review.User.id === currUserId) : []
  // console.log('reviews', reviews)

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
    <div >
      {isLoaded && reviewsLoaded && spots[0] && (
        <div className="spot-by-id-container">
          <div className="spot-by-id-title">{spots[0].name}</div>
          <div className="spot-by-id-header">{spots[0].city},{spots[0].state},{spots[0].country} </div>


            <div className="image-container">
            {spots[0].SpotImages && spots[0].SpotImages.map(({url, preview}) => (
              // {console.log(image.url, 'img')}
              <div className={`spot-by-id-image-${preview}`}> <img key={url} src={url} /> </div>
            ))}
          </div>

          {/* <div className="info-container"> */}
              <div className="host-container">Hosted by { isLoaded && spots[0].Owner.firstName} { isLoaded && spots[0].Owner.lastName}</div>
              <div className="spot-by-id-description-container">{spots[0].description}</div>
              <div className="reserve-container">
                <div className="stars-reviews-containers">
                <div className="spot-by-id-price">${spots[0].price} night</div>
                <div className="spot-by-id-star-container"> <i className="fa-solid fa-star"></i>{spots[0].avgRating?.toFixed(1)}</div>
                <div className="spot-by-id-reviews">{ spots[0].numReviews > 1 ? `· ${spots[0].numReviews} Reviews` : spots[0].numReviews === 1 ? `· ${spots[0].numReviews} Review` : 'New'}</div>
{/* </div> */}
                </div>
                <button className='reserve-button' onClick={() => alert('Feature Coming Soon...')}> Reserve </button>
              </div>
              {/* <div className="divider"> </div> */}
          <div className="reviews-container">
            {/* {currUserId && !(reviews.find((review) => review.User.id === currUserId.id)) && spots[0].ownerId !== currUserId.id && <OpenModalButton spotId={spotId} buttonText='Post Your Review' modalComponent={<CreateReview />}/>} */}
            <div className="spot-by-id-reviews-count"> <div className="star-and-reviews"><i className="fa-solid fa-star"></i>{spots[0].avgRating?.toFixed(1)} { spots[0].numReviews > 1 ? `· ${spots[0].numReviews} Reviews` : spots[0].numReviews === 1 ? `· ${spots[0].numReviews} Review` : 'New'}</div></div>
            {currUserId && !(reviews.find((review) => review.User.id === currUserId.id)) && spots[0].ownerId !== currUserId.id && <div className="spot-by-id-post-review-container"><OpenModalButton spotId={spotId} buttonText='Post Your Review' modalComponent={<CreateReview />}/> </div>}
              {reviewsLoaded && reviews[0] && reviews?.map((review) => (
                <div key={review?.id} className="review-container">
                 <div className="reviewers-firstname-container">{review.User.firstName} </div>
                 <div className="review-created-container">{new Date(review.createdAt).toDateString()}</div>
                 <div className="spot-by-id-review-container">{review.review}</div>
                 {review?.userId === currUserId?.id && <button className='spot-by-id-delete-review-button' onClick={() => history.push(`/spots/${spotId}/reviews/${review?.id}/delete`)}>Delete</button>}
                </div>
              )).sort((a,b) => a.createdAt - b.createdAt)}
              {!reviews[0] && spots[0].ownerId !== currUserId?.id && <div className="no-reviews-container">Be the first to post a review!</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotbyId;
