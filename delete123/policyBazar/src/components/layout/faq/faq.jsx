import React, { useState } from 'react';
import DematFAQ from './life_insurance_faq';
function DocumentList() {
  const [selectedCategory, setSelectedCategory] = useState(null);


  return (
    <>
    <div className="flex flex-col lg:flex-row ">
      {/* Left panel */}
      <div className="w-full lg:w-2/3 p-4 ">
        {selectedCategory ? (
          <DematFAQ category={selectedCategory} />
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Select a Category</h2>
          </div>
        )}
      </div>

      {/* Right panel */}
      {/* <div className="w-full lg:w-1/3 bg-white p-4 mt-10 lg:mt-0">
        <h1 className='text-3xl font-bold'>Categories</h1>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`text-black hover:bg-blue-600 border-l-4 border-blue-500 pl-4 p-2 rounded cursor-pointer text-xl ${selectedCategory === category ? 'bg-blue-600 text-white' : 'hover:text-white'}`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div> */}

    
    </div>
    

    </>
    
  );
}

export default DocumentList;
