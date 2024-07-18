import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import OurServices from "../our services/services";
import AboutUs from "../aboutus/about_us";

const InsuranceComponent = () => {
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    const fetchdashData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/dashboard2s?populate=*",
          {
            headers: {
              Authorization:
                "Bearer cb6977f556ef939cc2dec9cffef081aec6784cd62adc7e6fff50f20f9e56610703876a424ddf177b7fbb8c26887bb280c09fffc955c4999fc8f0a8ff114699e7c1609e6734313c75c535f9addb25d4ca0fe737bdbe2c3cbfae0fea39e12fc134925fb539e3a4767880808f98f4051fa09d75db181eb16f5abca3575ddf69837c",
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result && result.data) {
          setDashboard(result.data);
          console.log(result.data);
        }
      } catch (err) {
        console.log("Error Fetching Data", err);
      }
    };
    fetchdashData();
  }, []);

  return (
    <div className="relative z-10">
      <div className="container mx-auto p-4 py-12 mt-14">
        {dashboard.map((item, index) => (
          <div
            className="flex flex-col md:flex-row justify-between items-start gap-8"
            key={index}
          >
            <div className="w-full md:w-3/5">
              {item.attributes.image && item.attributes.image.data && (
                <img
                  src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
                  alt="Dashboard"
                  className="w-full h-auto max-h-80 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="p-0 md:p-4 py-0 -mt-4 md:py-16 rounded-lg w-full md:w-2/5">
              <Carousel autoplay loop arrows={false}>
                {item.attributes.imagescraousel &&
                  item.attributes.imagescraousel.data &&
                  item.attributes.imagescraousel.data.map(
                    (carouselImage, carouselIndex) => (
                      <div className="relative" key={carouselIndex}>
                        <img
                          src={`http://localhost:1337${carouselImage.attributes.url}`}
                          alt={`Insurance ${carouselIndex + 1}`}
                          className="w-full h-60 object-cover rounded-lg"
                        />
                        <button className="absolute bottom-4 left-4 bg-blue-500 text-white px-2 py-1 rounded mt-2">
                          View plans
                        </button>
                      </div>
                    )
                  )}
              </Carousel>
            </div>
          </div>
        ))}
      </div>
      <div className="-mt-20 md:-mt-8">
        <OurServices />
      </div>
      <div data-aos="slide-right">
        <AboutUs />
      </div>
    </div>
  );
};

export default InsuranceComponent;
