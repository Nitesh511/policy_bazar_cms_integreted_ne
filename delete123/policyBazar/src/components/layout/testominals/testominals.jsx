import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

const testimonials = [
  {
    name: "John Doe",
    description: "Policybazar Nepal has the best insurance policies. I am extremely satisfied with their services."
  },
  {
    name: "Jane Smith",
    description: "Great experience! The customer support was very helpful and the process was smooth."
  },
  {
    name: "David Lee",
    description: "Highly recommend Policybazar Nepal for their comprehensive and affordable insurance plans."
  },
  {
    name: "Emily Johnson",
    description: "A fantastic platform with a wide range of policies. It was easy to compare and choose the right one for me."
  },
  {
    name: "Michael Brown",
    description: "The website is user-friendly and the team is very supportive. I found the perfect policy without any hassle."
  },
  {
    name: "Sarah Wilson",
    description: "Excellent service and very reliable. I will definitely recommend it to others."
  },
  {
    name: "Chris Martin",
    description: "Quick and easy process with great customer support. Highly satisfied!"
  },
  {
    name: "Patricia Taylor",
    description: "Very informative and user-friendly platform. Found the best policy for my needs."
  },
  {
    name: "James Anderson",
    description: "Outstanding experience with Policybazar Nepal. Very happy with my purchase."
  }
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const itemsPerSlide = isMediumScreen ? 3 : 1;
        return (prevIndex + 1) % Math.ceil(testimonials.length / itemsPerSlide);
      });
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [isMediumScreen]);

  const itemsPerSlide = isMediumScreen ? 3 : 1;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-center text-2xl font-bold mb-4">Read trusted reviews from our customers</h2>
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
        >
          {Array.from({ length: Math.ceil(testimonials.length / itemsPerSlide) }).map((_, i) => (
            <div key={i} className={`w-full flex-shrink-0 flex ${isMediumScreen ? 'space-x-4' : ''} px-4`}>
              {testimonials.slice(i * itemsPerSlide, i * itemsPerSlide + itemsPerSlide).map((testimonial, index) => (
                <div key={index} className="flex-1 bg-white p-6 rounded-lg shadow-md">
                  <p className="text-lg italic">"{testimonial.description}"</p>
                  <p className="mt-4 font-bold text-right">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
