import React from "react";

const InsuranceForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleCloseForm,
}) => {
  return (
    <div className="bg-white p-6  rounded-lg shadow-lg max-w-md mx-auto w-full border border-gray-200">
      <h2 className="text-2xl font-semibold text-green-600 mb-6">GET A QUOTE</h2>
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
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <button
            type="submit"
            className="bg-green-600 text-white font-bold font-subheading py-2 px-4 rounded-lg shadow hover:bg-gray-000 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Submit
          </button>
          {handleCloseForm && (
            <button
              type="button"
              className="text-red-700 font-medium py-2 px-4 rounded-lg hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
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

export default InsuranceForm;
