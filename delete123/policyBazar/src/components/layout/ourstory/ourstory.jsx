import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import background from "../../../assets/Background.png";
import { Helmet, HelmetProvider } from "react-helmet-async";
import modernjpe from "../../../assets/modern.jpeg";

const SeoContext = React.createContext();

const Seo = () => {
  const {
    title,
    description,
    url,
    shareImage,
    keywords,
    preventIndexing,
    shareImageAlt,
  } = useContext(SeoContext);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="keywords" content={keywords} />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:image" content={shareImage} key="og:image" />
      <meta
        property="og:image:alt"
        content={shareImageAlt}
        key="og:image:alt"
      />
      <link rel="canonical" href={url} />

      {preventIndexing && (
        <>
          <meta name="robots" content="noindex" />
          <meta name="googlebot" content="noindex" />
        </>
      )}
    </Helmet>
  );
};

const Story = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metaData, setMetaData] = useState({
    metaTitle: "Insurance Plans",
    metaDescription: "Discover our insurance plans and services.",
    metaKeywords: "insurance, plans, services",
    shareImage: "",
    shareImageAlt: "",
    preventIndexing: false,
  });

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await fetch(
          `${process.env.STRAPI_API}/api/mission-and-visions?populate=*`,
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
          setStories(result.data);
          if (result.data.length > 0) {
            const firstItem = result.data[0];
            setMetaData({
              metaTitle:
                firstItem.attributes.Seo.metaTitle || metaData.metaTitle,
              metaDescription:
                firstItem.attributes.Seo.metaDescription ||
                metaData.metaDescription,
              metaKeywords:
                firstItem.attributes.metaKeywords || metaData.keywords,
              shareImage:
                `${process.env.STRAPI_API}${firstItem.attributes.metaImages?.data?.attributes?.url}` ||
                "",
              shareImageAlt:
                firstItem.attributes.metaImages?.data?.attributes
                  ?.alternativeText || "",
              preventIndexing:
                firstItem.attributes.preventindexing ||
                metaData.preventIndexing,
            });
          }
        }
      } catch (error) {
        console.log("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStoryData();
  }, []);

  const loadingAnimation = {
    initial: { y: -20 },
    animate: {
      y: [0, -20],
      transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
    },
  };

  return (
    <HelmetProvider>
      <SeoContext.Provider
        value={{
          title: metaData.metaTitle,
          description: metaData.metaDescription,
          url: window.location.href,
          shareImage: metaData.shareImage,
          keywords: metaData.metaKeywords,
          preventIndexing: metaData.preventIndexing,
          shareImageAlt: metaData.shareImageAlt,
        }}
      >
        <Seo />
        <section className="p-4 lg:p-8">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <motion.div
                className="w-16 h-16 bg-green-500 rounded-full"
                initial="initial"
                animate="animate"
                variants={loadingAnimation}
              />
            </div>
          ) : (
            stories.map((item, index) => (
              <div key={index}>
                <div className="container mx-auto text-center mt-20 lg:mt-40 cursor-pointer ">
                  <p className="main-heading mb-3 text-4xl lg:text-5xl font-sans">
                    {item.attributes.storyheading && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.attributes.storyheading
                            .replace(
                              /(Insurance)/gi,
                              '<span class="text-red-500">$1</span>'
                            )
                            .replace(
                              /(Accessible)/gi,
                              '<span class="text-red-500">$1</span>'
                            )
                            .replace(/(: )/gi, "$1<br>")
                        }}
                      />
                    )}
                  </p>
                </div>

                <div className="relative">
                  <img
                    src={
                      item.attributes.image?.data?.attributes?.url
                        ? `${process.env.STRAPI_API}${item.attributes.image.data.attributes.url}`
                        : background
                    }
                    alt="our story"
                    className="w-full h-1/3 object-cover"
                  />
                </div>
                <div className="container mx-auto relative -mt-24 md:-mt-[490px]  px-4 lg:px-8  ">
                  <div className="text-center">
                    <p className="main-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-sans">
                      {item.attributes.storyheading2 && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.attributes.storyheading2.replace(
                              /(Story)/gi,
                              '<span class="text-red-500">$1</span>'
                            ),
                          }}
                        ></span>
                      )}
                    </p>
                    <div className="mt-4 md:mt-6 lg:mt-8  ">
                      <div className="text-base md:text-lg lg:text-xl xl:text-2xl font-sans">
                        {item.attributes.storydescription && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.attributes.storydescription
                                .replace(
                                  /(Policybazaar Nepal)/gi,
                                  '<span class="text-green-500 text-xl lg:text-2xl font-bold">$1</span>'
                                )
                                .replace(/(COVID-19 pandemic.)/gi, "$1<br>")
                                .replace(/(we are dedicated to.)/gi, "$1<br>")

                                .replace(
                                  /(Transparency:)/gi,
                                  '<span class="text-xl lg:text-2xl font-bold">$1</span>'
                                )
                                .replace(/(informed decisions.)/gi, "$1<br>")

                                .replace(
                                  /(Integrity:)/gi,
                                  '<span class="text-xl lg:text-2xl font-bold">$1</span>'
                                )
                                .replace(
                                  /(Customer-Centric Approach:)/gi,
                                  '<span class="text-xl lg:text-2xl font-bold">$1</span>'
                                )

                                .replace(/(coverage. )/gi, "$1<br>")
                                

                                

                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container mx-auto flex flex-col lg:flex-row items-center py-12 cursor-pointer ">
                  {/* Left Side */}
                  <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                    {/* Mission Card */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-r from-gray-400 to-green-500 hover:scale-105 group transition duration-300 ease-in-out">
                      <div className="px-6 py-4">
                        <div className="font-bold text-2xl lg:text-3xl mb-2 text-center group-hover:text-white font-sans">
                          {item.attributes.missiontext}
                        </div>
                        <div className="font-bold text-2xl lg:text-lg mb-2 text-center group-hover:text-white font-sans">
                          {item.attributes.missiontext2}
                        </div>
                        <p className="text-gray-700 text-base lg:text-lg group-hover:text-white font-sans">
                          {item.attributes.missiondescription}
                        </p>
                      </div>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-r from-gray-300 to-green-600 hover:scale-105 group transition duration-300 ease-in-out mt-8 lg:mt-10">
                      <div className="px-6 py-4">
                        <div className="font-bold text-2xl lg:text-3xl mb-2 text-center group-hover:text-white font-sans">
                          {item.attributes.visiontext}
                        </div>
                        <div className="font-bold text-lg lg:text-lg mb-2 text-center group-hover:text-white font-sans">
                          {item.attributes.vissiontext2}
                        </div>
                        <p className="text-gray-700 text-base lg:text-lg group-hover:text-white font-sans">
                          {item.attributes.vissiondescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Image */}
                  <div className="w-full lg:w-1/2  ">
                    <img
                      src={modernjpe}
                      alt="Mission and Vision"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </SeoContext.Provider>
    </HelmetProvider>
  );
};

export default Story;
