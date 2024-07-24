import React, { useEffect, useState } from "react";
import AboutSection from "./aboutus_section";

const AboutUs = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {       
        const response = await fetch(
          `${ process.env.STRAPI_API}/api/aboutus?populate=*`,
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
          setAbout(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.log("Error Fetching About Us:", error);
      }
    };
    fetchAbout();
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {about.map((item, index) => (
              <React.Fragment key={index}>
                <div className="md:order-2">
                  {item.attributes.image && (
                    <img
                      src={`${process.env.STRAPI_API}${item.attributes.image.data.attributes.url}`}
                      alt="Company"
                      className="rounded-lg shadow-lg max-w-full h-auto"
                    />
                  )}
                </div>
                <div className="md:order-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                    {item.attributes.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
                    {item.attributes.bigdesctiption}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <AboutSection />
      </div>
    </div>
  );
};

export default AboutUs;
