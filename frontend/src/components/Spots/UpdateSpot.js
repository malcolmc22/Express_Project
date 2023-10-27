import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createSpotThunk,
  createSpotImageThunk,
  getSpotByIdThunk,
} from "../../store/spots";
import { useParams } from "react-router-dom/";

import { updateSpotThunk, addSpotImageThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";

function UpdateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId)).then(() => setIsLoaded(true));
  }, [dispatch]);
const spot= useSelector((state) => state.spots.spots[0])
  //   const test = useSelector((state) => state.spots)
  // put this in a use effect, and make it so that when the state changes, it does the thing
  useEffect(() => {
    if (spot) {
      setCountry(spot.country)
      setAddress(spot.address)
      setCity(spot.city)
      setState(spot.state)
      setDescription(spot.description)
      setName(spot.name)
      setPrice(spot.price)
    }
  }, [spot])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const spotData = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };
    const updatedSpot = await dispatch(updateSpotThunk(spotData, spotId));

    if (updatedSpot) {
      // const spotImageData = {
      //   id: updatedSpot.id,
      //   url: previewImg,
      //   preview: true,
      // };
      // const newPreviewImage = await dispatch(addSpotImageThunk(spotImageData));
      // const img1 = { id: updatedSpot.id, url: imgUrl1, preview: false };
      // if (imgUrl1) await dispatch(addSpotImageThunk(img1));
      // const img2 = { id: updatedSpot.id, url: imgUrl2, preview: false };
      // if (imgUrl2) await dispatch(addSpotImageThunk(img2));
      // const img3 = { id: updatedSpot.id, url: imgUrl3, preview: false };
      // if (imgUrl3) await dispatch(addSpotImageThunk(img3));
      // const img4 = { id: updatedSpot.id, url: imgUrl4, preview: false };
      // if (imgUrl4) await dispatch(addSpotImageThunk(img4));

      history.push(`/spots/${updatedSpot.id}`);
    } else {
      console.log("spot was not created");
    }
  };
  // if (oldCountry === undefined) {
  //   return null;
  // }
  return (
    <div>
      <div>
        <h1> Update your Spot </h1>
        <h2>Where's your place located?</h2>
        <div>
          Guests will only get your exact address once they booked a
          reservation.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="location-container">
            <div>
              Country
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
            </div>
            <div>
              Street Address
              <input
                placeholder="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              City
              <input
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              State
              <input
                placeholder="STATE"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          <div className="description-container">
            <h2>Describe your place to guests</h2>
            <div>
              Mention the best features of your space, any special amenities
              like fast wifi or parking, and what you love about the
              neighborhood.
              <input
                placeholder="Please write at least 30 characters"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="title-container">
            <h2>Create a title for your spot</h2>
            <div>
              Catch guests' attention with a spot title that highlights what
              makes your place special
              <input
                placeholder="Name of your spot"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="price-container">
            <h2>Set a base price for your spot</h2>
            <div>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
              <div>
                ${" "}
                <input
                  placeholder="Price per night (USD)"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="button-container">
            <button type="submit">Update Spot</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSpot;
