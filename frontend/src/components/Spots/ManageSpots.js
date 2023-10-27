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
        <ul>
            {allSpots[0] && isLoaded &&
            allSpots.map(
                ({ id, previewImage, city, state, price, avgRating, name }) => (
                <div key={id} id={id} >
                    {/* {console.log(previewImage, 'this is prevew for', id)} */}

                    <div className="spot-info-container" onClick={ () => history.push(`/spots/${id}`)}>
                    <img src={previewImage ? previewImage : 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg'}/>
                    <p>
                        {city}, {state}
                    </p>
                    <p>{avgRating}</p>
                    <p>{price}</p>
                    </div>
                    <div className="update-and-delete-container">
                        <button onClick={() => history.push(`/spots/${id}/update`)}>Update</button>
                        <button onClick={() => history.push(`/spots/${id}/delete`)}>Delete</button>
                    </div>
                </div>
                )
            )}
        </ul>
    </div>
  );
}

export default ManageSpots;
