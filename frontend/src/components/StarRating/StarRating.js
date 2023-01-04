import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./starRating.scss";

export default function StarRating(props) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setRating(props.rating);
  }, [props.rating]);

  return (
    <>
      {[...Array(5)].map((start, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              size={25}
              color={ratingValue <= (hover || rating) ? "gold" : "#eeeeee"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </>
  );
}
