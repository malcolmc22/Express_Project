import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { makeReviewThunk } from "../../store/reviews";

function CreateReview() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  let test = "fa-regular fa-star";
  function starFill(test) {
    if (test) {
      test = "fa-solid fa-star";
    } else {
      test = "fa-regular fa-star";
    }
  }
  const spotId = useSelector((state) => Object.values(state.spots.spots)[0].id);
  // console.log('spot', spots)
  useEffect(() => {

  }, [dispatch])
  const onSubmit = async (e) => {
    const createdReview = {
      review,
      stars
    }
    const newReview = await dispatch(makeReviewThunk(createdReview, spotId))
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>How was your stay?</h1>
      <input
        type="text"
        placeholder="Leave your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <div className="stars-container">
        <i className="fa-solid fa-star fa-lg" />
        <div className="up-down-container">
            <i onClick={(e) => setStars(stars === 5 ? 5 : stars + 1)} className="fa-solid fa-caret-up" />
            <i onClick={(e) => setStars(stars === 0 ? 0 : stars - 1)} className="fa-solid fa-caret-down" />
            {<div> Stars: {stars} </div>}
        </div>
        <button type="submit" disabled={review.length < 10 || stars < 1}>Submit Your Review</button>
      </div>
    </form>
  );
}

export default CreateReview;
