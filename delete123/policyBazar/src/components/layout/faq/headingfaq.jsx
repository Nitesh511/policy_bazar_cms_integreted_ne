import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Vehicle Insurance", path: "/faq" },
  { name: "Contractor's All-Risk (CAR)", path: "/faqhealth" },
  { name: "Term Life Insurance", path: "/faqterm" },
  { name: "Marine Insurance", path: "/faqmarine" },
  { name: " Personal Accidental Insurance", path: "/faqpersonal" },
  { name: " Property Insurance", path: "/faqproperty" },
  { name: "Endowment Plan", path: "/faqendoment" },
  { name: "Travel Medical Insurance", path: "/faqtravels" },
  { name: "Trekker's Insurance", path: "/faqtrekkers" },



  
 
];

const HeadingFaq = ({ onSelectCategory }) => {
  return (
    <div className="w-full md:w-1/4 font-subheading font-bold">
      <h2 className="text-lg font-bold mb-4">Choose FAQ</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="mb-2">
            <Link to={category.path}>
              <button
                onClick={() => onSelectCategory(category.name)}
                className="w-full text-left p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {category.name}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadingFaq;
