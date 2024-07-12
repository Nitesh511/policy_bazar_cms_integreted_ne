import React from 'react';
import sunlife from '../../../assets/sunlife.png';
import esewa from '../../../assets/esewa.svg';

const PartnersSection = () => {
  return (
    <section className="mt-12  py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/12"></div>
          <div className="w-full md:w-4/12 bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0 hover:scale-110">
            <p className="text-3xl font-bold mb-4 mt-0 md:mt-5 pl-4 text-gray-800">
              Our <span className="text-red-500">Associated</span><br />Partners
            </p>
            <div className="mt-6 flex justify-center">
              <img src={sunlife} alt="sunlife" width="100" className="pr-3" />
            </div>
          </div>
          <div className="w-full md:w-1/12"></div>
          <div className="w-full md:w-5/12 bg-white shadow-lg rounded-lg p-6 hover:scale-110">
            <p className="text-3xl font-bold mb-4 mt-5 pl-4 text-gray-800">
              Our <span className="text-red-500">Payment</span><br />Partner
            </p>
            <div className="mt-6 flex justify-center">
              <img src={esewa} alt="esewa" className="pr-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;
