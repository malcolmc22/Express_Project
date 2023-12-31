import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSpotThunk,
  createSpotImageThunk,
  addSpotImageThunk,
} from "../../store/spots";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./NewSpot.css";
function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  // states
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [previewImg, setPreviewImg] = useState();
  const [imgUrl1, setImgUrl1] = useState();
  const [imgUrl2, setImgUrl2] = useState();
  const [imgUrl3, setImgUrl3] = useState();
  const [imgUrl4, setImgUrl4] = useState();
  const [errors, setErrors] = useState({});

  //   submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const spotData = {
      address,
      city,
      state,
      country,
      lat: lat || 1.1,
      lng: lng || 1.1,
      name,
      description,
      price,
      previewImg,
    };
    // console.log(previewImg)
    // console.log(lng)
    const newSpot = await dispatch(createSpotThunk(spotData));
    // console.log('newSpot' , newSpot.id)
    if (newSpot.id) {
      const spotImageData = { id: newSpot.id, url: previewImg, preview: true };
      const newPreviewImage = await dispatch(addSpotImageThunk(spotImageData));
      const img1 = { id: newSpot.id, url: imgUrl1, preview: false };
      if (imgUrl1) await dispatch(addSpotImageThunk(img1));
      const img2 = { id: newSpot.id, url: imgUrl2, preview: false };
      if (imgUrl2) await dispatch(addSpotImageThunk(img2));
      const img3 = { id: newSpot.id, url: imgUrl3, preview: false };
      if (imgUrl3) await dispatch(addSpotImageThunk(img3));
      const img4 = { id: newSpot.id, url: imgUrl4, preview: false };
      if (imgUrl4) await dispatch(addSpotImageThunk(img4));

      history.push(`/spots/${newSpot.id}`);
    } else {
      // console.log('spot was not created', newSpot.errors)
      setErrors(newSpot.errors);
    }
  };
  return (
    <div>
      <div className="new-spot-container">
        <h1 className="new-spot-title"> Create a new Spot </h1>
        <div className="new-spot-header">Where's your place located?</div>
        <div className="new-spot-desc">
          Guests will only get your exact address once they booked a
          reservation.
        </div>
        <form id='create-spot-form' onSubmit={handleSubmit}>
          <div className="location-container">
            <div>
              Country  {errors.country && (
              <div className="create-errors">{errors.country}</div>
            )}
              <input
                className="country-input"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
               {/* {errors.country && (
              <div className="create-errors">{errors.country}</div>
            )} */}
            </div>
            {/* {errors.country && (
              <div className="create-errors">{errors.country}</div>
            )} */}
            <div>
              Street Address
              {errors.address && (
              <div className="create-errors">{errors.address}</div>
            )}
              <input
                className="address-input"
                placeholder="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
               {/* {errors.address && (
              <div className="create-errors">{errors.address}</div>
            )} */}
            </div>
            {/* {errors.address && (
              <div className="create-errors">{errors.address}</div>
            )} */}
            <div className="city-container">
              City
              {errors.city && <div className="create-errors">{errors.city}</div>}
              <input
                className="city-input"
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {/* {errors.city && <div className="create-errors">{errors.city}</div>} */}
            </div>
            {/* {errors.city && <div className="create-errors">{errors.city}</div>} */}
            <div className="state-container">
              State
              {errors.state && (
              <div className="create-errors">{errors.state}</div>
            )}
              <input
                className="state-input"
                placeholder="STATE"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              {/* {errors.state && (
              <div className="create-errors">{errors.state}</div>
            )} */}
            </div>
            {/* {errors.state && (
              <div className="create-errors">{errors.state}</div>
            )} */}
            {/* <div>
              Latitude
              <input
                placeholder="Latitude"
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </div>
            <div>
              Longitude
              <input
                placeholder="Longitude"
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </div> */}
          </div>
          <div className="description-container">
            <div className="new-spot-header">Describe your place to guests</div>
            <div className="new-spot-desc">
              Mention the best features of your space, any special amenities
              like fast wifi or parking, and what you love about the
              neighborhood.
              {errors.description && (
            <div className="create-errors">{errors.description}</div>
          )}
              <textarea
              id="create-spot"
              name="create-spot"
              form='create-spot-form'
                className="desc-input"
                placeholder="Please write at least 30 characters"

                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* {errors.description && (
            <div className="create-errors">{errors.description}</div>
          )} */}
          </div>
          {/* {errors.description && (
            <div className="create-errors">{errors.description}</div>
          )} */}
          <div className="title-container">
            <div className="new-spot-header">Create a title for your spot</div>
            <div className="new-spot-desc">
              Catch guests' attention with a spot title that highlights what
              makes your place special
              {errors.name && <div className="create-errors">{errors.name}</div>}
              <input
                className="name-input"
                placeholder="Name of your spot"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          {/* {errors.name && <div className="create-errors">{errors.name}</div>} */}
          <div className="price-container">
            <div className="new-spot-header">
              Set a base price for your spot
            </div>
            <div className="new-spot-desc">
              Competitive pricing can help your listing stand out and rank
              higher in search results.
              {errors.price && <div className="create-errors">{errors.price}</div>}
              <div>
                $
                <input
                  className="price-input"
                  placeholder="Price per night (USD)"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* {errors.price && <div className="create-errors">{errors.price}</div>} */}
          <div className="url-container">
            <div className="new-spot-header">
              Liven up your spot with photos
            </div>
            <div className="new-spot-desc">
              Submit a link to at least one photo to publish your spot.{" "}
              <div>
                <input
                  className="preview-input"
                  placeholder="Preview Image URL"
                  type="url"
                  value={previewImg}
                  required
                  onChange={(e) => setPreviewImg(e.target.value)}
                />
                <input
                  className="image-input"
                  placeholder="Image URL"
                  type="url"
                  value={imgUrl1}
                  onChange={(e) => setImgUrl1(e.target.value)}
                />
                <input
                  className="image-input"
                  placeholder="Image URL"
                  type="url"
                  value={imgUrl2}
                  onChange={(e) => setImgUrl2(e.target.value)}
                />
                <input
                  className="image-input"
                  placeholder="Image URL"
                  type="url"
                  value={imgUrl3}
                  onChange={(e) => setImgUrl3(e.target.value)}
                />
                <input
                  className="image-input"
                  placeholder="Image URL"
                  type="url"
                  value={imgUrl4}
                  onChange={(e) => setImgUrl4(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="new-spot-button-container">
            <button className="new-spot-button" type="submit">
              Create Spot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSpot;
