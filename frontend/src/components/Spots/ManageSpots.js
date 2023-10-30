import { useDispatch, useSelector } from "react-redux";
import { getSpotsOwnedByUserThunk } from "../../store/spots";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import UpdateSpot from "./UpdateSpot";
import DeleteSpot from "./DeleteSpot";

function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const allSpots = useSelector((state) => Object.values(state.spots.spots));
  useEffect(() => {
    dispatch(getSpotsOwnedByUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);
  // if (allSpots.length === 0) {
  //   return null;
  // }

  // console.log("all spots owned", allSpots);

  // const test =
  // console.log(' component test' , test)
  return (
      <div>
        <h1 className="manage-spot-title"> Manage Spots </h1>
        <div className="all-spots-container">
            {allSpots[0] && isLoaded &&
            allSpots.map(
                ({ id, previewImage, city, state, price, avgRating, name }) => (
                <div key={id} id={id} >
                    {/* {console.log(previewImage, 'this is prevew for', id)} */}

                    <div title={name} className="spot-info-container" onClick={ () => history.push(`/spots/${id}`)}>
                    <img src={previewImage ? previewImage : 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg'}/>
                    <div className="spot-text-container">
                    <div className="spot-rating"><i className="fa-solid fa-star"></i> {avgRating ? avgRating.toFixed(1) : 'New'}</div>
                      <div className="spot-cty-state">
                        {city}, {state}
                      </div>

                      <div className="spot-price">${price} night</div>
                    </div>
                    </div>
                    <div className="update-and-delete-container">
                        <button className='update-button' onClick={() => history.push(`/spots/${id}/update`)}>Update</button>
                        <button className='delete-button' onClick={() => history.push(`/spots/${id}/delete`)}>Delete</button>
                    </div>
                </div>
                )
            )}
        </div>
        {!allSpots[0] && <button className='manage-spot-button' onClick={() => history.push('/spots')}> Create a New Spot</button>}

    </div>
  );
}

export default ManageSpots;
