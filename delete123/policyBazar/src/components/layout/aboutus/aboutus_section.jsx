import React, { useEffect, useState } from "react";
import QuickLinksSection from "./quicklink";

const AboutSection = () => {
  const [aboutsection, setAboutsection] = useState([]);

  useEffect(() => {
    const fetchAboutsection = async () => {
      try {
        const response = await fetch(
          `${process.env.STRAPI_API}/api/partners?populate=*`,
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
          setAboutsection(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.log("Error Fetching Service", error);
      }
    };
    fetchAboutsection();
  }, []);

  return (
    <div className="overflow-hidden">
      <section className="py-10 px-4 sm:px-6 lg:px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Desktop View */}
            <div className="hidden md:block">
              <div className="lg:px-8">
                {aboutsection.map((section, index) => (
                  <React.Fragment key={index}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-800 font-ubheading">
                      {section.attributes.title1 && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: section.attributes.title1.replace(
                              /( Policybazaar Nepal)/gi,
                              '<span class="text-green-500">$1</span>'
                            ),
                          }}
                        />
                      )}
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-subheading">
                      {section.attributes.description1}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Desktop Cards */}
            <div className="md:col-span-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {aboutsection.map((section, index) => (
                  <React.Fragment key={index}>
                    <div className="bg-white shadow-md rounded-lg p-5 hover:bg-gradient-to-r from-blue-400 to-green-500 hover:scale-105 transition duration-300 ease-in-out group">
                      <img
                        src={`${process.env.STRAPI_API}${section.attributes.image.data.attributes.url}`}
                        alt="product"
                        className="mx-auto mb-3 w-16 h-16 object-contain"
                      />
                      <h6 className="text-base sm:text-lg lg:text-xl font-semibold font-subheading text-gray-800 mb-2 group-hover:text-white">
                        {section.attributes.title2}
                      </h6>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 group-hover:text-white font-subheading">
                        {section.attributes.description2}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="px-4">
                {aboutsection.map((section, index) => (
                  <React.Fragment key={index}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 font-subheading">
                      {section.attributes.title1}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 font-subheading">
                      {section.attributes.description1}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <div className="relative mt-10" data-aos="flip-right" data-aos-duration="5000">
        <QuickLinksSection />
      </div>
    </div>
  );
};

export default AboutSection;
