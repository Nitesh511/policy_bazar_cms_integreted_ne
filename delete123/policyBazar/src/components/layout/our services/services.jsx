import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import '../CSS/layout.css';


const OurServices = () => {
  const [services, setServices] = useState([]);
  let mySwiper = null;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/products?populate=*');
        const result = await response.json();

        if (result && result.data) {
          setServices(result.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    if (services.length > 0) {
      mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        },
      });
    }

    // Cleanup function
    return () => {
      if (mySwiper) {
        mySwiper.destroy(true, true);
      }
    };
  }, [services]); // Run effect when services change

  const getBadgeColor = (index) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
    return colors[index % colors.length];
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.slice(0, maxLength)}...`;
  };

  return (
    <div className="py-4 px-4 sm:px-8 mt-10 text-white text-lg">
      <div className="flex justify-center items-center">
        <h1 className="text-center text-black text-4xl font-display">Our Services</h1>
      </div>
      <div className="swiper-container custom-carousel overflow-hidden">
        <div className="swiper-wrapper cursor-grabbing">
          {services.map((service, index) => (
            <div className="swiper-slide relative" key={index}>
              <div
                className="bg-cover bg-center h-full flex flex-col justify-end p-4"
                style={{
                  backgroundImage: `url('http://localhost:1337${service.attributes.image.data.attributes.url}')`,
                  opacity: '0.8', // Adjust opacity as needed
                }}
              >
                <div className={`absolute top-16 -left-0 transform -translate-x-2/2 -translate-y-1/2 p-1 ${getBadgeColor(index)} text-white rounded-md`}>
                  {service.attributes.title}
                </div>
                <p className="text-white relative bottom-4 left-4 right-4">{truncateDescription(service.attributes.description, 140)}</p>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default OurServices;
