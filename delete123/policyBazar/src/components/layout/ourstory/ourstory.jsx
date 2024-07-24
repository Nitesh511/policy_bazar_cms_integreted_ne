import React, { useState, useEffect ,useContext} from "react";
import { motion } from "framer-motion";
import background from "../../../assets/Background.png";
import mission from "../../../assets/mission.png";
import { Helmet, HelmetProvider } from "react-helmet-async";


const SeoContext = React.createContext();

const Seo = () => {
  const { title, description, url, shareImage, keywords, preventIndexing, shareImageAlt } = useContext(SeoContext);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="keywords" content={keywords} />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:image" content={shareImage} key="og:image"  />
      <meta property="og:image:alt" content={shareImageAlt} key="og:image:alt" /> {/* Added alt text for image */}
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
  const [loading, setLoading] = useState(true); // Adding loading state
  const [metaData, setMetaData] = useState({
    metaTitle: 'Insurance Plans',
    metaDescription: 'Discover our insurance plans and services.',
    metaKeywords: 'insurance, plans, services',
    shareImage: '',
    shareImageAlt: '', // Added alt text field
    preventIndexing: false,
  });

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await fetch(
        `${ process.env.STRAPI_API}/api/mission-and-visions?populate=*`,
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
              metaTitle: firstItem.attributes.Seo.metaTitle || metaData.metaTitle,
              metaDescription: firstItem.attributes.Seo.metaDescription || metaData.metaDescription,
              metaKeywords: firstItem.attributes.metaKeywords || metaData.keywords,
              shareImage: `${process.env.STRAPI_API}${firstItem.attributes.metaImages?.data?.attributes?.url}` || '',
              shareImageAlt: firstItem.attributes.metaImages?.data?.attributes?.alternativeText || '', // Set alt text from API
              preventIndexing: firstItem.attributes.preventindexing || metaData.preventIndexing,
            });
          }
        }
      } catch (error) {
        console.log("Error fetching the data", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchStoryData();
  }, []);

  const loadingAnimation = {
    initial: { y: -20 },
    animate: { y: [0, -20], transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" } },
  };

  return (
    <HelmetProvider>
    <SeoContext.Provider value={{ 
      title: metaData.metaTitle,
      description: metaData.metaDescription,
      url: window.location.href,
      shareImage: metaData.shareImage,
      keywords: metaData.metaKeywords,
      preventIndexing: metaData.preventIndexing,
      shareImageAlt: metaData.shareImageAlt // Provide alt text to context
    }}>
      <Seo />
    <section>
      {loading ? ( // Show custom loading animation while loading
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
            <div className="container mx-auto text-center mt-20 lg:ml-16">
              <p className="main-heading mb-3 mt-40 text-4xl lg:text-5xl font-mono">
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
                        .replace(/(Gap)/gi, "<br>$1<br>"), // Assuming "Gap" is the text you want to replace with <br> tags
                    }}
                  />
                )}
              </p>
            </div>

            <div className="relative">
              <img
                src={
                  item.attributes.image?.data?.attributes?.url
                    ? `${ process.env.STRAPI_API}${item.attributes.image.data.attributes.url}`
                    : background
                }
                alt="our story"
                className="w-full h-1/3 "
              />
            </div>

            <div className="container mx-auto relative mt-24 lg:-mt-96 lg:ml-16">
              <div className="text-center">
                <p className="main-heading text-3xl lg:text-5xl font-serif font-bold">
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
                <div className="row text-center mt-4">
                  <div className="hidden lg:block lg:col-3"></div>
                  <div className="col-12 col-md-10 mx-auto">
                    <p className="text-base lg:text-lg font-mono">
                      {item.attributes.storydescription && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.attributes.storydescription.replace(
                              /(Your Policybazaar Nepal)/gi,
                              '<span class="text-green-500 text-2xl font-bold">$1</span>'
                            ),
                          }}
                        />
                      )}
                    </p>
                  </div>
                  <div className="hidden lg:block lg:col-3"></div>
                </div>
              </div>
            </div>

            <div className="container mx-auto flex flex-col lg:flex-row items-center py-12">
              {/* Left Side */}
              <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                {/* Mission Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-r from-gray-400 to-green-500 hover:scale-110 group transition duration-300 ease-in-out">
                  <div className="px-6 py-4">
                    <div className="font-bold text-2xl lg:text-3xl mb-2 text-center group-hover:text-white">
                      {item.attributes.missiontext}
                    </div>
                    <p className="text-gray-700 text-base lg:text-lg group-hover:text-white">
                      {item.attributes.missiondescription}
                    </p>
                  </div>
                </div>

                {/* Vision Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-r from-gray-300 to-green-600 hover:scale-110 group transition duration-300 ease-in-out mt-8 lg:mt-10">
                  <div className="px-6 py-4">
                    <div className="font-bold text-2xl lg:text-3xl mb-2 text-center group-hover:text-white">
                      {item.attributes.visiontext}
                    </div>
                    <p className="text-gray-700 text-base lg:text-lg group-hover:text-white">
                      {item.attributes.vissiondescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="w-full lg:w-1/2 px-4">
                <img src={mission} alt="Mission and Vision" className="w-full" />
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
