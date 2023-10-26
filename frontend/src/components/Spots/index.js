import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as spotActions from "../../store/spots";
import { Route, useHistory } from "react-router-dom";
import './Spots.css'
function Spots() {
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(spotActions.getSpotsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // if (whyNotWork[0] !== null) {
  //   whyNotWork.map(({ id }) => {
  //     console.log(id, "loop test");
  //   });
  // }
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

export default Spots;
