import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as spotActions from "../../store/spots";
import { Route, useHistory } from "react-router-dom";
import './Spots.css'
import { Tooltip } from "react-tooltip";
function Spots() {
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.spots ? Object.values(state.spots.spots) : null);

  useEffect(() => {
    dispatch(spotActions.getSpotsThunk()).then(() => setIsLoaded(true));
    // console.log('u hit the dispatch')
  }, [dispatch]);

  // if (whyNotWork[0] !== null) {
  //   whyNotWork.map(({ id }) => {
  //     console.log(id, "loop test");
  //   });
  // }
  return (
    <div>
      <div className="all-spots-container">
        {allSpots && isLoaded &&
          allSpots.map(
            ({ id, previewImage, city, state, price, avgRating, name }) => (
             <div key={id} id={id} onClick={ () => history.push(`/spots/${id}`)}>
                {/* {console.log(previewImage, 'this is prevew for', name)} */}

                  <div className="spot-info-container" title={name}>
                    <img src={previewImage ? previewImage : 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg'}/>

                    <div className="spot-text-container">
                    <div className="spot-rating"><i className="fa-solid fa-star"></i> {avgRating ? avgRating.toFixed(1) : 'New'}</div>
                      <div className="spot-cty-state">
                        {city}, {state}
                      </div>

                      <div className="spot-price">${price} night</div>
                    </div>
                  </div>

              </div>
            )
          )}
      </div>
    </div>
  );
}

export default Spots;
