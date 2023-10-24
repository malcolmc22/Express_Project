import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";

const SpotbyId = () => {

  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots.Spots);

  useEffect(() => {
    dispatch(spotActions.getSpotByIdThunk(spotId))
  }, [dispatch])
  console.log(spots, 'spots')
  // console.log(spotId, 'id')
  const getSpot = () => {
    if (spots) {
      const currentSpot = spots.find((spot) => spot.id === Number(spotId));
      // console.log(spots[0].id, 'id test')
      // console.log(spotId, 'spot id test'
      console.log(currentSpot, "curr spot");
      return currentSpot;
    }
  };
  // const {id, name} = getSpot();
  return (
    <>
      {getSpot() && (
        <div>
          <h1>{getSpot().name}</h1>
          <h2>{getSpot().city},{getSpot().state},{getSpot().country} </h2>
          <div className="image-container">

          </div>
        </div>
      )}
    </>
  );
};

export default SpotbyId;
