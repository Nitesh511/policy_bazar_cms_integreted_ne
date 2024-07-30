import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Company from "../../../assets/Contactus.jpg";
import contactimage from "../../../assets/contact.jpg";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet";
import emailjs from 'emailjs-com';

const Contactpage = () => {
  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const SERVICE_ID = 'service_bwvxj4c'; // Replace with your actual Service ID
  const TEMPLATE_ID = 'template_rfujfto'; // Replace with your actual Template ID
  const USER_ID = 'a_BB6-fF-IJK34pqA'; // Replace with your actual User ID

  const onSubmit = (values, { resetForm }) => {
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      name: values.name,
      email: values.email,
      message: values.message,
    }, USER_ID)
      .then((response) => {
        console.log('Email sent successfully:', response);
        setShowAlert(true);
        resetForm();
        setTimeout(() => {
          setShowAlert(false);
        }, 5000); // Hide alert after 5 seconds
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Contact Us - Policy Bazar Nepal</title>
        <meta name="description" content="Contact Policy Bazar Nepal for any inquiries or support. We are here to help you with your insurance and policy needs." />
        <meta name="keywords" content="Contact, Policy Bazar Nepal, insurance, support" />
        <meta name="author" content="Policy Bazar Nepal" />
        <meta property="og:title" content="Contact Us - Policy Bazar Nepal" />
        <meta property="og:description" content="Contact Policy Bazar Nepal for any inquiries or support. We are here to help you with your insurance and policy needs." />
        <meta property="og:image" content={Company} />
        <meta property="og:url" content="https://www.policybazarnepal.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Policy Bazar Nepal" />
        <meta name="twitter:description" content="Contact Policy Bazar Nepal for any inquiries or support. We are here to help you with your insurance and policy needs." />
        <meta name="twitter:image" content={Company} />
      </Helmet>

      <div>
        <div className="relative h-72 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${contactimage})`,
              top: "64px",
            }}
          ></div>
        </div>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="container mx-auto flex flex-wrap justify-center items-start">
            {/* Left side: Contact details and Google Map */}
            <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
              <div className="group bg-white shadow-md rounded-lg p-6 mb-8 transition-transform transform hover:scale-110 hover:bg-green-500">
                <h2 className="text-2xl font-bold mb-4 group-hover:text-white">
                  Contact Information
                </h2>
                <p className="mb-4 group-hover:text-white">
                  <strong>Contact Number:</strong> 014547991
                </p>
                <p className="mb-4 group-hover:text-white">
                  <strong>Location:</strong> Policy Bazar Nepal, Kathmandu, Nepal
                </p>
              </div>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.527383779401!2d85.3382173737947!3d27.731875024412297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19002d913c03%3A0x2106bb4aaac17f64!2sPolicy%20Bazaar%20Nepal!5e0!3m2!1sen!2snp!4v1720762222098!5m2!1sen!2snp"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-96"
                ></iframe>
              </div>
            </div>
            {/* Right side: Contact form */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
        {/* Alert for form submission */}
        {showAlert && (
          <div className="fixed inset-0 flex items-end justify-end px-4 py-6 pointer-events-none">
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto transform transition-all duration-500 ease-in-out">
              <div className="bg-green-500 text-white px-4 py-3">
                Form submitted successfully!
              </div>
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default Contactpage;
