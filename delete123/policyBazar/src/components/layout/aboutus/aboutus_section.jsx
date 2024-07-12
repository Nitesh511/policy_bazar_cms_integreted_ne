import React, { useEffect, useState } from "react";
import QuickLinksSection from "./quicklink";

const AboutSection = () => {
  const [aboutsection, setAboutsection] = useState([]);

  useEffect(() => {
    const fetchAboutsection = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/partners?populate=*",
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
    <div>
      <section className="">
        <div className="container mx-auto pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="hidden md:block col-span-1">
              <div className="px-4">
                {aboutsection.map((section, index) => (
                  <React.Fragment key={index}>
                    <h2 className="text-3xl font-bold mb-3 text-gray-800">
                      {section.attributes.title1 && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: section.attributes.title1.replace(
                              /(insurance)/gi,
                              '<span class="text-red-500">$1</span>'
                            ),
                          }}
                        />
                      )}
                    </h2>
                    <p className="text-lg text-gray-700">
                      {section.attributes.description1}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-1 md:col-start-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {aboutsection.map((section, index) => (
                  <React.Fragment key={index}>
                    <div className="bg-white shadow-md rounded-lg p-5 hover:bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition duration-300 ease-in-out group">
                      <img
                        src={`http://localhost:1337${section.attributes.image.data.attributes.url}`}
                        alt="product"
                        width="64"
                        className="mx-auto mb-3"
                      />
                      <h6 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-white">
                        {section.attributes.title2}
                      </h6>
                      <p className="text-sm text-gray-700 group-hover:text-white">
                        {section.attributes.description2}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="md:hidden col-span-1">
              <div className="px-4">
                {aboutsection.map((section, index) => (
                  <React.Fragment key={index}>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                      {section.attributes.title1}
                    </h2>
                    <p className="text-lg text-gray-700">
                      {section.attributes.description1}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <QuickLinksSection />
    </div>
  );
};

export default AboutSection;
