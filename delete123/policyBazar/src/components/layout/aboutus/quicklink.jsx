import React from 'react';
import efficency from "../../../assets/Effeciency.svg";
import DownloadAppSection from '../dowloadsection/download';

const QuickLinksSection = () => {
  return (
    <div >
    <section className="mt-10">
      <div className="container mx-auto px-4 md:px-0">
        <div className="max-w-screen-xl mx-auto gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="bg-white shadow-lg rounded-lg py-5 px-8 text-center">
              <p className="text-2xl font-semibold mb-3">
                Fast-track your <span className="text-red-600">insurance needs</span> with our quick links
              </p>
              <p className="text-gray-700 mb-5">
                Here are some shortcuts to get you where you need to go. Access important information quickly and easily.
              </p>
            </div>
          </div>
          <div className="col-span-2 flex justify-center items-center space-x-8 mt-5 md:mt-10">
            <div className="bg-white shadow-lg rounded-lg py-5 px-5 md:px-32 text-center hover:bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition duration-300 ease-in-out group">
              <img src={efficency} alt="File A Claim" width="45" className="mx-auto mb-3" />
              <h6 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-white">File A Claim</h6>
            </div>
            <div className="bg-white shadow-lg rounded-lg py-5 px-5 md:px-32 text-center hover:bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition duration-300 ease-in-out group">
              <img src={efficency} alt="Track Claim" width="45" className="mx-auto mb-3" />
              <h6 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-white">Track Claim</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div data-aos='flip-right '>
    <DownloadAppSection/>

    </div>
  
    </div>
  );
};

export default QuickLinksSection;
