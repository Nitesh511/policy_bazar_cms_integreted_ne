import React from 'react';
import { Carousel } from "@material-tailwind/react";
import image1 from "../../../assets/slide1.png";
import image2 from "../../../assets/dashboard1 (2).png";
import image3 from "../../../assets/slide2.png";
import dashboard1 from "../../../assets/dash123.png";
import OurServices from '../our services/services';
import AboutUs from '../aboutus/about_us';
import Advertisement from '../advertise/adertise';

const InsuranceComponent = () => {
  return (
    <div>
    <div className="container mx-auto p-4 py-12 mt-14">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="self-start">
          <img src={dashboard1} alt="Dashboard" className="w-full h-80   object-cover rounded-lg" />
        </div>
        <div className="p-4 py-16 rounded-lg w-2/5">
          <Carousel autoplay loop>
            <div className="relative">
              <img src={image1} alt="Insurance 1" className="w-full h-48 object-cover rounded-lg" />
              <button className="absolute bottom-4 left-4 bg-blue-500 text-white px-2 py-1 rounded mt-2">
                View plans
              </button>
            </div>
            <div className="relative">
              <img src={image2} alt="Insurance 2" className="w-full h-48 object-cover rounded-lg" />
              <button className="absolute bottom-4 left-4 bg-blue-500 text-white px-2 py-1 rounded mt-2">
                View plans
              </button>
            </div>
            <div className="relative">
              <img src={image3} alt="Insurance 3" className="w-full h-48 object-cover rounded-lg" />
              <button className="absolute bottom-4 left-4 bg-blue-500 text-white px-2 py-1 rounded mt-2">
                View plans
              </button>
            </div>
          </Carousel>
        </div>
      </div>
    
    </div>
    
    <div >
      <OurServices/>

      </div>
      <div data-aos="slide-right">
      <AboutUs />
      </div>
   
    </div>
  );
};

export default InsuranceComponent;
