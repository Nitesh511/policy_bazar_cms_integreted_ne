import React, { useState, useEffect } from "react";
import blogst from "../../../assets/out1.jpg"; 
import CategoryList from "./category";

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

const DematFAQHealth = ({ category }) => {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await fetch(
          `${process.env.STRAPI_API}/api/faqhealths?populate=*`,
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

        console.log(result)

      } catch (error) {
        console.log("Error Fetching FAQs:", error);
      }
    };
    fetchFaq();
  }, []);

  // Filter FAQs based on the selected category
  const filteredFaqs = faq.filter(item => item.attributes.category === category);

  return (
    <>
     <div className="relative w-full h-60 md:h-96 bg-gray-300 overflow-hidden mb-10">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${blogst})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
    

      <div className="">
      <CategoryList />
    </div>

    

    <div className="w-full max-w-2xl mx-auto px-4 mb-20 sm:px-6 lg:px-8 md:-mt-[450px] md:ml-[480px]">
  {filteredFaqs.map((item, index) => {
    const faqVehicle = item.attributes.faq_vechile; // Use correct key

    // Ensure faqVehicle is defined and has the expected structure
    if (!faqVehicle || !faqVehicle.question1) {
      return null; // or return some fallback content
    }

    return (
      <React.Fragment key={index} className="font-subheading text-xl">
        {Array.from({ length: 8 }).map((_, qIndex) => {
          const questionKey = `question${qIndex + 1}`;
          const answerKey = `answer${qIndex + 1}`;
          const question = faqVehicle[questionKey];
          const answer = faqVehicle[answerKey];

          return question && answer ? (
            <AccordionItem className="font-subheading text-xl"
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





    </>
  );
};

export default DematFAQHealth;
