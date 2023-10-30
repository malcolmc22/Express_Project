import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { makeReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
function CreateReview() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

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
  useEffect(() => {}, [dispatch]);
  const onSubmit = async (e) => {
    // e.preventDefault()
    const createdReview = {
      review,
      stars,
    };
    const newReview = await dispatch(makeReviewThunk(createdReview, spotId));
    if (newReview.id) {
      closeModal();
    } else {
      setErrors(newReview);
      // console.log(newReview)
    }
    // console.log(newReview,'new review')
    // if(!newReview) {
    //   setErrors(newReview)
    // }
  };
  return (
    <form id='create-review-form' className="review-modal" onSubmit={onSubmit}>
      <div className="create-review-title">How was your stay?</div>
      {errors.errors && <div>{errors.errors.review}</div>}
      <textarea
        id="create-review"
        name="create-review"
        form='create-review-form'
        className="review-input"
        placeholder="Leave your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <div className="stars-container">
        <div className="star-count-icon-container">
          <div className="star-icon-container">
            <i className="fa-solid fa-star fa-lg" />
          </div>
          {<div className="star-count-container"> Stars: {stars} </div>}
        </div>
        <div className="up-down-container">
          <div className="up-arrow-container" onClick={(e) => setStars(stars === 5 ? 5 : stars + 1)}>
            {" "}
            <i
              // onClick={(e) => setStars(stars === 5 ? 5 : stars + 1)}
              className="fa-solid fa-arrow-up"
            />
          </div>
          <div className="down-arrow-container" onClick={(e) => setStars(stars === 1 ? 1 : stars - 1)}>
            <i
              // onClick={(e) => setStars(stars === 1 ? 1 : stars - 1)}
              className="fa-solid fa-arrow-down"
            />
          </div>
          {/* {<div className="star-count-container"> Stars: {stars} </div>} */}
        </div>
      </div>
      <button  className='submit-review-button' type="submit" disabled={review.length < 10 || stars < 1}>
        Submit Your Review
      </button>
    </form>
  );
}

export default CreateReview;
