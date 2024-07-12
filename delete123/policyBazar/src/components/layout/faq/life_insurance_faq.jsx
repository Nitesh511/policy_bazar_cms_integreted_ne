import React, { useState, useEffect } from "react";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div className="mb-2">
      <button
        className="w-full text-left p-4 bg-gradient-to-r from-gray-600 to-green-600 text-white font-bold flex justify-between items-center"
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

const DematFAQ = () => {
    const [faq, setFaq]=useState([]);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/faqs?populate=*",
          {
            headers: {
              Authorization:
                "Bearer cb6977f556ef939cc2dec9cffef081aec6784cd62adc7e6fff50f20f9e56610703876a424ddf177b7fbb8c26887bb280c09fffc955c4999fc8f0a8ff114699e7c1609e6734313c75c535f9addb25d4ca0fe737bdbe2c3cbfae0fea39e12fc134925fb539e3a4767880808f98f4051fa09d75db181eb16f5abca3575ddf69837c",
              "Content-Type": "application/json",
            },
          }
        );
        const result= await response.json();
        if(result && result.data){
            setFaq(result.data);
      

        }

      } catch (error){
        console.log("Error Fetching About Us:",error)

      }
    };
    fetchFaq();
  },[]);


  return (
    <div className="w-full max-w-2xl mx-auto">
      {faq.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.attributes.title}
          content={item.attributes.description}
        />
      ))}
    </div>
  );
};

export default DematFAQ;
