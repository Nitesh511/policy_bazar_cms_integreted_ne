import React, { useEffect, useState } from "react";
import Company from "../../../assets/insurance.jfif";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/products?populate=*");
        const data = await response.json();

        if (data && data.data) {
          setProducts(data.data);
        }
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Background image */}
      <div className="relative h-72 bg-gray-300 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter"
          style={{
            backgroundImage: `url(${Company})`,
            transform: "scale(1.0)",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 lg:py-12">
          <div className="col-span-1">
            <p className="main-heading text-4xl lg:text-5xl font-mono mb-3 mt-5">
              Our Recommended <br />
              <span className="text-red-500 text-6xl lg:text-7xl">Insurance Plans</span>
            </p>
            <div className="lg:hidden">
              <p className="supporting-text">
                Insurance Company has been serving policyholders, protecting businesses, and mitigating Travel Insurance for added peace of mind.
              </p>
            </div>
            <div className="hidden lg:block">
              <p className="supporting-text">
                Insurance Company has been serving policyholders, protecting businesses, <br />
                and mitigating Travel Insurance for added peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 lg:p-8">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-r from-gray-400 to-green-500 hover:scale-105 group transition duration-300 ease-in-out"
          >
            <a href="#">
              <img
                className="w-full h-64 object-cover object-center rounded-t-lg"
                src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
                alt={item.attributes.title}
              />
            </a>
            <div className="p-4">
              <a href="#">
                <h5 className="text-gray-900 font-bold text-xl lg:text-2xl tracking-tight mb-2 group-hover:text-white">
                  {item.attributes.title}
                </h5>
              </a>
              <p className="text-gray-700 mb-4 group-hover:text-white">
                <ul className="list-disc list-inside">
                  {item.attributes.bigdesctiption.split("\n").map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </p>
              <a
                href="#"
                className="inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg px-4 py-2 text-sm"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
