import React, { useState, useEffect } from "react";
import blogst from "../../../assets/out1.jpg";
import HeadingFaq from "./headingfaq";
import { useNavigate } from "react-router-dom";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        className="w-full text-left p-4 bg-green-600 text-white font-bold flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

const DematFAQEndoment = ({ category }) => {
  const [faq, setFaq] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || "Vehicle Insurance");

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await fetch(
          `${process.env.STRAPI_API}/api/faqendowments?populate=*`,
          {
            headers: {
              Authorization:
                "Bearer cb6977f556ef939cc2dec9cffef081aec6784cd62adc7e6fff50f20f9e56610703876a424ddf177b7fbb8c26887bb280c09fffc955c4999fc8f0a8ff114699e7c1609e6734313c75c535f9addb25d4ca0fe737bdbe2c3cbfae0fea39e12fc134925fb539e3a4767880808f98f4051fa09d75db181eb16f5abca3575ddf69837c",
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result && result.data) {
          setFaq(result.data);
        }
        console.log(result);
      } catch (error) {
        console.log("Error Fetching FAQs:", error);
      }
    };
    fetchFaq();
  }, []);


  // Define specific categories
  const categories = [
    "Vehicle Insurance",
    "Term Life Insurance",
    "Property Insurance",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="relative w-full h-60 md:h-96 bg-gray-300 overflow-hidden mb-10">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${blogst})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-20">
        <HeadingFaq
          categories={categories}
          onSelectCategory={setSelectedCategory}
        />

        <div className="w-full md:w-3/4 mt-10">
          <div className="w-full max-w-2xl mx-auto px-4">
            {faq.map((item, index) => {
              const faqVehicle = item.attributes.faq_vechile; // Use correct key

              // Ensure faqVehicle is defined and has the expected structure
              if (!faqVehicle || !faqVehicle.question1) {
                return null; // or return some fallback content
              }

              return (
                <React.Fragment key={index}>
                  {Array.from({ length: 8 }).map((_, qIndex) => {
                    const questionKey = `question${qIndex + 1}`;
                    const answerKey = `answer${qIndex + 1}`;
                    const question = faqVehicle[questionKey];
                    const answer = faqVehicle[answerKey];

                    return question && answer ? (
                      <AccordionItem
                        key={qIndex}
                        title={question}
                        content={answer}
                      />
                    ) : null; // Skip if question or answer is missing
                  })}
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex flex-col items-center justify-center text-center mt-10">
            <p className="text-lg md:text-xl">
              Need More Help? For more information or assistance with Contractor’s
              All Risk Insurance,<br /> please contact our customer service team at: 01-
              4547991
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DematFAQEndoment;
