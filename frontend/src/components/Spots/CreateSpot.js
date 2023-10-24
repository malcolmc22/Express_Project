function CreateSpot() {

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
              <input placeholder="Country" />
            </div>
            <div>
              Street Address
              <input placeholder="Address" />
            </div>
            <div>
              City
              <input placeholder="City" />
            </div>
            <div>
              State
              <input placeholder="STATE" />
            </div>
            <div>
              Latitude
              <input placeholder="Latitude" />
            </div>
            <div>
              Longitude
              <input placeholder="Longitude" />
            </div>
          </div>
          <div className="description-container">
            <h2>Describe your place to guests</h2>
            <div>
              Mention the best features of your space, any special amenities
              like fast wifi or parking, and what you love about the
              neighborhood.
              <input placeholder="Please write at least 30 characters" />
            </div>
          </div>
          <div className="title-container">
            <h2>Create a title for your spot</h2>
            <div>
              Catch guests' attention with a spot title that highlights what
              makes your place special
              <input placeholder="Name of your spot" />
            </div>
          </div>
          <div className="price-container">
            <h2>Set a base price for your spot</h2>
            <div>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
              <div>
                $ <input placeholder="Price per night (USD)" />
              </div>
            </div>
          </div>
          <div className="url-container">
            <h2>Liven up your spot with photos</h2>
            <div>
              Submit a link to at least one photo to publish your spot.{" "}
              <div>
                <input placeholder="Preview Image URL" />
                <input placeholder="Image URL" />
                <input placeholder="Image URL" />
                <input placeholder="Image URL" />
                <input placeholder="Image URL" />
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
