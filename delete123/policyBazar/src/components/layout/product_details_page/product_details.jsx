import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product_details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${ process.env.STRAPI_API}/api/products/${id}?populate=*`);
        const data = await response.json();
        if (data && data.data) {
          setProduct(data.data);
        }
      } catch (error) {
        console.log("Error fetching product details", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl overflow-hidden rounded-t-lg mt-8">
        <img
          className="  object-cover object-bottom"
          src={`${ process.env.STRAPI_API}${product.attributes.image.data.attributes.url}`}
          alt={product.attributes.title}
        />
      </div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">{product.attributes.title}</h1>
        <p className="text-gray-700 mb-4 leading-relaxed">{product.attributes.description}</p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed">
          {product.attributes.bigdesctiption.split("\n").map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
        <div className=" mx-auto">

      
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600">Key Benefits</h2>
        
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">Maturity Benefit</h3>
          <div className="mb-2">
            <h4 className="text-xl font-semibold mb-1">Under Option-1</h4>
            <p className="text-gray-700">Sum assured along with the accrued bonuses (if any).</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-1">Under Option-2</h4>
            <p className="text-gray-700">100% of the sum assured is payable at the end of the premium payment term. After the completion of the premium payment term, 5% of the sum assured is payable every year (policy anniversary date) until the age of 79 years along with accrued bonuses (if any) accumulated till the end of the premium payment term is payable at the age of 80.</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-2">Death Benefit</h3>
          <div className="mb-2">
            <h4 className="text-xl font-semibold mb-1">Under Option-1</h4>
            <p className="text-gray-700">Insured death during the premium paying period the Product pays out 100% of the sum assured plus accrued bonuses (if any).</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-1">Under Option-2</h4>
            <p className="text-gray-700">Insured death during the premium paying period, 100% of the sum assured plus accrued bonuses (if any). Post the premium payment term 50% of the sum assured along with accrued bonuses (if any) will be payable on death till 80 years.</p>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600">Eligibility</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Minimum Sum Assured: NPR 25,000.</li>
          <li>Maximum Sum Assured: As per the source and level of income.</li>
          <li>Minimum and Maximum Entry Age: 18-65 Years.</li>
          <li>Policy Term (Option - 1 & 2 ): 5-35 Years.</li>
          <li>Risk Coverage Period (Option - 2): 15-62 Years.</li>
          <li>Maximum Maturity Age (Option-1): 70 Years.</li>
          <li>Maximum Maturity Age (Option-2): 80 Years.</li>
          <li>Maximum Age at the end of the premium paying Term: 70 for both options 1 and 2.</li>
          <li>Premium Payment Mode: Yearly, Half-Yearly, Quarterly, Monthly / Salary Saving and Single Mode (For Option-1 Only).</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600">Policy Loan & Surrender</h2>
        <p className="text-gray-700 mb-4">Under Both Options:</p>
        <ul className="list-decimal pl-6 text-gray-700">
          <li>Surrender is only applicable upon completion of three full policy years & 3 full premium payments from the date of commencement.</li>
          <li>After completion of three years of premium payment 90% of its surrender value will be applicable for the policy loan.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600">Comprehensive Additional Benefit</h2>
        <p className="text-gray-700 mb-4">Option to Choose:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Accidental Rider Benefit</li>
          <li>Accidental Rider Benefit / Permanent Total Disability Benefit / Premium Wavier Benefit</li>
          <li>Critical Illness</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600">Risk Not Covered by Insurance</h2>
        <p className="text-gray-700 mb-4">If the death of the insured is directly or indirectly due to any of the following reasons, the amount to be paid under the insurance policy is not as per the sum assured mentioned in the schedule but if there is any surrender value of the insurance policy, only that amount will be paid calculation as per NIA guidelines.</p>
        
        <h3 className="text-2xl font-bold mb-2">For Single Plan</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>1-3 years after date of commencement: 80% of paid premium (except riders + vested bonus)</li>
          <li>After completion of 3 years from date of commencement: 80% of paid premium (except riders + vested bonus)</li>
          <li>After completion of 4 years from date of commencement: 85% of paid premium (except riders + vested bonus)</li>
          <li>After completion of 5 years from date of commencement: 90% of paid premium (except riders + vested bonus)</li>
        </ul>
        
        <h3 className="text-2xl font-bold mb-2">Claims Exclusion</h3>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Engaging in aviation other than as a fare-paying passenger on a regular route of a recognized aviation service</li>
          <li>Any war-like operations (whether war be declared or not), riot, civil commotion, rebellion or invasion</li>
          <li>Any breach of civil or military law</li>
          <li>Suicide, whether sane or insane, within two years after the date of commencement of assurance.</li>
          <li>Engaging in risky occupations without formal notification to the Company.</li>
          <li>Except for the risks mentioned above, this policy will not restrict migration, travel, or occupation abroad.</li>
        </ul>
        
        <p className="text-gray-700 mt-4">If any dispute arises under this policy, it will be solved in accordance with the Insurance Act, 2079.</p>
      </section>
    </div>
        <div className="text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            Get a Quote
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Product_details;
