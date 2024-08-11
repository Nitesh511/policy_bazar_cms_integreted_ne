// CategoryList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import DematFAQHealth from './faq_health';

const CategoryList = () => {
  return (
    <div className="flex flex-col md:flex-row -mt-5 md:ml-[230px]">
      {/* Left Side (Categories List) */}
      <div className="md:w-1/5 w-full bg-white p-4 md:sticky top-0">
        <h2 className="text-3xl font-bold font-subheading text-gray-800 mb-6">
          FAQs
        </h2>
        <ul className="list-none space-y-4">
          <li className="relative group mb-4 text-lg text-gray-700 border p-4 hover:text-white">
            <Link to={"/faq"}><span className="z-10 relative font-subheading ">Vehicle Insurance</span></Link>
            <span className="absolute left-0 bottom-0 h-full w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group mb-4 text-lg text-gray-700 border p-4 hover:text-white">
            <Link to={"/faqhealth"} ><span className="z-10 relative font-subheading ">Health Insurance</span></Link>
            <span className="absolute left-0 bottom-0 h-full w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group mb-4 text-lg text-gray-700 border p-4 hover:text-white">
            <span className="z-10 relative font-subheading ">Property Insurance</span>
            <span className="absolute left-0 bottom-0 h-full w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group mb-4 text-lg text-gray-700 border p-4 hover:text-white">
            <span className="z-10 relative font-subheading ">Life Insurance</span>
            <span className="absolute left-0 bottom-0 h-full w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group mb-4 text-lg text-gray-700 border p-4 hover:text-white">
            <span className="z-10 relative font-subheading">Personal Accident</span>
            <span className="absolute left-0 bottom-0 h-full w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;
