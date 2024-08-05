import React, { useEffect, useState } from 'react';
import Swiper from 'swiper/bundle'; // Ensure the correct import based on your Swiper version
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import '../CSS/layout.css';
import { Link } from 'react-router-dom';

const OurServices = () => {
  const [services, setServices] = useState([]);
  let mySwiper = null;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.STRAPI_API}/api/products?populate=*`);
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
        autoplay: {
          delay: 2000, // Duration between slides in milliseconds
          disableOnInteraction: false, // Continue autoplay after user interactions
        },
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
    const colors = ['bg-green-500'];
    return colors[index % colors.length];
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.slice(0, maxLength)}...`;
  };

  return (
    <div className="py-4 px-4 sm:px-8 mt-10 text-lg">
      <div className="flex justify-center items-center">
        <h1 className="text-center  text-3xl font-display font-sans ">Our Services</h1>
      </div>
      <div className="swiper-container custom-carousel overflow-hidden">
        <div className="swiper-wrapper cursor-grabbing h-80">
          {services.map((service, index) => (
            <div className="swiper-slide relative" key={index}>
              <Link to={"/products"}
                className="bg-cover bg-center h-full w-full flex flex-col justify-end p-4 relative mb-20"
                style={{
                  backgroundImage: `url(${process.env.STRAPI_API + service.attributes.image.data.attributes.url})`,
         
                }}
              >
                <div className={`absolute top-7 left-1 p-2 ${getBadgeColor(index)} text-white rounded-md`}>
                  {service.attributes.title}
                </div>
                {/* <p className="text-white relative bottom-4 left-4 right-4">{truncateDescription(service.attributes.description, 140)}</p> */}
              </Link>
            </div>
          ))}
        </div>
   
      </div>
    </div>
  );
};

export default OurServices;
