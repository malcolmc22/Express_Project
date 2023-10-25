import { useState } from "react";

function CreateReview() {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  return (
    <form>
      <h1>How was your stay?</h1>
      <input
        type="text"
        placeholder="Leave your review here..."
        // value={review}
        // onChange={(e) => setReview(e.target.value)}
      />
      <div className="stars-container">

      </div>
    </form>
  );
}

export default CreateReview;
