import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { deleteSpotThunk } from "../../store/spots";
import './Reviews.css'
import { deleteReviewThunk } from "../../store/reviews";

function DeleteReview () {
    const {reviewId, spotId} = useParams()
    // console.log('delete id', spotId)
    const history = useHistory();
    const dispatch = useDispatch();
    const onDelete = async (e) => {
        const deleteSpot = await dispatch(deleteReviewThunk(reviewId))
        history.push(`/spots/${spotId}`)
    }
    return (
        <>
        <div className="delete-container">
            <div className="delete-review-title"> Confirm Delete </div>
            <div className="delete-review-desc">Are you sure you want to delete this review?</div>
            <button  className='yes-button' onClick={() => onDelete()}> Yes (Delete Review)</button>
            <button className='no-button' onClick={() => history.push(`/spots/${spotId}`)}> No (Keep Review)</button>
        </div>
        </>
    )
}

export default DeleteReview
