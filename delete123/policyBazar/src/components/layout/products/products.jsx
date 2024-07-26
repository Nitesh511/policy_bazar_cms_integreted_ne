import React, { useEffect, useState,useContext } from "react";
import Company from "../../../assets/insurance.jfif";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";


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
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [metaData, setMetaData] = useState({
    metaTitle: 'Insurance Plans',
    metaDescription: 'Discover our insurance plans and services.',
    metaKeywords: 'insurance, plans, services',
    shareImage: '',
    shareImageAlt: '', // Added alt text field
    preventIndexing: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ process.env.STRAPI_API}/api/products?populate=*`);
        const data = await response.json();

        if (data && data.data) {
          setProducts(data.data);
          console.log(data.data);
          if (data.data.length > 0) {
            const firstItem = data.data[0];
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
        console.log("Error fetching products", error);
      }
    };

    fetchProducts();
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
      {/* Background image */}
      <div className="relative h-72 bg-gray-300 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter"
          style={{
            backgroundImage: `url(${Company})`,
            transform: "scale(1.0)",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 lg:py-12">
          <div className="col-span-1">
            <p className="main-heading text-4xl lg:text-5xl font-mono mb-3 mt-5 font-sans">
              Our Recommended <br />
              <span className="text-red-500 text-6xl lg:text-7xl font-sans">Insurance Plans</span>
            </p>
            <div className="lg:hidden">
              <p className="supporting-text font-sans">
                Insurance Company has been serving policyholders, protecting businesses, and mitigating Travel Insurance for added peace of mind.
              </p>
            </div>
            <div className="hidden lg:block">
              <p className="supporting-text font-sans">
                Insurance Company has been serving policyholders, protecting businesses, <br />
                and mitigating Travel Insurance for added peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 lg:p-8">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-r from-gray-400 to-green-500 hover:scale-105 group transition duration-300 ease-in-out"
          >
            <a href="#">
              <img
                className="w-full h-64 object-cover object-center rounded-t-lg"
                src={`${ process.env.STRAPI_API}${item.attributes.image.data.attributes.url}`}
                alt={item.attributes.title}
              />
            </a>
            <div className="p-4">
              <a href="#">
                <h5 className="text-gray-900 font-bold text-xl lg:text-2xl tracking-tight mb-2 group-hover:text-white font-sans">
                  {item.attributes.title}
                </h5>
              </a>
              <p className="text-gray-700 mb-4 group-hover:text-white font-sans">
                <ul className="list-disc list-inside">
                  {item.attributes.bigdesctiption.split("\n").map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </p>
              <Link
               to={`/product_details/${item.id}`}
                className="inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg px-4 py-2 text-sm"
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

export default Products;
