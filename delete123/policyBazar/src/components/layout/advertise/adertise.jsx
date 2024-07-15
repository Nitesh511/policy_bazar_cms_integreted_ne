import React, { useState, useEffect } from 'react';
import shiftpixel from "../../../assets/shiftpixel.png";

const Advertisement = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { image: shiftpixel },
    { image: shiftpixel },
    { image: shiftpixel },
    { image: shiftpixel },
    { image: shiftpixel },
    { image: shiftpixel },
    { image: shiftpixel },
    { image: shiftpixel },
    { image: shiftpixel },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200 w-full py-2">
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeSlide * 33.33}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden my-4">
                <img src={slide.image} alt={`Slide ${index}`} className="w-full h-auto" />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 mx-1 rounded-full ${index === activeSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
