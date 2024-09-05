import React, { useEffect, useState, useContext } from "react";
import { json, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InsuranceForm from "./insurance_form";
import { Helmet, HelmetProvider } from "react-helmet-async";
import InsuranceFormNew from "./newinsuranceform";
import why1 from "../../../assets/why1.png";
import why2 from "../../../assets/why2.png";
import why3 from "../../../assets/why3.png";
import why4 from "../../../assets/why4.png";
import why5 from "../../../assets/why5.png";
import { string } from "yup";

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
    vehicleType: "",
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

  var checkArr = [];
  const [arr, newArr] = useState("");
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
        let check = data?.data[0]?.attributes?.bigdesctiption;
        let holdArr = check.map((item, key) => {
          var { bold, text } = item.children[0];
          var level = item?.level;
          var type = item?.type;

          // Create the new object
          const newObject = { bold, text, level, type };
          checkArr.push(newObject);
        });
        newArr(checkArr);
        setProduct(data.data[0]);
        console.log(data);

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

  let imageAdded = false; // Declare a flag outside the function to track if the image has been added
  let pTagCount = 0; // Counter for the number of <p> tags

  const descReturn = (itm, imgSrc) => {
    const { bold, text, level, type } = itm;
    let txt = "";

    // Check if the text starts with "****"
    if (text.startsWith("****")) {
      txt += "<br/>"; // Add a newline before the text
      txt += text.slice(4); // Remove the first 4 characters (****) from the text
    }

    // Process text based on properties
    if (bold && bold !== undefined) {
      txt = `<strong class="text-xl" >${text}</strong>`;
    } else if (level == "1" && type == "heading" && bold === undefined) {
      txt = `<h1 class="text-xl font-bold font-subheading">${text}</h1>`;
    } else if (level == "2" && type == "heading" && bold === undefined) {
      txt = `<h2 class="text-lg font-bold font-subheading">${text}</h2>`;
    } else if (level == "3" && type == "heading" && bold === undefined) {
      txt = `<h3 class="text-lg font-bold font-subheading">${text}</h3>`;
    } else if (level == "4" && type == "heading" && bold === undefined) {
      txt = `<h4>${text}</h4>`;
    } else if (level == "5" && type == "heading" && bold === undefined) {
      txt = `<h5 class="font-subheading">${text}</h5>`;
    } else if (level == "6" && type == "heading" && bold === undefined) {
      txt = `<h6 class="font-subheading">${text}</h6>`;
    } else {
      txt = `<p class="text-lg font-subheading">${text}</p><br/>`;
      pTagCount++; // Increment the <p> tag counter
    }
    let pTagLimit;
    if (slug.includes("term-life-insurance-plan")) {
      pTagLimit = 10;
    } else if (slug.includes("personal-accidental-insurance")) {
      pTagLimit = 12;
    } else if (slug.includes("marine-transit")) {
      pTagLimit = 11;
    } else if (slug.includes("vehicle-insurance")) {
      pTagLimit = 19;
    } else if (slug.includes("travel-medical-insurance")) {
      pTagLimit = 21;
    }  else if (slug.includes("trekker-s-insurance")) {
      pTagLimit = 17;
    } else if (slug.includes("contractor-s-all-risk")) {
      pTagLimit = 12;
    } else if (slug.includes("endowment-plan")) {
      pTagLimit = 11;
    }else {
      pTagLimit = 34;
    }


    // Insert the image after every 10 <p> tags if imgSrc is provided
    if (!imageAdded && pTagCount >= pTagLimit && imgSrc) {
      txt += `<div class="my-4 flex justify-center"> 
                <img src="${imgSrc}" alt="Detail Image" class="max-w-full h-full relative"/>
              </div>`;
      imageAdded = true; // Set the flag to true after adding the image
    }

    return txt;
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
              style={{ height: "30rem", marginTop:"65px",  }}
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
            <h1 className="text-4xl font-bold mb-4 text-green-600">
              {product.attributes.title}
            </h1>
            <p className="text-black text-lg mb-4 leading-relaxed">
              {product.attributes.description}
            </p>
            <div className="">
              {arr.length > 0 &&
                arr.map((item, key) => {
                  const sizeArr = arr.length;
                  let tstAgain;

                  if (sizeArr > key) {
                    // Check if the image URL is available, otherwise pass an empty string
                    const imgSrc = product.attributes.middleimage?.data
                      ?.attributes?.url
                      ? `${process.env.STRAPI_API}${product.attributes.middleimage.data.attributes.url}`
                      : "";

                    // Correctly pass the item and imgSrc (which may be an empty string)
                    tstAgain = descReturn(item, imgSrc);
                  }

                  return (
                    <React.Fragment key={key}>
                      <div>
                        <div dangerouslySetInnerHTML={{ __html: tstAgain }} />
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>

            <div className="bg-white rounded-lg">
              <h2 className="text-2xl font-bold font-subheading mb-6 text-green-600">
                Why Choose Policybazaar Nepal for Your Insurance Needs
              </h2>
              <div className="space-y-5 text-black font-subheading">
                <div className="flex items-start space-x-4 ">
                  <img
                    src={why4} // Replace with the correct path or URL
                    alt="Easy Online Purchase"
                    className="w-12 h-12 object-contain"
                  />
                  <p className="mt-2 text-lg">
                    <strong className="text-xl">Easy Online Purchase:</strong>{" "}
                    Effortlessly buy your insurance through our intuitive and
                    user-friendly website.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <img
                    src={why3} // Replace with the correct path or URL
                    alt="Claims Assistance"
                    className="w-12 h-12 object-contain"
                  />
                  <p className=" text-lg">
                    <strong className="text-xl">Claims Assistance:</strong> Our
                    dedicated team ensures a smooth and hassle-free claims
                    process, providing you with the support you need.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <img
                    src={why5} // Replace with the correct path or URL
                    alt="Flexible Premiums"
                    className="w-12 h-12 object-contain"
                  />
                  <p className="mt-3 text-lg">
                    <strong className="text-xl">Flexible Premiums:</strong>{" "}
                    Select coverage options and durations that match your plans,
                    with premiums designed to fit your budget.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <img
                    src={why1}
                    alt="Renewable Policies"
                    className="w-12 h-12 object-contain"
                  />
                  <p className="mt-2 text-lg">
                    <strong className="text-xl">Renewable Policies:</strong>{" "}
                    Enjoy peace of mind knowing our policies are easily
                    renewable for your future needs.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <img
                    src={why2}
                    alt="Cancellation Refund"
                    className="w-12 h-12 object-contain"
                  />
                  <p className="mt-1 text-lg">
                    <strong className="text-xl">Cancellation Refund:</strong>{" "}
                    Plans change, and we understand. Enjoy a free-look period
                    with full refunds for cancellations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex p-6 lg:ml-auto absolute inset-x-0 bottom-0 lg:bottom-auto lg:top-[570px] lg:left-[860px] w-full lg:w-[400px] flex items-end justify-end">
            <div className="w-full max-w-md -mt-24">
              <InsuranceFormNew
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 mt-10 flex items-center justify-center ">
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
