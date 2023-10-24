import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";
import * as reviewActions from "../../store/reviews"
const SpotbyId = () => {

  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => Object.values(state.spots)[0]);
  const reviews = useSelector((state) => Object.values(state.reviews));
  console.log('reviews', reviews)
  useEffect(() => {
    dispatch(spotActions.getSpotByIdThunk(spotId))
    dispatch(reviewActions.getReviewsBySpotIdThunk(spotId))
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
  return (
    <>
      {spots && reviews && (
        <div>
          <h1>{spots[0].name}</h1>
          <h3>{spots[0].city},{spots[0].state},{spots[0].country} </h3>
          <div className="image-container">
            {spots[0].SpotImages.map(({url}) => (
              // {console.log(image.url, 'img')}
              <img src={url} />
            ))}
          </div>
          <div className="info-container">
              <h2>Hosted by {spots[0].Owner.firstName} {spots[0].Owner.lastName}</h2>
              <div>a bunch of stuff about the spot here</div>
              <div className="reserve-container">
                <div>${spots[0].price}night</div>
                <div> <i className="fa-solid fa-ranking-star"/>{spots[0].avgRating}</div>
                <div>{spots[0].numReviews}</div>
                <button onClick={() => alert('Feature Coming Soon...')}> Reserve </button>
              </div>
          </div>
          <div className="reviews-container">
            <h3> <i className="fa-solid fa-ranking-star"/>{spots.avgRating}  {spots[0].numReviews}</h3>
              {reviews.map((review) => (
                <div key={review.id} className="review-container">
                 <div>{review.User.firstName}</div>
                 <div>{new Date(review.createdAt).toDateString()}</div>
                 <div>{review.review}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SpotbyId;
