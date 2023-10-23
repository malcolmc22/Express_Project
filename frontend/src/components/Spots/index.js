import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as spotActions from "../../store/spots";

function Spots() {
  const dispatch = useDispatch();
  const whyNotWork = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(spotActions.getSpotsThunk());
  }, []);

  // console.log(whyNotWork, "test");

  if (whyNotWork[0] !== null) {
    whyNotWork.map(({ id }) => {
      console.log(id, "loop test");
    });
  }
  return (
    <div>
      <ul>
        {whyNotWork[0] &&
          whyNotWork.map(
            ({ id, previewImage, city, state, price, avgRating }) => (
              <div key={id}>
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
