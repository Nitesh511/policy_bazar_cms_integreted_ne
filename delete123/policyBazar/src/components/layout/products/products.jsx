import React, { useEffect, useState, useContext } from "react";
import Company from "../../../assets/header.jpg";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// SeoContext to provide SEO-related data
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
      />{" "}
      {/* Added alt text for image */}
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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [metaData, setMetaData] = useState({
    metaTitle: "Insurance Plans",
    metaDescription: "Discover our insurance plans and services.",
    metaKeywords: "insurance, plans, services",
    shareImage: "",
    shareImageAlt: "", // Added alt text field
    preventIndexing: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.STRAPI_API}/api/products?populate=*`
        );
        const data = await response.json();

        if (data && data.data) {
          setProducts(data.data);
          console.log(data.data);
          if (data.data.length > 0) {
            const firstItem = data.data[0];
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
                  ?.alternativeText || "", // Set alt text from API
              preventIndexing:
                firstItem.attributes.preventindexing ||
                metaData.preventIndexing,
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
      <SeoContext.Provider
        value={{
          title: metaData.metaTitle,
          description: metaData.metaDescription,
          url: window.location.href,
          shareImage: metaData.shareImage,
          keywords: metaData.metaKeywords,
          preventIndexing: metaData.preventIndexing,
          shareImageAlt: metaData.shareImageAlt, // Provide alt text to context
        }}
      >
        <Seo />
        <div>
          {/* Background image */}
          <div className="relative h-60 md:h-96  overflow-hidden">
            <div
              className="absolute inset-1 mt-10 md:mt-16 bg-cover bg-center "
              style={{
                backgroundImage: `url(${Company})`,
                backgroundSize: window.innerWidth < 768 ? "130% 110%" : "100% 140%", // Adjust the size for mobile and desktop
                backgroundRepeat: "no-repeat", // Prevents the image from repeating
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="container mx-auto -mt-12 px-4 lg:px-0 md:-mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 lg:py-12">
              <div className="col-span-1">
                <p className="main-heading text-4xl lg:text-5xl font-mono mb-3 mt-8 font-subheading ">
                  Our Recommended <br />
                  <span className="text-red-500 text-6xl lg:text-7xl font-subheading ">
                    Insurance Plans
                  </span>
                </p>
                <div className="lg:hidden">
                  <p className="supporting-text font-subheading ">
                    Insurance Company has been serving policyholders, protecting
                    businesses, and mitigating Travel Insurance for added peace
                    of mind.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <p className="supporting-text font-subheading text-lg">
                    Insurance Company has been serving policyholders, protecting
                    businesses, <br />
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
                className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:bg-green-600 hover:scale-105 group transition duration-300 ease-in-out"
              >
                <Link to={`/products/${item.attributes.slug}`}>
                  <img
                    className="w-full h-64 object-cover object-center rounded-t-lg"
                    src={`${process.env.STRAPI_API}${item.attributes.image.data.attributes.url}`}
                    alt={item.attributes.title}
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/products/${item.attributes.slug}`}>
                    <h5 className="text-green-600 font-bold text-xl lg:text-2xl tracking-tight mb-2 group-hover:text-white font-subheading ">
                      {item.attributes.title}
                    </h5>
                  </Link>
                  <Link to={`/products/${item.attributes.slug}`}>
                    <p className="text-black mb-4 group-hover:text-white font-subheading text-lg">
                      {item.attributes.description.split("\n")}
                    </p>
                  </Link>
                  <Link
                    to={`/products/${item.attributes.slug}`}
                    className="inline-block bg-green-700 hover:bg-gray-500 focus:ring-4 focus:ring-green-600 text-white font-medium rounded-lg px-4 py-2 text-lg"
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
