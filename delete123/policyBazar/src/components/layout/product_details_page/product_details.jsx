import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InsuranceForm from "./insurance_form";
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

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    insuranceType: "",
    vehicleType:"",
    name: "",
    email: "",
    phone: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [metaData, setMetaData] = useState({
    metaTitle: "Insurance Plans",
    metaDescription: "Discover our insurance plans and services.",
    metaKeywords: "insurance, plans, services",
    shareImage: "",
    shareImageAlt: "", // Added alt text field
    preventIndexing: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePhoneNumber = (phone) => {
    const nepalPhoneRegex = /^(98[45]\d{7}|97[4]\d{7})$/;
    return nepalPhoneRegex.test(phone);
  };

  const validateForm = () => {
    const { name, email, phone } = formData;
    if (!name || !email || !phone) {
      toast.error("Please fill out all fields");
      return false;
    }
    if (!validatePhoneNumber(phone)) {
      toast.error("Please enter a valid Nepal phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch(
       `${process.env.STRAPI_API}/api/suscribes?populate=*`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer cb6977f556ef939cc2dec9cffef081aec6784cd62adc7e6fff50f20f9e56610703876a424ddf177b7fbb8c26887bb280c09fffc955c4999fc8f0a8ff114699e7c1609e6734313c75c535f9addb25d4ca0fe737bdbe2c3cbfae0fea39e12fc134925fb539e3a4767880808f98f4051fa09d75db181eb16f5abca3575ddf69837c",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              insurancetype: formData.insuranceType,
              vehicleType: formData.vehicleType,
              name: formData.name,
              email: formData.email, 
              phone: formData.phone,
            },
          }),
        }
      );
      console.log("Response Status:", response.status);

      if (response.ok) {
        toast.success("Form successfully submitted", {});
        setShowForm(false);
        setFormData({
          vehicleType: "",
          name: "",
          email: "",
          phone: "",
        });
        fetchProduct();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      toast.error("Error occurred while submitting form", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      console.log("Error Has been Cached", err);
    }
  };

  const handleQuoteClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.STRAPI_API}/api/products?filters[slug][$eq]=${slug}&populate=*`
      );
      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        setProduct(data.data[0]);
        console.log(data.data);

        setFormData({
          insuranceType: data.data[0].attributes.title || "",
        });
        if (data.data.length > 0) {
          const firstItem = data.data[0];
          setMetaData({
            metaTitle: firstItem.attributes.Seo.metaTitle || metaData.metaTitle,
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
              firstItem.attributes.preventindexing || metaData.preventIndexing,
          });
        }
      }
    } catch (error) {
      console.log("Error fetching product details", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }


  const DescriptionList = ({ description }) => {
    const formatLine = (line) => {
      // Remove hyphens
      const cleanedLine = line.replace(/-/g, '');
  
      // Check if the line contains a colon or question mark
      const colonIndex = cleanedLine.indexOf(":");
      const questionMarkIndex = cleanedLine.indexOf("?");
  
      if (colonIndex !== -1) {
        // Split the line into two parts
        const beforeColon = cleanedLine.substring(0, colonIndex + 1);
        const afterColon = cleanedLine.substring(colonIndex + 1).trim();
  
        return (
          <div key={line}>
            <strong>{beforeColon}</strong> {afterColon}
          </div>
        );
      }
  
      if (questionMarkIndex !== -1) {
        // Split the line into two parts
        const beforeQuestionMark = cleanedLine.substring(0, questionMarkIndex + 1);
        const afterQuestionMark = cleanedLine.substring(questionMarkIndex + 1).trim();
  
        return (
          <div key={line}>
            <strong>{beforeQuestionMark}</strong> {afterQuestionMark}
          </div>
        );
      }
  
      // Return line as is if no colon or question mark
      return <div key={line}>{cleanedLine}</div>;
    };
  
    return (
      <ul className="list-disc mb-4 text-gray-700 leading-relaxed">
        {description.split("\n").map((line, idx) => formatLine(line))}
      </ul>
    );
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
          shareImageAlt: metaData.shareImageAlt, // Provide alt text to context
        }}
      >
        <Seo />
        <div className="flex flex-col h-full">
          <div
            className="relative w-full h-72 overflow-hidden rounded-t-lg mt-18"
            style={{ height: "30rem" }}
          >
            <img
              className="w-full h-full object-cover "
              style={{ height: "30rem" }}
              src={`${process.env.STRAPI_API}${product.attributes.details_image.data[0].attributes.url}`}
              alt={product.attributes.title}
            />
            <button
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-90 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105"
              onClick={handleQuoteClick}
            >
              Get a Quote
            </button>
          </div>

          <div className="p-6 w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4 text-black">
              {product.attributes.title}
            </h1>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {product.attributes.description}
            </p>
            <div className="">
              <DescriptionList
                description={product.attributes.bigdesctiption}
              />
            </div>

            <div className="bg-white rounded-lg py-10">
              <h2 className="text-3xl font-bold mb-6 text-black">
                Why Choose Policybazaar Nepal for Your Insurance Needs
              </h2>
              <div className="space-y-4 text-black">
                <p>
                  <strong>Easy Online Purchase:</strong> Effortlessly buy your
                  insurance through our intuitive and user-friendly website.
                </p>
                <p>
                  <strong>Claims Assistance:</strong>  Our dedicated team ensures a smooth and hassle-free claims process, providing you with the support you need.
                </p>
                <p>
                  <strong>Flexible Premiums:</strong>Select coverage options and durations that match your plans, with premiums designed to fit your budget.
             
                </p>
                <p>
                  <strong>Renewable Policies:</strong> : Enjoy peace of mind knowing our policies are easily renewable for your future needs.
                </p>
                <p>
                  <strong>Cancellation Refund:</strong> Plans change, and we understand. Enjoy a free-look period with full refunds for cancellations..
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex p-6 lg:ml-auto absolute inset-x-0 bottom-0 lg:bottom-auto lg:top-[570px] lg:left-[860px] w-full lg:w-[400px] flex items-end justify-end">
            <div className="w-full max-w-md -mt-24">
              <InsuranceForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
              <InsuranceForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleCloseForm={handleCloseForm}
              />
            </div>
          )}

          <ToastContainer />
        </div>
      </SeoContext.Provider>
    </HelmetProvider>
  );
};

export default ProductDetails;
