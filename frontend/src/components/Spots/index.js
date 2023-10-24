import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as spotActions from "../../store/spots";
import { Route, useHistory } from "react-router-dom";

function Spots() {
  const history = useHistory();
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(spotActions.getSpotsThunk());
  }, [dispatch]);

  // if (whyNotWork[0] !== null) {
  //   whyNotWork.map(({ id }) => {
  //     console.log(id, "loop test");
  //   });
  // }
  return (
    <div>
      <ul>
        {allSpots[0] &&
          allSpots.map(
            ({ id, previewImage, city, state, price, avgRating, name }) => (
              <div key={id} id={id} onClick={ () => history.push(`/spots/${id}`)}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbeLjSzrw7sjmGjAIoq_6F0oKgkrbTLGGaD6rnTcDytg&s"  />
                <div className="spot-info-container">
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