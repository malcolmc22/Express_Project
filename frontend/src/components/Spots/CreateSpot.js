import { useState } from "react";

function CreateSpot() {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [desc, setDesc] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [previewImg, setPreviewImg] = useState();
    const [imgUrl1, setImgUrl1] = useState();
    const [imgUrl2, setImgUrl2] = useState();
    const [imgUrl3, setImgUrl3] = useState();
    const [imgUrl4, setImgUrl4] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
    }
  return (
    <div>
      <div>
        <h1> Create a new Spot </h1>
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
            <div>
              Latitude
              <input
                placeholder="Latitude"
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div>
              Longitude
              <input
                placeholder="Longitude"
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="price-container">
            <h2>Set a base price for your spot</h2>
            <div>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
              <div>
                $ <input
                    placeholder="Price per night (USD)"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="url-container">
            <h2>Liven up your spot with photos</h2>
            <div>
              Submit a link to at least one photo to publish your spot.{" "}
              <div>
                <input
                    placeholder="Preview Image URL"
                    type="url"
                    value={previewImg}
                    onChange={(e) => setPreviewImg(e.target.value)}
                />
                <input
                    placeholder="Image URL"
                    type="url"
                    value={imgUrl1}
                    onChange={(e) => setImgUrl1(e.target.value)}
                />
                <input
                    placeholder="Image URL"
                    type="url"
                    value={imgUrl2}
                    onChange={(e) => setImgUrl2(e.target.value)}
                />
                <input
                    placeholder="Image URL"
                    type="url"
                    value={imgUrl3}
                    onChange={(e) => setImgUrl3(e.target.value)}
                />
                <input
                    placeholder="Image URL"
                    type="url"
                    value={imgUrl4}
                    onChange={(e) => setImgUrl4(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="button-container">
            <button type="submit">
                Create Spot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSpot;
