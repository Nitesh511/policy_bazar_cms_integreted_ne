import React, { useState, useEffect,useContext } from "react";
import blogst from "../../../assets/blogging.jpeg"
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";


  
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

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [metaData, setMetaData] = useState({
    metaTitle: 'Insurance Plans',
    metaDescription: 'Discover our insurance plans and services.',
    metaKeywords: 'insurance, plans, services',
    shareImage: '',
    shareImageAlt: '', // Added alt text field
    preventIndexing: false,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${ process.env.STRAPI_API}/api/blogs?populate=*`,
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
          setBlogs(result.data);
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
        console.log("Error Fetching Data", error);
      }
    };
    fetchBlogs();
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
    <div>
      <div className="relative h-72 bg-gray-300 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center  "
          style={{
            backgroundImage: `url(${blogst})`,
            
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8 ">
        {blogs.map((item, index) => (
          <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5 mt-5" key={index}>
            <Link  to={`/blogs/${item.attributes.slug}`}>
              <img
                className="rounded-t-lg"
                src={`${ process.env.STRAPI_API}${item.attributes.image.data.attributes.url}`} // Adjusted image URL handling
                alt=""
              />
            </Link>
            <div className="p-5">
              <Link  to={`/blogs/${item.attributes.slug}`}>
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 font-sans">
                  {item.attributes.title}
                </h5>
              </Link>
              <p className="font-normal text-gray-700 mb-3 font-sans">
                {item.attributes.description}
              </p>
              <Link
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center font-sans"
                to={`/blogs/${item.attributes.slug}`}
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </SeoContext.Provider>
    </HelmetProvider>
  );
};

export default Blogs;
