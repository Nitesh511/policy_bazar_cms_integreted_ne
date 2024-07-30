import React, { useState, useEffect, useContext } from "react";
import { Carousel } from "@material-tailwind/react";
import OurServices from "../our services/services";
import AboutUs from "../aboutus/about_us";
import { Helmet, HelmetProvider } from "react-helmet-async";
import './home.css';

// SeoContext to provide SEO-related data
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

const InsuranceComponent = () => {
  const [dashboard, setDashboard] = useState([]);
  const [metaData, setMetaData] = useState({
    metaTitle: 'Insurance Plans',
    metaDescription: 'Discover our insurance plans and services.',
    metaKeywords: 'insurance, plans, services',
    shareImage: '',
    shareImageAlt: '', // Added alt text field
    preventIndexing: false,
  });

  useEffect(() => {
    const fetchdashData = async () => {
      try {
        const response = await fetch(
          `${process.env.STRAPI_API}/api/dashboard2s?populate=*`,
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
          if (result.data.length > 0) {
            const firstItem = result.data[0];
            setMetaData({
              metaTitle: firstItem.attributes.Seo.metaTitle || metaData.metaTitle,
              metaDescription: firstItem.attributes.Seo.metaDescription || metaData.metaDescription,
              metaKeywords: firstItem.attributes.metaKeywords || metaData.keywords,
              shareImage: `${process.env.STRAPI_API}${firstItem.attributes.metaImages?.data[0]?.attributes?.url}` || '',
              shareImageAlt: firstItem.attributes.metaImages?.data[0]?.attributes?.alternativeText || '', // Set alt text from API
              preventIndexing: firstItem.attributes.preventindexing || metaData.preventIndexing,
            });
          }
        }
      } catch (err) {
        console.log("Error Fetching Data", err);
      }
    };
    fetchdashData();
  }, []);

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

        <div className="relative z-10">
          <div className="container mx-auto p-4 py-12 mt-0 md:mt-14">
            {dashboard.map((item, index) => (
              <div
                className="flex flex-col md:flex-row justify-between items-start gap-8"
                key={index}
              >
                <div className="w-full md:w-3/5 mt-10">
                  {item.attributes.image && item.attributes.image.data && (
                    <img
                      src={`${process.env.STRAPI_API}${item.attributes.image.data.attributes.url}`}
                      alt="Dashboard"
                      className="w-full h-auto max-h-80 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="p-0 md:p-4 py-0 -mt-4 md:py-16  rounded-lg w-full md:w-2/4 ">
                  <Carousel autoplay loop arrows={false}>
                    {item.attributes.imagescraousel &&
                      item.attributes.imagescraousel.data &&
                      item.attributes.imagescraousel.data.map(
                        (carouselImage, carouselIndex) => (
                          <div className="relative" key={carouselIndex}>
                            <img
                              src={`${process.env.STRAPI_API}${carouselImage.attributes.url}`}
                              alt={`Insurance ${carouselIndex + 1}`}
                              className="w-full h-70 object-cover rounded-lg"
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
      </SeoContext.Provider>
    </HelmetProvider>
  );
};

export default InsuranceComponent;
