import React from "react";
import playstoreimg from "../../../assets/playstore_app.webp";
import app1 from "../../../assets/app_1.png";
import app2 from "../../../assets/app_2.png";
import app3 from "../../../assets/app_3.png";
import ContactSection from "../getintouch/getintouch";
import { FaQ } from "react-icons/fa6";
import Faq_downloads from "../faq/faq";
import PartnersSection from "../partner_section/partner_section";
import Testimonial from "../testominals/testominals";

const DownloadAppSection = () => {
  return (
    <div>
      <section className="mt-8">
        <div className="container mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="card shadow-lg bg-gradient-to-r from-blue-400 to-green-500 text-white border-0 h-full p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Download Our App Today and Access
                  <br /> Your Insurance Anytime, Anywhere!
                </h2>
                <div className="flex mb-4 mr-40">
                  <img src={playstoreimg} alt="playstore" className="h-32 " />
                </div>
                <div className="flex items-center justify-center md:justify-start ml-32">
                  <img
                    src={app1}
                    alt="app 1"
                    className="h-auto md:h-96 max-w-full -mt-40"
                  />
                </div>
              </div>
            </div>

            {/* Middle Right Section */}
            <div className="col-span-1 md:col-span-1">
              <div className="card shadow-lg bg-white border-0 h-full p-6">
                <img
                  src={app2}
                  alt="app 2"
                  className="h-60 mx-auto md:mx-0 mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-center md:text-left">
                  Get All Features In One Simple App
                </h3>
                <p className="text-sm text-gray-600 text-center md:text-left">
                  Make Changes to Your Policy on the Go - Anytime, Anywhere!
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-span-1 md:col-span-1">
              <div className="card shadow-lg bg-white border-0 h-full p-6">
                <h3 className="text-xl font-bold mb-2 text-center md:text-left">
                  Get Insured in Minutes with Our Easy Buy Feature
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center md:text-left">
                  Simplified Insurance Purchasing - Anytime, Anywhere!
                </p>
                <img src={app3} alt="app 3" className="h-60 mx-auto md:mx-0" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonial />

      <div data-aos="slide-left">
        {" "}
        <ContactSection />
      </div>

      <div data-aos="slide-right">
        <PartnersSection />
      </div>
    </div>
  );
};

export default DownloadAppSection;
