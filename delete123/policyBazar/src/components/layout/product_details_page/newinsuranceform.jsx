import React, { useEffect, useState } from 'react';

const InsuranceFormNew = ({
  formData,
  handleChange,
  handleSubmit,
  handleCloseForm,
}) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const element = document.getElementById('fixedElement');
      const elementHeight = element?.offsetHeight || 0;
      const bottomPosition = scrollTop + viewportHeight;
      const distanceFromBottom = document.documentElement.scrollHeight - bottomPosition;

      // Check if the element should be fixed within the viewport range
      if (scrollTop > 300 && distanceFromBottom > 630) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto w-full border border-gray-200 font-subheading " style={{
      position: isFixed ? 'fixed' : 'relative',
      top: isFixed ? '80px' : 'auto',
      width: '100%',
      maxWidth: '350px',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      padding: '20px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      //display: isFixed ? 'block' : 'block', // Toggle visibility
      marginLeft:"-30px"
    }}>
      <h2 className="text-2xl font-bold font-subheading text-green-600 mb-6">GET A QUOTE</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            className="block text-black text-base font-subheading font-bold mb-2"
            htmlFor="insuranceType"
          >
            Type of Insurance
          </label>
          <input
            id="insuranceType"
            type="text"
            name="insuranceType"
            value={formData.insuranceType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        {formData.insuranceType === "Vehicle Insurance" && (
          <div className="mb-2">
            <label
              className="block text-black text-base font-subheading font-bold mb-2"
              htmlFor="vehicleType"
            >
              Select Your Vehicle Type
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              <option value="">Select a vehicle type</option>
              <option value="Car">Car</option>
              <option value="Motorbike">Motorbike</option>
              <option value="Truck">Truck</option>
              <option value="Bus">Bus</option>
            </select>
          </div>
        )}

        <div className="mb-2">
          <label
            className="block text-black text-base font-subheading font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-black text-base font-subheading font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-black text-base font-subheading font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row  items-center">
          <button
            type="submit"
            className="bg-green-600 text-white font-bold font-subheading py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-600  ml-32"
          >
            Submit
          </button>
          {handleCloseForm && (
            <button
              type="button"
              className="text-gray-700 font-medium py-2 px-4 rounded-lg hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={handleCloseForm}
            >
              Close
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InsuranceFormNew;
