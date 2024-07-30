import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InsuranceForm from "./insurance_form";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    insuranceType: "",
    name: "",
    email: "",
    phone: "",
  });
  const [showForm, setShowForm] = useState(false);

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
        "http://45.117.153.94:1007/api/suscribes?populate=*",
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
      // Check if the line contains a colon
      const colonIndex = line.indexOf(":");
      if (colonIndex !== -1) {
        // Split the line into two parts
        const beforeColon = line.substring(0, colonIndex + 1);
        const afterColon = line.substring(colonIndex + 1).trim();

        return (
          <div key={line}>
            <strong>{beforeColon}</strong> {afterColon}.
          </div>
        );
      }
      // Return line as is if no colon
      return <div key={line}>{line}</div>;
    };

    return (
      <ul className="list-disc mb-4 text-gray-700 leading-relaxed">
        {description.split("\n").map((line, idx) => formatLine(line))}
      </ul>
    );
  };

  return (
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
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">
          {product.attributes.title}
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {product.attributes.description}
        </p>
        <div className="">
          <DescriptionList description={product.attributes.bigdesctiption} />
        </div>

        <div className="bg-white rounded-lg py-10">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">
            Why Choose Policybazaar Nepal
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Easy Online Purchase:</strong> Conveniently purchase your
              trekker’s insurance through our user-friendly website.
            </p>
            <p>
              <strong>Claims Assistance:</strong> Our dedicated claims team is
              ready to assist you through a hassle-free claims process.
            </p>
            <p>
              <strong>Flexible Premiums:</strong> Choose coverage options and
              durations that suit your trekking plans, with premiums tailored
              <br></br> to your needs.
            </p>
            <p>
              <strong>Renewable Policies:</strong> Enjoy peace of mind on all
              your treks with policies that are easily renewable for your future
              <br></br>
              adventures.
            </p>
            <p>
              <strong>Cancellation Refund:</strong> Plans change, and we
              understand. Our policies offer a free-look period for
              cancellations and <br></br> full refunds.
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
  );
};

export default ProductDetails;
