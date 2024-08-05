import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768);
  const [testo, setTesto] = useState([]);

  useEffect(() => {
    const fetchTestoData = async () => {
      try {
        const response = await fetch(`${ process.env.STRAPI_API}/api/testomonials?populate=*`, {
          headers: {
            Authorization: "Bearer cb6977f556ef939cc2dec9cffef081aec6784cd62adc7e6fff50f20f9e56610703876a424ddf177b7fbb8c26887bb280c09fffc955c4999fc8f0a8ff114699e7c1609e6734313c75c535f9addb25d4ca0fe737bdbe2c3cbfae0fea39e12fc134925fb539e3a4767880808f98f4051fa09d75db181eb16f5abca3575ddf69837c",
          },
        });
        const result = await response.json();
        if (result && result.data) {
          setTesto(result.data);
        }
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchTestoData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const itemsPerSlide = isMediumScreen ? 3 : 1;
        return (prevIndex + 1) % Math.ceil(testo.length / itemsPerSlide);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isMediumScreen, testo.length]);

  const itemsPerSlide = isMediumScreen ? 3 : 1;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const itemsPerSlide = isMediumScreen ? 3 : 1;
      return (prevIndex + 1) % Math.ceil(testo.length / itemsPerSlide);
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const itemsPerSlide = isMediumScreen ? 3 : 1;
      return (
        (prevIndex - 1 + Math.ceil(testo.length / itemsPerSlide)) %
        Math.ceil(testo.length / itemsPerSlide)
      );
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-center text-3xl font-bold font-sans">
          Read trusted reviews from our customers
        </h2>
      </div>
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({
            length: Math.ceil(testo.length / itemsPerSlide),
          }).map((_, i) => (
            <div
              key={i}
              className={`w-full flex-shrink-0 flex ${
                isMediumScreen ? "space-x-4" : ""
              } px-4`}
            >
              {testo
                .slice(i * itemsPerSlide, i * itemsPerSlide + itemsPerSlide)
                .map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-white p-6 rounded-lg shadow-md"
                  >
                    <p className="text-lg italic font-sans">
                      "{truncateText(testimonial.attributes.description, 100)}"
                    </p>
                    <p className="mt-4 font-bold text-right font-sans">
                      - {testimonial.attributes.name}
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={handlePrev}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
