import { useDispatch, useSelector } from "react-redux";
import { getSpotsOwnedByUserThunk } from "../../store/spots";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const allSpots = useSelector((state) => Object.values(state.spots));
  useEffect(() => {
    dispatch(getSpotsOwnedByUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);
  if (allSpots.length === 0) {
    return null;
  }

  console.log("all spots owned", allSpots);

  // const test =
  // console.log(' component test' , test)
  return (
      <div>
        <ul>
            {allSpots[0] && isLoaded &&
            allSpots.map(
                ({ id, previewImage, city, state, price, avgRating, name }) => (
                <div key={id} id={id} onClick={ () => history.push(`/spots/${id}`)}>
                    {/* {console.log(previewImage, 'this is prevew for', name)} */}

                    <div className="spot-info-container">
                    <img src={previewImage ? previewImage : 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg'}/>
                    <p>
                        {city}, {state}
                    </p>
                    <p>{avgRating}</p>
                    <p>{price}</p>
                    </div>
                </div>
                )
            )}
        </ul>
    </div>
  );
}

export default ManageSpots;
