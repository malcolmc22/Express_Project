import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { deleteSpotThunk } from "../../store/spots";

function DeleteSpot () {
    const {spotId} = useParams()
    // console.log('delete id', spotId)
    const history = useHistory();
    const dispatch = useDispatch();
    const onDelete = async (e) => {
        const deleteSpot = await dispatch(deleteSpotThunk(spotId))
        history.push('/spots/current')
    }
    return (
        <>
        <div className="delete-container">
            <h1> Confirm Delete </h1>
            <div>Are you sure you want to remove this spot from the listings?</div>
            <button onClick={() => onDelete()}> Yes (Delete Spot)</button>
            <button onClick={() => history.push('/spots/current')}> No (Keep Spot)</button>
        </div>
        </>
    )
}

export default DeleteSpot
