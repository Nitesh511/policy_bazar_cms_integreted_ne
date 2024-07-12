import React from 'react';
import DematFAQ from './life_insurance_faq';

function DocumentList() {
  const categories = ["Term Insrance", "Life Insurance"];
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="w-full lg:w-2/3 p-4">
        <DematFAQ />
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/3 bg-white p-4 mt-4 lg:mt-0">
        <h1 className='text-3xl font-bold'>FAQ'S</h1>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className="text-black hover:bg-blue-600 border-l-4 border-blue-500 pl-4 p-2 rounded cursor-pointer text-1xl hover:text-white"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const Faq_downloads = () => {
  return (
    <div>
      <div className="relative overflow-hidden  flex items-center justify-center mt-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-black">Frequently Asked Questions</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DocumentList />
      </div>
    </div>
  );
}

export default Faq_downloads;
