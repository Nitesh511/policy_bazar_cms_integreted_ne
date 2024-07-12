import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import "../CSS/layout.css";
import Our_services from "../our services/services";
import AboutUs from "../aboutus/about_us";

const Home = () => {
  const [dash, setDash] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/dashboards?populate=*",
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
          setDash(result.data);
        }
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="relative">
      <div className="z-10 relative">
        <Carousel className="rounded-xl custom-carousel" loop autoplay>
          {dash.map((item, index) => (
            <div className="relative" key={index}>
              <img
              src={`http://localhost:1337${item.attributes.image.data.attributes.url}`} // Adjusted image URL handling
                alt={item.title} // Assuming your API returns a 'title' field
                className="w-full object-cover"
                style={{ height: "calc(120vh - 100px)" }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 text-white p-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center">
                  {item.attributes.title}
                </h1>
                <p className="mt-2 text-base md:text-lg text-center">
                  {item.attributes.description}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Our_services />
      <AboutUs />
    </div>
  );
};

export default Home;
