import React, { useState, useEffect } from 'react';

const SliderComponent = ({ pictureSources }) => {
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

  // Function to update the index and loop back to the first image if needed
  const updateIndex = () => {
    setCurrentPictureIndex((prevIndex) =>
      prevIndex === pictureSources.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Start the interval when the component mounts
    const interval = setInterval(updateIndex, 3000); // Change the interval time as per your requirement

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handlePrevClick = () => {
    const prevIndex =
      currentPictureIndex === 0 ? pictureSources.length - 1 : currentPictureIndex - 1;
    setCurrentPictureIndex(prevIndex);
  };

  const handleNextClick = () => {
    const nextIndex =
      currentPictureIndex === pictureSources.length - 1 ? 0 : currentPictureIndex + 1;
    setCurrentPictureIndex(nextIndex);
  };

  return (
    <div className="slider-box-container border rounded p-2">
      <div
        id="slider-box"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ height: '300px', width: '100%', overflow: 'hidden' }}
      >
        <div className="carousel-inner" style={{ height: '100%', width: '100%' }}>
          {pictureSources.map((src, index) => (
            <div
              key={index}
              className={`carousel-item ${index === currentPictureIndex ? 'active' : ''}`}
              style={{ height: '100%', width: '100%' }}
            >
              <img
                src={src}
                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                className="d-block w-100"
                alt={`Picture ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          className={`carousel-control-prev btn bg-transparent border-0 ${
            pictureSources.length === 1 ? 'd-none' : ''
          }`}
          type="button"
          data-bs-target="#slider-box"
          data-bs-slide="prev"
          onClick={handlePrevClick}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className={`carousel-control-next btn bg-transparent border-0 ${
            pictureSources.length === 1 ? 'd-none' : ''
          }`}
          type="button"
          data-bs-target="#slider-box"
          data-bs-slide="next"
          onClick={handleNextClick}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default SliderComponent;