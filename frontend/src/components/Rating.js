import React from "react";

function Rating({ rating, text }) {
  return (
    <div className='rating'>
      <span style={{ color: "#FFDF00" }}>
        {rating <= 0 ? (
          <i className='far fa-star'></i>
        ) : rating >= 1 ? (
          <i className='fas fa-star'></i>
        ) : (
          <i className='fas fa-star-half-alt'></i>
        )}
      </span>
      <span style={{ color: "#FFDF00" }}>
        {rating <= 1 ? (
          <i className='far fa-star'></i>
        ) : rating >= 2 ? (
          <i className='fas fa-star'></i>
        ) : (
          <i className='fas fa-star-half-alt'></i>
        )}
      </span>
      <span style={{ color: "#FFDF00" }}>
        {rating <= 2 ? (
          <i className='far fa-star'></i>
        ) : rating >= 3 ? (
          <i className='fas fa-star'></i>
        ) : (
          <i className='fas fa-star-half-alt'></i>
        )}
      </span>
      <span style={{ color: "#FFDF00" }}>
        {rating <= 3 ? (
          <i className='far fa-star'></i>
        ) : rating >= 4 ? (
          <i className='fas fa-star'></i>
        ) : (
          <i className='fas fa-star-half-alt'></i>
        )}
      </span>
      <span style={{ color: "#FFDF00" }}>
        {rating <= 4 ? (
          <i className='far fa-star'></i>
        ) : rating >= 5 ? (
          <i className='fas fa-star'></i>
        ) : (
          <i className='fas fa-star-half-alt'></i>
        )}
      </span>
    </div>
  );
}

export default Rating;
