import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const Rating = ({ onChange, filled, total }) => {
  const [value, setValue] = useState(filled);
  const sliderRef = useRef(null);

  useEffect(() => {
    setValue(filled);
  }, [filled]);

  const handleMouseMove = (e) => {
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let newValue = Math.round((x / rect.width) * total);
    if (newValue < 0) newValue = 0;
    if (newValue > total) newValue = total;
    setValue(newValue);
  };

  const handleMouseUp = () => {
    onChange(value);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="rating-slider-container">
      <div
        ref={sliderRef}
        className="rating-slider"
        onMouseDown={handleMouseDown}
      >
        <div
          className="rating-slider-track"
          style={{ width: `${(value / total) * 100}%` }}
        />
        <div
          className="rating-slider-thumb"
          style={{ left: `${(value / total) * 100}%` }}
        />
      </div>
      <div className="rating-value">{value}</div>
    </div>
  );
};

export default Rating;
