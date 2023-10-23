import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as spotActions from "../../store/spots";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Spots() {
  const history = useHistory();
  const dispatch = useDispatch();
  const whyNotWork = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(spotActions.getSpotsThunk());
  }, []);


  // if (whyNotWork[0] !== null) {
  //   whyNotWork.map(({ id }) => {
  //     console.log(id, "loop test");
  //   });
  // }
  return (
    <div>
      <ul>
        {whyNotWork[0] &&
          whyNotWork.map(
            ({ id, previewImage, city, state, price, avgRating, name }) => (
              <div key={id} >
                <p>{id}</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbeLjSzrw7sjmGjAIoq_6F0oKgkrbTLGGaD6rnTcDytg&s" />
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
        <li>test</li>
      </ul>
    </div>
  );
}

export default Spots;
